"use client";

import React, { useState } from 'react';
import { InvestigativeArticle } from './components/InvestigativeArticle';
import { PDFGallery } from './components/PDFGallery';

const PINATA_GATEWAY = "https://yellow-elegant-porpoise-917.mypinata.cloud/ipfs";

const KORDYS_PDF_URL = `${PINATA_GATEWAY}/bafybeibzxfsg5s4jkiuf2kzmbdtmfutfjk75ej5zrpt2igan4aldvqc3oq`;
const BADI_PDF_URL = `${PINATA_GATEWAY}/bafkreietkosain6ftde7f3li5ic34qhkwuglz2tu2kfcpbvrwhslskhwza`;
const DOCUMENTATION_IPFS_URL = `${PINATA_GATEWAY}/bafybeicnxlo366f6fznm5p6j7j7j7j7j7j7j7j7j7j7j7j7j7j7j7j7j7j`;
const JANOV_PDF_URL = DOCUMENTATION_IPFS_URL;
const NYDEK_PDF_URL = DOCUMENTATION_IPFS_URL;
const MUNAY_WAYBACK_URL = "https://web.archive.org/web/20230607033503/https://munaysonqo.com/retreats/";

const BADI_JUDGMENT_IMAGES = [
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/wyrokBadowskiego/wyrok-bartosz-badowski-0001.jpg",
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/wyrokBadowskiego/wyrok-bartosz-badowski-0002.jpg",
  "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/wyrokBadowskiego/wyrok-bartosz-badowski-0003.jpg"
];

