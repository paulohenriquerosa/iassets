'use client'

import { useEffect } from 'react'
import { useFinancialAnalytics } from '@/lib/analytics'

interface ArticleTrackerProps {
  articleTitle: string
  articleCategory: string
  articleAuthor?: string
}

export function ArticleTracker({ 
  articleTitle, 
  articleCategory, 
  articleAuthor
}: ArticleTrackerProps) {
  const analytics = useFinancialAnalytics()
  
  useEffect(() => {
    // Rastrear visualização do artigo
    analytics.trackArticleView({
      article_title: articleTitle,
      article_category: articleCategory,
      article_author: articleAuthor
    })

    // Rastrear tempo de permanência na página
    const startTime = Date.now()
    let readingTimeTracked = false
    
    const trackReadingTime = () => {
      if (!readingTimeTracked) {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000)
        
        // Só rastrear se o usuário ficou pelo menos 10 segundos
        if (timeSpent >= 10) {
          analytics.trackReadingTime(articleTitle, timeSpent)
          readingTimeTracked = true
        }
      }
    }

    // Rastrear quando o usuário sair da página
    const handleBeforeUnload = () => {
      trackReadingTime()
    }

    // Rastrear quando o usuário trocar de aba
    const handleVisibilityChange = () => {
      if (document.hidden) {
        trackReadingTime()
      }
    }

    // Rastrear após 30 segundos de leitura
    const readingTimer = setTimeout(() => {
      trackReadingTime()
    }, 30000)

    // Adicionar event listeners
    window.addEventListener('beforeunload', handleBeforeUnload)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      clearTimeout(readingTimer)
      trackReadingTime()
    }
  }, [articleTitle, articleCategory, articleAuthor, analytics])

  return null // Componente invisível
}

// Hook para rastrear compartilhamentos sociais
export function useSocialShareTracking() {
  const analytics = useFinancialAnalytics()
  
  return (platform: 'twitter' | 'facebook' | 'linkedin' | 'whatsapp' | 'copy', articleTitle: string, articleCategory: string) => {
    analytics.trackSocialShare({
      platform,
      article_title: articleTitle,
      article_category: articleCategory
    })
  }
}

// Hook para rastrear newsletter signup
export function useNewsletterTracking() {
  const analytics = useFinancialAnalytics()
  
  return (location: string, categoryInterest?: string) => {
    analytics.trackNewsletterSignup({
      signup_location: location,
      user_category_interest: categoryInterest
    })
  }
}

// Hook para rastrear pesquisas
export function useSearchTracking() {
  const analytics = useFinancialAnalytics()
  
  return (query: string, resultsCount: number, category?: string) => {
    analytics.trackSearch(query, resultsCount, category)
  }
}

// Hook para rastrear interações com categorias
export function useCategoryTracking() {
  const analytics = useFinancialAnalytics()
  
  return (categoryName: string, postsCount: number, interactionType: 'view' | 'filter' | 'search') => {
    analytics.trackCategoryInteraction({
      category_name: categoryName,
      posts_count: postsCount,
      interaction_type: interactionType
    })
  }
} 