'use client';

import React, { useState, useEffect } from 'react';

export default function BrandHeader() {
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('pl-PL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }));
  }, []);

  return (
    <header className="pt-8 pb-4 px-4 bg-transparent w-full">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-4 text-stone-900" style={{ fontFamily: 'var(--font-heading)' }}>
          NASZA GAZETKA
        </h1>

        <div className="relative py-2 mt-4">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-y-2 border-stone-900 h-1.5 flex flex-col justify-between">
              <div className="border-t border-stone-900"></div>
              <div className="border-b border-stone-900"></div>
            </div>
          </div>

          <div className="relative flex justify-between items-center px-2 py-1">
            <div className="flex items-center gap-2">
               <span className="text-stone-800">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13,3.5c0,0.83-0.67,1.5-1.5,1.5S10,4.33,10,3.5S10.67,2,11.5,2S13,2.67,13,3.5z M18,5c0,0.83-0.67,1.5-1.5,1.5S15,5.83,15,5 s0.67-1.5,1.5-1.5S18,4.17,18,5z M9,5C9,5.83,8.33,6.5,7.5,6.5S6,5.83,6,5s0.67-1.5,1.5-1.5S9,4.17,9,5z M12,18 c-3.31,0-6,2.69-6,6h12C18,20.69,15.31,18,12,18z M12,8c-2.21,0-4,1.79-4,4s1.79,4,4,4s4-1.79,4-4S14.21,8,12,8z"/></svg>
               </span>
               <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-stone-900">
                NIEZALEŻNY SERWIS ŚLEDCZY
               </div>
            </div>

            <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-stone-900">
              NIEDZIELA, 1 MARCA 2026
            </div>

            <div className="flex items-center gap-2">
               <span className="text-stone-800">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M14,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8L14,2z M16,18H8v-2h8V18z M16,14H8v-2h8V14z M13,9V3.5L18.5,9H13z"/></svg>
               </span>
            </div>
          </div>
        </div>

        <nav className="flex justify-center gap-12 font-serif text-[10px] font-bold uppercase tracking-[0.3em] text-stone-600 mt-4">
          <span className="hover:text-stone-900 cursor-pointer transition-colors">EUROPA</span>
          <span className="hover:text-stone-900 cursor-pointer transition-colors">ŚWIAT</span>
          <span className="text-stone-900 border-b border-stone-900 pb-0.5">ŚLEDZTWA</span>
        </nav>
      </div>
    </header>
  );
}
