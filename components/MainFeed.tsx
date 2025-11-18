"use client";

import React, { useRef, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Slide } from '@/lib/types';
import VideoSlide from './VideoSlide';
import { useInView } from 'react-intersection-observer';
import { useStore } from '@/store/useStore';
import { shallow } from 'zustand/shallow';
import { Skeleton } from './ui/skeleton';

const fetchSlides = async ({ pageParam = '' }) => {
  const res = await fetch(`/api/slides?cursor=${pageParam}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

export default function MainFeed() {
  const parentRef = useRef<HTMLDivElement>(null);
  const { activeSlide, setActiveSlide, videoState } = useStore(
    (state) => ({
      activeSlide: state.activeSlide,
      setActiveSlide: state.setActiveSlide,
      videoState: state.videoState,
    }),
    shallow
  );

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ['slides'],
    queryFn: fetchSlides,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: '',
  });

  const slides = data?.pages.flatMap((page) => page.slides) ?? [];

  const rowVirtualizer = useVirtualizer({
      count: hasNextPage ? slides.length + 1 : slides.length,
      getScrollElement: () => parentRef.current,
      estimateSize: () => parentRef.current?.clientHeight || 0,
  });

  const { ref: lastSlideRef, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    const items = rowVirtualizer.getVirtualItems();
    if (videoState.isManuallyPaused) return;

    // Autoplay logic based on viewport visibility
    const handleScroll = () => {
        const currentItems = rowVirtualizer.getVirtualItems();
        if (currentItems.length === 0) return;

        // Find the most visible item
        let mostVisibleIndex = -1;
        let maxVisibility = -1;

        for (const item of currentItems) {
            const itemTop = item.start;
            const itemBottom = item.start + item.size;
            const viewportTop = parentRef.current?.scrollTop || 0;
            const viewportBottom = viewportTop + (parentRef.current?.clientHeight || 0);

            const visibleTop = Math.max(itemTop, viewportTop);
            const visibleBottom = Math.min(itemBottom, viewportBottom);

            const visibility = Math.max(0, visibleBottom - visibleTop);
            if (visibility > maxVisibility) {
                maxVisibility = visibility;
                mostVisibleIndex = item.index;
            }
        }

        if (mostVisibleIndex !== -1 && mostVisibleIndex !== activeSlide) {
            setActiveSlide(slides[mostVisibleIndex], mostVisibleIndex);
        }
    };

    const currentParentRef = parentRef.current;
    currentParentRef?.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => currentParentRef?.removeEventListener('scroll', handleScroll);
}, [rowVirtualizer, setActiveSlide, activeSlide, videoState.isManuallyPaused, slides]);


  if (isLoading) return <Skeleton className="w-full h-full" />;
  if (isError) return <div>Error loading slides</div>;

  return (
    <div ref={parentRef} className="h-full w-full overflow-y-auto snap-y snap-mandatory scroll-smooth">
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => {
          const isLoaderRow = virtualItem.index > slides.length - 1;
          const slide = slides[virtualItem.index];

          return (
            <div
              key={virtualItem.key}
              ref={virtualItem.index === slides.length - 1 ? lastSlideRef : null}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
              className="snap-start"
            >
              {isLoaderRow ? (
                <div className="h-full w-full flex items-center justify-center">
                    <Skeleton className="w-full h-full" />
                </div>
              ) : (
                <VideoSlide
                  slide={slide}
                  isActive={virtualItem.index === activeSlide}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
