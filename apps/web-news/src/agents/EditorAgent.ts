import type { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";

import { agentLog } from "@/lib/logger";
import { getLLM } from "@/lib/llm";

export class EditorAgent {
  private readonly llm: ChatOpenAI;
  private readonly prompt: PromptTemplate;
  private readonly parser = new StringOutputParser();

  constructor() {
    this.llm = getLLM("EDITOR_MODEL", "gpt-4o-mini", {
      temperature: 0.2,
      maxTokens: 3500,
    });

    this.prompt = PromptTemplate.fromTemplate(`
Você é um EDITOR SÊNIOR de portal financeiro focado em conteúdo evergreen.

Tarefas obrigatórias:
1. Verifique e corrija gramática, ortografia e fluidez.
2. Garanta consistência de estilo Markdown (títulos ##, listas -, etc.).
3. Remova ou substitua expressões temporais relativas ("hoje", "ontem", "na semana passada") por termos atemporais ("recentemente", "nos últimos anos").
4. Confirme que o texto NÃO contenha datas específicas que gerarão obsolescência, exceto quando estritamente necessário para exemplo histórico.
5. Cheque coerência de argumento; elimine contradições.
6. Melhore SEO on-page sutilmente: assegure que a palavra-chave principal (quando clara) apareça no H1/Título e em pelo menos 2 subtítulos.
7. Mantenha o tom informativo-acessível do iAssets.

TEXTO ORIGINAL (Markdown):
{content}

=== FIM ===

Retorne APENAS o Markdown revisado (sem trechos de código, sem JSON). Se não houver ajustes, devolva o texto intacto.
`);
  }

  async review(content: string): Promise<string | null> {
    agentLog("EditorAgent", "input", content.slice(0, 200));

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
      agentLog("EditorAgent", "output", out.slice(0, 200));

      // Quick groundedness heuristic: penalize if too many "may", "might", "could"
      const hedges = (out.match(/\b(may|might|could|possibly)\b/gi) || []).length;
      const score = 1 - Math.min(hedges / 20, 1); // simple 0-1 scale
      if (score < 0.6) {
        console.warn("[EditorAgent] Low groundedness heuristic score", score.toFixed(2));
      }

      return out;
    } catch (err) {
      console.error("[EditorAgent] LLM error", err);
      return null;
    }
  }
} 