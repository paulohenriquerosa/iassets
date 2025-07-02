'use client'

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

// Tipos para eventos de analytics
export interface FinancialEvent {
  action: string
  category: string
  label?: string
  value?: number
  custom_parameters?: Record<string, string | number | boolean | undefined>
}

// Tipos específicos para o portal financeiro
export interface ArticleEvent {
  article_title: string
  article_category: string
  article_author?: string
  reading_time?: number
  scroll_depth?: number
}

export interface CategoryEvent {
  category_name: string
  posts_count: number
  interaction_type: 'view' | 'filter' | 'search'
}

export interface SocialShareEvent {
  platform: 'twitter' | 'facebook' | 'linkedin' | 'whatsapp' | 'copy'
  article_title: string
  article_category: string
}

export interface NewsletterEvent {
  signup_location: string
  user_category_interest?: string
}

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, unknown>) => void
    trackFinancialEvent: (action: string, category: string, label?: string, value?: number) => void
  }
}

// Classe principal para analytics do portal financeiro
export class FinancialAnalytics {
  private static isInitialized = false
  
  static init() {
    if (typeof window === 'undefined' || this.isInitialized) return
    
    // Aguardar carregamento do gtag
    const checkGtag = () => {
      if (typeof window.gtag === 'function') {
        this.isInitialized = true
        this.setupCustomDimensions()
        this.setupPageViewTracking()
        this.setupScrollTracking()
      } else {
        setTimeout(checkGtag, 100)
      }
    }
    
    checkGtag()
  }
  
  // Configurar dimensões customizadas
  private static setupCustomDimensions() {
    if (!window.gtag) return
    
    window.gtag('config', 'G-FBPGE2KV71', {
      custom_map: {
        'custom_parameter_1': 'financial_category',
        'custom_parameter_2': 'article_type',
        'custom_parameter_3': 'user_segment'
      }
    })
  }
  
  // Rastrear visualizações de página com dados financeiros
  private static setupPageViewTracking() {
    if (!window.gtag) return
    
    // Detectar tipo de página
    const path = window.location.pathname
    let pageType = 'home'
    
    if (path.includes('/categorias/')) pageType = 'category'
    else if (path.match(/^\/[^\/]+$/)) pageType = 'article'
    else if (path.includes('/ferramentas/')) pageType = 'tools'
    else if (path.includes('/sobre')) pageType = 'about'
    
    window.gtag('event', 'page_view_enhanced', {
      page_type: pageType,
      page_category: this.extractCategoryFromPath(path),
      timestamp: new Date().toISOString()
    })
  }
  
  // Rastrear scroll depth
  private static setupScrollTracking() {
    if (typeof window === 'undefined') return
    
    let maxScroll = 0
    const trackScrollDepth = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      )
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent
        
