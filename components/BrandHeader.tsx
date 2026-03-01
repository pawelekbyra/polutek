'use client';

import React, { useState, useEffect } from 'react';

export default function BrandHeader() {
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const date = new Date().toLocaleDateString('pl-PL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setCurrentDate(date);
  }, []);

  return (
    <header className="w-full mb-8">
      {/* Sekcja Tytułowa */}
      <div className="py-10 border-b border-gray-200 bg-white text-center">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic text-black font-sans">
          Nasza Gazetka
        </h1>
        <p className="text-[10px] tracking-[0.4em] uppercase mt-2 text-gray-500 font-sans">
          Niezależne Media
        </p>
      </div>

      {/* Czarny Pasek Info */}
      <div className="bg-black text-white py-2 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] md:text-xs font-bold uppercase tracking-widest font-sans">
          <div className="opacity-90 min-h-[1.5em]">
            {currentDate}
          </div>
          <div className="flex gap-4 md:gap-8">
            <span className="hover:text-gray-400 cursor-pointer transition-colors">Europa</span>
            <span className="hover:text-gray-400 cursor-pointer transition-colors">Świat</span>
          </div>
        </div>
      </div>
    </header>
  );
}
