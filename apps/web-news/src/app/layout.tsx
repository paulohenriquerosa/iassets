import { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/header";
import Link from "next/link";
import { 
  DollarSign, 
  Twitter, 
  Linkedin, 
  Youtube, 
  Instagram,
  Mail,
  Shield,
  Users,
  Globe
} from "lucide-react";
import { siteConfig, organizationSchema, websiteSchema } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.fullName,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: [
    // Keywords de alta prioridade para notícias financeiras
    "notícias financeiras brasil",
    "mercado de ações hoje",
    "ibovespa cotação",
    "dólar hoje preço",
    "bitcoin preço brasil",
    "investimentos 2025",
    "bolsa de valores b3",
    "fundos imobiliários fiis",
    "análise técnica ações",
    "economia brasil pib",
    "taxa selic copom",
    "wall street nasdaq",
    "criptomoedas ethereum",
    "tesouro direto hoje",
    "dividendos ações 2025",
    "renda fixa cdb",
    "mercado financeiro news",
    "portal investimentos",
    "análises profissionais",
    "educação financeira"
  ],
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  publisher: siteConfig.name,
  applicationName: siteConfig.name,
  generator: 'Next.js 14',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: 'google-site-verification-code', // Substituir pelo código real
    yandex: 'yandex-verification-code',
    yahoo: 'yahoo-site-verification-code',
    other: {
      'msvalidate.01': 'bing-verification-code',
      'facebook-domain-verification': 'facebook-verification-code'
    }
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.fullName,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "iAssets - Portal de Notícias Financeiras",
        type: "image/jpeg",
      },
      {
        url: "/images/og-logo.png",
        width: 800,
        height: 600,
        alt: "Logo iAssets",
        type: "image/png",
      },
    ],
    emails: [siteConfig.email],
    phoneNumbers: [siteConfig.phone],
    countryName: 'Brazil',
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.fullName,
    description: siteConfig.description,
    creator: siteConfig.twitterHandle,
    site: siteConfig.twitterHandle,
    images: [
      {
        url: siteConfig.twitterImage,
        alt: "iAssets - Portal de Notícias Financeiras",
      }
    ],
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
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#000000' },
      { rel: 'icon', url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  category: 'Finance',
  classification: 'Financial News Portal',
  bookmarks: [`${siteConfig.url}/mercados`, `${siteConfig.url}/criptomoedas`],
  alternates: {
    canonical: siteConfig.url,
    languages: {
      'pt-BR': siteConfig.url,
      'x-default': siteConfig.url,
    },
    types: {
      'application/rss+xml': [
        { url: `${siteConfig.url}/rss.xml`, title: `${siteConfig.name} RSS Feed` },
        { url: `${siteConfig.url}/feed.json`, title: `${siteConfig.name} JSON Feed` },
      ],
    },
  },
  other: {
    'msapplication-TileColor': '#000000',
    'theme-color': '#000000',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': siteConfig.name,
    'mobile-web-app-capable': 'yes',
    'news_keywords': 'notícias financeiras, mercado de ações, investimentos, economia brasil',
    'article:publisher': siteConfig.social.facebook,
    'fb:app_id': 'facebook-app-id', // Substituir pelo ID real
    'al:web:url': siteConfig.url,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" dir="ltr">
      <head>
        {/* Preconnect para performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* DNS Prefetch para recursos externos */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//connect.facebook.net" />
        <link rel="dns-prefetch" href="//platform.twitter.com" />
        
        {/* Pingback para WordPress compatibility */}
        <link rel="pingback" href={`${siteConfig.url}/xmlrpc.php`} />
      </head>
      <body className="antialiased">
        {/* Dados estruturados globais aprimorados */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

        {/* Schema para Breadcrumb List (será usado pelas páginas) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: 'Financial Categories',
              description: 'Categorias principais do portal iAssets',
              numberOfItems: 6,
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Mercados',
                  url: `${siteConfig.url}/mercados`
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Criptomoedas',
                  url: `${siteConfig.url}/criptomoedas`
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: 'Economia',
                  url: `${siteConfig.url}/economia`
                },
                {
                  '@type': 'ListItem',
                  position: 4,
                  name: 'Internacional',
                  url: `${siteConfig.url}/internacional`
                },
                {
                  '@type': 'ListItem',
                  position: 5,
                  name: 'Análises',
                  url: `${siteConfig.url}/analises`
                },
                {
                  '@type': 'ListItem',
                  position: 6,
                  name: 'Educação',
                  url: `${siteConfig.url}/educacao`
                }
              ]
            })
          }}
        />

        {/* Schema para FAQ (comum em portais financeiros) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'Como acompanhar o mercado financeiro em tempo real?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'No iAssets você acompanha cotações, análises e notícias do mercado financeiro atualizadas em tempo real, com cobertura completa da B3, NYSE e principais mercados globais.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'Quais são as melhores ações para investir hoje?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Nossas análises profissionais avaliam diariamente as melhores oportunidades do mercado, considerando fundamentos, análise técnica e cenário econômico para diferentes perfis de investidor.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'Como funciona o mercado de criptomoedas?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Cobrimos o mercado de criptomoedas com análises de Bitcoin, Ethereum e principais altcoins, explicando tecnologia blockchain, tendências e oportunidades de investimento.'
                  }
                }
              ]
            })
          }}
        />

        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow" role="main" id="main-content">
            {children}
          </main>
          
          {/* Footer otimizado para SEO */}
          <footer className="bg-gray-900 text-white border-t border-gray-800" role="contentinfo" itemScope itemType="https://schema.org/WPFooter">
            <div className="max-w-7xl mx-auto px-6">
              
              {/* Main Footer Content */}
              <div className="py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                  
                  {/* Company Info with structured data */}
                  <div className="lg:col-span-1" itemScope itemType="https://schema.org/Organization">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-gray-900 font-bold" />
                      </div>
                      <div>
                        <span className="text-2xl font-bold text-white" itemProp="name">{siteConfig.name}</span>
                        <p className="text-gray-400 text-sm -mt-1">Portal Financeiro</p>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-8 leading-relaxed text-sm" itemProp="description">
                      O portal mais confiável do Brasil em notícias financeiras. 
                      Análises profissionais e educação financeira para investidores.
                    </p>
                    
                    {/* Trust Indicators */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-sm">
                        <Shield className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">Dados 100% Seguros</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">+500k Investidores</span>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Links with structured data */}
                  <nav className="space-y-6" itemScope itemType="https://schema.org/SiteNavigationElement">
                    <h4 className="font-semibold text-lg mb-6 text-white">Mercados</h4>
                    <ul className="space-y-3">
                      <li><Link href="/categoria/mercados" className="text-gray-300 hover:text-white transition-colors text-sm" itemProp="url">Mercados Financeiros</Link></li>
                      <li><Link href="/categoria/criptomoedas" className="text-gray-300 hover:text-white transition-colors text-sm" itemProp="url">Criptomoedas</Link></li>
                      <li><Link href="/categoria/economia" className="text-gray-300 hover:text-white transition-colors text-sm" itemProp="url">Economia Brasil</Link></li>
                      <li><Link href="/categoria/internacional" className="text-gray-300 hover:text-white transition-colors text-sm" itemProp="url">Mercados Internacionais</Link></li>
                      <li><Link href="/categoria/analises" className="text-gray-300 hover:text-white transition-colors text-sm" itemProp="url">Análises Profissionais</Link></li>
                    </ul>
                  </nav>

                  {/* Tools & Resources */}
                  <div>
                    <h4 className="font-semibold text-lg mb-6 text-white">Ferramentas</h4>
                    <ul className="space-y-3">
                      <li><Link href="/ferramentas/calculadora-dividendos" className="text-gray-300 hover:text-white transition-colors text-sm">Calculadora de Dividendos</Link></li>
                      <li><Link href="/ferramentas/simulador-carteira" className="text-gray-300 hover:text-white transition-colors text-sm">Simulador de Carteira</Link></li>
                      <li><Link href="/cotacoes" className="text-gray-300 hover:text-white transition-colors text-sm">Cotações em Tempo Real</Link></li>
                      <li><Link href="/categoria/educacao" className="text-gray-300 hover:text-white transition-colors text-sm">Educação Financeira</Link></li>
                    </ul>
                  </div>

                  {/* Company */}
                  <div>
                    <h4 className="font-semibold text-lg mb-6 text-white">Empresa</h4>
                    <ul className="space-y-3">
                      <li><Link href="/sobre" className="text-gray-300 hover:text-white transition-colors text-sm">Sobre nós</Link></li>
                      <li><Link href="/equipe" className="text-gray-300 hover:text-white transition-colors text-sm">Nossa equipe</Link></li>
                      <li><Link href="/contato" className="text-gray-300 hover:text-white transition-colors text-sm">Contato</Link></li>
                      <li><Link href="/newsletter" className="text-gray-300 hover:text-white transition-colors text-sm">Newsletter</Link></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Social Media with structured data */}
              <div className="border-t border-gray-800 py-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div>
                    <h4 className="font-semibold text-white mb-4">Siga nossas redes sociais</h4>
                    <div className="flex items-center gap-4" itemScope itemType="https://schema.org/Organization">
                      <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" 
                         className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                         aria-label="Twitter iAssets" itemProp="sameAs">
                        <Twitter className="w-5 h-5 text-gray-300" />
                      </a>
                      <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer"
                         className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                         aria-label="LinkedIn iAssets" itemProp="sameAs">
                        <Linkedin className="w-5 h-5 text-gray-300" />
                      </a>
                      <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer"
                         className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                         aria-label="YouTube iAssets" itemProp="sameAs">
                        <Youtube className="w-5 h-5 text-gray-300" />
                      </a>
                      <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer"
                         className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                         aria-label="Instagram iAssets" itemProp="sameAs">
                        <Instagram className="w-5 h-5 text-gray-300" />
                      </a>
                    </div>
                  </div>
                  
                  <div className="text-center md:text-right">
                    <h4 className="font-semibold text-white mb-2">Newsletter</h4>
                    <p className="text-gray-300 text-sm mb-4">Receba as principais notícias</p>
                    <Link href="/newsletter" 
                          className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-medium transition-colors text-sm">
                      <Mail className="w-4 h-4" />
                      Assinar Newsletter
                    </Link>
                  </div>
                </div>
              </div>

              {/* Copyright & Legal */}
              <div className="border-t border-gray-800 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <p className="text-gray-400 text-sm">
                      © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos reservados.
                    </p>
                  </div>
                  
                  <nav className="flex items-center gap-6 text-sm" aria-label="Links legais">
                    <Link href="/termos" className="text-gray-400 hover:text-white transition-colors">
                      Termos de Uso
                    </Link>
                    <Link href="/privacidade" className="text-gray-400 hover:text-white transition-colors">
                      Privacidade
                    </Link>
                    <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                      Cookies
                    </Link>
                  </nav>
                </div>
              </div>

              {/* Legal Disclaimer */}
              <div className="border-t border-gray-800 pt-8 pb-6">
                <div className="bg-gray-800 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-white mb-3">Aviso Legal</h5>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        As informações contidas neste portal são apenas para fins educacionais e informativos. 
                        Não constituem recomendação de investimento. O investimento em ações e outros ativos envolve riscos. 
                        Sempre consulte um profissional qualificado antes de tomar decisões de investimento.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>

        {/* Analytics e Scripts otimizados */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID', {
              page_title: document.title,
              page_location: window.location.href,
              custom_map: {'custom_parameter': 'value'},
              send_page_view: true
            });
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "CLARITY_PROJECT_ID");
          `}
        </Script>

        {/* Google Search Console verification */}
        <Script id="google-search-console" strategy="afterInteractive">
          {`
            window.addEventListener('load', function() {
              // Verificar se tem meta tag de verificação
              const verification = document.querySelector('meta[name="google-site-verification"]');
              if (verification) {
                console.log('Google Search Console verificado');
              }
            });
          `}
        </Script>
      </body>
    </html>
  );
}