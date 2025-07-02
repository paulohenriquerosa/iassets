import { getAllPosts } from '@/lib/notion'
import { NextResponse } from 'next/server'

const baseUrl = 'https://news.iassets.com.br'

// Revalidar a cada 30 minutos para notícias financeiras
export const revalidate = 1800;

export async function GET() {
  try {
    const posts = await getAllPosts()
    
    // Filtrar apenas posts publicados e ordenar por data
    const publishedPosts = posts
      .filter(post => post.published)
      .sort((a, b) => new Date(b.date || b.createdTime).getTime() - new Date(a.date || a.createdTime).getTime())
      .slice(0, 50); // Limitar aos 50 posts mais recentes
    
    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:media="http://search.yahoo.com/mrss/"
     xmlns:webfeeds="http://webfeeds.org/rss/1.0">
  <channel>
    <title>iAssets - Portal de Notícias Financeiras</title>
    <description>Portal líder em notícias financeiras do Brasil. Análises de ações, criptomoedas, fundos imobiliários e mercado de capitais. Informações precisas e atualizadas para investidores.</description>
    <link>${baseUrl}</link>
    <language>pt-BR</language>
    <copyright>© 2025 iAssets. Todos os direitos reservados.</copyright>
    <managingEditor>contato@iassets.com.br (Equipe iAssets)</managingEditor>
    <webMaster>tech@iassets.com.br (Tech iAssets)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <pubDate>${publishedPosts.length > 0 ? new Date(publishedPosts[0].date || publishedPosts[0].createdTime).toUTCString() : new Date().toUTCString()}</pubDate>
    <ttl>30</ttl>
    <docs>https://www.rssboard.org/rss-specification</docs>
    <generator>iAssets RSS Generator v1.0</generator>
    <category domain="https://www.google.com/finance">Finance</category>
    <category domain="https://www.google.com/finance">Investment</category>
    <category domain="https://www.google.com/finance">Cryptocurrency</category>
    <category domain="https://www.google.com/finance">Stock Market</category>
    
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    
    <image>
      <url>${baseUrl}/images/logo-rss.png</url>
      <title>iAssets - Portal de Notícias Financeiras</title>
      <link>${baseUrl}</link>
      <description>Logo do portal iAssets</description>
      <width>144</width>
      <height>144</height>
    </image>
    
    <!-- Configurações WebFeeds para melhor exibição -->
    <webfeeds:cover image="${baseUrl}/images/cover-rss.jpg" />
    <webfeeds:icon>${baseUrl}/favicon-32x32.png</webfeeds:icon>
    <webfeeds:logo>${baseUrl}/images/logo-rss.png</webfeeds:logo>
    <webfeeds:accentColor>000000</webfeeds:accentColor>
    <webfeeds:related layout="card" target="browser"/>
    
    ${publishedPosts
      .map(
        (post) => {
          const pubDate = new Date(post.date || post.createdTime).toUTCString();
          const postUrl = `${baseUrl}/${post.slug}`;
          const category = post.category || 'Geral';
          const author = post.author?.name || 'Equipe iAssets';
          const summary = post.summary || post.title;
          
          return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${summary}]]></description>
      <content:encoded><![CDATA[${summary}]]></content:encoded>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>contato@iassets.com.br (${author})</author>
      <dc:creator>${author}</dc:creator>
      <dc:publisher>iAssets</dc:publisher>
      <category domain="${baseUrl}/categorias/${category.toLowerCase().replace(/\s+/g, '-')}">${category}</category>
      ${post.tags ? post.tags.map(tag => `<category>${tag}</category>`).join('\n      ') : ''}
      
      <!-- Meta financeiras específicas -->
      <dc:subject>Notícias Financeiras</dc:subject>
      <dc:type>Financial News Article</dc:type>
      <dc:language>pt-BR</dc:language>
      <dc:rights>© 2025 iAssets. Todos os direitos reservados.</dc:rights>
      
      ${post.coverImage ? `
      <enclosure url="${post.coverImage}" type="image/jpeg"/>
      <media:content url="${post.coverImage}" type="image/jpeg" medium="image">
        <media:title type="plain">${post.title}</media:title>
        <media:description type="plain">${summary}</media:description>
        <media:category scheme="http://www.dmoz.org">Finance/Investment</media:category>
        <media:credit role="publisher">iAssets</media:credit>
      </media:content>
      <media:thumbnail url="${post.coverImage}" width="300" height="200"/>` : ''}
      
      <!-- Palavras-chave financeiras -->
      <media:keywords>
        notícias financeiras, ${category.toLowerCase()}, mercado financeiro, investimentos, 
        ${category === 'Criptomoedas' ? 'bitcoin, criptomoedas, blockchain' : ''}
        ${category === 'Economia' ? 'economia brasil, PIB, inflação, juros' : ''}
        ${category === 'Mercados' ? 'ações, bolsa de valores, ibovespa' : ''}
        ${category === 'Internacional' ? 'mercados internacionais, wall street' : ''}
      </media:keywords>
    </item>`
        }
      )
      .join('')}
  </channel>
</rss>`

    return new NextResponse(rssXml, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=900',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    return new NextResponse('Error generating RSS feed', { status: 500 })
  }
} 