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
    <header className="border-b-4 border-double border-stone-300 py-8 px-6 bg-white w-full">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight uppercase mb-2 text-stone-900">
          NASZA GAZETKA
        </h1>
        <div className="flex flex-col md:flex-row justify-between items-center border-y border-stone-300 py-3 mt-6">
          <div className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 md:mb-0 min-h-[1rem]">
            Niezależny Serwis Śledczy • {currentDate}
          </div>
          <nav className="flex gap-6 font-sans text-xs font-bold uppercase tracking-wider text-stone-600">
            <span className="hover:text-stone-900 cursor-pointer transition-colors">Europa</span>
            <span className="hover:text-stone-900 cursor-pointer transition-colors">Świat</span>
            <span className="text-stone-900 underline decoration-double decoration-stone-300 underline-offset-4">Śledztwa</span>
          </nav>
        </div>
      </div>
    </header>
  );
}
