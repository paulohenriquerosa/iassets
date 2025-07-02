/* eslint-disable @typescript-eslint/no-explicit-any */
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import type { ChatOpenAI } from "@langchain/openai";
import { jsonrepair } from "jsonrepair";
import { getLLM, logTokenUsage } from "@/lib/llm";
import { agentLog } from "@/lib/logger";
import { TwitterApi } from "twitter-api-v2";
import {
  markThreadPosted,
  wasThreadPosted,
  incTweetCount,
} from "@/lib/twitter-cache";
import { qstashPublishJSON } from "@/lib/qstash";

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
    this.llm = getLLM("TWITTER_MODEL", "gpt-4o-mini", {
      temperature: 0.7,
      maxTokens: 1024,
    });

    this.prompt = PromptTemplate.fromTemplate(`
Você é um EXPERT em Twitter marketing.
Objetivo: Criar APENAS DOIS tweets em português sobre o artigo.

REQUISITOS:
1. Cada tweet ≤ 280 caracteres (URL conta como 23).
2. Tweet 1: informativo e completo, trazendo os dados principais (o que aconteceu, por que importa, números-chave, estatísticas). O leitor não deve precisar do link para entender o assunto.
3. Tweet 2: convite para saber mais + **somente** o link {url} no final. Ex.: "Quer se aprofundar nos impactos do IOF? Veja aqui: {url}"
4. Formato de saída (escolha UM dos dois):
   a) JSON: ["tweet1", "tweet2"]
   b) Texto simples em duas linhas:
      tweet1: <texto>
      tweet2: <texto>

NÃO inclua mais nada além desses tweets.

DADOS DO ARTIGO:
Título: {title}
Resumo: {summary}
Conteúdo (markdown):
{content}
`);
  }

  /** Gera os dois tweets */
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

    await logTokenUsage(
      "TwitterThreadAgent",
      "generateThread",
      this.llm,
      article.title,
      raw
    );

    let tweets = this.safeParse(raw);

    // Garante exatamente 2 tweets
    if (tweets.length < 2) {
      tweets.push(`Leia o artigo completo aqui: ${article.url}`);
    } else if (tweets.length > 2) {
      tweets = [tweets[0], tweets[tweets.length - 1]];
    }

    // Garante link no segundo tweet
    if (!tweets[1].includes(article.url)) {
      tweets[1] = `${tweets[1]} ${article.url}`.trim();
    }

    agentLog("TwitterThreadAgent", "generate-output", tweets);
    return tweets;
  }

  /**
   * Publica a thread no Twitter, re-enfileirando o que faltar em caso de rate-limit
   * @param tweets Array de 1º e 2º tweet (ou restantes, se requeue)
   * @param coverUrl URL da imagem (opcional)
   * @param uniqueId identificador único da thread
   * @param replyToId (opcional) ID do tweet anterior para encadear
   */
  async publishThread(
    tweets: string[],
    coverUrl?: string,
    uniqueId?: string,
    replyToId?: string
  ): Promise<void> {
    if (tweets.length === 0) return;

    const identifier = uniqueId ?? tweets[0];
    if (await wasThreadPosted(identifier)) {
      console.log("[TwitterThreadAgent] Thread already posted, skipping");
      return;
    }

    const {
      TWITTER_APP_KEY,
      TWITTER_APP_SECRET,
      TWITTER_ACCESS_TOKEN,
      TWITTER_ACCESS_SECRET,
      VERCEL_URL,
      NEXT_PUBLIC_SITE_URL,
      INTERNAL_API_BASE_URL,
    } = process.env;

    if (
      !TWITTER_APP_KEY ||
      !TWITTER_APP_SECRET ||
      !TWITTER_ACCESS_TOKEN ||
      !TWITTER_ACCESS_SECRET
    ) {
      console.warn(
        "[TwitterThreadAgent] Missing Twitter credentials – cannot publish."
      );
      return;
    }

    const client = new TwitterApi({
      appKey: TWITTER_APP_KEY,
      appSecret: TWITTER_APP_SECRET,
      accessToken: TWITTER_ACCESS_TOKEN,
      accessSecret: TWITTER_ACCESS_SECRET,
    }).readWrite;

    // Upload de imagem no primeiro tweet
    let mediaId: string | undefined;
    if (coverUrl) {
      try {
        const res = await fetch(coverUrl);
        const buf = Buffer.from(await res.arrayBuffer());
        const mime = res.headers.get("content-type") || "image/jpeg";
        mediaId = await client.v1.uploadMedia(buf, { mimeType: mime });
      } catch (err) {
        console.error("[TwitterThreadAgent] Media upload failed", err);
      }
    }

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const baseUrl =
      INTERNAL_API_BASE_URL ||
      NEXT_PUBLIC_SITE_URL ||
      (VERCEL_URL ? `https://${VERCEL_URL}` : undefined);

    for (let i = 0; i < tweets.length; i++) {
      const status = tweets[i].slice(0, 280);

      while (true) {
        try {
          const resp = await client.v2.tweet(status, {
            media:
              i === 0 && mediaId
                ? { media_ids: [mediaId] }
                : undefined,
            reply: replyToId
              ? { in_reply_to_tweet_id: replyToId }
              : undefined,
          });
          // Atualiza replyToId para o próximo tweet
          replyToId = resp.data.id;
          await incTweetCount();
          await sleep(1200); // throttle leve
          break;
        } catch (err: any) {
          if (err.code === 429 && err.rateLimit?.reset) {
            // Rate-limit: requeue tudo o que faltar
            const resetMs = err.rateLimit.reset * 1000;
            const delaySec = Math.ceil((resetMs - Date.now()) / 1000) + 1;

            const remaining = tweets.slice(i);
            if (!baseUrl) {
              console.error(
                "[TwitterThreadAgent] Cannot requeue – missing base URL"
              );
              return;
            }
            await qstashPublishJSON({
              url: `${baseUrl}/api/twitter-worker`,
              body: {
                tweets: remaining,
                coverUrl,
                uniqueId: identifier,
                replyToId,
              },
              notBefore: delaySec,
            });
            console.log(
              "[TwitterThreadAgent] Rate-limited: requeued remaining tweets"
            );
            return;
          } else {
            console.error(
              `[TwitterThreadAgent] Failed to send tweet #${i + 1}`,
              err
            );
            break;
          }
        }
      }
    }

    // Marca a thread como postada só depois de tudo enviado
    await markThreadPosted(identifier);
  }

  /** Parser seguro da resposta do LLM */
  private safeParse(raw: string): string[] {
    try {
      const clean = raw
        .replace(/```json\s*/gi, "")
        .replace(/```/g, "")
        .trim();
      const jsonMatch = clean.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        try {
          return JSON.parse(jsonMatch[0]);
        } catch {
          return JSON.parse(jsonrepair(jsonMatch[0]));
        }
      }
      const lines = clean
        .split(/\n+/)
        .map((l) => l.trim())
        .filter(Boolean)
        .map((l) => l.replace(/^"?tweet[12]"?\s*[:=-]\s*/i, ""))
        .filter((l) => l && l !== "{" && l !== "}");
      if (lines.length) return lines;
      throw new Error("no-tweets-found");
    } catch (e) {
      console.error("[TwitterThreadAgent] safeParse fail", e);
      return [];
    }
  }
}
