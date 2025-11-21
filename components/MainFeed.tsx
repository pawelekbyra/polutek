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

const MainFeed = () => {
  const { setActiveSlide, setNextSlide, playVideo, activeSlide } = useStore(state => ({
    setActiveSlide: state.setActiveSlide,
    setNextSlide: state.setNextSlide,
    playVideo: state.playVideo,
    activeSlide: state.activeSlide
  }), shallow);

  const [currentViewIndex, setCurrentViewIndex] = useState(0);

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

  // Embla setup
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      axis: 'y',
      loop: true,
      duration: 25, // Adjust swipe duration for snapping feel
      skipSnaps: false,
      dragFree: false
    },
    [WheelGesturesPlugin({ forceWheelAxis: 'y' })]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;

    const index = emblaApi.selectedScrollSnap();
    setCurrentViewIndex(index);

    // Determine "Fetch More" threshold
    // If we are near the end of the list (e.g., 2 items from end) and have more pages
    if (hasNextPage && slides.length - index <= 2) {
       fetchNextPage();
    }

    // Update Global Store
    if (slides[index]) {
        const currentSlide = slides[index];
        // Calculate next slide for pre-warming (handling loop)
        const nextIndex = (index + 1) % slides.length;
        const nextSlide = slides[nextIndex] || null;

        if (activeSlide?.id !== currentSlide.id) {
            setActiveSlide(currentSlide);
            setNextSlide(nextSlide);

            // Play video if applicable
            if (currentSlide.type === 'video') {
                 // Small timeout to ensure transition is settling/done
                 setTimeout(() => {
                     playVideo();
                 }, 50);
            }
        }
    }
  }, [emblaApi, slides, hasNextPage, fetchNextPage, activeSlide, setActiveSlide, setNextSlide, playVideo]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    // Initial select call to set first slide
    onSelect();

    return () => {
        emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Sync activeSlide from store back to Embla (e.g., if changed elsewhere, or initial load)
  useEffect(() => {
    if (!emblaApi || !activeSlide || slides.length === 0) return;

    // Only scroll if the visual index doesn't match the store's active slide
    // This prevents circular loops of updates
    const currentIndex = emblaApi.selectedScrollSnap();
    if (slides[currentIndex]?.id !== activeSlide.id) {
        const indexToScroll = slides.findIndex(s => s.id === activeSlide.id);
        if (indexToScroll !== -1) {
            emblaApi.scrollTo(indexToScroll);
        }
    }
  }, [activeSlide, emblaApi, slides]);


  // Initial load check
  useEffect(() => {
      if (slides.length > 0 && !activeSlide) {
          setActiveSlide(slides[0]);
          setNextSlide(slides[1] || null);
      }
  }, [slides, activeSlide, setActiveSlide, setNextSlide]);

  if (isLoading && slides.length === 0) {
    return <div className="w-screen h-screen bg-black flex items-center justify-center"><Skeleton className="w-full h-full" /></div>;
  }

  if (isError) {
    return <div className="w-screen h-screen bg-black flex items-center justify-center text-white">Error loading slides.</div>;
  }

  return (
    <div className="w-full h-screen bg-black overflow-hidden" ref={emblaRef}>
      <div className="flex flex-col h-full">
        {slides.map((slide, index) => {
          // Virtualization/Logic for priority load
          // Calculate distance in loop context
          const len = slides.length;
          // Standard distance
          let distance = Math.abs(index - currentViewIndex);
          // Loop wrap-around distance
          const loopDistance = Math.min(distance, len - distance);

          // Load if current, next, or previous (neighbor)
          const priorityLoad = loopDistance <= 1;

          return (
            <div className="flex-[0_0_100%] min-h-0 relative" key={slide.id}>
               <Slide slide={slide} priorityLoad={priorityLoad} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainFeed;