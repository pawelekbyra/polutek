import React from 'react';
import { CaseFile, LegalNote, PullQuote, LocationStampUI } from './components/InvestigativeUI';
import { GalleryProvider, BadowskiTrigger, WiktorTrigger } from './components/GalleryTriggers';

export default function Home() {
  return (
    <GalleryProvider>
      <main className="bg-[#FDFBF7] min-h-screen py-12 px-4 md:px-8 font-serif text-[#1a1a1a]">
        <header className="max-w-4xl mx-auto mb-16 text-center">
          <h1 className="text-4xl md:text-6xl mb-4 leading-tight">Majątek ukryty w Beskidach</h1>
          <p className="text-xl text-slate-600 italic">Śledztwo w sprawie przepływów kapitałowych i nieruchomości na pograniczu.</p>
        </header>

        <section className="max-w-4xl mx-auto prose prose-lg prose-slate prose-headings:font-serif prose-p:leading-relaxed">
          <p className="lead">
            W toku dziennikarskiego śledztwa udało nam się ustalić sieć powiązań między osobami zaangażowanymi w głośne procesy sądowe a nieruchomościami położonymi w malowniczych zakątkach czeskich Beskidów.
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-serif mb-6 border-b border-slate-200 pb-2">1. Posiadłość w Janovie (Kordys)</h2>
            
            <LocationStampUI 
              name="Janov"
              code="252793"
              plot="84"
              lv="Janov, Czechy"
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

            <BadowskiTrigger title="Dokumentacja">
              <span className="underline cursor-pointer">Otwórz galerię dowodów fotograficznych</span>
            </BadowskiTrigger>

            <PullQuote author="Źródło zbliżone do śledztwa">
              "To nie były zwykłe inwestycje. To był sposób na 'zaparkowanie' kapitału w miejscu, gdzie nikt nie będzie pytał o jego pochodzenie."
            </PullQuote>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif mb-6 border-b border-slate-200 pb-2">3. Nieruchomość w Nýdku (Badi)</h2>
            
            <LocationStampUI 
              name="Nýdek"
              code="120739"
              plot="95"
              lv="Nýdek, Czechy"
            />

            <p>
              W Nýdku, niewielkiej miejscowości w Beskidzie Śląskim, odnaleźliśmy ślady powiązań z grupą określaną w aktach jako "Badi". 
            </p>

            <WiktorTrigger title="Archiwum">
              <span className="underline cursor-pointer">Przejrzyj zgromadzony materiał wizualny</span>
            </WiktorTrigger>

            <LegalNote title="Notatka prawna: Status prawny nieruchomości">
              Obecnie toczy się postępowanie wyjaśniające w sprawie wpisów w katastrze, które mogą nie odzwierciedlać faktycznego stanu posiadania.
            </LegalNote>
          </section>

          <section className="mt-16 pt-8 border-t border-slate-200 italic text-slate-500 text-sm">
            <p>Materiał zebrany w ramach projektu śledczego. Wszystkie prezentowane dokumenty pochodzą z jawnych źródeł lub zostały udostępnione przez sygnalistów.</p>
          </section>
        </section>
      </main>
    </GalleryProvider>
  );
}
