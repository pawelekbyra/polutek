"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Zap, BookOpen, Terminal, Cpu, Briefcase, Search } from 'lucide-react';

export default function VibeNav() {
  const pathname = usePathname();

  const tabs = [
    { href: '/', label: 'Start', icon: Zap },
    { href: '/co-to-jest-vibe-coding', label: 'Co to jest?', icon: BookOpen },
    { href: '/narzedzia-ai', label: 'Narzędzia', icon: Terminal },
    { href: '/andrej-karpathy', label: 'Karpathy', icon: Cpu },
    { href: '/praca', label: 'Praca', icon: Briefcase },
    { href: '/faq', label: 'FAQ', icon: Search },
  ];

  const isLinkActive = (href: string) => {
    // pathname will be the URL path, e.g., "/" or "/praca"
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
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
  );
}
