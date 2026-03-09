import React from 'react';

export const CaseFile = ({ title, children, type = 'evidence', highlight = false }: { title: string, children: React.ReactNode, type?: 'evidence' | 'transcript' | 'email', highlight?: boolean }) => {
  const getIcon = () => {
    if (type === 'email') return '✉️';
    if (type === 'transcript') return '🔍';
    return '📄';
  };

  return (
    <div className={`not-prose my-8 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-sm overflow-hidden break-inside-avoid text-left relative z-10 ${highlight ? 'bg-[#e8d154]' : 'bg-white/40'}`}>
      <div className="bg-black px-4 py-2 flex items-center gap-2 text-xs font-mono text-white uppercase tracking-wider">
        <span>{getIcon()}</span>
        <span>{title}</span>
      </div>
      <div className="p-6 font-mono text-sm md:text-base leading-relaxed text-[#000000] antialiased">
        {children}
      </div>
    </div>
  );
};

export const LegalNote = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="not-prose my-10 flex gap-4 p-5 bg-[#e8d154]/20 border-l-[6px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-left relative z-10">
    <div className="text-2xl mt-1">⚖️</div>
    <div>
      <strong className="block font-display font-black uppercase text-[#000000] text-lg mb-2">{title}</strong>
      <div className="text-[#000000] text-sm leading-relaxed font-mono italic">{children}</div>
    </div>
  </div>
);

export const PullQuote = ({ children, author, source }: { children: React.ReactNode, author: string, source?: string }) => (
  <div className="not-prose my-10 pl-6 border-l-[6px] border-black text-left relative z-10">
    <div className="font-serif text-xl md:text-2xl italic text-[#000000] leading-relaxed mb-3">
      „{children}”
    </div>
    <div className="font-sans text-[10px] uppercase tracking-widest text-black/70">
      — <span className="font-bold text-black">{author}</span>{source ? `, ${source}` : ''}
    </div>
  </div>
);

export const LocationStampUI = ({ name, code, plot, lv }: { name: string, code: string, plot: string, lv: string }) => (
  <div className="not-prose relative z-10 border-2 border-black bg-white p-1 pr-6 rounded-sm flex items-center gap-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-left hover:bg-[#e8d154]/20 transition-colors">
      <div className="absolute top-1 right-1 text-black">🔍</div>
      <div className="bg-black/5 h-full p-3 flex items-center justify-center border-r-2 border-black border-dashed">
         <span className="text-xl">🏠</span>
      </div>
      <div className="py-2">
         <div className="text-[9px] uppercase tracking-[0.2em] text-black font-bold mb-1 flex items-center gap-2">{name}</div>
         <div className="font-mono text-base font-bold text-black uppercase">LV {lv}</div>
         <div className="text-[10px] text-black/60 font-mono mt-1 uppercase">
            Działka: {plot} <span className="mx-1">|</span> Obręb: {code}
         </div>
      </div>
  </div>
);

export const TransactionStampUI = ({ label, value, subDetails }: { label: string, value: string, subDetails?: string }) => (
  <div className="not-prose relative z-10 border-2 border-black bg-white p-1 pr-6 rounded-sm flex items-center gap-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#e8d154]/20 transition-colors text-left group">
     <div className="absolute bottom-1 right-1 text-black">🔍</div>
     <div className="bg-black/5 h-full p-3 flex items-center justify-center border-r-2 border-black border-dashed">
        <span className="text-xl">📄</span>
     </div>
     <div className="py-2">
        <div className="text-[9px] uppercase tracking-[0.2em] text-black font-bold mb-1">{label}</div>
        <div className="font-mono text-base font-bold text-black uppercase">{value}</div>
        {subDetails && <div className="text-[10px] text-black/60 font-mono mt-1 uppercase">{subDetails}</div>}
     </div>
  </div>
);
