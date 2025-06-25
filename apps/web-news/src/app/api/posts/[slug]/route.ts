import { getPostBySlug } from "@/lib/notion";
import { NextRequest, NextResponse } from "next/server";

// ISR - revalidar a cada 1 hora (3600 segundos)
export const revalidate = 3600;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    
    return NextResponse.json(post, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800',
      },
    });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Post not found" },
      { status: 404 }
    );
  }
} 