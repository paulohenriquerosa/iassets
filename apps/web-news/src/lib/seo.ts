import { Metadata } from 'next'

// Configurações básicas do site
export const siteConfig = {
  name: 'iAssets',
  fullName: 'iAssets - Portal de Notícias Financeiras',
  description: 'Portal líder em notícias financeiras do Brasil. Análises exclusivas, alertas de mercado, ferramentas profissionais e educação financeira. Mais de 500mil investidores confiam em nós.',
  url: 'https://news.iassets.com.br',
  ogImage: '/images/og-image.jpg',
  twitterImage: '/images/twitter-image.jpg',
  twitterHandle: '@iassets_br',
  author: 'Equipe iAssets',
  email: 'contato@iassets.com.br',
  techEmail: 'tech@iassets.com.br',
  phone: '+55-11-3456-7890',
  founded: '2020',
  social: {
    twitter: 'https://twitter.com/iassets_br',
    linkedin: 'https://www.linkedin.com/company/iassets',
    youtube: 'https://www.youtube.com/c/iassets',
    instagram: 'https://www.instagram.com/iassets_br',
    facebook: 'https://www.facebook.com/iassets.br'
  }
}

// Keywords específicas para notícias financeiras
export const financialKeywords = [
  // Mercado de ações
  'notícias financeiras', 'mercado de ações', 'bolsa de valores', 'ibovespa',
  'ações brasileiras', 'ações americanas', 'análise técnica', 'análise fundamentalista',
  'dividendos', 'proventos', 'resultado empresarial', 'balanço trimestral',
  
  // Economia
  'economia brasil', 'PIB brasil', 'inflação IPCA', 'taxa selic', 'copom',
  'dólar hoje', 'euro real', 'commodities', 'petróleo preço', 'ouro preço',
  'indicadores econômicos', 'política monetária', 'banco central',
  
  // Investimentos
  'investimentos brasil', 'como investir', 'renda fixa', 'tesouro direto',
  'CDB', 'LCI', 'LCA', 'debentures', 'fundos de investimento',
  'previdência privada', 'PGBL', 'VGBL',
  
  // Fundos Imobiliários
  'fundos imobiliários', 'FIIs', 'renda imobiliária', 'dividend yield',
  'fundos de tijolo', 'fundos de papel', 'shopping centers', 'galpões logísticos',
  
  // Criptomoedas
  'bitcoin preço', 'criptomoedas', 'blockchain', 'ethereum', 'altcoins',
  'bitcoin etf', 'criptomoedas brasil', 'exchange brasil', 'defi',
  
  // Internacional
  'wall street', 'nasdaq', 'sp500', 'dow jones', 'fed', 'jerome powell',
  'mercados internacionais', 'ações americanas', 'treasuries', 'bunds',
  
  // Educação financeira
  'educação financeira', 'planejamento financeiro', 'reserva emergência',
  'aposentadoria', 'independência financeira', 'investimento iniciante'
]

