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
    <div className="my-12 w-full">
      {/* POPRAWKA: Zastosowano 'padding-bottom hack'.
         1. relative + paddingBottom: '56.25%' tworzy sztywną ramkę o proporcjach 16:9.
         2. Wideo jest pozycjonowane absolutnie (absolute inset-0), co zmusza je do 
            wypełnienia ramki co do piksela, eliminując paski i ucinanie kontrolek.
      */}
      <div 
        className="relative w-full bg-black rounded-sm shadow-lg overflow-hidden group"
        style={{ paddingBottom: '56.25%' }} // 9 / 16 = 0.5625 czyli 56.25%
      >
        <video
          ref={videoRef}
          controls
          poster={poster}
          className="absolute top-0 left-0 w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
        />
      </div>
    </div>
  );
};

export default ArticleVideoPlayer;
