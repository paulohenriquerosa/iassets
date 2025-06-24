"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

type AssetKey = "PETR4" | "VALE3" | "ITUB4" | "BBDC4";

export function AssetComparator() {
  const [selectedAssets, setSelectedAssets] = useState<AssetKey[]>(["PETR4", "VALE3"]);
  
  const compareData = [
    { date: "Jan", PETR4: 10, VALE3: 15, ITUB4: 8, BBDC4: 12 },
    { date: "Fev", PETR4: 12, VALE3: 14, ITUB4: 9, BBDC4: 13 },
    { date: "Mar", PETR4: 11, VALE3: 16, ITUB4: 10, BBDC4: 14 },
    { date: "Abr", PETR4: 13, VALE3: 18, ITUB4: 11, BBDC4: 15 },
    { date: "Mai", PETR4: 15, VALE3: 17, ITUB4: 12, BBDC4: 14 },
    { date: "Jun", PETR4: 14, VALE3: 19, ITUB4: 13, BBDC4: 16 }
  ];

  const colors: Record<AssetKey, string> = {
    PETR4: "hsl(var(--chart-1))",
    VALE3: "hsl(var(--chart-2))",
    ITUB4: "hsl(var(--chart-3))",
    BBDC4: "hsl(var(--chart-4))"
  };

  const handleAssetChange = (asset: AssetKey) => {
    if (selectedAssets.includes(asset)) {
      setSelectedAssets(selectedAssets.filter(a => a !== asset));
    } else if (selectedAssets.length < 3) {
      setSelectedAssets([...selectedAssets, asset]);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-4">
        <div>
          <h4 className="text-base font-semibold">Comparador de Ativos</h4>
          <p className="text-xs text-muted-foreground">Compare o desempenho de diferentes ativos</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {(Object.keys(colors) as AssetKey[]).map(asset => (
            <Button 
              key={asset}
              variant={selectedAssets.includes(asset) ? "default" : "outline"}
              size="sm"
              onClick={() => handleAssetChange(asset)}
            >
              {asset}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={compareData} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" />
            <YAxis 
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
            {selectedAssets.map(asset => (
              <Line 
                key={asset}
                type="monotone" 
                dataKey={asset} 
                name={asset} 
                stroke={colors[asset]} 
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 