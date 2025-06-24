import { AssetsTable } from "./assets-table";
import { CompositionChart } from "./composition-chart";
import { LastestTradeTable } from "./lastest-trade-table";
import { TotalAssetCard } from "./total-asset-card";
import { WalletPerformanceChart } from "./wallet-performance-chart";
import { AssetComparator } from "./asset-comparator";
import { FundamentalIndicators } from "./fundamental-indicators";
import { PortfolioRebalancer } from "./portfolio-rebalancer";
import { CorporateEventsCalendar } from "./corporate-events-calendar";

export default function Wallet(){
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl text-foreground font-bold">Carteira</h1>
        <div className="text-sm text-muted-foreground">
          Última atualização: {new Date().toLocaleDateString('pt-BR')}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow h-full">
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-4">Resumo da Carteira</h3>
              <TotalAssetCard />
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow h-full">
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-4">Últimas Transações</h3>
              <LastestTradeTable />
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow h-full">
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-4">Composição da Carteira</h3>
              <CompositionChart />
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow h-full">
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-4">Desempenho da Carteira</h3>
              <WalletPerformanceChart />
            </div>
          </div>
        </div>
      </div>
      
      <div className="rounded-lg border bg-card text-card-foreground shadow">
        <div className="p-6">
          <h3 className="font-semibold text-lg mb-4">Ativos da Carteira</h3>
          <AssetsTable />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow">
            <div className="p-6">
              <AssetComparator />
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow">
            <div className="p-6">
              <FundamentalIndicators />
            </div>
          </div>
        </div>
      </div>
      
      <div className="rounded-lg border bg-card text-card-foreground shadow">
        <div className="p-6">
          <PortfolioRebalancer />
        </div>
      </div>
      
      <div className="rounded-lg border bg-card text-card-foreground shadow">
        <div className="p-6">
          <CorporateEventsCalendar />
        </div>
      </div>
    </div>
  )
}
