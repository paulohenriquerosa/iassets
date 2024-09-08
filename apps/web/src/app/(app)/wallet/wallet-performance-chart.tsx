
"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

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
    label: "wallet",
    color: "hsl(var(--chart-1))",
  },
  cdi: {
    label: "cdi",
    color: "hsl(var(--chart-2))",
  },
  ibov: {
    label: "ibov",
    color: "hsl(var(--chart-3))",
  },
  sp: {
    label: "sp",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export function WalletPerformanceChart() {
  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row">
      <div className="grid flex-1 gap-1 text-center sm:text-left">
        <CardTitle className="text-base text-foreground font-semibold">Desempenho</CardTitle>
        <CardDescription className="text-xs text-muted-foreground font-medium">Desempenho da carteira</CardDescription>
      </div>
        <Select value={"90d"}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              último 1 ano
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              últimos 3 anos
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              últimos 5 anos 
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Tudo
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[300px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
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
                })
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="wallet"
              type="natural"
              stroke="var(--color-wallet)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-wallet)",
              }}
              activeDot={{
                r: 6,
              }}
            />
            <Line
              dataKey="cdi"
              type="natural"
              stroke="var(--color-cdi)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-cdi)",
              }}
              activeDot={{
                r: 6,
              }}
            />
            <Line
              dataKey="ibov"
              type="natural"
              stroke="var(--color-ibov)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-ibov)",
              }}
              activeDot={{
                r: 6,
              }}
            />
            <Line
              dataKey="sp"
              type="natural"
              stroke="var(--color-sp)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-sp)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
