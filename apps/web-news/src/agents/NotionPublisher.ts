import { Client as NotionClient, BlockObjectRequest } from "@notionhq/client";
import { markdownToBlocks } from "@tryfabric/martian";
import type { Article } from "@/agents/types";

export class NotionPublisher {
  private notion: NotionClient;
  private databaseId: string;
  private SITE_URL: string;

  constructor() {
    this.notion = new NotionClient({ auth: process.env.NOTION_TOKEN! });
    this.databaseId = process.env.NOTION_DATABASE_ID!;
    this.SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || "https://news.iassets.com.br";
  }

  async publish(article: Article, coverUrl: string, isoDate?: string): Promise<void> {
    const slug = article.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 50);

    const escaped = article.content.replace(/\$/g, "\\$");

    // 1. Convert internal relative links to absolute URLs
    const normalized = escaped.replace(/\]\(\/(.*?)\)/g, (_m, slug) => `](${this.SITE_URL}/${slug})`);

    // 2. Convert single-line image URLs to markdown image syntax so Martian treats them as images.
    const withImgMd = normalized.replace(/^(https?:\S+)$/gim, (_m, url) => `![](${url})`);

    // 3. Sanitize all markdown links (including image sources) to ensure they are valid absolute URLs that Notion accepts.
    const sanitized = withImgMd.replace(/(!?\[[^\]]*\])\(([^)]+)\)/g, (_full, prefix, url) => {
      let cleanUrl = url.trim();

      // Remove surrounding angle brackets often used in markdown links, e.g. <https://example.com>
      if (cleanUrl.startsWith("<") && cleanUrl.endsWith(">")) {
        cleanUrl = cleanUrl.slice(1, -1);
      }

      // Remove trailing punctuation that is not part of the URL
      cleanUrl = cleanUrl.replace(/[).,!?:;]+$/g, "");

      // Convert relative URLs to absolute
      if (cleanUrl.startsWith("/")) {
        cleanUrl = `${this.SITE_URL}${cleanUrl}`;
      }

      // Ensure protocol – if none is present prepend https://
      if (!/^(https?:|mailto:|tel:)/i.test(cleanUrl)) {
        cleanUrl = `https://${cleanUrl}`;
      }

      // Validate using WHATWG URL; fall back to returning just the text (removing the link) if invalid
      try {
        const u = new URL(cleanUrl);
        // Notion only allows http/https/mailto/tel. If somehow other scheme appears, drop link.
        if (!/^(http:|https:|mailto:|tel:)/i.test(u.protocol)) throw new Error("Unsupported protocol");
        return `${prefix}(${u.toString()})`;
      } catch {
        // Strip link formatting – return just the text or image alt text.
        const text = prefix.replace(/^!?\[/, "").replace(/\]$/, "");
        return text;
      }
    });

    const blocks = markdownToBlocks(sanitized) as BlockObjectRequest[];

    await this.notion.pages.create({
      parent: { database_id: this.databaseId },
      cover: { type: "external", external: { url: coverUrl } },
      properties: {
        Title: { title: [{ text: { content: article.title } }] },
        Slug: { rich_text: [{ text: { content: slug } }] },
        Date: { date: { start: isoDate || new Date().toISOString() } },
        Summary: { rich_text: [{ text: { content: article.summary } }] },
        Category: { select: { name: article.category } },
        Tags: {
          multi_select: article.tags.map((t) => ({ name: t })),
        },
        Published: { checkbox: true },
      },
      children: blocks,
    });

    console.log(`[NotionPublisher] Published ${article.title}`);
  }
} 