/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import { FeedItem } from "@/agents/types";

// Read environment
const FEED_URLS: string[] = (process.env.FEED_URLS?.split("|") ?? [
  "https://investnews.com.br/feed-news/",
  "https://br.cointelegraph.com/rss",
  "https://www.infomoney.com.br/feed/",
  "https://g1.globo.com/rss/g1/economia/",
  "https://g1.globo.com/dynamo/mundo/rss2.xml",
  "https://g1.globo.com/rss/g1/"
]).filter(Boolean);

const MAX_ITEMS = Number(process.env.MAX_ITEMS ?? 5);
const TIME_WINDOW_HOURS = Number(process.env.TIME_WINDOW_HOURS ?? 1);

export class FeedFetcher {
  private parser: XMLParser;

  constructor() {
    this.parser = new XMLParser({ ignoreAttributes: false });
  }

  async fetch(): Promise<FeedItem[]> {
    const allItems: FeedItem[] = [];

    for (const url of FEED_URLS) {
      try {
        console.log(`[FeedFetcher] Fetching ${url}`);
        const { data } = await axios.get<string>(url, { timeout: 15000 });
        const json = this.parser.parse(data) as any;

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
              pubDate:
                u["news:news"]?.["news:publication_date"] ?? new Date().toISOString(),
              summary: "",
            }));
        }

        allItems.push(...items);
      } catch (err) {
        console.error(`[FeedFetcher] Error processing ${url}:`, (err as any).message);
      }
    }

    // Deduplicate by link
    const uniqueMap = new Map<string, FeedItem>();
    for (const item of allItems) {
      if (!uniqueMap.has(item.link)) {
        uniqueMap.set(item.link, item);
      }
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

    console.log(`[FeedFetcher] Total items ${allItems.length} | Unique ${uniqueItems.length} | Recent ${recentItems.length} (≤${TIME_WINDOW_HOURS}h)`);

    return recentItems;
  }
} 