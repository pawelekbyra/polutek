"use client";

import React, { useEffect, useRef } from 'react';

export const ArticleVideoPlayer: React.FC<{ src: string; poster?: string; ariaLabel?: string }> = ({ src, poster, ariaLabel }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let hls: any;
    const video = videoRef.current;
    if (video) {
      if (src.endsWith('.m3u8')) {
        if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = src;
        } else if ((window as any).Hls && (window as any).Hls.isSupported()) {
          hls = new (window as any).Hls();
          hls.loadSource(src);
          hls.attachMedia(video);
        }
      } else {
        video.src = src;
      }
    }
    return () => {
      if (hls) hls.destroy();
    };
  }, [src]);

  return (
    <div className="not-prose w-full bg-black rounded-sm overflow-hidden flex items-center justify-center relative group border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-10">
      <video
        ref={videoRef}
        controls
        poster={poster}
        className="w-full h-auto object-contain"
        playsInline
        aria-label={ariaLabel}
      />
    </div>
  );
};
