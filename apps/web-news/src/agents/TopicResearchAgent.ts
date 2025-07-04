/* eslint-disable @typescript-eslint/no-explicit-any */
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { WikipediaQueryRun } from "@langchain/community/tools/wikipedia_query_run";
import type { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { JsonOutputParser } from "@langchain/core/output_parsers";

import { EvergreenTopic } from "@/agents/EvergreenStrategistAgent";
import { getLLM } from "@/lib/llm";
import type { ResearchResult } from "@/agents/types";
import { getJson, setJson } from "@/lib/cache";

interface SearchResult {
  title: string;
  link: string;
  snippet: string;
}

export class TopicResearchAgent {
  private readonly llm: ChatOpenAI;
  private readonly prompt: PromptTemplate;
  private readonly parser = new JsonOutputParser<ResearchResult>();
  private readonly searchTool: TavilySearchResults;
  private readonly wiki: WikipediaQueryRun;

  constructor() {
    this.llm = getLLM("TOPIC_RESEARCH_MODEL", "gpt-3.5-turbo", { temperature: 0.3 });

    const apiKey = process.env.TAVILY_API_KEY;
    if (!apiKey) {
      throw new Error("Missing TAVILY_API_KEY env var for TopicResearchAgent");
    }
    this.searchTool = new TavilySearchResults({ apiKey });
    this.wiki = new WikipediaQueryRun();

    this.prompt = PromptTemplate.fromTemplate(`
Você é um PESQUISADOR DE CONTEÚDO FINANCEIRO.
Com base em resultados de busca, produza fatos, estatísticas e citações externas confiáveis para enriquecer um artigo evergreen.

TÓPICO: {keyword}
ÂNGULO: {angle}
FORMATO: {format}

OUTLINE (H2):
{outline}

RESULTADOS DE BUSCA:
{results}

RETORNE EXCLUSIVAMENTE UM JSON VÁLIDO seguindo o formato:
{{
  "relatedFacts": ["..."],
  "statistics": ["..."],
  "externalQuotes": ["..."]
}}
`);
  }

  async research(topic: EvergreenTopic): Promise<ResearchResult | null> {
    // Check cache first using keyword hash
    const cacheKey = `topic-research:${topic.keyword.toLowerCase()}`;
    const cached = await getJson<ResearchResult>(cacheKey);
    if (cached) return cached;

    // 1. Tavily search
    const tavilyResults = await this.tavilySearch(topic.keyword);

    // 1b. Wikipedia fallback/summary
    let wikiStr = "";
    try {
      wikiStr = await this.wiki.call(topic.keyword);
    } catch {}

    const resultsStr = [
      ...tavilyResults.map((r, i) => `${i + 1}. ${r.title} (${r.link}) - ${r.snippet}`),
      wikiStr ? `Wikipedia: ${wikiStr.slice(0, 400)}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    // 2. LLM synthesis
    const chain = RunnableSequence.from([
      this.prompt,
      this.llm,
      this.parser,
    ]);

    try {
      const res = await chain.invoke({
        keyword: topic.keyword,
        angle: topic.angle,
        format: topic.format,
        outline: topic.outline.join("\n"),
        results: resultsStr,
      });
      // Cache for 7d
      await setJson(cacheKey, res, 60 * 60 * 24 * 7);
      return res;
    } catch (err) {
      console.error("[TopicResearchAgent] chain error", err);
      return null;
    }
  }

  /* ----------------------------------------- */
  /* Tavily Search                              */
  /* ----------------------------------------- */
  private async tavilySearch(query: string): Promise<SearchResult[]> {
    try {
      const raw = await this.searchTool.call(query);

      // A. Attempt to parse JSON string responses
      let data: any = raw;
      if (typeof raw === "string") {
        try {
          data = JSON.parse(raw);
        } catch {
          // If parsing fails, keep original value
        }
      }

      // B. Normalise to an array of results
      const resultsArr: any[] = Array.isArray(data)
        ? data
        : Array.isArray(data?.results)
          ? data.results
          : [];

      return resultsArr.map((r: any) => ({
        title: r.title ?? r?.url ?? "",
        link: r.url ?? r?.link ?? "",
        snippet: r.content ?? r?.snippet ?? "",
      }));
    } catch (err) {
      console.error("[TopicResearchAgent] tavilySearch error", (err as any)?.message ?? err);
      return [];
    }
  }
} 