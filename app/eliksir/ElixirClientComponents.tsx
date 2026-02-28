"use client";

import React, { useEffect, useRef, useState, useCallback, createContext, useContext } from 'react';
import {
  Scale, FileText, Search, Mail, Stamp, X,
  Home as HouseIcon, ExternalLink, ChevronLeft, ChevronRight, Download
} from 'lucide-react';
import Hls from 'hls.js';
import {
  GALLERY_NYDEK,
  GALLERY_WYROK_KORDYS,
  GALLERY_WYROK_BADI,
  GALLERY_WEZWANIE_KICINSKI,
  GALLERY_JANOV,
  GalleryData
} from '@/lib/eliksir-data';

export const EvidenceAudioModal = ({ src, isOpen, onClose }: { src: string, isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div onClick={onClose} className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 transition-all duration-300">
      <div onClick={(e) => e.stopPropagation()} className="bg-[#1a1a1a] shadow-2xl rounded-lg w-full max-w-sm relative overflow-hidden animate-[fadeIn_0.3s_ease-out] border border-stone-700">
        <div className="h-1 w-full bg-gradient-to-r from-red-800 via-red-600 to-red-800"></div>
        <div className="p-6 relative text-left">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] pointer-events-none"></div>
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="flex h-2 w-2 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span></span>
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-[0.2em]">Dowód #A-23</span>
              </div>
              <h3 className="text-stone-100 font-serif text-xl italic tracking-wide">„Rozmowa w ogrodzie”</h3>
            </div>
            <button onClick={onClose} className="text-stone-500 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"><X className="w-5 h-5" /></button>
          </div>
          <div className="bg-stone-800 rounded border border-stone-700 p-4 mb-6 shadow-inner relative group">
            <div className="flex justify-between items-center bg-black/40 rounded px-3 py-4 border border-stone-600/50">
                <div className="w-8 h-8 rounded-full border-2 border-stone-600 bg-[#111] flex items-center justify-center"><div className="w-2 h-2 bg-stone-700 rounded-full"></div></div>
                <div className="flex-1 mx-3 h-8 bg-[#2a2a2a] rounded flex items-center justify-center overflow-hidden relative"><div className="absolute w-[120%] h-[1px] bg-stone-600 rotate-12 top-1/2"></div><span className="text-[9px] font-mono text-stone-500 z-10 bg-[#2a2a2a] px-1">SIDE A</span></div>
                <div className="w-8 h-8 rounded-full border-2 border-stone-600 bg-[#111] flex items-center justify-center"><div className="w-2 h-2 bg-stone-700 rounded-full"></div></div>
            </div>
            <div className="mt-3 text-center"><span className="font-mono text-[10px] text-stone-400 uppercase tracking-wider block">K. Stefanek / 2023</span></div>
          </div>
          <div className="bg-stone-200 rounded p-1">
            <audio controls className="w-full h-8 accent-stone-900 focus:outline-none">
              <source src={src} type="audio/mpeg" />
            </audio>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ArticleVideoPlayer: React.FC<{ src: string; poster: string }> = ({ src, poster }) => {
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
      <video ref={videoRef} controls poster={poster} className="w-full h-auto block" />
    </div>
  );
};

