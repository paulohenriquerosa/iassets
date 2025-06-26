import { Clock, TrendingUp, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "iAssets - Portal Líder em Notícias e Análises do Mercado Financeiro",
  description: "Portal #1 em notícias financeiras do Brasil. Análises exclusivas, alertas de mercado, ferramentas profissionais e educação financeira. Mais de 500mil investidores confiam em nós.",
  keywords: [
    "notícias financeiras",
    "investimentos",
    "bolsa de valores",
    "análises de mercado",
    "ibovespa",
    "ações",
    "fundos imobiliários",
    "renda fixa",
    "criptomoedas",
    "economia brasil"
  ]
};

const marketData = [
  { symbol: "IBOV", value: "130.247", change: "+1.25%", positive: true },
  { symbol: "USD/BRL", value: "5.48", change: "-0.32%", positive: false },
  { symbol: "BTC", value: "$71.234", change: "+3.45%", positive: true },
  { symbol: "EUR/BRL", value: "5.95", change: "+0.18%", positive: true },
  { symbol: "PETR4", value: "R$ 38.42", change: "+2.1%", positive: true },
  { symbol: "VALE3", value: "R$ 65.89", change: "-1.2%", positive: false },
  { symbol: "ITUB4", value: "R$ 32.15", change: "+0.8%", positive: true },
  { symbol: "BBDC4", value: "R$ 14.67", change: "+1.5%", positive: true }
];

const featuredPost = {
  title: "Senado derruba aumento da IOF e concessões vão atrás da Casa para aprovar projeto",
  excerpt: "Senadores rejeitaram a medida provisória que aumentaria a alíquota do Imposto sobre Operações Financeiras. Empresas de concessão mobilizam lobby para reverter decisão.",
  date: "Há 3 horas",
  image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop&crop=center",
  slug: "senado-derruba-aumento-iof",
  readTime: "5 min"
};

const sidebarPosts = [
  {
    title: "Petrobras anuncia dividendo extraordinário de R$ 2,5 bilhões",
    time: "Há 2 horas",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=80&h=60&fit=crop",
    slug: "petrobras-dividendo-extraordinario"
  },
  {
    title: "Ibovespa opera em alta de 1,2% com otimismo do mercado",
    time: "Há 3 horas", 
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=80&h=60&fit=crop",
    slug: "ibovespa-alta-otimismo"
  },
  {
    title: "Fed mantém juros e sinaliza política mais branda",
    time: "Há 4 horas",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=80&h=60&fit=crop", 
    slug: "fed-mantem-juros"
  },
  {
    title: "Bitcoin supera US$ 45 mil com entrada de ETFs",
    time: "Há 5 horas",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=80&h=60&fit=crop",
    slug: "bitcoin-supera-45-mil"
  }
];

// Seção Mercados
const mercadosPosts = [
  {
    category: "Economia",
    title: "Powell faz alerta contra fim do poder do Fed de pagar juros sobre reservas",
    time: "Há 1 hora",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=240&fit=crop",
    slug: "powell-alerta-fed-juros-reservas"
  },
  {
    category: "Mercados",
    title: "Petróleo sobe, recuperando parte da perda após tombo em 2 dias, com tensões no radar",
    time: "Há 2 horas",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=240&fit=crop",
    slug: "petroleo-sobe-recuperando-perda"
  },
  {
    category: "Economia", 
    title: "BofA eleva previsão de crescimento global após alívio sobre EUA e China nas tarifas",
    time: "Há 3 horas",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=240&fit=crop",
    slug: "bofa-eleva-previsao-crescimento"
  },
  {
    category: "Mercados",
    title: "UBS BB corta preço-alvo de BBSE e ONSE após revisar rural, previdência e vida crédito",
    time: "Há 4 horas",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=240&fit=crop",
    slug: "ubs-corta-preco-alvo-bbse"
  }
];

