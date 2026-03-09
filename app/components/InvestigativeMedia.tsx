import React, { useEffect, useRef } from 'react';

const ARREST_VIDEO_URL = "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/jaroslaw-karolina-kordys-aresztowanie-zatrzymanie-ayahuasca-hermanovice-2020.mp4";
const STEFANEK_VIDEO_URL = "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/historia-powstania-osady-natury-zew-w-gruncie-ruchu-stefan.mp4";
const KICINSKI_VIDEO_URL = "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/intencja-swiadomosc-sprawczosci-michal-kicinski-qa-festiwal-wibracje.mp4";
const ARREST_COVER = "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/kordys-aresztowanie-cover-photo.png";

const ArticleVideoPlayer: React.FC<{ src: string; poster?: string }> = ({ src, poster }) => {
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
    <div className="not-prose w-full bg-black aspect-video rounded-sm overflow-hidden flex items-center justify-center relative group border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-10">
      <video ref={videoRef} controls poster={poster} className="w-full h-full object-cover" playsInline />
    </div>
  );
};

export const ArrestVideo = () => (
  <div className="not-prose my-8">
    <ArticleVideoPlayer src={ARREST_VIDEO_URL} poster={ARREST_COVER} />
    <div className="mt-4 text-sm text-black font-mono border-l-[4px] border-black pl-4 bg-[#e8d154]/20 py-2 relative z-10">
      <span className="font-black uppercase text-xs mr-2">Materiał Operacyjny:</span>
      Nagranie z policyjnego nalotu na ośrodek w Hermanovicach (15.10.2020)
    </div>
  </div>
);

export const StefanekVideo = () => (
  <div className="not-prose my-8">
    <ArticleVideoPlayer src={STEFANEK_VIDEO_URL} />
    <div className="mt-4 text-sm text-black font-mono border-l-[4px] border-black pl-4 bg-[#e8d154]/20 py-2 relative z-10">
      <span className="font-black uppercase text-xs mr-2">Materiał Wideo:</span>
      Krzysztof Stefanek opowiada o cudownym otrzymaniu darowizny (Materiał z 2025 r.)
    </div>
  </div>
);

export const KicinskiVideo = () => (
  <div className="not-prose my-8">
    <ArticleVideoPlayer src={KICINSKI_VIDEO_URL} />
    <div className="mt-4 text-sm text-black font-mono border-l-[4px] border-black pl-4 bg-[#e8d154]/20 py-2 relative z-10">
      <span className="font-black uppercase text-xs mr-2">Materiał Wideo:</span>
      Michał Kiciński o intencji i świadomości (Festiwal Wibracje)
    </div>
  </div>
);
