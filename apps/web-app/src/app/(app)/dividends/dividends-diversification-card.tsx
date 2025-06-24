"use client"

import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from "recharts"

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

export const description = "A radar chart"

const chartData = [
  { category: "Energia elétrica", value: 186 },
  { category: "Minerais metálicos", value: 305 },
  { category: "Bancos", value: 237 },
  { category: "Petróleo", value: 273 },
  { category: "Varejo", value: 209 },
  { category: "Siderurgia", value: 214 },
]

const chartConfig = {
  value: {
    label: "Valor",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function DividendsDiversificationCard() {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-4">
        <div>
          <h4 className="text-base text-foreground font-semibold">Diversificação</h4>
          <p className="text-xs text-muted-foreground">Diversificação dos proventos recebidos</p>
        </div>
        <Select defaultValue="stocks">
          <SelectTrigger
            className="w-[160px] rounded-lg"
            aria-label="Selecionar filtro"
          >
            <SelectValue placeholder="Filtrar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="stocks">Ações</SelectItem>
            <SelectItem value="ETF">FII</SelectItem>
            <SelectItem value="fixed">Renda fixa</SelectItem>
            <SelectItem value="all">Todos</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={chartData} margin={{ top: 10, right: 30, left: 30, bottom: 10 }}>
            <PolarGrid />
            <PolarAngleAxis dataKey="category" tick={{ fill: 'var(--foreground)', fontSize: 12 }} />
            <Radar
              name="Valor"
              dataKey="value"
              stroke="hsl(var(--chart-1))"
              fill="hsl(var(--chart-1))"
              fillOpacity={0.6}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
