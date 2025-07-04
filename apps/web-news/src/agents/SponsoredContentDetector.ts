import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { getLLM } from "@/lib/llm";

/**
 * SponsoredContentDetector
 * Heuristic detection of sponsored, advertorial or promotional content to avoid publishing it.
 * Looks for common Portuguese and English keywords that usually denote paid or sponsored articles.
 */
export class SponsoredContentDetector {
  private patterns: RegExp[] = [
    /conte[úu]do patrocinado/i,
    /p(a|á)ublic(o|idade) editorial/i,
    /publieditorial/i,
    /este conte[úu]do (foi )?pago/i,
    /materi[áa] paga/i,
    /oferecido por/i,
    /patrocinad[ao] (por)?/i,
    /sponsored content/i,
    /sponsored by/i,
    /advertorial/i,
    /advertisement/i,
    /promo[çc][aã]o/i,
    /publicidade/i,
  ];

  private aiChain = RunnableSequence.from([
    PromptTemplate.fromTemplate(`Você é um analista de mídia experiente.
Seu trabalho é identificar se um artigo é PATROCINADO, ADVERTORIAL ou possui clara intenção promocional.

Avalie título, resumo e conteúdo completo (texto sem imagens).

Responda apenas SIM ou NAO conforme os critérios:
 - SIM: Existe forte indicação de que o texto promove explicitamente um produto, marca ou serviço (ex: menções de marca, call-to-action comercial, termos como "patrocinado", "oferecido por", "anunciante" etc.).
 - NAO: É notícia/reportagem imparcial sem intenção promocional.

TÍTULO: {title}
RESUMO: {summary}
CONTEÚDO: {fullText}`),
    getLLM("SPONSORED_MODEL", "gpt-4o-mini", { temperature: 0 }),
    new StringOutputParser(),
  ]);

  /**
   * Checks if the provided texts include indicators of sponsored/promotional material.
   * @param title Article title
   * @param summary Feed summary / description
   * @param fullText Scraped full text (optional but recommended)
   * @returns true if content seems sponsored
   */
  isSponsored({
    title = "",
    summary = "",
    fullText = "",
  }: {
    title?: string;
    summary?: string;
    fullText?: string;
  }): boolean {
    const combined = `${title}\n${summary}\n${fullText}`.toLowerCase();
    return this.patterns.some((re) => re.test(combined));
  }

  /**
   * Uses the AI chain to perform a deeper inspection. Returns true when the model
   * outputs "SIM" (case-insensitive).
   */
  async isSponsoredAI({
    title = "",
    summary = "",
    fullText = "",
  }: {
    title?: string;
    summary?: string;
    fullText?: string;
  }): Promise<boolean> {
    // To control cost, truncate very long bodies (~3k chars ≈ 1k tokens)
    const truncated = fullText.slice(0, 3000);
    try {
      const decision = await this.aiChain.invoke({ title, summary, fullText: truncated });
      return decision.trim().toUpperCase().startsWith("SIM");
    } catch (e) {
      console.error("[SponsoredContentDetector] AI detection error", e);
      return false; // fail-open (i.e., treat as non-sponsored to avoid blocking valid news)
    }
  }

  /**
   * Combined check: heuristic THEN AI (to save tokens when obvious).
   */
  async detect(input: {
    title?: string;
    summary?: string;
    fullText?: string;
  }): Promise<boolean> {
    if (this.isSponsored(input)) return true;
    return await this.isSponsoredAI(input);
  }
} 