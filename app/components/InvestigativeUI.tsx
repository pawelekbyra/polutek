import React from 'react';
import { MapPin, Stamp, FileText, Mail, Search, Scale, Quote } from 'lucide-react';

export const CaseFile = ({ title, children, type = 'evidence', highlight = false, source, t }: { title: string, children: React.ReactNode, type?: 'evidence' | 'transcript' | 'email', highlight?: boolean, source?: string, t: any }) => {
  const getIcon = () => {
    if (type === 'email') return <Mail size={12} />;
    if (type === 'transcript') return <Search size={12} />;
    return <FileText size={12} />;
  };

  return (
    <div className={`card my-8 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-sm overflow-hidden break-inside-avoid text-left relative z-10 ${highlight ? 'bg-primary' : 'bg-base-100/40'}`}>
      <div className="bg-neutral px-4 py-2 flex items-center gap-2 text-xs font-mono text-neutral-content uppercase tracking-wider">
        <span className="flex items-center">{getIcon()}</span>
        <span>{title}</span>
      </div>
      <div className="card-body p-6 pb-8 md:pb-6 font-mono text-sm md:text-base leading-relaxed text-black antialiased relative">
        {children}
        {source && (
          <div className="absolute bottom-1 right-4 text-[8px] md:text-[9px] text-black/50 uppercase tracking-widest font-mono pointer-events-none select-none text-right">
            {t.ui.source}: {source}
          </div>
        )}
      </div>
    </div>
  );
};

export const LegalNote = ({ term, children }: { term: string, children: React.ReactNode }) => (
  <div className="alert my-10 flex gap-4 p-5 bg-primary/20 border-2 border-black border-l-[6px] rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-left relative z-10">
    <div className="text-black/40">
      <Scale size={32} strokeWidth={1.5} />
    </div>
    <div className="flex flex-col">
      <strong className="block font-display font-black uppercase text-black text-lg mb-2">{term}</strong>
      <div className="text-black text-sm leading-relaxed font-mono italic">{children}</div>
    </div>
  </div>
);

export const FormattedText = ({ text }: { text: string }) => {
  if (!text) return null;
  // Match **bold**, ==yellow highlight==, !!red highlight!!, __underline__, ++black underline++, ~~red underline~~, and newlines
  const parts = text.split(/(\*\*.*?\*\*|==.*?==|!!.*?!!|__.*?__|\+\+.*?\+\+|~~.*?~~|\n)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part === '\n') return <br key={i} />;
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-black">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('==') && part.endsWith('==')) {
          return <mark key={i} className="bg-primary/80 px-1 font-black text-black box-decoration-clone">{part.slice(2, -2)}</mark>;
        }
        if (part.startsWith('!!') && part.endsWith('!!')) {
          return <span key={i} className="badge badge-error rounded-none font-black text-white shadow-sm box-decoration-clone inline-block leading-tight px-1 h-auto py-0">{part.slice(2, -2)}</span>;
        }
        if (part.startsWith('__') && part.endsWith('__')) {
          return <span key={i} className="underline decoration-primary decoration-4 underline-offset-4">{part.slice(2, -2)}</span>;
        }
        if (part.startsWith('++') && part.endsWith('++')) {
          return <span key={i} className="underline decoration-neutral decoration-2 underline-offset-4">{part.slice(2, -2)}</span>;
        }
        if (part.startsWith('~~') && part.endsWith('~~')) {
          return <span key={i} className="underline decoration-error decoration-2 underline-offset-4">{part.slice(2, -2)}</span>;
        }
        return part;
      })}
    </>
  );
};

export const PullQuote = ({ quote, author, source }: { quote: string, author: string, source: string }) => (
  <div className="not-prose my-10 pl-6 border-l-[6px] border-black text-left relative z-10">
    <div className="absolute -left-3 top-0 bg-white p-1 text-black/20">
      <Quote size={24} fill="currentColor" />
    </div>
    <p className="font-serif text-xl md:text-2xl italic text-[#000000] leading-relaxed mb-3">
      „{quote}”
    </p>
    <div className="font-sans text-[10px] md:text-[11px] uppercase tracking-widest text-black/70 leading-relaxed">
      — <span className="font-bold text-black">{author}</span>, {source}
    </div>
  </div>
);

export const LocationStampUI = ({ name, code, plot, lv, href, t }: { name: string, code: string, plot: string, lv: string, href?: string, t: any }) => {
  const content = (
    <>
      <div className="bg-neutral/5 h-full p-3 flex items-center justify-center border-r-2 border-black border-dashed text-black/40 group-hover:text-black transition-colors">
        <MapPin size={24} strokeWidth={1.5} />
      </div>
      <div className="py-2">
        <div className="text-[9px] text-black/60 font-mono uppercase tracking-tighter leading-tight mb-1">
          LV: {lv} | {t.ui.locationPlot}: {plot}
        </div>
        <div className="font-mono text-sm font-black text-black uppercase leading-none mb-1">{name}</div>
        <div className="text-[9px] text-black/60 font-mono uppercase tracking-tighter leading-tight">
          {code}
        </div>
      </div>
    </>
  );

  const className = "stats relative z-10 border-2 border-black bg-base-100 p-1 pr-6 rounded-sm flex items-center gap-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-primary/20 transition-colors text-left group max-w-[280px] cursor-pointer";

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <div className={className}>
      {content}
    </div>
  );
};

export const TransactionStampUI = ({ label, value, subDetails }: { label: string, value: string, subDetails?: string }) => (
  <div className="stats relative z-10 border-2 border-black bg-base-100 p-1 pr-6 rounded-sm flex items-center gap-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-primary/20 transition-colors text-left group max-w-[280px]">
     <div className="bg-neutral/5 h-full p-3 flex items-center justify-center border-r-2 border-black border-dashed text-black/40 group-hover:text-black transition-colors">
        <Stamp size={24} strokeWidth={1.5} />
     </div>
     <div className="py-2">
        <div className="text-[9px] uppercase tracking-[0.2em] text-black font-bold mb-1">{label}</div>
        <div className="font-mono text-sm font-black text-black uppercase leading-none mb-1">{value}</div>
        {subDetails && <div className="text-[9px] text-black/60 font-mono mt-1 uppercase leading-tight">{subDetails}</div>}
     </div>
  </div>
);
