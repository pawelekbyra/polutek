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
      {/* ZMIANA: Usunięto 'aspect-w-16 aspect-h-9'. 
         Dodano style={{ aspectRatio: '1920 / 820' }} aby pasowało idealnie do formatu Twojego wideo.
      */}
      <div 
        className="w-full bg-black rounded-sm shadow-lg overflow-hidden relative group"
        style={{ aspectRatio: '1920 / 820' }}
      >
        <video
          ref={videoRef}
          controls
          poster={poster}
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
        />
      </div>
    </div>
  );
};

export default ArticleVideoPlayer;
