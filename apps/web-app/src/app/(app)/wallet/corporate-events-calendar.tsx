"use client"

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type EventType = "dividend" | "jcp" | "split" | "meeting" | "earnings";

type CorporateEvent = {
  date: Date;
  symbol: string;
  type: EventType;
  description: string;
};

export function CorporateEventsCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<"calendar" | "list">("calendar");
  
  // Dados de exemplo para eventos corporativos
  const events: CorporateEvent[] = [
    {
      date: new Date(2023, 8, 5), // 5 de setembro de 2023
      symbol: "PETR4",
      type: "dividend",
      description: "Pagamento de dividendos de R$ 1,50 por ação"
    },
    {
      date: new Date(2023, 8, 12), // 12 de setembro de 2023
      symbol: "VALE3",
      type: "earnings",
      description: "Divulgação de resultados do 2º trimestre"
    },
    {
      date: new Date(2023, 8, 15), // 15 de setembro de 2023
      symbol: "ITUB4",
      type: "jcp",
      description: "Pagamento de JCP de R$ 0,75 por ação"
    },
    {
      date: new Date(2023, 8, 20), // 20 de setembro de 2023
      symbol: "BBDC4",
      type: "meeting",
      description: "Assembleia Geral Extraordinária"
    },
    {
      date: new Date(2023, 8, 25), // 25 de setembro de 2023
      symbol: "MGLU3",
      type: "split",
      description: "Split de 5:1"
    }
  ];

  // Função para verificar se uma data tem eventos
  const hasEventOnDay = (day: Date) => {
    return events.some(event => 
      event.date.getDate() === day.getDate() && 
      event.date.getMonth() === day.getMonth() && 
      event.date.getFullYear() === day.getFullYear()
    );
  };

  // Função para obter eventos de um dia específico
  const getEventsForDay = (day: Date | undefined) => {
    if (!day) return [];
    
    return events.filter(event => 
      event.date.getDate() === day.getDate() && 
      event.date.getMonth() === day.getMonth() && 
      event.date.getFullYear() === day.getFullYear()
    );
  };

  // Função para obter a cor do badge baseado no tipo de evento
  const getEventColor = (type: EventType) => {
    switch (type) {
      case "dividend":
        return "bg-green-500";
      case "jcp":
        return "bg-blue-500";
      case "split":
        return "bg-purple-500";
      case "meeting":
        return "bg-yellow-500";
      case "earnings":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  // Função para obter o nome do tipo de evento
  const getEventTypeName = (type: EventType) => {
    switch (type) {
      case "dividend":
        return "Dividendo";
      case "jcp":
        return "JCP";
      case "split":
        return "Split/Grupamento";
      case "meeting":
        return "Assembleia";
      case "earnings":
        return "Resultado";
      default:
        return type;
    }
  };

  // Ordenar eventos por data
  const sortedEvents = [...events].sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <CardTitle className="text-base">Calendário de Eventos Corporativos</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={view} onValueChange={(v) => setView(v as "calendar" | "list")}>
          <div className="flex justify-end mb-4">
            <TabsList className="grid w-[200px] grid-cols-2">
              <TabsTrigger value="calendar">Calendário</TabsTrigger>
              <TabsTrigger value="list">Lista</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="calendar" className="mt-0">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  modifiers={{
                    hasEvent: (day) => hasEventOnDay(day)
                  }}
                  modifiersClassNames={{
                    hasEvent: "bg-primary/10 font-bold"
                  }}
                />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium mb-2">
                  Eventos do dia {date?.toLocaleDateString('pt-BR')}
                </h3>
                <div className="space-y-2">
                  {getEventsForDay(date).length > 0 ? (
                    getEventsForDay(date).map((event, index) => (
                      <div key={index} className="p-2 border rounded-md">
                        <div className="flex items-center gap-2">
                          <Badge className={`${getEventColor(event.type)}`}>
                            {getEventTypeName(event.type)}
                          </Badge>
                          <span className="font-medium">{event.symbol}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">Nenhum evento para este dia.</p>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="list" className="mt-0">
            <div className="space-y-2">
              {sortedEvents.map((event, index) => (
                <div key={index} className="p-2 border rounded-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className={`${getEventColor(event.type)}`}>
                        {getEventTypeName(event.type)}
                      </Badge>
                      <span className="font-medium">{event.symbol}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {event.date.toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
} 