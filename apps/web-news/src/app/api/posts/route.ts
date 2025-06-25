import { getAllPosts } from "@/lib/notion";
import { NextResponse } from "next/server";

// ISR - revalidar a cada 1 hora (3600 segundos)
export const revalidate = 3600;

export async function GET() {
  try {
    const posts = await getAllPosts();
    
    return NextResponse.json(posts, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800',
      },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
} 