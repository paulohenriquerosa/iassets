"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const description = "A multiple bar chart"

const chartData = [
  { month: "Janeiro", "2023": 186, "2024": 80 },
  { month: "Fevereiro", "2023": 305, "2024": 200 },
  { month: "Março", "2023": 237, "2024": 120 },
  { month: "Abril", "2023": 73, "2024": 190 },
  { month: "Maio", "2023": 209, "2024": 130 },
  { month: "Junho", "2023": 414, "2024": 180 },
  { month: "Julho", "2023": 514, "2024": 340 },
  { month: "Agosto", "2023": 414, "2024": 380 },
  { month: "Setembro", "2023": 614, "2024": 520 },
  { month: "Outubro", "2023": 740, "2024": 600 },
  { month: "Novembro", "2023": 394, "2024": 110 },
  { month: "Dezembro", "2023": 300, "2024": 220 },
]

const chartConfig = {
  desktop: {
    label: "2023",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "2024",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function DividendsGrowthChart() {
  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle className="text-base text-foreground font-semibold">Evolução dos Proventos</CardTitle>
          <CardDescription className="text-xs text-muted-foreground font-medium">Evolução dos proventos recebidos em comparação ao último ano</CardDescription>
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
        <ChartContainer config={chartConfig} className="max-h-[450px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
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
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="2023" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="2024" fill="var(--color-mobile)" radius={4} />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
