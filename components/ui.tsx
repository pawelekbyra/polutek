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
    <div className={`fixed inset-0 z-[100] flex flex-col ${isVerdict ? 'bg-stone-900/95' : 'bg-black'} backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]`}>
      
      {/* TOOLBAR */}
      <div className="flex items-center justify-between px-4 py-3 bg-black/40 border-b border-white/10 z-50 shrink-0">
        <div className="text-white">
          <h3 className="font-bold text-sm md:text-base leading-tight">{data.title}</h3>
          <p className="font-mono text-[10px] text-stone-400 mt-1 uppercase tracking-wider">
             {isVerdict ? `Dokument: ${data.images.length} stron` : `Zdjęcie ${currentIndex + 1} / ${data.images.length}`}
             {data.signature && <span className="mx-2 text-stone-600">|</span>}
             {data.signature}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {data.pdfUrl && (
             <a
               href={data.pdfUrl}
               target="_blank"
               rel="noopener noreferrer"
               className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-stone-800 text-stone-200 text-xs font-bold uppercase tracking-wider hover:bg-stone-700 transition-colors rounded-sm border border-white/10"
             >
               <Download className="w-3 h-3" /> PDF
             </a>
          )}
          <button 
            onClick={onClose} 
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 overflow-hidden relative w-full h-full">
        
        {isVerdict ? (
          // --- VERDICT MODE (SCROLLABLE VERTICAL) ---
          <div className="w-full h-full overflow-y-auto p-4 md:p-8 flex justify-center bg-[#1a1a1a]">
            <div className="flex flex-col gap-4 max-w-4xl w-full">
               {data.images.map((img, idx) => (
                 <div key={idx} className="relative group">
                   <img
                     src={img}
                     alt={`Strona ${idx + 1}`}
                     className="w-full h-auto shadow-2xl border border-stone-700"
                     loading="lazy"
                   />
                   <div className="absolute top-2 right-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded font-mono">
                      #{idx + 1}
                   </div>
                 </div>
               ))}
               <div className="text-center py-8 text-stone-500 font-mono text-xs">
                 --- KONIEC DOKUMENTU ---
               </div>
            </div>
          </div>
        ) : (
          // --- GALLERY MODE (CAROUSEL) ---
          <div className="w-full h-full flex items-center justify-center p-2 md:p-10 relative">
            
            {/* Prev Button */}
            <button 
               onClick={(e) => { e.stopPropagation(); handlePrev(); }}
               className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-20"
            >
              <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
            </button>

            {/* Image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={data.images[currentIndex]}
                alt={`Zdjęcie ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain drop-shadow-2xl"
              />
            </div>

            {/* Next Button */}
            <button 
               onClick={(e) => { e.stopPropagation(); handleNext(); }}
               className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-20"
            >
              <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
            </button>

            {/* Bottom Dots (Optional for navigation hints) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 overflow-x-auto max-w-[80vw] p-2">
               {data.images.map((_, idx) => (
                 <div 
                   key={idx}
                   onClick={() => setCurrentIndex(idx)}
                   className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all ${idx === currentIndex ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/50'}`}
                 />
               ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
