/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { getLLM } from "@/lib/llm";
import { getJson, setJson } from "@/lib/cache";
import { MarketDataAgent } from "@/agents/MarketDataAgent";
import { WolframCalculator } from "@/agents/WolframCalculator";

import type { ResearchResult } from "@/agents/types";

export class ResearchAgent {
  private llm: ChatOpenAI;
  private prompt: PromptTemplate;
  private parser = new StringOutputParser();
  private market = new MarketDataAgent();
  private calc = new WolframCalculator();

  constructor() {
    this.llm = getLLM("RESEARCH_MODEL", "gpt-4.1-nano", {
      temperature: 0.2,
    });

    this.prompt = PromptTemplate.fromTemplate(`
Você é um PESQUISADOR FINANCEIRO sênior.

NOTÍCIA ORIGINAL:
Título: {title}
Link: {link}
Resumo: {summary}

CONTEÚDO COMPLETO:
{fullText}

NOTÍCIAS DE MERCADO RELEVANTES:
{marketNews}

TAREFA: Analise profundamente a notícia, busque fatos complementares, dados de mercado, estatísticas e citações externas relevantes.

FATOS COMPUTADOS PELO WOLFRAM:
{wolframFacts}

RETORNE APENAS UM JSON VÁLIDO seguindo o formato:
{{
  "relatedFacts": ["..."],
  "statistics": ["..."],
  "externalQuotes": ["..."]
}}
`);
  }

  async research(input: {
    title: string;
    link: string;
    summary: string;
    fullText: string;
  }): Promise<ResearchResult | null> {
    // Attempt to fetch from cache first using link as unique identifier
    const cacheKey = `research:${input.link}`;
    const cached = await getJson<ResearchResult>(cacheKey);
    if (cached) {
      return cached;
    }

    // Tenta extrair ticker do título (regex simples)
    const tickerMatch = input.title ? input.title.match(/\b[A-Z]{3,5}\b/) : null;
    const ticker = tickerMatch ? tickerMatch[0] : "";
    let marketNews = "";
    if (ticker) {
      const newsArr = await this.market.fetchNews(ticker);
      marketNews = newsArr.join("; ");
    }

    // Heurísticas simples para cálculos
    const wolframFactsArr: string[] = [];
    try {
      if (/infla[cç][aã]o/i.test(input.title)) {
        const ans = await this.calc.ask("Brazil inflation rate last 12 months");
        if (ans) wolframFactsArr.push(`Inflação 12m: ${ans}`);
      }
      if (/PIB|GDP/i.test(input.title)) {
        const ans = await this.calc.ask("Brazil GDP 2023");
        if (ans) wolframFactsArr.push(`PIB 2023: ${ans}`);
      }
    } catch {}

    const wolframFacts = wolframFactsArr.join("; ");

    const chain = RunnableSequence.from([
      this.prompt,
      this.llm,
      this.parser,
    ]);

    try {
      const raw = await chain.invoke({
        title: input.title,
        link: input.link,
        summary: input.summary,
        fullText: input.fullText,
        marketNews,
        wolframFacts,
      });
      const parsed = this.safeParse(raw);
      if (parsed) {
        // Cache for 7 days
        await setJson(cacheKey, parsed, 60 * 60 * 24 * 7);
      }
      return parsed;
    } catch (err: any) {
      console.error("[ResearchAgent] chain error", err);
      if (err?.message?.includes("exceeded your current quota")) {
        const { sendQuotaExceededAlert } = await import("@/lib/email");
        await sendQuotaExceededAlert(err.message);
      }
      return null;
    }
  }

  private safeParse(content: string): ResearchResult | null {
    try {
      const clean = content.replace(/```json\s*/gi, "").replace(/```/g, "").trim();
      const jsonMatch = clean.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error("No JSON block found");
    } catch (e) {
      console.error("[ResearchAgent] safeParse fail", e);
      return null;
    }
  }
} 