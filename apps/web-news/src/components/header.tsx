"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Menu, 
  X, 
  Search, 
  Globe,
  BarChart3,
  DollarSign,
  Bitcoin,
  // Calculator,
  // Users,
  ChevronDown
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSearchTracking } from "@/components/analytics/article-tracker";
import { FinancialAnalytics } from "@/lib/analytics";

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
    label: "Economia", 
    href: "/economia",
    icon: Globe,
    submenu: [
      { label: "Brasil", href: "/economia/brasil" },
      { label: "Internacional", href: "/economia/internacional" },
      { label: "Política Econômica", href: "/economia/politica" },
      { label: "Indicadores", href: "/economia/indicadores" }
    ]
  },
  // { 
  //   label: "Colunas", 
  //   href: "/colunas",
  //   icon: Users,
  //   submenu: [
  //     { label: "Análise Técnica", href: "/colunas/analise-tecnica" },
  //     { label: "Estratégias", href: "/colunas/estrategias" },
  //     { label: "Opiniões", href: "/colunas/opinioes" }
  //   ]
  // },
  { 
    label: "Cripto", 
    href: "/cripto",
    icon: Bitcoin
  },
  // { 
  //   label: "Ferramentas", 
  //   href: "/ferramentas",
  //   icon: Calculator,
  //   submenu: [
  //     { label: "Simulador de Investimentos", href: "/ferramentas/simulador" },
  //     { label: "Calculadora de Renda Fixa", href: "/ferramentas/renda-fixa" },
  //     { label: "Conversor de Moedas", href: "/ferramentas/conversor" }
  //   ]
  // }
];


export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const trackSearch = useSearchTracking();

  // Função para rastrear cliques de navegação
  const handleNavClick = (label: string, href: string, type: 'main' | 'submenu' = 'main') => {
    FinancialAnalytics.trackEvent({
      action: 'navigation_click',
      category: 'navigation',
      label: `${type}_${label}`,
      custom_parameters: {
        nav_item: label,
        nav_href: href,
        nav_type: type
      }
    });
  };

  // Função para rastrear pesquisas
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      trackSearch(searchQuery, 0); // 0 = resultados simulados
      // Aqui implementaria a lógica real de busca
      console.log('Pesquisando:', searchQuery);
    }
  };

  // Função para rastrear toggle do menu mobile
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    FinancialAnalytics.trackEvent({
      action: isMobileMenuOpen ? 'mobile_menu_close' : 'mobile_menu_open',
      category: 'navigation',
      label: 'mobile_menu_toggle'
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 shadow-sm">
      

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-100 dark:to-gray-200 rounded-xl flex items-center justify-center shadow-lg">
              <DollarSign className="w-6 h-6 text-white dark:text-gray-900 font-bold" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">iAssets</span>
              <span className="text-xs text-slate-600 dark:text-slate-400 -mt-1 font-medium">Portal Financeiro</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigationItems.map((item) => (
              <div key={item.label}>
                {item.submenu ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="font-medium text-slate-700 dark:text-slate-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <item.icon className="w-4 h-4 mr-2" />
                        {item.label}
                        <ChevronDown className="w-4 h-4 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                      {item.submenu.map((subItem) => (
                        <DropdownMenuItem key={subItem.label} asChild>
                          <Link 
                            href={subItem.href} 
                            className="w-full cursor-pointer"
                            onClick={() => handleNavClick(subItem.label, subItem.href, 'submenu')}
                          >
                            {subItem.label}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link 
                    href={item.href}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 text-slate-700 dark:text-slate-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => handleNavClick(item.label, item.href, 'main')}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            
            {/* Search - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:block relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="search"
                placeholder="Buscar notícias..."
                className="pl-10 w-64 border-slate-200 dark:border-slate-700 focus:border-gray-900 dark:focus:border-gray-100 bg-slate-50 dark:bg-slate-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

  

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={handleMobileMenuToggle}
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
        <div className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-lg">
          <div className="container mx-auto px-4 py-6 space-y-4">
            
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="search"
                placeholder="Buscar notícias..."
                className="pl-10 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <div key={item.label} className="space-y-1">
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium"
                    onClick={() => {
                      handleNavClick(item.label, item.href, 'main');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                  
                  {/* Mobile Submenu */}
                  {item.submenu && (
                    <div className="ml-8 space-y-1">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                          onClick={() => {
                            handleNavClick(subItem.label, subItem.href, 'submenu');
                            setIsMobileMenuOpen(false);
                          }}
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