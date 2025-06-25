import { getAllPosts } from '@/lib/notion'
import { NextResponse } from 'next/server'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://origemx.com'

// Revalidar a cada 2 horas
export const revalidate = 7200;

export async function GET() {
  try {
    const posts = await getAllPosts()
    
    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog OrigemX</title>
    <description>Artigos sobre desenvolvimento, cloud, IA e tecnologia</description>
    <link>${baseUrl}/blog</link>
    <language>pt-BR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/logo.svg</url>
      <title>Blog OrigemX</title>
      <link>${baseUrl}/blog</link>
    </image>
    ${posts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description || post.title}]]></description>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>noreply@origemx.com (${post.author?.name || 'OrigemX'})</author>
      ${post.tags ? post.tags.map(tag => `<category>${tag}</category>`).join('\n      ') : ''}
      ${post.coverImage ? `<enclosure url="${post.coverImage}" type="image/jpeg"/>` : ''}
    </item>`
      )
      .join('')}
  </channel>
</rss>`

    return new NextResponse(rssXml, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=7200, stale-while-revalidate=3600',
      },
    })
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    return new NextResponse('Error generating RSS feed', { status: 500 })
  }
} 