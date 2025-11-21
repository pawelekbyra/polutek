import React, { useMemo, useEffect } from 'react';
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
  const { activeSlide, setActiveSlide, setNextSlide, playVideo } = useStore(state => ({
    activeSlide: state.activeSlide,
    setActiveSlide: state.setActiveSlide,
    setNextSlide: state.setNextSlide,
    playVideo: state.playVideo
  }), shallow);

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

  const activeIndex = useMemo(() => {
      if (!activeSlide) return 0;
      return slides.findIndex(s => s.id === activeSlide.id);
  }, [slides, activeSlide]);

  useEffect(() => {
      if (slides.length > 0 && !activeSlide) {
          setActiveSlide(slides[0]);
          if (slides[0].type === 'video') {
              playVideo();
          }
      }
  }, [slides, activeSlide, setActiveSlide, playVideo]);

  if (isLoading && slides.length === 0) {
    return <div className="w-screen h-screen bg-black flex items-center justify-center"><Skeleton className="w-full h-full" /></div>;
  }

  if (isError) {
    return <div className="w-screen h-screen bg-black flex items-center justify-center text-white">Error loading slides.</div>;
  }

  return (
    <div className="h-[100dvh] w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      {slides.map((slide, index) => {
          const priorityLoad = index === activeIndex || index === activeIndex + 1;

          return (
            <div key={slide.id} className="h-[100dvh] w-full snap-start snap-always relative">
               <Slide
                 slide={slide}
                 priorityLoad={priorityLoad}
                 onInView={() => {
                     if (activeSlide?.id !== slide.id) {
                         setActiveSlide(slide);
                         const next = slides[index + 1] || null;
                         setNextSlide(next);
                         if (slide.type === 'video') {
                             playVideo();
                         }
                     }

                     if (index >= slides.length - 2 && hasNextPage && !isFetchingNextPage) {
                         fetchNextPage();
                     }
                 }}
               />
            </div>
          );
      })}
      {isFetchingNextPage && (
          <div className="h-[100dvh] w-full snap-start flex items-center justify-center bg-black">
              <Skeleton className="w-full h-full opacity-20" />
          </div>
      )}
    </div>
  );
};

export default MainFeed;
