"use client"

import { Bell } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useState } from "react";

// Tipos de notificações
type NotificationType = "dividend" | "price" | "news" | "system";

// Interface para as notificações
interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  date: Date;
  read: boolean;
}

// Dados de exemplo para notificações
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "dividend",
    title: "Dividendo PETR4",
    message: "Você receberá R$ 0,50 por ação de PETR4 amanhã.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 horas atrás
    read: false,
  },
  {
    id: "2",
    type: "price",
    title: "Alta em VALE3",
    message: "VALE3 subiu 5% nas últimas 24 horas.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 horas atrás
    read: false,
  },
  {
    id: "3",
    type: "news",
    title: "Notícia sobre ITUB4",
    message: "Itaú anuncia novo programa de recompra de ações.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 dia atrás
    read: true,
  },
  {
    id: "4",
    type: "system",
    title: "Atualização do sistema",
    message: "Nova funcionalidade de análise de carteira disponível.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 dias atrás
    read: true,
  },
];

// Função para formatar a data relativa
function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds} segundos atrás`;
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutos atrás`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} horas atrás`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} dias atrás`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  return `${diffInMonths} meses atrás`;
}

// Componente de ícone para cada tipo de notificação
function NotificationIcon({ type }: { type: NotificationType }) {
  switch (type) {
    case "dividend":
      return <span className="text-green-500 text-lg">$</span>;
    case "price":
      return <span className="text-blue-500 text-lg">📈</span>;
    case "news":
      return <span className="text-amber-500 text-lg">📰</span>;
    case "system":
      return <span className="text-purple-500 text-lg">⚙️</span>;
    default:
      return <span className="text-gray-500 text-lg">•</span>;
  }
}

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  
  // Contador de notificações não lidas
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Função para marcar todas as notificações como lidas
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };
  
  // Função para marcar uma notificação como lida
  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-2">
          <DropdownMenuLabel>Notificações</DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-1 text-xs"
              onClick={markAllAsRead}
            >
              Marcar todas como lidas
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`flex flex-col items-start p-3 ${
                  !notification.read ? "bg-muted/50" : ""
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex w-full justify-between">
                  <div className="flex items-center gap-2">
                    <NotificationIcon type={notification.type} />
                    <span className="font-medium">{notification.title}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatRelativeTime(notification.date)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {notification.message}
                </p>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Nenhuma notificação
            </div>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center text-sm font-medium">
          Ver todas as notificações
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 