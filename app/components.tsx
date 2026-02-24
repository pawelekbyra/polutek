"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Scale, FileText, Search, Mail, Stamp, X,
  Home as HouseIcon, ExternalLink, ChevronLeft, ChevronRight, Download
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
    <div onClick={onClose} className="fixed inset-0 bg-gray-900/40 backdrop-blur-md flex items-center justify-center z-[100] p-4 transition-all duration-300">
      <div onClick={(e) => e.stopPropagation()} className="bg-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] rounded-[2.5rem] w-full max-w-md relative overflow-hidden animate-in fade-in zoom-in duration-300 border border-gray-100">
        <div className="h-1.5 w-full bg-violet-600"></div>
        <div className="p-8 relative">
          <div className="flex justify-between items-start mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-2.5 w-2.5 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-600"></span></span>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Nagranie Dowodowe #A-23</span>
              </div>
              <h3 className="text-gray-900 font-black text-2xl tracking-tighter">„Rozmowa w ogrodzie”</h3>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-900 transition-all p-2 bg-gray-50 rounded-full"><X className="w-6 h-6" /></button>
          </div>
          <div className="bg-gray-50 rounded-3xl border border-gray-100 p-6 mb-8 shadow-inner relative group">
            <div className="flex justify-between items-center bg-white rounded-2xl px-4 py-6 border border-gray-100 shadow-sm">
                <div className="w-10 h-10 rounded-full border-2 border-gray-100 bg-gray-50 flex items-center justify-center shadow-inner"><div className="w-3 h-3 bg-violet-200 rounded-full animate-pulse"></div></div>
                <div className="flex-1 mx-4 h-10 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden relative border border-gray-100">
                    <div className="absolute w-[120%] h-px bg-gray-200 rotate-12 top-1/2"></div>
                    <span className="text-[10px] font-black text-gray-400 z-10 bg-gray-50 px-2 tracking-widest uppercase">Analog Source</span>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-gray-100 bg-gray-50 flex items-center justify-center shadow-inner"><div className="w-3 h-3 bg-violet-200 rounded-full animate-pulse"></div></div>
            </div>
            <div className="mt-4 text-center"><span className="font-black text-[10px] text-gray-400 uppercase tracking-[0.2em] block">Archiwum Perfect / 2023</span></div>
          </div>
          <div className="bg-violet-50 rounded-2xl p-2 border border-violet-100">
            <audio controls className="w-full h-10 accent-violet-600 focus:outline-none">
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

// --- UPDATED GALLERY MODAL ---

export const GalleryModal: React.FC<{ isOpen: boolean; onClose: () => void; data: GalleryData | null }> = ({ isOpen, onClose, data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset index when data changes
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      document.body.style.overflow = 'hidden'; // Lock scroll
    } else {
      document.body.style.overflow = 'unset'; // Unlock scroll
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

  // Keyboard navigation
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
    <div className={`fixed inset-0 z-[100] flex flex-col bg-white backdrop-blur-xl animate-in fade-in duration-300`}>
      
      {/* TOOLBAR */}
      <div className="flex items-center justify-between px-6 py-4 bg-white/80 border-b border-gray-100 z-50 shrink-0 backdrop-blur-md">
        <div>
          <h3 className="font-black text-gray-900 tracking-tighter">{data.title}</h3>
          <p className="font-bold text-[10px] text-gray-400 mt-0.5 uppercase tracking-widest">
             {isVerdict ? `Dokument: ${data.images.length} stron` : `Zdjęcie ${currentIndex + 1} / ${data.images.length}`}
             {data.signature && <span className="mx-2 text-gray-200">|</span>}
             {data.signature}
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {data.pdfUrl && (
             <a
               href={data.pdfUrl}
               target="_blank"
               rel="noopener noreferrer"
               className="hidden md:flex items-center gap-2 px-4 py-2 bg-violet-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-violet-700 transition-all rounded-xl shadow-lg shadow-violet-200"
             >
               <Download className="w-4 h-4" /> PDF
             </a>
          )}
          <button 
            onClick={onClose} 
            className="p-2 bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-900 rounded-full transition-all active:scale-90"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 overflow-hidden relative w-full h-full">
        
        {isVerdict ? (
          // --- VERDICT MODE (SCROLLABLE VERTICAL) ---
          <div className="w-full h-full overflow-y-auto p-4 md:p-12 flex justify-center bg-gray-50/50">
            <div className="flex flex-col gap-8 max-w-5xl w-full">
               {data.images.map((img, idx) => (
                 <div key={idx} className="relative group">
                   <img
                     src={img}
                     alt={`Strona ${idx + 1}`}
                     className="w-full h-auto shadow-2xl border border-gray-100 rounded-lg bg-white"
                     loading="lazy"
                   />
                   <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-gray-900 text-[10px] px-3 py-1 rounded-full font-black shadow-sm border border-gray-100">
                      STRONA {idx + 1}
                   </div>
                 </div>
               ))}
               <div className="text-center py-20 text-gray-300 font-black uppercase tracking-[0.4em] text-xs">
                 --- KONIEC DOKUMENTU ---
               </div>
            </div>
          </div>
        ) : (
          // --- GALLERY MODE (CAROUSEL) ---
          <div className="w-full h-full flex items-center justify-center p-4 md:p-12 relative bg-gray-50/30">
            
            {/* Prev Button */}
            <button 
               onClick={(e) => { e.stopPropagation(); handlePrev(); }}
               className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 bg-white shadow-xl text-gray-400 hover:text-violet-600 rounded-full transition-all z-20 hover:scale-110 active:scale-90 border border-gray-100"
            >
              <ChevronLeft className="w-8 h-8" strokeWidth={3} />
            </button>

            {/* Image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={data.images[currentIndex]}
                alt={`Zdjęcie ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl"
              />
            </div>

            {/* Next Button */}
            <button 
               onClick={(e) => { e.stopPropagation(); handleNext(); }}
               className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 bg-white shadow-xl text-gray-400 hover:text-violet-600 rounded-full transition-all z-20 hover:scale-110 active:scale-90 border border-gray-100"
            >
              <ChevronRight className="w-8 h-8" strokeWidth={3} />
            </button>

            {/* Bottom Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[80vw] p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-gray-100">
               {data.images.map((_, idx) => (
                 <div 
                   key={idx}
                   onClick={() => setCurrentIndex(idx)}
                   className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${idx === currentIndex ? 'bg-violet-600 w-6' : 'bg-gray-200 hover:bg-gray-300'}`}
                 />
               ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
