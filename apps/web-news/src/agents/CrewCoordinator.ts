/* eslint-disable @typescript-eslint/no-explicit-any */
import { FeedFetcher } from "@/agents/FeedFetcher";
import { PageScraper } from "@/agents/PageScraper";
import { ResearchAgent } from "@/agents/ResearchAgent";
import { WriterAgent } from "@/agents/WriterAgent";
import { CoverAgent } from "@/agents/CoverAgent";
import { NotionPublisher } from "@/agents/NotionPublisher";
import type { FeedItem } from "@/agents/types";
import { sendQuotaExceededAlert } from "@/lib/email";
import { markProcessed } from "@/lib/cache";
import { TrendSelectorAgent } from "@/agents/TrendSelectorAgent";
import { TitleOptimizerAgent } from "@/agents/TitleOptimizerAgent";
import { LeadAndHookAgent } from "@/agents/LeadAndHookAgent";
import { SEOEnhancerAgent } from "@/agents/SEOEnhancerAgent";
import { StyleGuideAgent } from "@/agents/StyleGuideAgent";
import { RelatedArticlesAgent } from "@/agents/RelatedArticlesAgent";
import { DuplicateDetectionAgent } from "@/agents/DuplicateDetectionAgent";
import { ArticleIndexer } from "@/agents/ArticleIndexer";
import { TwitterThreadAgent } from "@/agents/TwitterThreadAgent";
import { qstashPublishJSON } from "@/lib/qstash";
import { SponsoredContentDetector } from "@/agents/SponsoredContentDetector";

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
  private styleAgent = new StyleGuideAgent();
  private relatedAgent = new RelatedArticlesAgent();
  private dupAgent = new DuplicateDetectionAgent();
  private indexer = new ArticleIndexer();
  private twitterAgent = new TwitterThreadAgent();
  private sponsorDetector = new SponsoredContentDetector();

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
      // duplicate detection before heavy processing
      try {
        const isDuplicate = await this.dupAgent.exists(item.title, item.summary || "");
        if (isDuplicate) {
          console.log(`[CrewCoordinator] Duplicate detected, skipping: ${item.title}`);
          skipped++;
          continue;
        }
      } catch (err) {
        console.error("[CrewCoordinator] dup check error", err);
      }

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
    // Skip if already processed recently
    const isNew = await markProcessed(item.link);
    if (!isNew) {
      console.log(`[CrewCoordinator] Skipping already processed: ${item.link}`);
      return;
    }

    const scraped = await this.scraper.scrape(item.link);
    const cleanText = scraped.fullText
      .replace(/!\[[^\]]*\]\([^)]*\)/g, "") // remove markdown images
      .replace(/<img[^>]*>/gi, "") // remove html images
      .replace(/https?:\/\/\S+/g, ""); // remove raw URLs

    // Detect and skip sponsored/promotional content (heuristic + AI)
    if (await this.sponsorDetector.detect({
      title: item.title,
      summary: item.summary,
      fullText: cleanText,
    })) {
      console.log(`[CrewCoordinator] Sponsored content detected, skipping: ${item.title}`);
      return;
    }

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

    const ctaJson: object[] = []; // CTA desativado

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

    // Inserir links internos para artigos relacionados com base na semântica
    try {
      const linkRes = await this.relatedAgent.insertLinks(article.content);
      article.content = linkRes.content;
    } catch (err) {
      console.error("[CrewCoordinator] linkify error", err);
    }

    // Remover links externos (apenas manter texto) para evitar URLs de outros sites
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || "https://news.iassets.com.br";
    const siteHost = (() => {
      try {
        return new URL(siteUrl).hostname.replace(/^www\./, "");
      } catch {
        return "";
      }
    })();

    article.content = article.content.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/gi, (_match, text, link) => {
      try {
        const u = new URL(link);
        const host = u.hostname.replace(/^www\./, "");
        if (host.endsWith(siteHost)) return _match; // interno OK
      } catch {}
      return text; // remove link, mantém texto
    });

    const coverUrl = await this.cover.select(article);
    await this.publisher.publish(
      article,
      coverUrl,
      new Date(item.pubDate).toISOString()
    );

    // Generate and publish Twitter thread asynchronously (non-blocking)
    try {
      const slug = article.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
        .slice(0, 50);
      const articleUrl = `${siteUrl}/${slug}`;

      const tweets = await this.twitterAgent.generateThread({
        title: article.title,
        summary: article.summary,
        content: article.content,
        url: articleUrl,
        coverUrl,
      });
      // Enfileira a publicação via QStash para rodar em função separada
      if (tweets.length) {
        const dest = `${siteUrl}/api/twitter-worker`;
        await qstashPublishJSON({
          url: dest,
          body: { tweets, coverUrl, uniqueId: articleUrl },
        });
      }
    } catch (err) {
      console.error("[CrewCoordinator] twitter generate error", err);
    }

    // After successful publish, add to duplicate index
    try {
      await Promise.all([
        this.dupAgent.add(item.title, item.summary || ""),
        this.indexer.add(article.title, article.summary, item.pubDate),
      ]);
    } catch (err) {
      console.error("[CrewCoordinator] dup add error", err);
    }
  }
}
