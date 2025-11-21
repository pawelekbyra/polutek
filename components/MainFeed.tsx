import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
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

const MainFeed = () => {
  const { setActiveSlide, setNextSlide, playVideo, activeSlide } = useStore(state => ({
    setActiveSlide: state.setActiveSlide,
    setNextSlide: state.setNextSlide,
    playVideo: state.playVideo,
    activeSlide: state.activeSlide
  }), shallow);

  const [currentViewIndex, setCurrentViewIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['slides'],
    queryFn: fetchSlides,
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const slides = useMemo(() => {
    return (data?.pages.flatMap(page => page.slides) ?? []) as SlideDTO[];
  }, [data]);

  // Initialize active slide if not set
  useEffect(() => {
      if (slides.length > 0 && !activeSlide) {
          setActiveSlide(slides[0]);
          setNextSlide(slides[1] || null);
      }
  }, [slides, activeSlide, setActiveSlide, setNextSlide]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const indexAttr = entry.target.getAttribute('data-index');
          if (indexAttr === null) return;

          const index = parseInt(indexAttr, 10);

          // Update local state for priority loading
          setCurrentViewIndex(index);

          const currentSlide = slides[index];
          const nextSlide = slides[index + 1] || null;

          if (currentSlide && activeSlide?.id !== currentSlide.id) {
             setActiveSlide(currentSlide);
             setNextSlide(nextSlide);
             if (currentSlide.type === 'video') {
                playVideo();
             }
          }

          // Load more if near the end (last 2 items)
          if (index >= slides.length - 2 && hasNextPage && !isFetchingNextPage) {
             fetchNextPage();
          }
        }
      });
    }, {
      root: container,
      threshold: 0.6
    });

    const elements = container.querySelectorAll('.slide-item');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [slides, activeSlide, setActiveSlide, setNextSlide, playVideo, hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (isLoading && slides.length === 0) {
    return <div className="w-screen h-screen bg-black flex items-center justify-center"><Skeleton className="w-full h-full" /></div>;
  }

  if (isError) {
    return <div className="w-screen h-screen bg-black flex items-center justify-center text-white">Error loading slides.</div>;
  }

  return (
    <div
      ref={containerRef}
      className="h-[100dvh] w-full overflow-y-scroll snap-y snap-mandatory"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {slides.map((slide, index) => {
        // Load current, previous, and next slide (buffer)
        const isPriority = Math.abs(index - currentViewIndex) <= 1;

        return (
          <div
            key={slide.id}
            data-index={index}
            className="slide-item h-full w-full snap-start relative"
          >
            <Slide slide={slide} priorityLoad={isPriority} />
          </div>
        );
      })}
    </div>
  );
};

export default MainFeed;
