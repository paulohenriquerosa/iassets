/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { EvergreenCoordinator } from "@/agents/EvergreenCoordinator";

export const runtime = "nodejs";

export async function GET() {
  try {
    const coord = new EvergreenCoordinator();
    const stats = await coord.run();
    return NextResponse.json({ success: true, ...stats });
  } catch (err: any) {
    console.error("[generate-evergreen] Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
} 