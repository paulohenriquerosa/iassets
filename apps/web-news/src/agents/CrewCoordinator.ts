/* eslint-disable @typescript-eslint/no-explicit-any */
import { FeedFetcher } from "@/agents/FeedFetcher";
import { PageScraper } from "@/agents/PageScraper";
import { ResearchAgent } from "@/agents/ResearchAgent";
import { WriterAgent } from "@/agents/WriterAgent";
import { CoverAgent } from "@/agents/CoverAgent";
import { NotionPublisher } from "@/agents/NotionPublisher";
import type { FeedItem } from "@/agents/types";
import { sendQuotaExceededAlert } from "@/lib/email";
import { TrendSelectorAgent } from "@/agents/TrendSelectorAgent";
import { TitleOptimizerAgent } from "@/agents/TitleOptimizerAgent";
import { LeadAndHookAgent } from "@/agents/LeadAndHookAgent";
import { SEOEnhancerAgent } from "@/agents/SEOEnhancerAgent";
import { EngagementCTAAgent } from "@/agents/EngagementCTAAgent";
import { StyleGuideAgent } from "@/agents/StyleGuideAgent";
import { RelatedArticlesAgent } from "@/agents/RelatedArticlesAgent";

export class CrewCoordinator {
  private feedFetcher = new FeedFetcher();
  private scraper = new PageScraper();
  private researcher = new ResearchAgent();
  private writer = new WriterAgent();
  private cover = new CoverAgent();
  private publisher = new NotionPublisher();
  private trendSelector = new TrendSelectorAgent();
  private optimizer = new TitleOptimizerAgent();
  private leadAgent = new LeadAndHookAgent();
  private seoAgent = new SEOEnhancerAgent();
  private ctaAgent = new EngagementCTAAgent();
  private styleAgent = new StyleGuideAgent();
  private relatedAgent = new RelatedArticlesAgent();

  async run(): Promise<{
    processed: number;
    skipped: number;
    total: number;
  }> {
    const fetchedItems = await this.feedFetcher.fetch();
    const topK = Number(process.env.TREND_TOP_K ?? 3);
    const items = await this.trendSelector.select(fetchedItems, topK);
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
    const cleanText = scraped.fullText
      .replace(/!\[[^\]]*\]\([^)]*\)/g, "") // remove markdown images
      .replace(/<img[^>]*>/gi, "") // remove html images
      .replace(/https?:\/\/\S+/g, ""); // remove raw URLs

    const research = await this.researcher.research({
      title: item.title,
      link: item.link,
      summary: item.summary,
      fullText: cleanText,
    });
    if (!research) throw new Error("Research failed");

    const optimized = await this.optimizer.optimize(item.title, item.summary);
    const bestTitle = optimized[0] ?? item.title;

    const leadText = await this.leadAgent.createLead(bestTitle, item.summary);
    const related = await this.relatedAgent.recommend(bestTitle, item.summary);
    const draftArticle = await this.writer.draft(
      { title: bestTitle, summary: item.summary, lead: leadText },
      scraped,
      research
    );
    if (!draftArticle) throw new Error("Writer draft failed");

    const seoJson = await this.seoAgent.enhance(draftArticle.content) || {};

    const ctaJson = await this.ctaAgent.suggest(draftArticle.content) || [];

    const article = await this.writer.finalize(
      { title: bestTitle, summary: item.summary, lead: leadText },
      scraped,
      research,
      seoJson,
      ctaJson,
      related
    );
    if (!article) throw new Error("Writer finalize failed");

    const polished = await this.styleAgent.polish(article.content);
    if (polished) {
      article.content = polished;
    }

    const coverUrl = await this.cover.select(article);
    await this.publisher.publish(
      article,
      coverUrl,
      new Date(item.pubDate).toISOString()
    );
  }
}
