/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { verifySignature } from "@upstash/qstash/nextjs";
import { CrewCoordinator } from "@/agents/CrewCoordinator";
import { DuplicateDetectionAgent } from "@/agents/DuplicateDetectionAgent";
import type { FeedItem } from "@/agents/types";

export const runtime = "nodejs";
export const maxDuration = 800;

export async function POST(req: Request) {
  // verify qstash signature (if keys set)
  try {
    const ok = await verifySignature(req);
    if (!ok) {
      return new NextResponse("Invalid signature", { status: 401 });
    }
  } catch {
    // if not configured, continue (local dev)
  }

  const item = (await req.json()) as FeedItem;
  const dupAgent = new DuplicateDetectionAgent();

  try {
    const isDup = await dupAgent.exists(item.title, item.summary || "");
    if (isDup) {
      console.log("[ArticleWorker] Duplicate detected, skipping");
      return NextResponse.json({ ok: true, skipped: "duplicate" });
    }

    const coordinator = new CrewCoordinator();
    await coordinator.processItem(item);

    // add to duplicate index after successful processing
    await dupAgent.add(item.title, item.summary || "");
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("[ArticleWorker] failure", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "ready" });
} 