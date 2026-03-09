import React from 'react';
import { CaseFile, LegalNote, PullQuote, LocationStampUI, TransactionStampUI } from './InvestigativeUI';
import { ArticleVideoPlayer } from './InvestigativeMedia';
import { GalleryProvider, BadowskiTrigger, WiktorTrigger } from './GalleryTriggers';

const PINATA_GATEWAY = "https://yellow-elegant-porpoise-917.mypinata.cloud/ipfs/";

export const InvestigativeArticle = () => {
  return (
    <GalleryProvider>
      <div className="bg-[#FDFBF7] min-h-screen py-12 px-4 md:px-8 font-serif text-[#1a1a1a]">
        <header className="max-w-4xl mx-auto mb-16 text-center">
          <h1 className="text-4xl md:text-6xl mb-4 leading-tight">Majątek ukryty w Beskidach</h1>
          <p className="text-xl text-slate-600 italic">Śledztwo w sprawie przepływów kapitałowych i nieruchomości na pograniczu.</p>
        </header>

        <section className="max-w-4xl mx-auto prose prose-lg prose-slate prose-headings:font-serif">
          <p className="lead">
            W toku dziennikarskiego śledztwa udało nam się ustalić sieć powiązań między osobami zaangażowanymi w głośne procesy sądowe a nieruchomościami położonymi w malowniczych zakątkach czeskich Beskidów.
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-serif mb-6 border-b border-slate-200 pb-2">1. Posiadłość w Janovie (Kordys)</h2>
            
            <LocationStampUI 
              location="JANOV"
              details="Janov 252793 84 Janov, Czechy"
            />

            <p>
              Pierwszym kluczowym punktem jest posiadłość w Janovie. Dokumentacja wskazuje, że nieruchomość ta stała się centrum operacyjnym w okresie intensywnych transferów finansowych.
            </p>

            <CaseFile title="Akta sprawy Kordysa" type="evidence">
              Analiza przepływów bankowych sugeruje, że środki na zakup zostały przetransferowane za pośrednictwem spółek typu shell.
            </CaseFile>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif mb-6 border-b border-slate-200 pb-2">2. Wątek Badowskiego</h2>
            
            <p>
              Podczas analizy archiwów natrafiliśmy na dokumentację fotograficzną dotyczącą transakcji związanych z Wiktorem Badowskim.
            </p>

            <BadowskiTrigger />

            <PullQuote author="Źródło zbliżone do śledztwa">
              "To nie były zwykłe inwestycje. To był sposób na 'zaparkowanie' kapitału w miejscu, gdzie nikt nie będzie pytał o jego pochodzenie."
            </PullQuote>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif mb-6 border-b border-slate-200 pb-2">3. Nieruchomość w Nýdku (Badi)</h2>
            
            <LocationStampUI 
              location="NÝDEK"
              details="Nýdek 120739 95 Nýdek, Czechy"
            />

            <p>
              W Nýdku, niewielkiej miejscowości w Beskidzie Śląskim, odnaleźliśmy ślady powiązań z grupą określaną w aktach jako "Badi". 
            </p>

            <WiktorTrigger />

            <LegalNote title="Notatka prawna: Status prawny nieruchomości">
              Obecnie toczy się postępowanie wyjaśniające w sprawie wpisów w katastrze, które mogą nie odzwierciedlać faktycznego stanu posiadania.
            </LegalNote>
          </section>

          <section className="mt-16 pt-8 border-t border-slate-200 italic text-slate-500 text-sm">
            <p>Materiał zebrany w ramach projektu śledczego. Wszystkie prezentowane dokumenty pochodzą z jawnych źródeł lub zostały udostępnione przez sygnalistów.</p>
          </section>
        </section>
      </div>
    </GalleryProvider>
  );
};
