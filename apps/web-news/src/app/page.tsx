import Link from "next/link";
import Image from "next/image";
import { getAllPosts, Post } from "@/lib/notion";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  Clock, 
  ArrowRight,
  BarChart3,
  Target,
  Bell,
  Mail,
  DollarSign,
  AlertTriangle,
  Calendar,
  TrendingUp
} from "lucide-react";
import { Metadata } from "next";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AdvancedMarketWidget } from "@/components/advanced-market-widget";

export const metadata: Metadata = {
  title: "iAssets - Portal Líder em Notícias e Análises do Mercado Financeiro",
  description: "Portal #1 em notícias financeiras do Brasil. Análises exclusivas, alertas de mercado, ferramentas profissionais e educação financeira. Mais de 500mil investidores confiam em nós.",
  keywords: [
    "notícias financeiras",
    "investimentos",
    "bolsa de valores",
    "análises de mercado",
    "ibovespa",
    "ações",
    "fundos imobiliários",
    "renda fixa",
    "criptomoedas",
    "economia brasil"
  ]
};

// Economic Calendar Data
const economicEvents = [
  {
    date: "2025-01-15",
    time: "10:00",
    event: "IPCA Dezembro",
    country: "BR",
    impact: "high",
    forecast: "4.8%",
    previous: "4.9%"
  },
  {
    date: "2025-01-16",
    time: "16:30",
    event: "Taxa de Desemprego EUA",
    country: "US",
    impact: "medium",
    forecast: "3.5%",
    previous: "3.7%"
  },
  {
    date: "2025-01-17",
    time: "14:00",
    event: "Reunião COPOM",
    country: "BR",
    impact: "high",
    forecast: "12.25%",
    previous: "11.75%"
  }
];

