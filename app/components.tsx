"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Scale, FileText, Search, Mail, Stamp, X,
  Home as HouseIcon, ExternalLink, ChevronLeft, ChevronRight, Lock
} from 'lucide-react';
import Hls from 'hls.js';

// --- Shared Types ---
export type GalleryData = {
  title: string;
  images: string[];
  signature?: string;
  pdfUrl?: string;
  type?: 'verdict' | 'gallery';
};

// --- Password Protect Component ---
export const PasswordProtect = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === 'enter') {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setInput('');
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 bg-[#0a0a0a] flex items-center justify-center z-[9999]">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-10">
           <Lock className="w-12 h-12 text-stone-500 mx-auto mb-4" />
           <h1 className="text-stone-300 text-xl font-mono tracking-[0.2em] uppercase">Zasoby Zabezpieczone</h1>
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Wprowadź hasło..."
            className="w-full bg-[#111] border-b border-stone-700 text-center text-stone-200 text-2xl py-4 focus:outline-none focus:border-stone-400 font-serif placeholder:text-stone-800 transition-colors"
            autoFocus
          />
          {error && (
            <div className="absolute top-full left-0 w-full text-center mt-4 animate-pulse">
              <span className="text-red-900 bg-red-500/10 px-3 py-1 text-xs font-mono uppercase tracking-widest border border-red-900/30 rounded">
                Błędne hasło
              </span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};


// --- UI Components ---

export const CaseFile = ({ title, children, type = 'evidence' }: { title: string, children: React.ReactNode, type?: 'evidence' | 'transcript' | 'email' }) => (
  <div className="my-8 border border-stone-300 bg-white shadow-sm rounded-sm overflow-hidden break-inside-avoid">
    <div className="bg-stone-100 border-b border-stone-200 px-4 py-2 flex items-center gap-2 text-xs font-mono text-stone-500 uppercase tracking-wider">
      {type === 'email' ? <Mail className="w-4 h-4" /> : type === 'transcript' ? <Search className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
      <span>{title}</span>
    </div>
    <div className="p-6 font-mono text-sm md:text-base leading-relaxed text-stone-800 bg-[url('https://www.transparenttextures.com/patterns/subtle-paper.png')] italic">
      {children}
    </div>
  </div>
);

export const LegalNote = ({ term, children }: { term: string, children: React.ReactNode }) => (
  <div className="my-10 flex gap-4 p-5 bg-blue-50/50 border-l-4 border-blue-900/80 rounded-r-lg">
    <Scale className="w-6 h-6 text-blue-900/80 shrink-0 mt-1" />
    <div>
      <strong className="block font-serif text-blue-900 text-lg mb-2">{term}</strong>
      <div className="text-stone-700 text-sm leading-relaxed">{children}</div>
    </div>
  </div>
);

export const PullQuote = ({ quote, author, source }: { quote: string, author: string, source: string }) => (
  <div className="my-10 pl-6 border-l-[3px] border-stone-800/80">
    <p className="font-serif text-xl md:text-2xl italic text-stone-900 leading-relaxed mb-3">
      „{quote}”
    </p>
    <div className="font-sans text-[10px] uppercase tracking-widest text-stone-500">
      — <span className="font-bold text-stone-800">{author}</span>, {source}
    </div>
  </div>
);

export const LocationStamp = ({ name, code, plot, lv, onClick }: { name: string, code: string, plot: string, lv: string, onClick?: () => void }) => (
  <div className="my-8 flex justify-start">
    <button
      onClick={onClick}
      className="relative border border-stone-300 bg-white p-1 pr-6 rounded-sm flex items-center gap-4 shadow-[2px_2px_0px_0px_rgba(231,229,228,1)] hover:border-stone-400 transition-colors text-left group"
    >
       <div className="absolute top-1 right-1 text-stone-300 group-hover:text-stone-500 transition-colors">
         <Search className="w-3 h-3" />
       </div>

       <div className="bg-stone-100 h-full p-3 flex items-center justify-center border-r border-stone-200 border-dashed transition-colors">
          <HouseIcon className="w-5 h-5 text-stone-400" />
       </div>
       <div className="py-2">
          <div className="text-[9px] uppercase tracking-[0.2em] text-stone-400 font-bold mb-1 flex items-center gap-2">
            {name} <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="font-mono text-base font-bold text-stone-800">LV {lv}</div>
          <div className="text-[10px] text-stone-500 font-mono mt-1">
            Działka: {plot} <span className="text-stone-300 mx-1">|</span> Obręb: {code}
          </div>
       </div>
    </button>
  </div>
);

export const TransactionStamp = ({ label, value, subDetails }: { label: string, value: string, subDetails?: string }) => (
  <div className="my-8 flex justify-start">
    <div className="relative border border-stone-300 bg-white p-1 pr-6 rounded-sm flex items-center gap-4 shadow-[2px_2px_0px_0px_rgba(231,229,228,1)] group hover:border-stone-400 transition-colors cursor-default">
       <div className="absolute top-1 right-1 text-stone-300 group-hover:text-stone-500 transition-colors">
         <Search className="w-3 h-3" />
       </div>

       <div className="bg-stone-100 h-full p-3 flex items-center justify-center border-r border-stone-200 border-dashed">
          <Stamp className="w-5 h-5 text-stone-400" />
       </div>
       <div className="py-2">
          <div className="text-[9px] uppercase tracking-[0.2em] text-stone-400 font-bold mb-1">{label}</div>
          <div className="font-mono text-base font-bold text-stone-800">{value}</div>
          {subDetails && <div className="text-[10px] text-stone-500 font-mono mt-1">{subDetails}</div>}
       </div>
    </div>
  </div>
);

export const EvidenceAudioModal = ({ src, isOpen, onClose }: { src: string, isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div onClick={onClose} className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 transition-all duration-300">
      <div onClick={(e) => e.stopPropagation()} className="bg-[#1a1a1a] shadow-2xl rounded-lg w-full max-w-sm relative overflow-hidden animate-[fadeIn_0.3s_ease-out] border border-stone-700">
        <div className="h-1 w-full bg-gradient-to-r from-red-800 via-red-600 to-red-800"></div>
        <div className="p-6 relative">
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
      <video
        ref={videoRef}
        controls
        poster={poster}
        className="w-full h-auto block"
      />
    </div>
  );
};

export const SimpleGalleryModal: React.FC<{ isOpen: boolean; onClose: () => void; data: GalleryData | null }> = ({ isOpen, onClose, data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset index when data opens
  useEffect(() => {
    if (isOpen) setCurrentIndex(0);
  }, [isOpen]);

  const nextImage = useCallback(() => {
    if (data) {
      setCurrentIndex((prev) => (prev + 1) % data.images.length);
    }
  }, [data]);

  const prevImage = useCallback(() => {
    if (data) {
      setCurrentIndex((prev) => (prev - 1 + data.images.length) % data.images.length);
    }
  }, [data]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen || !data) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (data.type !== 'verdict') {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
      }
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, data, nextImage, prevImage, onClose]);

  if (!isOpen || !data) return null;

  // --- RENDER VERDICT MODE (Vertical Scroll, Full Screen) ---
  if (data.type === 'verdict') {
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-stone-900 text-white" onClick={onClose}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-black/50 backdrop-blur-md z-10 shrink-0" onClick={e => e.stopPropagation()}>
          <div>
            <h3 className="font-serif text-lg text-white/90">{data.title}</h3>
            <p className="font-mono text-xs text-stone-400 uppercase tracking-wider">{data.signature}</p>
          </div>
          <div className="flex items-center gap-4">
             {data.pdfUrl && (
                <a
                  href={data.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors rounded-sm"
                >
                  <FileText className="w-4 h-4" /> PDF
                </a>
             )}
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto p-0 md:p-8 bg-[#1a1a1a]" onClick={onClose}>
           <div className="max-w-4xl mx-auto flex flex-col gap-1 min-h-full" onClick={e => e.stopPropagation()}>
             {data.images.map((img, idx) => (
               <img
                 key={idx}
                 src={img}
                 alt={`Strona ${idx + 1}`}
                 className="w-full h-auto shadow-2xl block"
                 loading="lazy"
               />
             ))}
           </div>
        </div>
      </div>
    );
  }

  // --- RENDER GALLERY MODE (Carousel, Full Screen) ---
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black" onClick={onClose}>
      {/* Background blur/image */}
      <div
        className="absolute inset-0 opacity-20 blur-3xl scale-110"
        style={{ backgroundImage: `url(${data.images[currentIndex]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />

      {/* Controls & Content */}
      <div className="relative z-10 w-full h-full flex flex-col" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="absolute top-0 left-0 w-full p-4 flex items-start justify-between bg-gradient-to-b from-black/80 to-transparent">
          <div>
             <h3 className="text-white font-serif text-xl drop-shadow-md">{data.title}</h3>
             <p className="text-stone-300 font-mono text-xs mt-1">{currentIndex + 1} / {data.images.length}</p>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white p-2">
            <X className="w-8 h-8 drop-shadow-md" />
          </button>
        </div>

        {/* Main Image Area */}
        <div className="flex-1 flex items-center justify-center p-4">
           {/* Prev Button */}
           <button
             onClick={prevImage}
             className="absolute left-2 md:left-8 p-3 rounded-full bg-black/40 hover:bg-black/70 text-white transition-all backdrop-blur-sm group"
           >
             <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
           </button>

           <img
             src={data.images[currentIndex]}
             alt={`${data.title} - ${currentIndex + 1}`}
             className="max-h-full max-w-full object-contain shadow-2xl animate-[fadeIn_0.3s_ease-out]"
           />

           {/* Next Button */}
           <button
             onClick={nextImage}
             className="absolute right-2 md:right-8 p-3 rounded-full bg-black/40 hover:bg-black/70 text-white transition-all backdrop-blur-sm group"
           >
             <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
           </button>
        </div>
      </div>
    </div>
  );
};
