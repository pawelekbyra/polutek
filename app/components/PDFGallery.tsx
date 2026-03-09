import React, { useState } from 'react';
import { X, Download, ChevronLeft, ChevronRight } from 'lucide-react';

interface PDFGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
}

export const PDFGallery: React.FC<PDFGalleryProps> = ({ isOpen, onClose, images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center select-none overflow-hidden backdrop-blur-sm">
      {/* PDF-like Toolbar */}
      <div className="w-full bg-[#323639] h-12 flex items-center justify-between px-4 text-white shadow-lg border-b border-white/10">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium tracking-wide">wyrok-bartosz-badowski.pdf</span>
          <span className="text-xs text-white/60 bg-white/5 px-2 py-0.5 rounded border border-white/10">
            {currentIndex + 1} / {images.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="p-2 hover:bg-white/10 rounded-full transition-colors group relative"
            title="Pobierz PDF (Atrapa)"
          >
            <Download size={20} />
            <span className="absolute top-full mt-2 right-0 bg-black text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 pointer-events-none">
              Pobierz PDF
            </span>
          </button>
          <div className="w-px h-6 bg-white/20 mx-2" />
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow w-full relative flex items-center justify-center p-4 md:p-8">
        {/* Navigation Buttons */}
        <button
          onClick={prevImage}
          className="absolute left-4 z-10 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all border border-white/10 hover:scale-110 active:scale-95"
        >
          <ChevronLeft size={32} />
        </button>

        <button
          onClick={nextImage}
          className="absolute right-4 z-10 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all border border-white/10 hover:scale-110 active:scale-95"
        >
          <ChevronRight size={32} />
        </button>

        {/* PDF Page Container */}
        <div className="h-full w-full max-w-4xl bg-white shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-auto flex items-start justify-center p-4 custom-scrollbar">
          <img
            src={images[currentIndex]}
            alt={`Strona ${currentIndex + 1}`}
            className="w-full h-auto object-contain shadow-2xl"
            style={{ minHeight: '100%' }}
          />
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
};
