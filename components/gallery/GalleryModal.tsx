"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download } from 'lucide-react';
import { GalleryData } from '@/lib/evidence-data';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: GalleryData | null;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({ isOpen, onClose, data }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('noscroll');
    } else {
      document.body.classList.remove('noscroll');
    }
    return () => document.body.classList.remove('noscroll');
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!data) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-stone-900/90 backdrop-blur-md z-50 flex flex-col"
          onClick={onClose}
        >
          {/* Header */}
          <div
            className="flex-none p-4 flex justify-between items-center text-white z-[60] bg-gradient-to-b from-black/50 to-transparent"
            onClick={(e) => e.stopPropagation()}
          >
             <div className="font-serif text-center">
                {data.title}
                {data.signature && <div className="text-sm font-mono text-white/50 mt-1">{data.signature}</div>}
              </div>
            <div className="flex items-center gap-4">
                 {data.pdfUrl && (
                    <a
                      href={data.pdfUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                      title="Pobierz PDF"
                    >
                      <Download className="w-6 h-6" />
                    </a>
                )}
                <button
                    onClick={onClose}
                    className="text-white/70 hover:text-white transition-colors bg-black/50 rounded-full p-2 hover:bg-white/20"
                    aria-label="Close"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div
            className="flex-grow overflow-y-auto w-full p-4 flex flex-col items-center gap-4"
            onClick={onClose} // Clicking on the background closes the modal
          >
            <div
                className="max-w-4xl w-full flex flex-col gap-4"
                onClick={(e) => e.stopPropagation()} // Clicking on content doesn't close
            >
                {data.images.map((src, index) => (
                <div key={index} className="bg-white shadow-2xl p-0 md:p-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={src}
                        alt={`${data.title} - page ${index + 1}`}
                        className="w-full h-auto block"
                        loading="lazy"
                    />
                </div>
                ))}
            </div>

            {/* Bottom spacer for comfortable scrolling */}
            <div className="h-10 flex-none" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
