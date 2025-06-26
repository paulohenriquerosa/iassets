import { getPostBySlug, getAllPosts } from "@/lib/notion";
import { NotionContent } from "@/components/notion-renderer";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft, 
  Share2, 
  BookmarkPlus,
  Eye,
  MessageCircle,
  Tag
} from "lucide-react";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Gerar metadata dinâmica para SEO
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    
    // Verificar se é um arquivo de sistema ou ícone (não é um post)
    if (slug.includes('.') || slug.startsWith('favicon') || slug.startsWith('icon') || slug.startsWith('apple-touch')) {
      return {
        title: 'Arquivo não encontrado | iAssets',
        description: 'O arquivo solicitado não foi encontrado.',
      };
    }
    
    const post = await getPostBySlug(slug);
    
    if (!post) {
      return {
        title: 'Post não encontrado | iAssets',
        description: 'O post solicitado não foi encontrado.',
      };
    }

    const publishedDate = new Date(post.date);
    const modifiedDate = new Date(post.createdTime);

    return {
      title: `${post.title} | iAssets`,
      description: post.description || `Análise completa sobre ${post.title}. Leia mais no portal líder em notícias financeiras do Brasil.`,
      keywords: [
        ...post.tags,
        'análise financeira',
        'investimentos',
        'mercado financeiro',
        'notícias financeiras',
        'iassets'
      ],
      authors: [{ name: post.author?.name || 'Equipe iAssets' }],
      openGraph: {
        title: post.title,
        description: post.description || `Análise completa sobre ${post.title}`,
        url: `https://iassets.com.br/${post.slug}`,
        siteName: 'iAssets',
        images: [
          {
            url: post.coverImage || '/images/og-default.jpg',
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
        locale: 'pt_BR',
        type: 'article',
        publishedTime: publishedDate.toISOString(),
        modifiedTime: modifiedDate.toISOString(),
        section: post.tags[0] || 'Notícias',
        tags: post.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.description || `Análise completa sobre ${post.title}`,
        images: [post.coverImage || '/images/twitter-default.jpg'],
        creator: '@iassets_br',
      },
      alternates: {
        canonical: `https://iassets.com.br/${post.slug}`,
      },
      other: {
        'article:author': post.author?.name || 'Equipe iAssets',
        'article:published_time': publishedDate.toISOString(),
        'article:modified_time': modifiedDate.toISOString(),
        'article:section': post.tags[0] || 'Notícias',
        'article:tag': post.tags.join(', '),
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Post não encontrado | iAssets',
      description: 'O post solicitado não foi encontrado.',
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
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function PostPage({ params }: PostPageProps) {
  try {
    const { slug } = await params;
    
    // Verificar se é um arquivo de sistema ou ícone (não é um post)
    if (slug.includes('.') || slug.startsWith('favicon') || slug.startsWith('icon') || slug.startsWith('apple-touch')) {
      notFound();
    }
    
    const post = await getPostBySlug(slug);
    
    if (!post) {
      notFound();
    }

    const publishedDate = new Date(post.date);
    const readingTime = Math.ceil((post.title.length + (post.description?.length || 0)) / 200); // Estimativa simples

    // Dados estruturados para o artigo
    const articleStructuredData = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": post.title,
      "description": post.description,
      "image": [post.coverImage || "https://iassets.com.br/images/default-article.jpg"],
      "datePublished": publishedDate.toISOString(),
      "dateModified": new Date(post.createdTime).toISOString(),
      "author": {
        "@type": "Person",
        "name": post.author?.name || "Equipe iAssets",
        "url": "https://iassets.com.br/sobre"
      },
      "publisher": {
        "@type": "Organization",
        "name": "iAssets",
        "logo": {
          "@type": "ImageObject",
          "url": "https://iassets.com.br/images/logo.png",
          "width": 200,
          "height": 60
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://iassets.com.br/${post.slug}`
      },
      "articleSection": post.tags[0] || "Notícias",
      "keywords": post.tags.join(", "),
      "wordCount": post.title.length + (post.description?.length || 0), // Estimativa
      "timeRequired": `PT${readingTime}M`,
      "inLanguage": "pt-BR",
      "isAccessibleForFree": true,
      "backstory": "Análise detalhada sobre o mercado financeiro brasileiro"
    };

    const breadcrumbData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Início",
          "item": "https://iassets.com.br"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": post.tags[0] || "Notícias",
          "item": `https://iassets.com.br/categoria/${post.tags[0]?.toLowerCase() || 'noticias'}`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": post.title,
          "item": `https://iassets.com.br/${post.slug}`
        }
      ]
    };

    return (
      <>
        {/* Dados estruturados */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleStructuredData)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbData)
          }}
        />

        <article className="min-h-screen">
          {/* Breadcrumb */}
          <div className="border-b border-border bg-muted/30">
            <div className="container mx-auto px-4 py-3">
              <nav className="flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-foreground transition-colors">
                  Início
                </Link>
                <span>/</span>
                <Link 
                  href={`/categoria/${post.tags[0]?.toLowerCase() || 'noticias'}`}
                  className="hover:text-foreground transition-colors"
                >
                  {post.tags[0] || 'Notícias'}
                </Link>
                <span>/</span>
                <span className="text-foreground font-medium truncate">
                  {post.title}
                </span>
              </nav>
            </div>
          </div>

          {/* Cabeçalho do post */}
          <header className="py-8 md:py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                {/* Voltar */}
                <Link 
                  href="/" 
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar à página inicial
                </Link>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <Link 
                        key={tag}
                        href={`/categoria/${tag.toLowerCase()}`}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Título */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                  {post.title}
                </h1>

                {/* Descrição */}
                {post.description && (
                  <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                    {post.description}
                  </p>
                )}

                {/* Meta informações */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{post.author?.name || 'Equipe iAssets'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={post.date}>
                      {format(publishedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                    </time>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{readingTime} min de leitura</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>2.3k visualizações</span>
                  </div>
                </div>

                {/* Ações */}
                <div className="flex items-center gap-4 pb-8 border-b">
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                    <Share2 className="w-4 h-4" />
                    Compartilhar
                  </button>
                  <button className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
                    <BookmarkPlus className="w-4 h-4" />
                    Salvar
                  </button>
                  <button className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    Comentar
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Imagem de capa */}
          {post.coverImage && (
            <div className="mb-8">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
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
              </div>
            </div>
          )}

          {/* Conteúdo do post */}
          <div className="pb-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                                 <div className="prose prose-lg max-w-none">
                   <NotionContent recordMap={post.content} />
                 </div>
              </div>
            </div>
          </div>

          {/* Rodapé do artigo */}
          <footer className="border-t border-border bg-muted/30 py-8">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Sobre o Autor</h3>
                    <p className="text-sm text-muted-foreground">
                      {post.author?.name || 'Equipe iAssets'} - Especialista em mercado financeiro
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">Compartilhe:</span>
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </article>
      </>
    );
  } catch (error) {
    console.error('Error rendering post:', error);
    notFound();
  }
}

