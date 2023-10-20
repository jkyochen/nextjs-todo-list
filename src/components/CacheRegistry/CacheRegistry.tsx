'use client';

import * as React from 'react';
import NextAppDirEmotionCacheProvider from './EmotionCache';

export default function CacheRegistry({ children }: { children: React.ReactNode }) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      {children}
    </NextAppDirEmotionCacheProvider>
  );
}