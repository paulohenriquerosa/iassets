import { getAllCategories, getPostsByCategory } from "@/lib/notion";
import Link from "next/link";
import { ArrowLeft, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import { CategoryBreadcrumbs } from "@/components/seo/breadcrumbs";
import { CategoryPageClient } from "@/components/CategoryPageClient";
import { CategoryPostsExplorer } from "@/components/CategoryPostsExplorer";
import { generateCategoryMetadata, siteConfig } from "@/lib/seo";

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
  
  // Obter cor da categoria
  const categoryColor = categoryColors[matchingCategory] || categoryColors.default;
  const colorClasses = getColorClasses(categoryColor);

  // Dados estruturados para a categoria
  const categorySchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${matchingCategory} - Notícias Financeiras`,
    description: `Coleção de artigos sobre ${matchingCategory.toLowerCase()} no portal iAssets`,
    url: `${siteConfig.url}/categorias/${slug}`,
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
          item: `${siteConfig.url}/categorias/${slug}`
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

          {/* Search e visualização */}
          <CategoryPostsExplorer posts={posts} colorClasses={colorClasses} />
        </div>

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
                      href={`/categorias/${normalizeCategory(category)}`}
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