        // Enviar eventos em marcos importantes
        if ([25, 50, 75, 90].includes(scrollPercent)) {
          this.trackEvent({
            action: 'scroll_depth',
            category: 'engagement',
            label: `${scrollPercent}%`,
            value: scrollPercent
          })
        }
      }
    }
    
    window.addEventListener('scroll', trackScrollDepth, { passive: true })
  }
  
  // Método principal para rastrear eventos
  static trackEvent(event: FinancialEvent) {
    if (!window.gtag || !this.isInitialized) return
    
    window.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      ...event.custom_parameters
    })
  }
  
  // Rastrear leitura de artigos
  static trackArticleView(event: ArticleEvent) {
    this.trackEvent({
      action: 'article_view',
      category: 'content',
      label: event.article_title,
      custom_parameters: {
        article_category: event.article_category,
        article_author: event.article_author,
        financial_category: event.article_category
      }
    })
  }
  
  // Rastrear tempo de leitura
  static trackReadingTime(articleTitle: string, timeInSeconds: number) {
    this.trackEvent({
      action: 'reading_time',
      category: 'engagement',
      label: articleTitle,
      value: timeInSeconds,
      custom_parameters: {
        reading_duration: this.categorizeReadingTime(timeInSeconds)
      }
    })
  }
  
  // Rastrear interações com categorias
  static trackCategoryInteraction(event: CategoryEvent) {
    this.trackEvent({
      action: `category_${event.interaction_type}`,
      category: 'navigation',
      label: event.category_name,
      value: event.posts_count,
      custom_parameters: {
        financial_category: event.category_name
      }
    })
  }
  
  // Rastrear compartilhamentos sociais
  static trackSocialShare(event: SocialShareEvent) {
    this.trackEvent({
      action: 'social_share',
      category: 'engagement',
      label: `${event.platform}_${event.article_category}`,
      custom_parameters: {
        platform: event.platform,
        article_title: event.article_title,
        financial_category: event.article_category
      }
    })
  }
  
  // Rastrear newsletter signup
  static trackNewsletterSignup(event: NewsletterEvent) {
    this.trackEvent({
      action: 'newsletter_signup',
      category: 'conversion',
      label: event.signup_location,
      value: 1,
      custom_parameters: {
        signup_location: event.signup_location,
        interest_category: event.user_category_interest
      }
    })
  }
  
  // Rastrear pesquisas
  static trackSearch(query: string, resultsCount: number, category?: string) {
    this.trackEvent({
      action: 'search',
      category: 'engagement',
      label: query,
      value: resultsCount,
      custom_parameters: {
        search_term: query,
        results_count: resultsCount,
        search_category: category
      }
    })
  }
  
  // Rastrear uso de ferramentas financeiras
  static trackToolUsage(toolName: string, toolCategory: string, action: string) {
    this.trackEvent({
      action: `tool_${action}`,
      category: 'tools',
      label: toolName,
      custom_parameters: {
        tool_category: toolCategory,
        tool_name: toolName
      }
    })
  }
  
  // Rastrear cliques em links externos
  static trackExternalClick(url: string, linkText: string) {
    this.trackEvent({
      action: 'external_click',
      category: 'engagement',
      label: url,
      custom_parameters: {
        link_text: linkText,
        destination_domain: new URL(url).hostname
      }
    })
  }
  
  // Rastrear erros 404
  static track404Error(path: string, referrer?: string) {
    this.trackEvent({
      action: '404_error',
      category: 'error',
      label: path,
      custom_parameters: {
        error_path: path,
        referrer: referrer || document.referrer
      }
    })
  }
  
  // Rastrear performance da página
  static trackPagePerformance() {
    if (typeof window === 'undefined' || !window.performance) return
    
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = window.performance.timing
        const loadTime = perfData.loadEventEnd - perfData.navigationStart
        
        this.trackEvent({
          action: 'page_performance',
          category: 'technical',
          label: window.location.pathname,
          value: loadTime,
          custom_parameters: {
            load_time: loadTime,
            dom_content_loaded: perfData.domContentLoadedEventEnd - perfData.navigationStart,
            first_paint: perfData.responseStart - perfData.navigationStart
          }
        })
      }, 0)
    })
  }
  
  // Métodos auxiliares
  private static extractCategoryFromPath(path: string): string {
    const categoryMatch = path.match(/\/categorias\/([^\/]+)/)
    return categoryMatch ? categoryMatch[1] : 'general'
  }
  
  private static categorizeReadingTime(seconds: number): string {
    if (seconds < 30) return 'quick_scan'
    if (seconds < 120) return 'brief_read'
    if (seconds < 300) return 'normal_read'
    if (seconds < 600) return 'thorough_read'
    return 'deep_read'
  }
}

// Hook para uso em componentes React
export const useFinancialAnalytics = () => {
  return {
    trackArticleView: (event: ArticleEvent) => FinancialAnalytics.trackArticleView(event),
    trackCategoryInteraction: (event: CategoryEvent) => FinancialAnalytics.trackCategoryInteraction(event),
    trackSocialShare: (event: SocialShareEvent) => FinancialAnalytics.trackSocialShare(event),
    trackNewsletterSignup: (event: NewsletterEvent) => FinancialAnalytics.trackNewsletterSignup(event),
    trackSearch: (query: string, resultsCount: number, category?: string) => FinancialAnalytics.trackSearch(query, resultsCount, category),
    trackToolUsage: (toolName: string, toolCategory: string, action: string) => FinancialAnalytics.trackToolUsage(toolName, toolCategory, action),
    trackExternalClick: (url: string, text: string) => FinancialAnalytics.trackExternalClick(url, text),
    trackReadingTime: (title: string, seconds: number) => FinancialAnalytics.trackReadingTime(title, seconds),
  };
};

// Inicializar automaticamente quando o módulo for carregado
if (typeof window !== 'undefined') {
  FinancialAnalytics.init()
}

// Hook global para page view (App Router)
export function usePageTracking() {
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    FinancialAnalytics.trackEvent({
      action: "page_view",
      category: "navigation",
      label: pathname + (search ? "?" + search.toString() : ""),
    });
  }, [pathname, search]);
} 