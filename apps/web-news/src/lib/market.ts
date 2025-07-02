/* eslint-disable @typescript-eslint/no-explicit-any */

import { unstable_cache } from "next/cache";

export interface MarketTickerItem {
  symbol: string;
  value: string;
  change: string;
  positive: boolean;
}

const lookup: Record<string, string> = {
  IBOV: "^BVSP",
  "USD/BRL": "USDBRL=X",
  BTC: "BTC-USD",
  EURBRL: "EURBRL=X",
  PETR4: "PETR4.SA",
  VALE3: "VALE3.SA",
  ITUB4: "ITUB4.SA",
  "S&P 500": "^GSPC",
  DOW: "^DJI",
  NASDAQ: "^IXIC",
};

export async function fetchMarketData(): Promise<MarketTickerItem[]> {
  return unstable_cache(async () => {
    const query = Object.values(lookup).map(encodeURIComponent).join("%2C");
    let results: any[] = [];
    try {
      const res = await fetch(
        `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${query}`,
        {
          headers: { "User-Agent": "Mozilla/5.0 (iAssets News Ticker)" },
          next: { revalidate: 300 },
        },
      );
      if (!res.ok) throw new Error();
      const data = await res.json();
      results = data.quoteResponse.result as any[];
    } catch {
      // fallback empty results
      results = [];
    }
    return Object.entries(lookup).map(([label, ysymbol]) => {
      const r = results.find((q) => q.symbol === ysymbol);
      const price = r?.regularMarketPrice ?? 0;
      const changePerc = r?.regularMarketChangePercent ?? 0;

      let currency: string | undefined;
      if (label === "USD/BRL" || label === "EUR/BRL") currency = "BRL";
      else if (label === "BTC") currency = "USD";

      const formatter = Intl.NumberFormat("pt-BR", {
        style: currency ? "currency" : "decimal",
        currency,
        minimumFractionDigits: 2,
      });

      return {
        symbol: label,
        value: formatter.format(price),
        change: `${changePerc > 0 ? "+" : ""}${changePerc.toFixed(2)}%`,
        positive: changePerc >= 0,
      } as MarketTickerItem;
    });
  }, ["market-ticker"], { revalidate: 300 })();
} 