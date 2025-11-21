import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import Slide from '@/components/Slide';
import { Skeleton } from '@/components/ui/skeleton';
import { useStore } from '@/store/useStore';
import { SlidesResponseSchema } from '@/lib/validators';
import { SlideDTO } from '@/lib/dto';
import { shallow } from 'zustand/shallow';

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

const FeedCarousel = () => {
  const { setActiveSlide, setNextSlide, playVideo, activeSlide } = useStore(state => ({
    setActiveSlide: state.setActiveSlide,
    setNextSlide: state.setNextSlide,
    playVideo: state.playVideo,
    activeSlide: state.activeSlide
  }), shallow);

  const [currentIndex, setCurrentIndex] = useState(0);

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

  // Embla setup: Vertical axis, Loop enabled
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      axis: 'y',
      loop: true,
      skipSnaps: false,
      dragFree: false
    },
    [WheelGesturesPlugin({ forceWheelAxis: 'y' })]
  );

  // Sync Active Slide Logic
  const updateActiveSlide = useCallback((index: number) => {
      if (!slides || slides.length === 0) return;

      const realIndex = index % slides.length; // Handle safe indexing just in case
      const currentSlide = slides[realIndex];
      const nextIndex = (realIndex + 1) % slides.length;
      const nextSlide = slides[nextIndex] || null;

      if (activeSlide?.id !== currentSlide.id) {
          setActiveSlide(currentSlide);
          setNextSlide(nextSlide);

          // Small delay to allow snap to settle before playing, though Embla is stable
          if (currentSlide.type === 'video') {
             playVideo();
          }
      }
  }, [slides, activeSlide, setActiveSlide, setNextSlide, playVideo]);

  // Embla Event Listener
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const index = emblaApi.selectedScrollSnap();
      setCurrentIndex(index);
      updateActiveSlide(index);

      // Infinite Loading Trigger: If we are near the end, fetch more.
      // Note: In a loop, "end" is relative, but Embla's index increases.
      // However, checking strict length vs index is good enough for append-style infinite scroll.
      if (hasNextPage && (index >= slides.length - 2)) {
         fetchNextPage();
      }
    };

    emblaApi.on('select', onSelect);
    // Initial sync
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    }
  }, [emblaApi, updateActiveSlide, hasNextPage, slides.length, fetchNextPage]);

  // Re-init Embla when slides change (important for infinite query appending)
  useEffect(() => {
      if (emblaApi) emblaApi.reInit();
  }, [slides, emblaApi]);


  if (isLoading && slides.length === 0) {
    return (
        <div className="w-screen h-screen bg-black flex items-center justify-center">
            <Skeleton className="w-full h-full bg-zinc-900" />
        </div>
    );
  }

  if (isError) {
    return <div className="w-screen h-screen bg-black flex items-center justify-center text-white">Error loading slides.</div>;
  }

  return (
    <div className="h-screen w-full bg-black overflow-hidden relative">
      <div className="h-full w-full" ref={emblaRef}>
        <div className="h-full w-full flex flex-col touch-pan-y">
          {slides.map((slide, index) => {
            // Logic to determine if we should load this slide (Active + Neighbors)
            // Handles loop wraparound logic for neighbors
            const isNeighbor =
                Math.abs(index - currentIndex) <= 1 ||
                (index === 0 && currentIndex === slides.length - 1) ||
                (index === slides.length - 1 && currentIndex === 0);

            return (
              <div className="h-full w-full flex-[0_0_100%] min-h-0 relative" key={`${slide.id}-${index}`}>
                 {/* Only render heavy content if it's near the active viewport */}
                 <Slide slide={slide} priorityLoad={isNeighbor} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeedCarousel;
