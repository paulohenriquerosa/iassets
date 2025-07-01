import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import type { Article, ResearchResult, ScrapedContent } from "@/agents/types";
import { jsonrepair } from "jsonrepair";
import { agentLog } from "@/lib/logger";

const CATEGORIES = [
  "Mercados",
  "Criptomoedas",
  "Tecnologia",
  "Economia", 
  "Política",
  "Investimentos",
  "Finanças Pessoais",
  "Internacional",
  "Empresas",
];

const category = CATEGORIES.join(", ");

export class WriterAgent {
  private llm: ChatOpenAI;
  private draftPrompt: PromptTemplate;
  private finalPrompt: PromptTemplate;
  private parser = new StringOutputParser();

  constructor() {
    this.llm = new ChatOpenAI({
      modelName: process.env.WRITER_MODEL || "gpt-4",
      temperature: 0.3,
      openAIApiKey: process.env.OPENAI_API_KEY!,
      maxTokens: 2048,
    });

    this.draftPrompt = PromptTemplate.fromTemplate(`
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

Lead pronto: {lead}

Se 'Lead pronto' NÃO estiver vazio, use-o como primeiro parágrafo sem modificações.
Caso contrário, crie o lead seguindo as instruções abaixo.

Escreva um artigo jornalístico completo EM PORTUGUÊS em Markdown seguindo:
1. Lead (WHO, WHAT, WHEN, WHERE, WHY)
2. Seções com "## Subtítulo"
3. Parágrafos de tamanho variado conforme o conteúdo
4. Escolha uma categoria com base no conteúdo do artigo
5. Use listas e tabelas quando útil
6. Finalize com análise ou perspectiva futura

Retorne apenas JSON válido:
{{
 "title": "Título sucinto e analítico (≤60)",
 "summary": "Resumo executivo",
 "content": "Markdown completo",
 "category": "${category}",
 "tags": ["tag1", "tag2", "tag3", "tag4"]
}}
`);

    // Enhanced prompt for final article incorporating SEO and CTAs
    this.finalPrompt = PromptTemplate.fromTemplate(`
Você é um JORNALISTA FINANCEIRO SÊNIOR, especializado em produzir notícias e análises sobre mercado financeiro, economia, criptomoedas e política econômica.
Use tom informativo e objetivo, mas mantenha a leitura fluida e engajadora.

DADOS INICIAIS:
Título bruto: "{title}"
Resumo original: "{summary}"
Lead pronto: "{lead}"
Texto bruto (máx. 4000 chars):
{fullText}

PESQUISA E CONTEXTO:
Fatos relacionados (JSON): {relatedFacts}
Estatísticas (JSON): {statistics}
Citações externas (JSON): {externalQuotes}

SEO E ENGAJAMENTO:
SEO (meta + keywords + links internos) em JSON: {seoJson}
CTAs recomendados em JSON: {ctaJson}
Artigos relacionados em JSON: {relatedArticlesJson}

REQUISITOS DE SAÍDA:
- O lead (primeiro parágrafo) deve ser **ou** o "Lead pronto" **ou** um novo.
- Use **## Subtítulo** para cada seção.
- Insira a **meta description** como comentário HTML no topo: \`<!-- meta: ... -->\`.
- Inclua CTAs no final.
- Escolha a **categoria** dentre: ${category}.
- Gere até 5 **tags**, priorizando keywords do SEO JSON.

RETORNE APENAS UM JSON VÁLIDO:
{{
  "title": "Título final (≤60 chars)",
  "summary": "Resumo executivo (máx. 160 chars)",
  "metaDescription": "...",
  "category": "...",
  "tags": ["..."],
  "content": "Markdown completo"
}}
`);
  }

  async draft(
    original: { title: string; summary: string; lead?: string },
    scraped: ScrapedContent,
    research: ResearchResult
  ): Promise<Article | null> {
    const chain = RunnableSequence.from([
      this.draftPrompt,
      this.llm,
      this.parser,
    ]);

    agentLog("WriterAgent", "draft-input", {
      title: original.title,
      summary: original.summary,
    });

    const raw = await chain.invoke({
      title: original.title,
      summary: original.summary,
      fullText: scraped.fullText.substring(0, 4000), // limit
      relatedFacts: JSON.stringify(research.relatedFacts ?? []),
      statistics: JSON.stringify(research.statistics ?? []),
      externalQuotes: JSON.stringify(research.externalQuotes ?? []),
      // no original images
      lead: original.lead ?? "",
    });

    const article = this.safeParse(raw);
    agentLog("WriterAgent", "draft-output", article);
    return article;
  }

  async finalize(
    original: { title: string; summary: string; lead?: string },
    scraped: ScrapedContent,
    research: ResearchResult,
    seoJson: object,
    ctaJson: object,
    relatedArticlesJson: object
  ): Promise<Article | null> {
    const chain = RunnableSequence.from([
      this.finalPrompt,
      this.llm,
      this.parser,
    ]);

    agentLog("WriterAgent", "finalize-input", { seoJson, ctaJson, relatedArticlesJson });

    const raw = await chain.invoke({
      title: original.title,
      summary: original.summary,
      lead: original.lead ?? "",
      fullText: scraped.fullText.substring(0, 4000),
      relatedFacts: JSON.stringify(research.relatedFacts ?? []),
      statistics: JSON.stringify(research.statistics ?? []),
      externalQuotes: JSON.stringify(research.externalQuotes ?? []),
      seoJson: JSON.stringify(seoJson),
      ctaJson: JSON.stringify(ctaJson),
      relatedArticlesJson: JSON.stringify(relatedArticlesJson),
    });

    const article = this.safeParse(raw);
    agentLog("WriterAgent", "finalize-output", article);
    return article;
  }

  private safeParse(raw: string): Article | null {
    try {
      const clean = raw.replace(/```json\s*/gi, "").replace(/```/g, "").trim();
      const jsonMatch = clean.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("no-object");

      try {
        return JSON.parse(jsonMatch[0]);
      } catch {
        // tenta reparar
        return JSON.parse(jsonrepair(jsonMatch[0]));
      }
    } catch (e) {
      console.error("[WriterAgent] safeParse fail", e);
      return null;
    }
  }
} 