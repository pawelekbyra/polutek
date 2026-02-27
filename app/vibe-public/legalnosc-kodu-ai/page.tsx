import { ShieldCheck, Scale, AlertTriangle } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Czy kod z AI jest Twój? Prawo i Własność Autorska | Polutek.pl",
  description: "Analiza prawna kodowania z AI. Kto posiada prawa autorskie do kodu z Claude i GPT-4o? Poznaj ryzyka licencyjne i zasady bezpieczeństwa prawnego.",
  keywords: "prawa autorskie kod ai, własność intelektualna ai, czy kod z ai jest legalny, licencja gpl ai, legalność vibe codingu",
};

export default function LegalPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Czy kod z AI jest Twój? Aspekty Prawne Vibe Codingu</h1>
      <div className="prose prose-slate prose-lg max-w-none">
        <p className="lead text-xl text-slate-600 mb-8">
          Kto posiada prawa autorskie do kodu wygenerowanego przez Claude? Czy możesz go opatentować? Odpowiadamy na najważniejsze pytania prawne AD 2025.
        </p>

        <h2 className="text-3xl font-bold mt-12 mb-6">Własność intelektualna (IP)</h2>
        <p>
          Obecne orzecznictwo w większości jurysdykcji (w tym w USA i UE) sugeruje, że <strong>sam kod wygenerowany w 100% przez AI nie podlega ochronie prawem autorskim</strong>, ponieważ brakuje w nim &quot;ludzkiego pierwiastka twórczego&quot;.
        </p>

        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-10">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-8 h-8 text-amber-500" />
            <h3 className="text-xl font-bold text-amber-900 m-0">Kluczowy niuans</h3>
          </div>
          <p className="text-amber-800 m-0">
            Sytuacja zmienia się, gdy programista (Vibe Coder) aktywnie modyfikuje, strukturyzuje i łączy fragmenty kodu. Wtedy całość projektu jako utwór zbiorowy może podlegać ochronie.
          </p>
        </div>

        <h2 className="text-3xl font-bold mt-16 mb-6">Regulaminy Narzędzi</h2>
        <p>
          Większość dostawców (Anthropic, OpenAI, Cursor) jasno deklaruje w swoich regulaminach: <strong>Wszystko, co wygenerujesz przy użyciu naszych modeli, należy do Ciebie (User Content Ownership).</strong>
        </p>

        <div className="grid md:grid-cols-2 gap-8 my-12">
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
            <h4 className="font-bold mb-3 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-emerald-600" /> Co jest bezpieczne?</h4>
            <ul className="text-sm space-y-2 text-slate-600">
              <li>- Używanie AI do refaktoryzacji</li>
              <li>- Generowanie standardowych funkcji</li>
              <li>- Budowanie MVP na własny użytek</li>
            </ul>
          </div>
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
            <h4 className="font-bold mb-3 flex items-center gap-2"><Scale className="w-5 h-5 text-blue-600" /> Co jest ryzykowne?</h4>
            <ul className="text-sm space-y-2 text-slate-600">
              <li>- Kopiowanie chronionych algorytmów</li>
              <li>- Brak audytu licencji bibliotek</li>
              <li>- Wklejanie poufnego kodu firmy do chatu</li>
            </ul>
          </div>
        </div>

        <h2 className="text-3xl font-bold mt-16 mb-6 text-red-700">Ryzyko &quot;Zatrucia&quot; Licencyjnego</h2>
        <p>
          Największym zagrożeniem nie jest brak własności, ale sytuacja, w której AI sugeruje fragment kodu objęty licencją <strong>GPL</strong> (copyleft) w Twoim komercyjnym projekcie <strong>closed-source</strong>. Zawsze używaj narzędzi do skanowania licencji przed publikacją kodu.
        </p>

        <h2 className="text-3xl font-bold mt-16 mb-6">Podsumowanie</h2>
        <p>
          Vibe coding to prawnie nowa ziemia. Choć modele dają Ci prawo do wyników, ochrona tych wyników jako Twojej własności intelektualnej wymaga Twojego aktywnego udziału w procesie tworzenia.
        </p>
      </div>
    </section>
  );
}
