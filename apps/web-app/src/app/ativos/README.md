# Área de Ativos - iAssets

## 📊 Visão Geral

A área de ativos do iAssets é uma **plataforma completa e gratuita** para consulta de informações sobre ativos financeiros brasileiros. Oferece dados em tempo real, análises fundamentalistas e ferramentas de pesquisa sem necessidade de assinatura.

## 🆓 Acesso Gratuito

**Todas as funcionalidades da área de ativos são completamente gratuitas:**

- ✅ Cotações em tempo real
- ✅ Indicadores fundamentalistas completos
- ✅ Histórico de preços e performance
- ✅ Análise setorial comparativa
- ✅ Rankings de mercado
- ✅ Dados financeiros trimestrais
- ✅ Eventos corporativos

## 📱 Páginas Implementadas

### 1. `/ativos` - Página Principal
- **Busca universal** de ativos (ações, FIIs, criptomoedas)
- **Resumo do mercado** (Ibovespa, Dólar, CDI, Bitcoin)
- **Tabs organizadas** por tipo de ativo
- **Rankings integrados** (maiores altas, baixas, mais negociadas)

### 2. `/ativos/[symbol]` - Página de Detalhes
**Exemplo: `/ativos/petr4`**

#### 📈 Gráficos e Visualizações
- Gráfico de preços históricos (12 meses)
- Performance histórica (1 semana a 2 anos)
- Indicadores técnicos (suporte, resistência, médias móveis)

#### 💰 Dados Financeiros
- **12 indicadores fundamentalistas** (P/L, ROE, ROIC, etc.)
- **Resultados trimestrais** com histórico
- **Histórico de proventos** detalhado
- **Métricas de endividamento** e liquidez

#### 🏢 Informações Corporativas
- Dados da empresa (setor, funcionários, sede)
- **Agenda de eventos** (resultados, dividendos, assembleias)
- **Comparação setorial** com concorrentes
- Links para empresa e relatórios

#### 📊 Sidebar Completa
- **Cotação do dia** (abertura, máxima, mínima, volume)
- **Valuation** (múltiplos e Enterprise Value)
- **Rentabilidade** (ROE, ROA, margens)
- **Endividamento** (dívida bruta/líquida, ratios)

### 3. `/rankings` - Rankings de Mercado
- **Maiores altas** do dia
- **Mais negociadas** por volume
- Interface limpa e responsiva

## 🎯 Funcionalidades Principais

### Busca Inteligente
```
"PETR4" → Petrobras PN
"HGLG11" → FII Logística  
"BTC" → Bitcoin
```

### Dados Realistas Brasileiros
- Preços e volumes em reais
- Setores da economia brasileira
- Eventos corporativos locais
- Indicadores específicos do mercado nacional

### Navegação Integrada
- Header consistente em todas as páginas
- Links cruzados entre ativos relacionados
- Breadcrumbs para navegação fácil

## 🔗 Integração com Outras Áreas

### Área de Notícias (`/noticias`)
- Portal completo de notícias financeiras
- Links para páginas de ativos mencionados

### Área Pro (Futura)
- **Acompanhamento de carteira** (área paga)
- **Alertas personalizados**
- **Assistente de IA**

## 🎨 Design System

### Cores e Temas
- Verde para valores positivos (`text-emerald-500`)
- Vermelho para valores negativos (`text-red-500`)
- Azul para informações neutras (`text-blue-500`)
- Suporte completo a dark/light mode

### Componentes
- **Cards** para organização de informações
- **Tables** para dados tabulares
- **Badges** para categorização
- **Tabs** para navegação entre tipos de ativo

### Responsividade
- Mobile-first design
- Grid layout adaptativo
- Sidebar colapsável em mobile

## 📊 Dados Simulados

### Ações Principais
- PETR4, VALE3, ITUB4, BBDC4, WEGE3, MGLU3

### FIIs Representativos
- HGLG11, XPML11, MXRF11, KNRI11

### Criptomoedas
- BTC, ETH, SOL

### Indicadores Financeiros
- P/L, P/VP, ROE, ROIC, Dividend Yield
- Dados trimestrais realistas
- Performance histórica consistente

## 🚀 Tecnologias

- **Next.js 15** (App Router)
- **TypeScript** para type safety
- **Tailwind CSS** para styling
- **shadcn/ui** para componentes
- **Lucide Icons** para iconografia

## 📈 Próximos Passos

1. **Integração com APIs reais** de dados financeiros
2. **Mais tipos de ativos** (commodities, índices)
3. **Ferramentas de comparação** avançadas
4. **Exportação de dados** (PDF, Excel)
5. **Watchlists públicas** para acompanhamento

---

> **Nota**: Esta área é completamente gratuita e serve como vitrine da qualidade dos dados e análises do iAssets. O objetivo é demonstrar valor antes de converter usuários para a área Pro de gestão de carteira. 