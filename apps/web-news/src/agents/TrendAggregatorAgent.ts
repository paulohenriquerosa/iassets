import axios from "axios";
import { TwitterApi } from "twitter-api-v2";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface TrendItem {
  keyword: string;
  weight: number; // soma de relevância em diferentes fontes
  sources: string[]; // ex.: ["google-trends", "twitter"]
}

/**
 * TrendAggregatorAgent
 * -----------------------------------------------------------
 * Este agente consulta diversas APIs públicas / SaaS para descobrir
 * quais termos estão em alta no momento dentro do nicho financeiro.
 * Ele consolida os resultados, atribui pesos simples e devolve uma
 * lista ranqueada.  Por simplicidade, não depende de nenhuma base
 * de dados externa – toda a lógica é in-memory.
 *
 * Dependências:
 * – axios (já presente)
 * – twitter-api-v2 (já presente)
 *
 * As chaves/API-tokens devem ser passadas via variáveis de ambiente:
 * – TWITTER_BEARER_TOKEN
 */
export class TrendAggregatorAgent {
  private readonly twitterClient?: TwitterApi;
  private readonly searchTool?: TavilySearchResults;

  constructor() {
    const token = process.env.TWITTER_BEARER_TOKEN;
    if (token) {
      this.twitterClient = new TwitterApi(token);
    }

    // Tavily opcional para trending keywords fallback
    const tavilyKey = process.env.TAVILY_API_KEY;
    if (tavilyKey) {
      this.searchTool = new TavilySearchResults({ apiKey: tavilyKey });
    }
  }

  /**
   * Entry-point público. Recebe lista opcional de *nichos* para filtrar
   * resultados e retorna os *topK* itens consolidados.
   */
  async aggregate({ niches = [], topK = 20 }: { niches?: string[]; topK?: number } = {}): Promise<TrendItem[]> {
    const buckets: TrendItem[] = [];

    // 1) Google Trends (Realtime)
    const googleResults = await this.fetchGoogleTrends();
    this.mergeBuckets(buckets, googleResults);

    // 2) Twitter Trends (se token presente)
    if (this.twitterClient) {
      const twitterResults = await this.fetchTwitterTrends();
      this.mergeBuckets(buckets, twitterResults);
    }

    // 3) Reddit (opcional / simples web-scrape)
    const redditResults = await this.fetchRedditHot();
    this.mergeBuckets(buckets, redditResults);

    // 4) Fallback Tavily search for "financial trending topics" se buckets vazio
    if (buckets.length === 0 && this.searchTool) {
      const tav = await this.fetchTavilyTrends();
      this.mergeBuckets(buckets, tav);
    }

    // Filtra por nichos se informado
    const filtered = niches.length
      ? buckets.filter((b) => niches.some((n) => b.keyword.toLowerCase().includes(n.toLowerCase())))
      : buckets;

    // Ordena por peso descendente
    const ordered = filtered.sort((a, b) => b.weight - a.weight);

    return ordered.slice(0, topK);
  }

  /* -------------------------------------------------------- */
  /* Private helpers                                          */
  /* -------------------------------------------------------- */

  private mergeBuckets(target: TrendItem[], incoming: TrendItem[]) {
    for (const item of incoming) {
      const existing = target.find((t) => t.keyword.toLowerCase() === item.keyword.toLowerCase());
      if (existing) {
        existing.weight += item.weight;
        existing.sources.push(...item.sources);
      } else {
        target.push({ ...item });
      }
    }
  }

  /**
   * Google Trends realtime (Top stories)
   * Nota: a API não oficial retorna JSON precedido por ")]}'".
   */
  private async fetchGoogleTrends(): Promise<TrendItem[]> {
    try {
      const url = "https://trends.google.com/trends/api/realtimetrends?hl=pt-BR&tz=-180&geo=BR&cat=b"; // b = business
      const { data } = await axios.get<string>(url, {
        headers: { "User-Agent": "Mozilla/5.0" },
        timeout: 10000,
      });
      const jsonString = data.replace(/^\)]}'?,?/, "");
      const json = JSON.parse(jsonString);

      const stories = json.storySummaries?.trendingStories ?? [];
      const items: TrendItem[] = stories.map((s: any) => ({
        keyword: s.title ?? s.entityNames?.[0] ?? "",
        weight: 2, // peso base para Google Trends
        sources: ["google-trends"],
      })).filter((i: TrendItem) => i.keyword);

      return items;
    } catch (err) {
      console.error("[TrendAggregator] Google Trends error", (err as any).message);
      return [];
    }
  }

  /**
   * Twitter trending topics (WOEID Brasil = 23424768). Requer bearer token.
   */
  private async fetchTwitterTrends(): Promise<TrendItem[]> {
    if (!this.twitterClient) return [];
    try {
      const BR_WOEID = 23424768;
      const trends = await this.twitterClient.v1.trendsByPlace(BR_WOEID);
      const items: TrendItem[] = (trends[0]?.trends ?? []).map((t: any) => ({
        keyword: t.name.replace(/^#/, ""),
        weight: t.tweet_volume ? Math.min(5, Math.log10(t.tweet_volume)) : 1,
        sources: ["twitter"],
      }));
      return items;
    } catch (err) {
      console.error("[TrendAggregator] Twitter error", (err as any).message);
      return [];
    }
  }

  /**
   * Reddit hot posts de r/investing (sem API, apenas HTML fetch + regex)
   */
  private async fetchRedditHot(): Promise<TrendItem[]> {
    try {
      const url = "https://www.reddit.com/r/investing/hot.json?limit=25";
      const { data } = await axios.get(url, { timeout: 10000, headers: { "User-Agent": "Mozilla/5.0" } });
      const items: TrendItem[] = (data.data?.children ?? []).map((c: any) => ({
        keyword: c.data?.title ?? "",
        weight: 1,
        sources: ["reddit"],
      })).filter((i: TrendItem) => i.keyword);
      return items;
    } catch (err) {
      console.error("[TrendAggregator] Reddit error", (err as any).message);
      return [];
    }
  }

  /** Tavily fallback – busca termos trending */
  private async fetchTavilyTrends(): Promise<TrendItem[]> {
    try {
      if (!this.searchTool) return [];
      const res = await this.searchTool.call("top finance trends Brazil");
      return res.slice(0, 10).map((r: any) => ({
        keyword: r.title.split(" –")[0],
        weight: 1,
        sources: ["tavily"],
      }));
    } catch (err) {
      console.error("[TrendAggregator] tavily error", (err as any).message);
      return [];
    }
  }
} 