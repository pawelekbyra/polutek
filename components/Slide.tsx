"use client";

import React, { memo, useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { SlideDTO, HtmlSlideDTO, VideoSlideDTO } from '@/lib/dto';
import { useStore } from '@/store/useStore';
import VideoControls from './VideoControls';
import { shallow } from 'zustand/shallow';
import { AnimatePresence, motion } from 'framer-motion';
import PlayIcon from './icons/PlayIcon';
import PauseIcon from './icons/PauseIcon';
import { cn } from '@/lib/utils';
import SecretOverlay from './SecretOverlay';
import PwaOverlay from './PwaOverlay';
import { DEFAULT_AVATAR_URL } from '@/lib/constants';
import LocalVideoPlayer from './LocalVideoPlayer';
import HtmlContent from './HtmlContent';
import { usePWAStatus } from '@/hooks/usePWAStatus';

interface SlideUIProps {
    slide: SlideDTO;
    isLocked?: boolean;
}

const SlideUI = ({ slide, isLocked = false }: SlideUIProps) => {
    const {
        togglePlay,
        isPlaying,
        isMuted,
        seekTo,
        setIsMuted
    } = useStore(state => ({
        togglePlay: state.togglePlay,
        isPlaying: state.isPlaying,
        isMuted: state.isMuted,
        seekTo: state.seekTo,
        setIsMuted: state.setIsMuted,
    }), shallow);

    const [showPlaybackIcon, setShowPlaybackIcon] = useState(false);
    const iconTimer = useRef<NodeJS.Timeout | null>(null);

    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isLocked) return;

        if (e.target === e.currentTarget) {
            togglePlay();
            setShowPlaybackIcon(true);
            if (iconTimer.current) {
                clearTimeout(iconTimer.current);
            }
            iconTimer.current = setTimeout(() => {
                setShowPlaybackIcon(false);
            }, 800);
        }
    }

    useEffect(() => {
        return () => {
            if (iconTimer.current) {
                clearTimeout(iconTimer.current);
            }
        };
    }, []);

    const isVideoSlide = slide.type === 'video';

    return (
      <div
        className={cn(
            "absolute inset-0 z-20 p-4 flex flex-col justify-end text-white",
            isLocked && "pointer-events-none"
        )}
        onClick={handleContainerClick}
      >
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/70 via-black/40 to-transparent pointer-events-none" />

        <AnimatePresence>
            {!isLocked && showPlaybackIcon && (
                <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    initial={{ opacity: 0, scale: 1.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="bg-black/50 rounded-full p-4">
                        {isPlaying ? (
                            <PlayIcon className="w-12 h-12 text-white" />
                        ) : (
                            <PauseIcon className="w-12 h-12 text-white" />
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        <div className="relative z-20 pointer-events-none w-full max-w-[calc(100%-60px)] flex flex-col items-start text-left mb-2 pb-[calc(env(safe-area-inset-bottom)+10px)]">
            <div className="flex items-center gap-2 mb-2 pointer-events-auto max-w-full">
                <Image 
                    src={slide.avatar || DEFAULT_AVATAR_URL} 
                    alt={slide.username || 'User'} 
                    width={40} 
                    height={40} 
                    className="rounded-full border-2 border-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)] shrink-0"
                />
                <p className="font-bold text-lg truncate min-w-0">{slide.username}</p>
            </div>

            {slide.data && 'title' in slide.data && <h2 className="text-xl font-semibold mb-1 truncate w-full">{slide.data.title}</h2>}
            {slide.data && 'description' in slide.data && <p className="text-sm opacity-90 truncate w-full">{slide.data.description}</p>}
        </div>

        <div />

        {isVideoSlide && !isLocked && (
            <div className="pointer-events-auto w-full px-2">
                <VideoControls
                    isPlaying={isPlaying}
                    isMuted={isMuted}
                    onTogglePlay={togglePlay}
                    onToggleMute={() => setIsMuted(!isMuted)}
                    onSeek={seekTo}
                />
            </div>
        )}
      </div>
    );
};

interface SlideProps {
    slide: SlideDTO;
    priorityLoad?: boolean;
}

const Slide = memo<SlideProps>(({ slide, priorityLoad = false }) => {
    const activeSlideId = useStore(state => state.activeSlide?.id);
    const { isStandalone } = usePWAStatus();

    const isLockedSecret = slide.accessLevel === 'SECRET_PATRON';
    const isLockedPWA = slide.accessLevel === 'SECRET_PWA' && !isStandalone;
    const isLocked = isLockedSecret || isLockedPWA;

    const isActive = activeSlideId === slide.id;
    const shouldPlay = isActive && !isLocked;

    const renderContent = () => {
        switch (slide.type) {
            case 'video':
                return <LocalVideoPlayer slide={slide as VideoSlideDTO} isActive={shouldPlay} shouldLoad={priorityLoad} />;
            case 'html':
                return (
                    <HtmlContent
                        data={(slide as HtmlSlideDTO).data}
                        isActive={isActive}
                    />
                );
            default:
                return <div className="w-full h-full bg-gray-800 flex items-center justify-center"><p>Unsupported slide type</p></div>;
        }
    };

    return (
        <div className="relative w-full h-full z-10 bg-black">
            <div className={cn("w-full h-full transition-all duration-300", isLocked && "blur-md brightness-50")}>
                {renderContent()}
            </div>

            {isLockedSecret && <SecretOverlay />}
            {isLockedPWA && <PwaOverlay />}

            <SlideUI slide={slide} isLocked={isLocked} />
        </div>
    );
});

Slide.displayName = 'Slide';
export default Slide;
