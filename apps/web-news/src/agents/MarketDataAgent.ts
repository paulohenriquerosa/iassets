/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export class MarketDataAgent {
  private readonly polygonKey = process.env.POLYGON_API_KEY;
  private readonly rapidKey = process.env.RAPIDAPI_YH_KEY;

  /**
   * Retorna até 5 manchetes recentes combinando Polygon e Yahoo Finance.
   */
  async fetchNews(ticker: string, limit = 5): Promise<string[]> {
    const news: string[] = [];
    // Polygon.io news
    if (this.polygonKey) {
      try {
        const url = `https://api.polygon.io/v2/reference/news?ticker=${encodeURIComponent(
          ticker
        )}&limit=${limit}&apiKey=${this.polygonKey}`;
        const res = await axios.get(url, { timeout: 10_000 });
        res.data?.results?.forEach((n: any) => {
          if (n.title) news.push(n.title);
        });
      } catch (err) {
        console.error("[MarketDataAgent] Polygon fetch error", (err as any).message);
      }
    }

    // RapidAPI Yahoo Finance news
    if (this.rapidKey) {
      try {
        const url = `https://yahoo-finance15.p.rapidapi.com/api/yahoo/ne/news/${encodeURIComponent(
          ticker
        )}`;
        const res = await axios.get(url, {
          timeout: 10_000,
          headers: {
            "X-RapidAPI-Key": this.rapidKey,
            "X-RapidAPI-Host": "yahoo-finance15.p.rapidapi.com",
          },
        });
        (res.data as any[])?.forEach((n) => {
          if (n.title) news.push(n.title);
        });
      } catch (err) {
        console.error("[MarketDataAgent] RapidAPI Yahoo fetch error", (err as any).message);
      }
    }

    return news.slice(0, limit);
  }
} 