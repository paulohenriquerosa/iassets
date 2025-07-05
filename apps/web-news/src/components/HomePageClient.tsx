'use client'

import { useHomepageTracking, useScrollTracking } from '@/components/analytics/homepage-tracker';
import { FinancialAnalytics } from '@/lib/analytics';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatSmartDate } from '@/lib/utils';

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
  summary: string;
  date: string;
  coverImage?: string;
}



// Componente invisível que apenas inicializa os hooks de tracking
export function HomePageClient() {
  useHomepageTracking();
  useScrollTracking();
  return null; // Não renderiza nada
}

// Componente para o Market Ticker com tracking
interface MarketTickerProps {
  marketData: MarketDataItem[];
}

export function MarketTicker({ marketData }: MarketTickerProps) {
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

  return (
    <div className="bg-gray-900 text-white py-2 sm:py-3 overflow-hidden">
      <div className="animate-scroll whitespace-nowrap">
        <div className="inline-flex items-center space-x-6 sm:space-x-8">
          {[...marketData, ...marketData].map((item, index) => (
            <button
              key={index}
              className="inline-flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm font-medium hover:bg-gray-800 px-2 py-1 rounded transition-colors"
              onClick={() => handleMarketClick(item)}
            >
              <span className="text-gray-300">{item.symbol}</span>
              <span className="text-white">{item.value}</span>
              <span className={`${item.positive ? "text-green-400" : "text-red-400"}`}>
                {item.change}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Componente para Featured Post com tracking
interface FeaturedPostProps {
  post: Post;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  const { trackFeaturedPostClick } = useHomepageTracking();

  const handleClick = () => {
    trackFeaturedPostClick({
      id: post.id,
      title: post.title,
      slug: post.slug,
      category: post.category
    });
  };

  return (
    <div className="lg:col-span-2">
      <Link href={`/${post.slug}`} onClick={handleClick}>
        <div className="relative w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-200 dark:border-gray-800">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">iAssets News</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
            <div className="flex items-center gap-2 mb-3 sm:mb-4 text-sm text-white/80">
              <Clock className="w-4 h-4" />
              <span>{formatSmartDate(post.date)}</span>
              <span className="mx-2">•</span>
              <span>{post.category}</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              {post.title}
            </h1>
            <p className="text-white/90 text-sm sm:text-base md:text-lg line-clamp-2 mb-4 sm:mb-6 lg:mb-8">
              {post.summary}
            </p>
            <Button className="bg-white hover:bg-gray-100 text-gray-900 text-sm px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-200">
              Ler mais
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
}

// Componente para Sidebar com tracking
interface SidebarProps {
  posts: Post[];
}

export function Sidebar({ posts }: SidebarProps) {
  const { trackSidebarPostClick } = useHomepageTracking();

  const handlePostClick = (post: Post, index: number) => {
    trackSidebarPostClick({
      id: post.id,
      title: post.title,
      slug: post.slug,
      category: post.category
    }, index);
  };

  return (
    <div className="lg:col-span-1 lg:sticky lg:top-24">
      <Card className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 h-full flex flex-col">
        <CardHeader className="pb-4 sm:pb-6">
          <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
            Mais Lidas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6 flex-1">
          {posts.map((post, index) => (
            <Link
              key={post.id}
              href={`/${post.slug}`}
              className="flex gap-3 sm:gap-4 hover:bg-gray-50 dark:hover:bg-gray-700 p-3 sm:p-4 rounded-xl transition-colors group"
              onClick={() => handlePostClick(post, index)}
            >
              <div className="relative w-16 h-12 sm:w-20 sm:h-16 flex-shrink-0 rounded-xl overflow-hidden">
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                    <span className="text-gray-400 dark:text-gray-500 text-xs">
                      iA
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors leading-tight mb-1 sm:mb-2">
                  {post.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">
                  {formatSmartDate(post.date)}
                </p>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}