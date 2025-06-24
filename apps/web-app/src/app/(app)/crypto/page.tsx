import { CryptoOverview } from "./crypto-overview";
import { CryptoPortfolio } from "./crypto-portfolio";
import { CryptoPerformance } from "./crypto-performance";
import { CryptoWallets } from "./crypto-wallets";
import { CryptoTransactions } from "./crypto-transactions";

export default function CryptoPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Criptomoedas</h2>
        <p className="text-sm text-muted-foreground">
          Última atualização: {new Date().toLocaleDateString('pt-BR', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CryptoOverview />
          </div>
          <div>
            <CryptoWallets />
          </div>
        </div>
        
        <CryptoPortfolio />
        
        <CryptoPerformance />
        
        <CryptoTransactions />
      </div>
    </div>
  );
} 