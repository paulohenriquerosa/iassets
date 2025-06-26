"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Globe,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

interface MarketItem {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changeValue: string;
  isPositive: boolean;
  volume: string;
}

// Dados mockup de mercado mais detalhados
const marketData = {
  brazilian: [
    { symbol: "IBOVESPA", name: "Índice Bovespa", price: "132.847", change: "+2.14%", changeValue: "+2.784", isPositive: true, volume: "R$ 18.2B" },
    { symbol: "IFIX", name: "Índice FIIs", price: "3.241", change: "+1.23%", changeValue: "+39", isPositive: true, volume: "R$ 2.1B" },
    { symbol: "PETR4", name: "Petrobras PN", price: "R$ 42.18", change: "+3.45%", changeValue: "+1.41", isPositive: true, volume: "R$ 1.8B" },
    { symbol: "VALE3", name: "Vale ON", price: "R$ 58.92", change: "+2.87%", changeValue: "+1.65", isPositive: true, volume: "R$ 1.2B" },
    { symbol: "ITUB4", name: "Itaú Unibanco PN", price: "R$ 35.47", change: "-0.56%", changeValue: "-0.20", isPositive: false, volume: "R$ 890M" },
    { symbol: "BBDC4", name: "Bradesco PN", price: "R$ 12.85", change: "+1.98%", changeValue: "+0.25", isPositive: true, volume: "R$ 650M" }
  ],
  international: [
    { symbol: "S&P 500", name: "S&P 500", price: "4.890", change: "+0.95%", changeValue: "+46", isPositive: true, volume: "$98.2B" },
    { symbol: "NASDAQ", name: "Nasdaq Composite", price: "15.234", change: "+1.23%", changeValue: "+185", isPositive: true, volume: "$67.5B" },
    { symbol: "AAPL", name: "Apple Inc", price: "$195.89", change: "+2.34%", changeValue: "+4.49", isPositive: true, volume: "$8.9B" },
    { symbol: "TSLA", name: "Tesla Inc", price: "$248.42", change: "-1.67%", changeValue: "-4.21", isPositive: false, volume: "$12.3B" },
    { symbol: "NVDA", name: "NVIDIA Corp", price: "$875.28", change: "+4.52%", changeValue: "+37.85", isPositive: true, volume: "$15.7B" },
    { symbol: "MSFT", name: "Microsoft Corp", price: "$420.55", change: "+1.89%", changeValue: "+7.81", isPositive: true, volume: "$9.2B" }
  ],
  currencies: [
    { symbol: "USD/BRL", name: "Dólar Americano", price: "5.12", change: "-0.87%", changeValue: "-0.04", isPositive: false, volume: "$2.1B" },
    { symbol: "EUR/BRL", name: "Euro", price: "5.95", change: "+0.18%", changeValue: "+0.01", isPositive: true, volume: "$890M" },
    { symbol: "GBP/BRL", name: "Libra Esterlina", price: "6.42", change: "-0.32%", changeValue: "-0.02", isPositive: false, volume: "$345M" },
    { symbol: "JPY/BRL", name: "Iene Japonês", price: "0.0347", change: "+0.65%", changeValue: "+0.0002", isPositive: true, volume: "$234M" }
  ],
  crypto: [
    { symbol: "BTC/USD", name: "Bitcoin", price: "$72.340", change: "+4.56%", changeValue: "+3.156", isPositive: true, volume: "$12.8B" },
    { symbol: "ETH/USD", name: "Ethereum", price: "$3.892", change: "+6.23%", changeValue: "+228", isPositive: true, volume: "$8.9B" },
    { symbol: "BNB/USD", name: "Binance Coin", price: "$692.45", change: "+2.89%", changeValue: "+19.47", isPositive: true, volume: "$1.2B" },
    { symbol: "ADA/USD", name: "Cardano", price: "$1.0284", change: "+8.91%", changeValue: "+0.084", isPositive: true, volume: "$890M" },
    { symbol: "XRP/USD", name: "Ripple", price: "$3.1847", change: "+12.45%", changeValue: "+0.353", isPositive: true, volume: "$2.3B" },
    { symbol: "SOL/USD", name: "Solana", price: "$248.92", change: "+15.67%", changeValue: "+33.67", isPositive: true, volume: "$3.1B" }
  ]
};

export function AdvancedMarketWidget() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const MarketRow = ({ item }: { item: MarketItem }) => (
    <div className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors group">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm">{item.symbol}</span>
          {item.isPositive ? (
            <ArrowUpRight className="w-3 h-3 text-green-600" />
          ) : (
            <ArrowDownRight className="w-3 h-3 text-red-600" />
          )}
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">{item.name}</p>
      </div>
      
      <div className="text-right">
        <div className="font-mono font-bold text-sm">{item.price}</div>
        <div className={`text-xs font-semibold ${item.isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {item.change} ({item.changeValue})
        </div>
      </div>
      
      <div className="text-right ml-4 hidden md:block">
        <div className="text-xs text-slate-600 dark:text-slate-400">Volume</div>
        <div className="text-xs font-semibold">{item.volume}</div>
      </div>
    </div>
  );

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            Mercados ao Vivo
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600 font-semibold">AO VIVO</span>
            </div>
            <span className="text-xs text-slate-600 font-mono">{formatTime(currentTime)}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <Tabs defaultValue="brazilian" className="w-full">
          <TabsList className="grid w-full grid-cols-4 m-4 mb-0">
            <TabsTrigger value="brazilian" className="text-xs">🇧🇷 Brasil</TabsTrigger>
            <TabsTrigger value="international" className="text-xs">🇺🇸 EUA</TabsTrigger>
            <TabsTrigger value="currencies" className="text-xs">💱 Câmbio</TabsTrigger>
            <TabsTrigger value="crypto" className="text-xs">₿ Cripto</TabsTrigger>
          </TabsList>
          
          {Object.entries(marketData).map(([key, data]) => (
            <TabsContent key={key} value={key} className="m-0 p-4 pt-0">
              <div className="space-y-1 max-h-80 overflow-y-auto">
                {data.map((item, index) => (
                  <MarketRow key={index} item={item} />
                ))}
              </div>
              
              <div className="flex gap-2 mt-4 pt-4 border-t">
                <Button size="sm" variant="outline" className="flex-1">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Gráficos
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Globe className="w-4 h-4 mr-2" />
                  Mais Cotações
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
} 