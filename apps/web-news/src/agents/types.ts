export interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  summary: string;
}

export interface ScrapedContent {
  fullText: string;
  images: Array<{ url: string; alt: string; caption?: string }>;
}

export interface ResearchResult {
  relatedFacts: string[];
  statistics: string[];
  externalQuotes: string[];
}

export interface Article {
  title: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
} 