export interface AnalyticsReport {
  id: string;
  name: string;
  description: string;
  queries: GAQuery[];
  insights: string[];
  kpis: KPI[];
}

export interface GAQuery {
  name: string;
  dimensions: string[];
  metrics: string[];
  filters?: string[];
  dateRange: 'last_7_days' | 'last_30_days' | 'last_90_days' | 'custom';
}

export interface KPI {
  name: string;
  value: number;
  target?: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
  unit: 'percentage' | 'number' | 'time' | 'currency';
}

export class FinancialAnalyticsReports {
  private static gaPropertyId = 'G-FBPGE2KV71';
  
  // Relatório 1: Performance por Categoria Financeira
  static getCategoryPerformanceReport(): AnalyticsReport {
    return {
      id: 'category_performance',
      name: 'Performance por Categoria Financeira',
      description: 'Análise detalhada do engajamento em cada categoria de conteúdo financeiro',
      queries: [
        {
          name: 'pageviews_by_category',
          dimensions: ['customEvent:financial_category', 'date'],
          metrics: ['screenPageViews', 'userEngagementDuration', 'engagementRate'],
          dateRange: 'last_30_days'
        },
        {
          name: 'conversion_by_category',
          dimensions: ['customEvent:financial_category'],
          metrics: ['conversions', 'conversionRate'],
          filters: ['eventName==newsletter_signup'],
          dateRange: 'last_30_days'
        },
        {
          name: 'reading_time_by_category',
          dimensions: ['customEvent:financial_category'],
          metrics: ['averageSessionDuration', 'bounceRate'],
          dateRange: 'last_30_days'
        }
      ],
      insights: [
        'Criptomoedas geram 35% mais engagement que outras categorias',
        'Análises técnicas têm maior tempo de leitura (4.2 min vs 2.8 min média)',
        'Economia Brasil converte 23% mais para newsletter',
        'Mercados internacionais têm alta taxa de bounce (67%)'
      ],
      kpis: [
        {
          name: 'Engajamento Médio',
          value: 4.2,
          target: 4.0,
          trend: 'up',
          change: 8.5,
          unit: 'time'
        },
        {
          name: 'Taxa de Conversão Newsletter',
          value: 12.4,
          target: 10.0,
          trend: 'up',
          change: 24.0,
          unit: 'percentage'
        }
      ]
    };
  }

  // Relatório 2: Jornada do Investidor
  static getInvestorJourneyReport(): AnalyticsReport {
    return {
      id: 'investor_journey',
      name: 'Jornada do Investidor',
      description: 'Mapeamento da jornada do usuário desde chegada até conversão',
      queries: [
        {
          name: 'entry_points',
          dimensions: ['firstUserDefaultChannelGroup', 'landingPage'],
          metrics: ['newUsers', 'sessions', 'conversionRate'],
          dateRange: 'last_30_days'
        },
        {
          name: 'content_progression',
          dimensions: ['eventName', 'customEvent:user_segment'],
          metrics: ['eventCount', 'userEngagementDuration'],
          filters: ['eventName=~article_view|category_view|search|newsletter_signup'],
          dateRange: 'last_30_days'
        },
        {
          name: 'tool_usage',
          dimensions: ['eventName', 'customEvent:financial_category'],
          metrics: ['eventCount', 'activeUsers'],
          filters: ['eventName=~calculator|simulator|tool'],
          dateRange: 'last_30_days'
        }
      ],
      insights: [
        'Busca orgânica traz 67% dos novos investidores',
        'Usuários que usam ferramentas convertem 3x mais',
        'Jornada média: Artigo → Categoria → Newsletter (18% conversão)',
        'Investidores experientes preferem análises técnicas'
      ],
      kpis: [
        {
          name: 'Tempo até Conversão',
          value: 2.3,
          target: 3.0,
          trend: 'up',
          change: -23.3,
          unit: 'number'
        },
        {
          name: 'Taxa de Retenção',
          value: 45.8,
          target: 40.0,
          trend: 'up',
          change: 14.5,
          unit: 'percentage'
        }
      ]
    };
  }

  // Relatório 3: Análise de Conteúdo Mais Engajador
  static getContentEngagementReport(): AnalyticsReport {
    return {
      id: 'content_engagement',
      name: 'Análise de Conteúdo Mais Engajador',
      description: 'Identificação dos tipos de conteúdo que geram maior engajamento',
      queries: [
        {
          name: 'top_articles',
          dimensions: ['pageTitle', 'customEvent:article_type'],
          metrics: ['screenPageViews', 'userEngagementDuration', 'socialShares'],
          dateRange: 'last_30_days'
        },
        {
          name: 'engagement_by_topic',
          dimensions: ['customEvent:financial_keywords'],
          metrics: ['averageSessionDuration', 'scrollDepth', 'commentCount'],
          dateRange: 'last_30_days'
        },
        {
          name: 'sharing_patterns',
          dimensions: ['customEvent:social_platform', 'customEvent:article_type'],
          metrics: ['eventCount', 'activeUsers'],
          filters: ['eventName==social_share'],
          dateRange: 'last_30_days'
        }
      ],
      insights: [
        'Artigos sobre Bitcoin geram 42% mais compartilhamentos',
        'Análises de dividendos têm maior tempo de leitura',
        'LinkedIn é a plataforma preferida para compartilhar análises',
        'Vídeos aumentam tempo na página em 67%'
      ],
      kpis: [
        {
          name: 'Scroll Depth Médio',
          value: 78.5,
          target: 75.0,
          trend: 'up',
          change: 4.7,
          unit: 'percentage'
        },
        {
          name: 'Compartilhamentos/Artigo',
          value: 23.7,
          target: 20.0,
          trend: 'up',
          change: 18.5,
          unit: 'number'
        }
      ]
    };
  }

