"use client";

import { ImageViewer } from './ImageViewer';
import { VerdictFlipbook } from './VerdictFlipbook';

type GalleryData = {
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
  if (!isOpen || !data) {
    return null;
  }

  const isVerdict = data.type === 'verdict';

  return (
    <>
      {isVerdict ? (
        <VerdictFlipbook isOpen={isOpen} onClose={onClose} data={data} />
      ) : (
        <ImageViewer isOpen={isOpen} onClose={onClose} data={data} />
      )}
    </>
  );
};
