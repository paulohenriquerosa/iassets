"use client"

import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { PlusCircle, Bell, ArrowUp, ArrowDown, DollarSign, Percent } from "lucide-react";

interface Alert {
  id: number;
  ticker: string;
  type: "price" | "dividend";
  condition: "above" | "below";
  value: number;
  active: boolean;
}

export function CustomAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([
    { id: 1, ticker: "PETR4", type: "price", condition: "above", value: 36.50, active: true },
    { id: 2, ticker: "VALE3", type: "price", condition: "below", value: 65.00, active: true },
    { id: 3, ticker: "ITUB4", type: "dividend", condition: "above", value: 0.25, active: false }
  ]);

  const toggleAlert = (id: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, active: !alert.active } : alert
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-base font-semibold">Alertas Personalizados</h4>
        <Button variant="outline" size="sm">
          <PlusCircle className="h-4 w-4 mr-2" />
          Novo Alerta
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {alerts.map((alert) => (
          <Card key={alert.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${alert.active ? 'bg-primary/10' : 'bg-muted'}`}>
                    {alert.type === 'price' ? 
                      <DollarSign className={`h-5 w-5 ${alert.active ? 'text-primary' : 'text-muted-foreground'}`} /> : 
                      <Percent className={`h-5 w-5 ${alert.active ? 'text-primary' : 'text-muted-foreground'}`} />
                    }
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{alert.ticker}</span>
                      {alert.condition === 'above' ? 
                        <ArrowUp className="h-4 w-4 text-green-500" /> : 
                        <ArrowDown className="h-4 w-4 text-red-500" />
                      }
                      <span>
                        {alert.type === 'price' ? 
                          alert.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 
                          `${alert.value.toFixed(2)}%`
                        }
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {alert.type === 'price' ? 'Alerta de preço' : 'Alerta de dividendo'} 
                      {alert.condition === 'above' ? ' acima de' : ' abaixo de'} 
                      {alert.type === 'price' ? 
                        ` ${alert.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}` : 
                        ` ${alert.value.toFixed(2)}%`
                      }
                    </p>
                  </div>
                </div>
                <Switch checked={alert.active} onCheckedChange={() => toggleAlert(alert.id)} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 