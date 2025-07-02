/* eslint-disable @typescript-eslint/no-explicit-any */
import { Index } from "@upstash/vector";
import OpenAI from "openai";
import type { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { agentLog } from "@/lib/logger";
import { getLLM } from "@/lib/llm";

export interface RelatedArticle {
  title: string;
  slug: string;
}

export class RelatedArticlesAgent {
  private index: any;
  private llm: ChatOpenAI;
  private prompt: PromptTemplate;
  private parser = new StringOutputParser();
  private openai: OpenAI;

  constructor() {
    this.index = new Index({
      url: process.env.UPSTASH_VECTOR_REST_URL!,
      token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
      indexName: process.env.UPSTASH_VECTOR_INDEX_NAME || "articles",
      vector: 1536, // text-embedding-3-small dimension
    });

    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

    this.llm = getLLM("RELATED_MODEL", "gpt-3.5-turbo", { temperature: 0 });

    this.prompt = PromptTemplate.fromTemplate(`
Você é um ASSISTENTE DE RECOMENDAÇÃO DE LEITURA.

Notícia atual:
Título: {title}
Resumo: {summary}

Lista de artigos similares (JSON):
{candidates}

Cada item de candidates tem:
  - "title": título do artigo já publicado  
  - "slug": caminho relativo (ex: "/mercado-alta-ibovespa")  
  - "score": similaridade (0–1)

Selecione até 3 artigos que sejam **realmente relevantes** para linkar dentro do texto.
Retorne JSON válido:
{{
  "related": [
    {{ "title": "...", "slug": "..." }}
  ]
}}
`);
  }

  async recommend(title: string, summary: string): Promise<RelatedArticle[]> {
    agentLog("RelatedArticles", "input", { title, summary });

    const emb = await this.embed(`${title}. ${summary}`);

    const res: any = await this.index.query({
      vector: emb,
      topK: 10,
      includeMetadata: true,
      includeVectors: false,
    });

    let candidates = (res.matches || [])
      .filter((m: any) => !!m.metadata?.slug && m.metadata.slug !== "")
      .map((m: any) => ({
        title: m.metadata.title as string,
        slug: m.metadata.slug as string,
        score: m.score as number,
      }));

    // keep only those above 0.7; if none, fallback to best 5 hits
    const strong = candidates.filter((c: { score: number }) => c.score > 0.7);
    candidates = strong.length > 0 ? strong : candidates.slice(0, 5);

    if (candidates.length === 0) {
      agentLog("RelatedArticles", "no-candidates", {});
      return [];
    }

    const chain = RunnableSequence.from([
      this.prompt,
      this.llm,
      this.parser,
    ]);

    try {
      const raw = await chain.invoke({
        title,
        summary,
        candidates: JSON.stringify(candidates, null, 2),
      });
      const obj = JSON.parse(raw) as { related: RelatedArticle[] };
      agentLog("RelatedArticles", "output", obj.related);
      return obj.related ?? [];
    } catch (err) {
      console.error("[RelatedArticlesAgent] error", err);
      return [];
    }
  }

  private async embed(text: string): Promise<number[]> {
    const res = await this.openai.embeddings.create({ model: "text-embedding-3-small", input: text });
    return res.data[0].embedding as number[];
  }
} 