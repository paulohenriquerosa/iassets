"use client";

import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react";

interface MarketItem {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePercent: number;
  isPositive: boolean;
}

const initialMarketData: MarketItem[] = [
  { symbol: "IBOV", name: "Ibovespa", price: "129847", change: "+1084", changePercent: 0.85, isPositive: true },
  { symbol: "IFIX", name: "Índice FIIs", price: "2847", change: "-7", changePercent: -0.23, isPositive: false },
  { symbol: "USD/BRL", name: "Dólar Americano", price: "5.51", change: "-0.007", changePercent: -0.12, isPositive: false },
  { symbol: "EUR/BRL", name: "Euro", price: "5.98", change: "+0.023", changePercent: 0.39, isPositive: true },
  { symbol: "BTC/USD", name: "Bitcoin", price: "67234", change: "+1612", changePercent: 2.45, isPositive: true },
  { symbol: "ETH/USD", name: "Ethereum", price: "3456", change: "+42", changePercent: 1.23, isPositive: true },
  { symbol: "PETR4", name: "Petrobras", price: "38.45", change: "+0.70", changePercent: 1.85, isPositive: true },
  { symbol: "VALE3", name: "Vale", price: "68.92", change: "-0.28", changePercent: -0.40, isPositive: false },
];

export function MarketWidget() {
  const [marketData, setMarketData] = useState<MarketItem[]>(initialMarketData);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isUpdating, setIsUpdating] = useState(false);

  // Simular atualizações em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      updateMarketData();
    }, 30000); // Atualiza a cada 30 segundos

    return () => clearInterval(interval);
  }, []);

  const updateMarketData = () => {
    setIsUpdating(true);
    
    setTimeout(() => {
      setMarketData(prevData => 
        prevData.map(item => {
          // Gerar variação aleatória pequena (-0.5% a +0.5%)
          const variation = (Math.random() - 0.5) * 0.01;
          const newChangePercent = item.changePercent + variation;
          const isPositive = newChangePercent > 0;
          
          // Atualizar preço baseado na nova variação
          const basePrice = parseFloat(item.price.replace(',', ''));
          const newPrice = basePrice * (1 + variation / 100);
          
          return {
            ...item,
            changePercent: newChangePercent,
            isPositive,
            price: newPrice.toFixed(item.symbol.includes('/') && !item.symbol.includes('BRL') ? 0 : 2),
            change: `${isPositive ? '+' : ''}${(basePrice * variation / 100).toFixed(2)}`
          };
        })
      );
      
      setLastUpdate(new Date());
      setIsUpdating(false);
    }, 1000);
  };

  const formatPrice = (symbol: string, price: string) => {
    if (symbol.includes('USD') && !symbol.includes('BRL')) {
      return `$${parseFloat(price).toLocaleString()}`;
    }
    if (symbol.includes('BRL')) {
      return `R$ ${price}`;
    }
    return parseFloat(price).toLocaleString();
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-lg font-semibold">Mercados em Tempo Real</h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            Atualizado: {lastUpdate.toLocaleTimeString('pt-BR')}
          </span>
          <button
            onClick={updateMarketData}
            disabled={isUpdating}
            className="p-1 hover:bg-accent rounded transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isUpdating ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {marketData.map((item) => (
            <div
              key={item.symbol}
              className="p-3 rounded-lg border bg-background hover:bg-accent/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-semibold text-sm">{item.symbol}</div>
                  <div className="text-xs text-muted-foreground">{item.name}</div>
                </div>
                <div className={`p-1 rounded-full ${
                  item.isPositive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {item.isPositive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                </div>
              </div>
              
              <div className="text-lg font-bold mb-1">
                {formatPrice(item.symbol, item.price)}
              </div>
              
              <div className={`text-sm flex items-center gap-1 ${
                item.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                <span>{item.change}</span>
                <span>({item.changePercent.toFixed(2)}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 