export default function Page() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const newsArticleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": "Eliksir Wiedźmina – Śledztwo: Michał Kiciński i tajemnica Janowa",
    "description": "Pełna dokumentacja śledztwa: Michał Kiciński, Jarosław Kordys i prokurator Jolanta Świdnicka. Ayahuasca, Janów i tragiczna śmierć uczestniczki.",
    "image": ["https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/wyrokBadowskiego/wyrok-bartosz-badowski-0001.jpg"],
    "datePublished": "2024-03-03",
    "author": [{
      "@type": "Person",
      "name": "Detektyw Polutek",
      "url": "mailto:detektyw.polutek@protonmail.com"
    }]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }}
      />

      <PDFGallery
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={BADI_JUDGMENT_IMAGES}
      />

      <main className="min-h-screen bg-white text-[#000000] selection:bg-[#e8d154]/50 font-body flex flex-col items-center relative">
        <div className="w-full max-w-4xl bg-[#fcfaf2] flex flex-col items-center pb-0 border-x-4 border-black overflow-hidden relative shadow-2xl">

          {/* Header */}
          <div className="w-full flex flex-col items-center pt-2 pb-1 bg-white/10 relative z-10">
            <div className="flex items-center justify-center w-[calc(100%-2rem)] mx-auto gap-4 pt-4 pb-1">
              <div className="flex-grow h-[3px] bg-black"></div>
              <h1 className="text-4xl md:text-[5rem] font-black tracking-tighter text-black uppercase font-unifraktur leading-none whitespace-nowrap px-2">
                NASZA GAZETKA
              </h1>
              <div className="flex-grow h-[3px] bg-black"></div>
            </div>
            <div className="w-[calc(100%-2rem)] mx-auto border-y-4 border-black py-2 flex items-center justify-between px-4 text-[10px] md:text-xs font-black uppercase tracking-[0.15em]">
              <span>📰 Niezależne Media</span>
              <div className="text-center font-display text-black font-bold">NIEDZIELA, 1 MARCA 2026</div>
              <span>Serwis Śledczy Nr 01 📄</span>
            </div>
          </div>

          {/* Title Section */}
          <div className="w-full text-center flex flex-col items-center pt-12 pb-8 px-6 box-border relative z-10">
            <h2 className="text-black w-full mb-1">
              <span className="block text-5xl md:text-[6rem] font-display font-black leading-[0.85] tracking-tighter uppercase">
                Eliksir
              </span>
              <span className="block text-5xl md:text-[6rem] font-display font-black leading-[0.85] tracking-tighter uppercase">
                Wiedźmina
              </span>
            </h2>
            <p className="block text-xs md:text-xl text-black font-black italic uppercase tracking-[0.25em] mt-4 border-y-2 border-black py-1">
              MROCZNA TAJEMNICA TWÓRCÓW CD PROJEKT
            </p>
            <div className="max-w-3xl mx-auto mt-6">
              <p className="text-sm md:text-lg text-[#000000] leading-snug italic font-serif font-bold px-4">
                Ayahuasca, policyjne naloty i tragedia, o której nie miał się nikt dowiedzieć. Publicznie dostępne akta i rejestry ujawniają, jak twórcy gry „Wiedźmin” finansowali szamańskie podziemie.
              </p>
            </div>
          </div>

          <InvestigativeArticle onOpenGallery={() => setIsGalleryOpen(true)} />

          <footer className="mt-8 pt-0 font-mono relative z-10 mb-0 w-full max-w-3xl px-6">
             <div className="mb-10 text-center">
               <h3 className="text-3xl font-black text-black uppercase tracking-tighter font-display mb-4">
                 Dokumenty Źródłowe
               </h3>
               <p className="text-sm text-black/80 italic max-w-xl mx-auto font-serif">
                 Artykuł powstał na podstawie jawnej dokumentacji urzędowej i sądowej. Poniżej pełna lista sygnatur oraz odnośniki umożliwiające samodzielną weryfikację.
               </p>
             </div>

             <div className="grid gap-6 text-sm text-black pb-12">
               <div className="p-4 bg-white/40 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#e8d154]/10 transition-colors">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3 font-sans">
                    <div>
                      <h4 className="font-bold text-black text-base uppercase font-display tracking-widest">Wyrok Jarosława Kordysa</h4>
                      <p className="font-mono text-xs text-black/60 mt-1 font-black">Sygn. 30 T 5/2020</p>
                    </div>
                    <a href={KORDYS_PDF_URL} target="_blank" rel="noopener noreferrer" className="shrink-0 w-full sm:w-48 justify-center bg-black text-white px-4 py-2 text-xs font-bold border-2 border-black hover:bg-white hover:text-black transition-colors flex items-center gap-2 uppercase tracking-widest text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      📄 Pobierz PDF
                    </a>
                  </div>
               </div>

               <div className="p-4 bg-white/40 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#e8d154]/10 transition-colors">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3 font-sans">
                    <div>
                      <h4 className="font-bold text-black text-base uppercase font-display tracking-widest">Wyrok Bartosza Badowskiego</h4>
                      <p className="font-mono text-xs text-black/60 mt-1 font-black">Sygn. 66 T 146/2021</p>
                    </div>
                    <button
                      onClick={() => setIsGalleryOpen(true)}
                      className="shrink-0 w-full sm:w-48 justify-center bg-black text-white px-4 py-2 text-xs font-bold border-2 border-black hover:bg-white hover:text-black transition-colors flex items-center gap-2 uppercase tracking-widest text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    >
                      📄 Otwórz Wyrok
                    </button>
                  </div>
               </div>

               <div className="p-4 bg-white/40 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#e8d154]/10 transition-colors">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3 font-sans">
                    <div>
                      <h4 className="font-bold text-black text-base uppercase font-display tracking-widest">Transakcja: Darowizna (Janów)</h4>
                      <p className="font-mono text-xs text-black/60 mt-1 font-black">Sygnatura: V-5821/2023</p>
                    </div>
                    <a href={JANOV_PDF_URL} target="_blank" rel="noopener noreferrer" className="shrink-0 w-full sm:w-48 justify-center bg-black text-white px-4 py-2 text-xs font-bold border-2 border-black hover:bg-white hover:text-black transition-colors flex items-center gap-2 uppercase tracking-widest text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      📥 Pobierz PDF
                    </a>
                  </div>
               </div>

               <div className="p-4 bg-white/40 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#e8d154]/10 transition-colors">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3 font-sans">
                    <div>
                      <h4 className="font-bold text-black text-base uppercase font-display tracking-widest">Archiwum: Nýdek & Munay</h4>
                      <p className="font-mono text-xs text-black/60 mt-1 font-black">Wayback Machine</p>
                    </div>
                    <a href={MUNAY_WAYBACK_URL} target="_blank" rel="noopener noreferrer" className="shrink-0 w-full sm:w-48 justify-center bg-[#e8d154] text-black px-4 py-2 text-xs font-black border-2 border-black hover:bg-white transition-colors flex items-center gap-2 uppercase tracking-widest text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-sans">
                      🕰️ Otwórz Archiwum
                    </a>
                  </div>
               </div>
             </div>

             <div className="mt-4 text-center pb-8">
                <a href="https://www.nasza-gazetka.pl" target="_blank" rel="noopener noreferrer" className="inline-block font-display text-2xl font-black text-black hover:bg-[#e8d154] transition-colors underline decoration-4 underline-offset-8 mt-4 px-2">
                  WWW.NASZA-GAZETKA.PL
                </a>
             </div>
          </footer>
        </div>
      </main>
    </>
  );
}
