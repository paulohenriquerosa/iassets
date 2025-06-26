# 📊 Sistema de Analytics Financeiro - iAssets

## Visão Geral

Sistema completo de tracking e analytics otimizado para portal de notícias financeiras, com Google Analytics 4 configurado especificamente para o mercado financeiro brasileiro.

## 🔧 Componentes Implementados

### 1. Core Analytics (`/src/lib/analytics.ts`)
Sistema principal de tracking com eventos específicos para finanças:

```typescript
import { FinancialAnalytics } from '@/lib/analytics';

// Tracking básico de eventos
FinancialAnalytics.trackEvent({
  action: 'article_view',
  category: 'content',
  label: 'criptomoedas_bitcoin',
  custom_parameters: {
    article_category: 'criptomoedas',
    reading_time: 240
  }
});
```

### 2. Article Tracker (`article-tracker.tsx`)
Tracking automático para páginas de artigos:

```typescript
import { useArticleTracking, useSearchTracking } from '@/components/analytics/article-tracker';

// Na página do artigo
const ArticlePage = ({ article }) => {
  useArticleTracking(article.slug, article.title, article.category);
  
  return (
    <div>
      {/* Conteúdo do artigo */}
    </div>
  );
};
```

### 3. Category Tracker (`category-tracker.tsx`)
Tracking para páginas de categoria:

```typescript
import { CategoryTracker } from '@/components/analytics/category-tracker';

// Na página de categoria
<CategoryTracker 
  category="criptomoedas"
  totalPosts={42}
  filters={{ type: 'analise', period: '7d' }}
/>
```

### 4. Homepage Tracker (`homepage-tracker.tsx`)
Hooks para tracking da homepage:

```typescript
import { useHomepageTracking, useScrollTracking } from '@/components/analytics/homepage-tracker';

const Homepage = () => {
  const { trackFeaturedPostClick, trackSidebarPostClick } = useHomepageTracking();
  useScrollTracking();
  
  return (
    <div>
      <Link onClick={() => trackFeaturedPostClick(post)}>
        {post.title}
      </Link>
    </div>
  );
};
```

### 5. Social Share Components
Componentes de compartilhamento com tracking:

```typescript
import { SocialShareButtons } from '@/components/social-share-buttons';
import { ShareButtonsInline } from '@/components/social-share-inline';

// Botões de compartilhamento
<SocialShareButtons 
  url={articleUrl}
  title={articleTitle}
  variant="floating" // ou "inline"
/>

// Compartilhamento inline no artigo
<ShareButtonsInline 
  url={articleUrl}
  title={articleTitle}
  excerpt={articleExcerpt}
/>
```

### 6. Newsletter Tracking
Newsletter com conversion tracking:

```typescript
import { NewsletterWithTracking } from '@/components/newsletter-with-tracking';

<NewsletterWithTracking 
  location="sidebar" // "header", "footer", "article_end"
  variant="compact" // "expanded", "minimal"
/>
```

### 7. Search Tracking
Busca com tracking de queries:

```typescript
import { SearchWithTracking } from '@/components/search-with-tracking';

<SearchWithTracking 
  placeholder="Buscar notícias financeiras..."
  categories={['mercados', 'criptomoedas', 'economia']}
/>
```

## 📈 Relatórios Personalizados

Sistema de relatórios específicos para finanças:

```typescript
import { FinancialAnalyticsReports } from '@/lib/analytics-reports';

// Relatórios disponíveis
const categoryReport = FinancialAnalyticsReports.getCategoryPerformanceReport();
const journeyReport = FinancialAnalyticsReports.getInvestorJourneyReport();
const contentReport = FinancialAnalyticsReports.getContentEngagementReport();
const marketReport = FinancialAnalyticsReports.getMarketPerformanceReport();

// Dashboard executivo
const dashboard = FinancialAnalyticsReports.getExecutiveDashboard();
```

## 🚨 Alertas Automáticos

Sistema de alertas configurado para:

- **Queda de Engajamento**: < 30% (horário)
- **Pico de Tráfego**: > 200% da média (tempo real)
- **Queda de Conversões**: < 70% da média semanal (diário)
- **Tempo de Leitura Baixo**: < 2 minutos (diário)