// Categorias específicas com metadata
export const categoryMetadata = {
  'mercados': {
    title: 'Mercados Financeiros - Análises e Cotações em Tempo Real',
    description: 'Acompanhe cotações, análises e notícias dos mercados financeiros. Ações, índices, commodities e moedas atualizadas em tempo real.',
    keywords: ['mercados financeiros', 'cotações', 'análises', 'bolsa valores', 'ibovespa', 'nasdaq']
  },
  'criptomoedas': {
    title: 'Criptomoedas - Bitcoin, Ethereum e Altcoins - Preços e Notícias',
    description: 'Últimas notícias e preços de Bitcoin, Ethereum e principais criptomoedas. Análises técnicas e fundamentalistas do mercado crypto.',
    keywords: ['bitcoin', 'ethereum', 'criptomoedas', 'blockchain', 'altcoins', 'crypto brasil']
  },
  'economia': {
    title: 'Economia Brasil - PIB, Inflação, Selic e Indicadores Econômicos',
    description: 'Análises econômicas, indicadores brasileiros, PIB, inflação IPCA, taxa Selic e decisões do Banco Central. Economia em tempo real.',
    keywords: ['economia brasil', 'PIB', 'inflação', 'selic', 'banco central', 'copom', 'indicadores']
  },
  'internacional': {
    title: 'Mercados Internacionais - Wall Street, Fed e Economia Global',
    description: 'Notícias dos mercados internacionais, Wall Street, decisões do Fed, política monetária global e impactos na economia brasileira.',
    keywords: ['wall street', 'fed', 'nasdaq', 'sp500', 'mercados internacionais', 'economia global']
  },
  'analises': {
    title: 'Análises de Investimentos - Recomendações e Relatórios Profissionais',
    description: 'Análises profissionais de ações, fundos e investimentos. Recomendações de compra, venda e relatórios setoriais exclusivos.',
    keywords: ['análises', 'recomendações', 'relatórios', 'buy', 'sell', 'hold', 'target price']
  },
  'educacao': {
    title: 'Educação Financeira - Como Investir e Planejamento Financeiro',
    description: 'Aprenda a investir com nossos guias de educação financeira. Planejamento financeiro, estratégias de investimento e dicas práticas.',
    keywords: ['educação financeira', 'como investir', 'planejamento financeiro', 'investimento iniciante']
  }
}

// Função para gerar metadata de artigos
export function generateArticleMetadata({
  title,
  description,
  slug,
  publishedTime,
  modifiedTime,
  author,
  category,
  tags,
  image
}: {
  title: string
  description?: string
  slug: string
  publishedTime?: string
  modifiedTime?: string
  author?: string
  category?: string
  tags?: string[]
  image?: string
}): Metadata {
  const url = `${siteConfig.url}/${slug}`
  const articleDescription = description || title
  const articleImage = image || siteConfig.ogImage
  
  // Keywords dinâmicas baseadas em categoria e tags
  const dynamicKeywords = [
    ...financialKeywords.slice(0, 15), // Keywords principais
    ...(category ? [category.toLowerCase()] : []),
    ...(tags || []),
    'notícias financeiras brasil',
    'mercado financeiro hoje',
    'investimentos 2025'
  ]

  return {
    title: `${title} | ${siteConfig.name}`,
    description: articleDescription,
    keywords: dynamicKeywords,
    authors: [{ name: author || siteConfig.author }],
    creator: author || siteConfig.author,
    publisher: siteConfig.name,
    category: 'Finance',
    classification: 'Financial News Article',
    openGraph: {
      type: 'article',
      locale: 'pt_BR',
      url,
      siteName: siteConfig.name,
      title,
      description: articleDescription,
      images: [
        {
          url: articleImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      publishedTime,
      modifiedTime,
      authors: [author || siteConfig.author],
      section: category || 'Notícias Financeiras',
      tags: tags || []
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: articleDescription,
      images: [articleImage],
      creator: siteConfig.twitterHandle,
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'article:author': author || siteConfig.author,
      'article:publisher': siteConfig.social.facebook,
      'article:section': category || 'Finance',
      'article:tag': tags?.join(', ') || '',
      'news_keywords': tags?.join(', ') || category || 'notícias financeiras',
    }
  }
}

// Função para gerar metadata de categoria
export function generateCategoryMetadata(category: string): Metadata {
  const categoryKey = category.toLowerCase().replace(/\s+/g, '-')
  const metadata = categoryMetadata[categoryKey as keyof typeof categoryMetadata]
  
  if (!metadata) {
    return {
      title: `${category} | ${siteConfig.name}`,
      description: `Últimas notícias e análises sobre ${category.toLowerCase()} no portal iAssets.`,
    }
  }

  const url = `${siteConfig.url}/categorias/${categoryKey}`

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: [...metadata.keywords, ...financialKeywords.slice(0, 10)],
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url,
      siteName: siteConfig.name,
      title: metadata.title,
      description: metadata.description,
      images: [
        {
          url: `${siteConfig.url}/images/og-${categoryKey}.jpg`,
          width: 1200,
          height: 630,
          alt: metadata.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      images: [`${siteConfig.url}/images/twitter-${categoryKey}.jpg`],
    },
    alternates: {
      canonical: url,
    },
  }
}

// Schema.org para Organization
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.fullName,
  alternateName: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/logo.png`,
  image: `${siteConfig.url}/images/logo.png`,
  foundingDate: siteConfig.founded,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  sameAs: Object.values(siteConfig.social),
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'BR',
    addressLocality: 'São Paulo',
    addressRegion: 'SP'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: siteConfig.phone,
    contactType: 'Customer Service',
    availableLanguage: 'Portuguese',
    email: siteConfig.email
  },
  publishingPrinciples: `${siteConfig.url}/editorial-guidelines`,
  ethicsPolicy: `${siteConfig.url}/ethics`,
  diversityPolicy: `${siteConfig.url}/diversity`,
  masthead: `${siteConfig.url}/equipe`,
  missionCoveragePrioritiesPolicy: `${siteConfig.url}/mission`,
  actionableFeedbackPolicy: `${siteConfig.url}/feedback`,
  correctionsPolicy: `${siteConfig.url}/corrections`
}

// Schema.org para WebSite
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.fullName,
  alternateName: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  publisher: {
    '@type': 'Organization',
    name: siteConfig.name
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteConfig.url}/busca?q={search_term_string}`
    },
    'query-input': 'required name=search_term_string'
  },
  about: {
    '@type': 'Thing',
    name: 'Financial News',
    description: 'Brazilian Financial Market News and Analysis'
  },
  audience: {
    '@type': 'Audience',
    audienceType: 'Investors',
    geographicArea: {
      '@type': 'Country',
      name: 'Brazil'
    }
  },
  inLanguage: 'pt-BR',
  copyrightYear: new Date().getFullYear(),
  copyrightHolder: {
    '@type': 'Organization',
    name: siteConfig.name
  }
}

