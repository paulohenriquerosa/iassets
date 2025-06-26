'use client'

import { useEffect } from 'react';

interface ArticleClientTrackerProps {
  articleTitle: string;
  articleCategory: string;
  articleAuthor?: string;
}

// Componente para tracking de artigos com dynamic imports
export function ArticleClientTracker({ articleTitle, articleCategory, articleAuthor }: ArticleClientTrackerProps) {
  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const { FinancialAnalytics } = await import('@/lib/analytics');
        
        // Rastrear visualização do artigo
        FinancialAnalytics.trackArticleView({
          article_title: articleTitle,
          article_category: articleCategory,
          article_author: articleAuthor
        });

        // Rastrear tempo de permanência na página
        const startTime = Date.now();
        let readingTimeTracked = false;
        
        const trackReadingTime = () => {
          if (!readingTimeTracked) {
            const timeSpent = Math.floor((Date.now() - startTime) / 1000);
            
            // Só rastrear se o usuário ficou pelo menos 10 segundos
            if (timeSpent >= 10) {
              FinancialAnalytics.trackReadingTime(articleTitle, timeSpent);
              readingTimeTracked = true;
            }
          }
        };

        // Rastrear quando o usuário sair da página
        const handleBeforeUnload = () => {
          trackReadingTime();
        };

        // Rastrear quando o usuário trocar de aba
        const handleVisibilityChange = () => {
          if (document.hidden) {
            trackReadingTime();
          }
        };

        // Rastrear após 30 segundos de leitura
        const readingTimer = setTimeout(() => {
          trackReadingTime();
        }, 30000);

        // Adicionar event listeners
        window.addEventListener('beforeunload', handleBeforeUnload);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Cleanup
        return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
          document.removeEventListener('visibilitychange', handleVisibilityChange);
          clearTimeout(readingTimer);
          trackReadingTime();
        };
      } catch (error) {
        console.warn('Analytics not available:', error);
      }
    };

    loadAnalytics();
  }, [articleTitle, articleCategory, articleAuthor]);

  return null; // Componente invisível
} 