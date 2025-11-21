"use client";

import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { useStore } from '@/store/useStore';
import { shallow } from 'zustand/shallow';
import { VideoSlideDTO } from '@/lib/dto';

interface LocalVideoPlayerProps {
    slide: VideoSlideDTO;
    isActive: boolean;
    shouldLoad: boolean;
}

const LocalVideoPlayer = ({ slide, isActive, shouldLoad }: LocalVideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<Hls | null>(null);

    // LOKALNY STAN WIDOCZNOŚCI - NASZ "BEZPIECZNIK"
    const [isPhysicallyVisible, setIsPhysicallyVisible] = useState(false);

    // Pobieramy stany globalne
    const { isPlaying, isMuted } = useStore(
        (state) => ({
            isPlaying: state.isPlaying,
            isMuted: state.isMuted,
        }),
        shallow
    );

    // 1. WEWNĘTRZNY INTERSECTION OBSERVER ("BEZPIECZNIK")
    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsPhysicallyVisible(entry.isIntersecting);
            },
            { threshold: 0.5 } // Wystarczy, że widać co najmniej połowę wideo
        );
        observer.observe(videoElement);

        return () => {
            if (videoElement) {
                observer.unobserve(videoElement);
            }
        };
    }, []);

    // 2. ZARZĄDZANIE CYKLEM ŻYCIA HLS.js
    useEffect(() => {
        const video = videoRef.current;
        const { hlsUrl, mp4Url } = slide.data;

        if (!video) return;

        // Jeśli slajd jest "w pobliżu" i ma URL HLS
        if (shouldLoad && hlsUrl) {
            if (hlsRef.current === null) { // Inicjalizuj tylko raz
                if (Hls.isSupported()) {
                    const hls = new Hls({ capLevelToPlayerSize: true });
                    hlsRef.current = hls;
                    hls.loadSource(hlsUrl);
                    hls.attachMedia(video);
                } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                    // Native HLS (iOS)
                    video.src = hlsUrl;
                }
            }
        }
        // Jeśli slajd już nie jest potrzebny
        else if (!shouldLoad && hlsRef.current) {
            hlsRef.current.destroy();
            hlsRef.current = null;
        } else if (shouldLoad && mp4Url && !video.src) {
             // Fallback do MP4
             video.src = mp4Url;
        }

    }, [shouldLoad, slide.data.hlsUrl, slide.data.mp4Url, slide.id]);


    // 3. LOGIKA ODTWARZANIA - "PODWÓJNY BEZPIECZNIK"
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Warunek odtwarzania:
        // 1. React uważa, że to slajd aktywny (`isActive`).
        // 2. Użytkownik chce odtwarzać (`isPlaying`).
        // 3. I NAJWAŻNIEJSZE: Nasz Observer potwierdza, że wideo jest FIZYCZNIE WIDOCZNE.
        const shouldPlay = isActive && isPlaying && isPhysicallyVisible;

        if (shouldPlay) {
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    if (error.name !== 'AbortError') {
                        console.warn("Autoplay prevented", error);
                    }
                });
            }
        } else {
            video.pause();
            // Przewiń do początku, gdy slajd przestaje być aktywny
            if (!isActive && video.currentTime > 0) {
                video.currentTime = 0;
            }
        }
    }, [isActive, isPlaying, isPhysicallyVisible]);


    // 4. Obsługa wyciszenia
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
                muted // Zawsze `muted` na starcie, stanem zarządza React
                poster={slide.data.poster}
            />
        </div>
    );
};

export default LocalVideoPlayer;
