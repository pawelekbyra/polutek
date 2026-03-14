"use client";

import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import Image from 'next/image';

interface PDFGalleryProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
  title: string;
  pdfUrl?: string;
  dict: any;
}

export const PDFGallery: React.FC<PDFGalleryProps> = ({ images, isOpen, onClose, title, pdfUrl, dict }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleDownload = () => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    } else {
      alert(dict.atrapa_download);
    }
  };

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
          {pdfUrl && (
            <button
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded text-xs transition-colors"
              onClick={handleDownload}
            >
              <Download size={16} />
              <span className="hidden sm:inline">{dict.download_pdf}</span>
            </button>
          )}
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

        <div className="w-full h-full flex items-center justify-center relative">
          <Image
            src={images[currentIndex]}
            alt={`${dict.court_document_alt} ${currentIndex + 1}`}
            fill
            className="object-contain shadow-2xl"
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
            className={`w-12 h-16 border-2 transition-all shrink-0 relative overflow-hidden ${idx === currentIndex ? 'border-yellow-500 scale-110' : 'border-transparent opacity-50'}`}
          >
            <Image
              src={img}
              alt={`${dict.thumbnail_alt} ${idx + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
