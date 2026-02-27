import { ArrowRight } from 'lucide-react';

export default function ToolsPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">Narzędzia Ery Vibe Coding 2025</h1>
      <p className="text-xl text-slate-600 text-center max-w-3xl mx-auto mb-16">
        Wybór odpowiedniego stacku narzędziowego jest kluczowy dla efektywnego Vibe Codingu. Oto zestawienie liderów rynku.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ToolCard
          name="Cursor"
          desc="Obecnie najlepsze IDE do Vibe Codingu. Fork VS Code, który posiada natywne funkcje AI, takie jak Composer i zaawansowane autouzupełnianie całych bloków kodu."
          tag="Najlepszy Wybór"
        />
        <ToolCard
          name="Claude 3.5 Sonnet"
          desc="Model od Anthropic, który stał się standardem branżowym dzięki niesamowitej zdolności rozumowania, braku halucynacji i pisaniu czystego, modularnego kodu."
          tag="Mózg Operacji"
        />
        <ToolCard
          name="Bolt.new / Lovable"
          desc="Platformy 'full-stack in a box'. Pozwalają na generowanie, edycję i deploy całych aplikacji webowych z jednego promptu bezpośrednio w przeglądarce."
          tag="Web Apps"
        />
        <ToolCard
          name="Replit Agent"
          desc="Agent, który nie tylko pisze kod, ale sam konfiguruje środowisko, instaluje paczki, ustawia bazę danych i deployuje aplikację pod klucz."
          tag="Automatyzacja"
        />
        <ToolCard
          name="GitHub Copilot Workspace"
          desc="Ewolucja Copilota w stronę agentyczną. Pozwala na planowanie zmian w całym repozytorium na podstawie Issue."
          tag="Enterprise"
        />
        <ToolCard
          name="v0.dev"
          desc="Narzędzie od Vercel, które redefiniuje tworzenie frontendów. Generuje profesjonalne UI przy użyciu React, Tailwind i shadcn/ui w kilka sekund."
          tag="Frontend"
        />
      </div>

      <div className="mt-24 p-10 bg-white rounded-3xl border border-slate-200">
        <h2 className="text-3xl font-bold mb-6">Jak wybrać narzędzie?</h2>
        <div className="prose prose-slate max-w-none">
          <p>
            Jeśli jesteś profesjonalnym programistą, Twoim głównym narzędziem powinien być <strong>Cursor</strong>. Jego integracja z lokalnym kontekstem plików (RAG) nie ma sobie równych.
          </p>
          <p>
            Dla osób budujących szybkie prototypy (MVP) lub nieposiadających głębokiej wiedzy technicznej, najlepszym startem będą <strong>Bolt.new</strong> lub <strong>Lovable.dev</strong>. Te narzędzia eliminują barierę konfiguracji środowiska lokalnego.
          </p>
        </div>
      </div>
    </section>
  );
}

function ToolCard({ name, desc, tag }: { name: string, desc: string, tag: string }) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
      <div className="inline-block px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase rounded mb-4">
        {tag}
      </div>
      <h3 className="text-xl font-bold mb-4 flex items-center justify-between">
        {name} <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
      </h3>
      <p className="text-slate-600 text-sm leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
