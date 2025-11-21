"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useStore } from '@/store/useStore';
import { shallow } from 'zustand/shallow';
import Slide from '@/components/Slide';
import { Skeleton } from '@/components/ui/skeleton';
import { SlideDTO } from '@/lib/dto';
import { SlidesResponseSchema } from '@/lib/validators';

const fetchSlides = async ({ pageParam = '' }) => {
  const res = await fetch(`/api/slides?cursor=${pageParam}&limit=5`);
  if (!res.ok) throw new Error('Failed to fetch slides');
  const data = await res.json();
  try {
      return SlidesResponseSchema.parse(data);
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

    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [displaySlides, setDisplaySlides] = useState<SlideDTO[]>([]);
    const [loadedPagesCount, setLoadedPagesCount] = useState(0);

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

    // Sync Query Data to Display Slides
    useEffect(() => {
        if (data?.pages && data.pages.length > loadedPagesCount) {
            const newPages = data.pages.slice(loadedPagesCount);
            const newSlides = newPages.flatMap(page => page.slides) as SlideDTO[];

            if (newSlides.length > 0) {
                setDisplaySlides(prev => [...prev, ...newSlides]);
            }
            setLoadedPagesCount(data.pages.length);
        }
    }, [data, loadedPagesCount]);

    // Initialize active slide
    useEffect(() => {
        if (displaySlides.length > 0 && !activeSlide) {
            setActiveSlide(displaySlides[0]);
            setNextSlide(displaySlides[1] || null);
        }
    }, [displaySlides, activeSlide, setActiveSlide, setNextSlide]);

    // Intersection Observer
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const options = {
            root: container,
            threshold: 0.6,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = Number(entry.target.getAttribute('data-index'));
                    if (!isNaN(index)) {
                        setActiveIndex(index);
                    }
                }
            });
        }, options);

        const elements = container.querySelectorAll('.slide-item');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, [displaySlides.length]); // Re-run when slides grow

    // Loop & Fetch Logic
    useEffect(() => {
        if (displaySlides.length === 0) return;

        const currentSlide = displaySlides[activeIndex];

        // Update Store
        if (currentSlide && currentSlide.id !== activeSlide?.id) {
            setActiveSlide(currentSlide);
            setNextSlide(displaySlides[activeIndex + 1] || null);

            if (currentSlide.type === 'video') {
                playVideo();
            }
        }

        // Check for End of List
        if (activeIndex >= displaySlides.length - 2) {
            if (hasNextPage) {
                // Standard Infinite Scroll
                fetchNextPage();
            } else {
                // MANUAL LOOP: Append duplicates from the start
                // We take the first 5 slides (or all if less than 5) and append them
                const slidesToAppend = displaySlides.slice(0, 5).map(s => ({
                    ...s,
                    // We DO NOT change ID here because it might break tracking?
                    // Actually React needs unique keys. We handle keys in the map render.
                    // But if we have duplicate IDs in the array, `activeSlide` logic might get confused if it relies on finding by ID.
                    // However, `activeSlide` is set by object reference or ID.
                    // If we have two slides with ID "A", finding by ID is ambiguous.
                    // Ideally we should generate a virtual ID, but SlideDTO is strict.
                    // Let's rely on the fact that `currentSlide` is pulled by INDEX.
                }));

                if (slidesToAppend.length > 0) {
                     // We need to be careful not to infinite loop the state update
                     // This effect runs on activeIndex change.
                     // We append only if we are truly at the end.
                     // But we are at the end now.
                     // We should verify we haven't JUST appended them.
                     // But this is simple: we append, list grows, activeIndex is now far from end. Loop stops.
                     // Wait. If activeIndex is 10, length is 12.
                     // We append 5. Length becomes 17.
                     // activeIndex 10 is NOT >= 17-2. Condition fails. Loop stops. Correct.
                     setDisplaySlides(prev => [...prev, ...slidesToAppend]);
                }
            }
        }
    }, [activeIndex, displaySlides, hasNextPage, fetchNextPage, activeSlide, setActiveSlide, setNextSlide, playVideo]);


    if (isLoading && displaySlides.length === 0) {
        return <div className="w-full h-[100dvh] bg-black flex items-center justify-center"><Skeleton className="w-full h-full" /></div>;
    }

    if (isError && displaySlides.length === 0) {
        return <div className="w-full h-[100dvh] bg-black flex items-center justify-center text-white">Error loading slides.</div>;
    }

    return (
        <div
            ref={containerRef}
            className="h-[100dvh] w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar bg-black"
        >
            {displaySlides.map((slide, index) => {
                // Key must be unique even if slide is duplicated
                const uniqueKey = `${slide.id}-idx-${index}`;

                // Optimization
                const isNear = Math.abs(index - activeIndex) <= 2;
                const shouldLoad = index === activeIndex + 1;

                return (
                    <div
                        key={uniqueKey}
                        data-index={index}
                        className="slide-item h-[100dvh] w-full snap-start snap-always"
                    >
                        <Slide
                            slide={slide}
                            priorityLoad={shouldLoad}
                            shouldRenderVideo={isNear}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default MainFeed;
