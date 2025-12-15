'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import * as React from 'react';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider enableSystem attribute="class" defaultTheme="light">
      {children}
    </NextThemesProvider>
  );
}
