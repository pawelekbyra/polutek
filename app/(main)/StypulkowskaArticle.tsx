"use client";

import React from 'react';
import { Scale, FileText, Search, User, Mail, ShieldCheck, AlertCircle } from 'lucide-react';
import { CaseFile, PullQuote, LegalNote } from './components';

export default function StypulkowskaArticle() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#1a1a1a] selection:bg-yellow-200/50 font-serif flex flex-col">

      <header className="pt-20 pb-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-3 py-1 border border-stone-900 text-[10px] font-sans font-bold tracking-[0.2em] uppercase">
            Śledztwo Dziennikarskie
          </div>

          <h1 className="mb-8 text-stone-900">
            <span className="block text-4xl md:text-6xl font-bold leading-tight tracking-tight">
              PROKURATOR PONAD PRAWEM
            </span>
            <span className="block text-xl md:text-3xl text-stone-500 italic font-medium mt-6 max-w-3xl mx-auto">
              Jak szefowa jednostki w Środzie Śląskiej fabrykowała proces przeciwko dziennikarzowi
            </span>
          </h1>

          <div className="max-w-2xl mx-auto border-y border-stone-200 py-8 px-4">
            <p className="text-xl md:text-2xl text-stone-700 leading-relaxed italic">
              Antydatowane pisma, ukrywane dowody niewinności, &quot;awarie systemu&quot;, które zdarzają się tylko wtedy, gdy trzeba ukryć przewlekłość, i forsowanie więzienia dla człowieka, którego sądy uznały za niepoczytalnego. To nie scenariusz filmu, to metody pracy Prokurator Rejonowej Alicji Stypułkowskiej. Ujawniamy kulisy sprawy, która właśnie runęła w Sądzie Okręgowym w Świdnicy.
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
            5 lutego 2026 roku w Sądzie Okręgowym w Świdnicy zapadła cisza, po której sędzia wypowiedziała słowa druzgocące dla prokuratury: <strong>„Sąd nie ma innej możliwości jak uchylić wyrok”</strong>. To był koniec trzyletniego polowania na dziennikarza śledczego, Pawła Perfecta. Polowania, które prowadziła prokuratura w Środzie Śląskiej i Dzierżoniowie, ignorując prawo, medycynę i logikę.
          </p>

          <p>
            Sprawa Pawła Perfecta to gotowy akt oskarżenia przeciwko wymiarowi sprawiedliwości w mikroskali powiatowej. Pokazuje, co dzieje się, gdy urzędnik państwowy postanawia zniszczyć obywatela, a prawo staje się tylko przeszkodą, którą trzeba obejść.
          </p>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Paragraf na &quot;zjedzenie zupy&quot;</h2>

          <p>
            Koszmar zaczął się od absurdu. Prokuratura oskarżyła Perfecta o złamanie sądowego zakazu kontaktu. Problem w tym, że w dacie czynu (marzec 2022 r.) kontaktowanie się przez pośrednika (adwokata) nie było przestępstwem. Przepis zakazujący takiej formy kontaktu wszedł w życie dopiero w październiku 2023 r.
          </p>

          <PullQuote
            quote="To tak, jakbym został oskarżony o zjedzenie zupy, co nie jest przestępstwem, a sąd badałby, czy jadłem ją poczytalny i czy zostawiłem odciski palców na łyżce."
            author="Paweł Perfect"
            source="Mowa końcowa przed Sądem Okręgowym"
          />

          <p>
            Mimo to, Sąd Rejonowy w Dzierżoniowie skazał go na 10 miesięcy bezwzględnego więzienia. Bez obrońcy. Bez badań psychiatrycznych. Dopiero Sąd Okręgowy w Świdnicy przerwał to szaleństwo, wytykając &quot;bezwzględną przyczynę odwoławczą&quot;. Prokuratura chciała wsadzić do więzienia człowieka, nie sprawdzając nawet, czy w świetle prawa popełnił przestępstwo, ani czy jest zdrowy psychicznie.
          </p>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Fabryka fałszywych dat w Środzie Śląskiej</h2>

          <p>
            Jednak prawdziwa afera kryje się w Środzie Śląskiej, w gabinecie Prokurator Rejonowej Alicji Stypułkowskiej. To tam, według zgromadzonych dowodów, dochodziło do procederu, który można nazwać fałszerstwem urzędniczym.
          </p>

          <p>
            Gdy Perfect złożył skargę na przewlekłość postępowania, prokuratura miała obowiązek przesłać ją do sądu niezwłocznie. Zamiast tego pismo utknęło na 43 dni. Kiedy sprawa wyszła na jaw, Prokuratura wytworzyła dokument datowany na 15 stycznia 2026 r., twierdząc, że skarga została wysłana. Dowody są jednak bezlitosne: pismo wpłynęło do Sądu Okręgowego we Wrocławiu dopiero 28 stycznia 2026 r.
          </p>

          <CaseFile title="Analiza doręczenia pisma">
            List priorytetowy pokonywał trasę 30 km przez dwa tygodnie? To fizycznie niemożliwe. Jedynym wyjaśnieniem jest antydatowanie dokumentu, by ukryć bezczynność przed nadzorem. To przestępstwo z art. 271 Kodeksu Karnego.
          </CaseFile>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">&quot;Awaria systemu&quot;, która ma ukryć prawdę</h2>

          <p>
            Gdy dziennikarz zaczął dopytywać o dostęp do akt, w prokuraturze nagle &quot;wysiadły serwery&quot;.
          </p>

          <CaseFile title="Email od asystenta prokuratora" type="email">
            Otrzymałem maila od asystenta prokuratora, Krzysztofa Zenki, o &quot;utracie zdigitalizowanych akt&quot; z powodu błędu systemu.
          </CaseFile>

          <p>
            – To techniczny bełkot – mówi Perfect, który sam jest ekspertem IT. – Zmiana sygnatury sprawy w bazie danych nie kasuje plików. To była paniczna próba zablokowania mi wglądu w akta, bym nie odkrył manipulacji.
          </p>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Ukryty dowód niewinności</h2>

          <p>
            Najpoważniejszy zarzut dotyczy jednak mataczenia materiałem dowodowym. W sprawie dotyczącej rzekomych gróźb mailowych, Perfect dostarczył dowody wskazujące na innego sprawcę – swojego byłego wspólnika, Wiktora Badowskiego (znanego z głośnej afery ayahuaskowej, w którą zamieszani są twórcy CD Projekt). Co zrobiła Prokurator Stypułkowska?
          </p>

          <div className="my-8 flex gap-4 p-5 bg-red-50/50 border-l-4 border-red-900/80 rounded-r-lg shadow-sm">
             <AlertCircle className="w-8 h-8 text-red-900/80 shrink-0 mt-1" />
             <div>
               <strong className="block font-serif text-red-900 text-lg font-bold mb-1">Usunięcie dowodu z akt</strong>
               <div className="text-stone-800 text-lg leading-relaxed">
                 Usunęła ten wniosek dowodowy z akt przekazanych sądowi. Sędzia otrzymał okrojone akta, w których oskarżony nie ma żadnej linii obrony. To zbrodnia sądowa – celowe dążenie do skazania niewinnego człowieka poprzez zatajenie dowodów (art. 276 k.k. i art. 231 k.k.).
               </div>
             </div>
          </div>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Żyrardów obnaża kłamstwo</h2>

          <p>
            Hipokryzję działań prokuratury w Środzie Śląskiej ostatecznie obnażył Sąd Rejonowy w Żyrardowie. W bliźniaczej sprawie z tego samego okresu (jesień 2023 r.), Sąd ten – na podstawie rzetelnej opinii biegłych – umorzył postępowanie, stwierdzając u Perfecta całkowitą niepoczytalność (schizofrenia paranoidalna).
          </p>

          <p>
            Mamy więc sytuację kuriozalną: w Żyrardowie Paweł Perfect jest osobą ciężko chorą, którą należy leczyć, a w Środzie Śląskiej – według prok. Stypułkowskiej – jest zdrowym przestępcą, którego należy zamknąć w więzieniu, bez prawa do obrońcy.
          </p>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Prokurator we własnej sprawie</h2>

          <p>
            13 stycznia 2026 r. Paweł Perfect złożył zawiadomienie o przestępstwie popełnionym przez Alicję Stypułkowską. Pismo trafiło... na biurko Alicji Stypułkowskiej. Od blisko miesiąca szefowa prokuratury fizycznie blokuje przekazanie tych dokumentów do jednostki nadrzędnej.
          </p>

          <PullQuote
            quote="To jest prywata, a nie wymiar sprawiedliwości. Prokurator „aresztowała” dowody przeciwko sobie, licząc na to, że sprawa przycichnie."
            author="Paweł Perfect"
            source="Komentarz dla redakcji"
          />

          <p>
            Sprawa Pawła Perfecta przestała być już tylko historią jednego człowieka. Stała się testem dla polskiego wymiaru sprawiedliwości. Czy Prokuratura Krajowa pozwoli, by w Środzie Śląskiej funkcjonował &quot;układ zamknięty&quot;, w którym antydatuje się pisma i ukrywa dowody? Wyrok ze Świdnicy był pierwszym sygnałem, że parasol ochronny nad bezprawiem zaczyna pękać.
          </p>

          {/* --- SEKCJA: STATUS PRAWNY --- */}
          <div className="my-12 border-y-2 border-stone-900 py-8">
             <h3 className="font-sans font-bold text-lg uppercase tracking-widest text-stone-900 mb-8 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                Źródła Dokumentacji
             </h3>

             <div className="grid gap-px bg-stone-200 border border-stone-200">
                <div className="bg-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                   <div>
                      <span className="block font-serif text-stone-900 font-medium">Sprawa Odwoławcza</span>
                      <span className="block text-xs text-stone-500 mt-1">Sąd Okręgowy w Świdnicy</span>
                   </div>
                   <span className="font-mono text-xs font-bold bg-stone-100 px-3 py-1.5 border border-stone-300 text-stone-600 rounded-sm shadow-sm whitespace-nowrap">
                      IV Ka 123/25
                   </span>
                </div>

                <div className="bg-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                   <div>
                      <span className="block font-serif text-stone-900 font-medium">Sprawa I Instancji</span>
                      <span className="block text-xs text-stone-500 mt-1">Sąd Rejonowy w Dzierżoniowie</span>
                   </div>
                   <span className="font-mono text-xs font-bold bg-stone-100 px-3 py-1.5 border border-stone-300 text-stone-600 rounded-sm shadow-sm whitespace-nowrap">
                      II K 196/25
                   </span>
                </div>
             </div>

             <div className="mt-8 text-sm text-stone-600 font-sans text-center md:text-left">
                Artykuł powstał na podstawie dokumentów sądowych, nagrań z rozpraw oraz korespondencji urzędowej Prokuratury Rejonowej w Środzie Śląskiej.
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
