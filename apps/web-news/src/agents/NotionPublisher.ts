 
import { Client as NotionClient, BlockObjectRequest } from "@notionhq/client";
import { markdownToBlocks } from "@tryfabric/martian";
import type { Article } from "@/agents/types";

export class NotionPublisher {
  private notion: NotionClient;
  private databaseId: string;

  constructor() {
    this.notion = new NotionClient({ auth: process.env.NOTION_TOKEN! });
    this.databaseId = process.env.NOTION_DATABASE_ID!;
  }

  async publish(article: Article, coverUrl: string, isoDate?: string): Promise<void> {
    const slug = article.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 50);

    const escaped = article.content.replace(/\$/g, "\\$");
    const blocks = markdownToBlocks(escaped) as BlockObjectRequest[];

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