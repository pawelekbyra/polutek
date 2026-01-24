"use client";

import { VerticalGalleryViewer } from './VerticalGalleryViewer';
import { PhotoViewer } from './PhotoViewer';

// Shared type definition
export type GalleryData = {
  title: string;
  images: string[];
  signature?: string;
  pdfUrl?: string;
  type?: 'verdict' | 'gallery';
};

type GalleryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: GalleryData | null;
};

export const GalleryModal = ({ isOpen, onClose, data }: GalleryModalProps) => {
  if (!data) return null;

  // Dispatch based on type
  if (data.type === 'verdict') {
    // Restore vertical scroll for verdicts as requested
    return <VerticalGalleryViewer isOpen={isOpen} onClose={onClose} data={data} />;
  }

  // Default to PhotoViewer for 'gallery' or undefined type
  return <PhotoViewer isOpen={isOpen} onClose={onClose} data={data} />;
};
