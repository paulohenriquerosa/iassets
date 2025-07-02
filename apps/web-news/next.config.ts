import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Experimental features para melhor performance
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },

  // Configurações de imagem para SEO e performance
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: [
      'images.unsplash.com',
      'www.notion.so',
      's3.us-west-2.amazonaws.com',
      'notion.so',
      'lh3.googleusercontent.com',
      'i.imgur.com',
      'd1civoyjepycei.cloudfront.net',
      'images.pexels.com',
      'static.cryptobriefing.com'
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",      // libera todos os domínios https
      },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 dias
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Headers personalizados para SEO e segurança
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/manifest+json',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Redirects para SEO
  async redirects() {
    return [
      {
        source: '/blog/:path*',
        destination: '/:path*',
        permanent: true,
      },
      {
        source: '/noticias/:path*',
        destination: '/:path*',
        permanent: true,
      },
      {
        source: '/post/:path*',
        destination: '/:path*',
        permanent: true,
      },
    ];
  },

  // Compressão para melhor performance
  compress: true,
  
  // Configurações de output para static export quando necessário
  trailingSlash: false,
  
  // Configurações de revalidação
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },

  // Webpack customizado para otimizações
  webpack: (config, { dev, isServer }) => {
    // Otimizações apenas em produção
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }

    // Configurações para SVG
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  // ESLint durante build
  eslint: {
    ignoreDuringBuilds: false,
  },

  // TypeScript durante build
  typescript: {
    ignoreBuildErrors: false,
  },

  // Configurações de performance
  poweredByHeader: false,
  generateEtags: true,
};

export default nextConfig;
