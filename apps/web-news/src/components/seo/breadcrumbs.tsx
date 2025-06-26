'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { siteConfig } from '@/lib/seo'

interface BreadcrumbItem {
  label: string
  href: string
  current?: boolean
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const pathname = usePathname()
  
  // Se não foram fornecidos items, gerar automaticamente baseado na URL
  const breadcrumbItems = items || generateBreadcrumbsFromPath(pathname)
  
  // Gerar dados estruturados Schema.org
  const breadcrumbListSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${siteConfig.url}${item.href}`
    }))
  }

  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbListSchema)
        }}
      />
      
      {/* Visual breadcrumbs */}
      <nav 
        aria-label="Breadcrumb" 
        className={`flex items-center space-x-1 text-sm text-gray-600 mb-6 ${className}`}
        itemScope 
        itemType="https://schema.org/BreadcrumbList"
      >
        {breadcrumbItems.map((item, index) => (
          <div key={item.href} className="flex items-center" itemScope itemType="https://schema.org/ListItem">
            {index === 0 ? (
              <Link 
                href={item.href}
                className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                itemProp="item"
              >
                <Home className="w-4 h-4 mr-1" />
                <span className="sr-only" itemProp="name">{item.label}</span>
              </Link>
            ) : (
              <>
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                {item.current ? (
                  <span 
                    className="font-medium text-gray-900"
                    itemProp="name"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link 
                    href={item.href}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                    itemProp="item"
                  >
                    <span itemProp="name">{item.label}</span>
                  </Link>
                )}
              </>
            )}
            <meta itemProp="position" content={String(index + 1)} />
          </div>
        ))}
      </nav>
    </>
  )
}

// Função para gerar breadcrumbs automaticamente baseado no caminho
function generateBreadcrumbsFromPath(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Início', href: '/' }
  ]

  let currentPath = ''
  
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const isLast = index === segments.length - 1
    
    // Mapeamento de segmentos para labels amigáveis
    const segmentLabels: Record<string, string> = {
      'categoria': 'Categorias',
      'mercados': 'Mercados',
      'criptomoedas': 'Criptomoedas',
      'economia': 'Economia',
      'internacional': 'Internacional',
      'analises': 'Análises',
      'educacao': 'Educação',
      'ferramentas': 'Ferramentas',
      'sobre': 'Sobre',
      'contato': 'Contato',
      'autor': 'Autores',
      'tag': 'Tags'
    }
    
    const label = segmentLabels[segment] || capitalizeFirstLetter(segment.replace(/-/g, ' '))
    
    breadcrumbs.push({
      label,
      href: currentPath,
      current: isLast
    })
  })

  return breadcrumbs
}

// Função utilitária para capitalizar primeira letra
function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// Componente específico para artigos
interface ArticleBreadcrumbsProps {
  category?: string
  title: string
  className?: string
}

export function ArticleBreadcrumbs({ category, title, className }: ArticleBreadcrumbsProps) {
  const items: BreadcrumbItem[] = [
    { label: 'Início', href: '/' }
  ]
  
  if (category) {
    const categorySlug = category.toLowerCase().replace(/\s+/g, '-')
    items.push({
      label: category,
      href: `/categoria/${categorySlug}`
    })
  }
  
  items.push({
    label: title.length > 60 ? `${title.substring(0, 60)}...` : title,
    href: '#',
    current: true
  })
  
  return <Breadcrumbs items={items} className={className} />
}

// Componente específico para categorias
interface CategoryBreadcrumbsProps {
  category: string
  className?: string
}

export function CategoryBreadcrumbs({ category, className }: CategoryBreadcrumbsProps) {
  const items: BreadcrumbItem[] = [
    { label: 'Início', href: '/' },
    { label: 'Categorias', href: '/categorias' },
    { 
      label: category,
      href: `/categoria/${category.toLowerCase().replace(/\s+/g, '-')}`,
      current: true
    }
  ]
  
  return <Breadcrumbs items={items} className={className} />
} 