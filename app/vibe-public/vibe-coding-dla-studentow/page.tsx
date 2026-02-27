import { GraduationCap, Book, Award } from 'lucide-react';
import SchemaMarkup from '@/app/components/SchemaMarkup';

export const metadata = {
  title: "Vibe Coding dla Studentów: Czy warto jeszcze uczyć się C++? | Polutek.pl",
  description: "Jak studiować informatykę w erze AI. Dlaczego fundamenty są ważniejsze niż kiedykolwiek, mimo że AI pisze kod.",
};

export default function StudentsPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <SchemaMarkup
        type="Article"
        headline={metadata.title}
        description={metadata.description}
        author="Detektyw Polutek"
        datePublished="2025-02-21"
      />
      <h1 className="text-4xl md:text-5xl font-bold mb-8 flex items-center gap-4">
        <GraduationCap className="w-12 h-12 text-amber-500" /> Vibe Coding dla Studentów
      </h1>
      <div className="prose prose-slate prose-lg max-w-none">
        <p className="lead text-xl text-slate-600 mb-8">
          Wiele osób pyta: &quot;Czy jest sens iść na studia IT w 2025?&quot;. Odpowiedź brzmi: Tak, ale musisz zmienić podejście.
        </p>

        <h2 className="text-3xl font-bold mt-12 mb-6">Od klepacza kodu do architekta</h2>
        <p>
          AI świetnie radzi sobie ze składnią, ale tragicznie z projektowaniem systemów rozproszonych bez Twojego nadzoru. Studia powinny uczyć Cię <strong>jak myśleć</strong>, a nie jakiej biblioteki użyć.
        </p>

        <div className="grid md:grid-cols-2 gap-8 my-12">
           <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 shadow-sm">
             <h4 className="font-bold flex items-center gap-2 mb-3"><Book className="w-5 h-5 text-amber-700" /> Fundamenty</h4>
             <p className="text-sm">Algorytmy, struktury danych i systemy operacyjne - to one pozwalają Ci zweryfikować, czy kod z AI jest optymalny.</p>
           </div>
           <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 shadow-sm">
             <h4 className="font-bold flex items-center gap-2 mb-3"><Award className="w-5 h-5 text-amber-700" /> Projekty MVP</h4>
             <p className="text-sm">Używaj AI, aby w trakcie studiów zbudować 10 działających produktów zamiast 1 projektu semestralnego.</p>
           </div>
        </div>

        <h2 className="text-3xl font-bold mt-16 mb-6">Nowy Model Nauki</h2>
        <p>
          Ucz się przez <strong>debugging</strong>. Pozwól AI wygenerować kod, a potem spróbuj zrozumieć każdą linię i poproś o wyjaśnienie alternatywnych podejść. To najszybszy sposób na naukę w 2025 roku.
        </p>
      </div>
    </section>
  );
}
