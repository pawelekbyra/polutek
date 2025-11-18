"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Skeleton, Center } from '@chakra-ui/react';

// --- React Query Client ---
const queryClient = new QueryClient();

// Dynamically import MainFeed to ensure it only runs on the client side.
const DynamicMainFeed = dynamic(() => import('@/components/MainFeed'), {
  ssr: false,
  loading: () => <Center w="100vw" h="100vh" bg="black"><Skeleton w="full" h="full" /></Center>,
});

// --- Main Page Export ---
export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <DynamicMainFeed />
    </QueryClientProvider>
  );
}