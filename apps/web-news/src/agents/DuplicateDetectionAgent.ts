/* eslint-disable @typescript-eslint/no-explicit-any */
import { Index } from "@upstash/vector";
import OpenAI from "openai";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { sendQuotaExceededAlert } from "@/lib/email";

const VECTOR_DIM = 1536; // text-embedding-3-small

const index = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL!,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
  indexName: process.env.UPSTASH_VECTOR_INDEX_NAME || "articles",
  vector: VECTOR_DIM,
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export class DuplicateDetectionAgent {
  private verifier;

  constructor() {
    this.verifier = RunnableSequence.from([
      PromptTemplate.fromTemplate(`Responda apenas SIM ou NAO.
NOVO: {novo}
EXISTENTE: {velho}
Eles falam da MESMA notícia?`),
      new ChatOpenAI({
        modelName: process.env.DUP_MODEL || "gpt-3.5-turbo-1106",
        temperature: 0,
        openAIApiKey: process.env.OPENAI_API_KEY!,
      }),
      new StringOutputParser(),
    ]);
  }

  async exists(title: string, summary: string): Promise<boolean> {
    const text = `${title}. ${summary}`;
    const emb = await this.embed(text);

    try {
      const res: any = await index.query({
        vector: emb,
        topK: 3,
        includeVectors: false,
        includeMetadata: true,
      });
      const hits = res?.matches || [];
      for (const h of hits) {
        if (h.score < 0.88) continue;
        const oldText = h.metadata?.text as string;
        const decision = await this.verifier.invoke({ novo: text, velho: oldText });
        if (decision.trim().toUpperCase().startsWith("SIM")) return true;
      }
    } catch (err: any) {
      console.error("[DuplicateDetection] query error", err);
      if (err?.message?.includes("quota")) {
        await sendQuotaExceededAlert("Upstash Vector quota exceeded: " + err.message);
      }
    }
    return false;
  }

  async add(title: string, summary: string) {
    const text = `${title}. ${summary}`;
    const emb = await this.embed(text);
    try {
      await index.upsert([{ id: crypto.randomUUID(), vector: emb, metadata: { text } }]);
    } catch (e: any) {
      console.error("[DuplicateDetection] upsert error", e);
      if (e?.message?.includes("quota")) {
        await sendQuotaExceededAlert("Upstash Vector quota exceeded: " + e.message);
      }
    }
  }

  private async embed(text: string) {
    const res = await openai.embeddings.create({ model: "text-embedding-3-small", input: text });
    return res.data[0].embedding as number[];
  }
} 