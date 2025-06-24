"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Input } from "./ui/input";
import { useState } from "react";

export function FundamentalIndicators() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const fundamentalData = [
    { ticker: "PETR4", name: "Petrobras", sector: "Petróleo", pl: 4.2, pvp: 1.1, dy: 12.5, roe: 22.3, roic: 18.7 },
    { ticker: "VALE3", name: "Vale", sector: "Mineração", pl: 5.8, pvp: 1.5, dy: 9.8, roe: 25.6, roic: 21.2 },
    { ticker: "ITUB4", name: "Itaú", sector: "Financeiro", pl: 8.3, pvp: 1.8, dy: 5.2, roe: 18.9, roic: 15.3 },
    { ticker: "BBDC4", name: "Bradesco", sector: "Financeiro", pl: 7.5, pvp: 1.3, dy: 6.1, roe: 16.7, roic: 14.2 },
    { ticker: "WEGE3", name: "WEG", sector: "Bens Industriais", pl: 32.1, pvp: 8.5, dy: 1.2, roe: 26.8, roic: 22.5 },
    { ticker: "MGLU3", name: "Magazine Luiza", sector: "Varejo", pl: 45.3, pvp: 6.2, dy: 0.5, roe: 12.4, roic: 9.8 }
  ];
  
  const filteredData = fundamentalData.filter(item => 
    item.ticker.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sector.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-base font-semibold">Indicadores Fundamentalistas</h4>
        <Input 
          placeholder="Buscar ativo..." 
          className="max-w-xs" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticker</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Setor</TableHead>
              <TableHead className="text-right">P/L</TableHead>
              <TableHead className="text-right">P/VP</TableHead>
              <TableHead className="text-right">DY (%)</TableHead>
              <TableHead className="text-right">ROE (%)</TableHead>
              <TableHead className="text-right">ROIC (%)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.ticker}>
                <TableCell className="font-medium">{item.ticker}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.sector}</TableCell>
                <TableCell className="text-right">{item.pl.toFixed(1)}</TableCell>
                <TableCell className="text-right">{item.pvp.toFixed(1)}</TableCell>
                <TableCell className="text-right">{item.dy.toFixed(1)}%</TableCell>
                <TableCell className="text-right">{item.roe.toFixed(1)}%</TableCell>
                <TableCell className="text-right">{item.roic.toFixed(1)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 