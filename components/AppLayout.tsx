"use client";

import React, { useEffect } from 'react';
import Preloader from './Preloader';
import { useTranslation } from '@/context/LanguageContext';
import TopBar from './TopBar';
import { useStore } from '@/store/useStore';
import { shallow } from 'zustand/shallow';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const setAppHeight = () => {
      document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
    };
    window.addEventListener('resize', setAppHeight);
    setAppHeight();

    return () => window.removeEventListener('resize', setAppHeight);
  }, []);

  return (
    <div className="flex h-full flex-col relative">
      <TopBar />
      <div className="flex-1 md:bg-gray-100 md:flex md:justify-center">
        <main className="w-full h-full bg-white md:max-w-[400px] md:border md:shadow-lg overflow-auto z-10">
          {children}
        </main>
      </div>
    </div>
  );
}
