"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { ArrowRight } from "lucide-react";

type Asset = {
  id: string;
  symbol: string;
  name: string;
  currentValue: number;
  currentPercentage: number;
  targetPercentage: number;
  difference: number;
  action: "buy" | "sell" | "hold";
  actionValue: number;
};

export function PortfolioRebalancer() {
  const [assets, setAssets] = useState<Asset[]>([
    {
      id: "1",
      symbol: "PETR4",
      name: "Petrobras PN",
      currentValue: 15000,
      currentPercentage: 30,
      targetPercentage: 25,
      difference: -5,
      action: "sell",
      actionValue: 2500
    },
    {
      id: "2",
      symbol: "VALE3",
      name: "Vale ON",
      currentValue: 12500,
      currentPercentage: 25,
      targetPercentage: 25,
      difference: 0,
      action: "hold",
      actionValue: 0
    },
    {
      id: "3",
      symbol: "ITUB4",
      name: "Itaú Unibanco PN",
      currentValue: 10000,
      currentPercentage: 20,
      targetPercentage: 20,
      difference: 0,
      action: "hold",
      actionValue: 0
    },
    {
      id: "4",
      symbol: "BBDC4",
      name: "Bradesco PN",
      currentValue: 7500,
      currentPercentage: 15,
      targetPercentage: 20,
      difference: 5,
      action: "buy",
      actionValue: 2500
    },
    {
      id: "5",
      symbol: "WEGE3",
      name: "WEG SA",
      currentValue: 5000,
      currentPercentage: 10,
      targetPercentage: 10,
      difference: 0,
      action: "hold",
      actionValue: 0
    }
  ]);

  const totalValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);

  const handleTargetChange = (id: string, value: number) => {
    // Limitar o valor entre 0 e 100
    const clampedValue = Math.min(Math.max(value, 0), 100);
    
    // Atualizar o asset com o novo valor alvo
    const updatedAssets = assets.map(asset => {
      if (asset.id === id) {
        const difference = clampedValue - asset.currentPercentage;
        const actionValue = (difference / 100) * totalValue;
        
        return {
          ...asset,
          targetPercentage: clampedValue,
          difference: difference,
          action: difference > 0 ? "buy" : difference < 0 ? "sell" : "hold",
          actionValue: Math.abs(actionValue)
        };
      }
      return asset;
    });
    
    setAssets(updatedAssets as Asset[]);
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "buy":
        return "text-green-600";
      case "sell":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getActionText = (action: string) => {
    switch (action) {
      case "buy":
        return "Comprar";
      case "sell":
        return "Vender";
      default:
        return "Manter";
    }
  };

  const currentData = assets.map(asset => ({
    name: asset.symbol,
    value: asset.currentPercentage
  }));

  const targetData = assets.map(asset => ({
    name: asset.symbol,
    value: asset.targetPercentage
  }));

  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))"
  ];

  const totalTargetPercentage = assets.reduce((sum, asset) => sum + asset.targetPercentage, 0);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Rebalanceamento de Carteira</CardTitle>
        <CardDescription>Simule o rebalanceamento ideal para sua carteira de investimentos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ativo</TableHead>
                    <TableHead className="text-right">Valor Atual</TableHead>
                    <TableHead className="text-right">% Atual</TableHead>
                    <TableHead className="text-right">% Alvo</TableHead>
                    <TableHead className="text-right">Diferença</TableHead>
                    <TableHead className="text-right">Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assets.map(asset => (
                    <TableRow key={asset.id}>
                      <TableCell className="font-medium">{asset.symbol}</TableCell>
                      <TableCell className="text-right">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(asset.currentValue)}
                      </TableCell>
                      <TableCell className="text-right">{asset.currentPercentage}%</TableCell>
                      <TableCell className="text-right">
                        <Input
                          type="number"
                          value={asset.targetPercentage}
                          onChange={(e) => handleTargetChange(asset.id, parseFloat(e.target.value) || 0)}
                          className="w-20 text-right"
                          min="0"
                          max="100"
                        />
                      </TableCell>
                      <TableCell className={`text-right ${asset.difference > 0 ? 'text-green-600' : asset.difference < 0 ? 'text-red-600' : ''}`}>
                        {asset.difference > 0 ? '+' : ''}{asset.difference}%
                      </TableCell>
                      <TableCell className="text-right">
                        {asset.action !== "hold" && (
                          <div className={`flex items-center justify-end gap-2 ${getActionColor(asset.action)}`}>
                            <span>{getActionText(asset.action)}</span>
                            <span>
                              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(asset.actionValue)}
                            </span>
                          </div>
                        )}
                        {asset.action === "hold" && (
                          <span className="text-gray-500">Manter</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <span className="text-sm text-muted-foreground">Total da carteira: </span>
                  <span className="font-medium">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalValue)}
                  </span>
                </div>
                <div className={totalTargetPercentage !== 100 ? "text-red-600" : "text-green-600"}>
                  <span className="text-sm">Total alocado: </span>
                  <span className="font-medium">{totalTargetPercentage}%</span>
                  {totalTargetPercentage !== 100 && (
                    <span className="text-sm ml-2">(deve somar 100%)</span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex-1 min-h-[300px]">
              <div className="flex items-center justify-center gap-4 h-full">
                <div className="w-[140px] h-[140px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={currentData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={60}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name }) => name}
                        labelLine={false}
                      >
                        {currentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="text-center text-sm font-medium mt-2">Atual</div>
                </div>
                
                <ArrowRight className="h-6 w-6 text-muted-foreground" />
                
                <div className="w-[140px] h-[140px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={targetData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={60}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name }) => name}
                        labelLine={false}
                      >
                        {targetData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="text-center text-sm font-medium mt-2">Alvo</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button>Aplicar Rebalanceamento</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 