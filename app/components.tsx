"use client";

import React, { useEffect, useRef, useState } from 'react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  Scale, FileText, Search, Mail, MapPin, Calendar,
  Globe, X, Stamp, Video, Info, ShieldCheck,
  ExternalLink, Download, Home as HouseIcon,
  Maximize, Minimize, ChevronLeft, ChevronRight
} from 'lucide-react';
import Hls from 'hls.js';

// --- UTILS ---
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- SHARED TYPES ---
export type GalleryData = {
  title: string;
  images: string[];
  signature?: string;
  pdfUrl?: string;
  type?: 'verdict' | 'gallery';
};

// --- COMPONENTS ---

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
    <div onClick={onClose} className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div onClick={(e) => e.stopPropagation()} className="bg-[#1a1a1a] shadow-2xl rounded-lg w-full max-w-sm relative overflow-hidden border border-stone-700">
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

export const ArticleVideoPlayer = ({ src, poster }: { src: string, poster: string }) => {
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

export const GalleryModal = ({ isOpen, onClose, data }: { isOpen: boolean, onClose: () => void, data: GalleryData | null }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentIndex(0);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen || !data) return null;

  const isVerdict = data.type === 'verdict';

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? data.images.length - 1 : prev - 1));
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === data.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-[100] flex flex-col" onClick={onClose}>
      {/* Header */}
      <div className="flex-none p-4 flex justify-between items-center text-white bg-black/60 backdrop-blur-md z-[110]" onClick={e => e.stopPropagation()}>
        <div className="font-serif">
          <div className="text-lg font-bold">{data.title}</div>
          {data.signature && <div className="text-xs font-mono opacity-50">{data.signature}</div>}
        </div>
        <div className="flex items-center gap-4">
          {data.pdfUrl && (
            <a href={data.pdfUrl} download target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1 text-xs bg-white/10 rounded-full border border-white/20 hover:bg-white/20">
              <Download className="w-4 h-4" />
              <span>PDF</span>
            </a>
          )}
          <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20">
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow overflow-auto p-4 flex flex-col items-center" onClick={e => e.stopPropagation()}>
        {isVerdict ? (
          // Vertical scroll for verdicts
          <div className="flex flex-col gap-4 w-full max-w-4xl">
            {data.images.map((src, i) => (
              <img key={i} src={src} alt={`Page ${i + 1}`} className="w-full h-auto bg-white shadow-xl" loading="lazy" />
            ))}
          </div>
        ) : (
          // Slider for galleries
          <div className="relative w-full h-full flex items-center justify-center">
             <button onClick={goToPrevious} className="absolute left-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/80 z-10">
                <ChevronLeft className="w-8 h-8" />
             </button>
             <img src={data.images[currentIndex]} alt={`Image ${currentIndex + 1}`} className="max-h-full max-w-full object-contain shadow-2xl" />
             <button onClick={goToNext} className="absolute right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/80 z-10">
                <ChevronRight className="w-8 h-8" />
             </button>
             <div className="absolute bottom-4 bg-black/50 px-3 py-1 rounded-full text-white text-xs font-mono">
                {currentIndex + 1} / {data.images.length}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};
