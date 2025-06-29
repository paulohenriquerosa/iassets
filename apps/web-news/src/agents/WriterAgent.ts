import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import type { Article, ResearchResult, ScrapedContent } from "@/agents/types";

const CATEGORIES = [
  "Mercados",
  "Criptomoedas",
  "Global",
  "Tecnologia",
  "Economia", 
  "Política",
  "Investimentos",
  "Bolsa de Valores",
  "Finanças Pessoais",
  "Impostos",
  "Seguros",
  "Previdência",
  "Empreendedorismo",
];

const category = CATEGORIES.join(", ");

export class WriterAgent {
  private llm: ChatOpenAI;
  private prompt: PromptTemplate;
  private parser = new StringOutputParser();

  constructor() {
    this.llm = new ChatOpenAI({
      modelName: process.env.WRITER_MODEL || "gpt-4",
      temperature: 0.3,
      openAIApiKey: process.env.OPENAI_API_KEY!,
      maxTokens: 2048,
    });

    this.prompt = PromptTemplate.fromTemplate(`
Você é um JORNALISTA FINANCEIRO.

Dados:
Título: {title}
Resumo original: {summary}

Texto completo:
{fullText}

Fatos relacionados:
{relatedFacts}

Estatísticas:
{statistics}

Citações externas:
{externalQuotes}

IMAGENS DISPONÍVEIS:
{images}

Escreva um artigo jornalístico completo EM PORTUGUÊS em Markdown seguindo:
1. Lead (WHO, WHAT, WHEN, WHERE, WHY)
2. Seções com "## Subtítulo"
3. Parágrafos de tamanho variado conforme o conteúdo
4. Escolha uma categoria com base no conteúdo do artigo
5. Use listas e tabelas quando útil
6. Incorpore imagens com sintaxe ![alt](url) onde fizer sentido
7. Finalize com análise ou perspectiva futura

Retorne apenas JSON válido:
{{
 "title": "Título sucinto e analítico (≤60)",
 "summary": "Resumo executivo",
 "content": "Markdown completo",
 "category": "${category}",
 "tags": ["tag1", "tag2", "tag3", "tag4"]
}}
`);
  }

  async write(
    original: { title: string; summary: string },
    scraped: ScrapedContent,
    research: ResearchResult
  ): Promise<Article | null> {
    const chain = RunnableSequence.from([
      this.prompt,
      this.llm,
      this.parser,
    ]);

    const raw = await chain.invoke({
      title: original.title,
      summary: original.summary,
      fullText: scraped.fullText.substring(0, 4000), // limit
      relatedFacts: JSON.stringify(research.relatedFacts ?? []),
      statistics: JSON.stringify(research.statistics ?? []),
      externalQuotes: JSON.stringify(research.externalQuotes ?? []),
      images: scraped.images
        .slice(0, 5)
        .map((img) => `${img.url} (${img.alt})`) // context list
        .join("\n"),
    });

    return this.safeParse(raw);
  }

  private safeParse(content: string): Article | null {
    try {
      const clean = content.replace(/```json\s*/gi, "").replace(/```/g, "").trim();
      const jsonMatch = clean.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error("No JSON found");
    } catch (e) {
      console.error("[WriterAgent] safeParse fail", e);
      return null;
    }
  }
} 