// Mock Post Data (caso não tenha posts do Notion)
const mockPosts = [
  {
    id: "1",
    slug: "petrobras-divindendo-extraordinario-analise",
    title: "Petrobras Anuncia Dividendo Extraordinário de R$ 2,5 Bilhões: Nossa Análise Completa",
    description: "Entenda o impacto do dividendo extraordinário da Petrobras nos investidores e como isso afeta o preço da ação. Análise técnica e fundamentalista completa.",
    status: "Published",
    date: new Date().toISOString(),
    createdTime: new Date().toISOString(),
    tags: ["Petrobras", "Dividendos", "PETR4"],
    author: { name: "Carlos Monteiro", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
    coverImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop&crop=entropy"
  },
  {
    id: "2", 
    slug: "ibovespa-dispara-3-porcento-analise-tecnica",
    title: "Ibovespa Dispara 3% em Sessão Histórica: Análise Técnica Indica Continuação da Alta",
    description: "O índice brasileiro rompeu resistência importante. Veja os níveis de suporte e resistência para os próximos dias.",
    status: "Published",
    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    createdTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    tags: ["Ibovespa", "Análise Técnica", "Bolsa"],
    author: { name: "Ana Paula Silva", avatar: "https://images.unsplash.com/photo-1494790108755-2616b9e1bbba?w=150&h=150&fit=crop&crop=face" },
    coverImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop&crop=entropy"
  },
  {
    id: "3",
    slug: "nubank-resultados-q4-acao-dispara",
    title: "Nubank Supera Expectativas no Q4 e Ação Dispara 8%: Vale a Pena Comprar?",
    description: "Fintech brasileira apresenta resultados excepcionais. Análise dos números e perspectivas para 2025.",
    status: "Published", 
    date: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    createdTime: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    tags: ["Nubank", "NUBR33", "Fintechs"],
    author: { name: "Ricardo Santos", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
    coverImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop&crop=entropy"
  },
  {
    id: "4",
    slug: "fed-ultima-alta-juros-ciclo-impactos",
    title: "Fed Sinaliza Última Alta de Juros do Ciclo: Impactos para Mercados Emergentes",
    description: "Jerome Powell indica fim do ciclo de altas. Entenda os impactos para Brasil e mercados emergentes.",
    status: "Published",
    date: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), 
    createdTime: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    tags: ["Fed", "Juros", "Mercados Emergentes"],
    author: { name: "Carlos Monteiro", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
    coverImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=400&fit=crop&crop=entropy"
  },
  {
    id: "5",
    slug: "vale-maior-alta-6-meses-recompra-acoes",
    title: "Vale Registra Maior Alta em 6 Meses Após Anúncio de Recompra de Ações",
    description: "Mineradora anuncia programa de recompra de R$ 5 bilhões. Análise do impacto nos fundamentos da empresa.",
    status: "Published",
    date: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    createdTime: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), 
    tags: ["Vale", "VALE3", "Mineração"],
    author: { name: "Ana Paula Silva", avatar: "https://images.unsplash.com/photo-1494790108755-2616b9e1bbba?w=150&h=150&fit=crop&crop=face" },
    coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&crop=entropy"
  }
];

export default async function HomePage() {
  // Fetch posts
  let posts: Post[] = [];
  
  try {
    posts = await getAllPosts();
    // Se não tiver posts do Notion, usa os dados mockup
    if (posts.length === 0) {
      posts = mockPosts;
    }
  } catch (err) {
    console.error("Error fetching posts:", err);
    // Fallback para dados mockup
    posts = mockPosts;
  }

  const featuredPost = posts[0];
  const urgentPosts = posts.slice(1, 4);
  const latestPosts = posts.slice(0, 8); // Mudando para mostrar mais posts
  const popularPosts = posts.slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main Content */}
          <main className="lg:col-span-3 space-y-8">
            
            {/* Hero Section */}
            {featuredPost && (
              <section className="relative">
                <Card className="overflow-hidden border-0 shadow-xl">
                  <div className="relative h-96 md:h-[500px]">
                    {featuredPost.coverImage ? (
                      <Image
                        src={featuredPost.coverImage}
                        alt={featuredPost.title}
                        fill
                        className="object-cover"
                        priority
                      />
                    ) : (
                      <div className="h-full bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center">
                        <DollarSign className="w-32 h-32 text-white/20" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    
                    <div className="absolute top-6 left-6">
                      <Badge className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2">
                        DESTAQUE PRINCIPAL
                      </Badge>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="max-w-4xl">
                        <h1 className="text-2xl md:text-4xl font-black text-white mb-6 leading-tight">
                          <Link href={`/${featuredPost.slug}`} className="hover:underline">
                            {featuredPost.title}
                          </Link>
                        </h1>
                        {featuredPost.description && (
                          <p className="text-xl md:text-2xl text-white/90 mb-6 leading-relaxed">
                            {featuredPost.description}
                          </p>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6 text-white/80">
                            <div className="flex items-center gap-2">
                              <Clock className="w-5 h-5" />
                              <time dateTime={featuredPost.date}>
                                {format(new Date(featuredPost.date), "dd 'de' MMMM, HH:mm", { locale: ptBR })}
                              </time>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
                              <ArrowRight className="w-5 h-5 mr-2" />
                              Ler Análise
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </section>
            )}

            {/* Urgent News */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Notícias Urgentes</h2>
                <Badge className="bg-red-100 text-red-700 border-red-200">ÚLTIMAS 2H</Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {urgentPosts.map((post, index) => (
                  <Card key={post.slug} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-red-500">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-sm flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg line-clamp-2 mb-3 hover:text-blue-600 transition-colors">
                            <Link href={`/${post.slug}`}>
                              {post.title}
                            </Link>
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-slate-600">
                            <time dateTime={post.date}>
                              {format(new Date(post.date), "HH:mm", { locale: ptBR })}
                            </time>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Ações Brasileiras */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                  Ações Brasileiras
                </h2>
                <Button variant="outline" size="sm">
                  Ver todas <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {latestPosts.slice(0, 2).map((post) => (
                  <Card key={post.slug} className="hover:shadow-lg transition-all duration-300 group">
                    <div className="flex gap-4 p-6">
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                        {post.coverImage ? (
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="h-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center">
                            <BarChart3 className="w-8 h-8 text-blue-600" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                          <Link href={`/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-slate-600 mb-3">
                          <time dateTime={post.date}>
                            {format(new Date(post.date), "dd MMM", { locale: ptBR })}
                          </time>
                        </div>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 p-0 h-auto">
                          Ler análise <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Fundos Imobiliários */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                  <Target className="w-6 h-6 text-purple-600" />
                  Fundos Imobiliários
                </h2>
                <Button variant="outline" size="sm">
                  Ver todos <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {latestPosts.slice(2, 4).map((post) => (
                  <Card key={post.slug} className="hover:shadow-lg transition-all duration-300 group">
                    <div className="flex gap-4 p-6">
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                        {post.coverImage ? (
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="h-full bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 flex items-center justify-center">
                            <Target className="w-8 h-8 text-purple-600" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg line-clamp-2 mb-2 group-hover:text-purple-600 transition-colors">
                          <Link href={`/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-slate-600 mb-3">
                          <time dateTime={post.date}>
                            {format(new Date(post.date), "dd MMM", { locale: ptBR })}
                          </time>
                        </div>
                        <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 p-0 h-auto">
                          Ler análise <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Economia e Política */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                  <DollarSign className="w-6 h-6 text-orange-600" />
                  Economia e Política
                </h2>
                <Button variant="outline" size="sm">
                  Ver todas <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {latestPosts.slice(4, 6).map((post) => (
                  <Card key={post.slug} className="hover:shadow-lg transition-all duration-300 group">
                    <div className="flex gap-4 p-6">
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                        {post.coverImage ? (
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="h-full bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-800 flex items-center justify-center">
                            <DollarSign className="w-8 h-8 text-orange-600" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg line-clamp-2 mb-2 group-hover:text-orange-600 transition-colors">
                          <Link href={`/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-slate-600 mb-3">
                          <time dateTime={post.date}>
                            {format(new Date(post.date), "dd MMM", { locale: ptBR })}
                          </time>
                        </div>
                        <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700 p-0 h-auto">
                          Ler análise <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            
            {/* Most Read */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  Mais Lidas Hoje
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {popularPosts.map((post, index) => (
                  <div key={post.slug} className="flex gap-3 group cursor-pointer">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0 ? 'bg-yellow-100 text-yellow-700' :
                      index === 1 ? 'bg-slate-100 text-slate-700' :
                      index === 2 ? 'bg-orange-100 text-orange-700' :
                      'bg-slate-50 text-slate-600'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
                        <Link href={`/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-slate-600 mt-1">
                        <time dateTime={post.date}>
                          {format(new Date(post.date), "HH:mm", { locale: ptBR })}
                        </time>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Economic Calendar */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="w-5 h-5 text-purple-500" />
                  Calendário Econômico
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {economicEvents.map((event, index) => (
                  <div key={index} className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-600">
                        {format(new Date(event.date), "dd/MM", { locale: ptBR })} • {event.time}
                      </span>
                      <div className={`w-2 h-2 rounded-full ${
                        event.impact === 'high' ? 'bg-red-500' :
                        event.impact === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`} />
                    </div>
                    <h4 className="font-semibold text-sm mb-1">{event.event}</h4>
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Prev: {event.previous}</span>
                      <span>Est: {event.forecast}</span>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4">
                  Ver Calendário Completo
                </Button>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white border-0">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">Newsletter VIP</h3>
                  <p className="text-blue-100 text-sm">
                    Análises exclusivas e alertas de oportunidades direto no seu email
                  </p>
                </div>
                
                <div className="space-y-4">
                  <Input 
                    type="email" 
                    placeholder="Seu melhor email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
                  />
                  <Button className="w-full bg-white text-blue-600 hover:bg-white/90 font-bold">
                    <Bell className="w-4 h-4 mr-2" />
                    Quero Receber Grátis
                  </Button>
                </div>
                
                <div className="text-center mt-4">
                  <p className="text-xs text-blue-100">
                    📧 +250.000 assinantes • 📈 Envios diários às 7h • 🔒 Seus dados protegidos
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Advanced Market Widget */}
            <AdvancedMarketWidget />
          </aside>
        </div>
      </div>

    </div>
  );
} 