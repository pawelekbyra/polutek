"use client";

import React from 'react';
import { ShieldCheck, Search, FileText, Globe } from 'lucide-react';

export default function FakeArticle() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#1a1a1a] selection:bg-yellow-200/50 font-serif flex flex-col">
      <header className="pt-20 pb-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-3 py-1 border border-stone-900 text-[10px] font-sans font-bold tracking-[0.2em] uppercase">
            www.detektyw.polutek.pl
          </div>

          <h1 className="mb-8 text-stone-900">
            <span className="block text-4xl md:text-6xl font-bold leading-tight tracking-tight">
              Szamańskie rytuały, elity biznesu i zmowa milczenia
            </span>
          </h1>
        </div>
      </header>

      <article className="max-w-2xl mx-auto px-4 pt-8 pb-16 flex-grow">
        <div className="prose prose-stone prose-lg max-w-none prose-headings:font-sans prose-headings:font-bold prose-blockquote:not-italic
          prose-a:text-stone-900 prose-a:font-bold prose-a:no-underline prose-a:underline prose-a:decoration-double prose-a:decoration-stone-400 hover:prose-a:bg-stone-100 transition-colors">

          <p className="first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-stone-900 leading-relaxed">
            W świecie wielkich pieniędzy, gdzie presja i stres są na porządku dziennym, coraz więcej wpływowych Polaków szuka ukojenia w alternatywnych metodach. Trop naszego niezależnego śledztwa prowadzi do tajemniczych czeskich osad, położonych tuż przy granicy z Polską. To tam, z dala od ciekawskich spojrzeń i aparatów państwowych, organizowane są niebezpieczne ceremonie z użyciem potężnych, egzotycznych substancji o działaniu psychodelicznym.
          </p>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">
            Czeskie osady i tragiczne w skutkach ceremonie
          </h2>

          <p>
            Pod płaszczykiem duchowego oczyszczenia i powrotu do natury, zamożni uczestnicy tych zamkniętych, bardzo drogich spotkań poddają się rytuałom, które nierzadko wymykają się spod jakiejkolwiek kontroli prowadzących. Z zebranych przez nas informacji i twardych dowodów wynika, że w jednej z takich odizolowanych placówek doszło do dramatycznych wydarzeń. Organizatorzy i uczestnicy z niezwykłą determinacją próbują utrzymać ten incydent w absolutnej tajemnicy przed opinią publiczną oraz organami ścigania, zmuszając świadków do natychmiastowej ucieczki i zacierając ślady.
          </p>

          <h3 className="text-2xl mt-12 mb-6 tracking-tight text-stone-900">
            Zatajone dowody, nagrania audio i akta sądowe
          </h3>

          <p>
            Wielomiesięczna praca śledcza odsłania przerażające kulisy działalności osób, które zbijają fortunę na duchowych poszukiwaniach polskiej elity. Posiadamy obszerne, bezsporne materiały dowodowe, które rzucają zupełnie nowe światło na to, jak daleko można się posunąć, by wyciszyć niewygodną prawdę i ochronić gigantyczne biznesy. Już w najbliższych dniach opublikujemy na tej stronie pełne, nieocenzurowane akta sprawy. Udostępnimy do odsłuchu oryginalne zeznania w formie nagrań audio oraz kompletne skany wielostronicowych wyroków sądowych, które ostatecznie zdemaskują ten proceder. Zaglądajcie tu, bo prawda o elitach wkrótce ujrzy światło dzienne.
          </p>

          <div className="mt-16 mb-4 flex justify-end">
            <div className="text-right border-t border-stone-200 pt-8 w-full">
              <span className="block font-bold text-stone-900">Detektyw Polutek</span>
              <span className="block text-xs text-stone-500 font-sans mt-1 italic">detektyw.polutek@protonmail.com</span>
            </div>
          </div>

          <div className="my-12 border-y-2 border-stone-900 py-8">
            <h3 className="font-sans font-bold text-lg uppercase tracking-widest text-stone-900 mb-8 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              Status Śledztwa (Bieżący)
            </h3>
            <div className="p-4 bg-white border border-stone-200 shadow-sm">
              <p className="text-stone-700 italic">
                Trwa weryfikacja i przygotowanie materiałów multimedialnych do publikacji. Dokumentacja zostanie udostępniona wkrótce.
              </p>
            </div>
          </div>
        </div>
      </article>

      <footer className="bg-stone-100 py-12 px-4 border-t border-stone-200">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs text-stone-500 font-mono uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
            <Search className="w-4 h-4" />
            Niezależne Dziennikarstwo Śledcze
          </p>
          <div className="flex justify-center gap-6">
            <div className="flex items-center gap-1 text-stone-400">
              <FileText className="w-4 h-4" />
              <span className="text-[10px] uppercase font-bold tracking-tighter">Akta Sądowe</span>
            </div>
            <div className="flex items-center gap-1 text-stone-400">
              <Globe className="w-4 h-4" />
              <span className="text-[10px] uppercase font-bold tracking-tighter">Dowody</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
