"use client";

import React, { useMemo, useState } from 'react';
import { HtmlSlideDataDTO } from '@/lib/dto';
import DOMPurify from 'dompurify';
import parse, { domToReact, HTMLReactParserOptions, Element } from 'html-react-parser';
import { GalleryData, verdictData, nydekGalleryData } from '@/lib/evidence-data';
import { GalleryModal } from './gallery/GalleryModal';
import { SignatureTrigger } from './gallery/SignatureTrigger';
import { GalleryTrigger } from './gallery/GalleryTrigger';

interface HtmlContentProps {
  data: HtmlSlideDataDTO;
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
    const replacements = [
      {
        find: verdictData.signature,
        replace: (key: number, text: string) => (
          <SignatureTrigger
            key={key}
            onClick={() => openModal(verdictData)}
            signature={text}
          />
        ),
      },
      {
        find: /blizniaczy osrodek|bliźniaczy ośrodek/gi,
        replace: (key: number, text: string) => (
          <GalleryTrigger
            key={key}
            onClick={() => openModal(nydekGalleryData)}
            label={text}
          />
        ),
      },
    ];

    const options: HTMLReactParserOptions = {
      replace: (domNode) => {
        if (domNode.type === 'text') {
          const text = (domNode as any).data;
          let segments: (string | JSX.Element)[] = [text];

          replacements.forEach(({ find, replace }) => {
            if (!find) return;

            let newSegments: (string | JSX.Element)[] = [];
            segments.forEach((segment) => {
              if (typeof segment === 'string') {
                const parts = segment.split(find);
                const matches = segment.match(find);

                parts.forEach((part, index) => {
                  newSegments.push(part);
                  if (index < parts.length - 1) {
                    const match = matches ? matches[index] : '';
                    newSegments.push(replace(index, match));
                  }
                });
              } else {
                newSegments.push(segment);
              }
            });
            segments = newSegments;
          });

          if (segments.length > 1 || (segments.length === 1 && segments[0] !== text)) {
            return <>{segments.map((s, i) => <React.Fragment key={i}>{s}</React.Fragment>)}</>;
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