// Seção Guia de Investimentos
const guiaInvestimentosPosts = [
  {
    category: "Guia de Investimento",
    title: "Como escolher as melhores ações para iniciantes em 2024",
    badge: "Carteiras Automatizadas: Fundos Imobiliários",
    time: "Há 2 horas",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=240&fit=crop",
    slug: "como-escolher-acoes-iniciantes"
  },
  {
    category: "Guia de Investimento", 
    title: "Renda fixa vs variável: qual a melhor estratégia para seu perfil",
    badge: "Fundos de Investimentos",
    time: "Há 4 hours",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=240&fit=crop",
    slug: "renda-fixa-vs-variavel"
  },
  {
    category: "Guia de Investimento",
    title: "Fundos imobiliários: guia completo para investir em FIIs",
    badge: "Carteiras Automatizadas: Fundos Imobiliários", 
    time: "Há 6 horas",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=240&fit=crop",
    slug: "fundos-imobiliarios-guia-completo"
  },
  {
    category: "Guia de Investimento",
    title: "Diversificação de carteira: estratégias para reduzir riscos",
    badge: "Fundos de Investimentos",
    time: "Há 8 hours",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=240&fit=crop",
    slug: "diversificacao-carteira-estrategias"
  }
];

// Outras seções mantendo estrutura similar
const acoesPosts = [
  {
    category: "Ações",
    title: "Vale registra alta de 3% após resultado trimestral surpreender analistas",
    time: "Há 1 hora",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=240&fit=crop",
    slug: "vale-alta-resultado-trimestral"
  },
  {
    category: "Ações",
    title: "Magazine Luiza apresenta plano de reestruturação para 2025",
    time: "Há 3 horas",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=240&fit=crop",
    slug: "magalu-reestruturacao-2025"
  },
  {
    category: "Ações",
    title: "Ação da Embraer dispara com novo contrato internacional",
    time: "Há 5 horas",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=240&fit=crop",
    slug: "embraer-dispara-novo-contrato"
  },
  {
    category: "Ações", 
    title: "WEG anuncia expansão internacional e investe R$ 500 mi",
    time: "Há 7 horas",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=240&fit=crop",
    slug: "weg-expansao-internacional-500mi"
  }
];

const fiisPosts = [
  {
    category: "FIIs",
    title: "HGLG11 anuncia aquisição de shopping center em São Paulo",
    time: "Há 2 horas",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=240&fit=crop",
    slug: "hglg11-aquisicao-shopping-sp"
  },
  {
    category: "FIIs",
    title: "Fundos imobiliários de logística lideram rentabilidade em 2024",
    time: "Há 4 horas",
    image: "https://images.unsplash.com/photo-1448630360428-65456885c650?w=400&h=240&fit=crop",
    slug: "fiis-logistica-lideram-rentabilidade"
  },
  {
    category: "FIIs",
    title: "Taxa de vacância de escritórios cai 15% em São Paulo",
    time: "Há 6 horas",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=240&fit=crop",
    slug: "taxa-vacancia-escritorios-cai-15"
  },
  {
    category: "FIIs",
    title: "BTLG11 registra dividend yield de 9,2% e surpreende mercado",
    time: "Há 8 horas",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=240&fit=crop",
    slug: "btlg11-dividend-yield-9-2-surpreende"
  }
];

const economiaPosts = [
  {
    category: "Economia",
    title: "IPCA de outubro fica em 0,56%, acima das expectativas do mercado",
    time: "Há 2 horas",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=240&fit=crop",
    slug: "ipca-outubro-acima-expectativas"
  },
  {
    category: "Economia",
    title: "PIB do terceiro trimestre supera projeções e cresce 0,9%",
    time: "Há 4 horas",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=240&fit=crop",
    slug: "pib-terceiro-trimestre-supera-projecoes"
  },
  {
    category: "Economia",
    title: "Balança comercial registra superávit de US$ 2,8 bilhões",
    time: "Há 6 horas",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=240&fit=crop",
    slug: "balanca-comercial-superavit-2-8-bi"
  },
  {
    category: "Economia",
    title: "Taxa de desemprego cai para 8,5% no trimestre encerrado",
    time: "Há 8 horas",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=240&fit=crop",
    slug: "taxa-desemprego-cai-8-5-trimestre"
  }
];

