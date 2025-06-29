/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { CrewCoordinator } from "@/agents/CrewCoordinator";

export const runtime = "nodejs"; // requires Node core modules like 'path'

export async function GET() {
  try {
    const crew = new CrewCoordinator();
    const stats = await crew.run();

    return NextResponse.json({ success: true, ...stats });
  } catch (err: any) {
    console.error("[generate-articles] Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
} 