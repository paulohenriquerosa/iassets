import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { JsonOutputParser } from "@langchain/core/output_parsers";

import type { FeedItem } from "@/agents/types";
import { agentLog } from "@/lib/logger";

interface TrendScore {
  title: string;
  score: number;
}

export class TrendSelectorAgent {
  private llm: ChatOpenAI;
  private prompt: PromptTemplate;
  private parser = new JsonOutputParser<{ trends: TrendScore[] }>();

  constructor() {
    this.llm = new ChatOpenAI({
      modelName: process.env.TREND_MODEL || "gpt-4",
      temperature: 0,
      openAIApiKey: process.env.OPENAI_API_KEY!,
    });

    this.prompt = PromptTemplate.fromTemplate(`
Você é um ANALISTA DE TENDÊNCIAS DE MÍDIA.

Dada esta lista de notícias recentes extraídas do feed:
{items}

E considerando dados de tendências de busca (Google Trends), redes sociais e volume de menções em portais financeiros,
classifique cada item numa escala de 1 a 5 (5 = maior potencial de engajamento).

Retorne APENAS JSON válido:
{{
  "trends": [
    {{ "title": "...", "score": 1 }}
  ]
}}
`);
  }

  /**
   * Filtra os itens do feed retornando apenas os topK com maior potencial.
   */
  async select(feedItems: FeedItem[], topK: number = 3): Promise<FeedItem[]> {
    if (feedItems.length === 0) return [];

    const itemsStr = feedItems
      .map((it, idx) => `${idx + 1}. ${it.title}`)
      .join("\n");

    agentLog("TrendSelector", "input-items", feedItems.length);

    const chain = RunnableSequence.from([
      this.prompt,
      this.llm,
      this.parser,
    ]);

    let scored: TrendScore[] = [];
    try {
      const res = await chain.invoke({ items: itemsStr });
      scored = res.trends ?? [];
      agentLog("TrendSelector", "output", scored);
    } catch (err) {
      console.error("[TrendSelectorAgent] LLM error", err);
      // Fallback: retorna primeiros topK itens
      return feedItems.slice(0, topK);
    }

    // Ordena por score (-1 evita mis-format)
    scored = scored
      .filter((s) => typeof s.score === "number" && s.title)
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

    // Caso o LLM não tenha listado topK diferentes, preenche restantes
    if (ordered.length < topK) {
      for (const it of feedItems) {
        if (!ordered.includes(it)) ordered.push(it);
        if (ordered.length >= topK) break;
      }
    }

    return ordered.slice(0, topK);
  }
} 