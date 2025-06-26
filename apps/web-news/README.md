# iAssets News - Portal Financeiro

Portal de notícias e análises do mercado financeiro brasileiro com foco em investimentos, desenvolvido com Next.js 15, TailwindCSS e ShadcnUI.

## 🚀 Características Principais

### ✨ Design Moderno e Limpo
- Interface profissional e minimalista
- Foco no conteúdo essencial
- Responsivo para desktop e mobile
- Animações suaves e efeitos hover

### 📊 Funcionalidades Financeiras
- **Cotações em Tempo Real**: Widget avançado com múltiplos mercados
- **Calendário Econômico**: Eventos econômicos importantes
- **Análises por Seção**: Ações, FIIs, Economia separadamente
- **Newsletter VIP**: Sistema de inscrição integrado

### 🎯 Seções da Homepage
- **Hero Section**: Post em destaque com imagem
- **Notícias Urgentes**: Últimas 3 notícias importantes
- **Ações Brasileiras**: Seção dedicada ao mercado acionário
- **Fundos Imobiliários**: Análises específicas de FIIs
- **Economia e Política**: Notícias macroeconômicas
- **Sidebar**: Ranking, calendário, newsletter e cotações

### 🔧 Stack Tecnológico
- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática completa
- **TailwindCSS 4** - Styling utilitário moderno
- **ShadcnUI** - Componentes acessíveis e customizáveis
- **Notion API** - CMS headless para gerenciamento de conteúdo
- **Lucide React** - Biblioteca de ícones consistente

## 🎨 Componentes Principais

### AdvancedMarketWidget
Widget completo de mercado com:
- Cotações ao vivo com atualização automática
- 4 categorias: Brasil, EUA, Câmbio, Criptomoedas
- Volume de negociação por ativo
- Indicadores visuais de tendência
- Design responsivo com tabs

### Layout da Homepage
1. **Hero Section** - Post principal com overlay e CTA
2. **Notícias Urgentes** - Grid 3x1 com numeração
3. **Ações Brasileiras** - 2 posts com ícone verde
4. **Fundos Imobiliários** - 2 posts com ícone roxo
5. **Economia e Política** - 2 posts com ícone laranja
6. **Sidebar** - 4 widgets complementares

## 🚀 Início Rápido

### Instalação
```bash
# Clone o repositório
git clone <seu-repositorio>

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local

# Inicie o desenvolvimento
npm run dev
```

### Variáveis de Ambiente Necessárias
```env
NOTION_TOKEN=seu_token_notion_aqui
NOTION_DATABASE_ID=id_do_database_notion
```

## 📱 Responsividade

Breakpoints otimizados:
- **Mobile**: < 768px (layout em coluna única)
- **Tablet**: 768px - 1024px (grid 2 colunas)
- **Desktop**: > 1024px (grid 4 colunas com sidebar)

## 🎯 SEO e Performance

### Otimizações Implementadas
- **Metadata Dinâmica** - Open Graph e Twitter Cards
- **Dados Estruturados** - Schema.org para artigos
- **Imagens Otimizadas** - Next.js Image com lazy loading
- **Cache Inteligente** - Unstable Cache para API calls
- **Sitemap Automático** - Geração dinâmica de sitemap.xml

### Core Web Vitals
- **LCP**: < 2.5s com Hero Image otimizada
- **FID**: < 100ms com componentes lazy
- **CLS**: < 0.1 com skeleton screens

## 🔄 Integração Notion

### Database Schema
- **Title** (título) - Campo obrigatório
- **Slug** (url) - Gerado automaticamente
- **Description** (resumo) - Para SEO
- **Status** (status) - Published/Draft
- **Date** (data) - Data de publicação
- **Tags** (categorias) - Multi-select
- **Author** (autor) - Relation ou People
- **Cover** (capa) - File ou URL

### Fallback System
- Posts mockup realistas quando Notion indisponível
- Imagens via Unsplash para demonstração
- Dados de mercado simulados
- Cache automático com revalidação

## 🎨 Design System

### Paleta de Cores
```css
/* Cores principais */
--primary: #3b82f6 (Azul)
--success: #10b981 (Verde - Ações)
--purple: #a855f7 (Roxo - FIIs)
--orange: #f97316 (Laranja - Economia)
--danger: #ef4444 (Vermelho - Urgente)
```

### Typography Scale
- **Hero**: text-2xl md:text-4xl (32px-64px)
- **Section**: text-2xl (32px)
- **Card Title**: text-lg (24px)
- **Body**: text-base (16px)
- **Caption**: text-sm (14px)

## 📊 Conteúdo Mockup

### Posts de Exemplo
- Análises de Petrobras, Vale, Nubank
- Notícias do Fed e política monetária
- Dados econômicos brasileiros
- Imagens de alta qualidade via Unsplash

### Dados de Mercado
- Índices: IBOVESPA, IFIX, S&P 500
- Moedas: USD/BRL, EUR/BRL, GBP/BRL
- Cripto: BTC, ETH, SOL, XRP
- Volume de negociação simulado

## 🚀 Deploy

### Vercel (Recomendado)
```bash
# Build de produção
npm run build

# Deploy automático via Git
git push origin main
```

### Configurações Necessárias
- Variáveis de ambiente no painel Vercel
- Domain customizado (opcional)
- Analytics e monitoring

## 📈 Métricas e Analytics

### Google Analytics 4
- Page views e unique visitors
- Bounce rate por seção
- Tempo médio na página
- Conversões de newsletter

### Performance Monitoring
- Core Web Vitals tracking
- Error monitoring via Sentry
- Uptime monitoring
- API response times

## 🤝 Contribuição

### Como Contribuir
1. Fork o repositório
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit: `git commit -m 'Adiciona nova funcionalidade'`
4. Push: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

### Padrões de Código
- TypeScript strict mode
- ESLint + Prettier configurados
- Conventional Commits
- Testes unitários (opcional)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para detalhes.

## 📞 Suporte

**Equipe iAssets**
- Website: https://iassets.com.br
- Email: dev@iassets.com.br
- Discord: [Comunidade iAssets](https://discord.gg/iassets)

---

**Desenvolvido com ❤️ para o mercado financeiro brasileiro**
