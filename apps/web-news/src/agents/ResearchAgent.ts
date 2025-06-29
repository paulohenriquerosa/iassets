/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";

import type { ResearchResult } from "@/agents/types";

export class ResearchAgent {
  private llm: ChatOpenAI;
  private prompt: PromptTemplate;
  private parser = new StringOutputParser();

  constructor() {
    this.llm = new ChatOpenAI({
      modelName: process.env.RESEARCH_MODEL || "gpt-4",
      temperature: 0.2,
      openAIApiKey: process.env.OPENAI_API_KEY!,
    });

    this.prompt = PromptTemplate.fromTemplate(`
Você é um PESQUISADOR FINANCEIRO sênior.

NOTÍCIA ORIGINAL:
Título: {title}
Link: {link}
Resumo: {summary}

CONTEÚDO COMPLETO:
{fullText}

TAREFA: Analise profundamente a notícia, busque fatos complementares, dados de mercado, estatísticas e citações externas relevantes.

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
    const chain = RunnableSequence.from([
      this.prompt,
      this.llm,
      this.parser,
    ]);

    try {
      const raw = await chain.invoke(input);
      return this.safeParse(raw);
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