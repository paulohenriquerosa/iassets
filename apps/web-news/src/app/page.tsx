import { Metadata } from "next";
import {
  getAllPosts,
  getAllCategories,
  getPostsByCategory,
} from "@/lib/notion";
import { CategorySection } from "@/components/sections/category-section";
import {
  HomePageClient,
  MarketTicker,
  FeaturedPost,
  Sidebar,
} from "@/components/HomePageClient";

export const metadata: Metadata = {
  title: "iAssets - Portal Líder em Notícias e Análises do Mercado Financeiro",
  description:
    "Portal #1 em notícias financeiras do Brasil. Análises exclusivas, alertas de mercado, ferramentas profissionais e educação financeira. Mais de 500mil investidores confiam em nós.",
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
    "economia brasil",
  ],
};

const marketData = [
  { symbol: "IBOV", value: "130.247", change: "+1.25%", positive: true },
  { symbol: "USD/BRL", value: "5.48", change: "-0.32%", positive: false },
  { symbol: "BTC", value: "$71.234", change: "+3.45%", positive: true },
  { symbol: "EUR/BRL", value: "5.95", change: "+0.18%", positive: true },
  { symbol: "PETR4", value: "R$ 38.42", change: "+2.1%", positive: true },
  { symbol: "VALE3", value: "R$ 65.89", change: "-1.2%", positive: false },
  { symbol: "ITUB4", value: "R$ 32.15", change: "+0.8%", positive: true },
  { symbol: "BBDC4", value: "R$ 14.67", change: "+1.5%", positive: true },
];

export default async function HomePage() {
  // Buscar dados dinâmicos do Notion
  const [allPosts, categories] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
  ]);

  // Post em destaque (mais recente)
  const featuredPost = allPosts[0];

  // Posts para sidebar (mais lidos/recentes)
  const sidebarPosts = allPosts.slice(1, 5);

  // Buscar posts por categoria dinamicamente
  const categoryPostsPromises = categories.map((category) =>
    getPostsByCategory(category, 4),
  );

  const categoryPosts = await Promise.all(categoryPostsPromises);

  return (
    <>
      {/* Componente invisível que inicializa os hooks de tracking */}
      <HomePageClient />

      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Market Data Ticker com tracking */}
        <MarketTicker marketData={marketData} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Hero Section */}
          {featuredPost && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
              {/* Featured Post com tracking */}
              <FeaturedPost post={featuredPost} />

              {/* Sidebar com tracking */}
              <Sidebar posts={sidebarPosts} />
            </div>
          )}

          {/* Dynamic Category Sections */}
          <div className="space-y-12 sm:space-y-14">
            {categories.map((category, index) => {
              const posts = categoryPosts[index];
              if (!posts || posts.length === 0) return null;

              return (
                <div key={category}>
                  <CategorySection category={category} posts={posts} />
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </>
  );
}
