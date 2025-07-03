// Criado para enviar métricas Web Vitals ao Google Analytics 4 via gtag.js
// https://web.dev/vitals/

export interface WebVitalsMetric {
  name: string;
  delta: number;
  id: string;
}

export function sendToAnalytics({ name, delta, id }: WebVitalsMetric) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  window.gtag('event', name, {
    event_category: 'Web Vitals',
    event_label: id, // CLS pode ser medido em diferentes elementos
    value: Math.round(name === 'CLS' ? delta * 1000 : delta), // GA4 requer inteiro
    non_interaction: true, // não afeta bounce rate
  });
} 