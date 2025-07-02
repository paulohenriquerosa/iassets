/* eslint-disable @typescript-eslint/no-explicit-any */

import { getAllCategories } from "@/lib/notion";

export const revalidate = 3600; // 1h

export async function GET() {
  try {
    const categories = await getAllCategories();
    return Response.json({ categories });
  } catch (e: any) {
    console.error("/api/categories error", e);
    return new Response("Internal Error", { status: 500 });
  }
} 