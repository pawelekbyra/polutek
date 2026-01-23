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
    <figure className="my-12">
      <div className="aspect-w-16 aspect-h-9 bg-black rounded-sm shadow-lg overflow-hidden relative group">
        <video
          ref={videoRef}
          controls
          poster={poster}
          className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
        />
      </div>
      <figcaption className="mt-3 text-sm text-stone-500 font-sans border-l-2 border-stone-300 pl-3">
        <span className="font-bold text-stone-900 uppercase text-xs mr-2">Materiał Wideo:</span>
        Policyjne nagranie z aresztowania małżeństwa Kordysów (Październik 2020)
      </figcaption>
    </figure>
  );
};

export default ArticleVideoPlayer;
