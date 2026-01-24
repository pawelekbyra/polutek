"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight, X, Maximize } from "lucide-react";

// Definicja typu danych galerii
type GalleryData = {
  title: string;
  images: string[];
  signature?: string;
  pdfUrl?: string;
  type?: 'verdict' | 'gallery';
};

type ImageViewerProps = {
  isOpen: boolean;
  onClose: () => void;
  data: GalleryData | null;
};

export const ImageViewer = ({ isOpen, onClose, data }: ImageViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("noscroll");
      setCurrentIndex(0); // Reset index when opening
    } else {
      document.body.classList.remove("noscroll");
      setIsFullscreen(false); // Exit fullscreen when closing
    }
    return () => document.body.classList.remove("noscroll");
  }, [isOpen]);

  // Keyboard navigation and fullscreen exit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowLeft') goToPrevious();
      else if (e.key === 'ArrowRight') goToNext();
      else if (e.key === 'Escape') {
        if (isFullscreen) {
          toggleFullscreen();
        } else {
          onClose();
        }
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [isOpen, currentIndex, isFullscreen]);


  if (!data) return null;

  const toggleFullscreen = () => {
    if (!viewerRef.current) return;

    if (!document.fullscreenElement) {
      viewerRef.current.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentImage = data.images[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={viewerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={onClose}
        >
           {/* UI Controls Overlay */}
           <div className="absolute inset-0 z-[60]">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors bg-black/50 rounded-full p-2 hover:bg-white/20"
                aria-label="Close gallery"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                className="absolute top-4 right-16 text-white/70 hover:text-white transition-colors bg-black/50 rounded-full p-2 hover:bg-white/20"
                aria-label="Toggle fullscreen"
              >
                <Maximize className="w-6 h-6" />
              </button>

              {/* Prev Button */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors bg-black/50 rounded-full p-2 hover:bg-white/20"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              {/* Next Button */}
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors bg-black/50 rounded-full p-2 hover:bg-white/20"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
           </div>

          {/* Main Content */}
          <div
            className="w-full h-full flex flex-col items-center justify-center p-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Display */}
            <div className="relative flex-grow w-full flex items-center justify-center">
              <div className="relative max-w-full max-h-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentImage}
                  alt={`View ${currentIndex + 1} of ${data.images.length}`}
                  className="object-contain w-auto h-auto max-w-[80vw] max-h-[85vh] shadow-2xl"
                />
              </div>
            </div>

             {/* Header Info & Pagination */}
             <div className="absolute bottom-0 left-0 right-0 p-6 text-center text-white/80 bg-gradient-to-t from-black/50 to-transparent z-[60]">
               <div className="font-serif text-lg">
                  {data.title}
                  {data.signature && <div className="text-sm font-mono text-white/50 mt-1">{data.signature}</div>}
               </div>
               <div className="font-mono text-xs text-white/60 mt-2">
                 {currentIndex + 1} / {data.images.length}
               </div>
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
