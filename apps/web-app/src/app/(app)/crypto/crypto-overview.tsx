"use client"

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";

type CryptoData = {
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  image: string;
};

export function CryptoOverview() {
  const [timeframe, setTimeframe] = useState<"24h" | "7d" | "30d" | "90d">("7d");
  
  // Dados de exemplo para o gráfico
  const chartData = {
    "24h": [
      { time: "00:00", price: 42000 },
      { time: "04:00", price: 42200 },
      { time: "08:00", price: 41800 },
      { time: "12:00", price: 42500 },
      { time: "16:00", price: 43000 },
      { time: "20:00", price: 42800 },
      { time: "23:59", price: 43200 }
    ],
    "7d": [
      { time: "Seg", price: 42000 },
      { time: "Ter", price: 43000 },
      { time: "Qua", price: 41500 },
      { time: "Qui", price: 42500 },
      { time: "Sex", price: 44000 },
      { time: "Sáb", price: 43500 },
      { time: "Dom", price: 43200 }
    ],
    "30d": [
      { time: "Sem 1", price: 42000 },
      { time: "Sem 2", price: 44000 },
      { time: "Sem 3", price: 41000 },
      { time: "Sem 4", price: 43200 }
    ],
    "90d": [
      { time: "Jan", price: 38000 },
      { time: "Fev", price: 40000 },
      { time: "Mar", price: 43200 }
    ]
  };
  
  // Dados de exemplo para as principais criptomoedas
  const topCryptos: CryptoData[] = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      price: 43200.50,
      change24h: 2.5,
      marketCap: 837000000000,
      volume24h: 28500000000,
      circulatingSupply: 19400000,
      image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png"
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      price: 2350.75,
      change24h: 1.8,
      marketCap: 282000000000,
      volume24h: 15700000000,
      circulatingSupply: 120000000,
      image: "https://cryptologos.cc/logos/ethereum-eth-logo.png"
    },
    {
      name: "Binance Coin",
      symbol: "BNB",
      price: 530.25,
      change24h: -0.7,
      marketCap: 81500000000,
      volume24h: 2100000000,
      circulatingSupply: 153800000,
      image: "https://cryptologos.cc/logos/bnb-bnb-logo.png"
    },
    {
      name: "Solana",
      symbol: "SOL",
      price: 145.80,
      change24h: 5.2,
      marketCap: 62300000000,
      volume24h: 3800000000,
      circulatingSupply: 427000000,
      image: "https://cryptologos.cc/logos/solana-sol-logo.png"
    },
    {
      name: "Cardano",
      symbol: "ADA",
      price: 0.45,
      change24h: -1.2,
      marketCap: 15800000000,
      volume24h: 580000000,
      circulatingSupply: 35100000000,
      image: "https://cryptologos.cc/logos/cardano-ada-logo.png"
    }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL',
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatLargeNumber = (value: number) => {
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(2)}B`;
    } else if (value >= 1000000) {
      return `${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(2)}K`;
    }
    return value.toString();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <img src={topCryptos[0].image} alt={topCryptos[0].name} className="w-10 h-10" />
              <div>
                <h4 className="font-semibold">{topCryptos[0].name}</h4>
                <p className="text-sm text-muted-foreground">{topCryptos[0].symbol}</p>
              </div>
              <div className="ml-auto">
                <div className="text-xl font-bold">{formatCurrency(topCryptos[0].price)}</div>
                <div className={`text-sm flex items-center ${topCryptos[0].change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {topCryptos[0].change24h >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                  {Math.abs(topCryptos[0].change24h)}%
                </div>
              </div>
            </div>
            
            <div className="space-x-2 mb-4">
              <Button 
                variant={timeframe === "24h" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setTimeframe("24h")}
              >
                24H
              </Button>
              <Button 
                variant={timeframe === "7d" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setTimeframe("7d")}
              >
                7D
              </Button>
              <Button 
                variant={timeframe === "30d" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setTimeframe("30d")}
              >
                30D
              </Button>
              <Button 
                variant={timeframe === "90d" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setTimeframe("90d")}
              >
                90D
              </Button>
            </div>
            
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData[timeframe]} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="time" />
                  <YAxis 
                    domain={['auto', 'auto']}
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                  />
                  <Tooltip 
                    formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Preço']}
                    labelFormatter={(label) => `Tempo: ${label}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-sm text-muted-foreground">Cap. de Mercado</p>
                <p className="font-medium">${formatLargeNumber(topCryptos[0].marketCap)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Volume 24h</p>
                <p className="font-medium">${formatLargeNumber(topCryptos[0].volume24h)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fornecimento</p>
                <p className="font-medium">{formatLargeNumber(topCryptos[0].circulatingSupply)} {topCryptos[0].symbol}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h4 className="text-base font-semibold mb-4">Principais Criptomoedas</h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">#</th>
                <th className="text-left py-3 px-4">Nome</th>
                <th className="text-right py-3 px-4">Preço</th>
                <th className="text-right py-3 px-4">24h %</th>
                <th className="text-right py-3 px-4">Cap. de Mercado</th>
                <th className="text-right py-3 px-4">Volume (24h)</th>
              </tr>
            </thead>
            <tbody>
              {topCryptos.map((crypto, index) => (
                <tr key={crypto.symbol} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <img src={crypto.image} alt={crypto.name} className="w-6 h-6" />
                      <div>
                        <div className="font-medium">{crypto.name}</div>
                        <div className="text-xs text-muted-foreground">{crypto.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-right py-3 px-4">{formatCurrency(crypto.price)}</td>
                  <td className={`text-right py-3 px-4 ${crypto.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    <div className="flex items-center justify-end">
                      {crypto.change24h >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                      {Math.abs(crypto.change24h)}%
                    </div>
                  </td>
                  <td className="text-right py-3 px-4">${formatLargeNumber(crypto.marketCap)}</td>
                  <td className="text-right py-3 px-4">${formatLargeNumber(crypto.volume24h)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 