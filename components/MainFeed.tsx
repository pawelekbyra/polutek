import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import Slide from '@/components/Slide';
import { Skeleton } from '@/components/ui/skeleton';
import { useStore } from '@/store/useStore';
import { SlidesResponseSchema } from '@/lib/validators';
import { SlideDTO } from '@/lib/dto';
import { shallow } from 'zustand/shallow';

// CSS for hiding scrollbar but keeping functionality
const hideScrollbarStyle: React.CSSProperties = {
  msOverflowStyle: 'none',  /* IE and Edge */
  scrollbarWidth: 'none',  /* Firefox */
};

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

  const virtuosoRef = useRef<VirtuosoHandle>(null);
  const [slidesList, setSlidesList] = useState<SlideDTO[]>([]);
  // We keep track if we are currently appending recycled slides to avoid rapid loops
  const [isRecycling, setIsRecycling] = useState(false);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    isFetching
  } = useInfiniteQuery({
    queryKey: ['slides'],
    queryFn: fetchSlides,
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  // Sync React Query data to our local list, but only append new unique data
  // We need a stable list that we can manually append to for the infinite loop effect
  useEffect(() => {
    if (data?.pages) {
      const newSlides = data.pages.flatMap(page => page.slides) as SlideDTO[];

      // If we haven't started recycling yet, we strictly follow the API data
      // Once we start recycling (looping), we manage the list manually
      setSlidesList(prev => {
          // Check if we have looped content (manual list is longer than API list)
          // This is a simple heuristic.
          const isLooping = prev.length > newSlides.length;

          if (isLooping) {
            return prev; // Don't overwrite looped list with shorter API list
          }
          return newSlides;
      });
    }
  }, [data]);

  // Handle Infinite Loop Logic
  const handleEndReached = useCallback(() => {
    if (hasNextPage) {
       fetchNextPage();
    } else if (slidesList.length > 0 && !isFetching && !isRecycling) {
       // API is exhausted, but we want an infinite loop.
       // Append the existing slides to the end.
       setIsRecycling(true);

       setSlidesList(prev => {
         // Append a copy of the slides to create the loop
         return [...prev, ...prev];
       });

       // Reset recycling flag after a delay to allow state to settle
       setTimeout(() => setIsRecycling(false), 1000);
    }
  }, [hasNextPage, fetchNextPage, slidesList.length, isFetching, isRecycling]);

  // Update Active Slide
  const handleRangeChanged = useCallback((range: { startIndex: number }) => {
      const index = range.startIndex;
      if (index >= 0 && index < slidesList.length) {
          const currentSlide = slidesList[index];
          const nextSlide = slidesList[index + 1] || null;

          // Update store
          setActiveSlide(currentSlide);
          setNextSlide(nextSlide);

          if (currentSlide.type === 'video') {
            playVideo();
          }
      }
  }, [slidesList, setActiveSlide, setNextSlide, playVideo]);

  if (isLoading && slidesList.length === 0) {
    return <div className="w-full h-[100dvh] bg-black flex items-center justify-center"><Skeleton className="w-full h-full" /></div>;
  }

  if (isError) {
    return <div className="w-full h-[100dvh] bg-black flex items-center justify-center text-white">Error loading slides.</div>;
  }

  return (
    <>
        <style jsx global>{`
            .hide-scrollbar::-webkit-scrollbar {
                display: none;
            }
        `}</style>
        <Virtuoso
          ref={virtuosoRef}
          className="snap-y snap-mandatory h-[100dvh] w-full overflow-y-scroll hide-scrollbar"
          style={{ ...hideScrollbarStyle, height: '100dvh' }}
          data={slidesList}
          overscan={1}
          endReached={handleEndReached}
          rangeChanged={handleRangeChanged}
          itemContent={(index, slide) => {
            return (
              <div
                className="h-[100dvh] w-full snap-start relative"
                key={`${slide.id}-${index}`}
              >
                 <Slide slide={slide} priorityLoad={true} />
              </div>
            );
          }}
        />
    </>
  );
};

export default MainFeed;