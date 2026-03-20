import React from 'react';
import Link from 'next/link';
import { locales } from '@/app/i18n-config';

export default function RootPage() {
  const languageNames: Record<string, string> = {
    pl: 'Polski',
    en: 'English',
    es: 'Español',
    de: 'Deutsch',
    fr: 'Français',
    cs: 'Čeština',
  };

  const languages = locales.map(code => ({
    code,
    name: languageNames[code] || code.toUpperCase()
  }));

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 font-serif">
      <div className="max-w-md w-full border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="text-3xl font-black uppercase tracking-tighter mb-8 text-center border-b-2 border-black pb-4">
          NASZA GAZETKA
        </h1>
        <div className="flex flex-col gap-4">
          {languages.map((lang) => (
            <Link
              key={lang.code}
              href={`/${lang.code}/`}
              className="text-xl font-bold uppercase tracking-widest text-center py-3 border-2 border-black hover:bg-[#e8d154] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
            >
              {lang.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
