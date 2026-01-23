"use client";

import { LanguageProvider } from '@/context/LanguageContext';
import { ToastProvider } from '@/context/ToastContext';
import React from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </LanguageProvider>
  );
}
