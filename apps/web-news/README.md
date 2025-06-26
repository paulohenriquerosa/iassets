# iAssets News - Portal Financeiro Premium

Portal de notícias e análises do mercado financeiro brasileiro com foco em investimentos, desenvolvido com Next.js 15, TailwindCSS e ShadcnUI.

## 🚀 Características Principais

### ✨ Design Moderno e Responsivo
- Interface profissional optimizada para desktop e mobile
- Tema dark/light integrado
- Animações suaves e efeitos hover avançados 
- Gradientes e elementos visuais premium

### 📊 Funcionalidades Financeiras
- **Ticker de Notícias ao Vivo**: Rotação automática de breaking news
- **Cotações em Tempo Real**: Widget avançado com múltiplos mercados
- **Calendário Econômico**: Eventos econômicos importantes
- **Análises por Categoria**: Ações, FIIs, Renda Fixa, Criptomoedas
- **Ferramentas Gratuitas**: Calculadoras e simuladores

### 🎯 Seções Especializadas
- **Notícias Urgentes**: Destaque para news de última hora
- **Insights de Especialistas**: Perfis dos analistas com estatísticas
- **Educação Financeira**: Cursos e conteúdo educativo
- **Webinars e Podcasts**: Eventos ao vivo e conteúdo em áudio
- **Tópicos em Alta**: Trending topics do mercado financeiro

### 🔧 Tecnologias Utilizadas
- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **TailwindCSS 4** - Styling utilitário
- **ShadcnUI** - Componentes acessíveis
- **Notion API** - CMS headless para conteúdo
- **Lucide React** - Ícones modernos
- **Date-fns** - Manipulação de datas

## 🎨 Componentes Customizados

### AdvancedMarketWidget
Widget avançado de mercado com:
- Cotações ao vivo com atualização automática
- Múltiplas categorias (Brasil, EUA, Câmbio, Cripto)
- Volume de negociação
- Indicadores visuais de tendência

### Seções da Homepage
1. **Hero Section** - Post em destaque com overlay
2. **Notícias Urgentes** - Grid de últimas notícias
3. **Análises por Mercado** - Tabs organizadas por categoria
4. **Especialistas** - Cards dos analistas
5. **Educação** - Cursos e conteúdo educativo
6. **Ferramentas** - Calculadoras gratuitas
7. **Eventos** - Webinars e podcasts
8. **Sidebar** - Tópicos, calendário, newsletter

## 🚀 Início Rápido

### Pré-requisitos
- Node.js 18+
- NPM ou Yarn
- Conta Notion (para CMS)

### Instalação
```bash
# Clone o repositório
git clone <seu-repositorio>

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local

# Inicie o servidor de desenvolvimento
npm run dev
```

### Variáveis de Ambiente
```env
NOTION_TOKEN=seu_token_notion
NOTION_DATABASE_ID=id_do_database_notion
```

## 📱 Responsividade

O portal é totalmente responsivo com breakpoints otimizados:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🎯 SEO e Performance

- **Metadata completa** com Open Graph e Twitter Cards
- **Dados estruturados** para Google Rich Snippets
- **Imagens otimizadas** com Next.js Image
- **Loading states** e skeleton screens
- **Cache de API** com Unstable Cache

## 🔄 Integração com Notion

O portal utiliza o Notion como CMS headless:
- Database configurado com campos personalizados
- API integrada para busca de posts
- Cache automático para performance
- Fallback para dados mockup

### Estrutura do Database Notion
- **Title** (Título)
- **Slug** (URL amigável)
- **Description** (Descrição/Resumo)
- **Status** (Published/Draft)
- **Date** (Data de publicação)
- **Tags** (Categorias)
- **Author** (Autor)
- **Cover** (Imagem de capa)

## 🎨 Customização de Estilos

### Classes CSS Customizadas
- `.gradient-financial` - Gradiente financeiro
- `.news-ticker` - Animação do ticker
- `.hover-scale` - Efeito hover escala
- `.premium-glow` - Efeito glow premium
- `.pulse-live` - Indicador ao vivo

### Cores do Tema
```css
--primary: #3b82f6 (Azul)
--success: #10b981 (Verde)
--danger: #ef4444 (Vermelho)
--warning: #f59e0b (Amarelo)
```

## 📊 Dados Mockup

Para demonstração, o portal inclui dados mockup realistas:
- Posts de exemplo com imagens do Unsplash
- Cotações de mercado simuladas
- Eventos de calendário econômico
- Perfis de especialistas

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm run build
vercel --prod
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📈 Roadmap

- [ ] Sistema de comentários
- [ ] Newsletter integrada
- [ ] App mobile React Native
- [ ] Dashboard de assinantes
- [ ] API de cotações real
- [ ] Sistema de notificações push
- [ ] Modo offline com PWA

## 🤝 Contribuição

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Contato

**iAssets Team**
- Website: https://iassets.com.br
- Email: contato@iassets.com.br
- Twitter: [@iassets_br](https://twitter.com/iassets_br)

---

Desenvolvido com ❤️ pela equipe iAssets
