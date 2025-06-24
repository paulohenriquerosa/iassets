"use client"

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownLeft, Search, ExternalLink } from "lucide-react";

type Transaction = {
  id: string;
  date: string;
  type: "buy" | "sell" | "transfer_in" | "transfer_out";
  asset: string;
  amount: number;
  price: number;
  value: number;
  wallet: string;
  txHash: string;
};

export function CryptoTransactions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  
  // Dados de exemplo para transações
  const transactions: Transaction[] = [
    {
      id: "tx1",
      date: "2023-03-15 14:32",
      type: "buy",
      asset: "BTC",
      amount: 0.05,
      price: 220000,
      value: 11000,
      wallet: "Metamask Principal",
      txHash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t"
    },
    {
      id: "tx2",
      date: "2023-03-10 09:15",
      type: "transfer_in",
      asset: "ETH",
      amount: 1.2,
      price: 12000,
      value: 14400,
      wallet: "Ledger Hardware",
      txHash: "0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u"
    },
    {
      id: "tx3",
      date: "2023-03-05 16:45",
      type: "sell",
      asset: "SOL",
      amount: 10,
      price: 550,
      value: 5500,
      wallet: "Metamask Principal",
      txHash: "0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v"
    },
    {
      id: "tx4",
      date: "2023-02-28 11:20",
      type: "buy",
      asset: "BNB",
      amount: 2,
      price: 1500,
      value: 3000,
      wallet: "Metamask Principal",
      txHash: "0x4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w"
    },
    {
      id: "tx5",
      date: "2023-02-20 13:10",
      type: "transfer_out",
      asset: "ETH",
      amount: 0.5,
      price: 11800,
      value: 5900,
      wallet: "Ledger Hardware",
      txHash: "0x5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x"
    }
  ];
  
  // Filtrar transações com base no termo de pesquisa e filtro de tipo
  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = 
      tx.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.wallet.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.txHash.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesType = typeFilter === "all" || tx.type === typeFilter;
    
    return matchesSearch && matchesType;
  });
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL',
      maximumFractionDigits: 2
    }).format(value);
  };
  
  const formatCrypto = (value: number, symbol: string) => {
    return `${value.toFixed(symbol === "BTC" ? 8 : 6)} ${symbol}`;
  };
  
  const getTransactionTypeIcon = (type: string) => {
    switch (type) {
      case "buy":
      case "transfer_in":
        return <ArrowDownLeft className="h-4 w-4 text-green-600" />;
      case "sell":
      case "transfer_out":
        return <ArrowUpRight className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };
  
  const getTransactionTypeLabel = (type: string) => {
    switch (type) {
      case "buy": return "Compra";
      case "sell": return "Venda";
      case "transfer_in": return "Recebimento";
      case "transfer_out": return "Envio";
      default: return type;
    }
  };
  
  const truncateHash = (hash: string) => {
    return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-lg font-semibold">Transações Recentes</h4>
          <p className="text-sm text-muted-foreground">Histórico de transações de criptomoedas</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-[250px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por ativo, carteira..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="buy">Compra</SelectItem>
              <SelectItem value="sell">Venda</SelectItem>
              <SelectItem value="transfer_in">Recebimento</SelectItem>
              <SelectItem value="transfer_out">Envio</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Ativo</TableHead>
              <TableHead className="text-right">Quantidade</TableHead>
              <TableHead className="text-right">Preço</TableHead>
              <TableHead className="text-right">Valor</TableHead>
              <TableHead>Carteira</TableHead>
              <TableHead>Hash</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="font-medium">{tx.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getTransactionTypeIcon(tx.type)}
                      <span>{getTransactionTypeLabel(tx.type)}</span>
                    </div>
                  </TableCell>
                  <TableCell>{tx.asset}</TableCell>
                  <TableCell className="text-right">{formatCrypto(tx.amount, tx.asset)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(tx.price)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(tx.value)}</TableCell>
                  <TableCell>{tx.wallet}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="text-xs">{truncateHash(tx.txHash)}</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6" asChild>
                        <a href={`https://etherscan.io/tx/${tx.txHash}`} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  Nenhuma transação encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex justify-center">
        <Button variant="outline" size="sm">
          Carregar mais
        </Button>
      </div>
    </div>
  );
} 