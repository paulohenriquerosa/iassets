/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { load } from "cheerio";
import { ScrapedContent } from "@/agents/types";
import { getJson, setJson } from "@/lib/cache";

export class PageScraper {
  private readonly userAgent =
    process.env.SCRAPER_UA ||
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

  async scrape(link: string): Promise<ScrapedContent> {
    try {
      // Try cache first
      const cacheKey = `scrape:${link}`;
      const cached = await getJson<ScrapedContent>(cacheKey);
      if (cached) {
        console.log(`[PageScraper] Cache hit for ${link}`);
        return cached;
      }

      console.log(`[PageScraper] Downloading ${link}`);
      const { data: html } = await axios.get(link, {
        headers: { "User-Agent": this.userAgent },
        timeout: 15000,
        maxRedirects: 3,
      });

      const $ = load(html);

      // Prefer <article>, otherwise gather paragraphs + headings
      let text = "";
      const articleEl = $("article");
      if (articleEl.length) {
        text = articleEl.text();
      } else {
        $("h1,h2,h3,h4,h5,h6,p").each((_: unknown, el: any) => {
          text += `${$(el).text()}\n`;
        });
      }

      text = text.replace(/\s+/g, " ").trim();

      const result: ScrapedContent = { fullText: text, images: [] };

      // Cache the result for 12h
      await setJson(cacheKey, result, 60 * 60 * 12);

      return result;
    } catch (err: any) {
      console.error(`[PageScraper] Error scraping ${link}:`, err.message);
      return { fullText: "", images: [] };
    }
  }
} 