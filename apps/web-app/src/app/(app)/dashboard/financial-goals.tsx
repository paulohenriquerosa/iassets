"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Goal = {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
  color: string;
};

export function FinancialGoals() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      name: "Reserva de Emergência",
      target: 50000,
      current: 35000,
      deadline: "Dez 2023",
      color: "bg-blue-500"
    },
    {
      id: "2",
      name: "Aposentadoria",
      target: 1000000,
      current: 250000,
      deadline: "Dez 2040",
      color: "bg-green-500"
    },
    {
      id: "3",
      name: "Viagem Internacional",
      target: 15000,
      current: 9000,
      deadline: "Jul 2024",
      color: "bg-purple-500"
    }
  ]);

  const calculateProgress = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
        <div>
          <h4 className="text-base font-semibold">Metas Financeiras</h4>
          <p className="text-xs text-muted-foreground">Acompanhe o progresso das suas metas</p>
        </div>
        <Button variant="outline" size="sm" className="gap-1">
          <PlusCircle className="h-4 w-4" />
          <span>Nova Meta</span>
        </Button>
      </div>
      
      <div className="space-y-4">
        {goals.map(goal => (
          <div key={goal.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <h5 className="font-medium text-sm">{goal.name}</h5>
                <div className="text-xs text-muted-foreground">
                  Meta: {formatCurrency(goal.target)} • Prazo: {goal.deadline}
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-sm">
                  {calculateProgress(goal.current, goal.target)}%
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatCurrency(goal.current)} de {formatCurrency(goal.target)}
                </div>
              </div>
            </div>
            <div className={cn("relative h-2 w-full overflow-hidden rounded-full bg-secondary", goal.color)}>
              <Progress 
                value={calculateProgress(goal.current, goal.target)} 
                className="h-2"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 