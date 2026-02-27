import VibeRoadmap from '@/app/components/VibeRoadmap';
import VibeChecklist from '@/app/components/VibeChecklist';
import SchemaMarkup from '@/app/components/SchemaMarkup';

export const metadata = {
  title: "Roadmapa Vibe Codingu: Od Juniora do AI Architecta | Polutek.pl",
  description: "Interaktywna ścieżka nauki programowania intencyjnego. Dowiedz się czego się uczyć w erze AI Software Engineering.",
};

export default function RoadmapPage() {
  return (
    <main className="bg-slate-50 min-h-screen">
      <SchemaMarkup
        type="Article"
        headline={metadata.title}
        description={metadata.description}
        author="Detektyw Polutek"
        datePublished="2025-02-21"
      />
      <section className="bg-blue-600 py-24 px-4 text-center text-white overflow-hidden relative">
         <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none select-none">
            <div className="grid grid-cols-12 gap-4 rotate-12 scale-150">
               {Array.from({length: 48}).map((_, i) => (
                 <div key={i} className="h-20 border border-white rounded-lg" />
               ))}
            </div>
         </div>
         <h1 className="text-5xl md:text-7xl font-black mb-6 relative z-10 tracking-tighter">ROADMAPA 2025</h1>
         <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto relative z-10">
            Przestań gonić frameworki. Zacznij gonić wizję. Oto kompletny przewodnik po nowym paradygmacie.
         </p>
      </section>

      <VibeRoadmap />
      <VibeChecklist />

      <section className="max-w-4xl mx-auto pb-32 px-4 text-center">
         <div className="bg-white p-12 rounded-[3rem] border border-slate-200 shadow-xl">
            <h2 className="text-3xl font-bold mb-6">Dlaczego ta roadmapa jest inna?</h2>
            <p className="text-slate-600 leading-relaxed mb-8">
               Tradycyjne roadmapy skupiają się na narzędziach (React, Node, SQL). Nasza roadmapa skupia się na <strong>procesach myślowych</strong> i <strong>współpracy z AI</strong>. To tutaj leży przewaga konkurencyjna w 2025 roku.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <div className="px-6 py-3 bg-slate-100 rounded-full text-slate-700 font-bold">100% Darmowa</div>
               <div className="px-6 py-3 bg-slate-100 rounded-full text-slate-700 font-bold">Aktualizowana co tydzień</div>
               <div className="px-6 py-3 bg-slate-100 rounded-full text-slate-700 font-bold">Zgodna z wizją Karpathy&apos;ego</div>
            </div>
         </div>
      </section>
    </main>
  );
}
