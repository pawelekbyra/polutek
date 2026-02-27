import SchemaMarkup from '@/app/components/SchemaMarkup';
import { HelpCircle, Search, Terminal } from 'lucide-react';

export const metadata = {
  title: "Vibe Coding FAQ: Najczęstsze Pytania o AI w IT | Polutek.pl",
  description: "Wszystko co musisz wiedzieć o programowaniu intencyjnym. Czy AI zastąpi programistów? Jak zacząć?",
};

const faqItems = [
  { q: "Czy Vibe Coding zastąpi programistów?", a: "Nie, ale zmieni ich rolę. AI przejmuje implementację, ale człowiek nadal musi zarządzać produktem, architekturą i bezpieczeństwem." },
  { q: "Jakie narzędzia są najlepsze na start?", a: "Obecnie złotym standardem jest edytor Cursor w połączeniu z modelem Claude 3.5 Sonnet." },
  { q: "Czy muszę umieć programować?", a: "Podstawowa wiedza pomaga w weryfikacji błędów, ale barierę wejścia obniżono o 90%. Możesz budować aplikacje opisując je precyzyjnie." },
  { q: "Vibe coding a prompt engineering?", a: "Prompt engineering to technika zapytań. Vibe coding to cały styl pracy (workflow) wewnątrz IDE, gdzie iterujesz na żywo z kodem." }
];

export default function FAQPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <SchemaMarkup
        type="FAQ"
        questions={faqItems}
      />
      <h1 className="text-4xl md:text-5xl font-bold mb-12 flex items-center gap-4">
        <HelpCircle className="w-10 h-10 text-blue-600" /> Najczęstsze Pytania (FAQ)
      </h1>

      <div className="space-y-6">
        {faqItems.map((item, idx) => (
          <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
             <h3 className="text-xl font-bold mb-4 text-slate-900">{item.q}</h3>
             <p className="text-slate-600 leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
