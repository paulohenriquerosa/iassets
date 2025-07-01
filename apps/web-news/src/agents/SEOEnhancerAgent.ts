import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { agentLog } from "@/lib/logger";

interface SEOData {
  metaDescription: string;
  keywords: string[];
  internalLinks: string[];
  placements: Array<{ paragraph: number; keyword: string }>;
}

export class SEOEnhancerAgent {
  private llm: ChatOpenAI;
  private prompt: PromptTemplate;
  private parser = new JsonOutputParser<SEOData>();

  constructor() {
    this.llm = new ChatOpenAI({
      modelName: process.env.SEO_MODEL || "gpt-4",
      temperature: 0.3,
      openAIApiKey: process.env.OPENAI_API_KEY!,
    });

    this.prompt = PromptTemplate.fromTemplate(`
Você é um ESPECIALISTA EM SEO PARA FINANÇAS.

Artigo em Markdown:
{content}

– Analise o texto e sugira:
  1. Meta description (até 155 caracteres).
  2. 5 keywords principais para SEO.
  3. 3 sugestões de links internos (URLs padrão do portal).
  4. Pontos onde é válido repetir a palavra-chave (sem forçar).

Retorne apenas JSON:
{
  "metaDescription": "...",
  "keywords": ["key1","key2",...],
  "internalLinks": ["url1","url2","url3"],
  "placements": [
    { "paragraph": 2, "keyword": "..." }
  ]
}
`);
  }

  async enhance(content: string): Promise<SEOData | null> {
    agentLog("SEOEnhancer", "input", content.slice(0,200));

    const chain = RunnableSequence.from([
      this.prompt,
      this.llm,
      this.parser,
    ]);

    try {
      const res = await chain.invoke({ content });
      agentLog("SEOEnhancer", "output", res);
      return res;
    } catch (err) {
      console.error("[SEOEnhancerAgent] LLM error", err);
      return null;
    }
  }
} 