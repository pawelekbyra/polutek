"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Zap, BookOpen, Terminal, Cpu, Briefcase, Search, Menu, X, Swords } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VibeNav() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { href: '/', label: 'Start', icon: Zap },
    { href: '/co-to-jest-vibe-coding', label: 'Co to jest?', icon: BookOpen },
    { href: '/narzedzia-ai', label: 'Narzędzia', icon: Terminal },
    { href: '/porownania', label: 'Porównania', icon: Swords },
    { href: '/andrej-karpathy', label: 'Karpathy', icon: Cpu },
    { href: '/praca', label: 'Praca', icon: Briefcase },
    { href: '/faq', label: 'FAQ', icon: Search },
  ];

  const isLinkActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-200">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-black text-2xl tracking-tighter text-slate-900">Polutek<span className="text-blue-600">.pl</span></span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mt-0.5">Vibe Coding Hub</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
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

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-2">
              {tabs.map(tab => (
                <Link
                  key={tab.href}
                  href={tab.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-bold ${
                    isLinkActive(tab.href)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <tab.icon className={`w-5 h-5 ${isLinkActive(tab.href) ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
