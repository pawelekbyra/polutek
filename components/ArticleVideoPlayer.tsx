"use client";
import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface ArticleVideoPlayerProps {
  src: string;
  poster: string;
}

const ArticleVideoPlayer: React.FC<ArticleVideoPlayerProps> = ({ src, poster }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(video);
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src;
      }
    }
  }, [src]);

  return (
    <div className="my-12">
      {/* POPRAWKA:
          1. Zmieniono aspectRatio na '16 / 9', aby pasowało do standardu wideo i mieściło kontrolki.
          2. Zmieniono object-cover na object-contain, aby wideo zawsze mieściło się w ramce bez ucinania krawędzi.
      */}
      <div 
        className="w-full bg-black rounded-sm shadow-lg overflow-hidden relative group"
        style={{ aspectRatio: '16 / 9' }}
      >
        <video
          ref={videoRef}
          controls
          poster={poster}
          className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
        />
      </div>
    </div>
  );
};

export default ArticleVideoPlayer;
