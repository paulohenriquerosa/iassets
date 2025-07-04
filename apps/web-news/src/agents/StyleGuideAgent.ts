import type { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { agentLog } from "@/lib/logger";
import { getLLM } from "@/lib/llm";

export class StyleGuideAgent {
  private llm: ChatOpenAI;
  private prompt: PromptTemplate;
  private parser = new StringOutputParser();

  constructor() {
    this.llm = getLLM("STYLE_MODEL", "gpt-4o-mini", {
      temperature: 0.2,
      maxTokens: 3000,
    });

    this.prompt = PromptTemplate.fromTemplate(`
Você é UM CORRETOR EDITORIAL SÊNIOR de portal financeiro.

Texto em Markdown:
{content}

Aplicando nosso manual de redação interno (títulos <h2>, listas com -, etc.):
– Reescreva o texto corrigindo inconsistências de estilo e gramática.
– Aplique sempre formatação Markdown unificada.
– Mantenha fluidez e clareza.

Retorne apenas o Markdown revisado.
`);
  }

  async polish(content: string): Promise<string | null> {
    agentLog("StyleGuide", "input", content.slice(0,200));
    const chain = RunnableSequence.from([
      this.prompt,
      this.llm,
      this.parser,
    ]);

    try {
      const result = await chain.invoke({ content });
      const out = (result || "")
        .replace(/```markdown\s*/gi, "")
        .replace(/```/g, "")
        .trim();
      agentLog("StyleGuide", "output", out.slice(0,200));
      return out;
    } catch (err) {
      console.error("[StyleGuideAgent] LLM error", err);
      return null;
    }
  }
} 