import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Calendar,
  Building,
  Globe,
  DollarSign,
  BarChart3,
  LineChart,
  PieChart,
  Users,
  BookOpen,
  ChevronLeft
} from "lucide-react";
import Logo from "@/assets/logo.svg";

const indicadoresFundamentalistas = [
  { nome: "P/L", valor: "4.2", descricao: "Preço/Lucro", status: "positive" },
  { nome: "P/VP", valor: "0.9", descricao: "Preço/Valor Patrimonial", status: "positive" },
  { nome: "EV/EBITDA", valor: "3.1", descricao: "Enterprise Value/EBITDA", status: "positive" },
  { nome: "P/EBIT", valor: "3.8", descricao: "Preço/EBIT", status: "positive" },
  { nome: "ROE", valor: "21.3%", descricao: "Retorno sobre Patrimônio", status: "positive" },
  { nome: "ROIC", valor: "18.7%", descricao: "Retorno sobre Capital Investido", status: "positive" },
  { nome: "EBITDA Margin", valor: "42.1%", descricao: "Margem EBITDA", status: "positive" },
  { nome: "Margem Líquida", valor: "24.7%", descricao: "Lucratividade", status: "positive" },
  { nome: "Dividend Yield", valor: "12.5%", descricao: "Rendimento de Dividendos", status: "positive" },
  { nome: "Dívida/EBITDA", valor: "1.2", descricao: "Alavancagem", status: "neutral" },
  { nome: "Liquidez Corrente", valor: "1.8", descricao: "Liquidez de Curto Prazo", status: "positive" },
  { nome: "Giro Ativo", valor: "0.64", descricao: "Eficiência dos Ativos", status: "neutral" },
];

const dadosFinanceiros = [
  { trimestre: "3T24", receita: "147.0", lucro: "32.6", ebitda: "89.2", margem: "22.2%" },
  { trimestre: "2T24", receita: "141.8", lucro: "28.4", ebitda: "82.1", margem: "20.0%" },
  { trimestre: "1T24", receita: "138.2", lucro: "30.1", ebitda: "85.6", margem: "21.8%" },
  { trimestre: "4T23", receita: "144.6", lucro: "26.9", ebitda: "78.3", margem: "18.6%" },
];

const historicoCotacao = [
  { periodo: "1 semana", variacao: "+2.5%", status: "positive" },
  { periodo: "1 mês", variacao: "+8.7%", status: "positive" },
  { periodo: "3 meses", variacao: "+15.2%", status: "positive" },
  { periodo: "6 meses", variacao: "+22.8%", status: "positive" },
  { periodo: "1 ano", variacao: "+45.3%", status: "positive" },
  { periodo: "2 anos", variacao: "+78.9%", status: "positive" },
];

const analiseSetorial = [
  { empresa: "PETR4", valor: "38.42", pl: "4.2", dy: "12.5%", destaque: true },
  { empresa: "PETR3", valor: "36.85", pl: "4.0", dy: "12.8%" },
  { empresa: "EGIE3", valor: "42.15", pl: "8.5", dy: "8.2%" },
  { empresa: "UGPA3", valor: "28.90", pl: "6.1", dy: "9.8%" },
];

const eventosRelevantes = [
  { data: "15/12/2024", evento: "Divulgação de resultados 3T24", tipo: "financeiro" },
  { data: "20/12/2024", evento: "Ex-dividendos R$ 1.55", tipo: "provento" },
  { data: "28/12/2024", evento: "Pagamento de dividendos", tipo: "provento" },
  { data: "05/01/2025", evento: "Assembleia Geral Extraordinária", tipo: "corporativo" },
];

const proventos = [
  { tipo: "Dividendo", valor: "R$ 1.45", dataEx: "15/01/2024", dataPag: "30/01/2024", status: "pago" },
  { tipo: "JCP", valor: "R$ 0.85", dataEx: "15/02/2024", dataPag: "28/02/2024", status: "pago" },
  { tipo: "Dividendo", valor: "R$ 1.65", dataEx: "15/03/2024", dataPag: "30/03/2024", status: "pago" },
  { tipo: "Dividendo", valor: "R$ 1.55", dataEx: "15/04/2024", dataPag: "30/04/2024", status: "aprovado" },
];

