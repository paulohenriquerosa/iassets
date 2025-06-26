import { getAllPosts } from '@/lib/notion'
import { NextResponse } from 'next/server'
import { siteConfig } from '@/lib/seo'

// Revalidar a cada 30 minutos
export const revalidate = 1800;

export async function GET() {
  try {
    const posts = await getAllPosts()
    
    // Filtrar apenas posts publicados e ordenar por data
    const publishedPosts = posts
      .filter(post => post.published)
      .sort((a, b) => new Date(b.date || b.createdTime).getTime() - new Date(a.date || a.createdTime).getTime())
      .slice(0, 50); // Limitar aos 50 posts mais recentes
    
    // Gerar JSON Feed conforme especificação https://jsonfeed.org/version/1.1
    const jsonFeed = {
      version: "https://jsonfeed.org/version/1.1",
      title: siteConfig.fullName,
      description: siteConfig.description,
      home_page_url: siteConfig.url,
      feed_url: `${siteConfig.url}/feed.json`,
      language: "pt-BR",
      icon: `${siteConfig.url}/favicon-512x512.png`,
      favicon: `${siteConfig.url}/favicon.ico`,
      authors: [
        {
          name: siteConfig.author,
          url: siteConfig.url,
          avatar: `${siteConfig.url}/images/author-avatar.jpg`
        }
      ],
      expired: false,
      
      // Hubs para WebSub/PubSubHubbub
      hubs: [
        {
          type: "WebSub",
          url: "https://pubsubhubbub.appspot.com/"
        }
      ],
      
      // Items do feed
      items: publishedPosts.map(post => {
        const pubDate = new Date(post.date || post.createdTime);
        const postUrl = `${siteConfig.url}/${post.slug}`;
        const category = post.category || 'Geral';
        const author = post.author?.name || siteConfig.author;
        const summary = post.summary || post.title;
        
        return {
          id: postUrl,
          url: postUrl,
          external_url: postUrl,
          title: post.title,
          content_html: `<p>${summary}</p>`,
          content_text: summary,
          summary: summary,
          date_published: pubDate.toISOString(),
          date_modified: pubDate.toISOString(),
          
          authors: [
            {
              name: author,
              url: `${siteConfig.url}/autor/${author.toLowerCase().replace(/\s+/g, '-')}`,
              avatar: `${siteConfig.url}/images/authors/${author.toLowerCase().replace(/\s+/g, '-')}.jpg`
            }
          ],
          
          tags: [
            category,
            ...(post.tags || []),
            'notícias financeiras',
            'mercado financeiro',
            'investimentos'
          ].filter(Boolean),
          
          language: "pt-BR",
          
          // Imagem do post
          ...(post.coverImage && {
            image: post.coverImage,
            banner_image: post.coverImage
          }),
          
          // Anexos para podcasts/vídeos (se houver)
          attachments: post.coverImage ? [
            {
              url: post.coverImage,
              mime_type: "image/jpeg",
              title: `Imagem: ${post.title}`
            }
          ] : [],
          
          // Extensões customizadas para dados financeiros
          _iassets: {
            category: category,
            category_slug: category.toLowerCase().replace(/\s+/g, '-'),
            reading_time_minutes: Math.ceil(summary.length / 200), // Estimativa baseada no summary
            seo_keywords: generateSEOKeywords(category, post.title),
            financial_tickers: extractFinancialTickers(post.title, summary),
            priority: calculatePriority(pubDate, category),
            social_media: {
              twitter_optimized: true,
              facebook_optimized: true,
              linkedin_optimized: true
            }
          }
        };
      })
    };

    return new NextResponse(JSON.stringify(jsonFeed, null, 2), {
      headers: {
        'Content-Type': 'application/feed+json; charset=utf-8',
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=900',
        'X-Content-Type-Options': 'nosniff',
        // Headers para WebSub
        'Link': '<https://pubsubhubbub.appspot.com/>; rel="hub", <' + siteConfig.url + '/feed.json>; rel="self"'
      },
    })
  } catch (error) {
    console.error('Error generating JSON feed:', error)
    return new NextResponse('Error generating JSON feed', { status: 500 })
  }
}

// Função para gerar keywords SEO baseadas no conteúdo
function generateSEOKeywords(category: string, title: string): string[] {
  const baseKeywords = ['notícias financeiras', 'mercado financeiro', 'investimentos'];
  
  const categoryKeywords: Record<string, string[]> = {
    'mercados': ['bolsa de valores', 'ações', 'ibovespa'],
    'criptomoedas': ['bitcoin', 'ethereum', 'blockchain'],
    'economia': ['economia brasil', 'pib', 'inflação'],
    'internacional': ['wall street', 'fed', 'nasdaq'],
    'analises': ['análise técnica', 'recomendações'],
    'educacao': ['educação financeira', 'como investir']
  };
  
  const categoryLower = category.toLowerCase();
  const specificKeywords = categoryKeywords[categoryLower] || [];
  
  // Extrair palavras relevantes do título
  const titleWords = title
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 3)
    .slice(0, 3);
  
  return [...baseKeywords, ...specificKeywords, ...titleWords].slice(0, 8);
}

// Função para extrair tickers financeiros
function extractFinancialTickers(title: string, summary?: string): string[] {
  const content = `${title} ${summary || ''}`.toUpperCase();
  const tickers: string[] = [];
  
  // Tickers brasileiros comuns
  const brazilianPattern = /\b(PETR4|VALE3|ITUB4|BBDC4|ABEV3|B3SA3|BBAS3|WEGE3|RENT3|LREN3|MGLU3)\b/g;
  let match = brazilianPattern.exec(content);
  while (match) {
    tickers.push(match[0]);
    match = brazilianPattern.exec(content);
  }
  
  // Tickers americanos comuns
  const usPattern = /\b(AAPL|TSLA|AMZN|GOOGL|MSFT|META|NVDA|BTC|ETH)\b/g;
  match = usPattern.exec(content);
  while (match) {
    tickers.push(match[0]);
    match = usPattern.exec(content);
  }
  
  return [...new Set(tickers)]; // Remove duplicatas
}

// Função para calcular prioridade baseada na data e categoria
function calculatePriority(pubDate: Date, category: string): number {
  const now = new Date();
  const daysDiff = Math.floor((now.getTime() - pubDate.getTime()) / (1000 * 60 * 60 * 24));
  
  let basePriority = 0.8;
  
  // Ajustar prioridade baseada na categoria
  const categoryPriorities: Record<string, number> = {
    'mercados': 0.9,
    'criptomoedas': 0.9,
    'economia': 0.85,
    'internacional': 0.8,
    'analises': 0.75,
    'educacao': 0.7
  };
  
  basePriority = categoryPriorities[category.toLowerCase()] || 0.8;
  
  // Reduzir prioridade para posts mais antigos
  if (daysDiff > 7) basePriority *= 0.9;
  if (daysDiff > 30) basePriority *= 0.8;
  if (daysDiff > 90) basePriority *= 0.7;
  
  return Math.round(basePriority * 100) / 100;
} 