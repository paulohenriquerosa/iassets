import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { JsonOutputParser } from "@langchain/core/output_parsers";

export interface VisualsResult {
  charts: Array<{ type: string; data: string }>;
  callouts: string[];
  imagePrompts: string[];
}

export class VisualsAgent {
  private llm: ChatOpenAI;
  private prompt: PromptTemplate;
  private parser = new JsonOutputParser<VisualsResult>();

  constructor() {
    this.llm = new ChatOpenAI({
      modelName: process.env.VISUALS_MODEL || "gpt-4",
      temperature: 0.4,
      openAIApiKey: process.env.OPENAI_API_KEY!,
    });

    this.prompt = PromptTemplate.fromTemplate(`
Você é um DESIGNER DE CONTEÚDO FINANCEIRO.

Dado o artigo sobre "{title}":\n\n{content}\n\nIndique:
1. Até 3 gráficos (tipo e dados resumidos) que ilustrem pontos-chave.
2. 2 sugestões de infográfico/texto em destaque (bullet).
3. 3 descrições de imagens geradas por IA (para image_gen), em inglês, para contexto de notícia.

Retorne JSON:
{
  "charts": [
    { "type": "line", "data": "variação do Ibovespa nos últimos 30 dias" }
  ],
  "callouts": ["texto em destaque 1","texto em destaque 2"],
  "imagePrompts": ["aerial view of stock market trading floor"]
}
`);
  }

  async suggest(title: string, content: string): Promise<VisualsResult | null> {
    const chain = RunnableSequence.from([
      this.prompt,
      this.llm,
      this.parser,
    ]);

    try {
      const res = await chain.invoke({ title, content });
      return res;
    } catch (err) {
      console.error("[VisualsAgent] LLM error", err);
      return null;
    }
  }
} 