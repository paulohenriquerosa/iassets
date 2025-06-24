import { AssetGrowthChart } from "./asset-growth-chart";
import { CompositionChart } from "./composition-chart";
import { DividendsGrowthChart } from "./dividends-growth-chart";
import { TotalAssetsCard } from "./total-assets-card";
import { TotalDividendsCard } from "./total-dividends-card";
import { TotalInvestedCard } from "./total-invested-card";
import { TotalMounthDividendsCard } from "./total-mounth-dividends-card";

import { RiskAnalysisChart } from "./risk-analysis-chart";
import { AssetComparator } from "../wallet/asset-comparator";
import { FinancialGoals } from "./financial-goals";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl text-foreground font-bold">Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Última atualização: {new Date().toLocaleDateString("pt-BR")}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <TotalAssetsCard />
        <TotalInvestedCard />
        <TotalDividendsCard />
        <TotalMounthDividendsCard />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow">
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-4">
                Crescimento de Ativos
              </h3>
              <AssetGrowthChart />
            </div>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow">
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-4">
                Crescimento de Dividendos
              </h3>
              <DividendsGrowthChart />
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow">
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-4">
                Composição da Carteira
              </h3>
              <CompositionChart />
            </div>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow">
            <div className="p-6">
              <RiskAnalysisChart />
            </div>
          </div>
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
              <FinancialGoals />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
