import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { agentLog } from "@/lib/logger";

export class TitleOptimizerAgent {
  private llm: ChatOpenAI;
  private prompt: PromptTemplate;
  private parser = new JsonOutputParser<{ titles: string[] }>();

  constructor() {
    this.llm = new ChatOpenAI({
      modelName: process.env.TITLE_MODEL || "gpt-4",
      temperature: 0.4,
      openAIApiKey: process.env.OPENAI_API_KEY!,
    });

    this.prompt = PromptTemplate.fromTemplate(`
Você é um EDITOR SÊNIOR DE FINANÇAS.

Título original: "{originalTitle}"
Resumo executivo: "{summary}"

– Gere 3 variações de título, cada uma com até 60 caracteres.
– Use palavras-chave de alta procura (ex: "impacto", "entenda", "o que muda").
– Seja claro, promissor e evite clickbait.

Retorne apenas JSON:
{
  "titles": ["Variante 1", "Variante 2", "Variante 3"]
}
`);
  }

  /**
   * Retorna até 3 variações de título otimizadas para SEO.
   */
  async optimize(originalTitle: string, summary: string): Promise<string[]> {
    agentLog("TitleOptimizer", "input", { originalTitle, summary });

    const chain = RunnableSequence.from([
      this.prompt,
      this.llm,
      this.parser,
    ]);

    try {
      const res = await chain.invoke({ originalTitle, summary });
      const titles = res.titles.filter(Boolean).slice(0, 3);
      agentLog("TitleOptimizer", "output", titles);
      return titles;
    } catch (err) {
      console.error("[TitleOptimizerAgent] LLM error", err);
      return [];
    }
  }
} 