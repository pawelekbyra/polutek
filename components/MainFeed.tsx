import React, { useCallback, useEffect, useState, useMemo } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { useStore } from '@/store/useStore';
import { SlidesResponseSchema } from '@/lib/validators';
import { SlideDTO } from '@/lib/dto';
import { shallow } from 'zustand/shallow';
import Slide from '@/components/Slide';
import { useUser } from '@/context/UserContext';

const fetchSlides = async ({ pageParam = '' }) => {
  const res = await fetch(`/api/slides?cursor=${pageParam}&limit=5`);
  if (!res.ok) {
    throw new Error('Failed to fetch slides');
  }
  const data = await res.json();

  try {
    const parsed = SlidesResponseSchema.parse(data);
    return parsed;
  } catch (e) {
    console.error("Slides API validation error:", e);
    throw new Error("Invalid data received from Slides API");
  }
};

const MainFeed = () => {
  const { setActiveSlide, setNextSlide, playVideo, activeSlide } = useStore(state => ({
    setActiveSlide: state.setActiveSlide,
    setNextSlide: state.setNextSlide,
    playVideo: state.playVideo,
    activeSlide: state.activeSlide
  }), shallow);

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
    return (data?.pages.flatMap(page => page.slides) ?? []) as SlideDTO[];
  }, [data]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: 'y',
    loop: true, // Enables "Infinite Loop" mechanism
    duration: 25, // Adjust scroll speed
    dragFree: false // Ensures strict snapping
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;

    const index = emblaApi.selectedScrollSnap();
    const slide = slides[index];

    if (slide && activeSlide?.id !== slide.id) {
      setActiveSlide(slide);
      // Determine next slide for preload (handling loop wraparound)
      const nextIndex = (index + 1) % slides.length;
      setNextSlide(slides[nextIndex] || null);

      if (slide.type === 'video') {
        playVideo();
      }

      // Infinite Scroll Loading Trigger
      // Load more when we are 2 slides away from the end of the CURRENT list
      // Note: loop: true complicates "end", but we still want to fetch more data
      if (hasNextPage && index >= slides.length - 2) {
         fetchNextPage();
      }
    }
  }, [emblaApi, slides, activeSlide, setActiveSlide, setNextSlide, playVideo, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (!emblaApi) return;

    // Initial set
    onSelect();

    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Force re-init when slides change to ensure loop works correctly with new data
  useEffect(() => {
      if (emblaApi) emblaApi.reInit();
  }, [slides, emblaApi]);

  if (isLoading && slides.length === 0) {
    return <div className="w-full h-[100dvh] bg-black flex items-center justify-center"><Skeleton className="w-full h-full" /></div>;
  }

  if (isError) {
    return <div className="w-full h-[100dvh] bg-black flex items-center justify-center text-white">Błąd ładowania wideo.</div>;
  }

  return (
    <div className="bg-black h-[100dvh] w-full overflow-hidden relative">
      <div className="h-full w-full" ref={emblaRef}>
        <div className="h-full w-full flex flex-col touch-none">
          {slides.map((slide, index) => (
            <div className="relative w-full h-[100dvh] flex-[0_0_100%]" key={`${slide.id}-${index}`}>
               <Slide
                 slide={slide}
                 priorityLoad={
                    // Preload logic: Active, Previous, Next
                    activeSlide?.id === slide.id ||
                    slides[(index + 1) % slides.length]?.id === slide.id ||
                    slides[(index - 1 + slides.length) % slides.length]?.id === slide.id
                 }
               />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainFeed;
