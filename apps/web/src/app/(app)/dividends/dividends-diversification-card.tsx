
"use client"

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

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
  { month: "Energia elétrica", desktop: 186 },
  { month: "Minerais metálicos", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 273 },
  { month: "May", desktop: 209 },
  { month: "Minerios siderúrgicos", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function DividendsDiversificationCard() {
  return (
    <Card>
      <CardHeader className="flex pb-0 items-center gap-2 space-y-0 py-5 sm:flex-row">
      <div className="grid flex-1 gap-1 text-center sm:text-left">
        <CardTitle className="text-base text-foreground font-semibold">Diversificação</CardTitle>
        <CardDescription className="text-xs text-muted-foreground font-medium">Diversificação dos proventos recebidos</CardDescription>
      </div>
      <div className="flex items-center justify-center gap-2 ">
        <Select value={"stocks"}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="stocks" className="rounded-lg">
              Ações
            </SelectItem>
            <SelectItem value="ETF" className="rounded-lg">
              FII
            </SelectItem>
            <SelectItem value="fixed" className="rounded-lg">
              Renda fixa
            </SelectItem>
            <SelectItem value="all" className="rounded-lg">
              Todos
            </SelectItem>
          </SelectContent>
        </Select>
        </div>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid />
            <Radar
              dataKey="desktop"
              fill="var(--color-desktop)"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
