import { DividendsGrowthChart } from "../dashboard/dividends-growth-chart";
import { TotalDividendsCard } from "../dashboard/total-dividends-card";
import { TotalMounthDividendsCard } from "../dashboard/total-mounth-dividends-card";
import { DividendsCalendar } from "./dividends-calendar";
import { DividendsDiversificationCard } from "./dividends-diversification-card";
import { DividendsPerformanceChart } from "./dividends-performance-chart";
import { DividendForecastChart } from "./dividend-forecast-chart";

export default function Dividends() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl text-foreground font-bold">Proventos</h1>
        <div className="text-sm text-muted-foreground">
          Última atualização: {new Date().toLocaleDateString("pt-BR")}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow h-full">
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-4">
                Resumo de Proventos
              </h3>
              <div className="space-y-4">
                <TotalDividendsCard />
                <TotalMounthDividendsCard />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow h-full">
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-4">
                Diversificação de Proventos
              </h3>
              <div className="flex items-center justify-center h-[250px]">
                <DividendsDiversificationCard />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow h-full">
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-4">
                Calendário de Proventos
              </h3>
              <div className="overflow-x-auto">
                <DividendsCalendar />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-12">
          <div className="rounded-lg border bg-card text-card-foreground shadow">
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-4">
                Desempenho de Proventos
              </h3>
              <div className="h-[300px]">
                <DividendsPerformanceChart />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow">
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-4">
                Crescimento de Proventos
              </h3>
              <div className="h-[300px]">
                <DividendsGrowthChart />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow">
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-4">
                Previsão de Proventos
              </h3>
              <div className="h-[300px]">
                <DividendForecastChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
