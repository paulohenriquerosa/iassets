'use client'

import Link from "next/link";
import { FinancialAnalytics } from "@/lib/analytics";

interface TrackedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  category?: string;
  label?: string;
  location?: string;
}

export function TrackedLink({ 
  href, 
  children, 
  className,
  onClick,
  category = 'navigation',
  label,
  location = 'general'
}: TrackedLinkProps) {
  
  const handleClick = () => {
    // Tracking automático
    FinancialAnalytics.trackEvent({
      action: 'link_click',
      category,
      label: label || href,
      custom_parameters: {
        link_href: href,
        link_location: location,
        click_timestamp: Date.now()
      }
    });
    
    // Executar onClick personalizado se fornecido
    onClick?.();
  };

  return (
    <Link 
      href={href} 
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}

// Hook para tracking de botões
export function useButtonTracking() {
  const trackButtonClick = (
    action: string, 
    category: string = 'engagement',
    label?: string
  ) => {
    FinancialAnalytics.trackEvent({
      action,
      category,
      label: label || action,
      custom_parameters: {
        button_action: action
      }
    });
  };

  return { trackButtonClick };
} 