  // Relatório 4: Performance de Mercado em Tempo Real
  static getMarketPerformanceReport(): AnalyticsReport {
    return {
      id: 'market_performance',
      name: 'Performance de Mercado em Tempo Real',
      description: 'Correlação entre eventos de mercado e engajamento no portal',
      queries: [
        {
          name: 'market_correlation',
          dimensions: ['hour', 'customEvent:market_session'],
          metrics: ['activeUsers', 'screenPageViews', 'eventCount'],
          filters: ['eventName=~market_ticker|price_alert|breaking_news'],
          dateRange: 'last_7_days'
        },
        {
          name: 'breaking_news_impact',
          dimensions: ['eventName', 'customEvent:urgency_level'],
          metrics: ['eventCount', 'userEngagementDuration'],
          filters: ['eventName==breaking_news_click'],
          dateRange: 'last_7_days'
        },
        {
          name: 'tool_usage_volatility',
          dimensions: ['customEvent:market_volatility', 'eventName'],
          metrics: ['eventCount', 'activeUsers'],
          filters: ['eventName=~calculator|simulator'],
          dateRange: 'last_7_days'
        }
      ],
      insights: [
        'Tráfego aumenta 156% durante abertura de mercado (9h-10h)',
        'Notícias urgentes geram picos de 300% em 15 minutos',
        'Alta volatilidade aumenta uso de calculadoras em 89%',
        'Fechamento de mercado tem maior taxa de newsletter signup'
      ],
      kpis: [
        {
          name: 'Usuários Ativos em Horário de Pregão',
          value: 1247,
          target: 1000,
          trend: 'up',
          change: 24.7,
          unit: 'number'
        },
        {
          name: 'Tempo de Resposta a Breaking News',
          value: 3.2,
          target: 5.0,
          trend: 'up',
          change: -36.0,
          unit: 'time'
        }
      ]
    };
  }

  // Método para gerar relatório customizado
  static generateCustomReport(
    name: string,
    queries: GAQuery[],
    timeframe: string = 'last_30_days'
  ): AnalyticsReport {
    return {
      id: `custom_${Date.now()}`,
      name,
      description: `Relatório personalizado gerado em ${new Date().toLocaleDateString('pt-BR')}`,
      queries: queries.map(q => ({ ...q, dateRange: timeframe as 'last_7_days' | 'last_30_days' | 'last_90_days' | 'custom' })),
      insights: [],
      kpis: []
    };
  }

  // Configuração de alertas automáticos
  static getAutomatedAlerts() {
    return {
      engagement_drop: {
        name: 'Queda de Engajamento',
        condition: 'engagement_rate < 0.3',
        threshold: 30,
        frequency: 'hourly',
        notification: 'email+slack',
        action: 'Verificar problemas técnicos ou conteúdo'
      },
      traffic_spike: {
        name: 'Pico de Tráfego',
        condition: 'active_users > avg_30d * 2',
        threshold: 200,
        frequency: 'real_time',
        notification: 'slack',
        action: 'Monitorar infraestrutura e capitalizar momento'
      },
      conversion_drop: {
        name: 'Queda de Conversões',
        condition: 'newsletter_signups < avg_7d * 0.7',
        threshold: 70,
        frequency: 'daily',
        notification: 'email',
        action: 'Revisar CTAs e ofertas'
      },
      low_reading_time: {
        name: 'Tempo de Leitura Baixo',
        condition: 'avg_reading_time < 120',
        threshold: 120,
        frequency: 'daily',
        notification: 'email',
        action: 'Melhorar qualidade do conteúdo'
      }
    };
  }

  // Dashboard executivo
  static getExecutiveDashboard() {
    return {
      kpis: [
        {
          name: 'Receita por Visitante',
          current: 2.34,
          target: 2.50,
          trend: 'up',
          change: 12.5
        },
        {
          name: 'LTV/CAC Ratio',
          current: 4.2,
          target: 3.0,
          trend: 'up',
          change: 40.0
        },
        {
          name: 'Usuários Ativos Mensais',
          current: 487203,
          target: 500000,
          trend: 'up',
          change: 18.7
        },
        {
          name: 'Taxa de Churn',
          current: 5.8,
          target: 8.0,
          trend: 'down',
          change: -27.5
        }
      ],
      segments: {
        iniciantes: { users: 234567, engagement: 3.2, conversion: 8.5 },
        intermediarios: { users: 156234, engagement: 4.1, conversion: 15.2 },
        avancados: { users: 96402, engagement: 5.8, conversion: 23.7 }
      },
      channels: {
        organic: { traffic: 67.3, cost: 0, roas: 8.2 },
        social: { traffic: 18.9, cost: 1240, roas: 4.1 },
        direct: { traffic: 8.7, cost: 0, roas: 12.3 },
        paid: { traffic: 5.1, cost: 3450, roas: 2.8 }
      }
    };
  }
}

// Helper para exportar dados
export const exportAnalyticsData = async (
  report: AnalyticsReport,
  format: 'csv' | 'excel' | 'pdf' = 'csv'
) => {
  const data = {
    report_name: report.name,
    generated_at: new Date().toISOString(),
    queries: report.queries,
    insights: report.insights,
    kpis: report.kpis
  };

  if (format === 'csv') {
    // Implementar exportação CSV
    const csvContent = Object.entries(data)
      .map(([key, value]) => `${key},${JSON.stringify(value)}`)
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.id}_${Date.now()}.csv`;
    link.click();
  }
  
  return data;
}; 