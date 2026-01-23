"use client";

import React, { useMemo, useState } from 'react';
import DOMPurify from 'dompurify';
import parse, { domToReact, HTMLReactParserOptions, Element } from 'html-react-parser';
import { GalleryData, verdictData, nydekGalleryData } from '@/lib/evidence-data';
import { GalleryModal } from './gallery/GalleryModal';
import { SignatureTrigger } from './gallery/SignatureTrigger';
import { GalleryTrigger } from './gallery/GalleryTrigger';

interface HtmlContentProps {
  data: any;
  isActive: boolean;
}

const HtmlContent: React.FC<HtmlContentProps> = ({
  data,
  isActive,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeGallery, setActiveGallery] = useState<GalleryData | null>(null);

  const openModal = (galleryData: GalleryData) => {
    setActiveGallery(galleryData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveGallery(null);
  };

  const sanitizedHtml = useMemo(() => {
    if (typeof window !== 'undefined' && data.htmlContent) {
      return DOMPurify.sanitize(data.htmlContent, { USE_PROFILES: { html: true } });
    }
    return '';
  }, [data.htmlContent]);

  const parsedContent = useMemo(() => {
    let nydekReplaced = false;
    const options: HTMLReactParserOptions = {
      replace: (domNode) => {
        if (domNode.type === 'text') {
          const text = (domNode as any).data;

          if (text.includes('[[VERDICT_TRIGGER]]')) {
            const parts = text.split('[[VERDICT_TRIGGER]]');
            return (
              <>
                {parts.map((part: string, index: number) => (
                  <React.Fragment key={index}>
                    {part}
                    {index < parts.length - 1 && (
                      <SignatureTrigger
                        onClick={() => openModal(verdictData)}
                        signature={verdictData.signature as string}
                      />
                    )}
                  </React.Fragment>
                ))}
              </>
            );
          }

          if (!nydekReplaced && text.includes('blizniaczy osrodek')) {
            nydekReplaced = true;
            const parts = text.split('blizniaczy osrodek');
            return (
              <>
                {parts[0]}
                <GalleryTrigger
                  onClick={() => openModal(nydekGalleryData)}
                  label="blizniaczy osrodek"
                />
                {parts.slice(1).join('blizniaczy osrodek')}
              </>
            );
          }
        }
      },
    };
    return parse(sanitizedHtml, options);
  }, [sanitizedHtml]);

  return (
    <div className="h-full w-full relative bg-black overflow-y-auto">
      <div className="prose prose-invert p-8 w-full max-w-none">
        {parsedContent}
      </div>
      <GalleryModal
        isOpen={isModalOpen}
        onClose={closeModal}
        data={activeGallery}
      />
    </div>
  );
};

export default HtmlContent;
