import SchemaMarkup from '@/app/components/SchemaMarkup';
import { ShieldAlert, ShieldCheck, Lock, AlertTriangle } from 'lucide-react';

export const metadata = {
  title: "Bezpieczeństwo Kodu AI: Jak nie zhakować samego siebie | Polutek.pl",
  description: "Zagrożenia związane z generowaniem kodu przez AI. Jak unikać luk w bezpieczeństwie i wycieków danych.",
};

export default function SecurityPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <SchemaMarkup
        type="Article"
        headline={metadata.title}
        description={metadata.description}
        author="Detektyw Polutek"
        datePublished="2025-02-21"
      />
      <h1 className="text-4xl md:text-5xl font-bold mb-8 flex items-center gap-4 text-red-600">
        <ShieldAlert className="w-12 h-12" /> Bezpieczeństwo Kodu AI
      </h1>
      <div className="prose prose-slate prose-lg max-w-none">
        <p className="lead text-xl text-slate-600 mb-12">
          AI pisze kod szybko, ale nie zawsze bezpiecznie. W nowym paradygmacie to Ty jesteś audytorem bezpieczeństwa swojego asystenta.
        </p>

        <h2 className="text-3xl font-bold mt-12 mb-6">3 Najczęstsze Pułapki</h2>
        <div className="space-y-6">
           <div className="p-6 bg-red-50 rounded-2xl border border-red-100 flex gap-4">
              <AlertTriangle className="w-6 h-6 text-red-500 shrink-0" />
              <div>
                 <h4 className="font-bold text-red-900">Podatne biblioteki (CVE)</h4>
                 <p className="text-sm text-red-800">AI może zaproponować starą wersję paczki npm, która ma znane luki w bezpieczeństwie.</p>
              </div>
           </div>
           <div className="p-6 bg-red-50 rounded-2xl border border-red-100 flex gap-4">
              <Lock className="w-6 h-6 text-red-500 shrink-0" />
              <div>
                 <h4 className="font-bold text-red-900">Wyciek Sekretów</h4>
                 <p className="text-sm text-red-800">Częstym błędem AI jest wpisywanie kluczy API na sztywno do kodu zamiast używania .env.</p>
              </div>
           </div>
        </div>

        <h2 className="text-3xl font-bold mt-16 mb-6 flex items-center gap-3 text-emerald-600">
          <ShieldCheck className="w-8 h-8" /> Złota Zasada
        </h2>
        <div className="bg-emerald-600 p-8 rounded-3xl text-white shadow-xl">
           <p className="text-xl font-bold italic mb-0">
              &quot;Nigdy nie publikuj kodu wygenerowanego przez AI bez poproszenia innego modelu AI o audyt bezpieczeństwa tego fragmentu.&quot;
           </p>
        </div>
      </div>
    </section>
  );
}
