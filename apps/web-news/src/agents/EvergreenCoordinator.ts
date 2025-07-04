 
import { TrendAggregatorAgent } from "@/agents/TrendAggregatorAgent";
import { EvergreenStrategistAgent } from "@/agents/EvergreenStrategistAgent";
import { TopicResearchAgent } from "@/agents/TopicResearchAgent";
import { EvergreenWriterAgent } from "@/agents/EvergreenWriterAgent";
import { EditorAgent } from "@/agents/EditorAgent";
import { StyleGuideAgent } from "@/agents/StyleGuideAgent";
import { SEOEnhancerAgent } from "@/agents/SEOEnhancerAgent";
import { CoverAgent } from "@/agents/CoverAgent";
import { NotionPublisher } from "@/agents/NotionPublisher";
import { ArticleIndexer } from "@/agents/ArticleIndexer";
import { DuplicateDetectionAgent } from "@/agents/DuplicateDetectionAgent";

export class EvergreenCoordinator {
  private readonly trendAgg = new TrendAggregatorAgent();
  private readonly strategist = new EvergreenStrategistAgent();
  private readonly researcher = new TopicResearchAgent();
  private readonly writer = new EvergreenWriterAgent();
  private readonly editor = new EditorAgent();
  private readonly style = new StyleGuideAgent();
  private readonly seo = new SEOEnhancerAgent();
  private readonly cover = new CoverAgent();
  private readonly publisher = new NotionPublisher();
  private readonly indexer = new ArticleIndexer();
  private readonly dup = new DuplicateDetectionAgent();

  /**
   * Executa o fluxo completo. Retorna métricas básicas.
   */
  async run(): Promise<{ processed: number; skipped: number; total: number }> {
    // 1. Tendências recentes (top 30 keywords)
    const aggKeywords = await this.trendAgg.aggregate({ topK: 30 });
    const keywords = aggKeywords.map((k) => k.keyword);

    // 2. Seleciona tópicos evergreen
    const evergreenTopics = await this.strategist.select(keywords, 5);

    let processed = 0;
    let skipped = 0;

    for (const topic of evergreenTopics) {
      try {
        // duplicate detection by title
        const duplicate = await this.dup.exists(topic.title, topic.angle);
        if (duplicate) {
          console.log(`[EvergreenCoordinator] Duplicate, skipping: ${topic.title}`);
          skipped++;
          continue;
        }

        // 3. Pesquisa
        const research = await this.researcher.research(topic);
        if (!research) {
          skipped++;
          continue;
        }

        // 4. Redação
        const article = await this.writer.write(topic, research);
        if (!article) {
          skipped++;
          continue;
        }

        // 5. Revisão editorial
        const reviewed = await this.editor.review(article.content);
        if (reviewed) article.content = reviewed;

        // 6. Polimento de estilo
        const polished = await this.style.polish(article.content);
        if (polished) article.content = polished;

        // 7. SEO extra
        const seoData = await this.seo.enhance(article.content);
        if (seoData) {
          article.metaDescription = seoData.metaDescription;
          article.keywords = seoData.keywords;
          article.internalLinks = seoData.internalLinks;
        }

        // 8. Capa
        const coverUrl = await this.cover.select(article);

        // 9. Publicação
        await this.publisher.publish(article, coverUrl, new Date().toISOString());

        // 10. Indexação & duplicate index
        await Promise.all([
          this.indexer.add(article.title, article.summary, new Date().toISOString()),
          this.dup.add(article.title, article.summary),
        ]);

        processed++;
      } catch (err) {
        console.error("[EvergreenCoordinator] Error", err);
        skipped++;
      }
    }

    return { processed, skipped, total: evergreenTopics.length };
  }
} 