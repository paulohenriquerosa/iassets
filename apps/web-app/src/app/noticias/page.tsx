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
import { Clock, User, TrendingUp } from "lucide-react";
import Logo from "@/assets/logo.svg";
import { PublicHeader } from "@/components/public-header";

const noticiaDestaque = {
  id: 1,
  slug: "bitcoin-mantem-105-mil",
  titulo:
    "Bitcoin mantém US$ 105 mil enquanto HYPE, AAVE, BCH e OKB buscam impulsionar altcoins mais alto",
  resumo:
    "Principais criptomoedas mostram sinais de recuperação após correção, com Bitcoin consolidando acima dos $100 mil e altcoins ganhando força no mercado.",
  categoria: "Criptomoedas",
  autor: "Rafael Oliveira",
  tempo: "há 30 minutos",
  destaque: true,
};

const noticias = [
  {
    id: 2,
    slug: "magazine-luiza-alta-8-porcento",
    titulo:
      "Magazine Luiza tem alta de 8% após resultados do Black Friday superarem expectativas",
    resumo:
      "Varejista registrou crescimento de 15% nas vendas durante o período promocional, impulsionando as ações.",
    categoria: "Varejo",
    autor: "Carolina Santos",
    tempo: "há 1 hora",
  },
  {
    id: 3,
    slug: "petrobras-dividendos-extraordinarios",
    titulo:
      "Petrobras anuncia dividendos extraordinários de R$ 20 bilhões para acionistas",
    resumo:
      "Empresa decide distribuir parte do caixa após trimestre com lucro recorde de R$ 32 bilhões.",
    categoria: "Energia",
    autor: "Marcos Silva",
    tempo: "há 2 horas",
  },
  {
    id: 4,
    slug: "banco-central-pausa-selic",
    titulo: "Banco Central sinaliza possível pausa no ciclo de alta da Selic",
    resumo:
      "Presidente do BC indica que próximas decisões dependerão da evolução da inflação e cenário externo.",
    categoria: "Economia",
    autor: "Ana Paula Costa",
    tempo: "há 3 horas",
  },
  {
    id: 5,
    slug: "vale-supera-meta-producao",
    titulo: "Vale supera meta de produção de minério de ferro e ações sobem 4%",
    resumo:
      "Mineradora produziu 320 milhões de toneladas no ano, superando guidance de 310-320 Mt.",
    categoria: "Mineração",
    autor: "Pedro Fernandes",
    tempo: "há 4 horas",
  },
  {
    id: 6,
    slug: "ethereum-novo-recorde",
    titulo: "Ethereum atinge novo recorde histórico acima de US$ 4.800",
    resumo:
      "Segunda maior criptomoeda se beneficia do aumento do interesse institucional e atualizações da rede.",
    categoria: "Criptomoedas",
    autor: "Thiago Crypto",
    tempo: "há 5 horas",
  },
  {
    id: 7,
    slug: "xp-aquisicao-fintech",
    titulo: "XP Inc anuncia aquisição de fintech de crédito por R$ 500 milhões",
    resumo:
      "Movimento faz parte da estratégia de expansão da corretora no segmento de crédito pessoal e empresarial.",
    categoria: "Fintech",
    autor: "Luciana Tavares",
    tempo: "há 6 horas",
  },
];

const noticiasRapidas = [
  "IBOV fecha em alta de 1,8% puxado por Petrobras e bancos",
  "Dólar recua para R$ 5,42 com menor tensão geopolítica",
  "Nubank anuncia parceria estratégica com Mastercard",
  "CVM aprova novo ETF de criptomoedas da gestora brasileira",
  "Fed mantém juros e Powell sinaliza cautela para 2025",
];

