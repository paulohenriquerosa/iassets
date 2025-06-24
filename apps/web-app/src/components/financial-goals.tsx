"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { Progress } from "./ui/progress";

// Interface para as metas financeiras
interface FinancialGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  category: "investment" | "savings" | "dividend" | "other";
}

// Dados de exemplo para metas financeiras
const mockGoals: FinancialGoal[] = [
  {
    id: "1",
    title: "Reserva de emergência",
    targetAmount: 30000,
    currentAmount: 15000,
    deadline: new Date(2024, 11, 31),
    category: "savings",
  },
  {
    id: "2",
    title: "Renda passiva de R$1000/mês",
    targetAmount: 200000,
    currentAmount: 75000,
    deadline: new Date(2025, 5, 30),
    category: "dividend",
  },
  {
    id: "3",
    title: "Diversificação internacional",
    targetAmount: 50000,
    currentAmount: 10000,
    deadline: new Date(2024, 8, 30),
    category: "investment",
  },
];

// Função para formatar valores monetários
function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

// Função para calcular o progresso da meta
function calculateProgress(current: number, target: number): number {
  return Math.min(Math.round((current / target) * 100), 100);
}

// Função para calcular dias restantes
function calculateRemainingDays(deadline: Date): number {
  const today = new Date();
  const diffTime = deadline.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Componente para exibir uma meta individual
function GoalCard({ goal }: { goal: FinancialGoal }) {
  const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
  const remainingDays = calculateRemainingDays(goal.deadline);
  
  // Determinar a cor da barra de progresso com base no progresso
  let progressColor = "bg-blue-500";
  if (progress < 25) {
    progressColor = "bg-red-500";
  } else if (progress < 50) {
    progressColor = "bg-orange-500";
  } else if (progress < 75) {
    progressColor = "bg-yellow-500";
  } else {
    progressColor = "bg-green-500";
  }
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{goal.title}</CardTitle>
            <CardDescription>
              Meta: {formatCurrency(goal.targetAmount)}
            </CardDescription>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs ${
            remainingDays > 90 ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" :
            remainingDays > 30 ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" :
            "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}>
            {remainingDays > 0 ? `${remainingDays} dias restantes` : "Prazo vencido"}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{formatCurrency(goal.currentAmount)}</span>
            <span className="text-muted-foreground">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-muted-foreground">
              Faltam {formatCurrency(goal.targetAmount - goal.currentAmount)}
            </span>
            <Button variant="outline" size="sm">
              Atualizar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function FinancialGoals() {
  const [goals, setGoals] = useState<FinancialGoal[]>(mockGoals);
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Metas Financeiras</h2>
        <Button variant="outline" size="sm">
          <PlusCircle className="h-4 w-4 mr-2" />
          Nova Meta
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>
    </div>
  );
} 