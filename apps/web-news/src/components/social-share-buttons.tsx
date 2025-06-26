'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Twitter, Facebook, Linkedin, Copy, Share2 } from "lucide-react"
import { useSocialShareTracking } from "@/components/analytics/article-tracker"

interface SocialShareButtonsProps {
  title: string
  url: string
  category: string
  variant?: 'default' | 'compact' | 'floating'
  className?: string
}

export function SocialShareButtons({ 
  title, 
  url, 
  category, 
  variant = 'default',
  className = '' 
}: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const trackShare = useSocialShareTracking()

  const shareUrl = `https://news.iassets.com.br${url}`
  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(shareUrl)

  const handleTwitterShare = () => {
    trackShare('twitter', title, category)
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&via=iassets_br`
    window.open(twitterUrl, '_blank', 'width=600,height=400')
  }

  const handleFacebookShare = () => {
    trackShare('facebook', title, category)
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    window.open(facebookUrl, '_blank', 'width=600,height=400')
  }

  const handleLinkedinShare = () => {
    trackShare('linkedin', title, category)
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    window.open(linkedinUrl, '_blank', 'width=600,height=400')
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      trackShare('copy', title, category)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Erro ao copiar link:', err)
    }
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: shareUrl,
          text: `Confira: ${title}`
        })
        trackShare('copy', title, category) // Usar 'copy' como fallback para native share
      } catch (err) {
        console.error('Erro ao compartilhar:', err)
      }
    }
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="text-sm text-gray-600 dark:text-gray-400">Compartilhar:</span>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleTwitterShare}
          className="text-blue-500 hover:text-blue-600 hover:bg-blue-50"
          aria-label="Compartilhar no Twitter"
        >
          <Twitter className="w-4 h-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleFacebookShare}
          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          aria-label="Compartilhar no Facebook"
        >
          <Facebook className="w-4 h-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleLinkedinShare}
          className="text-blue-700 hover:text-blue-800 hover:bg-blue-50"
          aria-label="Compartilhar no LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleCopyLink}
          className="text-gray-600 hover:text-gray-700 hover:bg-gray-50"
          aria-label={copied ? "Link copiado!" : "Copiar link"}
        >
          <Copy className="w-4 h-4" />
        </Button>
      </div>
    )
  }

  if (variant === 'floating') {
    return (
      <div className={`fixed left-4 top-1/2 transform -translate-y-1/2 z-50 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 p-2 ${className}`}>
        <div className="flex flex-col gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleTwitterShare}
            className="w-10 h-10 p-0 text-blue-500 hover:text-blue-600 hover:bg-blue-50"
            aria-label="Compartilhar no Twitter"
          >
            <Twitter className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleFacebookShare}
            className="w-10 h-10 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            aria-label="Compartilhar no Facebook"
          >
            <Facebook className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLinkedinShare}
            className="w-10 h-10 p-0 text-blue-700 hover:text-blue-800 hover:bg-blue-50"
            aria-label="Compartilhar no LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleCopyLink}
            className="w-10 h-10 p-0 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
            aria-label={copied ? "Copiado!" : "Copiar link"}
          >
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </div>
    )
  }

  // variant === 'default'
  return (
    <div className={`flex flex-wrap items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl ${className}`}>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Compartilhar:
      </span>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600"
          onClick={handleTwitterShare}
        >
          <Twitter className="w-4 h-4" />
          Twitter
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600"
          onClick={handleFacebookShare}
        >
          <Facebook className="w-4 h-4" />
          Facebook
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600"
          onClick={handleLinkedinShare}
        >
          <Linkedin className="w-4 h-4" />
          LinkedIn
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 hover:bg-gray-50 hover:border-gray-200"
          onClick={handleCopyLink}
        >
          <Copy className="w-4 h-4" />
          {copied ? 'Copiado!' : 'Copiar'}
        </Button>
      </div>
      
      {/* Botão de compartilhamento nativo para mobile */}
      {typeof navigator !== 'undefined' && 'share' in navigator && (
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 ml-auto md:hidden"
          onClick={handleNativeShare}
        >
          <Share2 className="w-4 h-4" />
          Compartilhar
        </Button>
      )}
    </div>
  )
} 