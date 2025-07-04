/* eslint-disable @typescript-eslint/no-explicit-any */
import { Index } from "@upstash/vector";
import OpenAI from "openai";
import type { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { agentLog } from "@/lib/logger";
import { getLLM } from "@/lib/llm";

export interface RelatedArticle {
  title: string;
  slug: string;
}

export class RelatedArticlesAgent {
  private index: any;
  private llm: ChatOpenAI;
  private prompt: PromptTemplate;
  private parser = new StringOutputParser();
  private openai: OpenAI;

  constructor() {
    this.index = new Index({
      url: process.env.UPSTASH_VECTOR_REST_URL!,
      token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
      indexName: process.env.UPSTASH_VECTOR_INDEX_NAME || "articles",
      vector: 1536, // text-embedding-3-small dimension
    });

    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

    this.llm = getLLM("RELATED_MODEL", "gpt-3.5-turbo", { temperature: 0 });

    this.prompt = PromptTemplate.fromTemplate(`
Você é um ASSISTENTE DE RECOMENDAÇÃO DE LEITURA.

Notícia atual:
Título: {title}
Resumo: {summary}

Lista de artigos similares (JSON):
{candidates}

Cada item de candidates tem:
  - "title": título do artigo já publicado  
  - "slug": caminho relativo (ex: "/mercado-alta-ibovespa")  
  - "score": similaridade (0–1)

Selecione até 3 artigos que sejam **realmente relevantes** para linkar dentro do texto.
RETORNE APENAS UM JSON VÁLIDO seguindo o formato:
{{
  "related": [
    {{ "title": "...", "slug": "..." }}
  ]
}}
`);
  }

  async recommend(title: string, summary: string): Promise<RelatedArticle[]> {
    agentLog("RelatedArticles", "input", { title, summary });

    const emb = await this.embed(`${title}. ${summary}`);

    const res: any = await this.index.query({
      vector: emb,
      topK: 10,
      includeMetadata: true,
      includeVectors: false,
    });

    let candidates = (res.matches || [])
      .filter((m: any) => !!m.metadata?.slug && m.metadata.slug !== "")
      .map((m: any) => ({
        title: m.metadata.title as string,
        slug: m.metadata.slug as string,
        score: m.score as number,
      }));

    // keep only those above 0.7; if none, fallback to best 5 hits
    const strong = candidates.filter((c: { score: number }) => c.score > 0.7);
    candidates = strong.length > 0 ? strong : candidates.slice(0, 5);

    if (candidates.length === 0) {
      agentLog("RelatedArticles", "no-candidates", {});
      return [];
    }

    const chain = RunnableSequence.from([
      this.prompt,
      this.llm,
      this.parser,
    ]);

    try {
      const raw = await chain.invoke({
        title,
        summary,
        candidates: JSON.stringify(candidates, null, 2),
      });
      const obj = JSON.parse(raw) as { related: RelatedArticle[] };
      agentLog("RelatedArticles", "output", obj.related);
      return obj.related ?? [];
    } catch (err) {
      console.error("[RelatedArticlesAgent] error", err);
      return [];
    }
  }

  private async embed(text: string): Promise<number[]> {
    const res = await this.openai.embeddings.create({ model: "text-embedding-3-small", input: text });
    return res.data[0].embedding as number[];
  }

  /**
   * Insere links markdown para até 3 artigos relacionados (internos) diretamente no texto.
   * A estratégia:
   * 1. Gera embedding do conteúdo completo.
   * 2. Consulta o índice e obtém topK matches (já ordenado por similaridade).
   * 3. Ordena os candidatos pela data (mais recentes primeiro).
   * 4. Para cada candidato, tenta encontrar a primeira ocorrência de uma palavra-chave (primeira palavra
   *    relevante do título) dentro do texto e substitui por link Markdown.
   */
  async insertLinks(content: string, maxLinks = 3): Promise<{ content: string; used: RelatedArticle[] }> {
    // 0. Sanity check
    if (!content || content.length < 50) {
      return { content, used: [] };
    }

    // 1. Embed full content (truncate a 8000 caracteres para não explodir custo)
    const embedding = await this.embed(content.slice(0, 8000));

    // 2. Query vector DB
    // retorna também metadata.date
    const res: any = await this.index.query({
      vector: embedding,
      topK: 15,
      includeMetadata: true,
      includeVectors: false,
    });

    const candidates = (res.matches || [])
      .filter((m: any) => !!m.metadata?.slug)
      .map((m: any) => ({
        title: m.metadata.title as string,
        slug: m.metadata.slug as string,
        date: m.metadata.date as string,
        score: m.score as number,
      }))
      // desc score first then date recent
      .sort((a: any, b: any) => {
        const scoreDiff = b.score - a.score;
        if (Math.abs(scoreDiff) > 0.05) return scoreDiff;
        // tie-break by date (newer first)
        return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime();
      });

    const used: RelatedArticle[] = [];
    let modified = content;

    for (const cand of candidates) {
      if (used.length >= maxLinks) break;

      const anchor = this.findAnchorPhrase(cand.title, modified);
      if (!anchor) continue;

      // evite linkar mesmo slug duas vezes
      if (used.some((u) => u.slug === cand.slug)) continue;

      const escaped = anchor.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // escape regex
      const regex = new RegExp(escaped, "i");
      modified = modified.replace(regex, `[${anchor}](/${cand.slug})`);
      used.push({ title: cand.title, slug: cand.slug });
    }

    return { content: modified, used };
  }

  /**
   * Tenta encontrar no texto uma frase de até 8 palavras derivada do título.
   * Retorna a frase exata encontrada (case original) ou null.
   */
  private findAnchorPhrase(title: string, content: string): string | null {
    const tokens = title
      .split(/\s+/)
      .map((t) => t.replace(/[^\p{L}\p{N}]/gu, ""))
      .filter(Boolean);

    // Limite de 8 palavras para anchor.
    const maxLen = Math.min(8, tokens.length);
    const contentLower = content.toLowerCase();

    // Tenta do mais longo (8) para o mais curto (1 palavra >=4 letras)
    for (let len = maxLen; len >= 1; len--) {
      for (let i = 0; i <= tokens.length - len; i++) {
        const phraseTokens = tokens.slice(i, i + len);
        const phrase = phraseTokens.join(" ");
        if (phraseTokens.join("").length < 4) continue; // evita âncoras insignificantes

        if (contentLower.includes(phrase.toLowerCase())) {
          // Recupera a frase com mesma capitalização do texto original
          const regex = new RegExp(phrase, "i");
          const match = content.match(regex);
          if (match) return match[0];
        }
      }
    }
    return null;
  }
} 