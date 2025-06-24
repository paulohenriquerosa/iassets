import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  TrendingUp,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
} from "lucide-react";
import { PublicHeader } from "@/components/public-header";

const stocksData = [
  {
    symbol: "PETR4",
    name: "Petrobras PN",
    price: 38.42,
    change: 2.5,
    sector: "Petróleo",
    volume: "142.5M",
    marketCap: "501B",
  },
  {
    symbol: "VALE3",
    name: "Vale ON",
    price: 62.18,
    change: -1.2,
    sector: "Mineração",
    volume: "89.3M",
    marketCap: "312B",
  },
  {
    symbol: "ITUB4",
    name: "Itaú Unibanco PN",
    price: 33.85,
    change: 0.8,
    sector: "Bancos",
    volume: "67.2M",
    marketCap: "289B",
  },
  {
    symbol: "BBDC4",
    name: "Bradesco PN",
    price: 14.92,
    change: -0.5,
    sector: "Bancos",
    volume: "45.8M",
    marketCap: "142B",
  },
  {
    symbol: "WEGE3",
    name: "WEG SA",
    price: 52.34,
    change: 1.8,
    sector: "Bens Industriais",
    volume: "23.1M",
    marketCap: "98B",
  },
  {
    symbol: "MGLU3",
    name: "Magazine Luiza",
    price: 8.45,
    change: -3.2,
    sector: "Varejo",
    volume: "78.4M",
    marketCap: "15B",
  },
];

const fiisData = [
  {
    symbol: "HGLG11",
    name: "Cshg Logística FII",
    price: 159.5,
    change: 0.8,
    dy: "0.75%",
    segment: "Logístico",
    liquidity: "Alta",
  },
  {
    symbol: "XPML11",
    name: "XP Malls FII",
    price: 9.85,
    change: -0.3,
    dy: "0.82%",
    segment: "Shopping",
    liquidity: "Alta",
  },
  {
    symbol: "MXRF11",
    name: "Maxi Renda FII",
    price: 10.12,
    change: 0.5,
    dy: "0.89%",
    segment: "Híbrido",
    liquidity: "Média",
  },
  {
    symbol: "KNRI11",
    name: "Kinea Renda Imob",
    price: 86.9,
    change: -0.2,
    dy: "0.68%",
    segment: "Corporativo",
    liquidity: "Alta",
  },
];

const cryptoData = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: 258420.5,
    change: 3.2,
    marketCap: "5.1T",
    volume24h: "42.8B",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    price: 12850.75,
    change: -1.8,
    marketCap: "1.5T",
    volume24h: "18.5B",
  },
  {
    symbol: "SOL",
    name: "Solana",
    price: 145.8,
    change: 5.2,
    marketCap: "68B",
    volume24h: "2.8B",
  },
];

