"use client";

import React, { useEffect } from 'react';
import Preloader from './Preloader';
import TopBar from './TopBar';
import { ToastContainer } from '@/context/ToastContext';

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
    <div
        id="app-layout"
        className="
            relative flex flex-col
            w-full h-full
            bg-black
        "
    >
      <Preloader />
      <TopBar />
      <div
        className="flex-1 overflow-auto z-10 custom-scrollbar relative scroll-snap-y-mandatory"
        data-scroll-container
      >
        {children}
      </div>
      <ToastContainer />
    </div>
  );
}
