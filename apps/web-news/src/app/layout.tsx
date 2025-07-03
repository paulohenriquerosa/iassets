import { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/header";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { FooterWithTracking } from "@/components/footer-with-tracking";
import { siteConfig, organizationSchema, websiteSchema } from "@/lib/seo";
import React, { Suspense } from "react";
import PageTracker from "@/components/PageTracker";
import WebVitalsTracker from "@/components/WebVitalsTracker";
import CookieBanner from "@/components/cookie-banner";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.fullName,
    template: `%s | ${siteConfig.name}`,
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
    "educação financeira",
  ],
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  publisher: siteConfig.name,
  applicationName: siteConfig.name,
  generator: "Next.js 14",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: "google-site-verification-code", // Substituir pelo código real
    yandex: "yandex-verification-code",
    yahoo: "yahoo-site-verification-code",
    other: {
      "msvalidate.01": "bing-verification-code",
      "facebook-domain-verification": "facebook-verification-code",
    },
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
        alt: "iAssets News - Portal de Notícias Financeiras",
        type: "image/jpeg",
      },
      {
        url: "/images/og-logo.png",
        width: 800,
        height: 600,
        alt: "Logo iAssets News",
        type: "image/png",
      },
    ],
    emails: [siteConfig.email],
    phoneNumbers: [siteConfig.phone],
    countryName: "Brazil",
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
        alt: "iAssets News - Portal de Notícias Financeiras",
      },
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
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#000000" },
      {
        rel: "icon",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/manifest.json",
  category: "Finance",
  classification: "Financial News Portal",
  bookmarks: [`${siteConfig.url}/mercados`, `${siteConfig.url}/criptomoedas`],
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "pt-BR": siteConfig.url,
      "x-default": siteConfig.url,
    },
    types: {
      "application/rss+xml": [
        {
          url: `${siteConfig.url}/rss.xml`,
          title: `${siteConfig.name} RSS Feed`,
        },
        {
          url: `${siteConfig.url}/feed.json`,
          title: `${siteConfig.name} JSON Feed`,
        },
      ],
    },
  },
  other: {
    "msapplication-TileColor": "#000000",
    "theme-color": "#000000",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": siteConfig.name,
    "mobile-web-app-capable": "yes",
    news_keywords:
      "notícias financeiras, mercado de ações, investimentos, economia brasil",
    "article:publisher": siteConfig.social.facebook,
    "fb:app_id": "facebook-app-id", // Substituir pelo ID real
    "al:web:url": siteConfig.url,
  },
};

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
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* DNS Prefetch para recursos externos */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//connect.facebook.net" />
        <link rel="dns-prefetch" href="//platform.twitter.com" />

        <meta name="google-adsense-account" content="ca-pub-2303827165043763"></meta>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2303827165043763" crossOrigin="anonymous"></script>

        {/* Pingback para WordPress compatibility */}
        <link rel="pingback" href={`${siteConfig.url}/xmlrpc.php`} />

        {/* Google Analytics script */}
        {/* The remote script is loaded in <head> for early availability, actual configuration waits for cookie consent */}
        { }
        <Script
          id="gtag-src"
          src="https://www.googletagmanager.com/gtag/js?id=G-FBPGE2KV71"
          strategy="beforeInteractive"
        />
      </head>
      <body className="antialiased">
        {/* Dados estruturados globais aprimorados */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
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
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Financial Categories",
              description: "Categorias principais do portal iAssets News",
              numberOfItems: 6,
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Mercados",
                  url: `${siteConfig.url}/mercados`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Criptomoedas",
                  url: `${siteConfig.url}/criptomoedas`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Economia",
                  url: `${siteConfig.url}/economia`,
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Internacional",
                  url: `${siteConfig.url}/internacional`,
                },
                {
                  "@type": "ListItem",
                  position: 5,
                  name: "Análises",
                  url: `${siteConfig.url}/analises`,
                },
                {
                  "@type": "ListItem",
                  position: 6,
                  name: "Educação",
                  url: `${siteConfig.url}/educacao`,
                },
              ],
            }),
          }}
        />

        {/* Schema para FAQ (comum em portais financeiros) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Como acompanhar o mercado financeiro em tempo real?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No iAssets News você acompanha cotações, análises e notícias do mercado financeiro atualizadas em tempo real, com cobertura completa da B3, NYSE e principais mercados globais.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Quais são as melhores ações para investir hoje?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Nossas análises profissionais avaliam diariamente as melhores oportunidades do mercado, considerando fundamentos, análise técnica e cenário econômico para diferentes perfis de investidor.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Como funciona o mercado de criptomoedas?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Cobrimos o mercado de criptomoedas com análises de Bitcoin, Ethereum e principais altcoins, explicando tecnologia blockchain, tendências e oportunidades de investimento.",
                  },
                },
              ],
            }),
          }}
        />

        <div className="min-h-screen flex flex-col">
          <Header />
          {/* Wrap PageTracker in Suspense to satisfy useSearchParams CSR requirement */}
          <Suspense fallback={null}>
            <PageTracker />
            <WebVitalsTracker />
          </Suspense>
          <main className="flex-grow" role="main" id="main-content">
            {children}
          </main>

          {/* Footer com tracking integrado */}
          <FooterWithTracking />

          {/* Cookie consent banner */}
          <CookieBanner />
        </div>

        {/* Analytics config gated by cookie consent */}

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(){
              function loadClarity(){
                (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "CLARITY_PROJECT_ID");
              }
              if(document.cookie.includes('cookie_consent=all')){ loadClarity(); }
              else { window.addEventListener('cookie-consent-accepted', loadClarity); }
            })();
          `}
        </Script>

        {/* Sistema de Analytics Financeiro Avançado */}
        <Script id="financial-analytics-init" strategy="afterInteractive">
          {`
            (function(){
              function loadFinAnalytics(){
                if(typeof window==='undefined') return;
                import('/src/lib/analytics.js').then(m=>{
                  m.FinancialAnalytics.init();
                  m.FinancialAnalytics.trackPagePerformance();
                }).catch(()=>{});
              }
              if(document.cookie.includes('cookie_consent=all')){
                window.addEventListener('load', loadFinAnalytics);
              } else {
                window.addEventListener('cookie-consent-accepted', function(){
                  window.removeEventListener('cookie-consent-accepted', arguments.callee);
                  window.addEventListener('load', loadFinAnalytics);
                });
              }
            })();
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
