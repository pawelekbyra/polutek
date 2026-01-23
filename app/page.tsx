"use client";
import React, { useState } from 'react';
import { Scale, FileText, Search, User, Mail, MapPin, Calendar, Globe, X, Stamp, Video, Info, ShieldCheck, AlertCircle } from 'lucide-react';
import PasswordProtect from './components/PasswordProtect';
import { GalleryModal } from '@/components/gallery/GalleryModal';

// Definicja typu danych galerii
type GalleryData = {
  title: string;
  images: string[];
  signature?: string;
  pdfUrl?: string;
};

// --- DANE DO GALERII ---

const GALLERY_NYDEK: GalleryData = {
  title: "Posiadłość w Nýdku (Archiwum)",
  images: [
    "/Nydek1.jpg",
    "/Nydek2.jpg"
  ],
  signature: "LV 832"
};

const GALLERY_WYROK_KORDYS: GalleryData = {
  title: "Uzasadnienie wyroku: Jarosław K.",
  images: [
    "/wyrok_page-0001.jpg",
    "/wyrok_page-0002.jpg",
    "/wyrok_page-0003.jpg"
  ],
  signature: "30 T 5/2021",
  pdfUrl: "/wyrok.pdf"
};

const GALLERY_WYROK_BADI: GalleryData = {
  title: "Wyrok skazujący: Bartosz B.",
  images: [
    "/wyrok_page-0001.jpg",
    "/wyrok_page-0002.jpg",
    "/wyrok_page-0003.jpg"
  ],
  signature: "66 T 146/2021",
  pdfUrl: "/wyrok.pdf"
};


// --- KOMPONENTY STYLU "NAJS" ---

const CaseFile = ({ title, children, type = 'evidence' }: { title: string, children: React.ReactNode, type?: 'evidence' | 'transcript' | 'email' }) => (
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

const LegalNote = ({ term, children }: { term: string, children: React.ReactNode }) => (
  <div className="my-10 flex gap-4 p-5 bg-blue-50/50 border-l-4 border-blue-900/80 rounded-r-lg">
    <Scale className="w-6 h-6 text-blue-900/80 shrink-0 mt-1" />
    <div>
      <strong className="block font-serif text-blue-900 text-lg mb-2">{term}</strong>
      <div className="text-stone-700 text-sm leading-relaxed">{children}</div>
    </div>
  </div>
);

const EvidenceVideo = ({ src, title, caption }: { src: string, title: string, caption: string }) => (
  <figure className="my-12">
    <div className="aspect-w-16 aspect-h-9 bg-black rounded-sm shadow-lg overflow-hidden relative group">
      <iframe
        src={src}
        title={title}
        className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
    <figcaption className="mt-3 text-sm text-stone-500 font-sans border-l-2 border-stone-300 pl-3">
      <span className="font-bold text-stone-900 uppercase text-xs mr-2">Materiał Wideo:</span>
      {caption}
    </figcaption>
  </figure>
);

const PullQuote = ({ quote, author, source }: { quote: string, author: string, source: string }) => (
  <div className="my-10 pl-6 border-l-[3px] border-stone-800/80">
    <p className="font-serif text-xl md:text-2xl italic text-stone-900 leading-relaxed mb-3">
      „{quote}”
    </p>
    <div className="font-sans text-[10px] uppercase tracking-widest text-stone-500">
      — <span className="font-bold text-stone-800">{author}</span>, {source}
    </div>
  </div>
);

const LocationStrip = ({ name, code, plot, lv, onClick }: { name: string, code: string, plot: string, lv: string, onClick?: () => void }) => (
  <div className="w-full border-y border-stone-300 bg-stone-50/50 py-2 my-10 flex flex-col md:flex-row items-center justify-between gap-y-2 gap-x-4 px-1 md:px-2 font-mono text-[10px] md:text-xs text-stone-600 tracking-tight select-all cursor-default hover:bg-stone-100 transition-colors">
     
     <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="flex h-2 w-2 relative shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
        </div>
        {onClick ? (
          <button 
            onClick={onClick}
            className="font-bold text-stone-900 uppercase tracking-widest hover:text-blue-700 hover:underline transition-all text-left"
            title="Kliknij, aby zobaczyć galerię zdjęć"
          >
            {name}
          </button>
        ) : (
          <span className="font-bold text-stone-900 uppercase tracking-widest">{name}</span>
        )}
     </div>

     <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto border-t md:border-t-0 border-stone-200 pt-1 md:pt-0">
        <span className="flex gap-1.5">
           <span className="text-stone-400 uppercase hidden sm:inline">Obręb:</span>
           <span className="font-medium text-stone-800">{code}</span>
        </span>
        <span className="text-stone-300 hidden md:inline">|</span>
        <span className="flex gap-1.5">
           <span className="text-stone-400 uppercase hidden sm:inline">Działka:</span>
           <span className="font-medium text-stone-800">{plot}</span>
        </span>
         <span className="text-stone-300 hidden md:inline">|</span>
         <span className="flex gap-1.5">
           <span className="text-stone-400 uppercase hidden sm:inline">LV:</span>
           <span className="font-medium text-stone-800">{lv}</span>
        </span>
     </div>
  </div>
);

const TransactionStamp = ({ label, value, subDetails }: { label: string, value: string, subDetails?: string }) => (
  <div className="my-8 flex justify-start">
    <div className="relative border border-stone-300 bg-white p-1 pr-6 rounded-sm flex items-center gap-4 shadow-[2px_2px_0px_0px_rgba(231,229,228,1)]">
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

const EvidenceAudioModal = ({ src, isOpen, onClose }: { src: string, isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 transition-all duration-300"
    >
      <div
        onClick={(e)