const criptomoedasPosts = [
  {
    category: "Criptomoedas",
    title: "Ethereum atinge novo patamar com upgrade da rede para PoS",
    time: "Há 1 hora",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=240&fit=crop",
    slug: "ethereum-upgrade-rede-pos"
  },
  {
    category: "Criptomoedas",
    title: "Solana ganha destaque no mercado de NFTs e DeFi",
    time: "Há 3 horas",
    image: "https://images.unsplash.com/photo-1640161704729-cbe966a08476?w=400&h=240&fit=crop",
    slug: "solana-destaque-nfts-defi"
  },
  {
    category: "Criptomoedas",
    title: "Binance lança novo produto DeFi exclusivo para o Brasil",
    time: "Há 5 horas",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=240&fit=crop",
    slug: "binance-produto-defi-brasil"
  },
  {
    category: "Criptomoedas",
    title: "Cardano implementa smart contracts avançados em nova atualização",
    time: "Há 7 horas",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=240&fit=crop",
    slug: "cardano-smart-contracts-atualizacao"
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">

      {/* Market Data Ticker */}
      <div className="bg-gray-900 text-white py-2 sm:py-3 overflow-hidden">
        <div className="animate-scroll whitespace-nowrap">
          <div className="inline-flex items-center space-x-6 sm:space-x-8">
            {/* Duplicate the data for seamless loop */}
            {[...marketData, ...marketData].map((item, index) => (
              <div key={index} className="inline-flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm font-medium">
                <span className="text-gray-300">{item.symbol}</span>
                <span className="text-white">{item.value}</span>
                <span className={`${item.positive ? 'text-green-400' : 'text-red-400'}`}>
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Featured Post */}
          <div className="lg:col-span-2">
            <Link href={`/${featuredPost.slug}`}>
              <div className="relative w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-200 dark:border-gray-800">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4 text-sm text-white/80">
                    <Clock className="w-4 h-4" />
                    <span>{featuredPost.date}</span>
                    <span className="mx-2">•</span>
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                    {featuredPost.title}
                  </h1>
                  <p className="text-white/90 text-sm sm:text-base md:text-lg line-clamp-2 mb-4 sm:mb-6 lg:mb-8">
                    {featuredPost.excerpt}
                  </p>
                  <Button className="bg-white hover:bg-gray-100 text-gray-900 text-sm px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-200">
                    Ler mais
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Link>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 h-full flex flex-col">
              <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                  Mais Lidas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6 flex-1">
                {sidebarPosts.map((post, index) => (
                  <Link
                    key={index}
                    href={`/${post.slug}`}
                    className="flex gap-3 sm:gap-4 hover:bg-gray-50 dark:hover:bg-gray-700 p-3 sm:p-4 rounded-xl transition-colors group"
                  >
                    <div className="relative w-16 h-12 sm:w-20 sm:h-16 flex-shrink-0 rounded-xl overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors leading-tight mb-1 sm:mb-2">
                        {post.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 font-medium">{post.time}</p>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-12 sm:space-y-14">
          {/* Mercados Section */}
          <section>
            <div className="border-l-4 border-blue-600 pl-4 sm:pl-6 mb-8 sm:mb-12">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">Mercados</h2>
                <Link 
                  href="/mercados" 
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 text-base sm:text-lg font-medium hover:underline transition-colors"
                >
                  Ver todos
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {mercadosPosts.map((post, index) => (
                <Link key={index} href={`/${post.slug}`}>
                  <Card className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-200 dark:border-gray-800 h-full">
                    <div className="relative h-48 sm:h-52 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4 sm:p-6">
                      <div className="mb-3 sm:mb-4">
                        <span className="text-xs sm:text-sm font-semibold text-blue-600 bg-blue-50 px-2 sm:px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-3-no-ellipsis group-hover:text-blue-600 transition-colors leading-tight mb-3 sm:mb-4">
                        {post.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 font-medium">{post.time}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <Separator  />

          {/* Guia de Investimentos Section */}
          <section>
            <div className="border-l-4 border-green-600 pl-4 sm:pl-6 mb-8 sm:mb-12">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">Guia de investimentos</h2>
                <Link 
                  href="/guia-investimentos" 
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 text-base sm:text-lg font-medium hover:underline transition-colors"
                >
                  Ver todos
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {guiaInvestimentosPosts.map((post, index) => (
                <Link key={index} href={`/${post.slug}`}>
                  <Card className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-200 dark:border-gray-800 h-full">
                    <div className="relative h-48 sm:h-52 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                        <span className="text-xs font-semibold text-white bg-red-600 px-2 sm:px-3 py-1 rounded-full">
                          {post.badge}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-4 sm:p-6">
                      <div className="mb-3 sm:mb-4">
                        <span className="text-xs sm:text-sm font-semibold text-green-600 bg-green-50 px-2 sm:px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-3-no-ellipsis group-hover:text-blue-600 transition-colors leading-tight mb-3 sm:mb-4">
                        {post.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 font-medium">{post.time}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <Separator  />

          {/* Ações Section */}
          <section>
            <div className="border-l-4 border-purple-600 pl-4 sm:pl-6 mb-8 sm:mb-12">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">Ações</h2>
                <Link 
                  href="/acoes" 
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 text-base sm:text-lg font-medium hover:underline transition-colors"
                >
                  Ver todos
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {acoesPosts.map((post, index) => (
                <Link key={index} href={`/${post.slug}`}>
                  <Card className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-200 dark:border-gray-800 h-full">
                    <div className="relative h-48 sm:h-52 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4 sm:p-6">
                      <div className="mb-3 sm:mb-4">
                        <span className="text-xs sm:text-sm font-semibold text-purple-600 bg-purple-50 px-2 sm:px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-3-no-ellipsis group-hover:text-blue-600 transition-colors leading-tight mb-3 sm:mb-4">
                        {post.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 font-medium">{post.time}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <Separator  />

          {/* FIIs Section */}
          <section>
            <div className="border-l-4 border-orange-600 pl-4 sm:pl-6 mb-8 sm:mb-12">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">FIIs</h2>
                <Link 
                  href="/fiis" 
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 text-base sm:text-lg font-medium hover:underline transition-colors"
                >
                  Ver todos
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {fiisPosts.map((post, index) => (
                <Link key={index} href={`/${post.slug}`}>
                  <Card className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-200 dark:border-gray-800 h-full">
                    <div className="relative h-48 sm:h-52 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4 sm:p-6">
                      <div className="mb-3 sm:mb-4">
                        <span className="text-xs sm:text-sm font-semibold text-orange-600 bg-orange-50 px-2 sm:px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-3-no-ellipsis group-hover:text-blue-600 transition-colors leading-tight mb-3 sm:mb-4">
                        {post.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 font-medium">{post.time}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <Separator  />

          {/* Economia Section */}
          <section>
            <div className="border-l-4 border-red-600 pl-4 sm:pl-6 mb-8 sm:mb-12">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">Economia</h2>
                <Link 
                  href="/economia" 
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 text-base sm:text-lg font-medium hover:underline transition-colors"
                >
                  Ver todos
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {economiaPosts.map((post, index) => (
                <Link key={index} href={`/${post.slug}`}>
                  <Card className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-200 dark:border-gray-800 h-full">
                    <div className="relative h-48 sm:h-52 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4 sm:p-6">
                      <div className="mb-3 sm:mb-4">
                        <span className="text-xs sm:text-sm font-semibold text-red-600 bg-red-50 px-2 sm:px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-3-no-ellipsis group-hover:text-blue-600 transition-colors leading-tight mb-3 sm:mb-4">
                        {post.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500  font-medium">{post.time}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <Separator  />

          {/* Criptomoedas Section */}
          <section>
            <div className="border-l-4 border-yellow-600 pl-4 sm:pl-6 mb-8 sm:mb-12">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">Criptomoedas</h2>
                <Link 
                  href="/criptomoedas" 
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 text-base sm:text-lg font-medium hover:underline transition-colors"
                >
                  Ver todos
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {criptomoedasPosts.map((post, index) => (
                <Link key={index} href={`/${post.slug}`}>
                  <Card className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-200 dark:border-gray-800 h-full">
                    <div className="relative h-48 sm:h-52 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4 sm:p-6">
                      <div className="mb-3 sm:mb-4">
                        <span className="text-xs sm:text-sm font-semibold text-yellow-600 bg-yellow-50 px-2 sm:px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-3-no-ellipsis group-hover:text-blue-600 transition-colors leading-tight mb-3 sm:mb-4">
                        {post.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 font-medium">{post.time}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 