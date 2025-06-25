import { Metadata } from "next";
import { FinancialHeader } from "@/components/financial-header";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://iassets.com.br'),
  title: {
    default: "iAssets - Portal de Notícias e Análises do Mercado Financeiro",
    template: "%s | iAssets"
  },
  description: "Portal líder em notícias financeiras do Brasil. Análises profissionais de ações, criptomoedas, fundos imobiliários, economia e investimentos. Cotações em tempo real do Ibovespa, dólar e Bitcoin.",
  keywords: [
    "notícias financeiras",
    "mercado de ações",
    "investimentos brasil",
    "bolsa de valores",
    "ibovespa hoje",
    "cotação dólar",
    "bitcoin preço",
    "criptomoedas",
    "fundos imobiliários",
    "fiis",
    "análise técnica",
    "renda fixa",
    "tesouro direto",
    "dividendos",
    "economia brasil",
    "wall street",
    "mercado financeiro",
    "investir",
    "ações brasileiras",
    "análises de mercado"
  ],
  authors: [{ name: "Equipe iAssets" }],
  creator: "iAssets",
  publisher: "iAssets",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://iassets.com.br",
    siteName: "iAssets",
    title: "iAssets - Portal de Notícias do Mercado Financeiro",
    description: "Portal líder em notícias financeiras do Brasil. Análises de ações, criptomoedas, fundos imobiliários e investimentos. Cotações em tempo real.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "iAssets - Portal de Investimentos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "iAssets - Portal de Notícias do Mercado Financeiro",
    description: "Portal líder em notícias financeiras do Brasil. Análises de ações, criptomoedas, fundos imobiliários e investimentos.",
    creator: "@iassets_br",
    images: ["/images/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#000000' },
    ],
  },
  manifest: '/manifest.json',
  category: 'finance',
  classification: 'Finance and Investment News Portal',
  other: {
    'msapplication-TileColor': '#000000',
    'theme-color': '#000000',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">

      
              <body className="antialiased">
        {/* Dados estruturados globais */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "iAssets",
              "description": "Portal líder em notícias financeiras do Brasil",
              "url": "https://iassets.com.br",
              "logo": "https://iassets.com.br/images/logo.png",
              "sameAs": [
                "https://twitter.com/iassets_br",
                "https://www.linkedin.com/company/iassets",
                "https://www.youtube.com/c/iassets"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+55-11-9999-9999",
                "contactType": "Customer Service",
                "availableLanguage": "Portuguese"
              }
            })
          }}
        />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "iAssets",
              "url": "https://iassets.com.br",
              "description": "Portal de notícias e análises do mercado financeiro brasileiro",
              "publisher": {
                "@type": "Organization",
                "name": "iAssets"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://iassets.com.br/busca?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        <div className="min-h-screen flex flex-col">
          <FinancialHeader />
          <main className="flex-grow" role="main">
            {children}
          </main>
          <footer className="bg-muted/30 border-t border-border py-8" role="contentinfo">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-2">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                      <span className="text-primary-foreground font-bold">$</span>
                    </div>
                    <div>
                      <span className="text-xl font-bold">iAssets</span>
                      <p className="text-sm text-muted-foreground -mt-1">Investimentos</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Portal líder em notícias financeiras do Brasil. Sua fonte confiável para análises e informações do mercado financeiro brasileiro e internacional.
                  </p>
                  <div className="flex items-center gap-4">
                    <a href="https://twitter.com/iassets_br" rel="noopener noreferrer" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                      Twitter
                    </a>
                    <a href="https://www.linkedin.com/company/iassets" rel="noopener noreferrer" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                      LinkedIn
                    </a>
                    <a href="https://www.youtube.com/c/iassets" rel="noopener noreferrer" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                      YouTube
                    </a>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Mercados</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><a href="/mercados/acoes-brasileiras" className="hover:text-foreground transition-colors">Ações Brasileiras</a></li>
                    <li><a href="/mercados/acoes-americanas" className="hover:text-foreground transition-colors">Ações Americanas</a></li>
                    <li><a href="/mercados/fiis" className="hover:text-foreground transition-colors">Fundos Imobiliários</a></li>
                    <li><a href="/crypto" className="hover:text-foreground transition-colors">Criptomoedas</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Empresa</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><a href="/sobre" className="hover:text-foreground transition-colors">Sobre Nós</a></li>
                    <li><a href="/contato" className="hover:text-foreground transition-colors">Contato</a></li>
                    <li><a href="/termos" className="hover:text-foreground transition-colors">Termos de Uso</a></li>
                    <li><a href="/privacidade" className="hover:text-foreground transition-colors">Privacidade</a></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                  © 2024 iAssets. Todos os direitos reservados.
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Dados fornecidos por parceiros confiáveis</span>
                  <a href="/sitemap.xml" className="hover:text-foreground transition-colors">Sitemap</a>
                </div>
              </div>
            </div>
          </footer>
        </div>

        {/* Google Analytics */}
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
      </body>
    </html>
  );
}