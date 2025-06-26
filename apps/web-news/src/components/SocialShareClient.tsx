'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Twitter, Facebook, Linkedin, Copy } from "lucide-react"

interface SocialShareClientProps {
  title: string
  url: string
  category: string
}

export function SocialShareClient({ title, url, category }: SocialShareClientProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = `https://news.iassets.com.br${url}`
  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(shareUrl)

  // Function to track social share with dynamic import
  const trackShare = async (platform: 'twitter' | 'facebook' | 'linkedin' | 'copy') => {
    try {
      const { FinancialAnalytics } = await import('@/lib/analytics')
      FinancialAnalytics.trackSocialShare({
        platform,
        article_title: title,
        article_category: category
      })
    } catch (error) {
      console.warn('Analytics not available:', error)
    }
  }

  const handleTwitterShare = () => {
    trackShare('twitter')
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&via=iassets_br`
    window.open(twitterUrl, '_blank', 'width=600,height=400')
  }

  const handleFacebookShare = () => {
    trackShare('facebook')
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    window.open(facebookUrl, '_blank', 'width=600,height=400')
  }

  const handleLinkedinShare = () => {
    trackShare('linkedin')
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    window.open(linkedinUrl, '_blank', 'width=600,height=400')
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      trackShare('copy')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Erro ao copiar link:', err)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
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
    </div>
  )
} 