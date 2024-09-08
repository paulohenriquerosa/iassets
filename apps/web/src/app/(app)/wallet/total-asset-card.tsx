
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
  { month: "Janeiro", value: 16000 },
  { month: "Fevereiro", value: 17000 },
  { month: "Março", value: 14000 },
  { month: "Abril", value: 19000 },
  { month: "Maio", value: 11000 },
  { month: "Junho", value: 21000 },
  { month: "Julho", value: 20000 },
  { month: "Agosto", value: 23000 },
  { month: "Setembro", value: 24000 },
  { month: "Outubro", value: 22000 },
  { month: "Novembro", value: 26000 },
  { month: "Dezembro", value: 27000 },
]

const chartConfig = {
  value: {
    label: "value",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function TotalAssetCard() {
  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row">
      <div className="grid flex-1 gap-1 text-center sm:text-left">
        <CardTitle className="text-base text-foreground font-semibold">Evolução do Patrimônio</CardTitle> <CardDescription className="text-xs text-muted-foreground font-medium">Evolução patrimonial do últimos 12 meses</CardDescription>
      </div>
        <p className="text-xs text-muted-foreground">
          <span className="text-emerald-500 dark:text-emerald-400">+2%</span> de
          variação em 24h
        </p>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[250px] w-full">
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
              dataKey="value"
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
              dataKey="value"
              type="natural"
              stroke="var(--color-value)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-value)",
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