export default function NoticiasPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <PublicHeader />

      {/* Top News Bar */}
      <section className="bg-primary text-primary-foreground py-2 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center gap-4 text-sm">
            <span className="font-semibold">URGENTE:</span>
            <div className="flex-1 overflow-hidden">
              <div className="animate-scroll whitespace-nowrap">
                {noticiasRapidas.join(" • ")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Header */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Portal de Notícias <span className="text-primary">iAssets</span>
            </h1>
            <p className="text-muted-foreground">
              Sua fonte confiável de informações sobre investimentos e negócios
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-12">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Featured News */}
            <div className="lg:col-span-3 space-y-8">
              {/* Destaque Principal */}
              <div className="mb-8">
                <Card className="overflow-hidden border-primary/20">
                  <div className="relative">
                    <div className="aspect-video bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                      <TrendingUp className="h-24 w-24 text-white/80" />
                    </div>
                    <Badge className="absolute top-4 left-4 bg-red-500">
                      DESTAQUE
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline">
                        {noticiaDestaque.categoria}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {noticiaDestaque.tempo}
                      </div>
                    </div>
                    <Link href={`/noticias/${noticiaDestaque.slug}`}>
                      <h2 className="text-2xl font-bold mb-3 hover:text-primary cursor-pointer">
                        {noticiaDestaque.titulo}
                      </h2>
                    </Link>
                    <p className="text-muted-foreground mb-4">
                      {noticiaDestaque.resumo}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      {noticiaDestaque.autor}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Grid de Notícias */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Últimas Notícias</h2>
                  <div className="flex gap-2">
                    <Badge variant="secondary">Ao vivo</Badge>
                    <Badge variant="outline">Atualizado agora</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {noticias.map((noticia) => (
                    <Link key={noticia.id} href={`/noticias/${noticia.slug}`}>
                      <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
                        <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
                          <TrendingUp className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {noticia.categoria}
                            </Badge>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {noticia.tempo}
                            </div>
                          </div>
                          <h3 className="font-bold mb-2 hover:text-primary cursor-pointer line-clamp-2">
                            {noticia.titulo}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {noticia.resumo}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <User className="h-3 w-3" />
                            {noticia.autor}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Market Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Mercado Ao Vivo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-2 rounded hover:bg-muted/50">
                    <span className="font-medium">Ibovespa</span>
                    <div className="text-right">
                      <div className="font-mono text-sm">128.547</div>
                      <div className="text-emerald-500 text-xs">+1.8%</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded hover:bg-muted/50">
                    <span className="font-medium">S&P 500</span>
                    <div className="text-right">
                      <div className="font-mono text-sm">4.712</div>
                      <div className="text-emerald-500 text-xs">+0.8%</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded hover:bg-muted/50">
                    <span className="font-medium">Dólar</span>
                    <div className="text-right">
                      <div className="font-mono text-sm">R$ 5,42</div>
                      <div className="text-red-500 text-xs">-0.3%</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded hover:bg-muted/50">
                    <span className="font-medium">Bitcoin</span>
                    <div className="text-right">
                      <div className="font-mono text-sm">$105.420</div>
                      <div className="text-emerald-500 text-xs">+3.2%</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded hover:bg-muted/50">
                    <span className="font-medium">Ethereum</span>
                    <div className="text-right">
                      <div className="font-mono text-sm">$4.850</div>
                      <div className="text-emerald-500 text-xs">+4.1%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Most Read */}
              <Card>
                <CardHeader>
                  <CardTitle>Mais Lidas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Link
                      href="/noticias/bitcoin-mantem-105-mil"
                      className="flex gap-3 p-2 rounded hover:bg-muted/50 cursor-pointer"
                    >
                      <span className="text-primary font-bold text-lg">1</span>
                      <div>
                        <p className="text-sm font-medium line-clamp-2">
                          Bitcoin pode chegar a $150 mil em 2025, preveem
                          analistas
                        </p>
                        <p className="text-xs text-muted-foreground">
                          há 1 hora
                        </p>
                      </div>
                    </Link>
                    <Link
                      href="/noticias/magazine-luiza-alta-8-porcento"
                      className="flex gap-3 p-2 rounded hover:bg-muted/50 cursor-pointer"
                    >
                      <span className="text-primary font-bold text-lg">2</span>
                      <div>
                        <p className="text-sm font-medium line-clamp-2">
                          Nubank lança novo produto de investimento
                        </p>
                        <p className="text-xs text-muted-foreground">
                          há 2 horas
                        </p>
                      </div>
                    </Link>
                    <Link
                      href="/noticias/petrobras-dividendos-extraordinarios"
                      className="flex gap-3 p-2 rounded hover:bg-muted/50 cursor-pointer"
                    >
                      <span className="text-primary font-bold text-lg">3</span>
                      <div>
                        <p className="text-sm font-medium line-clamp-2">
                          Vale anuncia novo projeto de mineração
                        </p>
                        <p className="text-xs text-muted-foreground">
                          há 3 horas
                        </p>
                      </div>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle>Categorias</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between p-2 rounded hover:bg-muted/50 cursor-pointer">
                      <span className="text-sm">📈 Ações</span>
                      <span className="text-muted-foreground text-xs">124</span>
                    </div>
                    <div className="flex justify-between p-2 rounded hover:bg-muted/50 cursor-pointer">
                      <span className="text-sm">₿ Criptomoedas</span>
                      <span className="text-muted-foreground text-xs">89</span>
                    </div>
                    <div className="flex justify-between p-2 rounded hover:bg-muted/50 cursor-pointer">
                      <span className="text-sm">🏦 Bancos</span>
                      <span className="text-muted-foreground text-xs">67</span>
                    </div>
                    <div className="flex justify-between p-2 rounded hover:bg-muted/50 cursor-pointer">
                      <span className="text-sm">🏢 FIIs</span>
                      <span className="text-muted-foreground text-xs">45</span>
                    </div>
                    <div className="flex justify-between p-2 rounded hover:bg-muted/50 cursor-pointer">
                      <span className="text-sm">📊 Economia</span>
                      <span className="text-muted-foreground text-xs">156</span>
                    </div>
                    <div className="flex justify-between p-2 rounded hover:bg-muted/50 cursor-pointer">
                      <span className="text-sm">💼 Negócios</span>
                      <span className="text-muted-foreground text-xs">98</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card className="bg-gradient-to-br from-primary/10 to-blue-500/10">
                <CardHeader>
                  <CardTitle>Newsletter Diária</CardTitle>
                  <CardDescription>
                    Receba as principais notícias do mercado todos os dias às 7h
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">📧 Assinar Gratuitamente</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Sections */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Explore Mais Conteúdo
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Cotações</h3>
                <p className="text-muted-foreground mb-4">
                  Acompanhe preços em tempo real de ações, FIIs e criptomoedas
                </p>
                <Link href="/ativos">
                  <Button variant="outline">Ver Cotações</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <User className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Conta Pro</h3>
                <p className="text-muted-foreground mb-4">
                  Análises exclusivas, alertas e assistente de IA personalizado
                </p>
                <Link href="/auth/sign-up">
                  <Button>Criar Conta</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Newsletter</h3>
                <p className="text-muted-foreground mb-4">
                  Resumo diário das principais notícias do mercado financeiro
                </p>
                <Button variant="outline">Assinar Grátis</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

