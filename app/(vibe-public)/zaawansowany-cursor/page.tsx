import { Terminal, Lightbulb, Zap, ShieldCheck } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Zaawansowany Cursor: Pro-tips i .cursorrules | Polutek.pl",
  description: "Opanuj edytor Cursor na poziomie eksperckim. Poznaj triki z @-symbols, pliki .cursorrules i zaawansowane techniki pracy z Composerem.",
  keywords: "zaawansowany cursor tutorial, cursor pro tips, .cursorrules przykład, cursor composer vs chat, programowanie intencyjne tutorial",
};

export default function AdvancedCursorPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Zaawansowany Cursor: Pro-tips, które zmienią Twój workflow</h1>
      <div className="prose prose-slate prose-lg max-w-none">
        <p className="lead text-xl text-slate-600 mb-8">
          Używasz Cursora tylko jako czatu? Tracisz 70% jego potencjału. Poznaj triki, których używają najlepsi Vibe Coderzy na świecie.
        </p>

        <h2 className="text-3xl font-bold mt-12 mb-6">1. Mistrzostwo @-Symbols</h2>
        <p>
          Kluczem do sukcesu w Cursorze jest podawanie odpowiedniego <strong>kontekstu</strong>. Zamiast pisać &quot;popraw ten plik&quot;, używaj symboli:
        </p>
        <ul className="space-y-4">
          <li><strong>@Files:</strong> Dodaj konkretne pliki do kontekstu.</li>
          <li><strong>@Codebase:</strong> Pozwól AI przeszukać całe repozytorium (RAG) w poszukiwaniu podobnych wzorców.</li>
          <li><strong>@Docs:</strong> Podepnij dokumentację zewnętrznych bibliotek (np. Tailwind, Stripe).</li>
          <li><strong>@Web:</strong> Pozwól modelowi sprawdzić najnowsze rozwiązania w sieci.</li>
        </ul>

        <h2 className="text-3xl font-bold mt-16 mb-6 flex items-center gap-3">
          <Terminal className="w-8 h-8 text-blue-600" /> 2. Composer (Cmd+I) vs Chat (Cmd+L)
        </h2>
        <p>
          Wielu użytkowników myli te dwie funkcje. <strong>Chat</strong> służy do zadawania pytań. <strong>Composer</strong> służy do <strong>budowania</strong>. Używaj Composera, gdy chcesz, aby AI wprowadziło zmiany w wielu plikach jednocześnie lub stworzyło całą strukturę folderów.
        </p>

        <div className="bg-slate-900 text-slate-100 p-8 rounded-2xl my-10 border border-slate-800 shadow-2xl">
          <h3 className="text-xl font-bold mb-4 text-blue-400">🔥 Pro-tip: .cursorrules</h3>
          <p className="mb-4">
            Stwórz w głównym folderze plik <code>.cursorrules</code>. Możesz tam wpisać globalne instrukcje dla AI, np.:
          </p>
          <pre className="bg-slate-800 p-4 rounded-lg text-sm overflow-x-auto">
{`"Zawsze używaj TypeScript i Tailwind CSS.
Nie twórz osobnych plików CSS.
Stosuj architekturę atomic components.
Wszystkie teksty pisz w języku polskim."`}
          </pre>
          <p className="mt-4 text-sm text-slate-400">To sprawi, że AI nie będzie za każdym razem pytać o Twój stack technologiczny.</p>
        </div>

        <h2 className="text-3xl font-bold mt-16 mb-6">3. Multi-file Edits i Iteracje</h2>
        <p>
          Nie bój się prosić o refaktoryzację całego modułu. Jeśli Cursor zrobi błąd, nie poprawiaj go ręcznie. Napisz w chat: &quot;Wystąpił błąd X w linii Y, popraw to biorąc pod uwagę logikę z pliku @Auth.ts&quot;.
        </p>

        <div className="grid md:grid-cols-2 gap-8 my-12">
          <div className="border border-slate-200 p-6 rounded-xl">
             <h4 className="font-bold flex items-center gap-2 mb-2"><Zap className="w-5 h-5 text-yellow-500" /> Szybkie poprawki</h4>
             <p className="text-sm">Używaj Cmd+K bezpośrednio w kodzie, aby AI zmieniło zaznaczony fragment bez otwierania panelu bocznego.</p>
          </div>
          <div className="border border-slate-200 p-6 rounded-xl">
             <h4 className="font-bold flex items-center gap-2 mb-2"><ShieldCheck className="w-5 h-5 text-emerald-500" /> Sprawdzanie błędów</h4>
             <p className="text-sm">Po każdej większej zmianie kliknij &quot;Terminal&quot; i poproś Cursora o naprawienie błędów lintera.</p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mt-16 mb-6">Podsumowanie</h2>
        <p>
          Cursor to nie tylko edytor tekstu, to Twój partner w programowaniu. Im lepiej nauczysz się zarządzać jego kontekstem (@), tym mniej będziesz musiał sam pisać kodu.
        </p>
      </div>
    </section>
  );
}
