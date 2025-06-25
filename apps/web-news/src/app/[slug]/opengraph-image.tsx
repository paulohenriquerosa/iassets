import { ImageResponse } from 'next/og'
import { getPostBySlug } from '@/lib/notion'

export const runtime = 'edge'
export const alt = 'OrigemX Blog Post'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  try {
    const { slug } = await params
    const post = await getPostBySlug(slug)

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000',
            backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
        >
          <div
            style={{
              marginLeft: 190,
              marginRight: 190,
              display: 'flex',
              fontSize: 130,
              letterSpacing: '-0.05em',
              fontStyle: 'normal',
              color: 'white',
              lineHeight: '120px',
              whiteSpace: 'pre-wrap',
              textAlign: 'center',
            }}
          >
            {post.title}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 32,
              color: 'rgba(255, 255, 255, 0.8)',
              marginTop: 40,
            }}
          >
            Blog OrigemX • {post.author?.name || 'OrigemX'}
          </div>
          {post.tags && post.tags.length > 0 && (
            <div
              style={{
                display: 'flex',
                gap: '12px',
                marginTop: 30,
              }}
            >
              {post.tags.slice(0, 3).map((tag) => (
                <div
                  key={tag}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '24px',
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>
      ),
      {
        ...size,
      }
    )
  } catch (error) {
    console.error('Error generating OG image:', error)
    
    // Fallback image
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000',
            color: 'white',
            fontSize: 48,
          }}
        >
          Blog OrigemX
        </div>
      ),
      { ...size }
    )
  }
} 