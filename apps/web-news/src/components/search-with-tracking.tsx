'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Calendar, Grid, List } from "lucide-react"
import { useSearchTracking } from "@/components/analytics/article-tracker"
import { useCategoryInteraction } from "@/components/analytics/category-tracker"

interface SearchWithTrackingProps {
  categoryName: string
  postsCount: number
  className?: string
}

export function SearchWithTracking({ categoryName, postsCount, className = '' }: SearchWithTrackingProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  
  const trackSearch = useSearchTracking()
  const { trackFilter } = useCategoryInteraction()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Simular busca e rastrear
      trackSearch(searchQuery, postsCount, categoryName)
      console.log(`Buscando por: ${searchQuery} em ${categoryName}`)
    }
  }

  const handleFilter = (filterType: string) => {
    trackFilter(categoryName, postsCount)
    console.log(`Filtro aplicado: ${filterType} em ${categoryName}`)
  }

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode)
    // Pode rastrear mudança de visualização se necessário
  }

  return (
    <div className={`flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 ${className}`}>
      {/* Campo de Busca */}
      <form onSubmit={handleSearch} className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder={`Buscar em ${categoryName}...`}
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </form>

      {/* Controles de Filtro e Visualização */}
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleFilter('data')}
        >
          <Filter className="w-4 h-4 mr-2" />
          Filtros
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleFilter('data')}
        >
          <Calendar className="w-4 h-4 mr-2" />
          Data
        </Button>
        
        {/* Toggle de Visualização */}
        <div className="flex rounded-lg border border-gray-200 dark:border-gray-700">
          <Button 
            variant={viewMode === 'grid' ? 'default' : 'ghost'} 
            size="sm" 
            className="rounded-r-none border-r"
            onClick={() => handleViewModeChange('grid')}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button 
            variant={viewMode === 'list' ? 'default' : 'ghost'} 
            size="sm" 
            className="rounded-l-none"
            onClick={() => handleViewModeChange('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
} 