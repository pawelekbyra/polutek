import VibeNav from '@/app/components/VibeNav';
import Link from 'next/link';

export default function VibeCodingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <VibeNav />

      <div className="flex-grow">
        {children}
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-20 px-4 border-t border-slate-800 mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-8 h-8 text-blue-500" />
                <div className="flex flex-col leading-none">
                  <span className="font-black text-3xl text-white tracking-tighter">Polutek<span className="text-blue-500">.pl</span></span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mt-1">Vibe Coding Hub</span>
                </div>
              </div>
              <p className="max-w-md">
                Największy polski portal poświęcony przyszłości programowania, AI Software Engineering i narzędziom takim jak Cursor, Claude oraz nowym paradygmatom pracy.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Baza Wiedzy</h4>
              <ul className="space-y-4">
                <li><Link href="/co-to-jest-vibe-coding" className="hover:text-white transition-colors">Czym jest Vibe Coding?</Link></li>
                <li><Link href="/roadmap" className="hover:text-white transition-colors">Roadmapa 2025</Link></li>
                <li><Link href="/slownik" className="hover:text-white transition-colors">Słownik Pojęć</Link></li>
                <li><Link href="/porownania" className="hover:text-white transition-colors">Porównania AI</Link></li>
                <li><Link href="/cursorrules-library" className="hover:text-white transition-colors text-blue-400 font-bold">Biblioteka .cursorrules</Link></li>
                <li><Link href="/ceny-narzedzi-ai-2025" className="hover:text-white transition-colors">Cennik Narzędzi 2025</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Biznes i Prawo</h4>
              <ul className="space-y-4">
                <li><Link href="/vibe-coding-dla-solo-founderow" className="hover:text-white transition-colors font-bold text-indigo-400">Solo-Founder SaaS</Link></li>
                <li><Link href="/legalnosc-kodu-ai" className="hover:text-white transition-colors">Aspekty Prawne</Link></li>
                <li><Link href="/zarabianie-na-vibe-codingu" className="hover:text-white transition-colors">Zarabianie na AI</Link></li>
                <li><Link href="/praca" className="hover:text-white transition-colors underline decoration-blue-500 underline-offset-4">Praca w AI (Outlier)</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Społeczność</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-white transition-colors">X (Twitter)</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Newsletter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2025 Polutek.pl. Wszystkie prawa zastrzeżone.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Polityka prywatności</a>
              <a href="#" className="hover:text-white transition-colors">Kontakt</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Sparkles(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}
