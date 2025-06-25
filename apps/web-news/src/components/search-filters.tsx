"use client";

import { useState } from "react";
import { Search, Filter, Tag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchFiltersProps {
  onSearch?: (query: string, filters: SearchFilters) => void;
}

interface SearchFilters {
  category: string;
  dateRange: string;
  tags: string[];
  sortBy: string;
}

const categories = [
  { value: "all", label: "Todas as categorias" },
  { value: "acoes", label: "Ações" },
  { value: "crypto", label: "Criptomoedas" },
  { value: "fiis", label: "Fundos Imobiliários" },
  { value: "internacional", label: "Internacional" },
  { value: "analises", label: "Análises" },
  { value: "educacao", label: "Educação" }
];

const dateRanges = [
  { value: "all", label: "Qualquer data" },
  { value: "today", label: "Hoje" },
  { value: "week", label: "Esta semana" },
  { value: "month", label: "Este mês" },
  { value: "quarter", label: "Últimos 3 meses" }
];

const popularTags = [
  "Ibovespa", "Bitcoin", "Ethereum", "Petrobras", "Vale", "Itaú", 
  "Selic", "Fed", "Dividendos", "IPO", "DeFi", "NFT"
];

const sortOptions = [
  { value: "relevance", label: "Relevância" },
  { value: "date_desc", label: "Mais recentes" },
  { value: "date_asc", label: "Mais antigas" },
  { value: "popularity", label: "Mais populares" }
];

export function SearchFilters({ onSearch }: SearchFiltersProps) {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    category: "all",
    dateRange: "all",
    tags: [],
    sortBy: "relevance"
  });

  const handleSearch = () => {
    onSearch?.(query, filters);
  };

  const addTag = (tag: string) => {
    if (!filters.tags.includes(tag)) {
      setFilters(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const removeTag = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: "all",
      dateRange: "all",
      tags: [],
      sortBy: "relevance"
    });
    setQuery("");
  };

  const hasActiveFilters = filters.category !== "all" || 
                          filters.dateRange !== "all" || 
                          filters.tags.length > 0 || 
                          filters.sortBy !== "relevance";

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Main Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar notícias, empresas, análises..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-12 pr-24 h-12 text-lg"
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className={hasActiveFilters ? "text-primary" : ""}
          >
            <Filter className="w-4 h-4 mr-1" />
            Filtros
          </Button>
          <Button onClick={handleSearch} size="sm">
            Buscar
          </Button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="border border-border rounded-lg p-6 bg-card space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Filtros Avançados</h3>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="w-4 h-4 mr-1" />
                Limpar filtros
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Categoria</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Período</label>
              <select
                value={filters.dateRange}
                onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
              >
                {dateRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="text-sm font-medium mb-2 block">Ordenar por</label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col justify-end">
              <Button onClick={handleSearch} className="w-full">
                Aplicar filtros
              </Button>
            </div>
          </div>

          {/* Tags Section */}
          <div>
            <label className="text-sm font-medium mb-3 block flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Tags populares
            </label>
            
            {/* Selected Tags */}
            {filters.tags.length > 0 && (
              <div className="mb-3">
                <div className="flex flex-wrap gap-2">
                  {filters.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="hover:bg-primary/80 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Available Tags */}
            <div className="flex flex-wrap gap-2">
              {popularTags.filter(tag => !filters.tags.includes(tag)).map(tag => (
                <button
                  key={tag}
                  onClick={() => addTag(tag)}
                  className="px-3 py-1 border border-border rounded-full text-sm hover:bg-accent transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Summary */}
      {hasActiveFilters && !showFilters && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="w-4 h-4" />
          <span>Filtros ativos:</span>
          {filters.category !== "all" && (
            <span className="px-2 py-1 bg-accent rounded">
              {categories.find(c => c.value === filters.category)?.label}
            </span>
          )}
          {filters.dateRange !== "all" && (
            <span className="px-2 py-1 bg-accent rounded">
              {dateRanges.find(d => d.value === filters.dateRange)?.label}
            </span>
          )}
          {filters.tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-accent rounded">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
} 