import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import type { ChatOpenAI } from "@langchain/openai";
import { getLLM, logTokenUsage } from "@/lib/llm";
import type { Article, ResearchResult } from "@/agents/types";
import { jsonrepair } from "jsonrepair";
import { agentLog } from "@/lib/logger";

interface FactCheckOutput {
  corrected: Article;
  issues: string[];
}

export class FactCheckAgent {
  private llm: ChatOpenAI;
  private prompt: PromptTemplate;
  private parser = new StringOutputParser();

  constructor() {
    this.llm = getLLM("FACTCHECK_MODEL", "gpt-4o-mini", {
      temperature: 0,
      maxTokens: 2500,
    });

    this.prompt = PromptTemplate.fromTemplate(`
Você é um *Fact-Checker Financeiro* sênior. Receberá um artigo jornalístico em Markdown e dados estruturados de pesquisa.
Sua tarefa é:
1. Identificar afirmações factuais potencialmente incorretas, não verificadas ou desatualizadas.
2. Corrigir apenas onde houver evidência nos *Research Facts* ou em conhecimento público recente (até a data atual).
3. Se algo não puder ser verificado, marque como *[FACTCHECK: verificar]* sem alterar o texto original.
4. Manter estilo e formatação.
5. Não mude opiniões/análises, foque em fatos (datas, números, cargos, valores, citações).

Retorne APENAS JSON válido no formato:
{{
  "corrected": {{ "title": "...", "summary": "...", "content": "...", "category": "...", "tags": ["..."] }},
  "issues": ["descrição breve do problema identificado", "..."]
}}

CONTEXTO:
=== ARTICLE ===
Título: {title}
Resumo: {summary}
Categoria: {category}
Tags: {tags}

{content}
=== END ARTICLE ===

=== RESEARCH FACTS ===
{researchFacts}
=== END FACTS ===
`);
  }

  async verify(article: Article, research: ResearchResult): Promise<FactCheckOutput | null> {
    const chain = RunnableSequence.from([
      this.prompt,
      this.llm,
      this.parser,
    ]);

    const researchFacts = [
      ...research.relatedFacts,
      ...research.statistics,
      ...research.externalQuotes,
    ].join("; \n");

    agentLog("FactCheckAgent", "verify-input", { title: article.title });

    const raw = await chain.invoke({
      title: article.title,
      summary: article.summary,
      category: article.category,
      tags: JSON.stringify(article.tags ?? []),
      content: article.content,
      researchFacts,
    });

    await logTokenUsage("FactCheckAgent", "verify", this.llm, JSON.stringify(article), raw);

    return this.safeParse(raw);
  }

  private safeParse(raw: string): FactCheckOutput | null {
    try {
      const clean = raw.replace(/```json\s*/gi, "").replace(/```/g, "").trim();
      const jsonMatch = clean.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No JSON block found");
      const jsonStr = jsonMatch[0];
      try {
        return JSON.parse(jsonStr) as FactCheckOutput;
      } catch {
        return JSON.parse(jsonrepair(jsonStr)) as FactCheckOutput;
      }
    } catch (e) {
      console.error("[FactCheckAgent] safeParse fail", e);
      return null;
    }
  }
} 