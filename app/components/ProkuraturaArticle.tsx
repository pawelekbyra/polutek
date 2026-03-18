'use client';

import React from 'react';
import { CaseFile, FormattedText } from './InvestigativeUI';
import { Music, Download, Calendar } from 'lucide-react';
import { useGallery } from './GalleryContext';

const AudioPlayer = ({ src, title, downloadLabel }: { src: string; title: string, downloadLabel: string }) => (
  <div className="mt-4 bg-black/5 rounded-sm p-4 border border-black/10">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-black/60">
        <Music size={12} />
        <span>Audio File: {title}</span>
      </div>
      <a
        href={src}
        download={title}
        className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-black/60 hover:text-black transition-colors border-b border-black/20 hover:border-black"
      >
        <Download size={12} />
        <span>{downloadLabel}</span>
      </a>
    </div>
    <audio controls className="w-full h-10 accent-black">
      <source src={src} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  </div>
);

export const ProkuraturaArticle = ({ t }: { t: any }) => {
  const p = t.prokuratura;
  const { setSmsGalleryOpen } = useGallery();

  return (
    <article className="max-w-4xl mx-auto px-4 py-12 space-y-12 w-full">
      <section className="space-y-8">
        <CaseFile title={p.evidence1Title} t={t}>
          <div className="space-y-4">
            <p>
              <FormattedText text={p.evidence1Desc} />
            </p>
            <AudioPlayer
              src="https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/chmurka/odpowiedzi-leszka-1.mp3"
              title="odpowiedzi-leszka-1.mp3"
              downloadLabel={p.downloadAudio}
            />
          </div>
        </CaseFile>

        <CaseFile title={p.evidence2Title} t={t}>
          <div className="space-y-4">
            <p>
              <FormattedText text={p.evidence2Desc} />
            </p>
            <AudioPlayer
              src="https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/chmurka/odpowiedzi-leszka-2.mp3"
              title="odpowiedzi-leszka-2.mp3"
              downloadLabel={p.downloadAudio}
            />
          </div>
        </CaseFile>

        <CaseFile title={p.evidence3Title} t={t}>
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-black/60 border-b border-black/10 pb-2">
              <Calendar size={14} />
              <span>{p.date26Jan}</span>
            </div>

            <p>
              <FormattedText text={p.evidence3Desc} />
            </p>

            <div
              className="relative group cursor-pointer border-2 border-black/10 rounded-sm overflow-hidden shadow-2xl hover:shadow-black/20 transition-all hover:scale-[1.01] active:scale-[0.99] max-w-2xl mx-auto bg-white"
              onClick={() => setSmsGalleryOpen(true)}
            >
              <div className="relative w-full">
                <img
                  src="/skandalicznysms.png"
                  alt="Evidence 3 - SMS"
                  className="w-full h-auto block"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center pointer-events-none">
                <div className="bg-black text-white px-6 py-3 text-sm font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity shadow-xl">
                  {t.ui.tooltipDetails}
                </div>
              </div>
            </div>
          </div>
        </CaseFile>
      </section>
    </article>
  );
}
