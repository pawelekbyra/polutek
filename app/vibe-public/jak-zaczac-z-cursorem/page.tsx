import SchemaMarkup from '@/app/components/SchemaMarkup';
import { Download, Keyboard, Terminal, Play } from 'lucide-react';

export const metadata = {
  title: "Jak zacząć z Cursorem? Kompletny Poradnik 2025 | Polutek.pl",
  description: "Pierwsze kroki w najlepszym edytorze AI. Konfiguracja, skróty klawiszowe i pierwsze projekty w świecie Vibe Codingu.",
};

export default function CursorStartPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <SchemaMarkup
        type="Article"
        headline={metadata.title}
        description={metadata.description}
        author="Detektyw Polutek"
        datePublished="2025-02-21"
      />
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Jak zacząć z Cursorem?</h1>
      <div className="prose prose-slate prose-lg max-w-none">
        <p className="lead text-xl text-slate-600 mb-8">
          Cursor to nie jest zwykły edytor kodu. To pierwszy na świecie model AI, który &quot;mieszka&quot; wewnątrz Twojego IDE. Oto jak go skonfigurować, by wycisnąć z niego 100%.
        </p>

        <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
          <Download className="w-8 h-8 text-blue-600" /> Krok 1: Instalacja i Import
        </h2>
        <p>
          Pobierz edytor ze strony <code>cursor.com</code>. Jeśli używasz VS Code, będziesz mógł zaimportować wszystkie swoje rozszerzenia, motywy i skróty klawiszowe za pomocą jednego kliknięcia. To sprawia, że przejście jest niemal niezauważalne.
        </p>

        <h2 className="text-3xl font-bold mt-16 mb-6 flex items-center gap-3">
          <Keyboard className="w-8 h-8 text-blue-600" /> Krok 2: Skróty, które musisz znać
        </h2>
        <div className="grid sm:grid-cols-2 gap-6 my-8">
           <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="font-mono text-blue-700 font-bold mb-2">Cmd + K (Ctrl + K)</div>
              <p className="text-sm">Edytuj zaznaczony kod lub wygeneruj nowy fragment w miejscu kursora.</p>
           </div>
           <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="font-mono text-blue-700 font-bold mb-2">Cmd + L (Ctrl + L)</div>
              <p className="text-sm">Otwórz chat i zadawaj pytania dotyczące całego projektu.</p>
           </div>
           <div className="bg-blue-600 p-6 rounded-2xl text-white sm:col-span-2 shadow-lg">
              <div className="font-mono font-bold mb-2 flex items-center gap-2">
                <Terminal className="w-5 h-5" /> Cmd + I (Ctrl + I) - COMPOSER
              </div>
              <p className="text-sm opacity-90">To tu dzieje się magia Vibe Codingu. Poproś AI o zmiany w wielu plikach jednocześnie.</p>
           </div>
        </div>

        <h2 className="text-3xl font-bold mt-16 mb-6 flex items-center gap-3">
          <Play className="w-8 h-8 text-blue-600" /> Krok 3: Pierwszy projekt
        </h2>
        <p>
          Najlepiej zacząć od poproszenia Cursora o stworzenie czegoś od zera. Otwórz pusty folder, naciśnij <code>Cmd + I</code> i wpisz: <em>&quot;Stwórz prostą landing page w Next.js i Tailwind CSS z ciemnym motywem i formularzem kontaktowym.&quot;</em> Obserwuj, jak AI tworzy strukturę plików za Ciebie.
        </p>

        <div className="bg-amber-50 p-8 rounded-3xl border border-amber-100 my-12">
           <h3 className="text-xl font-bold mb-4 text-amber-900">🔥 Pro-tip na start</h3>
           <p className="text-amber-800 m-0">Zawsze miej włączony tryb &quot;Codebase Indexing&quot; w ustawieniach Cursora. Dzięki temu AI będzie wiedziało o istnieniu każdego pliku w Twoim projekcie.</p>
        </div>
      </div>
    </section>
  );
}
