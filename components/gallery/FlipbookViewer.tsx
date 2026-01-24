"use client";

import React, { useState, useEffect, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryData } from './GalleryModal';

type FlipbookViewerProps = {
  isOpen: boolean;
  onClose: () => void;
  data: GalleryData;
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

export const FlipbookViewer = ({ isOpen, onClose, data }: FlipbookViewerProps) => {
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
  }, [isOpen, onClose]);

  const onPage = (e: any) => {
    setCurrentPage(e.data);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-stone-900/90 backdrop-blur-md z-[100] flex flex-col items-center justify-center"
          onClick={onClose}
        >
            {/* Controls & Header */}
            <div
              className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center text-white z-[110] bg-gradient-to-b from-black/60 to-transparent"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="font-serif ml-4">
                <div className="text-lg font-bold">{data.title}</div>
                {data.signature && <div className="text-sm font-mono text-white/50 mt-1">{data.signature}</div>}
              </div>
              <button
                onClick={onClose}
                className="text-white/70 hover:text-white transition-colors bg-black/30 rounded-full p-2 hover:bg-white/20 mr-4"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Flipbook Container */}
            <div
                className="w-full h-full flex items-center justify-center p-4"
                onClick={(e) => e.stopPropagation()}
            >
              {/* @ts-ignore: HTMLFlipBook types are not perfectly compatible with React 18 strict mode props */}
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
                ref={flipBook}
                className="shadow-2xl"
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
              className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-center text-white z-[110] bg-gradient-to-t from-black/80 to-transparent"
              onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={() => flipBook.current?.pageFlip().flipPrev()}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-white/10 rounded-full hover:bg-white/20 transition-colors border border-white/10"
                >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Poprzednia</span>
                </button>

                <div className="flex items-center gap-4">
                  <div className="font-mono text-sm text-white/80">
                      Strona {currentPage + 1} z {totalPages}
                  </div>

                  {data.pdfUrl && (
                      <a
                        href={data.pdfUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-yellow-600/20 text-yellow-200 border border-yellow-600/30 rounded-full hover:bg-yellow-600/40 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span className="hidden sm:inline">Pobierz PDF</span>
                      </a>
                  )}
                </div>

                <button
                    onClick={() => flipBook.current?.pageFlip().flipNext()}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-white/10 rounded-full hover:bg-white/20 transition-colors border border-white/10"
                >
                    <span className="hidden sm:inline">Następna</span>
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
