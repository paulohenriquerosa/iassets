import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { JsonOutputParser } from "@langchain/core/output_parsers";

export interface CTAItem {
  type: "comment" | "related" | "newsletter" | string;
  slug?: string;
  text: string;
}

export class EngagementCTAAgent {
  private llm: ChatOpenAI;
  private prompt: PromptTemplate;
  private parser = new JsonOutputParser<{ ctas: CTAItem[] }>();

  constructor() {
    this.llm = new ChatOpenAI({
      modelName: process.env.CTA_MODEL || "gpt-4",
      temperature: 0.5,
      openAIApiKey: process.env.OPENAI_API_KEY!,
    });

    this.prompt = PromptTemplate.fromTemplate(`
Você é UM REDATOR DE MATÉRIAS DIGITAIS.

Artigo final em Markdown:
{content}

– Sugira 3 CTAs diferentes:  
  a) convite para comentar.  
  b) link para um artigo relacionado (forneça o slug).  
  c) inscrição na newsletter (frase curta).  

Retorne JSON:
{
  "ctas": [
    { "type":"comment", "text":"Gostou deste artigo? Deixe sua opinião abaixo!" },
    { "type":"related", "slug":"/impacto-fed-nos-investimentos", "text":"Entenda também como a decisão do Fed afeta seus ativos" },
    { "type":"newsletter", "text":"Assine nossa newsletter para receber análises diárias!" }
  ]
}
`);
  }

  async suggest(content: string): Promise<CTAItem[] | null> {
    const chain = RunnableSequence.from([
      this.prompt,
      this.llm,
      this.parser,
    ]);

    try {
      const res = await chain.invoke({ content });
      return res.ctas ?? [];
    } catch (err) {
      console.error("[EngagementCTAAgent] LLM error", err);
      return null;
    }
  }
} 