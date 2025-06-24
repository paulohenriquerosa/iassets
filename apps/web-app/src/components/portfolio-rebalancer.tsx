"use client"

import { useState } from "react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

export function PortfolioRebalancer() {
  const [allocation, setAllocation] = useState([
    { name: "Ações BR", value: 40, color: "hsl(var(--chart-1))" },
    { name: "FIIs", value: 20, color: "hsl(var(--chart-2))" },
    { name: "Ações EUA", value: 25, color: "hsl(var(--chart-3))" },
    { name: "Renda Fixa", value: 15, color: "hsl(var(--chart-4))" }
  ]);

  const handleSliderChange = (index: number, newValue: number) => {
    const total = allocation.reduce((sum, item, i) => 
      i === index ? sum : sum + item.value, 0) + newValue;
    
    if (total <= 100) {
      const newAllocation = [...allocation];
      newAllocation[index].value = newValue;
      setAllocation(newAllocation);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-base font-semibold">Simulador de Rebalanceamento</h4>
        <Button variant="outline" size="sm">Aplicar</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {allocation.map((item, index) => (
            <div key={item.name} className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">{item.name}</span>
                <span className="text-sm font-medium">{item.value}%</span>
              </div>
              <Slider 
                value={[item.value]} 
                max={100}
                step={1}
                onValueChange={(value) => handleSliderChange(index, value[0])}
              />
            </div>
          ))}
          <div className="flex justify-between pt-2 border-t">
            <span>Total</span>
            <span className={`font-medium ${allocation.reduce((sum, item) => sum + item.value, 0) !== 100 ? 'text-destructive' : ''}`}>
              {allocation.reduce((sum, item) => sum + item.value, 0)}%
            </span>
          </div>
        </div>
        
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={allocation}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {allocation.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, '']}
                contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
} 