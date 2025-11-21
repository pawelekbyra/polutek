import { StateCreator } from 'zustand';
import { SlideDTO } from '@/lib/dto';

export interface ContentSlice {
  /** The index of the currently active slide in the main feed. */
  activeSlideIndex: number | null;
  /** Sets the index of the active slide. */
  setActiveSlideIndex: (index: number | null) => void;

  /** @deprecated Use `activeSlideIndex` instead. Kept for backward compatibility. */
  activeSlide: SlideDTO | null;
  /** @deprecated This logic is now handled by the `isNearby` calculation in the `Slide` component. */
  nextSlide: SlideDTO | null;
  /** @deprecated Use `setActiveSlideIndex` instead. */
  setActiveSlide: (slide: SlideDTO | null) => void;
  /** @deprecated This logic is now handled by the `isNearby` calculation in the `Slide` component. */
  setNextSlide: (slide: SlideDTO | null) => void;

  jumpToSlide: (slideId: string) => void;
}

export const createContentSlice: StateCreator<ContentSlice> = (set) => ({
  activeSlideIndex: 0, // Start with the first slide as active
  setActiveSlideIndex: (index) => set({ activeSlideIndex: index }),

  // Deprecated fields
  activeSlide: null,
  nextSlide: null,
  setActiveSlide: (slide) => set({ activeSlide: slide }),
  setNextSlide: (slide) => set({ nextSlide: slide }),
  jumpToSlide: (slideId) => console.log('Jump to slide not implemented globally yet', slideId),
});
