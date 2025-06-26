'use client'

import { useEffect } from 'react';
import { FinancialAnalytics } from '@/lib/analytics';

interface MarketDataItem {
  symbol: string;
  value: string;
  change: string;
  positive: boolean;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  category: string;
}

export const useHomepageTracking = () => {
  // Hook para rastrear visualização da homepage
  useEffect(() => {
    FinancialAnalytics.trackEvent({
      action: 'homepage_view',
      category: 'content',
      label: 'homepage_load',
      custom_parameters: {
        page_type: 'homepage',
        load_time: Date.now()
      }
    });

    // Rastrear tempo na página
    const startTime = Date.now();
    return () => {
      const timeSpent = Date.now() - startTime;
      FinancialAnalytics.trackEvent({
        action: 'homepage_time_spent',
        category: 'engagement',
        label: 'homepage_exit',
        value: Math.round(timeSpent / 1000),
        custom_parameters: {
          time_category: timeSpent > 30000 ? 'engaged' : 'bounce'
        }
      });
    };
  }, []);

  // Função para rastrear cliques no post em destaque
  const trackFeaturedPostClick = (post: Post) => {
    FinancialAnalytics.trackEvent({
      action: 'featured_post_click',
      category: 'content',
      label: `featured_${post.category}`,
      custom_parameters: {
        post_title: post.title,
        post_slug: post.slug,
        post_category: post.category,
        click_location: 'hero_featured'
      }
    });
  };

  // Função para rastrear cliques na sidebar
  const trackSidebarPostClick = (post: Post, position: number) => {
    FinancialAnalytics.trackEvent({
      action: 'sidebar_post_click',
      category: 'content',
      label: `sidebar_${post.category}`,
      custom_parameters: {
        post_title: post.title,
        post_slug: post.slug,
        post_category: post.category,
        sidebar_position: position + 1,
        click_location: 'sidebar_trending'
      }
    });
  };

  // Função para rastrear cliques no ticker de mercado
  const trackMarketDataClick = (item: MarketDataItem) => {
    FinancialAnalytics.trackEvent({
      action: 'market_ticker_click',
      category: 'tools',
      label: `ticker_${item.symbol}`,
      custom_parameters: {
        symbol: item.symbol,
        value: item.value,
        change: item.change,
        is_positive: item.positive,
        click_location: 'market_ticker'
      }
    });
  };

  // Função para rastrear scroll nas seções de categoria
  const trackCategorySectionView = (category: string) => {
    FinancialAnalytics.trackEvent({
      action: 'category_section_view',
      category: 'content',
      label: `section_${category}`,
      custom_parameters: {
        category_name: category,
        section_location: 'homepage_categories'
      }
    });
  };

  return {
    trackFeaturedPostClick,
    trackSidebarPostClick,
    trackMarketDataClick,
    trackCategorySectionView
  };
};

// Hook para rastrear scroll
export const useScrollTracking = () => {
  useEffect(() => {
    let scrollDepth = 0;
    const trackingPoints = [25, 50, 75, 90];
    const trackedPoints = new Set<number>();

    const handleScroll = () => {
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset;
      
      const currentDepth = Math.round(((scrollTop + winHeight) / docHeight) * 100);
      
      trackingPoints.forEach(point => {
        if (currentDepth >= point && !trackedPoints.has(point)) {
          trackedPoints.add(point);
          FinancialAnalytics.trackEvent({
            action: 'scroll_depth',
            category: 'engagement',
            label: `scroll_${point}`,
            value: point,
            custom_parameters: {
              page_type: 'homepage',
              scroll_percentage: point
            }
          });
        }
      });

      if (currentDepth > scrollDepth) {
        scrollDepth = currentDepth;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      
      // Rastrear profundidade máxima alcançada
      FinancialAnalytics.trackEvent({
        action: 'max_scroll_depth',
        category: 'engagement',
        label: 'homepage_max_scroll',
        value: scrollDepth,
        custom_parameters: {
          max_depth_percentage: scrollDepth
        }
      });
    };
  }, []);
};

// Componente para envolver seções e rastrear visualizações
export const TrackedSection = ({ 
  children, 
  sectionName, 
  onView 
}: { 
  children: React.ReactNode;
  sectionName: string;
  onView?: () => void;
}) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            FinancialAnalytics.trackEvent({
              action: 'section_view',
              category: 'content',
              label: `section_${sectionName}`,
              custom_parameters: {
                section_name: sectionName,
                viewport_percentage: Math.round(entry.intersectionRatio * 100)
              }
            });
            onView?.();
          }
        });
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById(`section-${sectionName}`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [sectionName, onView]);

  return (
    <div id={`section-${sectionName}`}>
      {children}
    </div>
  );
}; 