"use client";

import React from 'react';
import { Search, FileText, Globe, Wind, Star, Heart } from 'lucide-react';

export default function FakeArticle() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#1a1a1a] selection:bg-yellow-200/50 font-serif flex flex-col">
      <header className="pt-20 pb-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-3 py-1 border border-stone-900 text-[10px] font-sans font-bold tracking-[0.2em] uppercase">
            www.eliksir-wiedzmina.pl
          </div>

          <h1 className="mb-8 text-stone-900">
            <span className="block text-4xl md:text-6xl font-bold leading-tight tracking-tight">
              Michał Kiciński i Ayahuasca: Duchowa podróż twórcy potęgi CD Projekt
            </span>
          </h1>
        </div>
      </header>

      <article className="max-w-2xl mx-auto px-4 pt-8 pb-16 flex-grow">
        <div className="prose prose-stone prose-lg max-w-none prose-headings:font-sans prose-headings:font-bold prose-blockquote:not-italic
          prose-a:text-stone-900 prose-a:font-bold prose-a:no-underline prose-a:underline prose-a:decoration-double prose-a:decoration-stone-400 hover:prose-a:bg-stone-100 transition-colors">

          <p className="first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-stone-900 leading-relaxed">
            W świecie globalnego sukcesu gier z serii <strong>Wiedźmin</strong>, nazwisko <strong>Michał Kiciński</strong> stało się synonimem wizjonerstwa i gigantycznych pieniędzy. Jednak za fasadą miliardera kryje się człowiek, który w pewnym momencie swojej kariery musiał zmierzyć się z ekstremalnym stresem, wypaleniem zawodowym i głęboką depresją. Ratunku szukał nie w korporacyjnych gabinetach, lecz w amazońskiej dżungli i peruwiańskiej &quot;medycynie&quot; znanej jako <strong>Ayahuasca</strong>.
          </p>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">
            Burnout w blasku sukcesu CD Projekt
          </h2>

          <p>
            Michał Kiciński, współzałożyciel <strong>CD Projekt</strong>, wielokrotnie w wywiadach (m.in. dla Focus.pl i Newsweeka) przyznawał, że cena sukcesu była ogromna. Jako dwudziestoparolatek oddał się biznesowi bez reszty, co doprowadziło go do stanu &quot;samospalenia&quot;. Chroniczne dolegliwości, problemy zdrowotne i osłabienie zmusiły go do poszukiwania odpowiedzi na najważniejsze pytania: kim jest i po co tu jesteśmy?
          </p>

          <blockquote className="border-l-4 border-stone-900 pl-6 italic text-xl my-10">
            &quot;Ayahuasca pokazała mi mnóstwo schowanych w mojej osobowości wad, kompleksów i dała lekcje na następne lata życia.&quot;
          </blockquote>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">
            Spotkanie z szamanami i peruwiańska medycyna
          </h2>

          <p>
            Pierwsze spotkanie z <strong>Ayahuascą</strong> – naparem z amazońskich roślin o silnym działaniu psychodelicznym zawierającym <strong>DMT</strong> – miało miejsce podczas podróży do przyjaciółki w Tajlandii, która była związana z szamanem. Mimo początkowych wątpliwości, Kiciński zdecydował się na rytuał, który stał się dla niego jedną z najważniejszych lekcji pokory. Jak sam twierdzi, Ayahuasca to &quot;inteligentna roślina&quot;, która pomaga zrozumieć głębokie przyczyny życiowych trudności i ułożyć relacje z innymi.
          </p>

          <h3 className="text-2xl mt-12 mb-6 tracking-tight text-stone-900">
            Munay Sonqo i ośrodki rozwoju
          </h3>

          <p>
            Fascynacja rozwojem duchowym i medycyną naturalną skłoniła miliardera do inwestycji w miejsca sprzyjające zdrowiu psychicznemu. Michał Kiciński jest właścicielem luksusowego ośrodka <strong>Munay Sonqo</strong> w Peru, położonego w Świętej Dolinie Inków. To tam, z dala od cywilizacji, goście mogą uczestniczyć w warsztatach jogi, medytacji i pracy z &quot;medycyną&quot;. W Polsce Kiciński angażuje się w projekty takie jak Fort Traugutta czy Strefa Rozwoju, promując holistyczne podejście do życia.
          </p>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">
            Medytacja Vipassana i świadome życie
          </h2>

          <p>
            Poza pracą z <strong>psychodelikami</strong>, kluczowym elementem życia Kicińskiego jest <strong>medytacja Vipassana</strong>. Dziesięciodniowe kursy w Indiach pozwoliły mu dotrzeć do rdzenia własnego smutku i depresji. Dla twórcy <strong>Wiedźmina</strong>, medytacja i Ayahuasca to narzędzia poszerzania świadomości, które – choć wymagają uziemienia i ostrożności – pozwalają spojrzeć na rzeczywistość z wielu perspektyw.
          </p>

          <div className="mt-16 mb-4 flex justify-end">
            <div className="text-right border-t border-stone-200 pt-8 w-full">
              <p className="text-sm text-stone-500 font-sans italic">
                Opracowano na podstawie publicznych wywiadów i działalności społecznej Michała Kicińskiego.
              </p>
            </div>
          </div>
        </div>
      </article>

      <footer className="bg-stone-100 py-12 px-4 border-t border-stone-200">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs text-stone-500 font-mono uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
            <Search className="w-4 h-4" />
            Baza Wiedzy: Rozwój i Świadomość
          </p>
          <div className="flex justify-center gap-6">
            <div className="flex items-center gap-1 text-stone-400">
              <Wind className="w-4 h-4" />
              <span className="text-[10px] uppercase font-bold tracking-tighter">Medytacja</span>
            </div>
            <div className="flex items-center gap-1 text-stone-400">
              <Star className="w-4 h-4" />
              <span className="text-[10px] uppercase font-bold tracking-tighter">Ayahuasca</span>
            </div>
            <div className="flex items-center gap-1 text-stone-400">
              <Heart className="w-4 h-4" />
              <span className="text-[10px] uppercase font-bold tracking-tighter">Zdrowie</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
