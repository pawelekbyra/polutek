import SchemaMarkup from '@/app/components/SchemaMarkup';
import { MousePointer2, Keyboard, Scale } from 'lucide-react';

export const metadata = {
  title: "Vibe Coding vs No-Code: Dlaczego to nie to samo? | Polutek.pl",
  description: "Porównanie programowania intencyjnego z platformami typu Bubble czy Webflow. Wybierz odpowiedni stack.",
};

export default function NoCodePage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <SchemaMarkup
        type="Article"
        headline={metadata.title}
        description={metadata.description}
        author="Detektyw Polutek"
        datePublished="2025-02-21"
      />
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Vibe Coding vs No-Code</h1>
      <div className="prose prose-slate prose-lg max-w-none">
        <p className="lead text-xl text-slate-600 mb-12">
          Narzędzia no-code obiecywały rewolucję, ale Vibe Coding dostarcza coś znacznie potężniejszego: pełną kontrolę przy prędkości no-code.
        </p>

        <div className="grid md:grid-cols-2 gap-12 my-12">
           <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                 <MousePointer2 className="w-6 h-6 text-blue-500" /> No-Code
              </h3>
              <p className="text-sm mb-6">Bubble, Webflow, Glide</p>
              <ul className="space-y-3 text-sm text-slate-600">
                 <li>- Zamknięty ekosystem</li>
                 <li>- Trudne skalowanie logiki</li>
                 <li>- Problem z wyjściem poza platformę</li>
                 <li>- Brak dostępu do kodu źródłowego</li>
              </ul>
           </div>
           <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-blue-700">
                 <Keyboard className="w-6 h-6 text-blue-600" /> Vibe Coding
              </h3>
              <p className="text-sm mb-6">Cursor, Claude, Next.js</p>
              <ul className="space-y-3 text-sm text-blue-900/70">
                 <li>- Prawdziwy, otwarty kod</li>
                 <li>- Dowolna biblioteka i baza danych</li>
                 <li>- Pełna swoboda w architekturze</li>
                 <li>- Standardowy workflow (Git, CI/CD)</li>
              </ul>
           </div>
        </div>

        <h2 className="text-3xl font-bold mt-16 mb-6 flex items-center gap-3">
          <Scale className="w-8 h-8 text-blue-600" /> Werdykt
        </h2>
        <p>
          Jeśli budujesz prosty landing page - no-code wystarczy. Jeśli budujesz <strong>produkt</strong>, który ma rosnąć - Vibe Coding to jedyny słuszny wybór w 2025 roku.
        </p>
      </div>
    </section>
  );
}
