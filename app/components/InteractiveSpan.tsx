"use client";

import React from 'react';
import { useGallery } from './GalleryContext';

interface InteractiveSpanProps {
  type: 'badowski' | 'kordys' | 'wiktor' | 'cena' | 'cena-nydek';
  title: string;
  children: React.ReactNode;
}

export const InteractiveSpan: React.FC<InteractiveSpanProps> = ({ type, title, children }) => {
  const { setBadowskiGalleryOpen, setKordysGalleryOpen, setWiktorGalleryOpen, setCenaJanovGalleryOpen, setCenaNydekGalleryOpen } = useGallery();

  const onClick = () => {
    if (type === 'badowski') setBadowskiGalleryOpen(true);
    if (type === 'kordys') setKordysGalleryOpen(true);
    if (type === 'wiktor') setWiktorGalleryOpen(true);
    if (type === 'cena') setCenaJanovGalleryOpen(true);
    if (type === 'cena-nydek') setCenaNydekGalleryOpen(true);
  };

  return (
    <span
      onClick={onClick}
      className="cursor-pointer hover:bg-[#e8d154]/50 transition-colors rounded px-1"
      title={title}
    >
      {children}
    </span>
  );
};
