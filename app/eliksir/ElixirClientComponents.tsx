"use client";

import React, { useState, createContext, useContext } from 'react';
import { EvidenceAudioModal, GalleryModal, ArticleVideoPlayer as VideoPlayer, GalleryData } from '@/app/components';
import {
  GALLERY_NYDEK,
  GALLERY_WYROK_KORDYS,
  GALLERY_WYROK_BADI,
  GALLERY_WEZWANIE_KICINSKI,
  GALLERY_JANOV
} from '@/lib/eliksir-data';

type ModalContextType = {
  openGallery: (type: 'nydek' | 'wyrok_kordys' | 'wyrok_badi' | 'wezwanie_kicinski' | 'janov') => void;
  openAudio: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useElixirModals = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useElixirModals must be used within ElixirModalsProvider');
  return context;
};

export const ElixirModalsProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAudioOpen, setIsAudioOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryData, setGalleryData] = useState<GalleryData | null>(null);

  const openGallery = (type: 'nydek' | 'wyrok_kordys' | 'wyrok_badi' | 'wezwanie_kicinski' | 'janov') => {
    const maps = {
      nydek: GALLERY_NYDEK,
      wyrok_kordys: GALLERY_WYROK_KORDYS,
      wyrok_badi: GALLERY_WYROK_BADI,
      wezwanie_kicinski: GALLERY_WEZWANIE_KICINSKI,
      janov: GALLERY_JANOV
    };
    setGalleryData(maps[type]);
    setIsGalleryOpen(true);
  };

  const openAudio = () => setIsAudioOpen(true);

  return (
    <ModalContext.Provider value={{ openGallery, openAudio }}>
      {children}
      <EvidenceAudioModal isOpen={isAudioOpen} onClose={() => setIsAudioOpen(false)} src="/evidence/stefan-nagranie.mp3" />
      <GalleryModal isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} data={galleryData} />
    </ModalContext.Provider>
  );
};

export const GalleryTrigger = ({
  type,
  children,
  className
}: {
  type: 'nydek' | 'wyrok_kordys' | 'wyrok_badi' | 'wezwanie_kicinski' | 'janov',
  children: React.ReactNode,
  className?: string
}) => {
  const { openGallery } = useElixirModals();
  return (
    <button onClick={() => openGallery(type)} className={className}>
      {children}
    </button>
  );
};

export const AudioTrigger = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const { openAudio } = useElixirModals();
  return (
    <button onClick={openAudio} className={className}>
      {children}
    </button>
  );
};

export const ArticleVideoPlayer = ({ src, poster }: { src: string, poster: string }) => {
  return <VideoPlayer src={src} poster={poster} />;
};
