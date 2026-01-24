"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { X, Download } from "lucide-react";

// Definicja typu danych galerii (matches lib/evidence-data.ts and app/page.tsx)
export type GalleryData = {
  title: string;
  images: string[];
  signature?: string;
  pdfUrl?: string;
  type?: 'verdict' | 'gallery';
};

type GalleryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: GalleryData | null;
};

export const GalleryModal = ({ isOpen, onClose, data }: GalleryModalProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("noscroll");
    } else {
      document.body.classList.remove("noscroll");
    }
    return () => document.body.classList.remove("noscroll");
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);


  if (!data) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-stone-900/95 z-[100] flex flex-col"
          onClick={onClose}
        >
           {/* Header */}
           <div
              className="flex-none p-4 flex justify-between items-center text-white bg-black/40 backdrop-blur-sm z-[110]"
              onClick={(e) => e.stopPropagation()}
           >
              <div className="font-serif">
                <div className="text-lg md:text-xl font-bold">{data.title}</div>
                {data.signature && <div className="text-sm font-mono text-white/50">{data.signature}</div>}
              </div>
              <div className="flex items-center gap-4">
                 {data.pdfUrl && (
                    <a
                      href={data.pdfUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-1.5 text-xs md:text-sm font-semibold bg-white/10 rounded-full hover:bg-white/20 transition-colors border border-white/10"
                    >
                      <Download className="w-4 h-4" />
                      <span className="hidden sm:inline">Pobierz PDF</span>
                    </a>
                )}
                <button
                  onClick={onClose}
                  className="text-white/70 hover:text-white transition-colors bg-white/10 rounded-full p-2 hover:bg-white/20"
                  aria-label="Close gallery"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
           </div>

          {/* Scrollable Content */}
          <div
            className="flex-grow overflow-y-auto overflow-x-hidden p-4 md:p-8 flex flex-col items-center gap-4 md:gap-8"
            onClick={(e) => e.stopPropagation()}
            ref={containerRef}
          >
             {data.images.map((src, index) => (
                <div key={index} className="relative w-full max-w-4xl shadow-2xl bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`Page ${index + 1}`}
                    className="w-full h-auto block"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded font-mono backdrop-blur-sm">
                    {index + 1} / {data.images.length}
                  </div>
                </div>
             ))}

             <div className="h-20 flex items-center justify-center text-white/30 text-sm font-mono">
                — KONIEC DOKUMENTU —
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
