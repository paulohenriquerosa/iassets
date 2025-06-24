"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";

type AlertType = "price" | "dividend" | "volume" | "news";

type Alert = {
  id: string;
  type: AlertType;
  asset: string;
  condition: "above" | "below" | "equals";
  value: number;
  active: boolean;
};

export function CustomAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      type: "price",
      asset: "PETR4",
      condition: "above",
      value: 35.5,
      active: true
    },
    {
      id: "2",
      type: "dividend",
      asset: "VALE3",
      condition: "above",
      value: 2.5,
      active: true
    },
    {
      id: "3",
      type: "price",
      asset: "ITUB4",
      condition: "below",
      value: 25.0,
      active: false
    }
  ]);

  const [newAlert, setNewAlert] = useState<Omit<Alert, "id" | "active">>({
    type: "price",
    asset: "",
    condition: "above",
    value: 0
  });

  const handleAddAlert = () => {
    if (!newAlert.asset || newAlert.value <= 0) return;
    
    const alert: Alert = {
      id: Date.now().toString(),
      ...newAlert,
      active: true
    };
    
    setAlerts([...alerts, alert]);
    setNewAlert({
      type: "price",
      asset: "",
      condition: "above",
      value: 0
    });
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const handleToggleAlert = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, active: !alert.active } : alert
    ));
  };

  const getAlertTypeLabel = (type: AlertType) => {
    switch (type) {
      case "price":
        return "Preço";
      case "dividend":
        return "Dividendo";
      case "volume":
        return "Volume";
      case "news":
        return "Notícias";
      default:
        return type;
    }
  };

  const getConditionLabel = (condition: string) => {
    switch (condition) {
      case "above":
        return "acima de";
      case "below":
        return "abaixo de";
      case "equals":
        return "igual a";
      default:
        return condition;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Alertas Personalizados</CardTitle>
        <CardDescription>Configure alertas para monitorar seus ativos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-5">
            <div>
              <Label htmlFor="alert-type">Tipo</Label>
              <Select 
                value={newAlert.type} 
                onValueChange={(value: AlertType) => setNewAlert({...newAlert, type: value})}
              >
                <SelectTrigger id="alert-type">
                  <SelectValue placeholder="Tipo de alerta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price">Preço</SelectItem>
                  <SelectItem value="dividend">Dividendo</SelectItem>
                  <SelectItem value="volume">Volume</SelectItem>
                  <SelectItem value="news">Notícias</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="alert-asset">Ativo</Label>
              <Input 
                id="alert-asset" 
                placeholder="Ex: PETR4" 
                value={newAlert.asset}
                onChange={(e) => setNewAlert({...newAlert, asset: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="alert-condition">Condição</Label>
              <Select 
                value={newAlert.condition} 
                onValueChange={(value: "above" | "below" | "equals") => setNewAlert({...newAlert, condition: value})}
              >
                <SelectTrigger id="alert-condition">
                  <SelectValue placeholder="Condição" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="above">Acima de</SelectItem>
                  <SelectItem value="below">Abaixo de</SelectItem>
                  <SelectItem value="equals">Igual a</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="alert-value">Valor</Label>
              <Input 
                id="alert-value" 
                type="number" 
                placeholder="Valor" 
                value={newAlert.value || ""}
                onChange={(e) => setNewAlert({...newAlert, value: parseFloat(e.target.value)})}
              />
            </div>
            
            <div className="flex items-end">
              <Button onClick={handleAddAlert} className="w-full">Adicionar Alerta</Button>
            </div>
          </div>
          
          <div className="border rounded-md">
            <div className="p-4 border-b bg-muted/50">
              <h3 className="font-medium">Alertas Configurados</h3>
            </div>
            <div className="divide-y">
              {alerts.length > 0 ? (
                alerts.map(alert => (
                  <div key={alert.id} className="p-4 flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${alert.active ? 'bg-green-500' : 'bg-gray-300'}`} />
                        <span className="font-medium">{alert.asset}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {getAlertTypeLabel(alert.type)} {getConditionLabel(alert.condition)} {alert.type === "price" || alert.type === "dividend" ? `R$ ${alert.value.toFixed(2)}` : alert.value}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={alert.active}
                          onCheckedChange={() => handleToggleAlert(alert.id)}
                          id={`alert-active-${alert.id}`}
                        />
                        <Label htmlFor={`alert-active-${alert.id}`} className="cursor-pointer">
                          {alert.active ? "Ativo" : "Inativo"}
                        </Label>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteAlert(alert.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  Nenhum alerta configurado.
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 