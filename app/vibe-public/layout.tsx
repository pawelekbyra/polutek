"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Zap,
  Cpu,
  Sparkles,
  Terminal,
  Search,
  BookOpen,
  Briefcase
} from 'lucide-react';

export default function VibeCodingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const tabs = [
    { href: '/vibe-public', label: 'Start', icon: Zap },
    { href: '/vibe-public/co-to-jest-vibe-coding', label: 'Co to jest?', icon: BookOpen },
    { href: '/vibe-public/narzedzia-ai', label: 'Narzędzia', icon: Terminal },
    { href: '/vibe-public/andrej-karpathy', label: 'Karpathy', icon: Cpu },
    { href: '/vibe-public/praca', label: 'Praca', icon: Briefcase },
    { href: '/vibe-public/faq', label: 'FAQ', icon: Search },
  ];

  const isLinkActive = (href: string) => {
    if (href === '/vibe-public') return pathname === '/vibe-public';
    return pathname?.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/vibe-public" className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">Vibe<span className="text-blue-600">Coding</span>.pl</span>
          </Link>
          <div className="hidden md:flex gap-2">
            {tabs.map(tab => (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm font-medium ${
                  isLinkActive(tab.href)
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </Link>
            ))}
          </div>
          <button className="md:hidden p-2 text-slate-600">
            <Terminal className="w-6 h-6" />
          </button>
        </div>
      </nav>

      <div className="flex-grow">
        {children}
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-20 px-4 border-t border-slate-800 mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-6 h-6 text-blue-500" />
                <span className="font-bold text-2xl text-white tracking-tight">VibeCoding.pl</span>
              </div>
              <p className="max-w-md">
                Największy polski portal poświęcony przyszłości programowania, AI Software Engineering i narzędziom takim jak Cursor, Claude oraz nowym paradygmatom pracy.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Nawigacja</h4>
              <ul className="space-y-4">
                <li><Link href="/vibe-public/co-to-jest-vibe-coding" className="hover:text-white transition-colors">Czym jest Vibe Coding?</Link></li>
                <li><Link href="/vibe-public/narzedzia-ai" className="hover:text-white transition-colors">Narzędzia AI</Link></li>
                <li><Link href="/vibe-public/andrej-karpathy" className="hover:text-white transition-colors">Andrej Karpathy</Link></li>
                <li><Link href="/vibe-public/praca" className="hover:text-white transition-colors underline decoration-blue-500 underline-offset-4">Praca w AI (Outlier)</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Społeczność</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-white transition-colors">X (dawniej Twitter)</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Newsletter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2025 VibeCoding.pl. Wszystkie prawa zastrzeżone.</p>
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
