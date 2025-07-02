import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { format as formatDate } from "date-fns";
import { ptBR } from "date-fns/locale";
import { SemanticSearchAgent } from "@/agents/SemanticSearchAgent";
import { getPostBySlug, type Post } from "@/lib/notion";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Resultado da busca | iAssets News",
  description: "Resultado de pesquisa de notícias no iAssets News.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://news.iassets.com.br/busca",
  },
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  let results: Array<Awaited<ReturnType<typeof getPostBySlug>> | Post> = [];

  if (query) {
    const searchAgent = new SemanticSearchAgent();
    const matches = await searchAgent.search(query, 50, 0.3);

    const posts = await Promise.all(
      matches.map(async (m) => {
        if (!m.slug) return null;
        const slug = m.slug.replace(/^\//, "");
        try {
          return await getPostBySlug(slug);
        } catch {
          return null;
        }
      }),
    );

    results = posts.filter(Boolean) as typeof results;

    // Fallback: busca simples por palavra em título/resumo se nada foi encontrado
    if (results.length === 0) {
      const all = await (await import("@/lib/notion")).getAllPosts();
      results = all.filter(
        (p) => p.title.toLowerCase().includes(query.toLowerCase()) || p.summary.toLowerCase().includes(query.toLowerCase()),
      );
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          Resultado da busca
        </h1>
        {query && (
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Termo pesquisado: <span className="font-medium">{query}</span>
          </p>
        )}

        {results.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">Nenhum resultado encontrado.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((post) => (
              <Link key={post.id} href={`/${post.slug}`}>
                <Card className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-200 dark:border-gray-700 h-full">
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
                          {post.category}
                        </span>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2">
                      <span className="text-xs font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight mb-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                      {post.summary}
                    </p>
                    <div className="text-xs text-gray-500">
                      {formatDate(new Date(post.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 