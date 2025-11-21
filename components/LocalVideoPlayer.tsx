"use client";

import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { useStore } from '@/store/useStore';
import { shallow } from 'zustand/shallow';
import { VideoSlideDTO } from '@/lib/dto';
import { cn } from '@/lib/utils';

interface LocalVideoPlayerProps {
    slide: VideoSlideDTO;
    isActive: boolean;
    shouldLoad?: boolean; // Odbieramy prop do preloadingu
}

const LocalVideoPlayer = ({ slide, isActive, shouldLoad = false }: LocalVideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<Hls | null>(null);
    const [isReadyToPlay, setIsReadyToPlay] = useState(false);

    // Global state
    const { isPlaying, isMuted } = useStore(
        (state) => ({
            isPlaying: state.isPlaying,
            isMuted: state.isMuted,
        }),
        shallow
    );

    // 1. Inicjalizacja HLS (tylko raz)
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const { hlsUrl, mp4Url } = slide.data;

        if (Hls.isSupported() && hlsUrl) {
            const hls = new Hls({
                autoStartLoad: false, // WAŻNE: Nie ładuj automatycznie, czekaj na sygnał
                capLevelToPlayerSize: true,
            });
            hlsRef.current = hls;
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                setIsReadyToPlay(true);
            });
            // Handle errors
            hls.on(Hls.Events.ERROR, function (event, data) {
                 if (data.fatal) {
                    switch (data.type) {
                    case Hls.ErrorTypes.NETWORK_ERROR:
                        console.log('fatal network error encountered, try to recover');
                        hls.startLoad();
                        break;
                    case Hls.ErrorTypes.MEDIA_ERROR:
                        console.log('fatal media error encountered, try to recover');
                        hls.recoverMediaError();
                        break;
                    default:
                        // cannot recover
                        hls.destroy();
                        break;
                    }
                }
            });

            // Cleanup
            return () => {
                if (hlsRef.current) {
                    hlsRef.current.destroy();
                    hlsRef.current = null;
                }
            };
        } else if (video.canPlayType('application/vnd.apple.mpegurl') && hlsUrl) {
             // Native HLS (iOS)
             video.src = hlsUrl;
             setIsReadyToPlay(true);
        } else if (mp4Url) {
             video.src = mp4Url;
             setIsReadyToPlay(true);
        }
    }, [slide.data.hlsUrl, slide.data.mp4Url]);

    // 2. Logika Preloadingu (Smart Loading)
    useEffect(() => {
        const hls = hlsRef.current;
        
        // Jeśli slajd jest aktywny LUB jest następny w kolejce (shouldLoad) -> ładujemy dane
        if ((isActive || shouldLoad) && hls && slide.data.hlsUrl) {
            // Sprawdź, czy już nie załadowano, aby uniknąć duplikatów
            // Note: checking hls.url might be unreliable if it wasn't set yet, but startLoad is safe.
            hls.loadSource(slide.data.hlsUrl);
            hls.startLoad();
        }
    }, [isActive, shouldLoad, slide.data.hlsUrl, slide.id]);

    // 3. Logika Odtwarzania (Tylko Active)
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Strictly play only if this specific slide is active AND global state is playing
        const shouldPlay = isActive && isPlaying;

        if (shouldPlay) {
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    // Auto-play policy block is common, we swallow it here to avoid console noise,
                    // but the UI shows a Pause icon if it fails usually.
                    // console.warn("Autoplay prevented", error);
                });
            }
        } else {
            video.pause();
            if (!isActive) {
                // Optional: Reset time if scrolled away?
                // video.currentTime = 0; 
                // Leaving it paused at current frame is usually better UX for "scrolling back"
            }
        }
    }, [isActive, isPlaying]);

    // 4. Obsługa Mute
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = isMuted;
        }
    }, [isMuted]);

    return (
        <div className="absolute inset-0 z-0 bg-black">
             <video
                ref={videoRef}
                className="w-full h-full object-cover"
                loop
                playsInline
                muted={isMuted}
                poster={slide.data.poster}
            />
        </div>
    );
};

export default LocalVideoPlayer;
