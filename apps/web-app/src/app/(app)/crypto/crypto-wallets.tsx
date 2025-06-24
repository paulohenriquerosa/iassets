"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Trash2, ExternalLink, Copy, Check } from "lucide-react";

type Wallet = {
  id: string;
  name: string;
  type: "metamask" | "walletconnect" | "ledger" | "manual";
  address: string;
  balance: number;
  connected: boolean;
};

export function CryptoWallets() {
  const [wallets, setWallets] = useState<Wallet[]>([
    {
      id: "1",
      name: "Metamask Principal",
      type: "metamask",
      address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
      balance: 0.85,
      connected: true
    },
    {
      id: "2",
      name: "Ledger Hardware",
      type: "ledger",
      address: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
      balance: 2.34,
      connected: true
    }
  ]);
  
  const [newWallet, setNewWallet] = useState({
    name: "",
    address: ""
  });
  
  const [copied, setCopied] = useState<string | null>(null);
  
  const handleAddWallet = () => {
    if (!newWallet.name || !newWallet.address) return;
    
    const wallet: Wallet = {
      id: Date.now().toString(),
      name: newWallet.name,
      type: "manual",
      address: newWallet.address,
      balance: 0,
      connected: true
    };
    
    setWallets([...wallets, wallet]);
    setNewWallet({ name: "", address: "" });
  };
  
  const handleRemoveWallet = (id: string) => {
    setWallets(wallets.filter(wallet => wallet.id !== id));
  };
  
  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopied(address);
    setTimeout(() => setCopied(null), 2000);
  };
  
  const getWalletIcon = (type: string) => {
    switch (type) {
      case "metamask":
        return "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg";
      case "walletconnect":
        return "https://seeklogo.com/images/W/walletconnect-logo-EE83B50C97-seeklogo.com.png";
      case "ledger":
        return "https://cryptologos.cc/logos/ledger-ledger-logo.png";
      default:
        return "https://cdn-icons-png.flaticon.com/512/6989/6989958.png";
    }
  };
  
  const truncateAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  const formatBTC = (value: number) => {
    return value.toFixed(8);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Carteiras Conectadas</p>
          <p className="font-medium">{wallets.length} carteiras</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1">
              <PlusCircle className="h-4 w-4" />
              <span>Adicionar</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Carteira</DialogTitle>
              <DialogDescription>
                Conecte uma carteira de criptomoedas para rastrear seus ativos.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="wallet-name">Nome da Carteira</Label>
                  <Input 
                    id="wallet-name" 
                    placeholder="Ex: Minha Carteira Principal" 
                    value={newWallet.name}
                    onChange={(e) => setNewWallet({...newWallet, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="wallet-address">Endereço da Carteira</Label>
                  <Input 
                    id="wallet-address" 
                    placeholder="Ex: 0x71C7656EC7ab88b098defB751B7401B5f6d8976F" 
                    value={newWallet.address}
                    onChange={(e) => setNewWallet({...newWallet, address: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Ou conecte com</Label>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 h-12">
                      <img src={getWalletIcon("metamask")} alt="Metamask" className="h-6 w-6 mr-2" />
                      Metamask
                    </Button>
                    <Button variant="outline" className="flex-1 h-12">
                      <img src={getWalletIcon("walletconnect")} alt="WalletConnect" className="h-6 w-6 mr-2" />
                      WalletConnect
                    </Button>
                    <Button variant="outline" className="flex-1 h-12">
                      <img src={getWalletIcon("ledger")} alt="Ledger" className="h-6 w-6 mr-2" />
                      Ledger
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button onClick={handleAddWallet}>Adicionar Carteira</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="space-y-3">
        {wallets.map(wallet => (
          <div key={wallet.id} className="flex items-center justify-between p-3 border rounded-md">
            <div className="flex items-center gap-3">
              <img src={getWalletIcon(wallet.type)} alt={wallet.type} className="h-8 w-8" />
              <div>
                <div className="font-medium">{wallet.name}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span>{truncateAddress(wallet.address)}</span>
                  <button 
                    onClick={() => handleCopyAddress(wallet.address)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {copied === wallet.address ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </button>
                  <a 
                    href={`https://etherscan.io/address/${wallet.address}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="font-medium">{formatBTC(wallet.balance)} BTC</div>
                <div className="text-xs text-muted-foreground">
                  {new Intl.NumberFormat('pt-BR', { 
                    style: 'currency', 
                    currency: 'BRL' 
                  }).format(wallet.balance * 43200.50)}
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleRemoveWallet(wallet.id)}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        
        {wallets.length === 0 && (
          <div className="text-center p-6 border rounded-md">
            <p className="text-muted-foreground">Nenhuma carteira conectada</p>
            <p className="text-sm text-muted-foreground mt-1">Adicione uma carteira para começar a rastrear seus ativos</p>
          </div>
        )}
      </div>
    </div>
  );
} 