import React from 'react';
import { CaseFile, LegalNote, PullQuote, FormattedText } from './InvestigativeUI';
import { getDictionary } from '@/app/(localized)/[lang]/dictionaries';

export const ProkuraturaArticle = async ({ lang }: { lang: 'pl' | 'en' | 'es' }) => {
  const t = await getDictionary(lang);

  return (
    <article className="max-w-3xl mx-auto px-6 pt-4 pb-0 flex-grow w-full z-10 relative">
      <div
        className="prose prose-stone prose-lg max-w-none article-prose font-serif text-lg leading-relaxed"
        style={{ color: '#000000', opacity: 1, WebkitFontSmoothing: 'none' }}
      >
        <p className="drop-cap mt-0">
          <FormattedText text={t.prokuratura.p1} />
        </p>

        <p className="mt-4">
          <FormattedText text={t.prokuratura.p2} />
        </p>

        <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">{t.prokuratura.sectionMissingEvidence}</h2>

        <p className="mt-4">
          <FormattedText text={t.prokuratura.p3} />
        </p>

        <CaseFile title={t.prokuratura.caseFileReportTitle} type="evidence" source={lang === 'pl' ? "Notatka służbowa policji" : lang === 'en' ? "Police official note" : "Nota oficial de la policía"} t={t}>
          <FormattedText text={t.prokuratura.caseFileReport} />
        </CaseFile>

        <p className="mt-4">
          <FormattedText text={t.prokuratura.p4} />
        </p>

        <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">{t.prokuratura.sectionInvestigation}</h2>

        <p className="mt-4">
          <FormattedText text={t.prokuratura.p5} />
        </p>

        <PullQuote
          quote={t.prokuratura.pullQuoteSpokesman}
          author={t.prokuratura.spokesmanTitle}
          source={t.prokuratura.spokesmanSource}
        />

        <p className="mt-4">
          <FormattedText text={t.prokuratura.p6} />
        </p>

        <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">{t.prokuratura.sectionDejaVu}</h2>

        <p className="mt-4">
          <FormattedText text={t.prokuratura.p7} />
        </p>

        <p className="mt-4">
          <FormattedText text={t.prokuratura.p8} /> <span className="bg-[#e8d154]/80 px-1 font-black text-black box-decoration-clone">"<FormattedText text={t.prokuratura.noteNote} />"</span>
        </p>

        <CaseFile title={t.prokuratura.caseFileReport2Title} type="evidence" source={lang === 'pl' ? "Archiwum Prokuratury Rejonowej" : lang === 'en' ? "District Prosecutor's Office Archive" : "Archivo de la Fiscalía de Distrito"} t={t}>
          <FormattedText text={t.prokuratura.caseFileReport2} />
        </CaseFile>

        <p className="mt-4 leading-tight">
          <FormattedText text={t.prokuratura.p9} />
          <br />
          <span className="bg-red-600 px-1 font-black text-white shadow-sm box-decoration-clone inline-block">
            <FormattedText text={t.prokuratura.p9Conclusion} />
          </span>
        </p>

        <LegalNote term={t.prokuratura.legalNoteRecidivism}>
          <FormattedText text={t.prokuratura.legalNoteRecidivismDesc} />
        </LegalNote>

        <p className="mt-4">
          <FormattedText text={t.prokuratura.p10} />
        </p>

        <div className="not-prose mt-12 mb-4 flex justify-end relative z-10">
          <div className="text-right border-r-4 border-black pr-4">
            <span className="block font-black text-black uppercase text-xl font-display tracking-widest leading-none">{t.prokuratura.signatureName}</span>
            <span className="block text-[10px] text-black/60 font-mono mt-1 uppercase tracking-tighter leading-tight">{t.prokuratura.signatureTitle}</span>
            <span className="block text-[10px] text-black/40 font-mono mt-0.5 italic lowercase tracking-tight">marlow@nasza-gazetka.pl</span>
          </div>
        </div>

        <div className="not-prose mt-16 mb-12 border-y-4 border-black py-8 bg-[#e8d154]/10 relative z-10">
          <h3 className="font-display font-black text-2xl uppercase tracking-widest text-black mb-8 flex items-center gap-2 px-4">
            <span>📂</span> {t.prokuratura.statusTitle}
          </h3>

          <div className="grid gap-4 px-4">
            <div className="border-2 border-black bg-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div>
                <span className="block font-display text-black font-bold uppercase">{t.prokuratura.caseEconomic}</span>
                <span className="block text-xs text-black/60 mt-1 font-mono">{t.prokuratura.caseEconomicStatus}</span>
              </div>
              <span className="font-mono text-sm font-black bg-black text-white px-4 py-2 border border-black tracking-widest">
                {t.prokuratura.noData}
              </span>
            </div>

            <div className="border-2 border-black bg-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div>
                <span className="block font-display text-black font-bold uppercase">{t.prokuratura.caseBurglary}</span>
                <span className="block text-xs text-black/60 mt-1 font-mono">{t.prokuratura.caseBurglaryStatus}</span>
              </div>
              <span className="font-mono text-sm font-black bg-red-600 text-white border-2 border-black px-4 py-2 tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                {t.prokuratura.lost}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
