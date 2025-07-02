/* eslint-disable @typescript-eslint/no-explicit-any */
import { Index } from "@upstash/vector";
import OpenAI from "openai";

export interface SemanticSearchResult {
  title: string;
  slug: string;
  score: number;
}

/**
 * Agent that performs semantic search over the articles index using OpenAI embeddings + Upstash Vector
 */
export class SemanticSearchAgent {
  private index: any;
  private openai: OpenAI;

  constructor() {
    this.index = new Index({
      url: process.env.UPSTASH_VECTOR_REST_URL!,
      token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
      indexName: process.env.UPSTASH_VECTOR_INDEX_NAME || "articles",
      vector: 1536, // text-embedding-3-small dimension
    });

    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
  }

  async search(query: string, topK = 20, minScore = 0.55): Promise<SemanticSearchResult[]> {
    if (!query.trim()) return [];

    const emb = await this.embed(query);

    const res: any = await this.index.query({
      vector: emb,
      topK,
      includeMetadata: true,
      includeVectors: false,
    });

    const matches = (res.matches || [])
      .filter((m: any) => m.score >= minScore)
      .map((m: any) => ({
        title: m.metadata.title as string,
        slug: (m.metadata.slug as string) ?? "",
        score: m.score as number,
      }));

    // Already ordered by similarity (highest score first)
    return matches;
  }

  private async embed(text: string): Promise<number[]> {
    const res = await this.openai.embeddings.create({ model: "text-embedding-3-small", input: text });
    return res.data[0].embedding as number[];
  }
} 