"use client"

import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUp, ArrowDown, Search, SlidersHorizontal } from "lucide-react";

type CryptoAsset = {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  price: number;
  value: number;
  change24h: number;
  allocation: number;
  image: string;
};

export function CryptoPortfolio() {
  const [view, setView] = useState<"list" | "chart">("list");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Dados de exemplo para o portfólio
  const assets: CryptoAsset[] = [
    {
      id: "1",
      name: "Bitcoin",
      symbol: "BTC",
      amount: 0.85,
      price: 43200.50,
      value: 36720.43,
      change24h: 2.5,
      allocation: 45.2,
      image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png"
    },
    {
      id: "2",
      name: "Ethereum",
      symbol: "ETH",
      amount: 12.5,
      price: 2350.75,
      value: 29384.38,
      change24h: 1.8,
      allocation: 36.1,
      image: "https://cryptologos.cc/logos/ethereum-eth-logo.png"
    },
    {
      id: "3",
      name: "Binance Coin",
      symbol: "BNB",
      amount: 15.2,
      price: 530.25,
      value: 8059.80,
      change24h: -0.7,
      allocation: 9.9,
      image: "https://cryptologos.cc/logos/bnb-bnb-logo.png"
    },
    {
      id: "4",
      name: "Solana",
      symbol: "SOL",
      amount: 25.0,
      price: 145.80,
      value: 3645.00,
      change24h: 5.2,
      allocation: 4.5,
      image: "https://cryptologos.cc/logos/solana-sol-logo.png"
    },
    {
      id: "5",
      name: "Cardano",
      symbol: "ADA",
      amount: 7500.0,
      price: 0.45,
      value: 3375.00,
      change24h: -1.2,
      allocation: 4.3,
      image: "https://cryptologos.cc/logos/cardano-ada-logo.png"
    }
  ];
  
  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
  
  const filteredAssets = assets.filter(asset => 
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL',
      maximumFractionDigits: 2
    }).format(value);
  };
  
  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };
  
  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
    "hsl(var(--chart-6))"
  ];
  
  const chartData = assets.map(asset => ({
    name: asset.symbol,
    value: asset.allocation
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-lg font-semibold">Valor Total: {formatCurrency(totalValue)}</h4>
          <p className="text-sm text-muted-foreground">Atualizado em {new Date().toLocaleDateString('pt-BR')}</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar ativo..." 
              className="pl-8 w-[200px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Tabs value={view} onValueChange={(v) => setView(v as "list" | "chart")} className="w-[120px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="list">Lista</TabsTrigger>
              <TabsTrigger value="chart">Gráfico</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div>
        <Tabs value={view} className="w-full">
          <TabsContent value="list" className="mt-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Ativo</th>
                    <th className="text-right py-3 px-4">Preço</th>
                    <th className="text-right py-3 px-4">24h %</th>
                    <th className="text-right py-3 px-4">Quantidade</th>
                    <th className="text-right py-3 px-4">Valor</th>
                    <th className="text-right py-3 px-4">Alocação</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAssets.map(asset => (
                    <tr key={asset.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <img src={asset.image} alt={asset.name} className="w-6 h-6" />
                          <div>
                            <div className="font-medium">{asset.name}</div>
                            <div className="text-xs text-muted-foreground">{asset.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="text-right py-3 px-4">{formatCurrency(asset.price)}</td>
                      <td className={`text-right py-3 px-4 ${asset.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        <div className="flex items-center justify-end">
                          {asset.change24h >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                          {Math.abs(asset.change24h)}%
                        </div>
                      </td>
                      <td className="text-right py-3 px-4">{asset.amount}</td>
                      <td className="text-right py-3 px-4">{formatCurrency(asset.value)}</td>
                      <td className="text-right py-3 px-4">{formatPercentage(asset.allocation)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredAssets.length === 0 && (
                <div className="text-center p-6">
                  <p className="text-muted-foreground">Nenhum ativo encontrado</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="chart" className="mt-0">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-1/2 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                      labelLine={false}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Alocação']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="w-full md:w-1/2">
                <h4 className="text-base font-semibold mb-4">Distribuição de Ativos</h4>
                <div className="space-y-3">
                  {assets.map((asset, index) => (
                    <div key={asset.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                        <div className="flex items-center gap-2">
                          <img src={asset.image} alt={asset.name} className="w-5 h-5" />
                          <span>{asset.symbol}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span>{formatPercentage(asset.allocation)}</span>
                        <span className="text-muted-foreground">{formatCurrency(asset.value)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 