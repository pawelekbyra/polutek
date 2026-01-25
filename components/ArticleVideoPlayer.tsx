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
    <div className="my-12 w-full bg-black rounded-sm shadow-lg overflow-hidden">
      {/* POPRAWKA: Usunięto wszelkie wymuszanie proporcji (padding/aspect-ratio).
          Użyto 'w-full h-auto', co sprawia, że wysokość odtwarzacza 
          dostosuje się automatycznie do rzeczywistych wymiarów wideo. 
          Klasa 'block' usuwa ewentualne dolne marginesy liniowe.
      */}
      <video
        ref={videoRef}
        controls
        poster={poster}
        className="w-full h-auto block"
      />
    </div>
  );
};

export default ArticleVideoPlayer;
