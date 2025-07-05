import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Post } from "@/lib/notion";
import { formatSmartDate } from "@/lib/utils";

interface CategorySectionProps {
  category: string;
  posts: Post[];
  color?: string;
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
  const colorMap: Record<string, { border: string; badge: string; badgeBg: string }> = {
    orange: {
      border: 'border-orange-600',
      badge: 'text-orange-600',
      badgeBg: 'bg-orange-50'
    },
    blue: {
      border: 'border-blue-600',
      badge: 'text-blue-600',
      badgeBg: 'bg-blue-50'
    },
    purple: {
      border: 'border-purple-600',
      badge: 'text-purple-600',
      badgeBg: 'bg-purple-50'
    },
    green: {
      border: 'border-green-600',
      badge: 'text-green-600',
      badgeBg: 'bg-green-50'
    },
    emerald: {
      border: 'border-emerald-600',
      badge: 'text-emerald-600',
      badgeBg: 'bg-emerald-50'
    },
    red: {
      border: 'border-red-600',
      badge: 'text-red-600',
      badgeBg: 'bg-red-50'
    },
    indigo: {
      border: 'border-indigo-600',
      badge: 'text-indigo-600',
      badgeBg: 'bg-indigo-50'
    },
    cyan: {
      border: 'border-cyan-600',
      badge: 'text-cyan-600',
      badgeBg: 'bg-cyan-50'
    },
    gray: {
      border: 'border-gray-600',
      badge: 'text-gray-600',
      badgeBg: 'bg-gray-50'
    }
  };

  return colorMap[color] || colorMap.gray;
};


const createCategorySlug = (category: string): string => {
  return category
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

export function CategorySection({ category, posts, color }: CategorySectionProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  const categoryColor = color || categoryColors[category] || categoryColors.default;
  const colorClasses = getColorClasses(categoryColor);
  const categorySlug = createCategorySlug(category);

  return (
    <section>
      <div className={`border-l-4 ${colorClasses.border} pl-4 sm:pl-6 mb-8 sm:mb-12`}>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">
            {category}
          </h2>
          <Link 
            href={`/categorias/${categorySlug}`}
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 text-base sm:text-lg font-medium hover:underline transition-colors"
          >
            Ver todos
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
        {/* Destaque do primeiro post */}
        {posts[0] && (
          <Link key={posts[0].id} href={`/${posts[0].slug}`} className="md:col-span-2">
            <Card className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-200 dark:border-gray-800 h-full">
              <div className="relative h-64 sm:h-72 overflow-hidden">
                {posts[0].coverImage ? (
                  <Image
                    src={posts[0].coverImage}
                    alt={posts[0].title}
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
              <CardContent className="p-4 sm:p-6">
                <div className="mb-3 sm:mb-4">
                  <span className={`text-xs sm:text-sm font-semibold ${colorClasses.badge} ${colorClasses.badgeBg} px-2 sm:px-3 py-1 rounded-full`}>
                    {posts[0].category}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 line-clamp-3 group-hover:text-blue-600 transition-colors leading-tight mb-3 sm:mb-4">
                  {posts[0].title}
                </h3>
                <p className="hidden md:block text-sm sm:text-base text-gray-600 dark:text-gray-400 line-clamp-3 mb-3">
                  {posts[0].summary}
                </p>
                <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
                  <span className="font-medium">{formatSmartDate(posts[0].date)}</span>
                  {posts[0].author && (
                    <span className="text-gray-400">{posts[0].author.name}</span>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        )}

        {/* Demais posts da seção */}
        {posts.slice(1, 7).map((post) => (
          <Link key={post.id} href={`/${post.slug}`}>
            <Card className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-200 dark:border-gray-800 h-full">
              <div className="relative h-44 sm:h-48 overflow-hidden">
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
              <CardContent className="p-4 sm:p-6">
                <div className="mb-2 sm:mb-3">
                  <span className={`text-xs font-semibold ${colorClasses.badge} ${colorClasses.badgeBg} px-2 py-1 rounded-full`}>
                    {post.category}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100 line-clamp-3 group-hover:text-blue-600 transition-colors leading-tight mb-1 sm:mb-2">
                  {post.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-6 mb-2">
                  {post.summary}
                </p>
                <div className="text-xs text-gray-500">
                  {formatSmartDate(post.date)}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
} 