"use client";

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import Slide from '@/components/Slide';
import { SlidesResponseSchema } from '@/lib/validators';
import { SlideDTO } from '@/lib/dto';
import { useStore } from '@/store/useStore';
import { shallow } from 'zustand/shallow';

const fetchSlides = async ({ pageParam = '' }) => {
  const res = await fetch(`/api/slides?cursor=${pageParam}&limit=5`);
  if (!res.ok) {
    throw new Error('Failed to fetch slides');
  }
  const data = await res.json();
  try {
    return SlidesResponseSchema.parse(data);
  } catch (e) {
    console.error("Slides API validation error:", e);
    throw new Error("Invalid data received from Slides API");
  }
};

const MainFeed = () => {
  // Global Store Sync
  const { setActiveSlide, setNextSlide, activeSlide } = useStore(
    (state) => ({
      setActiveSlide: state.setActiveSlide,
      setNextSlide: state.setNextSlide,
      activeSlide: state.activeSlide,
    }),
    shallow
  );

  // Embla Setup
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      axis: 'y',
      loop: false, // Infinite scroll (append) rather than circular loop
      dragFree: false, // Strict snap
      duration: 25, // Smooth transition
      skipSnaps: true,
      containScroll: 'trimSnaps',
    },
    [WheelGesturesPlugin({ forceWheelAxis: 'y' })]
  );

  // Infinite Query
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ['slides'],
    queryFn: fetchSlides,
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const slides = useMemo(() => {
    return (data?.pages.flatMap((page) => page.slides) ?? []) as SlideDTO[];
  }, [data]);

  // Handle Slide Selection
  const onSelect = useCallback(() => {
    if (!emblaApi) return;

    const index = emblaApi.selectedScrollSnap();
    const currentSlide = slides[index];
    const nextSlide = slides[index + 1] || null;

    if (currentSlide && currentSlide.id !== activeSlide?.id) {
      setActiveSlide(currentSlide);
      setNextSlide(nextSlide);
    }

    // Fetch more if near end (within last 2 slides)
    if (hasNextPage && index >= slides.length - 2) {
      fetchNextPage();
    }
  }, [emblaApi, slides, activeSlide, hasNextPage, fetchNextPage, setActiveSlide, setNextSlide]);

  // Initialize & Listeners
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect); // Re-check when slides update

    // Initial check
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Sync Embla engine when slides change length
  useEffect(() => {
    if (emblaApi) emblaApi.reInit();
  }, [slides.length, emblaApi]);

  if (isLoading && slides.length === 0) {
    return (
      <div className="w-full h-[100dvh] bg-black flex items-center justify-center">
        <Skeleton className="w-full h-full bg-gray-900" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-[100dvh] bg-black flex items-center justify-center text-white">
        <p>Nie udało się załadować wideo.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[100dvh] bg-black overflow-hidden">
      <div className="h-full" ref={emblaRef}>
        <div className="h-full flex flex-col touch-pan-x touch-pinch-zoom">
          {slides.map((slide, index) => (
            <div
              key={`${slide.id}-${index}`}
              className="relative w-full h-[100dvh] flex-[0_0_100%]"
            >
              <Slide
                slide={slide}
                priorityLoad={index < 2} // Load first 2 immediately
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainFeed;
