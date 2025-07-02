import type { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { agentLog } from "@/lib/logger";
import { getLLM } from "@/lib/llm";

export class LeadAndHookAgent {
  private llm: ChatOpenAI;
  private prompt: PromptTemplate;
  private parser = new StringOutputParser();

  constructor() {
    this.llm = getLLM("LEAD_MODEL", "gpt-4o-mini", {
      temperature: 0.8,
    });

    this.prompt = PromptTemplate.fromTemplate(`
Você é um JORNALISTA FINANCEIRO EXPERIENTE.

Notícia: "{title}"
Resumo executivo: "{summary}"

– Escreva o primeiro parágrafo (lead) em até 2 frases.
– Inclua WHO-WHAT-WHEN-WHERE-WHY e explique em poucas palavras o impacto para investidores.
– Seja direto e instigante, criando urgência de leitura.

Retorne apenas o texto do lead.
`);
  }

  async createLead(title: string, summary: string): Promise<string> {
    agentLog("LeadAndHook", "input", { title, summary });

    const chain = RunnableSequence.from([
      this.prompt,
      this.llm,
      this.parser,
    ]);

    try {
      const lead = await chain.invoke({ title, summary });
      const cleanLead = (lead || "").trim();
      agentLog("LeadAndHook", "output", cleanLead);
      return cleanLead;
    } catch (err) {
      console.error("[LeadAndHookAgent] LLM error", err);
      return "";
    }
  }
} 