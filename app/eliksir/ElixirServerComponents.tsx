import React from 'react';
import { Scale, FileText, Search, Mail, Stamp, Home as HouseIcon } from 'lucide-react';

export const CaseFile = ({ title, children, type = 'evidence' }: { title: string, children: React.ReactNode, type?: 'evidence' | 'transcript' | 'email' }) => (
  <div className="my-12 border-2 border-stone-400 bg-stone-50 shadow-md rounded-sm overflow-hidden break-inside-avoid text-left transform -rotate-[0.5deg]">
    <div className="bg-stone-200 border-b-2 border-stone-400 px-4 py-3 flex items-center gap-3 text-sm font-display font-black text-stone-800 uppercase tracking-widest">
      {type === 'email' ? <Mail className="w-5 h-5" /> : type === 'transcript' ? <Search className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
      <span>{title}</span>
    </div>
    <div className="p-8 font-serif text-lg md:text-xl leading-relaxed text-stone-800 relative">
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] pointer-events-none"></div>
      <span className="relative italic">{children}</span>
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
  <div className="my-16 py-12 border-y-4 border-double border-stone-800 text-center px-8 break-inside-avoid">
    <p className="font-display text-3xl md:text-4xl font-medium italic text-stone-900 leading-tight mb-6">
      „{quote}”
    </p>
    <div className="font-serif text-xs uppercase tracking-[0.4em] text-stone-500">
      — <span className="font-black text-stone-900">{author}</span> —
      <br />
      <span className="mt-2 block text-[10px] opacity-70 tracking-widest">{source}</span>
    </div>
  </div>
);

export const LocationStampUI = ({ name, code, plot, lv }: { name: string, code: string, plot: string, lv: string }) => (
  <div className="relative border-2 border-stone-800 bg-white p-2 pr-8 rounded-sm flex items-center gap-6 shadow-[6px_6px_0px_0px_rgba(28,25,23,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] text-left group cursor-pointer">
     <div className="absolute top-1 right-1 text-stone-300 group-hover:text-stone-500 transition-colors">
       <Search className="w-3 h-3" />
     </div>

     <div className="bg-stone-900 h-full p-4 flex items-center justify-center border-r-2 border-stone-800 transition-colors">
        <HouseIcon className="w-6 h-6 text-white" />
     </div>
     <div className="py-3">
        <div className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-black mb-1 flex items-center gap-2">
          {name}
        </div>
        <div className="font-display text-2xl font-black text-stone-900 tracking-tighter">LV {lv}</div>
        <div className="text-[11px] text-stone-600 font-serif font-bold uppercase tracking-widest mt-1">
          Działka: {plot} <span className="text-stone-400 mx-1">|</span> Obręb: {code}
        </div>
     </div>
  </div>
);

export const TransactionStampUI = ({ label, value, subDetails }: { label: string, value: string, subDetails?: string }) => (
  <div className="relative border-2 border-stone-800 bg-white p-2 pr-8 rounded-sm flex items-center gap-6 shadow-[6px_6px_0px_0px_rgba(28,25,23,1)] group hover:border-stone-400 transition-all cursor-default text-left">
     <div className="absolute top-1 right-1 text-stone-300 group-hover:text-stone-500 transition-colors">
       <Search className="w-3 h-3" />
     </div>

     <div className="bg-stone-900 h-full p-4 flex items-center justify-center border-r-2 border-stone-800">
        <Stamp className="w-6 h-6 text-white" />
     </div>
     <div className="py-3">
        <div className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-black mb-1">{label}</div>
        <div className="font-display text-2xl font-black text-stone-900 tracking-tighter">{value}</div>
        {subDetails && <div className="text-[11px] text-stone-600 font-serif font-bold uppercase tracking-widest mt-1">{subDetails}</div>}
     </div>
  </div>
);
