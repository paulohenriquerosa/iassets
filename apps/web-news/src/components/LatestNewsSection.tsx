import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Post } from "@/lib/notion";
import { formatSmartDate } from "@/lib/utils";

interface LatestNewsSectionProps {
  posts: Post[];
}

export function LatestNewsSection({ posts }: LatestNewsSectionProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="mb-12 sm:mb-16">
      <div className="border-l-4 border-gray-800 dark:border-gray-100 pl-4 sm:pl-6 mb-8 sm:mb-12 flex items-center justify-between">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">
          Últimas Notícias
        </h2>
        <Link
          href="/"
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 text-base sm:text-lg font-medium hover:underline transition-colors"
        >
          Ver todas
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {posts.map((post) => (
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
                    <span className="text-gray-400 dark:text-gray-500 text-sm">Sem imagem</span>
                  </div>
                )}
              </div>
              <CardContent className="p-4 sm:p-6">
                <div className="mb-2 sm:mb-3">
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100 line-clamp-3 group-hover:text-blue-600 transition-colors leading-tight mb-2 sm:mb-3">
                  {post.title}
                </h3>
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