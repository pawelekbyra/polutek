import SchemaMarkup from '@/app/components/SchemaMarkup';
import { LayoutDashboard, Target, Zap, CheckCircle } from 'lucide-react';

export const metadata = {
  title: "Case Study: Dashboard MVP w 2 godziny | Polutek.pl",
  description: "Zobacz jak krok po kroku zbudowaliśmy profesjonalny dashboard analityczny z autentykacją i bazą danych w rekordowym czasie.",
};

export default function CaseStudyPage() {
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
         <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full font-black text-xs uppercase tracking-widest mb-6">
            <LayoutDashboard className="w-4 h-4" /> Case Study #01
         </div>
         <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-[1.1]">Dashboard MVP w 120 minut</h1>
         <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">Prawdziwa historia o tym, jak technologia Vibe Codingu pozwoliła nam dowieźć projekt, który normalnie zająłby 2 tygodnie.</p>
      </div>

      <div className="prose prose-slate prose-lg max-w-none">
        <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
          <Target className="w-8 h-8 text-blue-600" /> Wyzwanie
        </h2>
        <p>
          Klient potrzebował wewnętrznego narzędzia do monitorowania KPI sprzedaży. Wymagania: Logowanie (Next-Auth), Wykresy (Recharts), Baza danych (Prisma + PostgreSQL) oraz pełna responsywność.
        </p>

        <h2 className="text-3xl font-bold mt-16 mb-6">Przebieg prac</h2>
        <div className="space-y-8">
           <div className="p-8 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm">
              <h4 className="font-black text-slate-900 mb-2">Minuta 0-15: Architektura i UI</h4>
              <p className="text-sm text-slate-600 mb-0 leading-relaxed">Użyliśmy **v0.dev**, aby wygenerować bazowy layout dashboardu. Skopiowaliśmy kod do edytora **Cursor**.</p>
           </div>
           <div className="p-8 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm">
              <h4 className="font-black text-slate-900 mb-2">Minuta 15-60: Baza Danych i Autoryzacja</h4>
              <p className="text-sm text-slate-600 mb-0 leading-relaxed">Poprosiliśmy Cursora (Cmd+I): &quot;Dodaj Prisma schema dla zamówień, klientów i produktów. Skonfiguruj Next-Auth z logowaniem Google.&quot; AI wykonało 90% pracy bezbłędnie.</p>
           </div>
           <div className="p-8 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm">
              <h4 className="font-black text-slate-900 mb-2">Minuta 60-120: Logika biznesowa i Wykresy</h4>
              <p className="text-sm text-slate-600 mb-0 leading-relaxed">AI zaimplementowało endpointy API i połączyło je z komponentami wykresów. Ostatnie 20 minut to drobne poprawki CSS.</p>
           </div>
        </div>

        <div className="bg-emerald-50 border-l-8 border-emerald-500 p-10 my-16 rounded-r-[3rem]">
           <h3 className="text-2xl font-bold text-emerald-900 mb-4 flex items-center gap-3"><CheckCircle className="w-8 h-8 text-emerald-600" /> Rezultat</h3>
           <p className="text-emerald-800 text-lg font-medium mb-0">Narzędzie zostało wdrożone na Vercel i oddane klientowi przed przerwą obiadową. Całkowity koszt developmentu: ~10$ (tokeny AI).</p>
        </div>
      </div>
    </article>
  );
}
