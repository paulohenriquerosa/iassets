/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { verifySignature } from "@upstash/qstash/nextjs";
import { CrewCoordinator } from "@/agents/CrewCoordinator";
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
  const coordinator = new CrewCoordinator();

  try {
    await coordinator.processItem(item);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("[ArticleWorker] failure", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "ready" });
} 