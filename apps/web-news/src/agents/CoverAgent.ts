/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { createApi } from "unsplash-js";
import type { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { getLLM } from "@/lib/llm";

// Unsplash init
const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY ?? "",
});

interface ImageCandidate {
  url: string;
  description: string;
  source: string;
}

const IS_LOCAL = process.env.NODE_ENV !== "production";

export class CoverAgent {
  private llm: ChatOpenAI;
  private queryPrompt: PromptTemplate;
  private choosePrompt: PromptTemplate;
  private queryParser = new JsonOutputParser<{ queries: string[] }>();
  private chooseParser = new JsonOutputParser<{ best: number }>();

  constructor() {
    this.llm = getLLM("COVER_MODEL", "gpt-3.5-turbo", {
      temperature: 0.4,
    });

    this.queryPrompt = PromptTemplate.fromTemplate(`
Gere entre 3 e 5 queries de busca em inglês para encontrar imagens profissionais para a seguinte matéria.

Título: {title}
Resumo: {summary}
Tags: {tags}

Retorne APENAS JSON válido:
{{\n  "queries": ["query 1", "query 2", "query 3"]\n}}
`);

    this.choosePrompt = PromptTemplate.fromTemplate(`
Selecione a melhor imagem da lista com base no artigo.

Título: {title}
Resumo: {summary}

IMAGENS:
{images}

Retorne APENAS JSON válido:
{{ "best": 2 }}
`);
  }

  async select(article: { title: string; summary: string; tags: string[] }): Promise<{ url: string; alt: string }> {
    const queries = await this.generateQueries(article);
    const candidates = await this.searchImages(queries);

    if (candidates.length === 0) {
      console.warn("[CoverAgent] No images found, returning default");
      return { url: this.defaultCover(), alt: article.title };
    }

    const bestUrl = (await this.rank(article, candidates)) || this.defaultCover();
    const alt = article.title; // simple alt fallback
    return { url: bestUrl, alt };
  }

  private async generateQueries(article: { title: string; summary: string; tags: string[] }): Promise<string[]> {
    const chain = RunnableSequence.from([
      this.queryPrompt,
      this.llm,
      this.queryParser,
    ]);

    try {
      const result = await chain.invoke(article);
      return result.queries.slice(0, 5);
    } catch {
      return [];
    }
  }

  private async searchImages(queries: string[]): Promise<ImageCandidate[]> {
    const candidates: ImageCandidate[] = [];

    // Unsplash
    for (const q of queries) {
      try {
        const res = await unsplash.search.getPhotos({ query: q, perPage: 4 });
        res.response?.results.forEach((img) => {
          candidates.push({
            url: img.urls.regular,
            description: img.alt_description || q,
            source: "Unsplash",
          });
        });
      } catch (err) {
        console.error("[CoverAgent] Unsplash error", (err as any).message);
      }
    }

    // Pexels
    if (process.env.PEXELS_API_KEY) {
      for (const q of queries) {
        try {
          const res = await axios.get("https://api.pexels.com/v1/search", {
            headers: { Authorization: process.env.PEXELS_API_KEY },
            params: { query: q, per_page: 4 },
          });
          (res.data.photos as any[]).forEach((p) => {
            candidates.push({
              url: p.src.original,
              description: p.alt || q,
              source: "Pexels",
            });
          });
        } catch (err) {
          console.error("[CoverAgent] Pexels error", (err as any).message);
        }
      }
    }

    // Google Custom Search (optional)
    if (!IS_LOCAL && process.env.GOOGLE_API_KEY && process.env.GOOGLE_CX_ID) {
      for (const q of queries) {
        try {
          const res = await axios.get("https://www.googleapis.com/customsearch/v1", {
            params: {
              key: process.env.GOOGLE_API_KEY,
              cx: process.env.GOOGLE_CX_ID,
              q: q,
              searchType: "image",
              num: 4,
              safe: "active",
              imgSize: "large",
              imgType: "photo",
            },
            timeout: 8000,
          });

          (res.data.items as any[] | undefined)?.forEach((item) => {
            const link = item.link as string;
            if (!link || !link.match(/\.(jpg|jpeg|png|webp)$/i)) return;

            candidates.push({
              url: link,
              description: item.title || q,
              source: "Google",
            });
          });
        } catch (err: any) {
          if (err?.response?.status === 429) {
            console.warn("[CoverAgent] Google quota exceeded – skipping");
            break;
          }
          console.error("[CoverAgent] Google error", err.message);
        }
      }
    }

    // Remove duplicates
    const set = new Set<string>();
    const unique = candidates.filter((c) => {
      if (set.has(c.url)) return false;
      set.add(c.url);
      return true;
    });

    return unique;
  }

  private async rank(article: { title: string; summary: string }, images: ImageCandidate[]): Promise<string | null> {
    // Prepare list
    const list = images
      .map((img, idx) => `${idx + 1}. ${img.source}: ${img.description}`)
      .join("\n");

    const chain = RunnableSequence.from([
      this.choosePrompt,
      this.llm,
      this.chooseParser,
    ]);

    const result = await chain.invoke({
      title: article.title,
      summary: article.summary,
      images: list,
    });

    const bestIdx = result.best - 1;
    if (bestIdx >= 0 && bestIdx < images.length) return images[bestIdx].url;
    return null;
  }

  private defaultCover(): string {
    return "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop";
  }
} 