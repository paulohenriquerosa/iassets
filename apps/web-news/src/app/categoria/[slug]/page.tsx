import { getAllCategories, getPostsByCategory } from "@/lib/notion";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Clock, Filter, Grid, List, Search, TrendingUp, Calendar, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { generateCategoryMetadata, siteConfig } from "@/lib/seo";
import { CategoryBreadcrumbs } from "@/components/seo/breadcrumbs";
import { CategoryPageClient } from "@/components/CategoryPageClient";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Mapeamento de cores para categorias
const categoryColors: Record<string, string> = {
  'Criptomoedas': 'orange',
  'Economia': 'blue',
  'Ações': 'purple',
  'FIIs': 'green',
  'Fundos Imobiliários': 'green',
  'Mercados': 'blue',
  'Guia de Investimento': 'emerald',
  'Análises': 'red',
  'Internacional': 'indigo',
  'Tecnologia': 'cyan',
  'default': 'gray'
};

const getColorClasses = (color: string) => {
  const colorMap: Record<string, { border: string; badge: string; badgeBg: string; accent: string }> = {
    orange: {
      border: 'border-orange-600',
      badge: 'text-orange-600',
      badgeBg: 'bg-orange-50 dark:bg-orange-900/20',
      accent: 'text-orange-600'
    },
    blue: {
      border: 'border-blue-600',
      badge: 'text-blue-600',
      badgeBg: 'bg-blue-50 dark:bg-blue-900/20',
      accent: 'text-blue-600'
    },
    purple: {
      border: 'border-purple-600',
      badge: 'text-purple-600',
      badgeBg: 'bg-purple-50 dark:bg-purple-900/20',
      accent: 'text-purple-600'
    },
    green: {
      border: 'border-green-600',
      badge: 'text-green-600',
      badgeBg: 'bg-green-50 dark:bg-green-900/20',
      accent: 'text-green-600'
    },
    emerald: {
      border: 'border-emerald-600',
      badge: 'text-emerald-600',
      badgeBg: 'bg-emerald-50 dark:bg-emerald-900/20',
      accent: 'text-emerald-600'
    },
    red: {
      border: 'border-red-600',
      badge: 'text-red-600',
      badgeBg: 'bg-red-50 dark:bg-red-900/20',
      accent: 'text-red-600'
    },
    indigo: {
      border: 'border-indigo-600',
      badge: 'text-indigo-600',
      badgeBg: 'bg-indigo-50 dark:bg-indigo-900/20',
      accent: 'text-indigo-600'
    },
    cyan: {
      border: 'border-cyan-600',
      badge: 'text-cyan-600',
      badgeBg: 'bg-cyan-50 dark:bg-cyan-900/20',
      accent: 'text-cyan-600'
    },
    gray: {
      border: 'border-gray-600',
      badge: 'text-gray-600',
      badgeBg: 'bg-gray-50 dark:bg-gray-900/20',
      accent: 'text-gray-600'
    }
  };

  return colorMap[color] || colorMap.gray;
};

// Função para converter slug de volta para nome da categoria
const slugToCategory = (slug: string): string => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .replace(/Fiis/g, 'FIIs')
    .replace(/Criptomoedas/g, 'Criptomoedas');
};

