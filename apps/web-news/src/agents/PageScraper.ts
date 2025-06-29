/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { load } from "cheerio";
import { ScrapedContent } from "@/agents/types";

export class PageScraper {
  private readonly userAgent =
    process.env.SCRAPER_UA ||
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

  async scrape(link: string): Promise<ScrapedContent> {
    try {
      console.log(`[PageScraper] Downloading ${link}`);
      const { data: html } = await axios.get<string>(link, {
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

      // Extract images
      const images: Array<{ url: string; alt: string; caption?: string }> = [];
      $("img").each((_: unknown, img: any) => {
        const url = $(img).attr("src") || "";
        if (!url) return;
        const alt = ($(img).attr("alt") || "").trim();
        // Attempt caption via <figure><figcaption>
        const fig = $(img).closest("figure");
        const caption = fig.find("figcaption").text().trim() || undefined;
        images.push({ url, alt, caption });
      });

      return { fullText: text, images };
    } catch (err: any) {
      console.error(`[PageScraper] Error scraping ${link}:`, err.message);
      return { fullText: "", images: [] };
    }
  }
} 