/* eslint-disable @typescript-eslint/no-explicit-any */

import { XMLParser } from "fast-xml-parser";
import { FeedItem } from "@/agents/types";
import axios from "axios";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { getJson, setJson } from "@/lib/cache";

// Read environment
const FEED_URLS: string[] = (process.env.FEED_URLS?.split("|") ?? [
  "https://investnews.com.br/feed-news/",
  "https://br.cointelegraph.com/rss",
  "https://www.infomoney.com.br/feed/",
  "https://g1.globo.com/rss/g1/economia/",
  "https://g1.globo.com/dynamo/mundo/rss2.xml",
]).filter(Boolean);

const MAX_ITEMS = Number(process.env.MAX_ITEMS ?? 5);
const TIME_WINDOW_HOURS = Number(process.env.TIME_WINDOW_HOURS ?? 1);

export class FeedFetcher {
  private parser: XMLParser;
  // Axios used for HTTP fetches; retryable
  // Tavily fallback (optional — only if API key present)
  private tavily = process.env.TAVILY_API_KEY
    ? new TavilySearchResults({ apiKey: process.env.TAVILY_API_KEY })
    : null;

  constructor() {
    this.parser = new XMLParser({ ignoreAttributes: false });
  }

  async fetch(): Promise<FeedItem[]> {
    // Clone array to allow pushing alt URLs sem afetar constante global
    const urlQueue = [...FEED_URLS];
    const allItems: FeedItem[] = [];

    await Promise.all(
      urlQueue.map(async (url) => {
        try {
          const cacheKey = `rss:${url}`;
          let xml = await getJson<string>(cacheKey);

          if (!xml) {
            // HTTP fetch
            const res = await axios.get(url, { timeout: 15000 });
            xml = res.data;
            // Cache por 10 min para evitar rate-limit
            await setJson(cacheKey, xml, 600);
          }

          const json = this.parser.parse(xml as string) as any;
          const items = this.extractItems(json);
          allItems.push(...items);
        } catch (err: any) {
          console.error(`[FeedFetcher] Error processing ${url}:`, err.message);

          // Fallback: tenta descobrir outro feed via Tavily
          if (this.tavily) {
            try {
              const domain = new URL(url).hostname.replace(/^www\./, "");
              const altResults: any = await this.tavily.call(`"${domain}" rss feed`);
              const altUrl: string | undefined = altResults?.[0]?.url ?? altResults?.[0];
              if (altUrl && !urlQueue.includes(altUrl)) {
                console.log(`[FeedFetcher] Discovered alternative feed ${altUrl}`);
                urlQueue.push(altUrl);
              }
            } catch (e) {
              console.warn("[FeedFetcher] Tavily fallback failed", (e as any).message);
            }
          }
        }
      })
    );

    return this.postProcess(allItems);
  }

  /** Normaliza RSS/News-sitemap em FeedItem[] */
  private extractItems(json: any): FeedItem[] {
    let items: FeedItem[] = [];

    if (json.rss?.channel?.item) {
      items = (json.rss.channel.item as any[])
        .slice(0, MAX_ITEMS)
        .map((it) => ({
          title: (it.title ?? "").toString().trim(),
          link: it.link ?? "",
          pubDate: it.pubDate ?? new Date().toISOString(),
          summary: (it.description ?? "").toString().trim(),
        }));
    } else if (json.urlset?.url) {
      // Google news-sitemap
      items = (json.urlset.url as any[])
        .slice(0, MAX_ITEMS)
        .map((u) => ({
          title: (u["news:news"]["news:title"] ?? "").toString().trim(),
          link: u.loc ?? "",
          pubDate: u["news:news"]?.["news:publication_date"] ?? new Date().toISOString(),
          summary: "",
        }));
    }

    return items;
  }

  /** Deduplica, filtra janela de tempo e loga métricas */
  private postProcess(allItems: FeedItem[]): FeedItem[] {
    // Deduplicate by link
    const uniqueMap = new Map<string, FeedItem>();
    for (const item of allItems) {
      if (!uniqueMap.has(item.link)) uniqueMap.set(item.link, item);
    }

    const uniqueItems = Array.from(uniqueMap.values());

    // Time window filter
    const cutoff = Date.now() - TIME_WINDOW_HOURS * 60 * 60 * 1000;
    const recentItems = uniqueItems.filter((it) => {
      try {
        return new Date(it.pubDate).getTime() >= cutoff;
      } catch {
        return false;
      }
    });

    console.log(
      `[FeedFetcher] Total ${allItems.length} | Unique ${uniqueItems.length} | Recent ${recentItems.length} (≤${TIME_WINDOW_HOURS}h)`
    );

    return recentItems;
  }
} 