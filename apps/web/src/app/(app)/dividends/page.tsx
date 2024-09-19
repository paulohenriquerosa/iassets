import { DividendsGrowthChart } from "../(dashboard)/dividends-growth-chart";
import { TotalDividendsCard } from "../(dashboard)/total-dividends-card";
import { TotalMounthDividendsCard } from "../(dashboard)/total-mounth-dividends-card";
import { DividendsCalendar } from "./dividends-calendar";
import { DividendsDiversificationCard } from "./dividends-diversification-card";
import { DividendsPerformanceChart } from "./dividends-performance-chart";


export default function Dividends(){
  return (
    <div className="space-y-6">
    <h1 className="text-3xl text-foreground font-bold">Proventos</h1>
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-8 space-y-6">
        <div className="flex gap-6" >
          <div className="flex flex-col justify-between gap-6 h-auto flex-auto">
            <TotalDividendsCard />
            <TotalMounthDividendsCard />
          </div>
              <div className="flex-auto">
                <DividendsDiversificationCard />
              </div>
        </div>
        <DividendsCalendar />
      </div>
      <div className="col-span-12" >
          <DividendsPerformanceChart />
      </div>
      <div className="col-span-12" >
          <DividendsGrowthChart />
      </div>
    </div>
    </div>
  )
}
