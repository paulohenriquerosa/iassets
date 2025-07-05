"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "../assets/logo.png";
import {
  Menu,
  X,
  Search,
} from "lucide-react";
import { useSearchTracking } from "@/components/analytics/article-tracker";
import { FinancialAnalytics } from "@/lib/analytics";

interface NavItem { label: string; href: string; }

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const trackSearch = useSearchTracking();
  const router = useRouter();

  // fetch categories on mount
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        const items: NavItem[] = (data.categories as string[]).map((cat: string) => ({
          label: cat,
          href: `/categorias/${cat
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .trim()}`,
        }));
        setNavItems(items);
      })
      .catch(() => {});
  }, []);

  // Função para rastrear cliques de navegação
  const handleNavClick = (
    label: string,
    href: string,
    type: "main" | "submenu" = "main",
  ) => {
    FinancialAnalytics.trackEvent({
      action: "navigation_click",
      category: "navigation",
      label: `${type}_${label}`,
      custom_parameters: {
        nav_item: label,
        nav_href: href,
        nav_type: type,
      },
    });
  };

  // Função para rastrear pesquisas
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      trackSearch(searchQuery, 0);
      const encoded = encodeURIComponent(searchQuery.trim());
      router.push(`/busca?q=${encoded}`);
      setIsMobileMenuOpen(false);
    }
  };

  // Função para rastrear toggle do menu mobile
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    FinancialAnalytics.trackEvent({
      action: isMobileMenuOpen ? "mobile_menu_close" : "mobile_menu_open",
      category: "navigation",
      label: "mobile_menu_toggle",
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 shadow-sm">
      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-90 transition-opacity"
          >
            <Image
              src={Logo}
              className="size-9 dark:invert"
              alt="IAssets Logo"
            />
            <div className="flex gap-1 items-center">
              <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                iAssets
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-400 -mt-1 font-medium">
                News
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - (removido categorias dinâmicas) */}
          <nav className="hidden lg:flex items-center gap-4">
            {/* Espaço reservado para links estáticos futuros */}
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

      {/* Category Bar (desktop) */}
      {navItems.length > 0 && (
        <div className="hidden lg:block border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-x-auto">
          <div className="container mx-auto px-4 flex gap-2 py-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-gray-900 dark:hover:text-gray-100 px-3 py-1 whitespace-nowrap rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => handleNavClick(item.label, item.href, "main")}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}

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
              {navItems.map((item) => (
                <div key={item.label} className="space-y-1">
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium"
                    onClick={() => {
                      handleNavClick(item.label, item.href, "main");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                      {item.label}
                  </Link>
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