// Função para gerar schema de artigo
export function generateArticleSchema({
  title,
  description,
  slug,
  publishedTime,
  modifiedTime,
  author,
  category,
  image,
  wordCount
}: {
  title: string
  description?: string
  slug: string
  publishedTime?: string
  modifiedTime?: string
  author?: string
  category?: string
  image?: string
  wordCount?: number
}) {
  const url = `${siteConfig.url}/${slug}`
  const articleImage = image || siteConfig.ogImage

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    description: description || title,
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    image: {
      '@type': 'ImageObject',
      url: articleImage,
      width: 1200,
      height: 630
    },
    author: {
      '@type': 'Person',
      name: author || siteConfig.author,
      url: `${siteConfig.url}/autor/${(author || siteConfig.author).toLowerCase().replace(/\s+/g, '-')}`
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/images/logo.png`,
        width: 200,
        height: 60
      }
    },
    datePublished: publishedTime || new Date().toISOString(),
    dateModified: modifiedTime || publishedTime || new Date().toISOString(),
    articleSection: category || 'Finance',
    about: {
      '@type': 'Thing',
      name: category || 'Financial News'
    },
    inLanguage: 'pt-BR',
    ...(wordCount && { wordCount }),
    isAccessibleForFree: true,
    hasPart: {
      '@type': 'WebPageElement',
      isAccessibleForFree: true
    },
    copyrightHolder: {
      '@type': 'Organization',
      name: siteConfig.name
    },
    copyrightYear: new Date().getFullYear(),
    genre: 'Financial News',
    keywords: [category, 'financial news', 'brazil', 'investment'].filter(Boolean).join(', '),
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.article-summary']
    }
  }
} 