## 📊 KPIs Principais Monitorados

### Engajamento
- Tempo médio de leitura por categoria
- Scroll depth por artigo
- Taxa de bounce por seção
- Interações com ferramentas

### Conversão
- Newsletter signup rate
- Click-through rate por CTA
- Jornada do investidor
- ROI por canal

### Conteúdo
- Performance por categoria financeira
- Compartilhamentos sociais
- Comentários e engajamento
- Retenção de usuários

### Mercado
- Correlação com horários de pregão
- Impacto de breaking news
- Uso de calculadoras durante volatilidade
- Picos de tráfego por eventos

## 🔗 Integração com Google Analytics

### Dimensões Customizadas
- `financial_category`: Categoria do conteúdo financeiro
- `article_type`: Tipo de artigo (análise, notícia, tutorial)
- `user_segment`: Segmento do investidor (iniciante, intermediário, avançado)
- `reading_duration`: Tempo de leitura categorizado

### Eventos Customizados
- `article_view`: Visualização de artigo
- `category_interaction`: Interação com categoria
- `social_share`: Compartilhamento social
- `newsletter_signup`: Inscrição na newsletter
- `tool_usage`: Uso de ferramentas financeiras
- `market_ticker_click`: Clique no ticker de mercado

## 🚀 Como Usar

### 1. Implementação Básica
```typescript
// No layout principal
import { Header } from '@/components/header'; // Já tem tracking
import { FooterWithTracking } from '@/components/footer-with-tracking';

// Nas páginas
import { useHomepageTracking } from '@/components/analytics/homepage-tracker';
```

### 2. Tracking Customizado
```typescript
import { FinancialAnalytics } from '@/lib/analytics';

// Evento personalizado
FinancialAnalytics.trackEvent({
  action: 'custom_action',
  category: 'engagement',
  label: 'specific_interaction',
  value: 100,
  custom_parameters: {
    user_type: 'premium',
    feature_used: 'calculator'
  }
});
```

### 3. Relatórios e Dashboards
```typescript
// Gerar relatório personalizado
const customReport = FinancialAnalyticsReports.generateCustomReport(
  'Análise de Q4',
  [
    {
      name: 'revenue_analysis',
      dimensions: ['month', 'user_segment'],
      metrics: ['revenue', 'conversions'],
      dateRange: 'last_90_days'
    }
  ]
);

// Exportar dados
import { exportAnalyticsData } from '@/lib/analytics-reports';
exportAnalyticsData(customReport, 'csv');
```

## 📱 Responsive & Performance

- **Lazy Loading**: Componentes carregam apenas quando necessário
- **Batch Events**: Eventos agrupados para melhor performance
- **Client-Side Only**: Tracking apenas no lado cliente
- **Error Handling**: Tratamento robusto de erros

## 🔒 Privacidade & LGPD

- **IP Anonymization**: IPs anonimizados automaticamente
- **Opt-out**: Respeita preferências de cookies
- **Data Retention**: Configurado para 26 meses
- **GDPR Compliant**: Compatível com LGPD

## 📋 Próximos Passos

1. **A/B Testing**: Implementar testes para CTAs e layouts
2. **Real-time Dashboard**: Dashboard em tempo real
3. **Predictive Analytics**: IA para prever tendências
4. **Cohort Analysis**: Análise de coortes de investidores
5. **Attribution Modeling**: Modelagem de atribuição multi-canal

## 🛠️ Manutenção

### Checklist Semanal
- [ ] Verificar alertas automáticos
- [ ] Revisar KPIs principais
- [ ] Analisar relatórios de categoria
- [ ] Monitorar performance de conteúdo

### Checklist Mensal
- [ ] Dashboard executivo completo
- [ ] Análise de jornada do investidor
- [ ] Otimização de conversões
- [ ] Planejamento de conteúdo baseado em dados

---

**📧 Suporte**: Para dúvidas sobre implementação, consulte a documentação do Google Analytics 4 ou a equipe de desenvolvimento. 