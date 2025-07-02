/* eslint-disable @typescript-eslint/no-explicit-any */
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import type { ChatOpenAI } from "@langchain/openai";
import { jsonrepair } from "jsonrepair";
import { getLLM, logTokenUsage } from "@/lib/llm";
import { agentLog } from "@/lib/logger";
import { TwitterApi } from "twitter-api-v2";
import { markThreadPosted, wasThreadPosted, getTweetCountToday, incTweetCount } from "@/lib/twitter-cache";

interface ArticleInput {
  title: string;
  summary: string;
  content: string;
  url: string;
  coverUrl?: string;
}

export class TwitterThreadAgent {
  private llm: ChatOpenAI;
  private prompt: PromptTemplate;
  private parser = new StringOutputParser();

  constructor() {
    // Slightly creative model for social media copywriting
    this.llm = getLLM("TWITTER_MODEL", "GPT-4o-mini", {
      temperature: 0.7,
      maxTokens: 1024,
    });

    this.prompt = PromptTemplate.fromTemplate(`
Você é um EXPERT em Twitter marketing.
Objetivo: Criar APENAS DOIS tweets em português sobre o artigo.

REQUISITOS:
1. Cada tweet ≤ 280 caracteres (URL conta como 23).
2. Tweet 1: resumo conciso e instigante + menção de imagem de capa.
3. Tweet 2: chamada para ação e **somente** o link {url} no final.
4. Retorne APENAS JSON válido com EXATAMENTE dois elementos: ["tweet1", "tweet2"].

DADOS DO ARTIGO:\nTítulo: {title}\nResumo: {summary}\nConteúdo (markdown):\n{content}
`);
  }

  async generateThread(article: ArticleInput): Promise<string[]> {
    agentLog("TwitterThreadAgent", "generate-input", article.title);

    const chain = RunnableSequence.from([
      this.prompt,
      this.llm,
      this.parser,
    ]);

    const raw = await chain.invoke({
      title: article.title,
      summary: article.summary,
      content: article.content.substring(0, 4000),
      url: article.url,
    });

    await logTokenUsage("TwitterThreadAgent", "generateThread", this.llm, article.title, raw);
    let tweets = this.safeParse(raw);

    // fallback: garantir que haja exatamente 2 tweets
    if (tweets.length < 2) {
      tweets.push(`Leia o artigo completo aqui: ${article.url}`);
    }
    if (tweets.length > 2) {
      tweets = [tweets[0], tweets[tweets.length - 1]];
    }

    // Garante link no segundo tweet
    if (!tweets[1].includes(article.url)) {
      tweets[1] = `${tweets[1]} ${article.url}`.trim();
    }

    agentLog("TwitterThreadAgent", "generate-output", tweets);
    return tweets;
  }

  async publishThread(tweets: string[], coverUrl?: string, uniqueId?: string): Promise<void> {
    if (!tweets.length) return;

    // Avoid duplicates: hash of first tweet
    const identifier = uniqueId ?? tweets[0];
    const already = await wasThreadPosted(identifier);
    if (already) {
      console.log("[TwitterThreadAgent] Thread already posted, skipping");
      return;
    }

    // Env vars validation
    const {
      TWITTER_APP_KEY,
      TWITTER_APP_SECRET,
      TWITTER_ACCESS_TOKEN,
      TWITTER_ACCESS_SECRET,
    } = process.env;

    if (!TWITTER_APP_KEY || !TWITTER_APP_SECRET || !TWITTER_ACCESS_TOKEN || !TWITTER_ACCESS_SECRET) {
      console.warn("[TwitterThreadAgent] Twitter credentials missing, cannot publish thread.");
      return;
    }

    const client = new TwitterApi({
      appKey: TWITTER_APP_KEY,
      appSecret: TWITTER_APP_SECRET,
      accessToken: TWITTER_ACCESS_TOKEN,
      accessSecret: TWITTER_ACCESS_SECRET,
    }).readWrite;

    let mediaId: string | undefined;
    if (coverUrl) {
      try {
        const res = await fetch(coverUrl);
        const buffer = Buffer.from(await res.arrayBuffer());
        // Detect mime-type from response header or fallback
        const mimeType = res.headers.get("content-type") || "image/jpeg";
        mediaId = await client.v1.uploadMedia(buffer, { mimeType });
      } catch (err) {
        console.error("[TwitterThreadAgent] media upload fail", err);
      }
    }

    // Daily quota check
    const dailyLimit = Number(process.env.TWEET_DAILY_LIMIT ?? 50);
    const sentToday = await getTweetCountToday();
    if (sentToday + tweets.length > dailyLimit) {
      console.warn(`[TwitterThreadAgent] Daily tweet limit reached (${sentToday}/${dailyLimit}), skipping thread.`);
      return;
    }

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    let replyToId: string | undefined;
    for (let i = 0; i < tweets.length; i++) {
      const status = tweets[i].slice(0, 280); // enforce max length
      let tryAgain = true;
      while (tryAgain) {
        try {
          const response = await client.v2.tweet(status, {
            media: i === 0 && mediaId ? { media_ids: [mediaId] } : undefined,
            reply: replyToId ? { in_reply_to_tweet_id: replyToId } : undefined,
          });
          replyToId = response.data.id;
          await incTweetCount();
          // throttling: 1.2 s between tweets to avoid burst limit
          await sleep(1200);
          tryAgain = false;
        } catch (err: any) {
          if (err.code === 429 && err.rateLimit?.reset) {
            const wait = err.rateLimit.reset * 1000 - Date.now() + 1000;
            console.warn(`[TwitterThreadAgent] Rate-limited. Waiting ${Math.ceil(wait / 1000)}s`);
            await sleep(wait);
            // loop to retry same tweet
          } else {
            console.error(`[TwitterThreadAgent] Failed to send tweet #${i + 1}`, err);
            tryAgain = false;
          }
        }
      }
    }

    await markThreadPosted(identifier);
  }

  private safeParse(raw: string): string[] {
    try {
      const clean = raw.replace(/```json\s*/gi, "").replace(/```/g, "").trim();
      const jsonMatch = clean.match(/\[[\s\S]*\]/);
      if (!jsonMatch) throw new Error("no-array");
      try {
        return JSON.parse(jsonMatch[0]);
      } catch {
        return JSON.parse(jsonrepair(jsonMatch[0]));
      }
    } catch (e) {
      console.error("[TwitterThreadAgent] safeParse fail", e);
      return [];
    }
  }
} 