import { Metadata } from "next";
import {
  getAllPosts,
  getAllCategories,
  getPostsByCategory,
} from "@/lib/notion";
import { CategorySection } from "@/components/sections/category-section";
import { LatestNewsSection } from "@/components/LatestNewsSection";
import { NewsletterCTA } from "@/components/NewsletterCTA";
import {
  HomePageClient,
  MarketTicker,
  FeaturedPost,
  Sidebar,
} from "@/components/HomePageClient";
import { fetchMarketData } from "@/lib/market";

export const metadata: Metadata = {
  title: "iAssets News - Portal Líder em Notícias e Análises do Mercado Financeiro",
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

export default async function HomePage() {
  // Buscar dados dinâmicos do Notion
  const [allPosts, categories, marketData] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
    fetchMarketData(),
  ]);

  // Post em destaque (mais recente)
  const featuredPost = allPosts[0];

  // Posts para sidebar (mais lidos/recentes)
  const sidebarPosts = allPosts.slice(1, 5);

  // Últimas notícias (exclui featured + sidebar)
  const latestPosts = allPosts.slice(5, 13);

  // Buscar posts por categoria dinamicamente
  const categoryPostsPromises = categories.map((category) =>
    getPostsByCategory(category, 7),
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

          {/* Últimas Notícias */}
          <LatestNewsSection posts={latestPosts} />

          {/* CTA Newsletter */}
          <NewsletterCTA />

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
