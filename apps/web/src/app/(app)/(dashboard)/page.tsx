import { AssetGrowthChart } from "./asset-growth-chart";
import { CompositionChart } from "./composition-chart";
import { DividendsGrowthChart } from "./dividends-growth-chart";
import { TotalAssetsCard } from "./total-assets-card";
import { TotalDividendsCard } from "./total-dividends-card";
import { TotalInvestedCard } from "./total-invested-card";
import { TotalMounthDividendsCard } from "./total-mounth-dividends-card";

export default function Dashbaord(){
  return (
    <div className="grid grid-cols-12 gap-6">
      <h1 className="text-3xl text-foreground font-bold">Dashboard</h1>
      <div className="col-span-12 gap-6 grid grid-cols-4" >
        <TotalAssetsCard />
        <TotalMounthDividendsCard />
        <TotalInvestedCard />
        <TotalDividendsCard />
      </div>
      <div className="col-span-8">
        <AssetGrowthChart />
      </div>
      <div className="col-span-4">
        <CompositionChart />
      </div>
      <div className="col-span-12">
        <DividendsGrowthChart />
      </div>
    </div>
  )
}
