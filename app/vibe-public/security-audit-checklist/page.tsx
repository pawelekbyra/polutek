import { ShieldAlert, CheckCircle, Lock } from 'lucide-react';
import SchemaMarkup from '@/app/components/SchemaMarkup';

export const metadata = {
  title: "Security Audit Checklist dla Kodu AI | Polutek.pl",
  description: "Techniczny przewodnik po audytowaniu kodu wygenerowanego przez sztuczną inteligencję. Poznaj 10 krytycznych punktów kontrolnych.",
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
      <h1 className="text-4xl md:text-5xl font-bold mb-8 flex items-center gap-4 text-red-700">
        <ShieldAlert className="w-12 h-12" /> Security Audit Checklist
      </h1>
      <div className="prose prose-slate prose-lg max-w-none">
        <p className="lead text-xl text-slate-600 mb-8">
          AI nie jest ekspertem od security. Generuje kod, który &quot;działa&quot;, ale nie zawsze kod, który jest &quot;bezpieczny&quot;. Oto Twoja lista kontrolna.
        </p>

        <div className="space-y-6 my-12">
           <AuditItem title="Walidacja danych wejściowych" desc="Czy AI dodało odpowiednie sanitization dla danych od użytkownika? Sprawdź podatność na XSS i SQL Injection." />
           <AuditItem title="Zarządzanie sekretami" desc="Czy klucze API nie zostały wpisane na sztywno? Sprawdź czy używane są zmienne środowiskowe." />
           <AuditItem title="Licencje zależności" desc="Czy zaproponowane biblioteki mają bezpieczne licencje (MIT/Apache) i czy nie mają znanych podatności (CVE)?" />
           <AuditItem title="Logowanie i Monitoring" desc="Czy kod zawiera odpowiednie logowanie błędów, które nie wycieka wrażliwych danych?" />
           <AuditItem title="Autoryzacja (RBAC)" desc="Czy AI nie pominęło sprawdzenia uprawnień przy endpointach API?" />
        </div>

        <h2 className="text-3xl font-bold mt-16 mb-6 flex items-center gap-3">
          <Lock className="w-8 h-8 text-slate-900" /> Zautomatyzuj Audyt
        </h2>
        <p>
          Używaj narzędzi takich jak <strong>Snyk</strong>, <strong>GitHub Advanced Security</strong> lub dedykowanych promptów w Cursorze: &quot;@Codebase przeprowadź audyt bezpieczeństwa tego modułu pod kątem OWASP Top 10&quot;.
        </p>
      </div>
    </section>
  );
}

function AuditItem({ title, desc }: any) {
  return (
    <div className="bg-white border border-slate-200 p-6 rounded-2xl flex gap-4 shadow-sm">
      <div className="mt-1"><CheckCircle className="w-6 h-6 text-emerald-500" /></div>
      <div>
        <h4 className="font-bold text-lg mb-1">{title}</h4>
        <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
