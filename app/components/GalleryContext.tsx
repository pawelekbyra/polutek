"use client";

import React, { createContext, useContext, useState } from 'react';
import { PDFGallery } from './PDFGallery';

interface GalleryContextType {
  setBadowskiGalleryOpen: (open: boolean) => void;
  setKordysGalleryOpen: (open: boolean) => void;
  setWiktorGalleryOpen: (open: boolean) => void;
  setCenaJanovGalleryOpen: (open: boolean) => void;
  setCenaNydekGalleryOpen: (open: boolean) => void;
  setWlasnoscKicinskiGalleryOpen: (open: boolean) => void;
  setJanovPhotosGalleryOpen: (open: boolean) => void;
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

const KORDYS_GALLERY = Array.from({ length: 95 }, (_, i) => {
  const pageNumber = (i + 1).toString().padStart(4, '0');
  return `https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/wyrokKordysa/wyrok-jaroslawa-kordysa-30-t-5-2021-28-01-2022_page-${pageNumber}.jpg`;
});

const WIKTOR_GALLERY = [
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/Wiktor/zgon-wiktora-pultusk.jpg"
];

const CENA_JANOV_GALLERY = [
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/kataster/cena-janov.jpg"
];

const CENA_NYDEK_GALLERY = [
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/kataster/cena-nydek.jpg"
];

const WLASNOSC_KICINSKI_GALLERY = [
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/Janov/wlasnosc-kicinski-obrazy-0.jpg",
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/Janov/wlasnosc-kicinski-obrazy-1.jpg",
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/Janov/wlasnosc-kicinski-obrazy-2.jpg",
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/Janov/wlasnosc-kicinski-obrazy-3.jpg"
];

const JANOV_PHOTOS_GALLERY = [
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/Janov/janov1.jpg",
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/Janov/janov2.jpg",
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/Janov/janov3.jpg",
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/Janov/janov4.jpg",
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/Janov/janov5.jpg",
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/Janov/janov6.jpg",
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/Janov/janov7.jpg",
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/Janov/janov8.jpg",
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/Janov/janov9.jpg",
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/Janov/janov10.jpg",
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/Janov/janov11.jpg",
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/Janov/janov12.jpg",
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/Janov/janov13.jpg",
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/Janov/janov14.jpg",
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/Janov/janov15.jpg",
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/Janov/janov16.jpg",
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/Janov/janov17.jpg",
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/Janov/janov18.jpg",
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/Janov/janov19.jpg",
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/Janov/janov20.jpg",
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/Janov/janov21.jpg",
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/Janov/janov22.jpg",
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/Janov/janov23.jpg"
];

interface GalleryModalsProps {
  badowskiGalleryOpen: boolean;
  setBadowskiGalleryOpen: (open: boolean) => void;
  kordysGalleryOpen: boolean;
  setKordysGalleryOpen: (open: boolean) => void;
  wiktorGalleryOpen: boolean;
  setWiktorGalleryOpen: (open: boolean) => void;
  cenaJanovGalleryOpen: boolean;
  setCenaJanovGalleryOpen: (open: boolean) => void;
  cenaNydekGalleryOpen: boolean;
  setCenaNydekGalleryOpen: (open: boolean) => void;
  wlasnoscKicinskiGalleryOpen: boolean;
  setWlasnoscKicinskiGalleryOpen: (open: boolean) => void;
  janovPhotosGalleryOpen: boolean;
  setJanovPhotosGalleryOpen: (open: boolean) => void;
  dict: any;
}

const GalleryModals: React.FC<GalleryModalsProps> = ({
  badowskiGalleryOpen,
  setBadowskiGalleryOpen,
  kordysGalleryOpen,
  setKordysGalleryOpen,
  wiktorGalleryOpen,
  setWiktorGalleryOpen,
  cenaJanovGalleryOpen,
  setCenaJanovGalleryOpen,
  cenaNydekGalleryOpen,
  setCenaNydekGalleryOpen,
  wlasnoscKicinskiGalleryOpen,
  setWlasnoscKicinskiGalleryOpen,
  janovPhotosGalleryOpen,
  setJanovPhotosGalleryOpen,
  dict
}) => {
  return (
    <>
      <PDFGallery
        isOpen={badowskiGalleryOpen}
        onClose={() => setBadowskiGalleryOpen(false)}
        images={BADOWSKI_GALLERY}
        title={dict.click_to_see_judgment.replace('Kliknij, aby zobaczyć ', '')}
        dict={dict}
      />

      <PDFGallery
        isOpen={kordysGalleryOpen}
        onClose={() => setKordysGalleryOpen(false)}
        images={KORDYS_GALLERY}
        title={dict.click_to_see_judgment.replace('Kliknij, aby zobaczyć ', '')}
        pdfUrl="https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/wyrokKordysa/wyrok-jaroslawa-kordysa-30-t-5-2021-28-01-2022.pdf"
        dict={dict}
      />

      <PDFGallery
        isOpen={wiktorGalleryOpen}
        onClose={() => setWiktorGalleryOpen(false)}
        images={WIKTOR_GALLERY}
        title={dict.click_to_see_details.replace('Kliknij, aby zobaczyć ', '')}
        dict={dict}
      />

      <PDFGallery
        isOpen={cenaJanovGalleryOpen}
        onClose={() => setCenaJanovGalleryOpen(false)}
        images={CENA_JANOV_GALLERY}
        title={dict.click_to_see_document.replace('Kliknij, aby zobaczyć ', '')}
        pdfUrl="https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/kataster/cena-janov.pdf"
        dict={dict}
      />

      <PDFGallery
        isOpen={cenaNydekGalleryOpen}
        onClose={() => setCenaNydekGalleryOpen(false)}
        images={CENA_NYDEK_GALLERY}
        title={dict.click_to_see_document.replace('Kliknij, aby zobaczyć ', '')}
        pdfUrl="https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/kataster/cena-nydek.pdf"
        dict={dict}
      />

      <PDFGallery
        isOpen={wlasnoscKicinskiGalleryOpen}
        onClose={() => setWlasnoscKicinskiGalleryOpen(false)}
        images={WLASNOSC_KICINSKI_GALLERY}
        title={dict.click_to_see_document.replace('Kliknij, aby zobaczyć ', '')}
        pdfUrl="https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/Janov/wlasnosc-kicinski.pdf"
        dict={dict}
      />

      <PDFGallery
        isOpen={janovPhotosGalleryOpen}
        onClose={() => setJanovPhotosGalleryOpen(false)}
        images={JANOV_PHOTOS_GALLERY}
        title={dict.click_to_see_gallery.replace('Kliknij, aby zobaczyć ', '')}
        dict={dict}
      />
    </>
  );
};

export const GalleryProvider: React.FC<{ children: React.ReactNode; dict: any }> = ({ children, dict }) => {
  const [badowskiGalleryOpen, setBadowskiGalleryOpen] = useState(false);
  const [kordysGalleryOpen, setKordysGalleryOpen] = useState(false);
  const [wiktorGalleryOpen, setWiktorGalleryOpen] = useState(false);
  const [cenaJanovGalleryOpen, setCenaJanovGalleryOpen] = useState(false);
  const [cenaNydekGalleryOpen, setCenaNydekGalleryOpen] = useState(false);
  const [wlasnoscKicinskiGalleryOpen, setWlasnoscKicinskiGalleryOpen] = useState(false);
  const [janovPhotosGalleryOpen, setJanovPhotosGalleryOpen] = useState(false);

  return (
    <GalleryContext.Provider value={{
      setBadowskiGalleryOpen,
      setKordysGalleryOpen,
      setWiktorGalleryOpen,
      setCenaJanovGalleryOpen,
      setCenaNydekGalleryOpen,
      setWlasnoscKicinskiGalleryOpen,
      setJanovPhotosGalleryOpen
    }}>
      {children}
      <GalleryModals
        badowskiGalleryOpen={badowskiGalleryOpen}
        setBadowskiGalleryOpen={setBadowskiGalleryOpen}
        kordysGalleryOpen={kordysGalleryOpen}
        setKordysGalleryOpen={setKordysGalleryOpen}
        wiktorGalleryOpen={wiktorGalleryOpen}
        setWiktorGalleryOpen={setWiktorGalleryOpen}
        cenaJanovGalleryOpen={cenaJanovGalleryOpen}
        setCenaJanovGalleryOpen={setCenaJanovGalleryOpen}
        cenaNydekGalleryOpen={cenaNydekGalleryOpen}
        setCenaNydekGalleryOpen={setCenaNydekGalleryOpen}
        wlasnoscKicinskiGalleryOpen={wlasnoscKicinskiGalleryOpen}
        setWlasnoscKicinskiGalleryOpen={setWlasnoscKicinskiGalleryOpen}
        janovPhotosGalleryOpen={janovPhotosGalleryOpen}
        setJanovPhotosGalleryOpen={setJanovPhotosGalleryOpen}
        dict={dict}
      />
    </GalleryContext.Provider>
  );
};
