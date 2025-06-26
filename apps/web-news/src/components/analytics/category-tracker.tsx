'use client'

import { useEffect } from 'react'
import { useCategoryTracking } from './article-tracker'

interface CategoryTrackerProps {
  categoryName: string
  postsCount: number
}

export function CategoryTracker({ categoryName, postsCount }: CategoryTrackerProps) {
  const trackCategory = useCategoryTracking()
  
  useEffect(() => {
    // Rastrear visualização da categoria
    trackCategory(categoryName, postsCount, 'view')
  }, [categoryName, postsCount, trackCategory])
  
  return null // Componente invisível
}

// Hook para uso em outros componentes
export function useCategoryInteraction() {
  const trackCategory = useCategoryTracking()
  
  return {
    trackFilter: (categoryName: string, postsCount: number) => {
      trackCategory(categoryName, postsCount, 'filter')
    },
    trackSearch: (categoryName: string, postsCount: number) => {
      trackCategory(categoryName, postsCount, 'search')
    }
  }
} 