"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';
import Image from "next/image";

interface PwaDesktopModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PwaDesktopModal: React.FC<PwaDesktopModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute inset-0 bg-gray-900/40 backdrop-blur-md z-[60] flex items-center justify-center p-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white text-gray-900 rounded-[2.5rem] p-10 shadow-2xl max-w-sm w-full border border-gray-100"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end mb-2">
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-gray-50 text-gray-400">
                <X className="h-6 w-6" />
              </Button>
            </div>
            <h3 className="text-2xl font-black tracking-tight mb-4">{t('pwaModalTitle') || 'Zainstaluj Aplikację'}</h3>
            <p className="mb-8 text-gray-500 font-medium leading-relaxed">
              {t('pwaModalBody') || 'Zeskanuj kod QR, aby otworzyć tę stronę na swoim telefonie i dodać ją do ekranu głównego.'}
            </p>
            <div className="w-48 h-48 bg-gray-50 mx-auto flex items-center justify-center rounded-[2rem] border-2 border-gray-100 p-4 shadow-inner">
              <Image src="/qr-code-placeholder.png" alt="QR Code" width={160} height={160} className="rounded-xl" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PwaDesktopModal;
