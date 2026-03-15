import React from 'react';
import Link from 'next/link';

export default function RootPage() {
  const languages = [
    { code: 'pl', name: 'Polski' },
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'de', name: 'Deutsch' },
    { code: 'fr', name: 'Français' },
  ];

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
