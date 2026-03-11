"use client";

import React, { createContext, useContext, useState } from 'react';
import { PDFGallery } from './PDFGallery';

interface GalleryContextType {
  setBadowskiGalleryOpen: (open: boolean) => void;
  setWiktorGalleryOpen: (open: boolean) => void;
  setCenaJanovGalleryOpen: (open: boolean) => void;
  setCenaNydekGalleryOpen: (open: boolean) => void;
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

const CENA_JANOV_GALLERY = [
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/kataster/cena-janov.jpg"
];

const CENA_NYDEK_GALLERY = [
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/kataster/cena-nydek.jpg"
];

interface GalleryModalsProps {
  badowskiGalleryOpen: boolean;
  setBadowskiGalleryOpen: (open: boolean) => void;
  wiktorGalleryOpen: boolean;
  setWiktorGalleryOpen: (open: boolean) => void;
  cenaJanovGalleryOpen: boolean;
  setCenaJanovGalleryOpen: (open: boolean) => void;
  cenaNydekGalleryOpen: boolean;
  setCenaNydekGalleryOpen: (open: boolean) => void;
}

const GalleryModals: React.FC<GalleryModalsProps> = ({
  badowskiGalleryOpen,
  setBadowskiGalleryOpen,
  wiktorGalleryOpen,
  setWiktorGalleryOpen,
  cenaJanovGalleryOpen,
  setCenaJanovGalleryOpen,
  cenaNydekGalleryOpen,
  setCenaNydekGalleryOpen
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

      <PDFGallery
        isOpen={cenaJanovGalleryOpen}
        onClose={() => setCenaJanovGalleryOpen(false)}
        images={CENA_JANOV_GALLERY}
        title="Dokument: Cena Nieruchomości Janov"
        pdfUrl="https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/kataster/cena-janov.pdf"
      />

      <PDFGallery
        isOpen={cenaNydekGalleryOpen}
        onClose={() => setCenaNydekGalleryOpen(false)}
        images={CENA_NYDEK_GALLERY}
        title="Dokument: Cena Nieruchomości Nýdek"
        pdfUrl="https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/kataster/cena-nydek.pdf"
      />
    </>
  );
};

export const GalleryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [badowskiGalleryOpen, setBadowskiGalleryOpen] = useState(false);
  const [wiktorGalleryOpen, setWiktorGalleryOpen] = useState(false);
  const [cenaJanovGalleryOpen, setCenaJanovGalleryOpen] = useState(false);
  const [cenaNydekGalleryOpen, setCenaNydekGalleryOpen] = useState(false);

  return (
    <GalleryContext.Provider value={{
      setBadowskiGalleryOpen,
      setWiktorGalleryOpen,
      setCenaJanovGalleryOpen,
      setCenaNydekGalleryOpen
    }}>
      {children}
      <GalleryModals
        badowskiGalleryOpen={badowskiGalleryOpen}
        setBadowskiGalleryOpen={setBadowskiGalleryOpen}
        wiktorGalleryOpen={wiktorGalleryOpen}
        setWiktorGalleryOpen={setWiktorGalleryOpen}
        cenaJanovGalleryOpen={cenaJanovGalleryOpen}
        setCenaJanovGalleryOpen={setCenaJanovGalleryOpen}
        cenaNydekGalleryOpen={cenaNydekGalleryOpen}
        setCenaNydekGalleryOpen={setCenaNydekGalleryOpen}
      />
    </GalleryContext.Provider>
  );
};