const dadosEmpresa = {
  setor: "Petróleo e Gás",
  segmento: "Exploração e Refino",
  site: "www.petrobras.com.br",
  funcionarios: "45.532",
  fundacao: "1953",
  sede: "Rio de Janeiro, RJ",
  descricao: "A Petrobras é uma empresa integrada de energia, pioneira na pesquisa e no desenvolvimento de tecnologia avançada para exploração em águas profundas e ultraprofundas."
};

export default function PETR4Page() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
          <Link href="/" className="flex items-center gap-3">
            <Image src={Logo} className="size-8 dark:invert" alt="IAssets Logo" />
            <span className="text-xl font-bold">iAssets</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/ativos" className="text-primary font-medium">Ativos</Link>
            <Link href="/noticias" className="text-muted-foreground hover:text-foreground">Notícias</Link>
            <Link href="/rankings" className="text-muted-foreground hover:text-foreground">Rankings</Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <Link href="/auth/sign-in">
              <Button variant="ghost">Entrar</Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button>Conta Pro</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Navigation Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-3 max-w-7xl">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/ativos" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
              <ChevronLeft className="h-4 w-4" />
              Ativos
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium">PETR4</span>
          </div>
        </div>
      </div>

      {/* Stock Header */}
      <section className="py-8 px-4 bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-950/20 dark:to-emerald-950/20">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl">
                  P4
                </div>
                <div>
                  <h1 className="text-3xl font-bold">PETR4</h1>
                  <p className="text-lg text-muted-foreground">Petrobras PN</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">Petróleo</Badge>
                    <Badge variant="outline">Novo Mercado</Badge>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              <div className="text-right">
                <div className="text-4xl font-bold font-mono">R$ 38,42</div>
                <div className="flex items-center gap-1 text-emerald-500 justify-end">
                  <ArrowUpRight className="h-5 w-5" />
                  <span className="text-lg font-semibold">+2.5% (+R$ 0.94)</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Atualizado às 17:30
                </div>
              </div>
              
                             <div className="flex flex-col gap-2">
                 <Button size="lg" className="w-full lg:w-auto">
                   📊 Análise Completa
                 </Button>
                 <Button variant="outline" size="lg" className="w-full lg:w-auto">
                   📈 Comparar Ativos
                 </Button>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
                            {/* Price Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5" />
                    Gráfico de Preços - Últimos 12 Meses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 bg-gradient-to-r from-blue-500/5 to-emerald-500/5 rounded-lg p-6">
                    <div className="h-full flex items-end justify-between gap-2">
                      {[25, 28, 32, 29, 34, 38, 42, 39, 35, 38, 42, 38].map((height, i) => (
                        <div key={i} className="flex flex-col items-center gap-1">
                          <div
                            className="bg-gradient-to-t from-blue-500 to-emerald-500 rounded-t-sm w-8 transition-all hover:opacity-80"
                            style={{ height: `${(height / 42) * 100}%` }}
                          />
                          <span className="text-xs text-muted-foreground">
                            {new Date(2024, i).toLocaleDateString('pt-BR', { month: 'short' })}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Histórica */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Performance Histórica
                  </CardTitle>
                  <CardDescription>
                    Variação de preço em diferentes períodos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {historicoCotacao.map((item, index) => (
                      <div key={index} className="text-center p-4 border rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">{item.periodo}</div>
                        <div className={`text-lg font-bold ${item.status === 'positive' ? 'text-emerald-500' : 'text-red-500'}`}>
                          {item.variacao}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Dados Financeiros Trimestrais */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Resultados Trimestrais (em bilhões)
                  </CardTitle>
                  <CardDescription>
                    Evolução dos principais indicadores financeiros
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Trimestre</TableHead>
                        <TableHead className="text-right">Receita</TableHead>
                        <TableHead className="text-right">Lucro</TableHead>
                        <TableHead className="text-right">EBITDA</TableHead>
                        <TableHead className="text-right">Margem</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dadosFinanceiros.map((dado, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{dado.trimestre}</TableCell>
                          <TableCell className="text-right font-mono">R$ {dado.receita}B</TableCell>
                          <TableCell className="text-right font-mono">R$ {dado.lucro}B</TableCell>
                          <TableCell className="text-right font-mono">R$ {dado.ebitda}B</TableCell>
                          <TableCell className="text-right font-semibold text-emerald-500">{dado.margem}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Indicadores Fundamentalistas */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Indicadores Fundamentalistas
                  </CardTitle>
                  <CardDescription>
                    Análise dos principais múltiplos e indicadores financeiros
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {indicadoresFundamentalistas.map((indicador, index) => (
                      <div key={index} className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <div className="text-sm text-muted-foreground mb-1">{indicador.nome}</div>
                        <div className={`text-lg font-bold mb-1 ${indicador.status === 'positive' ? 'text-emerald-500' : indicador.status === 'negative' ? 'text-red-500' : 'text-muted-foreground'}`}>
                          {indicador.valor}
                        </div>
                        <div className="text-xs text-muted-foreground">{indicador.descricao}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Histórico de Proventos */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Histórico de Proventos
                  </CardTitle>
                  <CardDescription>
                    Dividendos e JCP pagos nos últimos 12 meses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Valor por Ação</TableHead>
                        <TableHead>Data Ex</TableHead>
                        <TableHead>Data Pagamento</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {proventos.map((provento, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Badge variant={provento.tipo === 'Dividendo' ? 'default' : 'secondary'}>
                              {provento.tipo}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-mono font-semibold">{provento.valor}</TableCell>
                          <TableCell>{provento.dataEx}</TableCell>
                          <TableCell>{provento.dataPag}</TableCell>
                          <TableCell>
                            <Badge variant={provento.status === 'pago' ? 'default' : 'outline'}>
                              {provento.status === 'pago' ? 'Pago' : 'Aprovado'}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Análise Setorial */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Comparação Setorial - Petróleo & Gás
                  </CardTitle>
                  <CardDescription>
                    Comparação com outras empresas do setor
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Empresa</TableHead>
                        <TableHead className="text-right">Preço</TableHead>
                        <TableHead className="text-right">P/L</TableHead>
                        <TableHead className="text-right">Dividend Yield</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {analiseSetorial.map((empresa, index) => (
                        <TableRow key={index} className={empresa.destaque ? "bg-primary/5 font-medium" : ""}>
                          <TableCell className="font-medium">
                            {empresa.empresa}
                            {empresa.destaque && <Badge variant="secondary" className="ml-2">Atual</Badge>}
                          </TableCell>
                          <TableCell className="text-right font-mono">R$ {empresa.valor}</TableCell>
                          <TableCell className="text-right font-mono">{empresa.pl}</TableCell>
                          <TableCell className="text-right font-mono text-emerald-500">{empresa.dy}</TableCell>
                          <TableCell>
                            {!empresa.destaque && (
                              <Link href={`/ativos/${empresa.empresa.toLowerCase()}`}>
                                <Button variant="ghost" size="sm">Comparar</Button>
                              </Link>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Eventos Relevantes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Agenda de Eventos
                  </CardTitle>
                  <CardDescription>
                    Próximos eventos corporativos e financeiros
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {eventosRelevantes.map((evento, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                        <div className="text-center">
                          <div className="text-sm font-semibold">
                            {new Date(evento.data).getDate()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(evento.data).toLocaleDateString('pt-BR', { month: 'short' })}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{evento.evento}</div>
                          <Badge variant="outline" className="mt-1">
                            {evento.tipo === 'financeiro' && '📊 Financeiro'}
                            {evento.tipo === 'provento' && '💰 Provento'}
                            {evento.tipo === 'corporativo' && '🏢 Corporativo'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Análise Técnica */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Indicadores Técnicos
                  </CardTitle>
                  <CardDescription>
                    Análise técnica básica do ativo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-sm text-muted-foreground">Suporte</div>
                      <div className="text-lg font-bold">R$ 35,80</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-sm text-muted-foreground">Resistência</div>
                      <div className="text-lg font-bold">R$ 42,50</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-sm text-muted-foreground">Média 20 dias</div>
                      <div className="text-lg font-bold">R$ 37,95</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-sm text-muted-foreground">Média 200 dias</div>
                      <div className="text-lg font-bold">R$ 32,15</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Cotação do Dia</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Abertura</span>
                    <span className="font-mono">R$ 37,48</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Máxima</span>
                    <span className="font-mono text-emerald-500">R$ 38,95</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mínima</span>
                    <span className="font-mono text-red-500">R$ 37,12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Volume</span>
                    <span className="font-mono">142,5M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Volume Financeiro</span>
                    <span className="font-mono">R$ 5,47B</span>
                  </div>
                </CardContent>
              </Card>

              {/* Valuation */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Valuation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Valor de Mercado</span>
                    <span className="font-mono">R$ 501B</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Enterprise Value</span>
                    <span className="font-mono">R$ 485B</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">P/L</span>
                    <span className="font-mono text-emerald-500">4.2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">P/VP</span>
                    <span className="font-mono text-emerald-500">0.9</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">EV/EBITDA</span>
                    <span className="font-mono text-emerald-500">3.1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dividend Yield</span>
                    <span className="font-mono text-emerald-500">12.5%</span>
                  </div>
                </CardContent>
              </Card>

              {/* Rentabilidade */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Rentabilidade</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ROE</span>
                    <span className="font-mono text-emerald-500">21.3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ROA</span>
                    <span className="font-mono text-emerald-500">13.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ROIC</span>
                    <span className="font-mono text-emerald-500">18.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Margem Bruta</span>
                    <span className="font-mono">68.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Margem EBITDA</span>
                    <span className="font-mono text-emerald-500">42.1%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Margem Líquida</span>
                    <span className="font-mono text-emerald-500">24.7%</span>
                  </div>
                </CardContent>
              </Card>

              {/* Endividamento */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Endividamento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dívida Bruta</span>
                    <span className="font-mono">R$ 89.2B</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dívida Líquida</span>
                    <span className="font-mono">R$ 15.8B</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dívida/EBITDA</span>
                    <span className="font-mono text-emerald-500">1.2x</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dívida/Patrimônio</span>
                    <span className="font-mono">0.18x</span>
                  </div>
                </CardContent>
              </Card>

              {/* Informações da Empresa */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Sobre a Empresa
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Setor</div>
                    <div className="font-medium">{dadosEmpresa.setor}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Segmento</div>
                    <div className="font-medium">{dadosEmpresa.segmento}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Funcionários</div>
                    <div className="font-medium">{dadosEmpresa.funcionarios}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Fundação</div>
                    <div className="font-medium">{dadosEmpresa.fundacao}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Sede</div>
                    <div className="font-medium">{dadosEmpresa.sede}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Website</div>
                    <Link href={`https://${dadosEmpresa.site}`} className="text-primary hover:underline flex items-center gap-1">
                      <Globe className="h-4 w-4" />
                      {dadosEmpresa.site}
                    </Link>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Descrição</div>
                    <p className="text-sm">{dadosEmpresa.descricao}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Ativos Relacionados */}
              <Card>
                <CardHeader>
                  <CardTitle>Ativos Relacionados</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/ativos/petr3" className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                    <div>
                      <div className="font-medium">PETR3</div>
                      <div className="text-sm text-muted-foreground">Petrobras ON</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono">R$ 36,85</div>
                      <div className="text-emerald-500 text-sm">+1.8%</div>
                    </div>
                  </Link>
                  <Link href="/ativos/vale3" className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                    <div>
                      <div className="font-medium">VALE3</div>
                      <div className="text-sm text-muted-foreground">Vale ON</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono">R$ 62,18</div>
                      <div className="text-red-500 text-sm">-1.2%</div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

            {/* Navigation Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Explore Mais Ativos
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Encontre informações detalhadas sobre milhares de ativos da bolsa brasileira
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/ativos">
              <Button size="lg">Ver Todos os Ativos</Button>
            </Link>
            <Link href="/noticias">
              <Button variant="outline" size="lg">Notícias do Mercado</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
