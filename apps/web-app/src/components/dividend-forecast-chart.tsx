"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export function DividendForecastChart() {
  const forecastData = [
    { month: "Jan", historical: 200, forecast: 200 },
    { month: "Fev", historical: 220, forecast: 220 },
    { month: "Mar", historical: 190, forecast: 190 },
    { month: "Abr", historical: 240, forecast: 240 },
    { month: "Mai", historical: 280, forecast: 280 },
    { month: "Jun", historical: 250, forecast: 250 },
    { month: "Jul", historical: null, forecast: 270 },
    { month: "Ago", historical: null, forecast: 290 },
    { month: "Set", historical: null, forecast: 310 },
    { month: "Out", historical: null, forecast: 330 },
    { month: "Nov", historical: null, forecast: 350 },
    { month: "Dez", historical: null, forecast: 370 }
  ];

  return (
    <div className="w-full h-full">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-4">
        <div>
          <h4 className="text-base font-semibold">Previsão de Dividendos</h4>
          <p className="text-xs text-muted-foreground">Projeção para os próximos meses</p>
        </div>
        <Select defaultValue="conservative">
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Selecionar cenário" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="conservative">Conservador</SelectItem>
            <SelectItem value="moderate">Moderado</SelectItem>
            <SelectItem value="optimistic">Otimista</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={forecastData} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis 
              tickFormatter={(value) => 
                value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                })
              }
            />
            <Tooltip 
              formatter={(value) => [
                value ? value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }) : "N/A",
                ""
              ]}
              contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="historical" 
              name="Histórico" 
              stroke="hsl(var(--chart-1))" 
              strokeWidth={2} 
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="forecast" 
              name="Previsão" 
              stroke="hsl(var(--chart-2))" 
              strokeWidth={2} 
              strokeDasharray="5 5" 
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 