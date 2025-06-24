"use client"

import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


const chartData = [
  { month: "Janeiro", wallet: 16000, cdi: 10000, ibov: 12000, sp: 13000 },
  { month: "Fevereiro", wallet: 17000, cdi: 16000, ibov: 12000, sp: 18000 },
  { month: "Março", wallet: 14000,cdi: 13500, ibov: 16000, sp: 15000  },
  { month: "Abril", wallet: 19000, cdi: 18000, ibov: 21000, sp: 21500  },
  { month: "Maio", wallet: 11000, cdi: 10500, ibov: 12500, sp: 3500  },
  { month: "Junho", wallet: 21000, cdi: 22000, ibov: 22500, sp: 25000  },
  { month: "Julho", wallet: 20000, cdi: 20000, ibov: 22000, sp: 22500  },
  { month: "Agosto", wallet: 23000, cdi: 24000, ibov: 24500, sp: 20000  },
  { month: "Setembro", wallet: 24000, cdi: 21000, ibov: 20500, sp: 27000  },
  { month: "Outubro", wallet: 22000, cdi: 24000, ibov: 24500, sp: 30000  },
  { month: "Novembro", wallet: 26000, cdi: 21000, ibov: 23000, sp: 31000  },
  { month: "Dezembro", wallet: 22000, cdi: 19000, ibov: 25500, sp: 30500  },
]

const chartConfig = {
  wallet: {
    label: "Carteira",
    color: "hsl(var(--chart-1))",
  },
  cdi: {
    label: "CDI",
    color: "hsl(var(--chart-2))",
  },
  ibov: {
    label: "IBOV",
    color: "hsl(var(--chart-3))",
  },
  sp: {
    label: "S&P 500",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export function DividendsPerformanceChart() {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-4">
        <div>
          <h4 className="text-base text-foreground font-semibold">Desempenho</h4>
          <p className="text-xs text-muted-foreground">Desempenho da carteira</p>
        </div>
        <Select defaultValue="1y">
          <SelectTrigger
            className="w-[160px] rounded-lg"
            aria-label="Selecionar período"
          >
            <SelectValue placeholder="Selecionar período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1y">Último 1 ano</SelectItem>
            <SelectItem value="3y">Últimos 3 anos</SelectItem>
            <SelectItem value="5y">Últimos 5 anos</SelectItem>
            <SelectItem value="all">Tudo</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 10,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={80}
              tickFormatter={(value: number) =>
                value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Line
              name="Carteira"
              dataKey="wallet"
              type="monotone"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
            <Line
              name="CDI"
              dataKey="cdi"
              type="monotone"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
            <Line
              name="IBOV"
              dataKey="ibov"
              type="monotone"
              stroke="hsl(var(--chart-3))"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
            <Line
              name="S&P 500"
              dataKey="sp"
              type="monotone"
              stroke="hsl(var(--chart-4))"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
