"use client";

import React from 'react';
import { Scale, FileText, Search, ShieldCheck, AlertCircle } from 'lucide-react';
import { CaseFile, PullQuote } from './components';

export default function ChmurkaArticle() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#1a1a1a] selection:bg-yellow-200/50 font-serif flex flex-col">

      <header className="pt-20 pb-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-3 py-1 border border-stone-900 text-[10px] font-sans font-bold tracking-[0.2em] uppercase">
            Śledztwo Dziennikarskie
          </div>

          <h1 className="mb-8 text-stone-900">
            <span className="block text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              OGRABIONY ZE SPADKU I SKAZANY ZA UPOMINANIE SIĘ O PRAWDĘ
            </span>
            <span className="block text-xl md:text-2xl text-stone-500 italic font-medium mt-6 max-w-3xl mx-auto">
              Wniosek o wznowienie śledztwa w sprawie tajemniczego włamania
            </span>
          </h1>

          <div className="max-w-2xl mx-auto border-y border-stone-200 py-8 px-4">
            <p className="text-xl md:text-2xl text-stone-700 leading-relaxed italic">
              Zginęły dokumenty, pamiątki po zmarłym ojcu i – co najważniejsze – testament. Sprawcy nie wyważali drzwi łomem; weszli jak do siebie. Kiedy Paweł Perfect zgłosił kradzież majątku i dokumentów, prokuratura umorzyła sprawę, uznając to za &quot;konflikt rodzinny&quot;. Kiedy jednak on zaczął domagać się zwrotu swojej własności, system błyskawicznie zrobił z niego stalkera. Dziś, po latach batalii sądowej, dziennikarz składa wniosek o podjęcie na nowo umorzonego dochodzenia.
            </p>
            <div className="mt-4 text-sm font-sans uppercase tracking-widest text-stone-500">
              Autor: <span className="font-bold text-stone-900">Paweł Perfect</span>
            </div>
          </div>
        </div>
      </header>

      <article className="max-w-2xl mx-auto px-4 pt-8 pb-0 flex-grow">

        <div className="prose prose-stone prose-lg max-w-none prose-headings:font-sans prose-headings:font-bold prose-blockquote:not-italic
          prose-a:text-stone-900 prose-a:font-bold prose-a:no-underline prose-a:underline prose-a:decoration-double prose-a:decoration-stone-400 hover:prose-a:bg-stone-100 transition-colors">

          <p className="first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-stone-900 leading-relaxed">
            Rok 2017. Umiera ojciec Pawła Perfecta. Dziennikarz przebywa wówczas na Teneryfie. W jego rodzinnym domu w Polsce dochodzi do zdarzenia, które staje się katalizatorem dramatu trwającego blisko dekadę.
          </p>

          <p>
            Pod nieobecność jedynego spadkobiercy, do mieszkania zmarłego wchodzą osoby trzecie. Nie są to przypadkowi złodzieje szukający telewizora czy gotówki. To precyzyjne czyszczenie lokalu. Znikają rzeczy osobiste, pamiątki, a przede wszystkim dokumenty.
          </p>

          <p>
            – Szukali testamentu – mówi wprost Perfect. – Wiedzieli, że wola ojca mogła pokrzyżować ich plany przejęcia majątku. Kiedy wróciłem do Polski, zastałem ogołocone mieszkanie.
          </p>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Policja: &quot;To sprawy rodzinne&quot;</h2>

          <p>
            Perfect zgłasza sprawę organom ścigania. Wskazuje, że zginęły przedmioty należące do masy spadkowej. Wskazuje potencjalnych sprawców – członków bliskiej rodziny (wujostwo), którzy mieli dostęp do kluczy i motyw finansowy.
          </p>

          <p>
            Reakcja policji? Klasyczne umorzenie z powodu &quot;niewykrycia sprawców&quot; lub braku znamion czynu zabronionego. W polskim wymiarze sprawiedliwości kradzież dokonana przez rodzinę jest traktowana z przymrużeniem oka. Funkcjonariusze nie zabezpieczają śladów, nie przesłuchują agresywnie świadków, nie sprawdzają bilingów. Dla nich to &quot;awantura o spadek&quot;, w którą nie chcą się mieszać.
          </p>

          <p>
            Sprawę zamieciono pod dywan. Ale Paweł Perfect nie odpuścił.
          </p>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Ofiara zamieniona w sprawcę</h2>

          <p>
            Zdesperowany biernością policji, Perfect zaczyna działać na własną rękę. Wysyła wiadomości SMS, maile, dzwoni. Domaga się zwrotu rzeczy ojca. Pyta o testament. Żąda rozliczenia.
          </p>

          <p>
            I wtedy machina sprawiedliwości, która była ślepa na kradzież, nagle odzyskuje wzrok. Tyle że wymierza go w ofiarę.
          </p>

          <p>
            Rodzina – ta sama, która rzekomo splądrowała mieszkanie – zgłasza &quot;nękanie&quot;. Prokuratura, która nie widziała problemu w zniknięciu majątku, błyskawicznie dostrzega problem w SMS-ach z żądaniem jego zwrotu.
          </p>

          <CaseFile title="Opinia sądowo-psychiatryczna (2025 r.)" type="evidence">
            „Pacjent wrócił z powrotem na Teneryfę (...), ale na początku 2018 r. musiał wrócić do Polski, bo miał sprawę w sądzie o nękanie sms-ami oraz stalkowania wujka. Wujka, od którego domagał się oddania rzeczy ojca”.
          </CaseFile>

          <p>
            Mechanizm był prosty: Złodziej, aby uniknąć odpowiedzialności, wchodzi w rolę ofiary. Perfect zostaje oskarżony o stalking (art. 190a k.k.), a jego walka o sprawiedliwość zostaje sformatowana jako &quot;agresja wobec rodziny&quot;.
          </p>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Nowe otwarcie</h2>

          <p>
            Dlaczego wracamy do tej sprawy teraz? Ponieważ fundament, na którym zbudowano narrację o &quot;agresywnym Perfekcie&quot;, właśnie runął.
          </p>

          <p>
            5 lutego 2026 r. Sąd Okręgowy w Świdnicy uchylił wyrok skazujący Perfecta w sprawie o rzekome łamanie zakazów kontaktu. Wcześniej Sąd w Żyrardowie potwierdził, że Perfect działał w stanie wyłączonej poczytalności, co podważa wiarygodność przypisywanych mu intencji kryminalnych. Biegli przyznają, że motywacją Perfecta nie było nękanie dla samego nękania, lecz cel merkantylny – odzyskanie mienia.
          </p>

          <p>
            Skoro sądy przyznają, że działania Perfecta były desperacką próbą odzyskania własności (lub wynikiem choroby wywołanej traumą po kradzieży), to wraca podstawowe pytanie: Kto ukradł spadek w 2017 roku?
          </p>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Wniosek o reaktywację</h2>

          <p>
            W dniu dzisiejszym do Prokuratury trafia wniosek o podjęcie na nowo umorzonego postępowania w sprawie kradzieży z włamaniem do mieszkania ojca Pawła Perfecta.
          </p>

          <p>Dziennikarz wskazuje na nowe okoliczności:</p>

          <div className="my-8 flex gap-4 p-5 bg-stone-50 border-l-4 border-stone-400 rounded-r-lg shadow-sm">
             <FileText className="w-8 h-8 text-stone-500 shrink-0 mt-1" />
             <div>
               <strong className="block font-serif text-stone-900 text-lg font-bold mb-3">Argumenty Wniosku</strong>
               <ul className="list-disc list-outside ml-4 space-y-2 text-stone-800">
                 <li>
                   <strong>Motyw:</strong> Ustalenia z procesów &quot;stalkingowych&quot; potwierdzają, że konflikt dotyczył konkretnych przedmiotów majątkowych przywłaszczonych przez rodzinę.
                 </li>
                 <li>
                   <strong>Świadkowie:</strong> Zeznania składane w sprawach karnych przeciwko Perfectowi zawierają sprzeczności, które mogą teraz posłużyć jako dowód w sprawie o przywłaszczenie.
                 </li>
                 <li>
                   <strong>Brak przedawnienia:</strong> Przestępstwo kradzieży z włamaniem (art. 279 k.k.) przedawnia się dopiero po 15 latach. Sprawa z 2017 roku jest wciąż otwarta.
                 </li>
               </ul>
             </div>
          </div>

          <PullQuote
            quote="Zrobiono ze mnie wariata i kryminalistę, żeby ukryć zwykłą kradzież. Przez lata sądy zajmowały się moimi SMS-ami, a nikt nie zapytał: „Zaraz, a gdzie są rzeczy, o które ten człowiek się upomina?”. Czas, żeby prokurator zadał to pytanie."
            author="Paweł Perfect"
            source="Oświadczenie dla mediów"
          />

          <p>
            Jeśli prokuratura podejmie śledztwo, może się okazać, że rzekome &quot;ofiary&quot; stalkingu będą musiały zamienić się miejscami z oskarżonym na ławie sądowej.
          </p>

          {/* --- SEKCJA: STATUS PRAWNY --- */}
          <div className="my-12 border-y-2 border-stone-900 py-8">
             <h3 className="font-sans font-bold text-lg uppercase tracking-widest text-stone-900 mb-8 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                Dokumentacja Sprawy
             </h3>

             <div className="grid gap-px bg-stone-200 border border-stone-200">
                <div className="bg-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                   <div>
                      <span className="block font-serif text-stone-900 font-medium">Sprawa o Stalking (Umorzona)</span>
                      <span className="block text-xs text-stone-500 mt-1">Sąd Rejonowy w Żyrardowie</span>
                   </div>
                   <span className="font-mono text-xs font-bold bg-stone-100 px-3 py-1.5 border border-stone-300 text-stone-600 rounded-sm shadow-sm whitespace-nowrap">
                      II K 3/24
                   </span>
                </div>

                <div className="bg-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                   <div>
                      <span className="block font-serif text-stone-900 font-medium">Sprawa o Nękanie (Historyczna)</span>
                      <span className="block text-xs text-stone-500 mt-1">Sąd Rejonowy w Dzierżoniowie</span>
                   </div>
                   <span className="font-mono text-xs font-bold bg-stone-100 px-3 py-1.5 border border-stone-300 text-stone-600 rounded-sm shadow-sm whitespace-nowrap">
                      II K 564/18
                   </span>
                </div>
             </div>

             <div className="mt-8 text-sm text-stone-600 font-sans text-center md:text-left">
                Artykuł oparty na analizie akt spraw sygn. II K 564/18, II K 3/24 oraz dokumentacji medycznej i spadkowej.
             </div>
          </div>
          {/* ------------------------------------------------ */}

        </div>

        <footer className="mt-4 pt-8 border-none font-sans pb-16">
           <div className="mt-8 text-center">
              <div className="w-24 h-px bg-stone-300 mx-auto mb-6"></div>
              <p className="text-xs text-stone-500 font-mono uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Zasoby Niezatapialne (Web3)
              </p>
              <a
                href="https://dziennikarzsledczy.eth.limo"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-stone-400 hover:text-stone-900 transition-colors underline decoration-double decoration-stone-200"
              >
                dziennikarzsledczy.eth.limo
              </a>
           </div>
        </footer>
      </article>
    </main>
  );
}
