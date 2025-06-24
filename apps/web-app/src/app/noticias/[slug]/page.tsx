import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  User,
  TrendingUp,
  Share2,
  Heart,
  MessageCircle,
  ArrowLeft,
  Calendar,
} from "lucide-react";
import Logo from "@/assets/logo.svg";
import { PublicHeader } from "@/components/public-header";

// Dados das notícias expandidos
const noticiasData = {
  "bitcoin-mantem-105-mil": {
    id: 1,
    titulo:
      "Bitcoin mantém US$ 105 mil enquanto HYPE, AAVE, BCH e OKB buscam impulsionar altcoins mais alto",
    resumo:
      "Principais criptomoedas mostram sinais de recuperação após correção, com Bitcoin consolidando acima dos $100 mil e altcoins ganhando força no mercado.",
    categoria: "Criptomoedas",
    autor: "Rafael Oliveira",
    tempo: "há 30 minutos",
    data: "15 de dezembro de 2024",
    leitura: "5 min",
    destaque: true,
    conteudo: `
      <p>O Bitcoin mantém sua posição sólida acima dos US$ 105 mil neste domingo, demonstrando resiliência em meio às flutuações do mercado cripto. A principal criptomoeda do mundo está consolidando seus ganhos após um período de alta volatilidade que levou o ativo ao novo patamar histórico.</p>

      <h2 style="font-size: 1.5em; font-weight: bold; margin: 1.5em 0 1em 0;">Cenário das Altcoins</h2>
      <p>Enquanto o Bitcoin se estabiliza, várias altcoins estão mostrando sinais promissores de recuperação. Entre as que se destacam estão:</p>
      
      <ul style="margin: 1em 0; padding-left: 2em;">
        <li style="margin: 0.5em 0;"><strong>HYPE:</strong> Com alta de 8,5% nas últimas 24 horas, o token está ganhando tração após anúncios de parcerias estratégicas</li>
        <li style="margin: 0.5em 0;"><strong>AAVE:</strong> O protocolo DeFi registra aumento de 6,2%, beneficiando-se do crescente interesse em finanças descentralizadas</li>
        <li style="margin: 0.5em 0;"><strong>Bitcoin Cash (BCH):</strong> Subindo 4,8%, mostra renovado interesse dos investidores</li>
        <li style="margin: 0.5em 0;"><strong>OKB:</strong> Token da exchange OKX avança 3,9% com volume crescente</li>
      </ul>

      <h2 style="font-size: 1.5em; font-weight: bold; margin: 1.5em 0 1em 0;">Análise Técnica</h2>
      <p>Do ponto de vista técnico, o Bitcoin está formando um padrão de consolidação entre US$ 104.000 e US$ 106.500. Os analistas apontam que uma quebra acima dos US$ 106.500 poderia abrir caminho para uma nova leg de alta em direção aos US$ 110.000.</p>

      <p>O volume de negociação permanece em níveis saudáveis, indicando interesse sustentado dos investidores institucionais e varejo. A dominância do Bitcoin está em 59,2%, mostrando que, embora as altcoins estejam ganhando força, o BTC mantém sua posição de liderança.</p>

      <h2 style="font-size: 1.5em; font-weight: bold; margin: 1.5em 0 1em 0;">Perspectivas para o Mercado</h2>
      <p>Especialistas do setor estão otimistas quanto às perspectivas de curto prazo para o mercado cripto. A aprovação de ETFs de Bitcoin em diversos países e a crescente adoção institucional continuam sendo fatores fundamentais de suporte.</p>

      <p style="font-style: italic; border-left: 4px solid #2563eb; padding-left: 1em; margin: 1.5em 0;">"Estamos vendo uma maturação do mercado cripto, com fluxos institucionais consistentes e maior estabilidade nos preços", comenta Maria Silva, analista sênior da Crypto Capital.</p>

      <h2 style="font-size: 1.5em; font-weight: bold; margin: 1.5em 0 1em 0;">Recomendações</h2>
      <p>Para investidores, o momento atual oferece oportunidades tanto em Bitcoin quanto em altcoins selecionadas. É importante manter estratégias de gestão de risco e diversificação, especialmente em um mercado que ainda apresenta alta volatilidade.</p>

      <p>O Bitcoin permanece como a base sólida para qualquer portfólio cripto, enquanto altcoins como AAVE e HYPE podem oferecer oportunidades de maior retorno para investidores com maior tolerância ao risco.</p>
    `,
  },
  "magazine-luiza-alta-8-porcento": {
    id: 2,
    titulo:
      "Magazine Luiza tem alta de 8% após resultados do Black Friday superarem expectativas",
    resumo:
      "Varejista registrou crescimento de 15% nas vendas durante o período promocional, impulsionando as ações.",
    categoria: "Varejo",
    autor: "Carolina Santos",
    tempo: "há 1 hora",
    data: "15 de dezembro de 2024",
    leitura: "4 min",
    conteudo: `
      <p>As ações da Magazine Luiza (MGLU3) dispararam 8% nesta manhã após a empresa divulgar resultados excepcionais do Black Friday 2024. A varejista registrou crescimento de 15% nas vendas durante o período promocional, superando as expectativas do mercado e dos analistas.</p>

      <h2 style="font-size: 1.5em; font-weight: bold; margin: 1.5em 0 1em 0;">Resultados do Black Friday</h2>
      <p>Os números divulgados pela Magazine Luiza mostram:</p>
      
      <ul style="margin: 1em 0; padding-left: 2em;">
        <li style="margin: 0.5em 0;">Crescimento de 15% nas vendas totais em comparação com 2023</li>
        <li style="margin: 0.5em 0;">Aumento de 22% nas vendas online</li>
        <li style="margin: 0.5em 0;">Expansão de 8% nas vendas das lojas físicas</li>
        <li style="margin: 0.5em 0;">Ticket médio cresceu 12% no período</li>
      </ul>

      <h2 style="font-size: 1.5em; font-weight: bold; margin: 1.5em 0 1em 0;">Fatores de Sucesso</h2>
      <p>O CEO da empresa, Frederico Trajano, atribuiu o sucesso a diversos fatores:</p>
      
      <p style="font-style: italic; border-left: 4px solid #2563eb; padding-left: 1em; margin: 1.5em 0;">"Nossa estratégia multicanal e os investimentos em tecnologia permitiram oferecer uma experiência superior aos clientes. Além disso, nosso mix de produtos e as parcerias estratégicas foram fundamentais para estes resultados", explicou.</p>

      <h2 style="font-size: 1.5em; font-weight: bold; margin: 1.5em 0 1em 0;">Impacto no Mercado</h2>
      <p>A reação positiva do mercado reflete a confiança renovada dos investidores na capacidade da Magazine Luiza de competir no varejo brasileiro. As ações, que vinham acumulando desvalorização de 18% no ano, agora mostram sinais de recuperação.</p>

      <p>Analistas do BTG Pactual revisaram suas projeções e elevaram o preço-alvo da ação de R$ 8,50 para R$ 10,20, mantendo recomendação de compra.</p>
    `,
  },
  "petrobras-dividendos-extraordinarios": {
    id: 3,
    titulo:
      "Petrobras anuncia dividendos extraordinários de R$ 20 bilhões para acionistas",
    resumo:
      "Empresa decide distribuir parte do caixa após trimestre com lucro recorde de R$ 32 bilhões.",
    categoria: "Energia",
    autor: "Marcos Silva",
    tempo: "há 2 horas",
    data: "15 de dezembro de 2024",
    leitura: "6 min",
    conteudo: `
      <p>A Petrobras (PETR4, PETR3) anunciou nesta manhã a distribuição de dividendos extraordinários no valor total de R$ 20 bilhões aos acionistas. A decisão foi tomada após o conselho de administração analisar os resultados excepcionais do terceiro trimestre, que registrou lucro líquido recorde de R$ 32 bilhões.</p>

      <h2 style="font-size: 1.5em; font-weight: bold; margin: 1.5em 0 1em 0;">Detalhes da Distribuição</h2>
      <p>Os dividendos extraordinários serão pagos em duas parcelas:</p>
      
      <ul style="margin: 1em 0; padding-left: 2em;">
        <li style="margin: 0.5em 0;"><strong>1ª parcela:</strong> R$ 12 bilhões em janeiro de 2025</li>
        <li style="margin: 0.5em 0;"><strong>2ª parcela:</strong> R$ 8 bilhões em março de 2025</li>
        <li style="margin: 0.5em 0;"><strong>Data-com:</strong> 20 de dezembro de 2024</li>
        <li style="margin: 0.5em 0;"><strong>Pagamento:</strong> Início em 15 de janeiro de 2025</li>
      </ul>

      <h2 style="font-size: 1.5em; font-weight: bold; margin: 1.5em 0 1em 0;">Justificativa da Empresa</h2>
      <p>Segundo o CEO da Petrobras, Jean Paul Prates, a distribuição extraordinária reflete a política de dividendos da companhia e a geração robusta de caixa operacional.</p>

      <p style="font-style: italic; border-left: 4px solid #2563eb; padding-left: 1em; margin: 1.5em 0;">"Nossos resultados excepcionais, combinados com uma posição de caixa sólida e baixo endividamento, nos permitem remunerar adequadamente nossos acionistas mantendo os investimentos necessários para o crescimento sustentável da empresa", declarou.</p>

      <h2 style="font-size: 1.5em; font-weight: bold; margin: 1.5em 0 1em 0;">Resultados do 3º Trimestre</h2>
      <p>Os números que justificaram a distribuição incluem:</p>
      
      <ul style="margin: 1em 0; padding-left: 2em;">
        <li style="margin: 0.5em 0;">Lucro líquido de R$ 32 bilhões</li>
        <li style="margin: 0.5em 0;">EBITDA de R$ 58 bilhões</li>
        <li style="margin: 0.5em 0;">Geração de caixa operacional de R$ 45 bilhões</li>
        <li style="margin: 0.5em 0;">Redução da dívida líquida para R$ 58 bilhões</li>
      </ul>

      <h2 style="font-size: 1.5em; font-weight: bold; margin: 1.5em 0 1em 0;">Reação do Mercado</h2>
      <p>As ações da Petrobras reagiram positivamente ao anúncio, com PETR4 subindo 3,2% e PETR3 avançando 3,8% no pregão matutino. O yield extraordinário representa aproximadamente 2,8% sobre o valor atual das ações.</p>

      <p>Analistas avaliam positivamente a decisão, destacando que a empresa mantém disciplina financeira enquanto remunera adequadamente os acionistas.</p>
    `,
  },
};

