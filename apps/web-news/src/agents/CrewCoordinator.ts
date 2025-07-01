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
import { VisualsAgent } from "@/agents/VisualsAgent";
import { EngagementCTAAgent } from "@/agents/EngagementCTAAgent";
import { StyleGuideAgent } from "@/agents/StyleGuideAgent";

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
  private visualsAgent = new VisualsAgent();
  private ctaAgent = new EngagementCTAAgent();
  private styleAgent = new StyleGuideAgent();

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
    const research = await this.researcher.research({
      title: item.title,
      link: item.link,
      summary: item.summary,
      fullText: scraped.fullText,
    });
    if (!research) throw new Error("Research failed");

    const optimized = await this.optimizer.optimize(item.title, item.summary);
    const bestTitle = optimized[0] ?? item.title;

    const leadText = await this.leadAgent.createLead(bestTitle, item.summary);
    const article = await this.writer.write(
      { title: bestTitle, summary: item.summary, lead: leadText },
      scraped,
      research
    );
    if (!article) throw new Error("Writer failed");

    const seo = await this.seoAgent.enhance(article.content);
    if (seo) {
      // merge tags with keywords
      const extraTags = seo.keywords.filter((k) => !article.tags.includes(k));
      article.tags.push(...extraTags.slice(0, 10 - article.tags.length));
      article.metaDescription = seo.metaDescription;
      article.keywords = seo.keywords;
      if (seo.internalLinks && seo.internalLinks.length) {
        article.internalLinks = seo.internalLinks;
      }

      // adjust content by repeating keywords and adding links section
      const paragraphs = article.content.split(/\n\s*\n/);
      (seo.placements || []).forEach(({ paragraph, keyword }) => {
        const idx = paragraph - 1;
        if (idx >= 0 && idx < paragraphs.length && !paragraphs[idx].includes(keyword)) {
          paragraphs[idx] = `${paragraphs[idx]} ${keyword}`;
        }
      });

      article.content = paragraphs.join("\n\n");
      if (seo.internalLinks && seo.internalLinks.length) {
        const linksMd = seo.internalLinks.map((l) => `- [Leia também](${l})`).join("\n");
        article.content += `\n\n## Veja também\n${linksMd}`;
      }
    }

    const visuals = await this.visualsAgent.suggest(bestTitle, article.content);
    if (visuals) {
      // append callouts section
      if (visuals.callouts && visuals.callouts.length) {
        const calloutsMd = visuals.callouts.map((c) => `> **${c}**`).join("\n\n");
        article.content += `\n\n${calloutsMd}`;
      }

      // embed placeholder images for generated prompts
      if (visuals.imagePrompts && visuals.imagePrompts.length) {
        const imagesMd = visuals.imagePrompts
          .map((p) => `![${p}](https://via.placeholder.com/800x400.png?text=${encodeURIComponent(p)})`)
          .join("\n\n");
        article.content += `\n\n${imagesMd}`;
      }

      // add charts suggestions as bullet list at end
      if (visuals.charts && visuals.charts.length) {
        const chartsMd = visuals.charts
          .map((c) => `- ${c.type} chart: ${c.data}`)
          .join("\n");
        article.content += `\n\n## Visualizações sugeridas\n${chartsMd}`;
      }
    }

    const ctas = await this.ctaAgent.suggest(article.content);
    if (ctas && ctas.length) {
      const sectionLines: string[] = ["\n\n---\n## Continue Engajado\n"];
      ctas.forEach((cta) => {
        if (cta.type === "comment") {
          sectionLines.push(cta.text);
        } else if (cta.type === "related" && cta.slug) {
          sectionLines.push(`👉 [${cta.text}](${cta.slug})`);
        } else if (cta.type === "newsletter") {
          sectionLines.push(cta.text);
        }
      });
      article.content += sectionLines.join("\n\n");
    }

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
