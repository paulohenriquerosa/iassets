"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Indicator = {
  name: string;
  description: string;
  value: string | number;
  status: "positive" | "negative" | "neutral";
};

type Asset = {
  symbol: string;
  name: string;
  indicators: Indicator[];
};

export function FundamentalIndicators() {
  const [selectedAsset, setSelectedAsset] = useState<string>("PETR4");
  
  const assets: Asset[] = [
    {
      symbol: "PETR4",
      name: "Petrobras PN",
      indicators: [
        { name: "P/L", description: "Preço/Lucro", value: 4.2, status: "positive" },
        { name: "P/VP", description: "Preço/Valor Patrimonial", value: 0.9, status: "positive" },
        { name: "DY", description: "Dividend Yield", value: "8.5%", status: "positive" },
        { name: "ROE", description: "Retorno sobre Patrimônio", value: "21.3%", status: "positive" },
        { name: "Dívida/EBITDA", description: "Alavancagem", value: 1.2, status: "neutral" },
        { name: "Margem Líquida", description: "Lucratividade", value: "24.7%", status: "positive" }
      ]
    },
    {
      symbol: "VALE3",
      name: "Vale ON",
      indicators: [
        { name: "P/L", description: "Preço/Lucro", value: 5.8, status: "positive" },
        { name: "P/VP", description: "Preço/Valor Patrimonial", value: 1.2, status: "neutral" },
        { name: "DY", description: "Dividend Yield", value: "6.2%", status: "positive" },
        { name: "ROE", description: "Retorno sobre Patrimônio", value: "18.9%", status: "positive" },
        { name: "Dívida/EBITDA", description: "Alavancagem", value: 0.8, status: "positive" },
        { name: "Margem Líquida", description: "Lucratividade", value: "19.3%", status: "positive" }
      ]
    }
  ];

  const selectedAssetData = assets.find(asset => asset.symbol === selectedAsset);

  const getStatusColor = (status: Indicator["status"]) => {
    switch (status) {
      case "positive":
        return "text-green-600";
      case "negative":
        return "text-red-600";
      default:
        return "text-yellow-600";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <CardTitle className="text-base">Indicadores Fundamentalistas</CardTitle>
          <Select value={selectedAsset} onValueChange={setSelectedAsset}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Selecione um ativo" />
            </SelectTrigger>
            <SelectContent>
              {assets.map(asset => (
                <SelectItem key={asset.symbol} value={asset.symbol}>
                  {asset.symbol} - {asset.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {selectedAssetData && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Indicador</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedAssetData.indicators.map((indicator, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{indicator.name}</TableCell>
                  <TableCell>{indicator.description}</TableCell>
                  <TableCell className={`text-right ${getStatusColor(indicator.status)}`}>
                    {indicator.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
} 