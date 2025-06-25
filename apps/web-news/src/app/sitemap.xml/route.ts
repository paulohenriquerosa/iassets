import { getAllPosts, Post } from '@/lib/notion';
import { NextResponse } from 'next/server';

const baseUrl = 'https://iassets.com.br';

// Páginas estáticas do site
const staticPages = [
  {
    url: '',
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: 1.0,
  },
  {
    url: '/mercados',
    lastModified: new Date().toISOString(),
    changeFrequency: 'hourly',
    priority: 0.9,
  },
  {
    url: '/crypto',
    lastModified: new Date().toISOString(),
    changeFrequency: 'hourly',
    priority: 0.8,
  },
  {
    url: '/internacional',
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: 0.8,
  },
  {
    url: '/analises',
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: 0.8,
  },
  {
    url: '/educacao',
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.7,
  },
  {
    url: '/calculadoras',
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.6,
  },
  {
    url: '/carteiras',
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.7,
  },
  {
    url: '/sobre',
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.5,
  },
  {
    url: '/contato',
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.5,
  },
  {
    url: '/termos',
    lastModified: new Date().toISOString(),
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  {
    url: '/privacidade',
    lastModified: new Date().toISOString(),
    changeFrequency: 'yearly',
    priority: 0.3,
  },
];

// Subcategorias de mercados
const marketCategories = [
  '/mercados/acoes-brasileiras',
  '/mercados/acoes-americanas',
  '/mercados/fiis',
  '/mercados/renda-fixa',
];

export async function GET() {
  try {
    // Buscar posts do Notion
    let posts: Post[] = [];
    try {
      posts = await getAllPosts();
    } catch (error) {
      console.error('Error fetching posts for sitemap:', error);
      posts = [];
    }

    // Gerar URLs dos posts
    const postUrls = posts.map((post: Post) => ({
      url: `/${post.slug}`,
      lastModified: new Date(post.date || post.createdTime).toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

    // Gerar URLs das subcategorias
    const categoryUrls = marketCategories.map(category => ({
      url: category,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.7,
    }));

    // Combinar todas as URLs
    const allUrls = [...staticPages, ...categoryUrls, ...postUrls];

    // Gerar XML do sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allUrls
  .map(
    ({ url, lastModified, changeFrequency, priority }) => `
  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${changeFrequency}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join('')}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
} 