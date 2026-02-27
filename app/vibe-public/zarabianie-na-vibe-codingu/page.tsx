import { Banknote, TrendingUp, Lightbulb } from 'lucide-react';

export default function MonetizationPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Jak zarabiać na Vibe Codingu? 5 pomysłów na biznes w 2025</h1>
      <div className="prose prose-slate prose-lg max-w-none">
        <p className="lead text-xl text-slate-600 mb-8">
          Sama umiejętność używania AI to za mało. Prawdziwe pieniądze leżą tam, gdzie łączysz technologię z realną potrzebą rynkową.
        </p>

        <div className="space-y-12">
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Banknote className="text-emerald-600" /> 1. Agencja Micro-SaaS
            </h2>
            <p>
              Zamiast budować jeden wielki system, buduj 10 małych narzędzi rozwiązujących konkretne problemy (np. wtyczka do Shopify, generator faktur dla specyficznej branży). Dzięki Vibe Codingowi możesz wypuszczać nowy produkt co tydzień.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <TrendingUp className="text-blue-600" /> 2. Konsulting AI Workflow
            </h2>
            <p>
              Większość firm nie wie, jak używać AI w programowaniu. Możesz sprzedawać audyty i wdrożenia narzędzi takich jak Cursor czy GitHub Copilot w zespołach developerskich, drastycznie podnosząc ich wydajność.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Lightbulb className="text-amber-600" /> 3. Budowa MVP dla Founderów
            </h2>
            <p>
              Nietechniczni założyciele potrzebują działającego prototypu, by zebrać finansowanie. Możesz oferować budowę MVP w 48 godzin za ułamek ceny tradycyjnego software house&apos;u.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mt-16 mb-6">Podsumowanie</h2>
        <p>
          Vibe coding to Twoja przewaga konkurencyjna. Podczas gdy inni wyceniają projekt na 3 miesiące, Ty możesz go dowieźć w 3 dni. To jest marża, którą zatrzymujesz dla siebie.
        </p>
      </div>
    </section>
  );
}
