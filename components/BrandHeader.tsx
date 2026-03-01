'use client';

import React from 'react';

export default function BrandHeader() {
  return (
    <header className="pt-12 pb-8 px-4 w-full">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-[5.5rem] md:text-[8rem] leading-[0.85] mb-8 text-stone-900 lowercase tracking-tight" style={{ fontFamily: 'var(--font-blackletter)' }}>
          Nasza Gazetka
        </h1>

        <div className="border-y border-stone-800 py-1 flex justify-between items-center text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium text-stone-700">
           <div className="hidden md:block">Volume I • No. 1</div>
           <div className="mx-auto md:mx-0">Niedziela, 1 Marca 2026 • Janov u Krnova</div>
           <div className="hidden md:block">Cena: 0.00 PLN</div>
        </div>

        <nav className="flex justify-center gap-10 font-serif text-[10px] font-bold uppercase tracking-[0.35em] text-stone-500 mt-6">
          <span className="hover:text-stone-900 cursor-pointer transition-colors">EUROPA</span>
          <span className="hover:text-stone-900 cursor-pointer transition-colors">ŚWIAT</span>
          <span className="text-stone-900 border-b-2 border-stone-900 pb-0.5">ŚLEDZTWA</span>
        </nav>
      </div>
    </header>
  );
}
