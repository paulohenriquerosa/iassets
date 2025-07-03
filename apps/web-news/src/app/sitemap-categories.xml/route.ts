import { getAllCategories, getPostsByCategory } from '@/lib/notion';
import { NextResponse } from 'next/server';

const baseUrl = 'https://news.iassets.com.br';

// Revalidar a cada 2 horas
export const revalidate = 7200;

function xmlEscape(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export async function GET() {
  try {
    const categories = await getAllCategories();
    
    // Gerar dados para cada categoria
    const categoryData = await Promise.all(
      categories.map(async (category) => {
        const posts = await getPostsByCategory(category, 5); // Buscar 5 posts por categoria
        const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
        
        return {
          name: category,
          slug: categorySlug,
          url: `/categorias/${categorySlug}`,
          postCount: posts.length,
          lastModified: posts.length > 0 
            ? new Date(posts[0].date || posts[0].createdTime).toISOString()
            : new Date().toISOString(),
          posts: posts.map(post => ({
            title: post.title,
            slug: post.slug,
            date: post.date || post.createdTime
          }))
        };
      })
    );

    // Gerar XML do sitemap de categorias
    const categoriesSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${categoryData
  .map((category) => {
    const loc = xmlEscape(baseUrl + category.url);
    return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${category.lastModified}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="pt-br" href="${loc}" />
  </url>`
  })
  .join('')}
  
  <!-- Páginas relacionadas a categorias -->
  <url>
    <loc>${xmlEscape(baseUrl + '/categorias')}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Tags populares -->
  <url>
    <loc>${xmlEscape(baseUrl + '/tags')}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <!-- Arquivo de categorias -->
  <url>
    <loc>${xmlEscape(baseUrl + '/arquivo')}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>`;

    return new NextResponse(categoriesSitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=7200, s-maxage=7200, stale-while-revalidate=3600',
      },
    });
  } catch (error) {
    console.error('Error generating categories sitemap:', error);
    return new NextResponse('Error generating categories sitemap', { status: 500 });
  }
} 