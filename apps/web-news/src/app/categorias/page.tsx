import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/notion";
import { Card, CardContent } from "@/components/ui/card";
import { Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Categorias | iAssets News",
  description: "Explore todas as categorias disponíveis no iAssets News e veja quantos artigos cada uma possui.",
  alternates: {
    canonical: "https://news.iassets.com.br/categorias",
  },
};

// Helper to generate slug similar to category page logic
const toSlug = (name: string) =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();

export default async function CategoriesPage() {
  const posts = await getAllPosts();

  // Count posts per category
  const counts = posts.reduce<Record<string, number>>((acc, post) => {
    const cat = post.category || "Outros";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const categories = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Todas as Categorias
        </h1>
        {categories.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">Nenhuma categoria encontrada.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map(([category, count]) => (
              <Link key={category} href={`/categorias/${toSlug(category)}`}>
                <Card className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border hover:shadow-lg transition-shadow border-gray-200 dark:border-gray-700 h-full">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                      <Tag className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="font-semibold text-gray-900 dark:text-gray-100 leading-tight">
                        {category}
                      </h2>
                      <p className="text-sm text-gray-500">{count} {count === 1 ? "artigo" : "artigos"}</p>
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