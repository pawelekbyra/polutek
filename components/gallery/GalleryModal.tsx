"use client";

import { X, Download, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import HTMLFlipBook from "react-pageflip";

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
  const flipBook = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("noscroll");
      setCurrentPage(0);
    } else {
      document.body.classList.remove("noscroll");
    }
    return () => document.body.classList.remove("noscroll");
  }, [isOpen]);

  const onPage = (e: any) => {
    setCurrentPage(e.data);
  };

  if (!data) return null;
  const totalPages = data.images.length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={onClose}
        >
          {/* Floating Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-[100] bg-black/50 rounded-full p-2"
            aria-label="Close gallery"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Main Flipbook Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <HTMLFlipBook
              width={600}
              height={848}
              size="stretch"
              minWidth={300}
              maxWidth={1000}
              minHeight={424}
              maxHeight={1414}
              maxShadowOpacity={0.5}
              showCover={true}
              mobileScrollSupport={true}
              onFlip={onPage}
              // @ts-ignore
              ref={flipBook}
              className="w-full h-full"
              startPage={0}
              drawShadow={true}
              flippingTime={1000}
              usePortrait={true}
              startZIndex={0}
              autoSize={true}
              clickEventForward={true}
              useMouseEvents={true}
              swipeDistance={30}
              showPageCorners={true}
              disableFlipByClick={false}
            >
              {data.images.map((src, index) => (
                <div className="page bg-[#111] flex items-center justify-center" key={index}>
                   <div className="relative w-full h-full">
                      <Image
                        src={src}
                        alt={`Page ${index + 1}`}
                        fill
                        style={{ objectFit: 'contain' }}
                        unoptimized
                        priority={index === 0}
                      />
                   </div>
                </div>
              ))}
            </HTMLFlipBook>
          </motion.div>

          {/* Floating Bottom Bar (Footer) */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-6 z-[100]">
            <div className="text-white/80 font-mono text-sm px-4 py-2 bg-black/50 rounded-full backdrop-blur-sm">
                <span>{currentPage + 1}</span>
                <span className="opacity-50 mx-1">/</span>
                <span>{totalPages}</span>
            </div>

            {data.pdfUrl && (
              <a
                href={data.pdfUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm"
                aria-label="Download PDF"
              >
                <Download className="w-4 h-4" />
              </a>
            )}
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};
