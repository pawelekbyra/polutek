import SchemaMarkup from '@/app/components/SchemaMarkup';
import { Sparkles, MessageSquare, Code2, Repeat } from 'lucide-react';

export const metadata = {
  title: "Biblioteka Promptów Vibe Coding: Gotowce do Cursora | Polutek.pl",
  description: "Zbiór sprawdzonych promptów, które przyspieszają pisanie kodu, refaktoryzację i testowanie w edytorze Cursor.",
};

export default function PromptsPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <SchemaMarkup
        type="Article"
        headline={metadata.title}
        description={metadata.description}
        author="Detektyw Polutek"
        datePublished="2025-02-21"
      />
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Biblioteka Promptów</h1>
      <div className="prose prose-slate prose-lg max-w-none">
        <p className="lead text-xl text-slate-600 mb-12">
          Jakość Twojego kodu zależy od jakości Twoich instrukcji. Oto zestaw gotowych promptów, które zawsze dają dobre rezultaty w Cursorze i Claude 3.5 Sonnet.
        </p>

        <div className="space-y-12">
           <PromptCard
             title="Nowa Funkcjonalność"
             icon={<Sparkles className="w-6 h-6 text-yellow-500" />}
             prompt="Zaimplementuj komponent [NAZWA] używając shadcn/ui. Ma on pobierać dane z endpointu /api/[X] i wyświetlać je w formie responsywnej karty. Pamiętaj o obsłudze stanów loading i error."
           />
           <PromptCard
             title="Refaktoryzacja"
             icon={<Repeat className="w-6 h-6 text-blue-500" />}
             prompt="Przeanalizuj ten plik i wyciągnij powtarzającą się logikę do osobnych, czystych funkcji (pure functions). Zastosuj zasady DRY i popraw czytelność typów TypeScript."
           />
           <PromptCard
             title="Debugowanie"
             icon={<MessageSquare className="w-6 h-6 text-red-500" />}
             prompt="Dlaczego ten komponent rerenderuje się 5 razy przy kliknięciu w przycisk? Sprawdź zależności w useEffect i zaproponuj optymalizację przy użyciu memo lub useMemo."
           />
           <PromptCard
             title="Pisanie Testów"
             icon={<Code2 className="w-6 h-6 text-emerald-500" />}
             prompt="Napisz kompletny zestaw testów jednostkowych w Vitest dla tej funkcji. Pokryj przypadki brzegowe, błędne dane wejściowe oraz standardowy happy path."
           />
        </div>

        <h2 className="text-3xl font-bold mt-16 mb-6">Jak budować własne prompty?</h2>
        <p>
          Stosuj zasadę <strong>C-O-I</strong>:
        </p>
        <ul className="space-y-2">
          <li>- <strong>Kontekst:</strong> @Files, @Codebase (co AI ma widzieć)</li>
          <li>- <strong>Obiekt:</strong> Co dokładnie ma być stworzone (komponent, test, schema)</li>
          <li>- <strong>Instrukcja:</strong> Jakie standardy mają być zachowane (Tailwind, TypeScript, Clean Code)</li>
        </ul>
      </div>
    </section>
  );
}

function PromptCard({ title, icon, prompt }: any) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm group hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      </div>
      <div className="bg-slate-900 rounded-2xl p-6 relative group/code">
         <p className="text-blue-300 font-mono text-sm leading-relaxed">&quot;{prompt}&quot;</p>
         <button className="absolute top-4 right-4 text-xs text-white/50 hover:text-white transition-colors bg-white/10 px-3 py-1 rounded-lg">Kopiuj</button>
      </div>
    </div>
  );
}