export default function AtivosPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <PublicHeader />

      {/* Hero Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-950/20 dark:to-emerald-950/20">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Explore <span className="text-primary">Ativos</span> do Mercado
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Consulte cotações, indicadores e análises em tempo real -
              Totalmente gratuito
            </p>

            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Pesquisar ações, FIIs ou criptomoedas (ex: PETR4, HGLG11, BTC)"
                  className="pl-10 pr-4 py-6 text-lg"
                />
                <Button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  Buscar
                </Button>
              </div>
            </div>
          </div>

          {/* Market Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Ibovespa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">128.547</div>
                <div className="flex items-center gap-1 text-emerald-500">
                  <ArrowUpRight className="h-4 w-4" />
                  <span className="text-sm">+1.8%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Dólar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 5,42</div>
                <div className="flex items-center gap-1 text-red-500">
                  <ArrowDownRight className="h-4 w-4" />
                  <span className="text-sm">-0.3%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">CDI</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">11,25%</div>
                <div className="text-sm text-muted-foreground">Taxa Selic</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Bitcoin</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 258.420</div>
                <div className="flex items-center gap-1 text-emerald-500">
                  <ArrowUpRight className="h-4 w-4" />
                  <span className="text-sm">+3.2%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <Tabs defaultValue="acoes" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="acoes">Ações</TabsTrigger>
              <TabsTrigger value="fiis">FIIs</TabsTrigger>
              <TabsTrigger value="crypto">Crypto</TabsTrigger>
            </TabsList>

            {/* Ações Tab */}
            <TabsContent value="acoes" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Ações Brasileiras</h2>
                  <p className="text-muted-foreground">
                    Principais papéis da bolsa brasileira
                  </p>
                </div>
                <Badge variant="secondary">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Atualizado agora
                </Badge>
              </div>

              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ativo</TableHead>
                      <TableHead>Setor</TableHead>
                      <TableHead className="text-right">Preço</TableHead>
                      <TableHead className="text-right">Variação</TableHead>
                      <TableHead className="text-right">Volume</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stocksData.map((stock) => (
                      <TableRow
                        key={stock.symbol}
                        className="hover:bg-muted/50"
                      >
                        <TableCell>
                          <div>
                            <div className="font-semibold">{stock.symbol}</div>
                            <div className="text-sm text-muted-foreground">
                              {stock.name}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{stock.sector}</Badge>
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          R$ {stock.price.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div
                            className={`flex items-center justify-end gap-1 ${stock.change >= 0 ? "text-emerald-500" : "text-red-500"}`}
                          >
                            {stock.change >= 0 ? (
                              <ArrowUpRight className="h-4 w-4" />
                            ) : (
                              <ArrowDownRight className="h-4 w-4" />
                            )}
                            {stock.change >= 0 ? "+" : ""}
                            {stock.change.toFixed(1)}%
                          </div>
                        </TableCell>
                        <TableCell className="text-right text-sm text-muted-foreground">
                          {stock.volume}
                        </TableCell>
                        <TableCell>
                          <Link href={`/ativos/${stock.symbol.toLowerCase()}`}>
                            <Button variant="ghost" size="sm">
                              Ver mais
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            {/* FIIs Tab */}
            <TabsContent value="fiis" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Fundos Imobiliários</h2>
                  <p className="text-muted-foreground">
                    FIIs com foco em renda passiva
                  </p>
                </div>
                <Badge variant="secondary">
                  <DollarSign className="h-4 w-4 mr-1" />
                  Dividend Yield
                </Badge>
              </div>

              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>FII</TableHead>
                      <TableHead>Segmento</TableHead>
                      <TableHead className="text-right">Preço</TableHead>
                      <TableHead className="text-right">Variação</TableHead>
                      <TableHead className="text-right">DY (mês)</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fiisData.map((fii) => (
                      <TableRow key={fii.symbol} className="hover:bg-muted/50">
                        <TableCell>
                          <div>
                            <div className="font-semibold">{fii.symbol}</div>
                            <div className="text-sm text-muted-foreground">
                              {fii.name}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{fii.segment}</Badge>
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          R$ {fii.price.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div
                            className={`flex items-center justify-end gap-1 ${fii.change >= 0 ? "text-emerald-500" : "text-red-500"}`}
                          >
                            {fii.change >= 0 ? (
                              <ArrowUpRight className="h-4 w-4" />
                            ) : (
                              <ArrowDownRight className="h-4 w-4" />
                            )}
                            {fii.change >= 0 ? "+" : ""}
                            {fii.change.toFixed(1)}%
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-semibold text-emerald-500">
                          {fii.dy}
                        </TableCell>
                        <TableCell>
                          <Link href={`/ativos/${fii.symbol.toLowerCase()}`}>
                            <Button variant="ghost" size="sm">
                              Ver mais
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            {/* Crypto Tab */}
            <TabsContent value="crypto" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Criptomoedas</h2>
                  <p className="text-muted-foreground">
                    Principais cryptos do mercado
                  </p>
                </div>
                <Badge variant="secondary">
                  <BarChart3 className="h-4 w-4 mr-1" />
                  24h Volume
                </Badge>
              </div>

              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Crypto</TableHead>
                      <TableHead className="text-right">Preço (BRL)</TableHead>
                      <TableHead className="text-right">Variação 24h</TableHead>
                      <TableHead className="text-right">Volume 24h</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cryptoData.map((crypto) => (
                      <TableRow
                        key={crypto.symbol}
                        className="hover:bg-muted/50"
                      >
                        <TableCell>
                          <div>
                            <div className="font-semibold">{crypto.symbol}</div>
                            <div className="text-sm text-muted-foreground">
                              {crypto.name}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          R${" "}
                          {crypto.price.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}
                        </TableCell>
                        <TableCell className="text-right">
                          <div
                            className={`flex items-center justify-end gap-1 ${crypto.change >= 0 ? "text-emerald-500" : "text-red-500"}`}
                          >
                            {crypto.change >= 0 ? (
                              <ArrowUpRight className="h-4 w-4" />
                            ) : (
                              <ArrowDownRight className="h-4 w-4" />
                            )}
                            {crypto.change >= 0 ? "+" : ""}
                            {crypto.change.toFixed(1)}%
                          </div>
                        </TableCell>
                        <TableCell className="text-right text-sm text-muted-foreground">
                          R$ {crypto.volume24h}
                        </TableCell>
                        <TableCell>
                          <Link href={`/ativos/${crypto.symbol.toLowerCase()}`}>
                            <Button variant="ghost" size="sm">
                              Ver mais
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Rankings Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Rankings e Destaques do Mercado
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Maiores Altas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-500">
                  <ArrowUpRight className="h-5 w-5" />
                  Maiores Altas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">MGLU3</span>
                    <span className="text-emerald-500 font-mono">+8.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">WEGE3</span>
                    <span className="text-emerald-500 font-mono">+6.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">PETR4</span>
                    <span className="text-emerald-500 font-mono">+5.8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Maiores Baixas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-500">
                  <ArrowDownRight className="h-5 w-5" />
                  Maiores Baixas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">VALE3</span>
                    <span className="text-red-500 font-mono">-3.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">BBDC4</span>
                    <span className="text-red-500 font-mono">-2.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">ABEV3</span>
                    <span className="text-red-500 font-mono">-1.9%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mais Negociadas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-500">
                  <BarChart3 className="h-5 w-5" />
                  Mais Negociadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">PETR4</span>
                    <span className="text-muted-foreground text-sm">
                      R$ 2.1B
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">VALE3</span>
                    <span className="text-muted-foreground text-sm">
                      R$ 1.8B
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">ITUB4</span>
                    <span className="text-muted-foreground text-sm">
                      R$ 1.2B
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

