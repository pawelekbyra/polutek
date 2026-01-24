"use client";

import { X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

// Definicja typu danych galerii
type GalleryData = {
  title: string;
  images: string[];
  signature?: string;
  pdfUrl?: string;
};

type GalleryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: GalleryData | null;
};

export const GalleryModal = ({ isOpen, onClose, data }: GalleryModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("noscroll");
    } else {
      document.body.classList.remove("noscroll");
    }
    return () => document.body.classList.remove("noscroll");
  }, [isOpen]);

  if (!data) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 overflow-y-auto"
          onClick={onClose}
        >
          {/* Floating Close Button */}
          <button
            onClick={onClose}
            className="fixed top-6 right-6 text-white/70 hover:text-white transition-colors z-[60] bg-black/50 rounded-full p-2 hover:bg-white/20"
            aria-label="Close gallery"
          >
            <X className="w-8 h-8" />
          </button>

          {/* PDF Download Button (if available) */}
          {data.pdfUrl && (
            <a
              href={data.pdfUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="fixed bottom-6 right-6 flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm z-[60] border border-white/10"
              aria-label="Download PDF"
              onClick={(e) => e.stopPropagation()}
            >
              <Download className="w-4 h-4" />
              <span>Pobierz PDF</span>
            </a>
          )}

          {/* Scrollable Content Container */}
          <div
            className="min-h-full w-full flex flex-col items-center justify-start py-12 px-4 md:px-8"
          >
            {/* Title / Header */}
            <div
              className="text-white/80 font-serif text-xl mb-8 mt-4 text-center max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {data.title}
              {data.signature && <div className="text-sm font-mono text-white/50 mt-1">{data.signature}</div>}
            </div>

            {/* Images Stack */}
            <div className="flex flex-col gap-8 w-full items-center pb-24" onClick={(e) => e.stopPropagation()}>
              {data.images.map((src, index) => (
                <div
                  key={index}
                  className="relative w-full max-w-4xl bg-white shadow-2xl"
                >
                   {/* Standard img tag for natural aspect ratio responsiveness */}
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                   <img
                      src={src}
                      alt={`Page ${index + 1}`}
                      className="w-full h-auto block"
                      loading="lazy"
                   />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