// Função para normalizar nome da categoria para comparação
const normalizeCategory = (category: string): string => {
  return category
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

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

export async function generateStaticParams() {
  const categories = await getAllCategories();
  
  return categories.map((category) => ({
    slug: normalizeCategory(category),
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryName = slugToCategory(slug);
  
  // Usar a função centralizada de SEO
  const seoMetadata = generateCategoryMetadata(categoryName);
  
  // Adicionar dados específicos da página
  const posts = await getPostsByCategory(categoryName).catch(() => []);
  const totalPosts = posts.length;
  
  return {
    ...seoMetadata,
    title: `${categoryName} - Notícias e Análises | ${siteConfig.name}`,
    description: `${totalPosts} notícias e análises sobre ${categoryName.toLowerCase()}. Acompanhe as últimas tendências e insights do mercado financeiro brasileiro.`,
    other: {
      'article:section': categoryName,
      'article:tag': categoryName.toLowerCase(),
    }
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  
  // Buscar todas as categorias para encontrar a correspondente
  const categories = await getAllCategories();
  const matchingCategory = categories.find(cat => 
    normalizeCategory(cat) === slug
  );

  if (!matchingCategory) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Categoria não encontrada
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            A categoria que você está procurando não existe ou foi removida.
          </p>
          <Link href="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const posts = await getPostsByCategory(matchingCategory);
  const featuredPosts = posts.slice(0, 3);
  const otherPosts = posts.slice(3);
  
  // Obter cor da categoria
  const categoryColor = categoryColors[matchingCategory] || categoryColors.default;
  const colorClasses = getColorClasses(categoryColor);

  // Dados estruturados para a categoria
  const categorySchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${matchingCategory} - Notícias Financeiras`,
    description: `Coleção de artigos sobre ${matchingCategory.toLowerCase()} no portal iAssets`,
    url: `${siteConfig.url}/categoria/${slug}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: posts.length,
      itemListElement: posts.slice(0, 10).map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'NewsArticle',
          headline: post.title,
          url: `${siteConfig.url}/${post.slug}`,
          datePublished: post.date || post.createdTime,
          author: {
            '@type': 'Person',
            name: post.author?.name || siteConfig.author
          },
          publisher: {
            '@type': 'Organization',
            name: siteConfig.name
          }
        }
      }))
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Início',
          item: siteConfig.url
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: matchingCategory,
          item: `${siteConfig.url}/categoria/${slug}`
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Tracking da categoria */}
      <CategoryPageClient 
        categoryName={matchingCategory}
        postsCount={posts.length}
      />
      
      {/* Dados estruturados para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(categorySchema)
        }}
      />
      
      {/* Breadcrumb com SEO otimizado */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <CategoryBreadcrumbs category={matchingCategory} />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 mb-6 transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Voltar para home
          </Link>
          
          <div className={`border-l-4 ${colorClasses.border} pl-6 mb-6`}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              {matchingCategory}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {posts.length} {posts.length === 1 ? 'artigo encontrado' : 'artigos encontrados'}
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder={`Buscar em ${matchingCategory}...`}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Data
              </Button>
              <div className="flex rounded-lg border border-gray-200 dark:border-gray-700">
                <Button variant="ghost" size="sm" className="rounded-r-none border-r">
                  <Grid className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="rounded-l-none">
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {posts.length > 0 ? (
          <div className="space-y-12">
            {/* Posts em Destaque */}
            {featuredPosts.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className={`w-5 h-5 ${colorClasses.accent}`} />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Posts em Destaque
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  {featuredPosts.map((post, index) => (
                    <Link key={post.id} href={`/${post.slug}`} className={index === 0 ? "lg:col-span-2" : ""}>
                      <Card className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-200 dark:border-gray-800 h-full">
                        <div className={`relative ${index === 0 ? "h-64 lg:h-80" : "h-48"} overflow-hidden`}>
                          {post.coverImage ? (
                            <Image
                              src={post.coverImage}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                              <span className="text-gray-400 dark:text-gray-500 text-lg font-medium">
                                {matchingCategory}
                              </span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${colorClasses.badge} ${colorClasses.badgeBg} mb-2`}>
                              {post.category}
                            </span>
                            <h3 className={`font-bold text-white line-clamp-2 ${index === 0 ? "text-xl lg:text-2xl" : "text-lg"}`}>
                              {post.title}
                            </h3>
                          </div>
                        </div>
                        
                        <CardContent className="p-6">
                          <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                            {post.summary}
                          </p>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{formatTimeAgo(post.date)}</span>
                              </div>
                              {post.author && (
                                <div className="flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  <span>{post.author.name}</span>
                                </div>
                              )}
                            </div>
                            {post.tags && post.tags.length > 0 && (
                              <div className="flex items-center gap-1">
                                <Tag className="w-3 h-3" />
                                <span>{post.tags.length}</span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Separador */}
            {featuredPosts.length > 0 && otherPosts.length > 0 && <Separator />}

            {/* Todos os Posts */}
            {otherPosts.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Todos os Posts
                  </h2>
                  <span className="text-sm text-gray-500">
                    {otherPosts.length} {otherPosts.length === 1 ? 'post' : 'posts'}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {otherPosts.map((post) => (
                    <Link key={post.id} href={`/${post.slug}`}>
                      <Card className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-200 dark:border-gray-800 h-full">
                        <div className="relative h-48 overflow-hidden">
                          {post.coverImage ? (
                            <Image
                              src={post.coverImage}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                              <span className="text-gray-400 dark:text-gray-500 text-sm">
                                Sem imagem
                              </span>
                            </div>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <div className="mb-3">
                            <span className={`text-xs font-medium ${colorClasses.badge} ${colorClasses.badgeBg} px-2 py-1 rounded-full`}>
                              {post.category}
                            </span>
                          </div>
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight mb-3">
                            {post.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                            {post.summary}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{formatTimeAgo(post.date)}</span>
                            </div>
                            {post.author && (
                              <span className="text-gray-400 truncate max-w-20">
                                {post.author.name}
                              </span>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <Tag className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                Nenhum artigo encontrado
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Não há artigos publicados na categoria <strong>{matchingCategory}</strong> ainda. 
                Novos conteúdos são adicionados regularmente, então volte em breve!
              </p>
              <div className="space-y-3">
                <Link href="/">
                  <Button>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar para home
                  </Button>
                </Link>
                <p className="text-sm text-gray-500">
                  ou explore outras categorias disponíveis
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Outras Categorias Sugeridas */}
        {categories.length > 1 && (
          <section className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Explore Outras Categorias
            </h3>
            <div className="flex flex-wrap gap-3">
              {categories
                .filter(cat => cat !== matchingCategory)
                .slice(0, 8)
                .map((category) => {
                  const catColor = categoryColors[category] || categoryColors.default;
                  const catColorClasses = getColorClasses(catColor);
                  return (
                    <Link
                      key={category}
                      href={`/categoria/${normalizeCategory(category)}`}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 hover:scale-105 ${catColorClasses.badgeBg} ${catColorClasses.badge} border-current/20 hover:shadow-md`}
                    >
                      <Tag className="w-3 h-3" />
                      {category}
                    </Link>
                  );
                })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
} 