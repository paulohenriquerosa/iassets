import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  const path = request.nextUrl.searchParams.get('path');
  const tag = request.nextUrl.searchParams.get('tag');

  // Verificar se o secret está correto
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { message: 'Invalid secret token' },
      { status: 401 }
    );
  }

  try {
    // Se um path específico for fornecido, revalidar apenas esse path
    if (path) {
      revalidatePath(path);
      return NextResponse.json({
        revalidated: true,
        path,
        message: `Path ${path} has been revalidated`,
        timestamp: new Date().toISOString(),
      });
    }

    // Se uma tag específica for fornecida, revalidar apenas essa tag
    if (tag) {
      revalidateTag(tag);
      return NextResponse.json({
        revalidated: true,
        tag,
        message: `Tag ${tag} has been revalidated`,
        timestamp: new Date().toISOString(),
      });
    }

    // Se nenhum path ou tag for fornecido, revalidar principais rotas do blog
    const pathsToRevalidate = [
      '/',
      '/blog',
      '/blog/rss.xml',
      '/sitemap.xml',
      '/robots.txt',
    ];

    const tagsToRevalidate = [
      'posts',
      'blog',
      'notion-posts',
    ];

    // Revalidar paths
    pathsToRevalidate.forEach(pathToRevalidate => {
      revalidatePath(pathToRevalidate);
    });

    // Revalidar tags
    tagsToRevalidate.forEach(tagToRevalidate => {
      revalidateTag(tagToRevalidate);
    });

    return NextResponse.json({
      revalidated: true,
      paths: pathsToRevalidate,
      tags: tagsToRevalidate,
      message: 'All blog content has been revalidated successfully',
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error during revalidation:', error);
    return NextResponse.json(
      { 
        message: 'Error revalidating content',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// Suporte para GET também para facilitar testes
export async function GET(request: NextRequest) {
  return POST(request);
} 