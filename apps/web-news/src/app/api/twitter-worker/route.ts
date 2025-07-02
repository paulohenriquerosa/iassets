/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { verifySignature } from "@upstash/qstash/nextjs";
import { TwitterThreadAgent } from "@/agents/TwitterThreadAgent";

export const runtime = "nodejs";
export const maxDuration = 800; // allow longer for rate limit waits

interface Payload {
  tweets: string[];
  coverUrl?: string;
  uniqueId: string;
}

export async function POST(req: Request) {
  // verify signature (if configured)
  try {
    const ok = await verifySignature(req);
    if (!ok) {
      return NextResponse.json({ ok: false, error: "invalid signature" }, { status: 401 });
    }
  } catch {
    // local dev
  }

  const { tweets, coverUrl, uniqueId } = (await req.json()) as Payload;
  if (!tweets?.length) return NextResponse.json({ ok: false, error: "no tweets" }, { status: 400 });

  const agent = new TwitterThreadAgent();
  try {
    await agent.publishThread(tweets, coverUrl, uniqueId);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("[TwitterWorker] publish error", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "twitter-worker-ready" });
} 