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

// Headers for RapidAPI Yahoo Finance fallback
const RAPID_HOST = "yahoo-finance15.p.rapidapi.com";

export async function fetchMarketData(): Promise<MarketTickerItem[]> {
  return unstable_cache(async () => {
    const symbolsList = Object.values(lookup).join(",");
    let results: any[] = [];

    // 1) Tentativa original (query1.finance.yahoo)
    try {
      const q = encodeURIComponent(symbolsList);
      const res = await fetch(
        `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${q}`,
        {
          headers: { "User-Agent": "Mozilla/5.0 (iAssets News Ticker)" },
          next: { revalidate: 300 },
        },
      );
      if (res.ok) {
        const data = await res.json();
        results = data.quoteResponse.result as any[];
      }
    } catch {}

    // 2) Fallback RapidAPI Yahoo Finance se não obtivemos dados
    if (results.length === 0 && process.env.RAPIDAPI_YH_KEY) {
      try {
        const url = `https://${RAPID_HOST}/market/v2/get-quotes?symbols=${encodeURIComponent(symbolsList)}&region=US`;
        const res = await fetch(url, {
          headers: {
            "X-RapidAPI-Key": process.env.RAPIDAPI_YH_KEY!,
            "X-RapidAPI-Host": RAPID_HOST,
          },
          next: { revalidate: 300 },
        });
        if (res.ok) {
          const data = await res.json();
          results = data.quoteResponse?.result ?? [];
        }
      } catch (err) {
        console.error("[market] RapidAPI fetch error", (err as any).message);
      }
    }

    return Object.entries(lookup).map(([label, ysymbol]) => {
      const r = results.find((q) => q.symbol === ysymbol);
      const price = typeof r?.regularMarketPrice === "number" ? r.regularMarketPrice : 0;
      const changePerc = typeof r?.regularMarketChangePercent === "number" ? r.regularMarketChangePercent : 0;

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