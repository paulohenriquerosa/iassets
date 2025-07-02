"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Grid, List, Search, Clock, User } from "lucide-react";
import type { Post } from "@/lib/notion";
import { formatSmartDate } from "@/lib/utils";

interface CategoryPostsExplorerProps {
  posts: Post[];
  colorClasses: {
    badge: string;
    badgeBg: string;
    accent: string;
  };
}

export function CategoryPostsExplorer({ posts, colorClasses }: CategoryPostsExplorerProps) {
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.summary?.toLowerCase() || "").includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }, [query, posts]);

  return (
    <div className="space-y-6">
      {/* Search + view toggle */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
        <div className="flex-1 max-w-md w-full">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar nesta categoria..."
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={view === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("grid")}
            aria-label="Ver em grade"
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={view === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("list")}
            aria-label="Ver em lista"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">Nenhum resultado.</p>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((post) => (
            <Link key={post.id} href={`/${post.slug}`}>
              <Card className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group border border-gray-200 dark:border-gray-800 h-full">
                <div className="relative h-48 overflow-hidden">
                  {post.coverImage ? (
                    <Image src={post.coverImage} alt={post.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                      <span className="text-gray-400 dark:text-gray-500 text-sm">Sem imagem</span>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="mb-2">
                    <span className={`text-xs font-medium ${colorClasses.badge} ${colorClasses.badgeBg} px-2 py-1 rounded-full`}>{post.category}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">{post.summary}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">{formatSmartDate(post.date)}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{Math.ceil((post.title.length + (post.summary?.length || 0)) / 200)} min</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <ul className="space-y-4">
          {filtered.map((post) => (
            <li key={post.id} className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:shadow-sm transition-shadow">
              <Link href={`/${post.slug}`} className="flex items-start gap-4">
                {post.coverImage && (
                  <div className="relative w-28 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">{post.summary}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className={`${colorClasses.badge}`}>{post.category}</span>
                    {post.author && (
                      <span className="flex items-center gap-1"><User className="w-3 h-3" />{post.author.name}</span>
                    )}
                    <span className="flex items-center gap-1">{formatSmartDate(post.date)}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{Math.ceil((post.title.length + (post.summary?.length || 0)) / 200)} min</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 