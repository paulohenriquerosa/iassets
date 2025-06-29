/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { FeedFetcher } from "@/agents/FeedFetcher";
import { qstash } from "@/lib/qstash";

export const runtime = "nodejs";

export async function GET() {
  try {

    const fetcher = new FeedFetcher();
    const items = await fetcher.fetch();

    const results = await Promise.all(
      items.map((it) =>
        qstash.publishJSON({
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