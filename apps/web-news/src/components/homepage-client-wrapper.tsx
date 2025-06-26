'use client'

import { useHomepageTracking, useScrollTracking } from '@/components/analytics/homepage-tracker';
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
  category: string;
  slug: string;
}

interface HomepageClientWrapperProps {
  children: React.ReactNode;
}

export function HomepageClientWrapper({ children }: HomepageClientWrapperProps) {
  useHomepageTracking();
  useScrollTracking();

  return <>{children}</>;
}

// Hook para tracking de posts
export function usePostTracking() {
  const { trackFeaturedPostClick, trackSidebarPostClick } = useHomepageTracking();

  const handlePostClick = (post: Post, location: 'featured' | 'sidebar', position?: number) => {
    if (location === 'featured') {
      trackFeaturedPostClick(post);
    } else if (location === 'sidebar' && typeof position === 'number') {
      trackSidebarPostClick(post, position);
    }

    // Tracking adicional para tipo de post
    FinancialAnalytics.trackEvent({
      action: 'post_click',
      category: 'content',
      label: `${location}_${post.category}`,
      custom_parameters: {
        post_id: post.id,
        post_title: post.title,
        post_category: post.category,
        click_location: location,
        click_position: position || 0
      }
    });
  };

  return { handlePostClick };
}

// Hook para tracking do market ticker
export function useMarketTracking() {
  const { trackMarketDataClick } = useHomepageTracking();

  const handleMarketClick = (item: MarketDataItem) => {
    trackMarketDataClick(item);
    
    // Tracking adicional
    FinancialAnalytics.trackEvent({
      action: 'market_data_interaction',
      category: 'tools',
      label: `ticker_${item.symbol.toLowerCase()}`,
      custom_parameters: {
        symbol: item.symbol,
        current_value: item.value,
        change_percentage: item.change,
        trend: item.positive ? 'positive' : 'negative'
      }
    });
  };

  return { handleMarketClick };
} 