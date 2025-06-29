/* eslint-disable @typescript-eslint/no-explicit-any */
import { FeedFetcher } from "@/agents/FeedFetcher";
import { PageScraper } from "@/agents/PageScraper";
import { ResearchAgent } from "@/agents/ResearchAgent";
import { WriterAgent } from "@/agents/WriterAgent";
import { CoverAgent } from "@/agents/CoverAgent";
import { NotionPublisher } from "@/agents/NotionPublisher";
import type { FeedItem } from "@/agents/types";
import { sendQuotaExceededAlert } from "@/lib/email";

export class CrewCoordinator {
  private feedFetcher = new FeedFetcher();
  private scraper = new PageScraper();
  private researcher = new ResearchAgent();
  private writer = new WriterAgent();
  private cover = new CoverAgent();
  private publisher = new NotionPublisher();

  async run(): Promise<{
    processed: number;
    skipped: number;
    total: number;
  }> {
    const items = await this.feedFetcher.fetch();
    let processed = 0;
    let skipped = 0;

    for (const item of items) {
      try {
        await this.processItem(item);
        processed++;
      } catch (err: any) {
        console.error(`[CrewCoordinator] Error processing "${item.title}":`, err);
        if (err?.message?.includes("exceeded your current quota")) {
          await sendQuotaExceededAlert(err.message);
          // parar processamento
          break;
        }
        skipped++;
      }
    }

    return { processed, skipped, total: items.length };
  }

  async processItem(item: FeedItem): Promise<void> {
    const scraped = await this.scraper.scrape(item.link);
    const research = await this.researcher.research({
      title: item.title,
      link: item.link,
      summary: item.summary,
      fullText: scraped.fullText,
    });
    if (!research) throw new Error("Research failed");

    const article = await this.writer.write(
      { title: item.title, summary: item.summary },
      scraped,
      research
    );
    if (!article) throw new Error("Writer failed");

    const coverUrl = await this.cover.select(article);
    await this.publisher.publish(
      article,
      coverUrl,
      new Date(item.pubDate).toISOString()
    );
  }
}
