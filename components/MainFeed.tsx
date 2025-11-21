import React, { useMemo, useEffect, useCallback, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import { useStore } from '@/store/useStore';
import { SlidesResponseSchema } from '@/lib/validators';
import { SlideDTO } from '@/lib/dto';
import { shallow } from 'zustand/shallow';
import Slide from '@/components/Slide';
import { Skeleton } from '@/components/ui/skeleton';

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
    loop: true,
    skipSnaps: false,
    duration: 25
  }, [WheelGesturesPlugin()]);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;

    const index = emblaApi.selectedScrollSnap();
    setCurrentSlideIndex(index);

    // If we are looping, the index might be deceptive if the array length is small,
    // but embla returns the index relative to the provided slides array (0 to N-1).
    if (slides.length > 0) {
      const currentSlide = slides[index];
      // Calculate next slide index wrapping around
      const nextIndex = (index + 1) % slides.length;
      const nextSlide = slides[nextIndex] || null;

      if (activeSlide?.id !== currentSlide.id) {
        setActiveSlide(currentSlide);
        setNextSlide(nextSlide);
        if (currentSlide.type === 'video') {
          playVideo();
        }
      }
    }

    // Check if we need to fetch more
    // If we are within 2 slides of the "end" of the current list, try to fetch more
    if (hasNextPage && (slides.length - index) <= 2) {
       fetchNextPage();
    }

  }, [emblaApi, slides, activeSlide, setActiveSlide, setNextSlide, playVideo, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    // Initial select call to set state
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Re-init embla when slides change if needed, though embla usually handles children updates automatically.
  useEffect(() => {
    if (emblaApi) emblaApi.reInit();
  }, [emblaApi, slides.length]);

  // Initialize active slide if not set (on first load)
  useEffect(() => {
    if (slides.length > 0 && !activeSlide) {
      setActiveSlide(slides[0]);
      setNextSlide(slides[1] || null);
    }
  }, [slides, activeSlide, setActiveSlide, setNextSlide]);

  if (isLoading && slides.length === 0) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <Skeleton className="w-full h-full bg-gray-900" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center text-white z-50">
        <p>Nie udało się załadować treści.</p>
      </div>
    );
  }

  return (
    // Use fixed inset-0 to ensure full coverage on mobile without scrollbars
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-black z-0">
      <div className="h-full" ref={emblaRef}>
        <div className="h-full flex flex-col touch-pan-y">
          {slides.map((slide, index) => {
            // Performance optimization: only load video/heavy content for slides near the active one
            // With loop: true, we must consider the wrap-around distance
            const total = slides.length;
            let distance = Math.abs(index - currentSlideIndex);
            // Adjust distance for loop (e.g. if current is 0 and total is 5, index 4 distance is 1)
            if (distance > total / 2) {
              distance = total - distance;
            }

            const priorityLoad = distance <= 1;

            return (
              <div className="flex-[0_0_100%] min-h-0 relative w-full" key={slide.id}>
                 <Slide slide={slide} priorityLoad={priorityLoad} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainFeed;
