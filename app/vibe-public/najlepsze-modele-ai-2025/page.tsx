import { Cpu, Brain, Zap } from 'lucide-react';

export default function ModelsPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Ranking Modeli AI dla Programistów 2025: Co wybrać do Vibe Codingu?</h1>
      <div className="prose prose-slate prose-lg max-w-none">
        <p className="lead text-xl text-slate-600 mb-8">
          Nie wszystkie modele są sobie równe. Do programowania potrzebujemy logicznego myślenia, precyzji i dużego okna kontekstowego.
        </p>

        <div className="space-y-12">
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm border-l-8 border-l-orange-500">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
              1. Claude 3.5 Sonnet (Anthropic)
            </h2>
            <div className="text-sm uppercase font-bold text-orange-600 mb-4 tracking-wider">Król Programowania</div>
            <p>
              Obecnie absolutny lider. Claude 3.5 Sonnet najlepiej radzi sobie z architekturą, rzadziej halucynuje i pisze kod, który po prostu działa. Jest standardem w edytorze Cursor.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm border-l-8 border-l-blue-600">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
              2. GPT-4o (OpenAI)
            </h2>
            <div className="text-sm uppercase font-bold text-blue-600 mb-4 tracking-wider">Wszechstronny Klasyk</div>
            <p>
              Nadal bardzo mocny, świetny do szybkich skryptów i wyjaśniania skomplikowanych pojęć. GPT-4o jest nieco bardziej &quot;leniwy&quot; niż Claude, ale nadal stanowi ścisłą czołówkę.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm border-l-8 border-l-purple-500">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
              3. DeepSeek Coder V2
            </h2>
            <div className="text-sm uppercase font-bold text-purple-600 mb-4 tracking-wider">Mistrz Open Source</div>
            <p>
              Zaskakująco dobry model z Chin, który w testach programistycznych depcze po piętach gigantom z USA. Świetna alternatywa dla osób szukających darmowych rozwiązań lub self-hostingu.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mt-16 mb-6">Wniosek</h2>
        <p>
          Jeśli Twoim celem jest maksymalna wydajność, używaj <strong>Claude 3.5 Sonnet</strong>. To model, który najlepiej &quot;czuje vibe&quot; nowoczesnego software engineeringu.
        </p>
      </div>
    </section>
  );
}
