"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';

// --- React Query Client ---
const queryClient = new QueryClient();

// Dynamically import FeedCarousel to ensure it only runs on the client side.
const DynamicFeedCarousel = dynamic(() => import('@/components/FeedCarousel'), {
  ssr: false,
  loading: () => <div className="w-screen h-screen bg-black flex items-center justify-center"><Skeleton className="w-full h-full" /></div>,
});

// --- Main Page Export ---
export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <DynamicFeedCarousel />
    </QueryClientProvider>
  );
}