export const GalleryModal: React.FC<{ isOpen: boolean; onClose: () => void; data: GalleryData | null }> = ({ isOpen, onClose, data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen, data]);
  const handleNext = useCallback(() => {
    if (!data) return;
    setCurrentIndex((prev) => (prev + 1) % data.images.length);
  }, [data]);
  const handlePrev = useCallback(() => {
    if (!data) return;
    setCurrentIndex((prev) => (prev - 1 + data.images.length) % data.images.length);
  }, [data]);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (data?.type !== 'verdict') {
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handleNext, handlePrev, data]);
  if (!isOpen || !data) return null;
  const isVerdict = data.type === 'verdict';
  return (
    <div className={`fixed inset-0 z-[100] flex flex-col ${isVerdict ? 'bg-stone-900/95' : 'bg-black'} backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]`}>
      <div className="flex items-center justify-between px-4 py-3 bg-black/40 border-b border-white/10 z-50 shrink-0">
        <div className="text-white text-left">
          <h3 className="font-bold text-sm md:text-base leading-tight">{data.title}</h3>
          <p className="font-mono text-[10px] text-stone-400 mt-1 uppercase tracking-wider">
             {isVerdict ? `Dokument: ${data.images.length} stron` : `Zdjęcie ${currentIndex + 1} / ${data.images.length}`}
             {data.signature && <span className="mx-2 text-stone-600">|</span>}
             {data.signature}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {data.pdfUrl && (
             <a href={data.pdfUrl} target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-stone-800 text-stone-200 text-xs font-bold uppercase tracking-wider hover:bg-stone-700 transition-colors rounded-sm border border-white/10">
               <Download className="w-3 h-3" /> PDF
             </a>
          )}
          <button onClick={onClose} className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden relative w-full h-full">
        {isVerdict ? (
          <div className="w-full h-full overflow-y-auto p-4 md:p-8 flex justify-center bg-[#1a1a1a]">
            <div className="flex flex-col gap-4 max-w-4xl w-full">
               {data.images.map((img, idx) => (
                 <div key={idx} className="relative group">
                   <img src={img} alt={`Strona ${idx + 1}`} className="w-full h-auto shadow-2xl border border-stone-700" loading="lazy" />
                   <div className="absolute top-2 right-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded font-mono">#{idx + 1}</div>
                 </div>
               ))}
               <div className="text-center py-8 text-stone-500 font-mono text-xs">--- KONIEC DOKUMENTU ---</div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center p-2 md:p-10 relative">
            <button onClick={(e) => { e.stopPropagation(); handlePrev(); }} className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-20">
              <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
            </button>
            <div className="relative w-full h-full flex items-center justify-center">
              <img src={data.images[currentIndex]} alt={`Zdjęcie ${currentIndex + 1}`} className="max-w-full max-h-full object-contain drop-shadow-2xl" />
            </div>
            <button onClick={(e) => { e.stopPropagation(); handleNext(); }} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-20">
              <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

type ModalContextType = {
  openGallery: (type: 'nydek' | 'wyrok_kordys' | 'wyrok_badi' | 'wezwanie_kicinski' | 'janov') => void;
  openAudio: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useElixirModals = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useElixirModals must be used within ElixirModalsProvider');
  return context;
};

export const ElixirModalsProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAudioOpen, setIsAudioOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryData, setGalleryData] = useState<GalleryData | null>(null);
  const openGallery = (type: 'nydek' | 'wyrok_kordys' | 'wyrok_badi' | 'wezwanie_kicinski' | 'janov') => {
    const maps = { nydek: GALLERY_NYDEK, wyrok_kordys: GALLERY_WYROK_KORDYS, wyrok_badi: GALLERY_WYROK_BADI, wezwanie_kicinski: GALLERY_WEZWANIE_KICINSKI, janov: GALLERY_JANOV };
    setGalleryData(maps[type]);
    setIsGalleryOpen(true);
  };
  const openAudio = () => setIsAudioOpen(true);
  return (
    <ModalContext.Provider value={{ openGallery, openAudio }}>
      {children}
      <EvidenceAudioModal isOpen={isAudioOpen} onClose={() => setIsAudioOpen(false)} src="/evidence/stefan-nagranie.mp3" />
      <GalleryModal isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} data={galleryData} />
    </ModalContext.Provider>
  );
};

export const GalleryTrigger = ({ type, children, className }: { type: 'nydek' | 'wyrok_kordys' | 'wyrok_badi' | 'wezwanie_kicinski' | 'janov', children: React.ReactNode, className?: string }) => {
  const { openGallery } = useElixirModals();
  return <button onClick={() => openGallery(type)} className={className}>{children}</button>;
};

export const AudioTrigger = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const { openAudio } = useElixirModals();
  return <button onClick={openAudio} className={className}>{children}</button>;
};
