import Link from "next/link";
import Image from "next/image";
import { getAllPosts, Post } from "@/lib/notion";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  Clock, 
  ArrowRight, 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  Bitcoin,
  DollarSign,
  Globe,
  Zap,
  ChevronRight,
  Eye,
  MessageCircle,
  Share2,
  Flame
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "iAssets - Portal de Notícias e Análises do Mercado Financeiro",
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
    "mercado financeiro brasileiro",
    "investir dinheiro",
    "ações brasileiras",
    "análises de mercado",
    "portal financeiro",
    "cotações em tempo real"
  ],
  alternates: {
    canonical: "https://iassets.com.br",
  },
  openGraph: {
    title: "iAssets - Portal de Notícias do Mercado Financeiro",
    description: "Portal líder em notícias financeiras do Brasil. Análises de ações, criptomoedas, fundos imobiliários e investimentos. Cotações em tempo real.",
    url: "https://iassets.com.br",
    siteName: "iAssets",
    images: [
      {
        url: "/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "iAssets - Portal de Investimentos",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "iAssets - Portal de Notícias do Mercado Financeiro",
    description: "Portal líder em notícias financeiras do Brasil. Análises de ações, criptomoedas, fundos imobiliários e investimentos.",
    images: ["/images/twitter-home.jpg"],
    creator: "@iassets_br",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

// Mock data for market data
const marketData = [
  { symbol: "IBOV", name: "Ibovespa", price: "129.847", change: "+0.85%", isPositive: true },
  { symbol: "IFIX", name: "IFix", price: "2.847", change: "-0.23%", isPositive: false },
  { symbol: "USD/BRL", name: "Dólar", price: "5.51", change: "-0.12%", isPositive: false },
  { symbol: "BTC", name: "Bitcoin", price: "$67.234", change: "+2.45%", isPositive: true },
  { symbol: "ETH", name: "Ethereum", price: "$3.456", change: "+1.23%", isPositive: true },
  { symbol: "PETR4", name: "Petrobras", price: "38.45", change: "+1.85%", isPositive: true },
];

const quickLinks = [
  { title: "Calculadora de Investimentos", href: "/calculadoras", icon: BarChart3 },
  { title: "Carteira Recomendada", href: "/carteiras", icon: TrendingUp },
  { title: "Análise Técnica", href: "/analise-tecnica", icon: Globe },
  { title: "Cursos Gratuitos", href: "/educacao", icon: Zap },
];

const categories = [
  {
    title: "Ações Brasileiras",
    description: "Análises e notícias do mercado acionário nacional",
    icon: BarChart3,
    href: "/mercados/acoes-brasileiras",
    color: "bg-blue-500"
  },
  {
    title: "Criptomoedas",
    description: "Bitcoin, Ethereum e o mundo das criptos",
    icon: Bitcoin,
    href: "/crypto",
    color: "bg-orange-500"
  },
  {
    title: "Internacional",
    description: "Wall Street, Europa e mercados globais",
    icon: Globe,
    href: "/internacional",
    color: "bg-green-500"
  },
  {
    title: "Educação",
    description: "Aprenda a investir com nossos guias",
    icon: Zap,
    href: "/educacao",
    color: "bg-purple-500"
  }
];

export default async function HomePage() {
  // Fetch blog posts for the news section
  let posts: Post[] = [];
  
  try {
    posts = await getAllPosts();
  } catch (err) {
    console.error("Error fetching posts:", err);
    posts = [];
  }

  // Get featured post (first post)
  const featuredPost = posts[0];
  const regularPosts = posts.slice(1, 7); // Next 6 posts

  // Dados estruturados para lista de artigos
  const articleListData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "iAssets - Portal de Notícias Financeiras",
    "description": "Portal líder em notícias financeiras do Brasil",
    "url": "https://iassets.com.br",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": posts.length,
      "itemListElement": posts.slice(0, 10).map((post, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "NewsArticle",
          "headline": post.title,
          "description": post.description,
          "url": `https://iassets.com.br/${post.slug}`,
          "datePublished": new Date(post.date).toISOString(),
          "author": {
            "@type": "Person",
            "name": post.author?.name || "Equipe iAssets"
          },
          "publisher": {
            "@type": "Organization",
            "name": "iAssets"
          },
          "image": post.coverImage || "https://iassets.com.br/images/default-article.jpg"
        }
      }))
    }
  };

  // FAQs estruturados
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "O que é o iAssets?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O iAssets é o portal líder em notícias financeiras do Brasil, oferecendo análises profissionais de ações, criptomoedas, fundos imobiliários e investimentos com cotações em tempo real."
        }
      },
      {
        "@type": "Question",
        "name": "Como acompanhar as cotações em tempo real?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Você pode acompanhar as cotações do Ibovespa, dólar, Bitcoin e outras moedas diretamente na nossa homepage e na seção de mercados, com atualizações automáticas."
        }
      },
      {
        "@type": "Question",
        "name": "O conteúdo do iAssets é gratuito?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim, todo o conteúdo do iAssets é gratuito, incluindo notícias, análises, cotações e ferramentas de investimento."
        }
      }
    ]
  };

  return (
    <>
      {/* Dados estruturados */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleListData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqData)
        }}
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-muted/50 to-background py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Featured Article */}
              <div className="lg:col-span-2">
                {featuredPost ? (
                  <article className="relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-lg group cursor-pointer" itemScope itemType="https://schema.org/NewsArticle">
                    <div className="relative h-64 md:h-80">
                      {featuredPost.coverImage ? (
                        <Image
                          src={featuredPost.coverImage}
                          alt={featuredPost.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          itemProp="image"
                          priority
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary/10 to-primary/5">
                          <DollarSign className="w-20 h-20 text-primary/50" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Breaking News Badge */}
                      <div className="absolute top-4 left-4">
                        <div className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                          <Flame className="w-3 h-3" />
                          DESTAQUE
                        </div>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4">
                        {featuredPost.tags && featuredPost.tags.length > 0 && (
                          <span className="inline-flex items-center rounded-full border border-transparent bg-primary text-primary-foreground hover:bg-primary/80 px-3 py-1 text-xs font-semibold mb-3" itemProp="articleSection">
                            {featuredPost.tags[0]}
                          </span>
                        )}
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 line-clamp-2" itemProp="headline">
                          <Link href={`/${featuredPost.slug}`}>
                            {featuredPost.title}
                          </Link>
                        </h1>
                        {featuredPost.description && (
                          <p className="text-white/90 text-sm line-clamp-2 mb-3" itemProp="description">
                            {featuredPost.description}
                          </p>
                        )}
                        <div className="flex items-center gap-4 text-white/80 text-sm">
                          <div className="flex items-center gap-2" itemScope itemType="https://schema.org/Person" itemProp="author">
                            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                              {featuredPost.author?.name?.charAt(0) || 'A'}
                            </div>
                            <span itemProp="name">{featuredPost.author?.name || 'Redação'}</span>
                          </div>
                          <span>•</span>
                          <time dateTime={featuredPost.date} itemProp="datePublished">
                            {format(new Date(featuredPost.date), "dd MMM", { locale: ptBR })}
                          </time>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>2.5k</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ) : (
                  <div className="relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-lg h-80 flex items-center justify-center">
                    <div className="text-center">
                      <DollarSign className="w-16 h-16 text-primary/50 mx-auto mb-4" />
                      <h2 className="text-xl font-semibold mb-2">Carregando notícias...</h2>
                      <p className="text-muted-foreground">Aguarde enquanto buscamos as últimas notícias</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <aside className="space-y-6">
                {/* Market Overview */}
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="flex flex-col space-y-1.5 p-6">
                    <h2 className="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Mercados Agora
                    </h2>
                  </div>
                  <div className="p-6 pt-0 space-y-3">
                    {marketData.slice(0, 4).map((item) => (
                      <div key={item.symbol} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">{item.symbol}</div>
                          <div className="text-xs text-muted-foreground">{item.name}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-sm">{item.price}</div>
                          <div className={`text-xs flex items-center gap-1 ${
                            item.isPositive ? "text-green-600" : "text-red-600"
                          }`}>
                            {item.isPositive ? (
                              <TrendingUp className="w-3 h-3" />
                            ) : (
                              <TrendingDown className="w-3 h-3" />
                            )}
                            {item.change}
                          </div>
                        </div>
                      </div>
                    ))}
                    <Link href="/mercados" className="block w-full">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 w-full">
                        Ver todos os mercados
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Quick Links */}
                <nav className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="flex flex-col space-y-1.5 p-6">
                    <h2 className="text-2xl font-semibold leading-none tracking-tight">Ferramentas</h2>
                  </div>
                  <div className="p-6 pt-0 space-y-2">
                    {quickLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center gap-3 p-2 hover:bg-accent rounded-md transition-colors"
                      >
                        <link.icon className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">{link.title}</span>
                        <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground" />
                      </Link>
                    ))}
                  </div>
                </nav>
              </aside>
            </div>
          </div>
        </section>

        {/* Latest News from Notion */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Últimas Notícias</h2>
              <Link href="/todas-noticias">
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                  Ver todas
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </Link>
            </div>

            {regularPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularPosts.map((post) => (
                  <article key={post.slug} className="group" itemScope itemType="https://schema.org/NewsArticle">
                    <div className="h-full hover:shadow-lg transition-all duration-300 rounded-lg border bg-card text-card-foreground shadow-sm">
                      <div className="relative h-48 overflow-hidden rounded-t-lg">
                        {post.coverImage ? (
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            itemProp="image"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary/10 to-primary/5">
                            <DollarSign className="w-12 h-12 text-primary/50" />
                          </div>
                        )}
                        {post.tags && post.tags.length > 0 && (
                          <div className="absolute top-3 left-3">
                            <span className="inline-flex items-center rounded-full border border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 px-2.5 py-0.5 text-xs font-semibold" itemProp="articleSection">
                              {post.tags[0]}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                          <time dateTime={post.date} itemProp="datePublished">
                            {format(new Date(post.date), "dd MMM", { locale: ptBR })}
                          </time>
                          <span>•</span>
                          <Clock className="w-3 h-3" />
                          <span>3 min</span>
                        </div>
                        
                        <h3 className="font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2" itemProp="headline">
                          <Link href={`/${post.slug}`} itemProp="url">
                            {post.title}
                          </Link>
                        </h3>
                        
                        {post.description && (
                          <p className="text-muted-foreground text-sm line-clamp-2 mb-3" itemProp="description">
                            {post.description}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between pt-3 border-t">
                          <div className="flex items-center gap-2" itemScope itemType="https://schema.org/Person" itemProp="author">
                            <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                              {post.author?.name?.charAt(0) || 'A'}
                            </div>
                            <span className="text-xs text-muted-foreground" itemProp="name">
                              {post.author?.name || 'Redação'}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <MessageCircle className="w-3 h-3" />
                            <span>12</span>
                            <Share2 className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <DollarSign className="w-16 h-16 text-primary/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Carregando notícias...</h3>
                <p className="text-muted-foreground">
                  Estamos buscando as últimas notícias do mercado financeiro.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Explore por Categoria
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Link key={category.href} href={category.href}>
                  <div className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="p-6 text-center">
                      <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                        <category.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 md:py-24 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                Não perca nenhuma oportunidade
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Receba as principais notícias e análises do mercado financeiro diretamente na sua caixa de entrada.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Digite seu email"
                  className="flex-1 px-4 py-3 rounded-md border border-input bg-background"
                  required
                  aria-label="Email para newsletter"
                />
                <button 
                  type="submit"
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
                >
                  Inscrever-se
                </button>
              </form>
              <p className="text-xs text-muted-foreground mt-4">
                Mais de 50.000 investidores já recebem nossa newsletter. Cancele quando quiser.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
} 