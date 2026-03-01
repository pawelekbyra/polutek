import React from 'react';
import { Scale, FileText, Search, Mail, Stamp, Home as HouseIcon } from 'lucide-react';

export const CaseFile = ({ title, children, type = 'evidence' }: { title: string, children: React.ReactNode, type?: 'evidence' | 'transcript' | 'email' }) => (
  <div className="my-8 border-2 border-stone-900 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] rounded-sm overflow-hidden break-inside-avoid text-left">
    <div className="bg-stone-900 px-4 py-1.5 flex items-center gap-2 text-[10px] font-bold text-white uppercase tracking-[0.2em]">
      {type === 'email' ? <Mail className="w-3.5 h-3.5" /> : type === 'transcript' ? <Search className="w-3.5 h-3.5" /> : <FileText className="w-3.5 h-3.5" />}
      <span>{title}</span>
    </div>
    <div className="p-6 font-serif text-base md:text-lg leading-relaxed text-stone-900 italic border-t border-stone-200">
      {children}
    </div>
  </div>
);

export const LegalNote = ({ term, children }: { term: string, children: React.ReactNode }) => (
  <div className="my-10 flex gap-4 p-5 bg-blue-50/50 border-l-4 border-blue-900/80 rounded-r-lg text-left">
    <Scale className="w-6 h-6 text-blue-900/80 shrink-0 mt-1" />
    <div>
      <strong className="block font-serif text-blue-900 text-lg mb-2">{term}</strong>
      <div className="text-stone-700 text-sm leading-relaxed">{children}</div>
    </div>
  </div>
);

export const PullQuote = ({ quote, author, source }: { quote: string, author: string, source: string }) => (
  <div className="my-12 px-8 py-6 border-y-2 border-stone-900 text-center relative">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 text-2xl" style={{ backgroundColor: 'var(--paper-bg)' }}>“</div>
    <p className="font-serif text-2xl md:text-3xl italic text-stone-900 leading-tight mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
      {quote}
    </p>
    <div className="font-serif text-[11px] uppercase tracking-[0.2em] text-stone-600">
      — <span className="font-bold text-stone-900">{author}</span>, {source}
    </div>
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 px-4 text-2xl" style={{ backgroundColor: 'var(--paper-bg)' }}>”</div>
  </div>
);

export const LocationStampUI = ({ name, code, plot, lv }: { name: string, code: string, plot: string, lv: string }) => (
  <div className="relative border-2 border-stone-900 bg-white p-1 pr-6 rounded-sm flex items-center gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] transition-colors text-left group">
     <div className="absolute top-1 right-1 text-stone-300 group-hover:text-stone-500 transition-colors">
       <Search className="w-3 h-3" />
     </div>

     <div className="bg-stone-100 h-full p-3 flex items-center justify-center border-r border-stone-200 border-dashed transition-colors">
        <HouseIcon className="w-5 h-5 text-stone-400" />
     </div>
     <div className="py-2">
        <div className="text-[9px] uppercase tracking-[0.2em] text-stone-400 font-bold mb-1 flex items-center gap-2">
          {name}
        </div>
        <div className="font-mono text-base font-bold text-stone-800">LV {lv}</div>
        <div className="text-[10px] text-stone-500 font-mono mt-1">
          Działka: {plot} <span className="text-stone-300 mx-1">|</span> Obręb: {code}
        </div>
     </div>
  </div>
);

export const TransactionStampUI = ({ label, value, subDetails }: { label: string, value: string, subDetails?: string }) => (
  <div className="relative border-2 border-stone-900 bg-white p-1 pr-6 rounded-sm flex items-center gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] group hover:border-stone-400 transition-colors cursor-default text-left">
     <div className="absolute top-1 right-1 text-stone-300 group-hover:text-stone-500 transition-colors">
       <Search className="w-3 h-3" />
     </div>

     <div className="bg-stone-100 h-full p-3 flex items-center justify-center border-r border-stone-200 border-dashed">
        <Stamp className="w-5 h-5 text-stone-400" />
     </div>
     <div className="py-2">
        <div className="text-[9px] uppercase tracking-[0.2em] text-stone-400 font-bold mb-1">{label}</div>
        <div className="font-mono text-base font-bold text-stone-800">{value}</div>
        {subDetails && <div className="text-[10px] text-stone-500 font-mono mt-1">{subDetails}</div>}
     </div>
  </div>
);
