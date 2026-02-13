"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

// Dynamically import FeedSwiper to ensure it only runs on the client side.
const DynamicFeedSwiper = dynamic(() => import('@/components/FeedSwiper'), {
  ssr: false,
  loading: () => <div className="w-screen h-screen bg-black flex items-center justify-center"><Skeleton className="w-full h-full" /></div>,
});

export default function TingTongPage() {
  return (
    <div className="w-full h-screen bg-black overflow-hidden relative">
      <DynamicFeedSwiper />
    </div>
  );
}
