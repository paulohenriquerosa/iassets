'use client'

import { useEffect } from 'react';

interface CategoryPageClientProps {
  categoryName: string;
  postsCount: number;
}

// Componente com analytics e tratamento de erro robusto
export function CategoryPageClient({ categoryName, postsCount }: CategoryPageClientProps) {
  useEffect(() => {
    // Lazy load analytics para evitar problemas de webpack
    const loadAnalytics = async () => {
      try {
        // Dinamicamente importar o módulo de analytics
        const { FinancialAnalytics } = await import('@/lib/analytics');
        
        // Rastrear visualização da categoria
        FinancialAnalytics.trackCategoryInteraction({
          category_name: categoryName,
          posts_count: postsCount,
          interaction_type: 'view'
        });
      } catch (error) {
        console.warn('Analytics not available:', error);
      }
    };

    loadAnalytics();
  }, [categoryName, postsCount]);

  return null; // Componente invisível
} 