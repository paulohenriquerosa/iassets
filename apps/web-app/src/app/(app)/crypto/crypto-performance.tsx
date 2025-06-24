"use client"

import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";

export function CryptoPerformance() {
  const [timeframe, setTimeframe] = useState<"1m" | "3m" | "6m" | "1y" | "all">("3m");
  const [chartType, setChartType] = useState<"value" | "profit">("value");
  
  // Dados de exemplo para o gráfico de valor
  const valueData = {
    "1m": [
      { date: "01/03", value: 75000 },
      { date: "05/03", value: 78000 },
      { date: "10/03", value: 76500 },
      { date: "15/03", value: 79000 },
      { date: "20/03", value: 82000 },
      { date: "25/03", value: 80500 },
      { date: "30/03", value: 81200 }
    ],
    "3m": [
      { date: "Jan", value: 65000 },
      { date: "Fev", value: 72000 },
      { date: "Mar", value: 81200 }
    ],
    "6m": [
      { date: "Out", value: 55000 },
      { date: "Nov", value: 58000 },
      { date: "Dez", value: 65000 },
      { date: "Jan", value: 72000 },
      { date: "Fev", value: 75000 },
      { date: "Mar", value: 81200 }
    ],
    "1y": [
      { date: "Abr/22", value: 42000 },
      { date: "Jun/22", value: 38000 },
      { date: "Ago/22", value: 45000 },
      { date: "Out/22", value: 48000 },
      { date: "Dez/22", value: 65000 },
      { date: "Fev/23", value: 75000 },
      { date: "Mar/23", value: 81200 }
    ],
    "all": [
      { date: "2020", value: 15000 },
      { date: "2021", value: 35000 },
      { date: "2022", value: 65000 },
      { date: "2023", value: 81200 }
    ]
  };
  
  // Dados de exemplo para o gráfico de lucro/perda
  const profitData = {
    "1m": [
      { date: "01/03", profit: 500 },
      { date: "05/03", profit: 1200 },
      { date: "10/03", profit: -800 },
      { date: "15/03", profit: 1500 },
      { date: "20/03", profit: 1800 },
      { date: "25/03", profit: -600 },
      { date: "30/03", profit: 900 }
    ],
    "3m": [
      { date: "Jan", profit: 3500 },
      { date: "Fev", profit: 4200 },
      { date: "Mar", profit: 5800 }
    ],
    "6m": [
      { date: "Out", profit: 2200 },
      { date: "Nov", profit: 1800 },
      { date: "Dez", profit: 3500 },
      { date: "Jan", profit: 4200 },
      { date: "Fev", profit: 1500 },
      { date: "Mar", profit: 5800 }
    ],
    "1y": [
      { date: "Abr/22", profit: 1200 },
      { date: "Jun/22", profit: -2500 },
      { date: "Ago/22", profit: 3800 },
      { date: "Out/22", profit: 1500 },
      { date: "Dez/22", profit: 8500 },
      { date: "Fev/23", profit: 4800 },
      { date: "Mar/23", profit: 5800 }
    ],
    "all": [
      { date: "2020", profit: 8500 },
      { date: "2021", profit: 12000 },
      { date: "2022", profit: 18500 },
      { date: "2023", profit: 16200 }
    ]
  };
  
  // Estatísticas de desempenho
  const performanceStats = {
    totalValue: 81200,
    totalInvested: 55000,
    totalProfit: 26200,
    profitPercentage: 47.64,
    dailyChange: 1200,
    dailyChangePercentage: 1.5
  };
  
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-lg font-semibold">Desempenho da Carteira</h4>
          <p className="text-sm text-muted-foreground">Acompanhe o desempenho dos seus investimentos em criptomoedas</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Tabs value={chartType} onValueChange={(v) => setChartType(v as "value" | "profit")} className="w-[180px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="value">Valor</TabsTrigger>
              <TabsTrigger value="profit">Lucro/Perda</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Valor Total</div>
            <div className="text-2xl font-bold">{formatCurrency(performanceStats.totalValue)}</div>
            <div className={`text-sm flex items-center ${performanceStats.dailyChangePercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {performanceStats.dailyChangePercentage >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
              {formatCurrency(Math.abs(performanceStats.dailyChange))} ({Math.abs(performanceStats.dailyChangePercentage)}%)
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Total Investido</div>
            <div className="text-2xl font-bold">{formatCurrency(performanceStats.totalInvested)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Lucro/Perda</div>
            <div className={`text-2xl font-bold ${performanceStats.totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(performanceStats.totalProfit)}
            </div>
            <div className={`text-sm ${performanceStats.profitPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatPercentage(performanceStats.profitPercentage)}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-x-2">
            <Button 
              variant={timeframe === "1m" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setTimeframe("1m")}
            >
              1M
            </Button>
            <Button 
              variant={timeframe === "3m" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setTimeframe("3m")}
            >
              3M
            </Button>
            <Button 
              variant={timeframe === "6m" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setTimeframe("6m")}
            >
              6M
            </Button>
            <Button 
              variant={timeframe === "1y" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setTimeframe("1y")}
            >
              1A
            </Button>
            <Button 
              variant={timeframe === "all" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setTimeframe("all")}
            >
              Tudo
            </Button>
          </div>
        </div>
        
        <div className="h-[350px]">
          <Tabs value={chartType} className="w-full h-full">
            <TabsContent value="value" className="mt-0 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={valueData[timeframe]} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis 
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    formatter={(value) => [formatCurrency(Number(value)), 'Valor']}
                    labelFormatter={(label) => `Data: ${label}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="profit" className="mt-0 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={profitData[timeframe]} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis 
                    tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
                  />
                  <Tooltip 
                    formatter={(value) => [formatCurrency(Number(value)), 'Lucro/Perda']}
                    labelFormatter={(label) => `Data: ${label}`}
                  />
                  <Legend />
                  <Bar 
                    dataKey="profit" 
                    name="Lucro/Perda" 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
} 