import { getAllPosts, getAllCategories } from '@/lib/notion';
import { NextResponse } from 'next/server';

const baseUrl = 'https://news.iassets.com.br';

interface SitemapUrl {
  url: string;
  lastModified: string;
  changeFrequency: string;
  priority: number;
  isNews?: boolean;
  category?: string;
  title?: string;
  publicationDate?: string;
  images?: string[];
}

// Páginas estáticas principais com prioridades otimizadas para notícias financeiras
const staticPages: SitemapUrl[] = [
  {
    url: '',
    lastModified: new Date().toISOString(),
    changeFrequency: 'hourly',
    priority: 1.0,
  },
  {
    url: '/categorias',
    lastModified: new Date().toISOString(),
    changeFrequency: 'hourly',
    priority: 0.8,
  },
  {
    url: '/equipe',
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.6,
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
    url: '/privacidade',
    lastModified: new Date().toISOString(),
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  {
    url: '/termos',
    lastModified: new Date().toISOString(),
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  {
    url: '/busca',
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: 0.6,
  },
  {
    url: '/newsletter',
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.6,
  },
  {
    url: '/cookies',
    lastModified: new Date().toISOString(),
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  {
    url: '/rss.xml',
    lastModified: new Date().toISOString(),
    changeFrequency: 'hourly',
    priority: 0.4,
  },
  {
    url: '/feed.json',
    lastModified: new Date().toISOString(),
    changeFrequency: 'hourly',
    priority: 0.4,
  },
];

// Revalidar a cada 30 minutos para notícias financeiras
export const revalidate = 1800;

// Helper to escape XML special chars
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
    // Buscar dados do Notion
    const [posts, categories] = await Promise.all([
      getAllPosts(),
      getAllCategories()
    ]);

    // Categorias dinâmicas
    const categoryUrls: SitemapUrl[] = categories.map(category => ({
      url: `/categorias/${category.toLowerCase().replace(/\s+/g, '-')}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'hourly',
      priority: 0.8,
    }));

    // Posts com prioridade baseada na data (posts mais recentes têm prioridade maior)
    const now = new Date();
    const postUrls: SitemapUrl[] = posts.map((post) => {
      const postDate = new Date(post.date || post.createdTime);
      const daysDiff = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24));
      
      // Prioridade dinâmica: posts mais recentes têm prioridade maior
      let priority = 0.9;
      if (daysDiff > 7) priority = 0.8;
      if (daysDiff > 30) priority = 0.7;
      if (daysDiff > 90) priority = 0.6;
      
      return {
        url: `/${post.slug}`,
        lastModified: postDate.toISOString(),
        changeFrequency: daysDiff < 7 ? 'daily' : 'weekly',
        priority,
        // Dados específicos para Google News
        isNews: daysDiff < 7,
        category: post.category || 'Geral',
        title: post.title,
        publicationDate: postDate.toISOString(),
        images: post.coverImage ? [post.coverImage] : [],
      };
    });

    // Combinar todas as URLs
    const allUrls: SitemapUrl[] = [...staticPages, ...categoryUrls, ...postUrls];

    // Gerar XML do sitemap com suporte ao Google News
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allUrls
  .map((item: SitemapUrl) => {
    const { url, lastModified, changeFrequency, priority, isNews, category, title, publicationDate, images } = item;
    
    let urlXml = `
  <url>
    <loc>${xmlEscape(baseUrl + url)}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${changeFrequency}</changefreq>
    <priority>${priority}</priority>`;

    // Adicionar dados do Google News para artigos recentes
    if (isNews && title && category && publicationDate) {
      urlXml += `
    <news:news>
      <news:publication>
        <news:name>iAssets</news:name>
        <news:language>pt</news:language>
      </news:publication>
      <news:publication_date>${publicationDate}</news:publication_date>
      <news:title><![CDATA[${title}]]></news:title>
      <news:keywords><![CDATA[notícias financeiras, ${category.toLowerCase()}, mercado financeiro, investimentos]]></news:keywords>
    </news:news>`;
    }

    // Adicionar imagens se existirem
    if (images && images.length > 0) {
      images.forEach((imageUrl: string) => {
        urlXml += `
    <image:image>
      <image:loc>${xmlEscape(imageUrl)}</image:loc>
      <image:title><![CDATA[${title || 'iAssets - Notícias Financeiras'}]]></image:title>
    </image:image>`;
      });
    }

    urlXml += `
  </url>`;

    return urlXml;
  })
  .join('')}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=900',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}