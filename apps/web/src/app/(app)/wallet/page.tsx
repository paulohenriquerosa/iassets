import { AssetsTable } from "./assets-table";
import { CompositionChart } from "./composition-chart";
import { LastestTradeTable } from "./lastest-trade-table";
import { TotalAssetCard } from "./total-asset-card";
import { WalletPerformanceChart } from "./wallet-performance-chart";


export default function Wallet(){
  return (
    <div className="grid grid-cols-12 gap-6">
      <h1 className="text-3xl text-foreground font-bold">Carteira</h1>
      <div className="col-span-12 gap-6 grid grid-cols-2" >
        <TotalAssetCard />
        <LastestTradeTable />
      </div>
      <div className="col-span-12 gap-6 grid grid-cols-2" >
        <CompositionChart />
        <WalletPerformanceChart />
      </div>
      <div className="col-span-12">
        <AssetsTable />
      </div>
    </div>
  )
}
