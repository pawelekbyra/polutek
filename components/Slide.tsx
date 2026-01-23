"use client";

import React, { memo } from 'react';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';
import SecretOverlay from './SecretOverlay';
import PwaOverlay from './PwaOverlay';
import HtmlContent from './HtmlContent';
import { usePWAStatus } from '@/hooks/usePWAStatus';

const Slide = memo(({ slide }: { slide: any }) => {
    const activeSlideId = useStore(state => state.activeSlide?.id);
    const { isStandalone } = usePWAStatus();

    const isLockedSecret = slide.accessLevel === 'SECRET_PATRON';
    const isLockedPWA = slide.accessLevel === 'SECRET_PWA' && !isStandalone;
    const isLocked = isLockedSecret || isLockedPWA;

    const isActive = activeSlideId === slide.id;

    return (
        <div className="relative w-full h-full z-10 bg-black">
            <div className={cn("w-full h-full transition-all duration-300", isLocked && "blur-md brightness-50")}>
                <HtmlContent data={slide.data} isActive={isActive} />
            </div>
            {isLockedSecret && <SecretOverlay />}
            {isLockedPWA && <PwaOverlay />}
        </div>
    );
});

Slide.displayName = 'Slide';
export default Slide;
