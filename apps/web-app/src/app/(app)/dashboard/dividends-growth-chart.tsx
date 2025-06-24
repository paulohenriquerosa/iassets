"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"

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
  "2023": {
    label: "2023",
    color: "hsl(var(--chart-1))",
  },
  "2024": {
    label: "2024",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function DividendsGrowthChart() {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-4">
        <div>
          <h4 className="text-base text-foreground font-semibold">Evolução dos Proventos</h4>
          <p className="text-xs text-muted-foreground">Evolução dos proventos recebidos em comparação ao último ano</p>
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
          <BarChart 
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
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Legend />
            <Bar name="2023" dataKey="2023" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
            <Bar name="2024" dataKey="2024" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
