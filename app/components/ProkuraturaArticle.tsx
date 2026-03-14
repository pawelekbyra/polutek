import React from 'react';
import { CaseFile, LegalNote, PullQuote } from './InvestigativeUI';

export const ProkuraturaArticle = ({ dict }: { dict: any }) => {
  const t = dict.prokuratura;
  const ui = dict.ui;

  return (
    <article className="max-w-3xl mx-auto px-6 pt-4 pb-0 flex-grow w-full z-10 relative">
      <div
        className="prose prose-stone prose-lg max-w-none article-prose font-serif text-lg leading-relaxed"
        style={{ color: '#000000', opacity: 1, WebkitFontSmoothing: 'none' }}
      >
        <p className="drop-cap mt-0">
          {t.lead_wa}
        </p>

        <p className="mt-4">
          {t.p1}
        </p>

        <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">{t.sec_disappearing}</h2>

        <p className="mt-4">
          {t.p2}
        </p>

        <CaseFile title={t.report_title} type="evidence" source={t.report_source} dict={ui}>
          {t.report_content}
        </CaseFile>

        <p className="mt-4">
          {t.p3}
        </p>

        <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">{t.sec_investigation}</h2>

        <p className="mt-4">
          {t.p4}
        </p>

        <PullQuote
          quote={t.spokesman_quote}
          author={t.spokesman_title}
          source={t.spokesman_event}
        />

        <p className="mt-4">
          {t.p5}
        </p>

        <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">{t.sec_dejavu}</h2>

        <p className="mt-4">
          {t.p6}
        </p>

        <p className="mt-4">
          {t.p7}
        </p>

        <CaseFile title={t.report2_title} type="evidence" source={t.report2_source} dict={ui}>
          {t.report2_content}
        </CaseFile>

        <p className="mt-4 leading-tight">
          {t.conclusion_h}
          <br />
          <span className="bg-red-600 px-1 font-black text-white shadow-sm box-decoration-clone inline-block">
            {t.conclusion_highlight}
          </span>
        </p>

        <LegalNote term={t.legal_note_recidivism_title}>
          {t.legal_note_recidivism}
        </LegalNote>

        <p className="mt-4">
          {t.p8}
        </p>

        <div className="not-prose mt-12 mb-4 flex justify-end relative z-10">
          <div className="text-right border-r-4 border-black pr-4">
            <span className="block font-black text-black uppercase text-xl font-display tracking-widest leading-none">{t.journalist_wa}</span>
            <span className="block text-[10px] text-black/60 font-mono mt-1 uppercase tracking-tighter leading-tight">{t.journalist_wa_title}</span>
            <span className="block text-[10px] text-black/40 font-mono mt-0.5 italic lowercase tracking-tight">marek.archiwista@protonmail.com</span>
          </div>
        </div>

        <div className="not-prose mt-16 mb-12 border-y-4 border-black py-8 bg-[#e8d154]/10 relative z-10">
          <h3 className="font-display font-black text-2xl uppercase tracking-widest text-black mb-8 flex items-center gap-2 px-4">
            <span>📂</span> {t.sec_status_wa}
          </h3>

          <div className="grid gap-4 px-4">
            <div className="border-2 border-black bg-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div>
                <span className="block font-display text-black font-bold uppercase">{t.case_123_title}</span>
                <span className="block text-xs text-black/60 mt-1 font-mono">{t.case_123_status}</span>
              </div>
              <span className="font-mono text-sm font-black bg-black text-white px-4 py-2 border border-black tracking-widest">
                {t.case_123_badge}
              </span>
            </div>

            <div className="border-2 border-black bg-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div>
                <span className="block font-display text-black font-bold uppercase">{t.case_999_title}</span>
                <span className="block text-xs text-black/60 mt-1 font-mono">{t.case_999_status}</span>
              </div>
              <span className="font-mono text-sm font-black bg-red-600 text-white border-2 border-black px-4 py-2 tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                {t.case_999_badge}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
