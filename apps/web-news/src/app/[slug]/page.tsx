import { getPostBySlug, getAllPosts, getPostsByCategory } from "@/lib/notion";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  MessageCircle,
  Tag,
  TrendingUp,
  ChevronRight,
  Home,
} from "lucide-react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArticleClientTracker } from "@/components/ArticleClientTracker";
import { SocialShareClient } from "@/components/SocialShareClient";
import { NewsletterWithTracking } from "@/components/newsletter-with-tracking";
import { RelatedArticlesAgent } from "@/agents/RelatedArticlesAgent";
import { unstable_cache } from "next/cache";
import { formatSmartDate } from "@/lib/utils";
import NotionContentClient from "@/components/NotionContentClient";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Helper to sanitize tag names to ASCII-safe format (must match the logic in lib/notion.ts)
const sanitizeTag = (tag: string): string =>
  tag
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9-_]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');

// Gerar metadata dinâmica para SEO
export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;

    // Verificar se é um arquivo de sistema ou ícone (não é um post)
    if (
      slug.includes(".") ||
      slug.startsWith("favicon") ||
      slug.startsWith("icon") ||
      slug.startsWith("apple-touch")
    ) {
      return {
        title: "Arquivo não encontrado | iAssets",
        description: "O arquivo solicitado não foi encontrado.",
      };
    }

    const post = await getPostBySlug(slug);

    if (!post) {
      return {
        title: "Post não encontrado | iAssets",
        description: "O post solicitado não foi encontrado.",
      };
    }

    const publishedDate = safeDate(post.date);
    const modifiedDate = safeDate(post.createdTime);

    return {
      title: `${post.title} | iAssets News`,
      description:
        post.summary ||
        `Análise completa sobre ${post.title}. Leia mais no portal líder em notícias financeiras do Brasil.`,
      keywords: [
        ...post.tags,
        "análise financeira",
        "investimentos",
        "mercado financeiro",
        "notícias financeiras",
        "iassets",
      ],
      authors: [{ name: post.author?.name || "Equipe iAssets" }],
      openGraph: {
        title: post.title,
        description: post.summary || `Análise completa sobre ${post.title}`,
        url: `https://iassets.com.br/${post.slug}`,
        siteName: "iAssets News",
        images: [
          {
            url: post.coverImage || "/images/og-default.jpg",
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
        locale: "pt_BR",
        type: "article",
        ...(publishedDate && { datePublished: publishedDate.toISOString() }),
        ...(modifiedDate && { dateModified: modifiedDate.toISOString() }),
        section: post.category || "Notícias",
        tags: post.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.summary || `Análise completa sobre ${post.title}`,
        images: [post.coverImage || "/images/twitter-default.jpg"],
        creator: "@iassets_br",
      },
      alternates: {
        canonical: `https://iassets.com.br/${post.slug}`,
      },
      other: {
        "article:author": post.author?.name || "Equipe iAssets",
        ...(publishedDate && { "article:published_time": publishedDate.toISOString() }),
        ...(modifiedDate && { "article:modified_time": modifiedDate.toISOString() }),
        "article:section": post.category || "Notícias",
        "article:tag": post.tags.join(", "),
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Post não encontrado | iAssets",
      description: "O post solicitado não foi encontrado.",
    };
  }
}

// Gerar paths estáticos para melhor SEO
export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();
    return posts.slice(0, 50).map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// util
function safeDate(dateLike: string | Date | undefined): Date | null {
  if (!dateLike) return null;
  const d = new Date(dateLike);
  return isNaN(d.getTime()) ? null : d;
}

export default async function PostPage({ params }: PostPageProps) {
  try {
    const { slug } = await params;

    // Verificar se é um arquivo de sistema ou ícone (não é um post)
    if (
      slug.includes(".") ||
      slug.startsWith("favicon") ||
      slug.startsWith("icon") ||
      slug.startsWith("apple-touch")
    ) {
      notFound();
    }

    const post = await getPostBySlug(slug);

    if (!post) {
      notFound();
    }

    const publishedDate = safeDate(post.date);
    const modifiedDate = safeDate(post.createdTime);
    const readingTime = Math.ceil((post.title.length + (post.summary?.length || 0)) / 200);

    // Buscar recomendações semânticas via Upstash Vector com cache (24h)
    let relatedPosts = [] as Awaited<ReturnType<typeof getAllPosts>>;

    try {
      const fetchRecommendations = unstable_cache(
        async () => {
          const recAgent = new RelatedArticlesAgent();
          return recAgent.recommend(post.title, post.summary || "");
        },
        ["related", slug],
        { revalidate: 86400 }, // cache 24h
      );

      const recommendations = await fetchRecommendations();

      if (recommendations.length > 0) {
        const recPosts = await Promise.all(
          recommendations.map(async ({ slug: recSlug }) => {
            const cleanSlug = recSlug.replace(/^\//, "");
            try {
              return await getPostBySlug(cleanSlug);
            } catch {
              return null;
            }
          }),
        );
        relatedPosts = recPosts.filter(Boolean) as typeof relatedPosts;
      }
    } catch (err) {
      console.error("Error fetching vector recommendations", err);
    }

    // Fallback para recomendações por categoria caso não haja resultado semântico
    if (relatedPosts.length === 0 && post.category) {
      relatedPosts = (await getPostsByCategory(post.category, 6))
        .filter((p) => p.id !== post.id)
        .slice(0, 4);
    }

    // Buscar posts recentes para sidebar
    const recentPosts = (await getAllPosts())
      .slice(0, 5)
      .filter((p) => p.id !== post.id);

    // Dados estruturados para o artigo
    const articleStructuredData = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: post.title,
      description: post.summary,
      image: [
        post.coverImage || "https://iassets.com.br/images/default-article.jpg",
      ],
      ...(publishedDate && { datePublished: publishedDate.toISOString() }),
      ...(modifiedDate && { dateModified: modifiedDate.toISOString() }),
      author: {
        "@type": "Person",
        name: post.author?.name || "Equipe iAssets",
        url: "https://iassets.com.br/sobre",
      },
      publisher: {
        "@type": "Organization",
        name: "iAssets",
        logo: {
          "@type": "ImageObject",
          url: "https://iassets.com.br/images/logo.png",
          width: 200,
          height: 60,
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://iassets.com.br/${post.slug}`,
      },
      articleSection: post.category || "Notícias",
      keywords: post.tags.join(", "),
      wordCount: post.title.length + (post.summary?.length || 0),
      timeRequired: `PT${readingTime}M`,
      inLanguage: "pt-BR",
      isAccessibleForFree: true,
    };

    const breadcrumbData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Início",
          item: "https://iassets.com.br",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: post.category || "Notícias",
          item: `https://iassets.com.br/categorias/${sanitizeTag(post.category || "noticias")}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: `https://iassets.com.br/${post.slug}`,
        },
      ],
    };

    return (
      <>
        {/* Tracking do artigo */}
        <ArticleClientTracker
          articleTitle={post.title}
          articleCategory={post.category || "Geral"}
          articleAuthor={post.author?.name}
        />

        {/* Dados estruturados */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbData),
          }}
        />

        <div className="min-h-screen bg-white dark:bg-gray-900">
          {/* Breadcrumb */}
          <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
              <nav
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                aria-label="Breadcrumb"
              >
                <Link
                  href="/"
                  className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  <Home className="w-3 h-3" />
                </Link>
                <ChevronRight className="w-3 h-3" />
                <Link
                  href="/categorias"
                  className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  Categorias
                </Link>
                <ChevronRight className="w-3 h-3" />
                <Link
                  href={`/categorias/${sanitizeTag(post.category || "noticias")}`}
                  className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  {post.category || "Notícias"}
                </Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-gray-900 dark:text-gray-100 font-medium truncate">
                  {post.title}
                </span>
              </nav>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Conteúdo Principal */}
              <main className="lg:col-span-3">
                <article>
                  {/* Header */}
                  <header className="mb-8">
                    {/* Voltar */}
                    <Link
                      href="/"
                      className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors mb-6 group"
                    >
                      <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                      Voltar à página inicial
                    </Link>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.map((tag) => (
                          <Link
                            key={tag}
                            href={`/categorias/${tag.toLowerCase()}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                          >
                            <Tag className="w-3 h-3" />
                            {tag}
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Título */}
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 dark:text-gray-100 mb-6">
                      {post.title}
                    </h1>

                    {/* Subtítulo/Resumo */}
                    {post.summary && (
                      <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                        {post.summary}
                      </p>
                    )}

                    {/* Meta informações */}
                    <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-8">
                      {post.author && (
                        <div className="flex items-center gap-3">
                          {post.author.avatar && (
                            <div className="relative w-10 h-10 rounded-full overflow-hidden">
                              <Image
                                src={post.author.avatar}
                                alt={post.author.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              <span className="font-medium text-gray-900 dark:text-gray-100">
                                {post.author.name}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={post.date} className="text-sm">
                          {formatSmartDate(post.date)}
                        </time>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">
                          {readingTime} min de leitura
                        </span>
                      </div>
                    </div>

                    {/* Ações de Compartilhamento com Tracking */}
                    <SocialShareClient
                      title={post.title}
                      url={`/${post.slug}`}
                      category={post.category || "Geral"}
                    />
                  </header>

                  {/* Imagem de capa */}
                  {post.coverImage && (
                    <div className="mb-8">
                      <div className="relative aspect-video overflow-hidden rounded-xl">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover"
                          priority
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                        />
                      </div>
                    </div>
                  )}

                  {/* Conteúdo do post */}
                  <div className="mb-8">
                    <div className="prose prose-lg max-w-none prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-gray-900 dark:prose-strong:text-gray-100">
                      <NotionContentClient recordMap={post.content} />
                    </div>
                  </div>

                  {/* Footer do artigo */}
                  <footer className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        {post.author?.avatar && (
                          <div className="relative w-16 h-16 rounded-full overflow-hidden">
                            <Image
                              src={post.author.avatar}
                              alt={post.author.name || "Autor"}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                            {post.author?.name || "Equipe iAssets"}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            Especialista em mercado financeiro e investimentos
                          </p>
                          
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Button variant="outline" className="gap-2">
                          <MessageCircle className="w-4 h-4" />
                          Comentar
                        </Button>
                        <Button className="gap-2">
                          <Share2 className="w-4 h-4" />
                          Compartilhar
                        </Button>
                      </div>
                    </div>
                  </footer>
                </article>

                {/* Posts Relacionados */}
                {relatedPosts.length > 0 && (
                  <section className="mt-12">
                    <div className="flex items-center gap-2 mb-6">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Posts Relacionados
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {relatedPosts.map((relatedPost) => (
                        <Link
                          key={relatedPost.id}
                          href={`/${relatedPost.slug}`}
                        >
                          <Card className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-200 dark:border-gray-700 h-full">
                            <div className="relative h-48 overflow-hidden">
                              {relatedPost.coverImage ? (
                                <Image
                                  src={relatedPost.coverImage}
                                  alt={relatedPost.title}
                                  fill
                                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                                  <span className="text-gray-400 dark:text-gray-500 text-sm">
                                    {relatedPost.category}
                                  </span>
                                </div>
                              )}
                            </div>
                            <CardContent className="p-4">
                              <div className="mb-2">
                                <span className="text-xs font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-full">
                                  {relatedPost.category}
                                </span>
                              </div>
                              <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight mb-2">
                                {relatedPost.title}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                                {relatedPost.summary}
                              </p>
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>{formatSmartDate(relatedPost.date)}</span>
                                {relatedPost.author && (
                                  <span>{relatedPost.author.name}</span>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}
              </main>

              {/* Sidebar */}
              <aside className="lg:col-span-1 space-y-6">
                {/* Posts Recentes */}
                <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      Posts Recentes
                    </h3>
                    <div className="space-y-4">
                      {recentPosts.map((recentPost) => (
                        <Link
                          key={recentPost.id}
                          href={`/${recentPost.slug}`}
                          className="flex gap-3 group"
                        >
                          <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                            {recentPost.coverImage ? (
                              <Image
                                src={recentPost.coverImage}
                                alt={recentPost.title}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                <span className="text-gray-400 text-xs font-medium">
                                  iA
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight mb-1">
                              {recentPost.title}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {formatSmartDate(recentPost.date)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Newsletter com Tracking */}
                <NewsletterWithTracking location="article_sidebar" variant="sidebar" />

                {/* Disclaimer */}
                <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 text-sm">
                      Aviso Legal
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                      O conteúdo apresentado neste artigo tem caráter educativo
                      e não constitui recomendação de investimento. Consulte
                      sempre um assessor financeiro qualificado.
                    </p>
                  </CardContent>
                </Card>
              </aside>
            </div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error rendering post:", error);
    notFound();
  }
}
