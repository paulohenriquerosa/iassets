/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { JsonOutputParser } from "@langchain/core/output_parsers";

import type { FeedItem } from "@/agents/types";
import { agentLog } from "@/lib/logger";
import { getLLM } from "@/lib/llm";
import { TrendAggregatorAgent } from "@/agents/TrendAggregatorAgent";
import { OpenAIEmbeddings } from "@langchain/openai";

interface TrendScore {
  title: string;
  score: number;
}

export class TrendSelectorAgent {
  private llm: ChatOpenAI;
  private prompt: PromptTemplate;
  private parser = new JsonOutputParser<{ trends: TrendScore[] }>();

  // Helpers para pré-filtro
  private readonly agg = new TrendAggregatorAgent();
  private readonly embedder = new OpenAIEmbeddings({ modelName: "text-embedding-3-small" });

  // Cosine util rápido
  private cosine(a: number[], b: number[]): number {
    let dot = 0,
      la = 0,
      lb = 0;
    for (let i = 0; i < a.length; i++) {
      dot += a[i] * b[i];
      la += a[i] * a[i];
      lb += b[i] * b[i];
    }
    return dot / (Math.sqrt(la) * Math.sqrt(lb) + 1e-8);
  }

  private lastKeywords: string | undefined;

  constructor() {
    this.llm = getLLM("TREND_MODEL", "gpt-3.5-turbo", {
      temperature: 0.2,
    });

    this.prompt = PromptTemplate.fromTemplate(`
Você é um ANALISTA DE TENDÊNCIAS DE MÍDIA.

Dada esta lista de notícias recentes extraídas do feed:
{items}

Palavras-chave de tendências atuais (Google/Redes sociais):
{keywords}

E considerando dados de tendências de busca (Google Trends), redes sociais e volume de menções em portais financeiros, e notícias recentes,
classifique cada item numa escala de 1 a 5 (5 = maior potencial de engajamento).

RETORNE APENAS UM JSON VÁLIDO seguindo o formato:
{{
  "trends": [
    {{ "title": "...", "score": 1 }}
  ]
}}
`);
  }

  /**
   * Seleciona até topK itens com score >= minScore.
   * Se não houver itens suficientes, retorna somente os que atendem ao critério (pode ser lista vazia).
   */
  async select(feedItems: FeedItem[], topK: number = 10): Promise<FeedItem[]> {
    if (feedItems.length === 0) return [];

    /* -------------------------------------------------- */
    /* 1. Recupera top keywords e faz pré-filtro embedding */
    /* -------------------------------------------------- */
    let filtered = feedItems;
    let keywordsStr = "";
    try {
      const kwArr = (await this.agg.aggregate({ topK: 30 })).map((k) => k.keyword);

      if (kwArr.length) {
        const [kwVecs, itemVecs] = await Promise.all([
          this.embedder.embedDocuments(kwArr),
          this.embedder.embedDocuments(feedItems.map((i) => i.title)),
        ]);
        keywordsStr = kwArr.slice(0, 15).join(", ");
        this.lastKeywords = keywordsStr;

        const THRESH = 0.75;
        filtered = feedItems.filter((it, idx) => {
          const vec = itemVecs[idx];
          const sim = Math.max(...kwVecs.map((kvec) => this.cosine(kvec, vec)));
          return sim >= THRESH;
        });
        if (filtered.length === 0) filtered = feedItems; // fallback se nada passou
      }
    } catch (err) {
      console.warn("[TrendSelector] embedding prefilter skipped", (err as any).message);
    }

    const itemsStr = filtered
      .map((it, idx) => `${idx + 1}. ${it.title} – ${(it.summary || "").slice(0, 120)}`)
      .join("\n");

    agentLog("TrendSelector", "input-items", feedItems.length);

    keywordsStr = this.lastKeywords ?? keywordsStr;

    const chain = RunnableSequence.from([
      this.prompt,
      this.llm,
      this.parser,
    ]);

    let scored: TrendScore[] = [];
    try {
      const res = await chain.invoke({ items: itemsStr, keywords: keywordsStr });
      scored = res.trends ?? [];
      agentLog("TrendSelector", "output", scored);
    } catch (err) {
      console.error("[TrendSelectorAgent] LLM error", err);
      // Fallback: retorna primeiros topK itens
      return feedItems.slice(0, topK);
    }

    // Threshold mínimo para pontuação (via env ou 3)
    const MIN_SCORE = Number(process.env.TREND_MIN_SCORE ?? 3);

    scored = scored
      .filter((s) => typeof s.score === "number" && s.title && s.score >= MIN_SCORE)
      .sort((a, b) => b.score - a.score);

    // Mapeia para FeedItem preservando ordem por score
    const titleMap = new Map<string, FeedItem>();
    feedItems.forEach((it) => titleMap.set(it.title.toLowerCase(), it));

    const ordered: FeedItem[] = [];
    for (const s of scored) {
      const match = titleMap.get(s.title.toLowerCase());
      if (match) ordered.push(match);
      if (ordered.length >= topK) break;
    }

    // Retorna apenas ordered (já está limitado por topK e minScore)
    return ordered.slice(0, topK);
  }
} 