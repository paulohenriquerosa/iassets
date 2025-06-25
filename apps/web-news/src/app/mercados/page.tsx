import { Metadata } from "next";
import { MarketWidget } from "@/components/market-widget";
import { SearchFilters } from "@/components/search-filters";
import { getAllPosts, Post } from "@/lib/notion";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Eye, 
  DollarSign,
  BarChart3
} from "lucide-react";

export const metadata: Metadata = {
  title: "Mercados - Cotações e Análises em Tempo Real | iAssets",
  description: "Acompanhe as cotações do Ibovespa, dólar, bitcoin e principais ativos em tempo real. Análises e notícias do mercado financeiro.",
  keywords: ["cotações", "ibovespa", "dólar", "bitcoin", "ações", "mercado financeiro"]
};

export default async function MercadosPage() {
  // Fetch posts related to markets
  let posts: Post[] = [];
  try {
    const allPosts = await getAllPosts();
    // Filter posts related to markets (you could filter by tags or category)
    posts = allPosts.slice(0, 8); // Show latest 8 posts for demo
  } catch (err) {
    console.error("Error fetching posts:", err);
    posts = [];
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-primary" />
            Mercados Financeiros
          </h1>
          <p className="text-lg text-muted-foreground">
            Acompanhe as cotações em tempo real e as principais notícias que movem os mercados.
          </p>
        </div>

        {/* Market Widget */}
        <div className="mb-8">
          <MarketWidget />
        </div>

        {/* Search Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Buscar Notícias</h2>
          <SearchFilters 
            onSearch={(query, filters) => {
              console.log("Search:", query, filters);
              // Here you would implement the actual search logic
            }}
          />
        </div>

        {/* Market News */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Notícias dos Mercados</h2>
            <Link
              href="/todas-noticias"
              className="text-primary hover:text-primary/80 font-medium text-sm"
            >
              Ver todas →
            </Link>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {posts.map((post: Post) => (
                <article key={post.slug} className="group">
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      {post.coverImage ? (
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary/10 to-primary/5">
                          <DollarSign className="w-12 h-12 text-primary/50" />
                        </div>
                      )}
                      
                      {/* Tag */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center rounded-full bg-primary/90 text-primary-foreground px-2.5 py-0.5 text-xs font-semibold">
                            {post.tags[0]}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <Clock className="w-3 h-3" />
                        <time dateTime={post.date}>
                          {format(new Date(post.date), "dd MMM yyyy", { locale: ptBR })}
                        </time>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>1.2k</span>
                        </div>
                      </div>
                      
                      <h3 className="font-bold text-base leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        <Link href={`/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>
                      
                      {post.description && (
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                          {post.description}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs">
                            {post.author?.name?.charAt(0) || 'A'}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {post.author?.name || 'Redação'}
                          </span>
                        </div>
                        
                        <Link 
                          href={`/${post.slug}`}
                          className="text-xs text-primary hover:text-primary/80 font-medium"
                        >
                          Ler mais
                        </Link>
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
                Estamos buscando as últimas notícias dos mercados.
              </p>
            </div>
          )}
        </div>

        {/* Market Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Ações em Alta</h3>
                <p className="text-sm text-muted-foreground">Maiores valorizações</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">PETR4</span>
                <span className="text-green-600 text-sm font-medium">+3.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">VALE3</span>
                <span className="text-green-600 text-sm font-medium">+2.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">ITUB4</span>
                <span className="text-green-600 text-sm font-medium">+2.1%</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold">Ações em Baixa</h3>
                <p className="text-sm text-muted-foreground">Maiores quedas</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">MGLU3</span>
                <span className="text-red-600 text-sm font-medium">-2.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">VVAR3</span>
                <span className="text-red-600 text-sm font-medium">-1.9%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">LREN3</span>
                <span className="text-red-600 text-sm font-medium">-1.4%</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">Volume</h3>
                <p className="text-sm text-muted-foreground">Mais negociadas</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">PETR4</span>
                <span className="text-sm font-medium">R$ 2.1bi</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">VALE3</span>
                <span className="text-sm font-medium">R$ 1.8bi</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">ITUB4</span>
                <span className="text-sm font-medium">R$ 1.5bi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 