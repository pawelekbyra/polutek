"use client";

import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';

interface PDFGalleryProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export const PDFGallery: React.FC<PDFGalleryProps> = ({ images, isOpen, onClose, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col text-white font-sans">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/20 bg-black">
        <div className="flex items-center gap-4">
          <span className="font-bold uppercase tracking-widest text-sm md:text-base truncate max-w-[200px] md:max-w-md">
            {title}
          </span>
          <span className="text-xs bg-white/20 px-2 py-1 rounded">
            {currentIndex + 1} / {images.length}
          </span>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded text-xs transition-colors"
            onClick={() => alert('Pobieranie PDF (Atrapa)...')}
          >
            <Download size={16} />
            <span className="hidden sm:inline">Pobierz PDF</span>
          </button>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Main Viewport */}
      <div className="flex-grow relative flex items-center justify-center p-4 md:p-8 overflow-hidden">
        <button
          onClick={prev}
          className="absolute left-4 z-10 p-2 bg-black/50 hover:bg-black/80 rounded-full border border-white/20 transition-colors"
        >
          <ChevronLeft size={32} />
        </button>

        <div className="w-full h-full flex items-center justify-center">
          <img
            src={images[currentIndex]}
            alt={`Strona ${currentIndex + 1} dokumentu: ${title}`}
            className="max-w-full max-h-full object-contain shadow-2xl"
          />
        </div>

        <button
          onClick={next}
          className="absolute right-4 z-10 p-2 bg-black/50 hover:bg-black/80 rounded-full border border-white/20 transition-colors"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Thumbnails (Mobile Optimized) */}
      <div className="p-4 bg-black border-t border-white/20 flex justify-center gap-2 overflow-x-auto">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-12 h-16 border-2 transition-all shrink-0 ${idx === currentIndex ? 'border-yellow-500 scale-110' : 'border-transparent opacity-50'}`}
          >
            <img src={img} className="w-full h-full object-cover" alt={`Miniatura strony ${idx + 1}`} />
          </button>
        ))}
      </div>
    </div>
  );
};
