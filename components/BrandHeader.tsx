'use client';

import React, { useState, useEffect } from 'react';
import { Newspaper, FileText } from 'lucide-react';

export default function BrandHeader() {
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const date = new Date().toLocaleDateString('pl-PL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setCurrentDate(date.toUpperCase());
  }, []);

  return (
    <header className="pt-12 pb-0 px-6 bg-transparent w-full">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter uppercase mb-4 text-stone-900">
          NASZA GAZETKA
        </h1>

        <div className="relative py-2 mt-4">
          {/* Decorative Triple Lines */}
          <div className="absolute top-0 left-0 w-full flex flex-col gap-[2px]">
            <div className="h-[1px] bg-stone-300 w-full"></div>
            <div className="h-[2px] bg-stone-800 w-full"></div>
            <div className="h-[1px] bg-stone-300 w-full"></div>
          </div>

          <div className="flex justify-between items-center py-2 px-2">
            <Newspaper className="w-5 h-5 text-stone-700" />
            <div className="text-[10px] md:text-xs font-serif font-bold uppercase tracking-[0.2em] text-stone-800">
              NIEZALEŻNY SERWIS ŚLEDCZY • {currentDate}
            </div>
            <FileText className="w-5 h-5 text-stone-700" />
          </div>

          <div className="absolute bottom-0 left-0 w-full flex flex-col gap-[2px]">
            <div className="h-[1px] bg-stone-300 w-full"></div>
            <div className="h-[2px] bg-stone-800 w-full"></div>
            <div className="h-[1px] bg-stone-300 w-full"></div>
          </div>
        </div>

      </div>
    </header>
  );
}
