import { ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function SecurityPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Bezpieczeństwo Kodu AI: Na co uważać w Vibe Codingu?</h1>
      <div className="prose prose-slate prose-lg max-w-none">
        <p className="lead text-xl text-slate-600 mb-8">
          Szybkość generowania kodu przez AI ma swoją ciemną stronę: potencjalne luki w zabezpieczeniach. Jak budować bezpiecznie w nowym paradygmacie?
        </p>

        <p>
          Modele takie jak Claude czy GPT-4o są trenowane na miliardach linii kodu, w tym również na kodzie zawierającym błędy bezpieczeństwa. Jeśli poprosisz o "prosty system logowania", AI może zaproponować rozwiązanie podatne na SQL Injection lub bez odpowiedniego hashowania haseł.
        </p>

        <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3 text-red-600">
          <ShieldAlert className="w-8 h-8" /> Najczęstsze ryzyka
        </h2>
        <ul className="space-y-4">
          <li><strong>Hardcoded Secrets:</strong> AI może wygenerować kod z wpisanymi na sztywno kluczami API lub hasłami do bazy danych.</li>
          <li><strong>Podatne biblioteki:</strong> Proponowanie starych wersji paczek npm, które mają znane luki (CVE).</li>
          <li><strong>Brak walidacji:</strong> Pomijanie sprawdzenia danych wejściowych od użytkownika w szybkich skryptach.</li>
        </ul>

        <h2 className="text-3xl font-bold mt-16 mb-6 flex items-center gap-3 text-emerald-600">
          <CheckCircle2 className="w-8 h-8" /> Złote zasady bezpiecznego Vibe Codingu
        </h2>
        <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100 my-8">
          <ol className="space-y-4 font-bold text-emerald-900">
            <li>1. Zawsze używaj zmiennych środowiskowych (.env) dla wszystkich sekretów.</li>
            <li>2. Proś AI o napisanie testów bezpieczeństwa do wygenerowanego kodu.</li>
            <li>3. Używaj narzędzi do statycznej analizy kodu (Snyk, SonarQube) na wynikach pracy AI.</li>
            <li>4. Pamiętaj o zasadzie ograniczonego zaufania: AI to Twój asystent, a nie Audytor Bezpieczeństwa.</li>
          </ol>
        </div>

        <h2 className="text-3xl font-bold mt-16 mb-6">Podsumowanie</h2>
        <p>
          Vibe coding pozwala budować szybciej, ale nie zdejmuje z Ciebie odpowiedzialności. Bądź kapitanem swojego statku – pozwól AI wiosłować, ale to Ty musisz uważać na skały.
        </p>
      </div>
    </section>
  );
}
