"use client";

import React, { useState } from 'react';
import { PDFGallery } from './PDFGallery';

const BADOWSKI_GALLERY = [
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/wyrokBadowskiego/wyrok-bartosz-badowski-0001.jpg",
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/wyrokBadowskiego/wyrok-bartosz-badowski-0002.jpg",
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/wyrokBadowskiego/wyrok-bartosz-badowski-0003.jpg"
];

const WIKTOR_GALLERY = [
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/Wiktor/zgon-wiktora-pultusk.jpg"
];

const GalleryContext = React.createContext<{
  setBadowskiGalleryOpen: (open: boolean) => void;
  setWiktorGalleryOpen: (open: boolean) => void;
} | null>(null);

export const GalleryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [badowskiGalleryOpen, setBadowskiGalleryOpen] = useState(false);
  const [wiktorGalleryOpen, setWiktorGalleryOpen] = useState(false);

  return (
    <GalleryContext.Provider value={{ setBadowskiGalleryOpen, setWiktorGalleryOpen }}>
      {children}
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
    </GalleryContext.Provider>
  );
};

export const BadowskiTrigger: React.FC<{ children?: React.ReactNode; title?: string }> = ({ children, title }) => {
  const context = React.useContext(GalleryContext);
  const content = children || <span className="underline">Zobacz dokumentację</span>;
  if (!context) return <>{content}</>;
  return (
    <span
      onClick={() => context.setBadowskiGalleryOpen(true)}
      className="cursor-pointer hover:bg-[#e8d154]/50 transition-colors rounded px-1"
      title={title}
    >
      {children || <span className="underline">Zobacz dokumentację</span>}
    </span>
  );
};

export const WiktorTrigger: React.FC<{ children?: React.ReactNode; title?: string }> = ({ children, title }) => {
  const context = React.useContext(GalleryContext);
  const content = children || <span className="underline">Zobacz dokumentację</span>;
  if (!context) return <>{content}</>;
  return (
    <span
      onClick={() => context.setWiktorGalleryOpen(true)}
      className="cursor-pointer hover:bg-[#e8d154]/50 transition-colors rounded px-1"
      title={title}
    >
      {content}
    </span>
  );
};
