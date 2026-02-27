import { ChevronRight } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Czym jest Vibe Coding? Definicja i Manifest | Polutek.pl",
  description: "Poznaj definicję Vibe Codingu ukutą przez Andreja Karpathy'ego. Dowiedz się na czym polega programowanie intencyjne i jak AI zmienia rolę programisty.",
  keywords: "co to jest vibe coding, definicja vibe coding, programowanie intencyjne, andrej karpathy, ai software engineering",
};

export default function DefinitionPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Czym jest Vibe Coding?</h1>
      <div className="prose prose-slate prose-lg max-w-none">
        <p className="lead text-xl text-slate-600 mb-8">
          Vibe coding to termin ukuty przez <strong>Andrej Karpathy&apos;ego</strong> (współzałożyciela OpenAI), opisujący nowy paradygmat tworzenia oprogramowania.
        </p>
        <div className="bg-slate-900 text-slate-100 p-8 rounded-2xl mb-10 shadow-xl border border-slate-800">
          <p className="italic text-lg">
            &quot;Vibe coding to sytuacja, w której nie piszesz już kodu linijka po linijce. Zamiast tego utrzymujesz &apos;vibe&apos; (klimat/intencję) projektu, a AI wypełnia szczegóły implementacyjne.&quot;
          </p>
        </div>
        <p className="mb-6">
          W tradycyjnym programowaniu programista spędza 90% czasu na pisaniu składni i debugowaniu. W Vibe Codingu, rola człowieka przesuwa się w stronę <strong>Produkt Managera i Architekta</strong>.
        </p>

        <h2 className="text-3xl font-bold mt-16 mb-6">Filary Programowania Intencyjnego</h2>
        <p>
          W 2025 roku sposób w jaki tworzymy software przeszedł rewolucję. Już nie musimy znać na pamięć każdego API czy biblioteki. To co się liczy, to umiejętność przekazania &quot;vibu&quot; projektu modelowi językowemu.
        </p>

        <ul className="space-y-4 my-10">
          <li className="flex gap-3">
            <ChevronRight className="w-5 h-5 text-blue-600 shrink-0" />
            <span><strong>Programowanie intencyjne:</strong> Skupiasz się na tym *co* chcesz zbudować, a nie *jak*. Model AI rozumie Twoje intencje i proponuje rozwiązania.</span>
          </li>
          <li className="flex gap-3">
            <ChevronRight className="w-5 h-5 text-blue-600 shrink-0" />
            <span><strong>Pętle zwrotne AI:</strong> Ciągła interakcja z modelem, który generuje, testuje i poprawia kod na Twoich oczach. To dynamiczny proces współtworzenia.</span>
          </li>
          <li className="flex gap-3">
            <ChevronRight className="w-5 h-5 text-blue-600 shrink-0" />
            <span><strong>Abstrakcja składni:</strong> Język programowania staje się detalem implementacyjnym. Możesz zacząć projekt w React, a AI przeniesie go do innego frameworka w kilka minut.</span>
          </li>
        </ul>

        <h2 className="text-3xl font-bold mt-16 mb-6">Dlaczego to zmienia wszystko?</h2>
        <p>
          Vibe coding obniża barierę wejścia do świata IT, ale jednocześnie podnosi poprzeczkę dla doświadczonych inżynierów. Teraz nie wystarczy &quot;umieć pisać w Javie&quot;. Trzeba umieć projektować systemy, rozumieć potrzeby użytkownika i potrafić &quot;rozmawiać&quot; z AI tak, aby uzyskać optymalne rezultaty.
        </p>
      </div>
    </section>
  );
}
