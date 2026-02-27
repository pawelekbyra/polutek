import { Briefcase, DollarSign, Clock, Globe, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Praca w AI: Zarabiaj jako AI Trainer (Outlier) | Polutek.pl",
  description: "Dowiedz się jak zarabiać w USD trenując modele AI. Przegląd ofert pracy zdalnej dla programistów i humanistów w Outlier.ai.",
  keywords: "praca ai, outlier ai opinie, trenowanie modeli ai praca, praca zdalna usd, vibe coding praca",
};

export default function JobsPage() {
  const referralLink = "https://app.outlier.ai/expert/referrals/link/IN9kYs2LuN5_5lolObE_qnscTog";

  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
          <Briefcase className="w-3 h-3" /> Rekrutacja 2025
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Zarabiaj na Trenowaniu <span className="text-blue-600">Modeli AI</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Dołącz do Outlier.ai i twórz przyszłość sztucznej inteligencji. Praca zdalna, elastyczne godziny i stawki w USD dla ekspertów i pasjonatów.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <DollarSign className="w-10 h-10 text-emerald-600 mb-4" />
          <h3 className="text-xl font-bold mb-2">Wysokie Zarobki</h3>
          <p className="text-slate-500 text-sm">Konkurencyjne stawki godzinowe wypłacane w dolarach (USD) bezpośrednio na Twoje konto.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <Clock className="w-10 h-10 text-blue-600 mb-4" />
          <h3 className="text-xl font-bold mb-2">Pełna Elastyczność</h3>
          <p className="text-slate-500 text-sm">Pracujesz kiedy chcesz i ile chcesz. Sam decydujesz o swoim grafiku każdego dnia.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <Globe className="w-10 h-10 text-indigo-600 mb-4" />
          <h3 className="text-xl font-bold mb-2">100% Remote</h3>
          <p className="text-slate-500 text-sm">Pracuj z dowolnego miejsca na świecie. Wystarczy laptop i stabilne łącze internetowe.</p>
        </div>
      </div>

      <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden mb-20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-32 -mt-32"></div>

        <h2 className="text-3xl font-bold mb-8 relative z-10">Czym będziesz się zajmować?</h2>
        <ul className="space-y-6 relative z-10">
          <li className="flex gap-4">
            <CheckCircle2 className="w-6 h-6 text-blue-400 shrink-0" />
            <div>
              <span className="font-bold block text-lg">Weryfikacja odpowiedzi AI</span>
              <p className="text-slate-400">Ocenianie poprawności i logiki tekstów generowanych przez najnowsze modele LLM.</p>
            </div>
          </li>
          <li className="flex gap-4">
            <CheckCircle2 className="w-6 h-6 text-blue-400 shrink-0" />
            <div>
              <span className="font-bold block text-lg">Pisanie wzorcowych odpowiedzi</span>
              <p className="text-slate-400">Tworzenie wysokiej jakości treści, na których uczą się przyszłe wersje sztucznej inteligencji.</p>
            </div>
          </li>
          <li className="flex gap-4">
            <CheckCircle2 className="w-6 h-6 text-blue-400 shrink-0" />
            <div>
              <span className="font-bold block text-lg">Rozwiązywanie zadań logicznych</span>
              <p className="text-slate-400">Testowanie zdolności rozumowania modeli w dziedzinach takich jak matematyka, kodowanie czy nauki humanistyczne.</p>
            </div>
          </li>
        </ul>
      </div>

      <div className="bg-blue-50 rounded-3xl p-8 md:p-12 border border-blue-100 text-center">
        <h2 className="text-3xl font-bold mb-4 text-slate-900">Gotowy na start w branży AI?</h2>
        <p className="text-lg text-slate-600 mb-10 max-w-xl mx-auto">
          Kliknij poniższy przycisk, aby przejść do oficjalnego formularza rejestracyjnego Outlier.ai i rozpocząć proces kwalifikacji.
        </p>
        <a
          href={referralLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-xl shadow-xl shadow-blue-200 transition-all hover:scale-105"
        >
          Aplikuj przez Referral Link <ArrowRight className="w-6 h-6" />
        </a>
        <p className="mt-6 text-sm text-slate-400 italic">
          * Rejestracja przez powyższy link daje priorytet w procesie przeglądu Twojej aplikacji.
        </p>
      </div>

      <div className="mt-20 border-t border-slate-100 pt-12">
        <h3 className="text-2xl font-bold mb-6 text-center">Najczęstsze pytania o Outlier.ai</h3>
        <div className="grid md:grid-cols-2 gap-8">
           <div>
             <h4 className="font-bold mb-2">Czy muszę być programistą?</h4>
             <p className="text-slate-500 text-sm leading-relaxed">Nie! Outlier szuka ekspertów z wielu dziedzin: od biologii i historii, po matematykę i copywriting. Znajomość Vibe Codingu jest jednak ogromnym atutem w zadaniach technicznych.</p>
           </div>
           <div>
             <h4 className="font-bold mb-2">Jak wygląda proces rekrutacji?</h4>
             <p className="text-slate-500 text-sm leading-relaxed">Po rejestracji przejdziesz krótki test kompetencyjny z wybranej dziedziny. Jeśli wypadniesz dobrze, otrzymasz dostęp do płatnych szkoleń i pierwszych projektów.</p>
           </div>
        </div>
      </div>
    </section>
  );
}