const noticiasRelacionadas = [
  {
    id: 4,
    titulo: "Banco Central sinaliza possível pausa no ciclo de alta da Selic",
    categoria: "Economia",
    tempo: "há 3 horas",
  },
  {
    id: 5,
    titulo: "Vale supera meta de produção de minério de ferro e ações sobem 4%",
    categoria: "Mineração",
    tempo: "há 4 horas",
  },
  {
    id: 6,
    titulo: "Ethereum atinge novo recorde histórico acima de US$ 4.800",
    categoria: "Criptomoedas",
    tempo: "há 5 horas",
  },
];

interface PageProps {
  params: {
    slug: string;
  };
}

export default function NoticiaPage({ params }: PageProps) {
  const noticia = noticiasData[params.slug as keyof typeof noticiasData];

  if (!noticia) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Notícia não encontrada</h1>
          <Link href="/noticias">
            <Button>Voltar às notícias</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <PublicHeader />

      {/* Back Navigation */}
      <section className="py-4 px-4 border-b">
        <div className="container mx-auto max-w-7xl">
          <Link
            href="/noticias"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar às notícias
          </Link>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <Badge className="mb-4">{noticia.categoria}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                {noticia.titulo}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                {noticia.resumo}
              </p>

              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-b pb-4 mb-8">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="font-medium">{noticia.autor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{noticia.data}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{noticia.leitura} de leitura</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{noticia.tempo}</span>
                </div>
              </div>

              {/* Featured Image */}
              <div className="aspect-video bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg mb-8 flex items-center justify-center">
                <TrendingUp className="h-20 w-20 text-white/80" />
              </div>

              {/* Article Body */}
              <div className="prose prose-lg max-w-none text-foreground leading-relaxed mb-8">
                <div dangerouslySetInnerHTML={{ __html: noticia.conteudo }} />
              </div>

              {/* Social Actions */}
              <div className="flex items-center gap-4 py-6 border-y mb-8">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Heart className="h-4 w-4" />
                  Curtir
                  <span className="text-muted-foreground">(127)</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  Compartilhar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  Comentários
                  <span className="text-muted-foreground">(23)</span>
                </Button>
              </div>

              {/* Author Bio */}
              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">
                        {noticia.autor}
                      </h3>
                      <p className="text-muted-foreground">
                        Jornalista especializado em mercado financeiro com mais
                        de 8 anos de experiência. Formado em Economia pela USP e
                        pós-graduado em Jornalismo Econômico pela FGV.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Related Articles */}
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  Notícias Relacionadas
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {noticiasRelacionadas.map((relatedNews) => (
                    <Card
                      key={relatedNews.id}
                      className="hover:shadow-lg transition-all hover:-translate-y-1"
                    >
                      <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
                        <TrendingUp className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <CardContent className="p-4">
                        <Badge variant="outline" className="text-xs mb-2">
                          {relatedNews.categoria}
                        </Badge>
                        <h3 className="font-bold mb-2 hover:text-primary cursor-pointer line-clamp-2">
                          {relatedNews.titulo}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {relatedNews.tempo}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
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
                </CardContent>
              </Card>

              {/* Most Read */}
              <Card>
                <CardHeader>
                  <CardTitle>Mais Lidas Hoje</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex gap-3 p-2 rounded hover:bg-muted/50 cursor-pointer">
                      <span className="text-primary font-bold text-lg flex-shrink-0">
                        1
                      </span>
                      <div>
                        <p className="text-sm font-medium line-clamp-2">
                          Bitcoin pode chegar a $150 mil em 2025, preveem
                          analistas
                        </p>
                        <p className="text-xs text-muted-foreground">
                          há 1 hora
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 p-2 rounded hover:bg-muted/50 cursor-pointer">
                      <span className="text-primary font-bold text-lg flex-shrink-0">
                        2
                      </span>
                      <div>
                        <p className="text-sm font-medium line-clamp-2">
                          Nubank lança novo produto de investimento
                        </p>
                        <p className="text-xs text-muted-foreground">
                          há 2 horas
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 p-2 rounded hover:bg-muted/50 cursor-pointer">
                      <span className="text-primary font-bold text-lg flex-shrink-0">
                        3
                      </span>
                      <div>
                        <p className="text-sm font-medium line-clamp-2">
                          Vale anuncia novo projeto de mineração
                        </p>
                        <p className="text-xs text-muted-foreground">
                          há 3 horas
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card className="bg-gradient-to-br from-primary/10 to-blue-500/10">
                <CardHeader>
                  <CardTitle>Newsletter Diária</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Receba as principais notícias do mercado todos os dias às 7h
                  </p>
                  <Button className="w-full">📧 Assinar Gratuitamente</Button>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card>
                <CardHeader>
                  <CardTitle>Links Úteis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Link
                      href="/ativos"
                      className="block p-2 rounded hover:bg-muted/50 text-sm"
                    >
                      📈 Cotações em Tempo Real
                    </Link>
                    <Link
                      href="/rankings"
                      className="block p-2 rounded hover:bg-muted/50 text-sm"
                    >
                      🏆 Rankings de Ações
                    </Link>
                    <Link
                      href="/noticias"
                      className="block p-2 rounded hover:bg-muted/50 text-sm"
                    >
                      📰 Todas as Notícias
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

