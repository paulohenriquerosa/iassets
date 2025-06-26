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

export const metadata: Metadata = {
  metadataBase: new URL('https://iassets.com.br'),
  title: {
    default: "iAssets - Portal Líder em Notícias e Análises do Mercado Financeiro",
    template: "%s | iAssets"
  },
  description: "Portal #1 em notícias financeiras do Brasil. Análises exclusivas, alertas de mercado, ferramentas profissionais e educação financeira. Mais de 500mil investidores confiam em nós.",
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
                "https://www.youtube.com/c/iassets",
                "https://www.instagram.com/iassets_br",
                "https://www.facebook.com/iassets.br"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+55-11-3456-7890",
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
          <Header />
          <main className="flex-grow" role="main">
            {children}
          </main>
          
          {/* Professional Footer */}
          <footer className="bg-gray-900 text-white border-t border-gray-800" role="contentinfo">
            <div className="max-w-7xl mx-auto px-6">
              
              {/* Main Footer Content */}
              <div className="py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                  
                  {/* Company Info */}
                  <div className="lg:col-span-1">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-gray-900 font-bold" />
                      </div>
                      <div>
                        <span className="text-2xl font-bold text-white">iAssets</span>
                        <p className="text-gray-400 text-sm -mt-1">Portal Financeiro</p>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-8 leading-relaxed text-sm">
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

                  {/* Navigation Links */}
                  <div>
                    <h4 className="font-semibold text-lg mb-6 text-white">Mercados</h4>
                    <ul className="space-y-3">
                      <li><Link href="/mercados/acoes-brasileiras" className="text-gray-300 hover:text-white transition-colors text-sm">Ações Brasileiras</Link></li>
                      <li><Link href="/mercados/acoes-americanas" className="text-gray-300 hover:text-white transition-colors text-sm">Ações Americanas</Link></li>
                      <li><Link href="/mercados/fiis" className="text-gray-300 hover:text-white transition-colors text-sm">Fundos Imobiliários</Link></li>
                      <li><Link href="/mercados/renda-fixa" className="text-gray-300 hover:text-white transition-colors text-sm">Renda Fixa</Link></li>
                      <li><Link href="/cripto" className="text-gray-300 hover:text-white transition-colors text-sm">Criptomoedas</Link></li>
                    </ul>
                  </div>

                  {/* Tools & Resources */}
                  <div>
                    <h4 className="font-semibold text-lg mb-6 text-white">Ferramentas</h4>
                    <ul className="space-y-3">
                      <li><Link href="/ferramentas/calculadora-dividendos" className="text-gray-300 hover:text-white transition-colors text-sm">Calculadora de Dividendos</Link></li>
                      <li><Link href="/ferramentas/simulador-carteira" className="text-gray-300 hover:text-white transition-colors text-sm">Simulador de Carteira</Link></li>
                      <li><Link href="/cotacoes" className="text-gray-300 hover:text-white transition-colors text-sm">Cotações em Tempo Real</Link></li>
                      <li><Link href="/educacao" className="text-gray-300 hover:text-white transition-colors text-sm">Educação Financeira</Link></li>
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

              {/* Social Media */}
              <div className="border-t border-gray-800 py-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div>
                    <h4 className="font-semibold text-white mb-4">Siga nossas redes sociais</h4>
                    <div className="flex items-center gap-4">
                      <a href="https://twitter.com/iassets_br" target="_blank" rel="noopener noreferrer" 
                         className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors">
                        <Twitter className="w-5 h-5 text-gray-300" />
                      </a>
                      <a href="https://www.linkedin.com/company/iassets" target="_blank" rel="noopener noreferrer"
                         className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors">
                        <Linkedin className="w-5 h-5 text-gray-300" />
                      </a>
                      <a href="https://www.youtube.com/c/iassets" target="_blank" rel="noopener noreferrer"
                         className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors">
                        <Youtube className="w-5 h-5 text-gray-300" />
                      </a>
                      <a href="https://www.instagram.com/iassets_br" target="_blank" rel="noopener noreferrer"
                         className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors">
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
                      © 2025 iAssets. Todos os direitos reservados.
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm">
                    <Link href="/termos" className="text-gray-400 hover:text-white transition-colors">
                      Termos de Uso
                    </Link>
                    <Link href="/privacidade" className="text-gray-400 hover:text-white transition-colors">
                      Privacidade
                    </Link>
                    <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                      Cookies
                    </Link>
                  </div>
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