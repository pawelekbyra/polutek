"use client";

import React, { createContext, useContext, useState } from 'react';
import { PDFGallery } from './PDFGallery';

interface GalleryContextType {
  setBadowskiGalleryOpen: (open: boolean) => void;
  setWiktorGalleryOpen: (open: boolean) => void;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error('useGallery must be used within a GalleryProvider');
  }
  return context;
};

const BADOWSKI_GALLERY = [
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/wyrokBadowskiego/wyrok-bartosz-badowski-0001.jpg",
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/wyrokBadowskiego/wyrok-bartosz-badowski-0002.jpg",
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/wyrokBadowskiego/wyrok-bartosz-badowski-0003.jpg"
];

const WIKTOR_GALLERY = [
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/Wiktor/zgon-wiktora-pultusk.jpg"
];

interface GalleryModalsProps {
  badowskiGalleryOpen: boolean;
  setBadowskiGalleryOpen: (open: boolean) => void;
  wiktorGalleryOpen: boolean;
  setWiktorGalleryOpen: (open: boolean) => void;
}

const GalleryModals: React.FC<GalleryModalsProps> = ({
  badowskiGalleryOpen,
  setBadowskiGalleryOpen,
  wiktorGalleryOpen,
  setWiktorGalleryOpen
}) => {
  return (
    <>
      <PDFGallery
        isOpen={badowskiGalleryOpen}
        onClose={() => setBadowskiGalleryOpen(false)}
        images={BADOWSKI_GALLERY}
        title="Wyrok Bartosza Badowskiego (PDF Viewer)"
      />

      <PDFGallery
        isOpen={wiktorGalleryOpen}
        onClose={() => setWiktorGalleryOpen(false)}
        images={WIKTOR_GALLERY}
        title="Galeria: Śmierć Wiktora"
      />
    </>
  );
};

export const GalleryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [badowskiGalleryOpen, setBadowskiGalleryOpen] = useState(false);
  const [wiktorGalleryOpen, setWiktorGalleryOpen] = useState(false);

  return (
    <GalleryContext.Provider value={{ setBadowskiGalleryOpen, setWiktorGalleryOpen }}>
      {children}
      <GalleryModals
        badowskiGalleryOpen={badowskiGalleryOpen}
        setBadowskiGalleryOpen={setBadowskiGalleryOpen}
        wiktorGalleryOpen={wiktorGalleryOpen}
        setWiktorGalleryOpen={setWiktorGalleryOpen}
      />
    </GalleryContext.Provider>
  );
};
