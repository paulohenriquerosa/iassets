import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import type { ChatOpenAI } from "@langchain/openai";

import { EvergreenTopic } from "@/agents/EvergreenStrategistAgent";
import type { Article, ResearchResult } from "@/agents/types";
import { jsonrepair } from "jsonrepair";
import { getLLM, logTokenUsage } from "@/lib/llm";
import { agentLog } from "@/lib/logger";

export class EvergreenWriterAgent {
  private readonly llm: ChatOpenAI;
  private readonly prompt: PromptTemplate;
  private readonly parser = new StringOutputParser();

  constructor() {
    this.llm = getLLM("EVERGREEN_WRITER_MODEL", "gpt-4o-mini", {
      temperature: 0.35,
      maxTokens: 4000,
    });

    this.prompt = PromptTemplate.fromTemplate(`
Você é um REDATOR DE CONTEÚDO FINANCEIRO EVERGREEN.
Sua missão é transformar pesquisa e outline em um artigo de longa duração, útil hoje e no futuro.

TÓPICO PRINCIPAL: {keyword}
ÂNGULO: {angle}
FORMATO: {format}

TÍTULO PROVISÓRIO: {title}

OUTLINE:
{outline}

PESQUISA (JSON):
Fatos: {relatedFacts}
Estatísticas: {statistics}
Citações: {externalQuotes}

Diretrizes de Redação:
1. Escreva em português claro, tom informativo e acessível (finanças para leigos – nível investidor iniciante a intermediário).
2. Introdução envolvente: contextualize por que o tema é relevante agora, sem usar datas específicas (ex.: "nos últimos anos", "recentemente").
3. Utilize os subtítulos do outline como seções H2 ("## {{Subtitulo}}").  Se precisar sub-seções use H3.
4. Incorpore dados e citações da pesquisa, sempre referenciando a fonte entre parênteses depois da frase – exemplo: (Investopedia).
5. Mantenha estrutura Markdown.
6. Inclua listas numeradas ou bullet points quando aplicável.
7. Conclua com um parágrafo de recapitulação + call-to-action genérica (ex.: "Assine nossa newsletter para mais insights").
8. Limite o título a 60 caracteres e a meta description (gerar!) a 160.

RETORNE APENAS UM JSON VÁLIDO no formato:
{{
  "title": "...",
  "summary": "...",
  "metaDescription": "...",
  "category": "Educação Financeira",
  "tags": ["...", "..."],
  "content": "markdown..."
}}
`);
  }

  async write(topic: EvergreenTopic, research: ResearchResult): Promise<Article | null> {
    const chain = RunnableSequence.from([
      this.prompt,
      this.llm,
      this.parser,
    ]);

    const raw = await chain.invoke({
      keyword: topic.keyword,
      angle: topic.angle,
      format: topic.format,
      title: topic.title,
      outline: topic.outline.join("\n"),
      relatedFacts: JSON.stringify(research.relatedFacts ?? []),
      statistics: JSON.stringify(research.statistics ?? []),
      externalQuotes: JSON.stringify(research.externalQuotes ?? []),
    });

    // log tokens approx
    await logTokenUsage("EvergreenWriter", "write", this.llm, topic.keyword, raw);

    const article = this.safeParse(raw);
    agentLog("EvergreenWriter", "output", article?.title || "parse-fail");
    return article;
  }

  private safeParse(raw: string): Article | null {
    try {
      const clean = raw.replace(/```json\s*/gi, "").replace(/```/g, "").trim();
      const jsonMatch = clean.match(/\{[\s\S]*\}/);
      let jsonStr: string | null = jsonMatch ? jsonMatch[0] : null;

      // fallback: recorta primeiro '{' ao último '}'
      if (!jsonStr && clean.includes("{")) {
        const first = clean.indexOf("{");
        const last = clean.lastIndexOf("}");
        if (last > first) jsonStr = clean.substring(first, last + 1);
      }

      if (!jsonStr) throw new Error("no-json-found");

      try {
        return JSON.parse(jsonStr);
      } catch {
        return JSON.parse(jsonrepair(jsonStr));
      }
    } catch (err) {
      console.error("[EvergreenWriterAgent] safeParse error", err);
      return null;
    }
  }
} 