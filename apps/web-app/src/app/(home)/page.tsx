import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Shield,
  BarChart3,
  DollarSign,
  Coins,
  Target,
  Users,
  ArrowRight,
  CheckCircle,
  Star,
  Smartphone,
  Monitor,
  Tablet,
  Bot,
  PieChart,
  LineChart,
  BarChart2,
  Activity,
  Brain,
  Zap,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import Logo from "@/assets/logo.svg";
import { PublicHeader } from "@/components/public-header";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <PublicHeader />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl text-center">
          <Badge variant="secondary" className="mb-6">
            🚀 Mais de 10.000 investidores confiam em nós
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            A plataforma completa para <br />
            <span className="text-primary bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">
              investidores brasileiros
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            <strong>Consulta gratuita</strong> de ativos, notícias e análises do
            mercado +<strong>Gestão profissional</strong> da sua carteira com
            IA. Tudo em uma só plataforma.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/ativos">
              <Button size="lg" className="text-lg px-8 py-6">
                Explorar Ativos Grátis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Criar Conta Pro
              </Button>
            </Link>
          </div>

          {/* Dashboard Preview */}
          <div className="relative max-w-5xl mx-auto">
            <div className="rounded-lg border bg-card shadow-2xl overflow-hidden">
              <div className="bg-muted/50 px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-sm text-muted-foreground">
                  iassets.com.br
                </span>
              </div>
              <div className="p-6 bg-gradient-to-br from-background to-muted/20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Patrimônio Total
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">R$ 124.580,42</div>
                      <p className="text-xs text-emerald-500">
                        +12,5% este mês
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Proventos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">R$ 2.847,30</div>
                      <p className="text-xs text-emerald-500">
                        +8,2% vs mês anterior
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Rentabilidade
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">15,8%</div>
                      <p className="text-xs text-emerald-500">+2,1% vs CDI</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Ativos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">47</div>
                      <p className="text-xs text-muted-foreground">
                        Bem diversificado
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-24 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 rounded-lg flex items-end justify-between p-3">
                    {[40, 65, 45, 80, 60, 90].map((height, i) => (
                      <div
                        key={i}
                        className="bg-blue-500/60 rounded-t"
                        style={{ height: `${height}%`, width: "3px" }}
                      />
                    ))}
                  </div>
                  <div className="h-24 bg-gradient-to-r from-emerald-500/10 to-purple-500/10 rounded-lg flex items-center justify-center">
                    <div className="relative w-16 h-16">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-purple-500"></div>
                      <div className="absolute inset-1 rounded-full bg-background"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-semibold">47</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Public vs Premium Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-emerald-500">Área Gratuita</span> + <br />
              <span className="text-primary">Gestão Profissional</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Consulte ativos e notícias gratuitamente. Gerencie sua carteira
              com ferramentas profissionais.
            </p>
          </div>

          {/* Free Public Area */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <Badge variant="secondary" className="mb-4">
                🆓 Área Pública - Sempre Gratuita
              </Badge>
              <h3 className="text-2xl font-bold mb-4">
                Informações e Análises de Mercado
              </h3>
              <p className="text-muted-foreground">
                Acesse sem cadastro, explore livremente
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="relative overflow-hidden border-emerald-200 dark:border-emerald-800">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-emerald-500" />
                  </div>
                  <CardTitle>Cotações em Tempo Real</CardTitle>
                  <CardDescription>
                    Preços atualizados de ações, FIIs e criptomoedas
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="relative overflow-hidden border-emerald-200 dark:border-emerald-800">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                    <Activity className="h-6 w-6 text-emerald-500" />
                  </div>
                  <CardTitle>Indicadores Fundamentalistas</CardTitle>
                  <CardDescription>
                    P/L, ROE, Dividend Yield e análises técnicas
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="relative overflow-hidden border-emerald-200 dark:border-emerald-800">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-emerald-500" />
                  </div>
                  <CardTitle>Rankings e Listas</CardTitle>
                  <CardDescription>
                    Maiores altas, baixas e mais negociadas do dia
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="relative overflow-hidden border-emerald-200 dark:border-emerald-800">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                    <Monitor className="h-6 w-6 text-emerald-500" />
                  </div>
                  <CardTitle>Notícias do Mercado</CardTitle>
                  <CardDescription>
                    Últimas notícias e análises do mercado financeiro
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>

          {/* Premium Features */}
          <div>
            <div className="text-center mb-8">
              <Badge className="mb-4">💎 Área Pro - Gestão Profissional</Badge>
              <h3 className="text-2xl font-bold mb-4">
                Ferramentas Avançadas de Gestão
              </h3>
              <p className="text-muted-foreground">
                Para investidores que levam a sério seus resultados
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="relative overflow-hidden">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-blue-500" />
                  </div>
                  <CardTitle>Dashboard Completo</CardTitle>
                  <CardDescription>
                    Visualize toda sua carteira em um só lugar com gráficos
                    interativos e métricas em tempo real.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="relative overflow-hidden">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                    <DollarSign className="h-6 w-6 text-emerald-500" />
                  </div>
                  <CardTitle>Controle de Proventos</CardTitle>
                  <CardDescription>
                    Acompanhe dividendos, JCP e rendimentos com calendário de
                    pagamentos e projeções futuras.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="relative overflow-hidden">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                    <Coins className="h-6 w-6 text-purple-500" />
                  </div>
                  <CardTitle>Criptomoedas</CardTitle>
                  <CardDescription>
                    Monitore Bitcoin, Ethereum e outras cryptos com dados de
                    mercado atualizados automaticamente.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="relative overflow-hidden">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-orange-500" />
                  </div>
                  <CardTitle>Metas Financeiras</CardTitle>
                  <CardDescription>
                    Defina objetivos e acompanhe seu progresso com análises de
                    performance personalizadas.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="relative overflow-hidden">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-red-500" />
                  </div>
                  <CardTitle>Análise de Risco</CardTitle>
                  <CardDescription>
                    Avalie o risco da sua carteira com indicadores avançados e
                    recomendações de rebalanceamento.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="relative overflow-hidden">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-teal-500/10 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-teal-500" />
                  </div>
                  <CardTitle>Comparador de Ativos</CardTitle>
                  <CardDescription>
                    Compare performance entre diferentes ativos e tome decisões
                    baseadas em dados.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="relative overflow-hidden border-2 border-primary/20">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center mb-4">
                    <Bot className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="flex items-center gap-2">
                    Assistente de IA
                    <Badge variant="secondary" className="text-xs">
                      Novo!
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Seu consultor financeiro pessoal que analisa sua carteira e
                    oferece recomendações inteligentes 24/7.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="relative overflow-hidden">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4">
                    <Activity className="h-6 w-6 text-indigo-500" />
                  </div>
                  <CardTitle>Indicadores Avançados</CardTitle>
                  <CardDescription>
                    P/L, ROE, Dividend Yield, ROIC e dezenas de outros
                    indicadores fundamentalistas atualizados.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Charts & Analytics Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              🤖 Powered by AI
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Análises visuais e <br />
              <span className="text-primary">inteligência artificial</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Gráficos interativos, indicadores avançados e um assistente de IA
              que te ajuda a tomar as melhores decisões de investimento.
            </p>
          </div>

          {/* Charts Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                  <LineChart className="h-6 w-6 text-blue-500" />
                </div>
                <CardTitle>Evolução Patrimonial</CardTitle>
                <CardDescription>
                  Acompanhe o crescimento do seu patrimônio com gráficos de
                  linha interativos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-32 bg-gradient-to-r from-blue-500/10 to-blue-500/5 rounded-lg flex items-end justify-between p-4">
                  {[40, 65, 45, 80, 60, 90, 75, 95].map((height, i) => (
                    <div
                      key={i}
                      className="bg-blue-500/60 rounded-t"
                      style={{ height: `${height}%`, width: "8px" }}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                  <PieChart className="h-6 w-6 text-emerald-500" />
                </div>
                <CardTitle>Composição da Carteira</CardTitle>
                <CardDescription>
                  Visualize a distribuição dos seus ativos em gráficos de pizza
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-32 flex items-center justify-center">
                  <div className="relative w-24 h-24">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500"></div>
                    <div className="absolute inset-2 rounded-full bg-background"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-semibold">100%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                  <BarChart2 className="h-6 w-6 text-purple-500" />
                </div>
                <CardTitle>Proventos Mensais</CardTitle>
                <CardDescription>
                  Analise seus dividendos e rendimentos com gráficos de barras
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-32 bg-gradient-to-r from-purple-500/10 to-purple-500/5 rounded-lg flex items-end justify-between p-4">
                  {[30, 50, 40, 70, 45, 85, 60, 90, 75, 95, 80, 100].map(
                    (height, i) => (
                      <div
                        key={i}
                        className="bg-purple-500/60 rounded-t"
                        style={{ height: `${height}%`, width: "4px" }}
                      />
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Assistant Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Bot className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Assistente de IA</h3>
                  <p className="text-muted-foreground">
                    Seu consultor financeiro pessoal
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Brain className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <h4 className="font-semibold">Análises Inteligentes</h4>
                    <p className="text-sm text-muted-foreground">
                      Receba insights personalizados sobre sua carteira e
                      oportunidades de mercado
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageSquare className="h-5 w-5 text-emerald-500 mt-1" />
                  <div>
                    <h4 className="font-semibold">Conversas Naturais</h4>
                    <p className="text-sm text-muted-foreground">
                      Faça perguntas sobre seus investimentos em linguagem
                      natural
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-yellow-500 mt-1" />
                  <div>
                    <h4 className="font-semibold">Alertas Inteligentes</h4>
                    <p className="text-sm text-muted-foreground">
                      Receba notificações proativas sobre oportunidades e riscos
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-purple-500 mt-1" />
                  <div>
                    <h4 className="font-semibold">
                      Recomendações Personalizadas
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Sugestões de rebalanceamento e novos investimentos
                      baseadas no seu perfil
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border-0">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">
                        Assistente iAssets
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Online agora
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm">
                      Olá! Analisei sua carteira e notei que você está com 40%
                      em ações de petróleo. Que tal diversificar um pouco mais?
                    </p>
                  </div>

                  <div className="bg-blue-500 text-white rounded-lg p-3 max-w-[80%] ml-auto">
                    <p className="text-sm">Quais setores você recomendaria?</p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm">
                      Baseado no seu perfil moderado, sugiro: Tecnologia (15%),
                      Bancos (20%) e FIIs imobiliários (10%). Quer ver uma
                      simulação?
                    </p>
                  </div>

                  <div className="flex gap-2 justify-end">
                    <Button size="sm" variant="outline" className="text-xs">
                      Ver Simulação
                    </Button>
                    <Button size="sm" className="text-xs">
                      Aplicar Sugestão
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Analytics */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Análises que fazem a diferença
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ferramentas avançadas de análise que vão além do básico
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <Activity className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <CardTitle className="text-lg">Análise de Risco</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Métricas de volatilidade e correlação entre ativos
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Target className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                <CardTitle className="text-lg">Rebalanceamento</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Sugestões automáticas para otimizar sua carteira
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <BarChart3 className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <CardTitle className="text-lg">Indicadores</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  P/L, ROE, Dividend Yield e outros fundamentalistas
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <CardTitle className="text-lg">Comparação</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Compare performance com outros investidores
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl text-center">
          <h2 className="text-4xl font-bold mb-16">
            Números que falam por si só
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">
                R$ 2.5B+
              </div>
              <p className="text-muted-foreground">Em patrimônio gerenciado</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">15.8%</div>
              <p className="text-muted-foreground">Rentabilidade média anual</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10k+</div>
              <p className="text-muted-foreground">Investidores ativos</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
              <p className="text-muted-foreground">Uptime da plataforma</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              O que nossos usuários dizem
            </h2>
            <p className="text-xl text-muted-foreground">
              Mais de 10.000 investidores já transformaram sua gestão com o
              iAssets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <CardDescription>
                  &ldquo;Revolucionou como acompanho meus investimentos. A
                  interface é intuitiva e os relatórios são muito
                  detalhados.&rdquo;
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                    M
                  </div>
                  <div>
                    <p className="font-semibold">Marina Silva</p>
                    <p className="text-sm text-muted-foreground">
                      Investidora há 8 anos
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <CardDescription>
                  &ldquo;Finalmente consegui organizar minha carteira de FIIs. O
                  controle de proventos é fantástico e muito preciso.&rdquo;
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-semibold">
                    R
                  </div>
                  <div>
                    <p className="font-semibold">Ricardo Santos</p>
                    <p className="text-sm text-muted-foreground">
                      Focado em FIIs
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <CardDescription>
                  &ldquo;A análise de risco me ajudou a rebalancear minha
                  carteira. Agora tenho muito mais confiança nas minhas
                  decisões.&rdquo;
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-semibold">
                    A
                  </div>
                  <div>
                    <p className="font-semibold">Ana Costa</p>
                    <p className="text-sm text-muted-foreground">
                      Trader profissional
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Planos para todos os perfis
            </h2>
            <p className="text-xl text-muted-foreground">
              Escolha o plano ideal para sua jornada de investimentos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Básico</CardTitle>
                <div className="text-3xl font-bold">Grátis</div>
                <CardDescription>
                  Perfeito para começar a organizar seus investimentos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm">Até 10 ativos</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm">Dashboard básico</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm">Controle de proventos</span>
                </div>
                <Button className="w-full mt-6" variant="outline">
                  Começar Grátis
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                Mais Popular
              </Badge>
              <CardHeader>
                <CardTitle>Pro</CardTitle>
                <div className="text-3xl font-bold">
                  R$ 29
                  <span className="text-lg text-muted-foreground">/mês</span>
                </div>
                <CardDescription>
                  Ideal para investidores ativos que querem mais controle
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm">Ativos ilimitados</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm">Análise de risco avançada</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm">Comparador de ativos</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm">Metas financeiras</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm">Suporte prioritário</span>
                </div>
                <Button className="w-full mt-6">Assinar Pro</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <div className="text-3xl font-bold">
                  R$ 99
                  <span className="text-lg text-muted-foreground">/mês</span>
                </div>
                <CardDescription>
                  Para assessores e gestores profissionais
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm">Gestão multi-carteiras</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm">API completa</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm">Relatórios personalizados</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm">Whitelabel</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm">Suporte dedicado</span>
                </div>
                <Button className="w-full mt-6" variant="outline">
                  Falar com Vendas
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Multi-platform */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl text-center">
          <h2 className="text-4xl font-bold mb-6">Acesse de qualquer lugar</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Nossa plataforma funciona perfeitamente em todos os dispositivos.
            Gerencie seus investimentos no computador, tablet ou smartphone.
          </p>
          <div className="flex justify-center items-center gap-12">
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Monitor className="h-8 w-8 text-primary" />
              </div>
              <span className="font-semibold">Desktop</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Tablet className="h-8 w-8 text-primary" />
              </div>
              <span className="font-semibold">Tablet</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Smartphone className="h-8 w-8 text-primary" />
              </div>
              <span className="font-semibold">Mobile</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto para transformar <br />
            seus investimentos?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Junte-se a milhares de investidores que já descobriram uma forma
            mais inteligente de gerenciar seu patrimônio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="text-lg px-8 py-6">
                Começar Gratuitamente
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Falar com Especialista
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={Logo}
                  className="size-6 dark:invert"
                  alt="IAssets Logo"
                />
                <span className="text-lg font-bold">iAssets</span>
              </div>
              <p className="text-sm text-muted-foreground">
                A plataforma mais completa para gestão de investimentos no
                Brasil.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/features" className="hover:text-foreground">
                    Funcionalidades
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-foreground">
                    Preços
                  </Link>
                </li>
                <li>
                  <Link href="/demo" className="hover:text-foreground">
                    Demonstração
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="hover:text-foreground">
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-foreground">
                    Sobre
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-foreground">
                    Carreiras
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground">
                    Contato
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/help" className="hover:text-foreground">
                    Central de Ajuda
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="hover:text-foreground">
                    Segurança
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-foreground">
                    Privacidade
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-foreground">
                    Termos
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 iAssets. Todos os direitos reservados.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Política de Privacidade
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
