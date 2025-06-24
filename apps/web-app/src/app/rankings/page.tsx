import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp, BarChart3 } from "lucide-react";
import { PublicHeader } from "@/components/public-header";

const maioresAltas = [
  {
    position: 1,
    symbol: "MGLU3",
    name: "Magazine Luiza",
    price: 8.45,
    change: 12.8,
  },
  { position: 2, symbol: "WEGE3", name: "WEG SA", price: 52.34, change: 8.7 },
  {
    position: 3,
    symbol: "PETR4",
    name: "Petrobras PN",
    price: 38.42,
    change: 7.2,
  },
  {
    position: 4,
    symbol: "ITUB4",
    name: "Itaú Unibanco",
    price: 33.85,
    change: 6.8,
  },
  {
    position: 5,
    symbol: "BBDC4",
    name: "Bradesco PN",
    price: 14.92,
    change: 5.5,
  },
];

const maisNegociadas = [
  {
    position: 1,
    symbol: "PETR4",
    name: "Petrobras PN",
    price: 38.42,
    volume: "R$ 5.47B",
  },
  {
    position: 2,
    symbol: "VALE3",
    name: "Vale ON",
    price: 62.18,
    volume: "R$ 4.21B",
  },
  {
    position: 3,
    symbol: "ITUB4",
    name: "Itaú Unibanco",
    price: 33.85,
    volume: "R$ 3.34B",
  },
  {
    position: 4,
    symbol: "BBDC4",
    name: "Bradesco PN",
    price: 14.92,
    volume: "R$ 2.87B",
  },
  {
    position: 5,
    symbol: "ABEV3",
    name: "Ambev SA",
    price: 11.82,
    volume: "R$ 1.98B",
  },
];

export default function RankingsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <PublicHeader />

      {/* Hero Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-950/20 dark:to-emerald-950/20">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Rankings do <span className="text-primary">Mercado</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Acompanhe os destaques da bolsa brasileira em tempo real
            </p>
          </div>
        </div>
      </section>

      {/* Rankings Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Maiores Altas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-500">
                  <TrendingUp className="h-5 w-5" />
                  Maiores Altas
                </CardTitle>
                <CardDescription>
                  Ações com melhor performance hoje
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {maioresAltas.map((ativo) => (
                    <div
                      key={ativo.symbol}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-lg w-6">
                          {ativo.position}
                        </span>
                        <div>
                          <div className="font-semibold">{ativo.symbol}</div>
                          <div className="text-sm text-muted-foreground">
                            {ativo.name}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono">
                          R$ {ativo.price.toFixed(2)}
                        </div>
                        <div className="text-emerald-500 text-sm">
                          +{ativo.change.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))}
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
                <CardDescription>
                  Maior volume financeiro do dia
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {maisNegociadas.map((ativo) => (
                    <div
                      key={ativo.symbol}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-lg w-6">
                          {ativo.position}
                        </span>
                        <div>
                          <div className="font-semibold">{ativo.symbol}</div>
                          <div className="text-sm text-muted-foreground">
                            {ativo.name}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono">
                          R$ {ativo.price.toFixed(2)}
                        </div>
                        <div className="text-blue-500 text-sm">
                          {ativo.volume}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Explore Mais Informações</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Encontre análises detalhadas sobre os ativos em destaque
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/ativos">
              <Button size="lg">Ver Todos os Ativos</Button>
            </Link>
            <Link href="/noticias">
              <Button variant="outline" size="lg">
                Notícias do Mercado
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

