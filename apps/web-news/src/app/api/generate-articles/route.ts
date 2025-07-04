/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { FeedFetcher } from "@/agents/FeedFetcher";
import { qstashPublishJSON } from "@/lib/qstash";
import { DuplicateDetectionAgent } from "@/agents/DuplicateDetectionAgent";
import { TrendSelectorAgent } from "@/agents/TrendSelectorAgent";
import { CrewCoordinator } from "@/agents/CrewCoordinator";

export const runtime = "nodejs";

const IS_LOCAL = process.env.NODE_ENV !== "production" || process.env.QSTASH_DISABLE === "1";

export async function GET() {
  try {
    const fetcher = new FeedFetcher();
    const itemsRaw = await fetcher.fetch();

    const dupAgent = new DuplicateDetectionAgent();
    const deduped: typeof itemsRaw = [];
    for (const it of itemsRaw) {
      const dup = await dupAgent.exists(it.title, it.summary || "");
      if (!dup) deduped.push(it);
    }

    // 1️⃣ Seleciona tendências de maior potencial
    const selector = new TrendSelectorAgent();
    const topK = Number(process.env.TREND_TOP_K ?? 3);
    const items = await selector.select(deduped, topK);

    if (items.length === 0) {
      return NextResponse.json({ enqueued: 0, skipped: "no_trends" });
    }

    if (IS_LOCAL) {
      // process synchronously without queue
      const coord = new CrewCoordinator();
      let processed = 0;
      for (const it of items) {
        try {
          await coord.processItem(it);
          processed++;
        } catch (err) {
          console.error("[generate-articles] local process error", err);
        }
      }
      return NextResponse.json({ processed, mode: "local" });
    }

    const results = await Promise.all(
      items.map((it) =>
        qstashPublishJSON({
          url: `${process.env.NEXT_PUBLIC_APP_URL}/api/article-worker`,
          body: it,
        })
      )
    );

    return NextResponse.json({ enqueued: results.length });
  } catch (err: any) {
    console.error("[generate-articles] Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
} 