'use client';

import dynamic from 'next/dynamic';
import { ExtendedRecordMap } from 'notion-types';
import React from 'react';

const NotionContent = dynamic(() => import('./notion-renderer').then(m => m.NotionContent), {
  ssr: false,
  loading: () => null,
});

interface Props {
  recordMap: ExtendedRecordMap;
}

export default function NotionContentClient({ recordMap }: Props) {
  return <NotionContent recordMap={recordMap} />;
} 