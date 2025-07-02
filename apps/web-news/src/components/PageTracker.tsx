'use client'
import { usePageTracking } from '@/lib/analytics';
export default function PageTracker(){
  usePageTracking();
  return null;
} 