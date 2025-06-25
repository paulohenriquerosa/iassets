"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  X, 
  Search, 
  TrendingUp, 
  TrendingDown,
  Globe,
  Zap,
  BarChart3,
  DollarSign,
  Bitcoin,
  Bell,
  User
} from "lucide-react";

const navigationItems = [
  { 
    label: "Mercados", 
    href: "/mercados",
    icon: BarChart3,
    submenu: [
      { label: "Ações Brasileiras", href: "/mercados/acoes-brasileiras" },
      { label: "Ações Americanas", href: "/mercados/acoes-americanas" },
      { label: "Fundos Imobiliários", href: "/mercados/fiis" },
      { label: "Renda Fixa", href: "/mercados/renda-fixa" }
    ]
  },
  { 
    label: "Criptomoedas", 
    href: "/crypto",
    icon: Bitcoin,
    submenu: [
      { label: "Bitcoin", href: "/crypto/bitcoin" },
      { label: "Ethereum", href: "/crypto/ethereum" },
      { label: "Altcoins", href: "/crypto/altcoins" },
      { label: "DeFi", href: "/crypto/defi" }
    ]
  },
  { 
    label: "Internacional", 
    href: "/internacional",
    icon: Globe,
    submenu: [
      { label: "Wall Street", href: "/internacional/wall-street" },
      { label: "Europa", href: "/internacional/europa" },
      { label: "Ásia", href: "/internacional/asia" }
    ]
  },
  { 
    label: "Análises", 
    href: "/analises",
    icon: TrendingUp
  },
  { 
    label: "Educação", 
    href: "/educacao",
    icon: Zap
  }
];

// Mock data for live prices
const liveData = [
  { symbol: "IBOV", price: "129.847", change: "+0.85%", isPositive: true },
  { symbol: "USD/BRL", price: "5.51", change: "-0.12%", isPositive: false },
  { symbol: "BTC", price: "$67.234", change: "+2.45%", isPositive: true },
  { symbol: "ETH", price: "$3.456", change: "+1.23%", isPositive: true }
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      {/* Live Ticker */}
      <div className="bg-primary/5 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-6 py-2 overflow-x-auto">
            <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
              AO VIVO
            </span>
            {liveData.map((item) => (
              <div key={item.symbol} className="flex items-center space-x-2 whitespace-nowrap">
                <span className="text-xs font-medium text-foreground">
                  {item.symbol}
                </span>
                <span className="text-xs font-medium text-foreground">
                  {item.price}
                </span>
                <span className={`text-xs font-medium flex items-center gap-1 ${
                  item.isPositive ? "text-green-600" : "text-red-600"
                }`}>
                  {item.isPositive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary-foreground font-bold" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground">iAssets</span>
              <span className="text-xs text-muted-foreground -mt-1">Investimentos</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => setActiveSubmenu(item.label)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
                
                {/* Submenu */}
                {item.submenu && activeSubmenu === item.label && (
                  <div className="absolute top-full left-0 w-56 mt-1 bg-popover border border-border rounded-lg shadow-lg py-2 z-50">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar notícias..."
                className="pl-10 w-64"
              />
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-4 h-4" />
              <Badge className="absolute -top-1 -right-1 w-2 h-2 p-0 bg-red-500"></Badge>
            </Button>

            {/* User Menu */}
            <Button variant="ghost" size="sm">
              <User className="w-4 h-4" />
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar notícias..."
                className="pl-10"
              />
            </div>

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                  
                  {/* Mobile Submenu */}
                  {item.submenu && (
                    <div className="ml-6 space-y-1">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors rounded-md"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
} 