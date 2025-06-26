'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, CheckCircle, AlertCircle } from "lucide-react"
import { useNewsletterTracking } from "@/components/analytics/article-tracker"

interface NewsletterWithTrackingProps {
  location: string
  categoryInterest?: string
  variant?: 'default' | 'sidebar' | 'footer' | 'popup'
  className?: string
}

export function NewsletterWithTracking({ 
  location, 
  categoryInterest, 
  variant = 'default',
  className = '' 
}: NewsletterWithTrackingProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  
  const trackNewsletter = useNewsletterTracking()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setStatus('error')
      setMessage('Por favor, insira um email válido')
      return
    }

    setStatus('loading')
    
    try {
      // Simular chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Rastrear inscrição
      trackNewsletter(location, categoryInterest)
      
      setStatus('success')
      setMessage('Inscrição realizada com sucesso!')
      setEmail('')
      
      // Reset após 3 segundos
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 3000)
      
    } catch (error) {
      setStatus('error')
      setMessage('Erro ao processar inscrição. Tente novamente.')
    }
  }

  if (variant === 'sidebar') {
    return (
      <div className={`bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 ${className}`}>
        <div className="text-center mb-4">
          <Mail className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
            Newsletter iAssets
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Receba as principais notícias financeiras direto no seu email
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            placeholder="Seu melhor email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading'}
            className="w-full"
          />
          <Button 
            type="submit" 
            className="w-full"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Processando...' : 'Assinar Grátis'}
          </Button>
        </form>

        {message && (
          <div className={`mt-3 p-2 rounded-lg text-sm flex items-center gap-2 ${
            status === 'success' 
              ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
              : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
          }`}>
            {status === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {message}
          </div>
        )}

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
          Sem spam. Cancele quando quiser.
        </p>
      </div>
    )
  }

  if (variant === 'footer') {
    return (
      <div className={`text-center md:text-right ${className}`}>
        <h4 className="font-semibold text-white mb-2">Newsletter</h4>
        <p className="text-gray-300 text-sm mb-4">Receba as principais notícias</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md ml-auto">
          <Input
            type="email"
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading'}
            className="flex-1"
          />
          <Button 
            type="submit"
            disabled={status === 'loading'}
            className="gap-2"
          >
            <Mail className="w-4 h-4" />
            {status === 'loading' ? 'Processando' : 'Assinar'}
          </Button>
        </form>

        {message && (
          <p className={`mt-2 text-sm ${
            status === 'success' ? 'text-green-400' : 'text-red-400'
          }`}>
            {message}
          </p>
        )}
      </div>
    )
  }

  // variant === 'default'
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 ${className}`}>
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Newsletter iAssets
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Receba análises exclusivas e as principais notícias do mercado financeiro
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Digite seu melhor email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
          className="w-full"
        />
        <Button 
          type="submit" 
          className="w-full"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Processando...' : 'Assinar Newsletter Grátis'}
        </Button>
      </form>

      {message && (
        <div className={`mt-4 p-3 rounded-lg text-sm flex items-center gap-2 ${
          status === 'success' 
            ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
            : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
        }`}>
          {status === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {message}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <span>✓ Sem spam</span>
          <span>✓ Cancele quando quiser</span>
          <span>✓ Conteúdo exclusivo</span>
        </div>
      </div>
    </div>
  )
} 