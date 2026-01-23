"use client";

import { X, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { GalleryData } from "@/lib/evidence-data";

type GalleryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: GalleryData | null;
};

export const GalleryModal = ({
  isOpen,
  onClose,
  data,
}: GalleryModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    if (data) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.images.length);
    }
  };

  const prevImage = () => {
    if (data) {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + data.images.length) % data.images.length
      );
    }
  };

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
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
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-screen h-screen bg-[#121212] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-center justify-between p-4 border-b border-stone-800">
              <div>
                <h2 className="text-lg font-semibold text-white">{data.title}</h2>
                {data.signature && (
                  <p className="text-sm font-mono text-yellow-300">
                    {data.signature}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-stone-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </header>
            <div className="flex-1 relative flex items-center justify-center p-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={data.images[currentIndex]}
                    alt={`Page ${currentIndex + 1}`}
                    fill
                    style={{ objectFit: 'contain' }}
                    unoptimized
                  />
                </motion.div>
              </AnimatePresence>

              {data.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/80 transition-colors z-10"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/80 transition-colors z-10"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
            <footer className="flex items-center justify-between p-4 border-t border-stone-800">
              <div>
                {data.images.length > 0 && (
                  <span className="text-sm text-stone-400">
                    Page {currentIndex + 1} of {data.images.length}
                  </span>
                )}
              </div>
              {data.pdfUrl && (
                <a
                  href={data.pdfUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-yellow-600 text-black rounded-md hover:bg-yellow-500 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Original PDF</span>
                </a>
              )}
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
