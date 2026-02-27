import SchemaMarkup from '@/app/components/SchemaMarkup';
import { Chrome, Bot, Zap, Globe } from 'lucide-react';

export const metadata = {
  title: "Case Study: Rozszerzenie Chrome z AI w 45 minut | Polutek.pl",
  description: "Dowiedz się jak zbudowaliśmy wtyczkę do przeglądarki podsumowującą artykuły przy użyciu API Claude. Praktyczny przykład Vibe Codingu.",
};

export default function ChromeExtensionCaseStudy() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-20">
      <SchemaMarkup
        type="Article"
        headline={metadata.title}
        description={metadata.description}
        author="Detektyw Polutek"
        datePublished="2025-02-27"
      />
      <div className="text-center mb-16">
         <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 rounded-full font-black text-xs uppercase tracking-widest mb-6 border border-orange-100">
            <Chrome className="w-4 h-4" /> Case Study #02
         </div>
         <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-[1.1]">Wtyczka AI w 45 minut</h1>
         <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">Jak w ułamku godziny stworzyć produkt gotowy do sklepu Chrome Web Store.</p>
      </div>

      <div className="prose prose-slate prose-lg max-w-none">
        <h2 className="text-3xl font-bold mt-12 mb-6">Pomysł</h2>
        <p>
          Użytkownik chce móc jednym kliknięciem uzyskać podsumowanie (TL;DR) dowolnego długiego artykułu w sieci, bez kopiowania tekstu do chatu AI.
        </p>

        <h2 className="text-3xl font-bold mt-16 mb-6 flex items-center gap-3">
          <Bot className="w-8 h-8 text-blue-600" /> Rola AI
        </h2>
        <p>
          Zamiast czytać skomplikowaną dokumentację `manifest.json` i `content scripts`, poprosiliśmy Cursora: &quot;Zbuduj szkielet rozszerzenia Chrome v3. Po kliknięciu w ikonę, pobierz tekst strony i wyślij go do mojego lokalnego endpointu AI w celu podsumowania.&quot;
        </p>

        <div className="bg-slate-900 text-white p-10 rounded-[3rem] my-12 shadow-2xl overflow-hidden relative">
           <div className="flex gap-8 items-center">
              <div className="bg-orange-500 p-4 rounded-2xl"><Zap className="w-12 h-12 text-white" /></div>
              <div>
                 <h3 className="text-2xl font-bold mb-2">Wynik:</h3>
                 <p className="opacity-80 text-sm mb-0">W 45 minut mieliśmy działającą wtyczkę z eleganckim popupem, obsługą błędów i integracją z API Claude. To pokazuje, że bariera tworzenia narzędzi narzędziowych (tooling) przestała istnieć.</p>
              </div>
           </div>
        </div>

        <h2 className="text-3xl font-bold mt-16 mb-6">Wniosek</h2>
        <p>
          Vibe coding pozwala na &quot;mikro-produkty&quot;. Nie musisz już planować projektu na miesiące. Jeśli masz pomysł na drobną optymalizację swojej pracy - po prostu ją wypropmtuj.
        </p>
      </div>
    </article>
  );
}
