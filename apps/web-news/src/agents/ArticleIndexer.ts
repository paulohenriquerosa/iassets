import { Index } from "@upstash/vector";
import OpenAI from "openai";

export class ArticleIndexer {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private index: any;
  private openai: OpenAI;

  constructor() {
    this.index = new Index({
      url: process.env.UPSTASH_VECTOR_REST_URL!,
      token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
      indexName: process.env.UPSTASH_VECTOR_INDEX_NAME || "articles",
      vector: 1536,
    });
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
  }

  private slugify(text: string) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 50);
  }

  async add(title: string, summary: string): Promise<string> {
    const slug = this.slugify(title);
    const text = `${title}. ${summary}`;

    // Embed content
    const res = await this.openai.embeddings.create({ model: "text-embedding-3-small", input: text });
    const vector = res.data[0].embedding as number[];

    // Use slug as deterministic id (safe for updates)
    await this.index.upsert([
      {
        id: slug,
        vector,
        metadata: { title, slug, summary },
      },
    ]);

    return slug;
  }
} 