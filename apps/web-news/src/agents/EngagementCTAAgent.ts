import type { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { jsonrepair } from "jsonrepair";
import { agentLog } from "@/lib/logger";
import { getLLM } from "@/lib/llm";

export interface CTAItem {
  type: "comment" | "related" | "newsletter" | string;
  slug?: string;
  text: string;
}

export class EngagementCTAAgent {
  private llm: ChatOpenAI;
  private prompt: PromptTemplate;
  private parser = new StringOutputParser();

  constructor() {
    this.llm = getLLM("CTA_MODEL", "gpt-3.5-turbo-0125", {
      temperature: 0.5,
    });

    this.prompt = PromptTemplate.fromTemplate(`
Você é UM REDATOR DE MATÉRIAS DIGITAIS.

Artigo final em Markdown:
{content}

– Sugira 3 CTAs diferentes:  
  a) convite para comentar.  
  b) link para um artigo relacionado (forneça o slug).  
  c) inscrição na newsletter (frase curta).  

Retorne JSON válido:
{{
  "ctas": [
    {{ "type": "comment", "text": "Gostou deste artigo? Deixe sua opinião abaixo!" }},
    {{ "type": "related", "slug": "/impacto-fed-nos-investimentos", "text": "Entenda também como a decisão do Fed afeta seus ativos" }},
    {{ "type": "newsletter", "text": "Assine nossa newsletter para receber análises diárias!" }}
  ]
}}
`);
  }

  async suggest(content: string): Promise<CTAItem[] | null> {
    agentLog("CTAAgent", "input", content.slice(0,200));
    const chain = RunnableSequence.from([
      this.prompt,
      this.llm,
      this.parser,
    ]);

    try {
      const raw = await chain.invoke({ content });
      const parsed = this.safeParse(raw);
      agentLog("CTAAgent", "output", parsed?.ctas);
      return parsed?.ctas ?? [];
    } catch (err) {
      console.error("[EngagementCTAAgent] LLM error", err);
      return null;
    }
  }

  private safeParse(raw: string): { ctas: CTAItem[] } | null {
    try {
      const clean = raw.replace(/```json\s*/gi, "").replace(/```/g, "").trim();
      const jsonMatch = clean.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("no-json");
      try {
        return JSON.parse(jsonMatch[0]);
      } catch {
        return JSON.parse(jsonrepair(jsonMatch[0]));
      }
    } catch (e) {
      console.error("[CTAAgent] safeParse fail", e);
      return null;
    }
  }
} 