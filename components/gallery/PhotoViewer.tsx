"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight, X, Maximize, Minimize } from "lucide-react";
import { GalleryData } from "./GalleryModal";

type PhotoViewerProps = {
  isOpen: boolean;
  onClose: () => void;
  data: GalleryData;
};

export const PhotoViewer = ({ isOpen, onClose, data }: PhotoViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("noscroll");
      setCurrentIndex(0); // Reset index when opening
    } else {
      document.body.classList.remove("noscroll");
      setIsFullscreen(false);
    }
    return () => document.body.classList.remove("noscroll");
  }, [isOpen]);

  // Keyboard navigation
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

  const toggleFullscreen = () => {
    if (!viewerRef.current) return;

    if (!document.fullscreenElement) {
      viewerRef.current.requestFullscreen().catch(err => {
        console.error(`Error enabling full-screen mode: ${err.message}`);
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
          className="fixed inset-0 bg-black z-[100] flex items-center justify-center overflow-hidden"
          onClick={onClose}
        >
           {/* UI Controls Overlay - Minimalistic */}
           <div className="absolute inset-0 z-[110] pointer-events-none">
              {/* Top Right Controls */}
              <div className="absolute top-4 right-4 flex gap-4 pointer-events-auto">
                 <button
                    onClick={toggleFullscreen}
                    className="text-white/70 hover:text-white transition-colors bg-black/40 rounded-full p-2 hover:bg-white/10"
                    aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                  >
                    {isFullscreen ? <Minimize className="w-6 h-6" /> : <Maximize className="w-6 h-6" />}
                  </button>

                  <button
                    onClick={onClose}
                    className="text-white/70 hover:text-white transition-colors bg-black/40 rounded-full p-2 hover:bg-white/10"
                    aria-label="Close gallery"
                  >
                    <X className="w-6 h-6" />
                  </button>
              </div>

              {/* Prev Button */}
              <button
                onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors bg-black/20 hover:bg-black/50 rounded-full p-3 pointer-events-auto"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors bg-black/20 hover:bg-black/50 rounded-full p-3 pointer-events-auto"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
              </button>

              {/* Bottom Info - minimal */}
              <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
                 <div className="inline-block bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full text-white/90">
                    <span className="font-serif text-lg mr-3">{data.title}</span>
                    <span className="font-mono text-xs text-white/60">
                      {currentIndex + 1} / {data.images.length}
                    </span>
                 </div>
              </div>
           </div>

          {/* Main Content - Full Height, Centered */}
          <div
            className="w-full h-full flex items-center justify-center p-0 md:p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={currentImage}
                alt={`View ${currentIndex + 1} of ${data.images.length}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="max-h-full max-w-full object-contain h-full w-auto block mx-auto shadow-2xl"
              />
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
