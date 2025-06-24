"use client"

import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip } from "recharts";

export function RiskAnalysisChart() {
  const riskData = [
    { category: "Volatilidade", value: 65 },
    { category: "Concentração", value: 45 },
    { category: "Correlação", value: 70 },
    { category: "Liquidez", value: 80 },
    { category: "Exposição Cambial", value: 30 },
    { category: "Exposição Setorial", value: 55 }
  ];

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-base font-semibold">Análise de Risco</h4>
          <p className="text-xs text-muted-foreground">Métricas de risco da sua carteira</p>
        </div>
      </div>
      
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={riskData} margin={{ top: 10, right: 30, left: 30, bottom: 10 }}>
            <PolarGrid />
            <PolarAngleAxis dataKey="category" tick={{ fill: 'var(--foreground)', fontSize: 12 }} />
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Risco']}
              contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
            />
            <Radar
              name="Risco"
              dataKey="value"
              stroke="hsl(var(--destructive))"
              fill="hsl(var(--destructive))"
              fillOpacity={0.4}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 