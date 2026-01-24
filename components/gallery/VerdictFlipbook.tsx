"use client";

import React, { useState, useEffect, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ChevronLeft, ChevronRight } from 'lucide-react';

// Definicja typu danych galerii
type GalleryData = {
  title: string;
  images: string[];
  signature?: string;
  pdfUrl?: string;
  type?: 'verdict' | 'gallery';
};

type VerdictFlipbookProps = {
  isOpen: boolean;
  onClose: () => void;
  data: GalleryData | null;
};

// Komponent strony, aby uniknąć problemów z ref
const Page = React.forwardRef<HTMLDivElement, { children: React.ReactNode }>(({ children }, ref) => {
    return (
      <div ref={ref} className="bg-white flex items-center justify-center">
        {children}
      </div>
    );
});
Page.displayName = 'Page';


export const VerdictFlipbook = ({ isOpen, onClose, data }: VerdictFlipbookProps) => {
  const flipBook = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('noscroll');
      if (data) {
        setTotalPages(data.images.length);
      }
    } else {
      document.body.classList.remove('noscroll');
    }
    return () => document.body.classList.remove('noscroll');
  }, [isOpen, data]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowLeft') {
        flipBook.current?.pageFlip().flipPrev();
      } else if (e.key === 'ArrowRight') {
        flipBook.current?.pageFlip().flipNext();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const onPage = (e: any) => {
    setCurrentPage(e.data);
  };

  if (!data) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-stone-900/80 backdrop-blur-md z-50 flex flex-col items-center justify-center"
          onClick={onClose}
        >
            {/* Controls & Header */}
            <div
              className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center text-white z-[60] bg-gradient-to-b from-black/50 to-transparent"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="font-serif text-center">
                {data.title}
                {data.signature && <div className="text-sm font-mono text-white/50 mt-1">{data.signature}</div>}
              </div>
              <button
                onClick={onClose}
                className="text-white/70 hover:text-white transition-colors bg-black/50 rounded-full p-2 hover:bg-white/20"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Flipbook Container */}
            <div
                className="w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
              <HTMLFlipBook
                width={550}
                height={733}
                size="stretch"
                minWidth={315}
                maxWidth={1000}
                minHeight={400}
                maxHeight={1533}
                maxShadowOpacity={0.5}
                showCover={true}
                mobileScrollSupport={true}
                onFlip={onPage}
                // The `ref` prop is incorrectly typed in the library,
                // so we need to use `@ts-ignore` to avoid a type error.
                // @ts-ignore
                ref={flipBook}
                className="shadow-2xl"
                style={{}}
                startPage={0}
                drawShadow={true}
                flippingTime={1000}
                usePortrait={true}
                startZIndex={0}
                autoSize={true}
                clickEventForward={false}
                useMouseEvents={true}
                swipeDistance={30}
                showPageCorners={true}
                disableFlipByClick={false}
              >
                {data.images.map((src, index) => (
                  <Page key={index}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`Page ${index + 1}`} className="w-full h-full object-contain"/>
                  </Page>
                ))}
              </HTMLFlipBook>
            </div>


            {/* Footer & Navigation */}
            <div
              className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center text-white z-[60] bg-gradient-to-t from-black/50 to-transparent"
              onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={() => flipBook.current?.pageFlip().flipPrev()}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Poprzednia
                </button>

                <div className="font-mono text-sm">
                    Strona {currentPage + 1} z {totalPages}
                </div>

                {data.pdfUrl && (
                    <a
                      href={data.pdfUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Pobierz PDF
                    </a>
                )}

                <button
                    onClick={() => flipBook.current?.pageFlip().flipNext()}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                >
                    Następna
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
