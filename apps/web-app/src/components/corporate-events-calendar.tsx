"use client"

import { Calendar } from "./ui/calendar";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { useState } from "react";

export function CorporateEventsCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const events = [
    { date: new Date(2024, 7, 15), ticker: "PETR4", type: "dividend", description: "Pagamento de Dividendos" },
    { date: new Date(2024, 7, 18), ticker: "VALE3", type: "earnings", description: "Divulgação de Resultados" },
    { date: new Date(2024, 7, 22), ticker: "ITUB4", type: "meeting", description: "Assembleia de Acionistas" },
    { date: new Date(2024, 7, 25), ticker: "BBDC4", type: "dividend", description: "Data Ex-Dividendo" },
    { date: new Date(2024, 8, 5), ticker: "WEGE3", type: "earnings", description: "Divulgação de Resultados" }
  ];
  
  const selectedDateEvents = events.filter(
    event => date && event.date.toDateString() === date.toDateString()
  );
  
  const eventDates = events.map(event => event.date.toDateString());
  
  return (
    <div className="space-y-4">
      <h4 className="text-base font-semibold">Calendário de Eventos Corporativos</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="border rounded-lg p-3"
          modifiers={{
            event: (date) => eventDates.includes(date.toDateString())
          }}
          modifiersStyles={{
            event: { fontWeight: 'bold', textDecoration: 'underline' }
          }}
        />
        
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <h5 className="font-medium">
                {date ? date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : 'Selecione uma data'}
              </h5>
              
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-3 mt-4">
                  {selectedDateEvents.map((event, index) => (
                    <div key={index} className="flex items-start gap-2 pb-2 border-b last:border-0">
                      <Badge variant={
                        event.type === 'dividend' ? 'default' : 
                        event.type === 'earnings' ? 'secondary' : 'outline'
                      }>
                        {event.ticker}
                      </Badge>
                      <div>
                        <p className="text-sm font-medium">{event.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {event.type === 'dividend' ? 'Dividendos' : 
                           event.type === 'earnings' ? 'Resultados' : 'Assembleia'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground mt-4">
                  Nenhum evento programado para esta data.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 