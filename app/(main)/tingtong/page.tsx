"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import TopBar from '@/components/TopBar';
import NavigationSidebar from '@/components/NavigationSidebar';

// Dynamically import FeedSwiper to ensure it only runs on the client side.
const DynamicFeedSwiper = dynamic(() => import('@/components/FeedSwiper'), {
  ssr: false,
  loading: () => <div className="w-screen h-screen bg-black flex items-center justify-center"><Skeleton className="w-full h-full" /></div>,
});

export default function TingTongPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative">
        <TopBar
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            isSidebarOpen={isSidebarOpen}
            className="absolute top-0 w-full z-50 bg-transparent border-none text-white pointer-events-auto"
        />

        <NavigationSidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
        />

        {/* Overlay for sidebar when open on mobile (matches AppLayout logic) */}
        {isSidebarOpen && (
            <div
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                onClick={() => setIsSidebarOpen(false)}
            />
        )}

      <DynamicFeedSwiper />
    </div>
  );
}
