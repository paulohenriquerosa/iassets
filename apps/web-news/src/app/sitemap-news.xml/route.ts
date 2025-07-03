import { getAllPosts } from '@/lib/notion';
import { NextResponse } from 'next/server';

const baseUrl = 'https://news.iassets.com.br';

// Revalidar a cada 15 minutos para notícias recentes
export const revalidate = 900;

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
    const posts = await getAllPosts();
    
    // Filtrar apenas posts dos últimos 2 dias para Google News
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    
    const recentPosts = posts
      .filter(post => {
        const postDate = new Date(post.date || post.createdTime);
        return postDate > twoDaysAgo && post.published;
      })
      .sort((a, b) => new Date(b.date || b.createdTime).getTime() - new Date(a.date || a.createdTime).getTime())
      .slice(0, 100); // Máximo 100 artigos recentes

    // Gerar XML do sitemap do Google News
    const newsSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${recentPosts
  .map((post) => {
    const postDate = new Date(post.date || post.createdTime);
    const url = `${baseUrl}/${post.slug}`;
    const category = post.category || 'Geral';
    
    return `
  <url>
    <loc>${xmlEscape(url)}</loc>
    <lastmod>${postDate.toISOString()}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>0.9</priority>
    <news:news>
      <news:publication>
        <news:name>iAssets</news:name>
        <news:language>pt</news:language>
      </news:publication>
      <news:publication_date>${postDate.toISOString()}</news:publication_date>
      <news:title><![CDATA[${post.title}]]></news:title>
      <news:keywords><![CDATA[${generateNewsKeywords(category, post.title)}]]></news:keywords>
      <news:stock_tickers><![CDATA[${extractStockTickers(post.title, post.summary)}]]></news:stock_tickers>
    </news:news>
    ${post.coverImage ? `
    <image:image>
      <image:loc>${xmlEscape(post.coverImage)}</image:loc>
      <image:title><![CDATA[${post.title}]]></image:title>
      <image:caption><![CDATA[${post.summary || post.title}]]></image:caption>
    </image:image>` : ''}
  </url>`
  })
  .join('')}
</urlset>`;

    return new NextResponse(newsSitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=900, s-maxage=900, stale-while-revalidate=450',
      },
    });
  } catch (error) {
    console.error('Error generating news sitemap:', error);
    return new NextResponse('Error generating news sitemap', { status: 500 });
  }
}

// Função para gerar keywords específicas para Google News
function generateNewsKeywords(category: string, title: string): string {
  const baseKeywords = ['notícias financeiras', 'mercado financeiro', 'investimentos'];
  
  const categoryKeywords: Record<string, string[]> = {
    'mercados': ['bolsa de valores', 'ações', 'ibovespa', 'cotações'],
    'criptomoedas': ['bitcoin', 'ethereum', 'criptomoedas', 'blockchain'],
    'economia': ['economia brasil', 'pib', 'inflação', 'selic', 'banco central'],
    'internacional': ['wall street', 'fed', 'nasdaq', 'mercados internacionais'],
    'analises': ['análise técnica', 'recomendações', 'relatórios', 'buy sell'],
    'educacao': ['educação financeira', 'como investir', 'planejamento financeiro']
  };
  
  const categoryLower = category.toLowerCase();
  const specificKeywords = categoryKeywords[categoryLower] || [];
  
  // Extrair palavras-chave do título
  const titleKeywords = extractKeywordsFromTitle(title);
  
  const allKeywords = [...baseKeywords, ...specificKeywords, ...titleKeywords];
  return allKeywords.slice(0, 10).join(', '); // Máximo 10 keywords
}

// Função para extrair tickers de ações do conteúdo
function extractStockTickers(title: string, summary?: string): string {
  const content = `${title} ${summary || ''}`.toUpperCase();
  
  // Padrões comuns de tickers brasileiros e americanos
  const tickerPatterns = [
    // Ações brasileiras (ex: PETR4, VALE3, ITUB4)
    /\b[A-Z]{4}[0-9]{1,2}\b/g,
    // Ações americanas (ex: AAPL, TSLA, AMZN)
    /\b[A-Z]{2,5}\b/g
  ];
  
  const tickers = new Set<string>();
  
  tickerPatterns.forEach(pattern => {
    const matches = content.match(pattern);
    if (matches) {
      matches.forEach(ticker => {
        // Filtrar apenas tickers válidos conhecidos
        if (isValidTicker(ticker)) {
          tickers.add(ticker);
        }
      });
    }
  });
  
  return Array.from(tickers).slice(0, 5).join(', '); // Máximo 5 tickers
}

// Função para validar se é um ticker válido
function isValidTicker(ticker: string): boolean {
  // Lista de tickers brasileiros comuns
  const brazilianTickers = [
    'PETR4', 'VALE3', 'ITUB4', 'BBDC4', 'ABEV3', 'B3SA3', 'BBAS3', 'WEGE3',
    'RENT3', 'LREN3', 'MGLU3', 'AMER3', 'GGBR4', 'USIM5', 'CSNA3', 'GOAU4'
  ];
  
  // Lista de tickers americanos comuns
  const usTickers = [
    'AAPL', 'TSLA', 'AMZN', 'GOOGL', 'MSFT', 'META', 'NVDA', 'NFLX',
    'BTC', 'ETH', 'SPY', 'QQQ', 'IWM', 'GLD', 'SLV'
  ];
  
  return brazilianTickers.includes(ticker) || usTickers.includes(ticker);
}

// Função para extrair palavras-chave relevantes do título
function extractKeywordsFromTitle(title: string): string[] {
  const relevantWords = title
    .toLowerCase()
    .split(/\s+/)
    .filter(word => 
      word.length > 3 && 
      !['para', 'sobre', 'como', 'após', 'antes', 'durante', 'contra'].includes(word)
    )
    .slice(0, 5);
  
  return relevantWords;
} 