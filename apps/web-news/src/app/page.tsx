import { Clock, TrendingUp, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { getAllPosts, getAllCategories, getPostsByCategory } from "@/lib/notion";
import { CategorySection } from "@/components/sections/category-section";

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

// Função helper para formatar tempo
const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    return "Há poucos minutos";
  } else if (diffInHours < 24) {
    return `Há ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `Há ${diffInDays} dia${diffInDays > 1 ? 's' : ''}`;
  }
};

export default async function HomePage() {
  // Buscar dados dinâmicos do Notion
  const [allPosts, categories] = await Promise.all([
    getAllPosts(),
    getAllCategories()
  ]);

  // Post em destaque (mais recente)
  const featuredPost = allPosts[0];
  
  // Posts para sidebar (mais lidos/recentes)
  const sidebarPosts = allPosts.slice(1, 5);

  // Buscar posts por categoria dinamicamente
  const categoryPostsPromises = categories.map(category =>
    getPostsByCategory(category, 4)
  );
  
  const categoryPosts = await Promise.all(categoryPostsPromises);

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
        {featuredPost && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {/* Featured Post */}
            <div className="lg:col-span-2">
              <Link href={`/${featuredPost.slug}`}>
                <div className="relative w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-200 dark:border-gray-800">
                  {featuredPost.coverImage ? (
                    <Image
                      src={featuredPost.coverImage}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">iAssets News</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
                    <div className="flex items-center gap-2 mb-3 sm:mb-4 text-sm text-white/80">
                      <Clock className="w-4 h-4" />
                      <span>{formatTimeAgo(featuredPost.date)}</span>
                      <span className="mx-2">•</span>
                      <span>{featuredPost.category}</span>
                    </div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                      {featuredPost.title}
                    </h1>
                    <p className="text-white/90 text-sm sm:text-base md:text-lg line-clamp-2 mb-4 sm:mb-6 lg:mb-8">
                      {featuredPost.summary}
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
                  {sidebarPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/${post.slug}`}
                      className="flex gap-3 sm:gap-4 hover:bg-gray-50 dark:hover:bg-gray-700 p-3 sm:p-4 rounded-xl transition-colors group"
                    >
                      <div className="relative w-16 h-12 sm:w-20 sm:h-16 flex-shrink-0 rounded-xl overflow-hidden">
                        {post.coverImage ? (
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                            <span className="text-gray-400 dark:text-gray-500 text-xs">
                              iA
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors leading-tight mb-1 sm:mb-2">
                          {post.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 font-medium">
                          {formatTimeAgo(post.date)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Dynamic Category Sections */}
        <div className="space-y-12 sm:space-y-14">
          {categories.map((category, index) => {
            const posts = categoryPosts[index];
            if (!posts || posts.length === 0) return null;

            return (
              <div key={category} >
                <CategorySection 
                  category={category}
                  posts={posts}
                />
                {index < categories.length - 1 && <Separator className="space-y-4" />}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
} 