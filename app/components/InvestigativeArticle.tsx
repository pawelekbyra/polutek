import React from 'react';
import { CaseFile, LegalNote, PullQuote, LocationStampUI, TransactionStampUI, FormattedText } from './InvestigativeUI';
import { ArticleVideoPlayer } from './InvestigativeMedia';
import { InteractiveSpan } from './InteractiveSpan';
import { GalleryProvider } from './GalleryContext';
import { getDictionary } from '../[lang]/dictionaries';

const PINATA_GATEWAY = "https://yellow-elegant-porpoise-917.mypinata.cloud/ipfs";
const KORDYS_PDF_URL = "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/wyrokKordysa/wyrok-jaroslawa-kordysa-30-t-5-2021-28-01-2022.pdf";
const DOCUMENTATION_IPFS_URL = `${PINATA_GATEWAY}/bafybeicnxlo366f6fznm5p6j7j7j7j7j7j7j7j7j7j7j7j7j7j7j7j7j7j`;
const JANOV_PDF_URL = DOCUMENTATION_IPFS_URL;
const NYDEK_PDF_URL = DOCUMENTATION_IPFS_URL;
const TRIBU_NYDEK_WAYBACK_URL = "https://web.archive.org/web/20180701000000*/www.tribunydek.com";

const ARREST_VIDEO_URL = "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/jaroslaw-karolina-kordys-aresztowanie-zatrzymanie-ayahuasca-hermanovice-2020.mp4";
const STEFANEK_VIDEO_URL = "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/historia-powstania-osady-natury-zew-w-gruncie-ruchu-stefan.mp4";
const KICINSKI_VIDEO_URL = "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/intencja-swiadomosc-sprawczosci-michal-kicinski-qa-festiwal-wibracje.mp4";

const KORDYS_COVER = "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/kordys-aresztowanie-cover-photo.png";

const ONET_ARTICLE_URL = "https://wiadomosci.onet.pl/kraj/smierc-podczas-ceremonii-ayahuaski-wstrzasajace-kulisy/7e8e5x5";
const ONET_INVESTIGATION_URL = "https://wiadomosci.onet.pl/tylko-w-onecie/ujawniamy-szamanskie-ceremonie-tajemnicza-smierc-i-miliarderzy-od-wiedzmina/hdxsqdq";
const NYDEK_CADASTRAL_URL = "https://nahlizenidokn.cuzk.gov.cz/ZobrazObjekt.aspx?encrypted=NAHL~HzwvTudnvFVyH2v2DgIY058_1nN6gGpNDAvsLklPjNR5Mp_Oq_Fi9nHrDZdkU9y9GjVXaqbSuuYVc435bFSDklMy2IdfOtCyqzfDiZ9Fs5xcBRXy_EQY_DtxlD4oaDXe99t6mMV0K2iQipgpnDL45rdj3m7so5wXsxXsna0peW21BZ8oDcn-oCC_GPUmYMZkKLi2HlgoMpiC0QcV8k6VPPzD2fF1zH8rkRCGVfo--cZbizU4Je5atQoaRJ0h4Btd";
const JANOV_BUYOUT_CADASTRAL_URL = "https://nahlizenidokn.cuzk.gov.cz/ZobrazObjekt.aspx?encrypted=NAHL~jk3kaNPeol_6EgW14KqJDSmcC9KeRpgml1z2x2yDMVICfISMq1_XgQDyvfDDC5CYc3zUjC_t0wwqbIK0G6HqHi7HjXtVuYkM2vgddOiUXuXyvvlbp6LTx2mQgEWLk0O9S5n2cNg_XqpGU0QWq-HgMC7RreBwWqFJ7LGguJsL9TrBkQv-ttgNk68XRNZBIrouFSlRz8qqFSvmvaxxW3VnbmOgphhjyjACItJvT6F_08e7WELPeJRhIBWMJdrLKbi7";

export const InvestigativeArticle = async ({ lang }: { lang: 'pl' | 'en' | 'es' }) => {
  const t = await getDictionary(lang);

  return (
    <GalleryProvider ui={t.ui}>
      <article className="max-w-3xl mx-auto px-6 pt-4 pb-0 flex-grow w-full z-10 relative">
        <div
          className="prose prose-stone prose-lg max-w-none article-prose font-serif text-lg leading-relaxed"
          style={{ color: '#000000', opacity: 1, WebkitFontSmoothing: 'none' }}
        >
          <p className="drop-cap mt-0">
            <FormattedText text={t.article.p1} />
          </p>

          <p className="mt-4">
            <FormattedText text={t.article.p2} /> <a href="https://krytykapolityczna.pl/narkopolityka/polacy-ayahuasca-czechy/" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:bg-[#e8d154]/50 transition-colors rounded px-1" title={lang === 'pl' ? "Kliknij, aby zobaczyć archiwalny dowód" : lang === 'en' ? "Click to see archival evidence" : "Haga clic para ver la evidencia de archivo"}>🌐</a>
          </p>

          <p className="mt-4">
            <FormattedText text={t.article.p3} />
          </p>

          <p className="mt-4">
            <FormattedText text={t.article.p4} />
          </p>

          <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">{t.article.sectionWitnessB}</h2>

          <p className="mt-4">
            <FormattedText text={t.article.pWitnessB1} /> <InteractiveSpan type="kordys" title={lang === 'pl' ? "Kliknij, aby zobaczyć wyrok" : lang === 'en' ? "Click to see verdict" : "Haga clic para ver la sentencia"}>📄</InteractiveSpan>
          </p>

          <CaseFile title={t.article.caseFileWitnessBTitle} type="transcript" source={t.sources.kordysVerdict} t={t}>
            <FormattedText text={t.article.caseFileWitnessB1} />
          </CaseFile>

          <p className="mt-4">
            <FormattedText text={t.article.pWitnessB2} />
          </p>

          <CaseFile title={t.article.caseFileWitnessB2Title} source={t.sources.kordysVerdict} t={t}>
            <FormattedText text={t.article.caseFileWitnessB2} />
          </CaseFile>

          <p className="mt-4">
            <FormattedText text={t.article.pWitnessB3} />
          </p>

          <CaseFile title={t.article.caseFileOwnershipTitle} source={t.sources.kordysVerdict} t={t}>
            <FormattedText text={t.article.caseFileOwnership} />
          </CaseFile>


          <div className="not-prose my-8 flex justify-start">
              <LocationStampUI
                name="JANOV 252"
                code={lang === 'pl' ? "793 84 Czechy" : lang === 'en' ? "793 84 Czech Republic" : "793 84 República Checa"}
                plot="252793"
                lv="84"
                href="https://nahlizenidokn.cuzk.gov.cz/ZobrazObjekt.aspx?encrypted=NAHL~Ph1DBACX9hLEB6fts7JCaqzjwc-8Bm-FsLqDU8eePrzOZO_6ESWYq0fvwpyG2abQ9P1fCqZ_nqCtiHrQZWDcmetevryGohKCWXt1aFERNJbL_Omfu5XpBU30m_2IBOi9q4EcsPuNRyji8T8H8_hlY1SVJWGkDU6qn-jdDoP4DabZL2GxttqvHoRZb3ZS3pL_Ymbhzg1IoE7bNihOQVHxO1mqvj7tsbDFZocoY_C-KM8vAuKtZUO_akQJsw4LUoB1"
                t={t}
              />
          </div>

          <p className="mt-4">
            <FormattedText text={t.article.pOwnershipKicinski} /><InteractiveSpan type="wlasnosc-kicinski" title={lang === 'pl' ? "Kliknij, aby zobaczyć dokument" : lang === 'en' ? "Click to see document" : "Haga clic para ver el documento"}>👁️</InteractiveSpan>:
            <br/><br/>
            <FormattedText text={t.article.pOwnershipKicinskiDetails} /><br/>
          </p>

          <p className="mt-4 leading-tight">
            <FormattedText text={t.article.pOwnershipKicinskiConclusion1} />
            <br />
            <FormattedText text={t.article.pOwnershipKicinskiConclusion2} />
          </p>

          <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">{t.article.sectionEavesdropping}</h2>

          <p className="mt-4">
            <FormattedText text={t.article.pEavesdropping1} />
          </p>

          <p className="mt-4">
            <FormattedText text={t.article.pEavesdropping2} />
          </p>

          <CaseFile title={t.article.caseFileConversationTitle} type="transcript" source={t.sources.kordysVerdict} t={t}>
            <FormattedText text={t.article.caseFileConversation} />
          </CaseFile>

          <p className="mt-4">
            <FormattedText text={t.article.pEavesdropping3} />
          </p>

          <CaseFile title={t.article.caseFileQuestionTitle} type="transcript" source={t.sources.kordysVerdict} t={t}>
            <FormattedText text={t.article.caseFileQuestion} />
          </CaseFile>

          <div className="not-prose my-12 pl-6 border-l-[6px] border-black font-serif italic text-2xl text-[#000000] leading-relaxed relative z-10">
            <FormattedText text={t.article.quoteConversationText} />
            <div className="text-left text-[10px] uppercase tracking-widest text-black/50 mt-4 font-mono not-italic">
              <FormattedText text={t.article.quoteConversationSource} />
            </div>
          </div>

          <p className="mt-4">
            <FormattedText text={t.article.pEavesdropping4} />
          </p>

          <p className="mt-4">
            <FormattedText text={t.article.pEavesdropping5} />
          </p>

          <CaseFile title={t.article.caseFileContinuationTitle} type="transcript" source={t.sources.kordysVerdict} t={t}>
            <FormattedText text={t.article.caseFileContinuation} />
          </CaseFile>

          <p className="mt-4">
            <FormattedText text={t.article.pEavesdropping6} />
          </p>

          <p className="mt-4">
            <FormattedText text={t.article.pEavesdropping7} />
          </p>

          <CaseFile title={t.article.caseFileSearchTitle} source={t.sources.kordysVerdict} t={t}>
            <FormattedText text={t.article.caseFileSearch} />
          </CaseFile>

          <p className="mt-4">
            <FormattedText text={t.article.pEavesdropping8} />
          </p>

          <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">{t.article.sectionPriceOfFreedom}</h2>

          <p className="mt-4">
            <FormattedText text={t.article.pPriceOfFreedom1} />
          </p>

          <p className="mt-4">
            <FormattedText text={t.article.pPriceOfFreedom2} />
          </p>

          <div className="not-prose my-8">
            <ArticleVideoPlayer src={ARREST_VIDEO_URL} poster={KORDYS_COVER} ariaLabel={t.ui.videoCaptionLabel} />
            <div className="mt-4 text-sm text-black font-mono border-l-[4px] border-black pl-4 bg-[#e8d154]/20 py-2 relative z-10">
              <span className="font-black uppercase text-xs mr-2">{t.ui.videoOperationalLabel}</span>
              {t.article.videoArrestCaption}
            </div>
          </div>

          <p className="mt-4">
            <FormattedText text={t.article.pPriceOfFreedom3} />
          </p>

          <LegalNote term="Dohoda o vině">
            <FormattedText text={t.article.legalNoteDohoda} />
          </LegalNote>

          <p className="mt-4">
            <FormattedText text={t.article.pPriceOfFreedom4} />
          </p>

          <p className="mt-4">
            <FormattedText text={t.article.pPriceOfFreedom5} />
          </p>

          <p className="mt-4">
            <FormattedText text={t.article.pPriceOfFreedom6} />
          </p>

          <p className="mt-4">
            <FormattedText text={t.article.pPriceOfFreedom7} /> <InteractiveSpan type="badowski" title={lang === 'pl' ? "Kliknij, aby zobaczyć wyrok" : lang === 'en' ? "Click to see verdict" : "Haga clic para ver la sentencia"}>📄</InteractiveSpan>
          </p>

          <CaseFile title={t.article.caseFileBadowskiVerdictTitle} source={t.sources.kordysVerdict} t={t}>
            <FormattedText text={t.article.caseFileBadowskiVerdict} />
          </CaseFile>

          <p className="mt-4">
            <FormattedText text={t.article.pPriceOfFreedom8} />
          </p>

          <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">{t.article.sectionSilence}</h2>

          <p className="mt-4">
            <FormattedText text={t.article.pSilence1} />
          </p>

          <p className="mt-4">
            <FormattedText text={t.article.pSilence2} />
          </p>

          <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">{t.article.sectionKicinski}</h2>

          <p className="mt-4">
            <FormattedText text={t.article.pKicinski1} />
          </p>

          <PullQuote
            quote={t.article.pullQuoteKicinski}
            author="Michał Kiciński"
            source={t.sources.kicinskiNewsweek}
          />

          <div className="not-prose my-8">
            <ArticleVideoPlayer src={KICINSKI_VIDEO_URL} ariaLabel={t.ui.videoCaptionLabel} />
            <div className="mt-4 text-sm text-black font-mono border-l-[4px] border-black pl-4 bg-[#e8d154]/20 py-2 relative z-10">
              <span className="font-black uppercase text-xs mr-2">{t.ui.videoSourceLabel}</span>
              {t.article.videoKicinskiCaption}
            </div>
          </div>

          <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">{t.article.sectionErrorWithBadi}</h2>

          <p className="mt-4">
            <FormattedText text={t.article.pErrorWithBadi1} />
          </p>

          <p className="mt-4">
            <FormattedText text={t.article.pErrorWithBadi2} />
          </p>

          <CaseFile title={t.article.caseFileEmailTitle} type="email" source="ONET.PL" t={t}>
            <FormattedText text={t.article.caseFileEmail} />
          </CaseFile>

          <p className="mt-4">
            <FormattedText text={t.article.pErrorWithBadi3} />
          </p>

          <CaseFile title={t.article.caseFileStatementTitle} source="ONET.PL" t={t}>
            <FormattedText text={t.article.caseFileStatement} />
          </CaseFile>

          <p className="mt-4">
            <FormattedText text={t.article.pErrorWithBadi4} />
          </p>

          <CaseFile title={t.article.caseFileParticipationTitle} source="ONET.PL" t={t}>
            <FormattedText text={t.article.caseFileParticipation} />
          </CaseFile>

          <p className="mt-4">
            <FormattedText text={t.article.pKicinskiPeru} />
          </p>

          <p className="mt-4">
            <FormattedText text={t.article.pKicinskiPeru2} /> <a href="https://munaysonqo.com/all-retreats/#calendar-7a66adc3-3ebd-432c-b572-0faf936c281f-event-e90d5161-a00e-4742-b4b7-039de153a23d" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:bg-[#e8d154]/50 transition-colors rounded px-1" title={lang === 'pl' ? "Kliknij, aby otworzyć stronę ośrodka Munay Sonqo" : lang === 'en' ? "Click to open Munay Sonqo center website" : "Haga clic para abrir el sitio web del centro Munay Sonqo"}>🌐</a>
          </p>

          <p className="mt-4">
            <FormattedText text={t.article.pKicinskiPeru3} />
          </p>

          <p className="mt-4">
            <FormattedText text={t.article.pBadowskiCorrespondence} />
          </p>

          <CaseFile title={t.article.caseFileBadowskiEmailTitle} type="email" source="Bartosz Badowski" t={t}>
            <FormattedText text={t.article.caseFileBadowskiEmail} />
          </CaseFile>

          <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">{t.article.sectionPhilanthropist}</h2>

          <p className="mt-4">
            <FormattedText text={t.article.pPhilanthropist1} />
          </p>

          <p className="mt-4">
            <FormattedText text={t.article.pPhilanthropist2} />
          </p>

          <CaseFile title={t.article.caseFileStefanekTitle} source={t.sources.stefanekYT} t={t}>
            <FormattedText text={t.article.caseFileStefanek} />
          </CaseFile>

          <p className="mt-4">
            <FormattedText text={t.article.pPhilanthropist3} />
          </p>

          <div className="not-prose my-8">
            <ArticleVideoPlayer src={STEFANEK_VIDEO_URL} ariaLabel={t.ui.videoCaptionLabel} />
            <div className="mt-4 text-sm text-black font-mono border-l-[4px] border-black pl-4 bg-[#e8d154]/20 py-2 relative z-10">
              <span className="font-black uppercase text-xs mr-2">{t.ui.videoSourceLabel}</span>
              {t.article.videoStefanekCaption}
            </div>
          </div>

          <p className="mt-4 mb-8">
            <FormattedText text={t.article.pPhilanthropist4} />
          </p>

          <ul className="not-prose list-none space-y-10 my-12 font-mono text-sm border-l-4 border-black pl-6 relative z-10">
            <li className="flex items-start gap-4">
              <span className="text-xl">📅</span>
              <div>
                <strong className="font-black text-base">{lang === 'pl' ? "21 września 2023 r." : lang === 'en' ? "September 21, 2023" : "21 de septiembre de 2023"}</strong><br/>
                <FormattedText text={t.article.timelineItem1} />
              </div>
            </li>

            <li className="flex items-start gap-4">
              <span className="text-xl">📅</span>
              <div>
                <strong className="font-black text-base">{lang === 'pl' ? "3 października 2023 r." : lang === 'en' ? "October 3, 2023" : "3 de octubre de 2023"}</strong><br/>
                <FormattedText text={t.article.timelineItem2} /><InteractiveSpan type="cena" title={lang === 'pl' ? "Kliknij, aby zobaczyć dokument" : lang === 'en' ? "Click to see document" : "Haga clic para ver el documento"}>👁️</InteractiveSpan>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <span className="text-xl">📅</span>
              <div>
                <strong className="font-black text-base">{lang === 'pl' ? "11 października 2023 r." : lang === 'en' ? "October 11, 2023" : "11 de octubre de 2023"}</strong><br/>
                <FormattedText text={t.article.timelineItem3} />
              </div>
            </li>

            <li className="flex items-start gap-4 mt-6">
              <span className="text-xl mt-4">⚠️</span>
              <div className="bg-[#e8d154]/30 border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full">
                <strong className="font-black text-base font-sans">{t.article.timelineItem4Title}</strong><br/>
                <FormattedText text={t.article.timelineItem4Text} />
              </div>
            </li>

            <li className="flex items-start gap-4 mt-6">
              <span className="text-xl">📅</span>
              <div>
                <strong className="font-black text-base">{lang === 'pl' ? "21 grudnia 2023 r." : lang === 'en' ? "December 21, 2023" : "21 de diciembre de 2023"}</strong><br/>
                <FormattedText text={t.article.timelineItem5} />
              </div>
            </li>
          </ul>

          <p className="mt-4">
            <FormattedText text={t.article.pPhilanthropist5} />
          </p>

          <div className="not-prose my-8 flex justify-start">
             <TransactionStampUI
              label={t.ui.transactionLabel}
              value="V-5821/2023-127"
              subDetails={`${t.ui.precinctLabel}: Janov u Krnova [656976]`}
            />
          </div>

          <p className="mt-4">
            <FormattedText text={t.article.pPhilanthropist6} />
          </p>

          <p className="mt-4">
            <FormattedText text={t.article.pPhilanthropist7} />
          </p>

          <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">{t.article.sectionNydek}</h2>

          <p className="mt-4">
            <FormattedText text={t.article.pNydek1} /> <a href={NYDEK_PDF_URL} target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:bg-[#e8d154]/50 transition-colors rounded px-1" title={lang === 'pl' ? "Kliknij, aby zobaczyć dokumentację" : lang === 'en' ? "Click to see documentation" : "Haga clic para ver la documentación"}>📸</a>
          </p>

          <p className="mt-4">
            <FormattedText text={t.article.pNydek2} /> <a href={TRIBU_NYDEK_WAYBACK_URL} target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:bg-[#e8d154]/50 transition-colors rounded px-1" title={lang === 'pl' ? "Kliknij, aby zobaczyć archiwalny dowód" : lang === 'en' ? "Click to see archival evidence" : "Haga clic para ver la evidencia de archivo"}>🔍</a>
          </p>

          <p className="not-prose mt-4 font-bold text-center my-8 uppercase font-sans text-black">
            <FormattedText text={t.article.pNydekQuestion} />
          </p>

          <p className="mt-4">
            <FormattedText text={t.article.pNydek3} />
          </p>

          <div className="not-prose my-8 flex justify-start">
              <LocationStampUI
                name="NYDEK 120"
                code={lang === 'pl' ? "739 95 Czechy" : lang === 'en' ? "739 95 Czech Republic" : "739 95 República Checa"}
                plot="120739"
                lv="95"
                href="https://nahlizenidokn.cuzk.gov.cz/ZobrazObjekt.aspx?encrypted=NAHL~uQr6_qGGFNbscI31qkCFl1vpVRu3o8TWYak_iMPnq4Xni8IKqU6i2gAeUccVcXY0cblWyhwAnpIfk_96Mg7yOtHNymugDk5IKqRCxXKsDVSaFSQDLQ1U0IhqdBk9LlCR_I0UG5TUns3dt8PYkjaBZnRbrrTdSTBlGm3NYz5s3Fs57qfwSIALL3wiNHX8YWmHNt4frIIWhALPhA00bxPjexuiQ2JTZo1a4_lgJyZNUq8_lkKhHRCtuhwUvhv7ZIDD"
                t={t}
              />
          </div>

          <p className="mt-4">
            <FormattedText text={t.article.pNydekConclusion} />
          </p>

          <p className="mt-4">
            <FormattedText text={t.article.pNydek4} />
          </p>

          <ul className="not-prose list-none space-y-10 my-12 font-mono text-sm border-l-4 border-black pl-6 relative z-10 text-black">
             <li className="flex items-start gap-4">
              <span className="text-xl">📅</span>
            <div>
              <strong className="font-black text-base block">{lang === 'pl' ? "25 stycznia 2016 r." : lang === 'en' ? "January 25, 2016" : "25 de enero de 2016"}</strong>
              <span className="block leading-tight">
                <FormattedText text={t.article.timelineNydekItem1} /><InteractiveSpan type="cena-nydek" title={lang === 'pl' ? "Kliknij, aby zobaczyć dokument" : lang === 'en' ? "Click to see document" : "Haga clic para ver el documento"}>👁️</InteractiveSpan>
              </span>
              <span className="block leading-tight">
                <FormattedText text={t.article.timelineNydekItem1Details} />
              </span>
            </div>
             </li>

             <li className="flex items-start gap-4">
              <span className="text-xl">📅</span>
              <div>
                <strong className="font-black text-base">{lang === 'pl' ? "15 października 2020 r." : lang === 'en' ? "October 15, 2020" : "15 de octubre de 2020"}</strong><br/>
                <FormattedText text={t.article.timelineNydekItem2} />
              </div>
             </li>

            <li className="flex items-start gap-4">
              <span className="text-xl">📅</span>
              <div>
                <strong className="font-black text-base">{lang === 'pl' ? "15 czerwca 2021 r." : lang === 'en' ? "June 15, 2021" : "15 de junio de 2021"}</strong><br/>
                <FormattedText text={t.article.timelineNydekItem3} />
              </div>
            </li>
          </ul>

          <p className="mt-4">
            <FormattedText text={t.article.pNydek5} />
          </p>

          <div className="not-prose my-8 flex justify-start">
            <TransactionStampUI
              label={t.ui.transactionLabel}
              value="V-2937/2021-832"
              subDetails={`${t.ui.precinctLabel}: Nýdek [708186]`}
            />
          </div>

          <p className="mt-4">
            <FormattedText text={t.article.pNydek6} />
          </p>

          <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">{t.article.sectionWiktor}</h2>

          <p className="mt-4">
            <FormattedText text={t.article.pWiktor1} /> <a href={ONET_INVESTIGATION_URL} target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:bg-[#e8d154]/50 transition-colors rounded px-1" title={lang === 'pl' ? "Otwórz artykuł na Onet.pl" : lang === 'en' ? "Open article on Onet.pl" : "Abrir artículo en Onet.pl"}>🌐</a>
          </p>

          <p className="mt-4">
            <FormattedText text={t.article.pWiktor2} />
          </p>

          <p className="mt-4">
            <FormattedText text={t.article.pWiktor3} />
          </p>

          <p className="mt-4">
            <FormattedText text={t.article.pWiktor4} />
          </p>

          <p className="mt-4">
            <FormattedText text={t.article.pWiktor5} />
          </p>

          <p className="mt-4">
            <FormattedText text={t.article.pWiktor6} />
          </p>

          <p className="mt-4">
            <FormattedText text={t.article.pWiktor7} /><InteractiveSpan type="wiktor" title={lang === 'pl' ? "Kliknij, aby zobaczyć szczegóły" : lang === 'en' ? "Click to see details" : "Haga clic para ver detalles"}>🔍</InteractiveSpan>
          </p>

          <div className="not-prose mt-12 mb-4 flex justify-end relative z-10">
              <div className="text-right border-r-4 border-black pr-4">
                <span className="block font-black text-black uppercase text-xl font-display tracking-widest leading-none">{t.article.signatureName}</span>
                <span className="block text-[10px] text-black/60 font-mono mt-1 uppercase tracking-tighter leading-tight">{t.article.signatureTitle}</span>
                <span className="block text-[10px] text-black/40 font-mono mt-0.5 italic lowercase tracking-tight">marlow@nasza-gazetka.pl</span>
              </div>
          </div>

          <div className="not-prose mt-16 mb-0 border-y-4 border-black py-8 bg-[#e8d154]/10 relative z-10">
              <h3 className="font-display font-black text-2xl uppercase tracking-widest text-black mb-8 flex items-center gap-2 px-4">
                <span>🛡️</span> {t.article.legalStatusTitle}
              </h3>

              <div className="grid gap-4 px-4">
                <div className="border-2 border-black bg-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div>
                      <span className="block font-display text-black font-bold uppercase">{t.article.investigationCeremony}</span>
                      <span className="block text-xs text-black/60 mt-1 font-mono">{t.article.prosecutorCzestochowa}</span>
                    </div>
                    <span className="font-mono text-sm font-black bg-black text-white px-4 py-2 border border-black tracking-widest">
                      3013-1.Ds.15.2024
                    </span>
                </div>

                <div className="border-2 border-black bg-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div>
                      <span className="block font-display text-black font-bold uppercase">{t.article.investigationIlona}</span>
                      <span className="block text-xs text-black/60 mt-1 font-mono">{t.article.prosecutorCzestochowa}</span>
                    </div>
                    <span className="font-mono text-sm font-black bg-[#e8d154] text-black border-2 border-black px-4 py-2 tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      3013-1.Ds.4.2026
                    </span>
                </div>

                <div className="border-2 border-black bg-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div>
                      <span className="block font-display text-black font-bold uppercase">{t.article.investigationWiktor}</span>
                      <span className="block text-xs text-black/60 mt-1 font-mono">{t.article.prosecutorPultusk}</span>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="font-mono text-sm font-black bg-black/5 text-black px-4 py-2 border-2 border-black tracking-widest">
                         4027-0. Ds. 1254.2024
                      </span>
                      <div className="flex items-center gap-2">
                         <span className="text-[10px] font-black text-red-800 uppercase tracking-widest bg-red-100 px-2 py-1 border border-red-800 font-sans">{t.article.statusSuspended}</span>
                      </div>
                    </div>
                </div>
              </div>

              <div className="mt-8 px-4 text-xs text-black/70 font-mono text-center italic">
                {t.article.supervisionNote}
              </div>
          </div>

        </div>

        <footer className="mt-8 pt-0 font-mono relative z-10 mb-0">

           <div className="mb-10 text-center">
             <h3 className="text-3xl font-black text-black uppercase tracking-tighter font-display mb-4">
               {t.article.sourceDocumentsTitle}
             </h3>
             <p className="text-sm text-black/80 italic max-w-xl mx-auto font-serif">
               {t.article.sourceDocumentsSubtitle}
             </p>
           </div>

           <div className="grid gap-6 text-sm text-black">

             <div className="p-4 bg-white/40 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#e8d154]/10 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3 font-sans">
                  <div>
                    <h4 className="font-bold text-black text-base uppercase font-display tracking-widest">{t.article.sourceOnetTitle}</h4>
                    <p className="font-mono text-xs text-black/60 mt-1 font-black">{t.article.sourceOnetSubtitle}</p>
                  </div>
                  <a href={ONET_INVESTIGATION_URL} target="_blank" rel="noopener noreferrer" className="shrink-0 w-full sm:w-48 justify-center bg-[#e8d154] text-black px-4 py-2 text-xs font-black border-2 border-black hover:bg-white transition-colors flex items-center gap-2 uppercase tracking-widest text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    🌐 {t.article.readOnOnet}
                  </a>
                </div>
             </div>

             <div className="p-4 bg-white/40 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#e8d154]/10 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3 font-sans">
                  <div>
                    <h4 className="font-bold text-black text-base uppercase font-display tracking-widest">{t.article.sourceKordysVerdictTitle}</h4>
                    <p className="font-mono text-xs text-black/60 mt-1 font-black">{t.ui.caseRefLabel} 30 T 5/2020</p>
                  </div>
                  <a href={KORDYS_PDF_URL} target="_blank" rel="noopener noreferrer" className="shrink-0 w-full sm:w-48 justify-center bg-black text-white px-4 py-2 text-xs font-bold border-2 border-black hover:bg-white hover:text-black transition-colors flex items-center gap-2 uppercase tracking-widest text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    📄 {t.article.downloadPDF}
                  </a>
                </div>
                <div className="border-t-2 border-black/20 pt-3">
                  <a href="https://msp.gov.cz/web/krajsky-soud-v-ostrave/zakladni-informace/-/clanek/informace-rok-2022" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-black/70 hover:text-black flex items-center gap-2 uppercase tracking-widest underline decoration-2 underline-offset-4 font-sans">
                    🌐 {t.article.verifyOnMsp}
                  </a>
                </div>
             </div>

             <div className="p-4 bg-white/40 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#e8d154]/10 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3 font-sans">
                  <div>
                    <h4 className="font-bold text-black text-base uppercase font-display tracking-widest">{t.article.sourceBadowskiVerdictTitle}</h4>
                    <p className="font-mono text-xs text-black/60 mt-1 font-black">{t.ui.caseRefLabel} 66 T 146/2021</p>
                  </div>
                  <a href={`${PINATA_GATEWAY}/bafkreietkosain6ftde7f3li5ic34qhkwuglz2tu2kfcpbvrwhslskhwza`} target="_blank" rel="noopener noreferrer" className="shrink-0 w-full sm:w-48 justify-center bg-black text-white px-4 py-2 text-xs font-bold border-2 border-black hover:bg-white hover:text-black transition-colors flex items-center gap-2 uppercase tracking-widest text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    📄 {t.article.downloadPDF}
                  </a>
                </div>
                <div className="border-t-2 border-black/20 pt-3">
                  <a href="https://msp.gov.cz/documents/22409/2997339/29Si+25-2022+p%C5%99%C3%ADloha+%C4%8D.+1.pdf" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-black/70 hover:text-black flex items-center gap-2 uppercase tracking-widest underline decoration-2 underline-offset-4 font-sans">
                    🌐 {t.article.verifyOriginal} (29 Si 25/2022)
                  </a>
                </div>
             </div>

             <div className="p-4 bg-white/40 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#e8d154]/10 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3 font-sans">
                  <div>
                    <h4 className="font-bold text-black text-base uppercase font-display tracking-widest">{t.article.sourceNydekPurchaseTitle}</h4>
                    <p className="font-mono text-xs text-black/60 mt-1 font-black">{lang === 'pl' ? 'Sygnatura' : lang === 'en' ? 'Reference' : 'Referencia'}: V-320/2016-832</p>
                  </div>
                  <a href={NYDEK_CADASTRAL_URL} target="_blank" rel="noopener noreferrer" className="shrink-0 w-full sm:w-48 justify-center bg-black text-white px-4 py-2 text-xs font-bold border-2 border-black hover:bg-white hover:text-black transition-colors flex items-center gap-2 uppercase tracking-widest text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    🌐 {t.article.verifyInKatastr}
                  </a>
                </div>
                <div className="border-t-2 border-black/20 pt-2">
                  <p className="text-[9px] leading-tight text-black/70 font-mono uppercase">
                    {t.article.katastrNote}
                  </p>
                </div>
             </div>

             <div className="p-4 bg-white/40 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#e8d154]/10 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3 font-sans">
                  <div>
                    <h4 className="font-bold text-black text-base uppercase font-display tracking-widest">{t.article.sourceNydekSaleTitle}</h4>
                    <p className="font-mono text-xs text-black/60 mt-1 font-black">{lang === 'pl' ? 'Sygnatura' : lang === 'en' ? 'Reference' : 'Referencia'}: V-2937/2021</p>
                  </div>
                  <a href={NYDEK_PDF_URL} target="_blank" rel="noopener noreferrer" className="shrink-0 w-full sm:w-48 justify-center bg-black text-white px-4 py-2 text-xs font-bold border-2 border-black hover:bg-white hover:text-black transition-colors flex items-center gap-2 uppercase tracking-widest text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    📥 {t.article.downloadPDF}
                  </a>
                </div>
                <div className="border-t-2 border-black/20 pt-3 flex flex-col gap-2">
                  <a href={NYDEK_CADASTRAL_URL} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-black/70 hover:text-black flex items-center gap-2 uppercase tracking-widest underline decoration-2 underline-offset-4 font-sans">
                    🌐 {t.article.verifyInKatastr}
                  </a>
                  <p className="text-[9px] leading-tight text-black/70 font-mono uppercase">
                    {t.article.katastrNote}
                  </p>
                </div>
             </div>

             <div className="p-4 bg-white/40 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#e8d154]/10 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3 font-sans">
                  <div>
                    <h4 className="font-bold text-black text-base uppercase font-display tracking-widest">{t.article.sourceJanovBuyoutTitle}</h4>
                    <p className="font-mono text-xs text-black/60 mt-1 font-black">{lang === 'pl' ? 'Sygnatura' : lang === 'en' ? 'Reference' : 'Referencia'}: V-2031/2023-831</p>
                  </div>
                  <a href={JANOV_BUYOUT_CADASTRAL_URL} target="_blank" rel="noopener noreferrer" className="shrink-0 w-full sm:w-48 justify-center bg-black text-white px-4 py-2 text-xs font-bold border-2 border-black hover:bg-white hover:text-black transition-colors flex items-center gap-2 uppercase tracking-widest text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    🌐 {t.article.verifyInKatastr}
                  </a>
                </div>
                <div className="border-t-2 border-black/20 pt-3 flex flex-col gap-2">
                  <p className="text-[9px] leading-tight text-black/70 font-mono uppercase">
                    {t.article.katastrNote}
                  </p>
                </div>
             </div>

             <div className="p-4 bg-white/40 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#e8d154]/10 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3 font-sans">
                  <div>
                    <h4 className="font-bold text-black text-base uppercase font-display tracking-widest">{t.article.sourceWaybackTitle}</h4>
                    <p className="font-mono text-xs text-black/60 mt-1 font-black">Wayback Machine</p>
                  </div>
                  <a href={TRIBU_NYDEK_WAYBACK_URL} target="_blank" rel="noopener noreferrer" className="shrink-0 w-full sm:w-48 justify-center bg-[#e8d154] text-black px-4 py-2 text-xs font-black border-2 border-black hover:bg-white transition-colors flex items-center gap-2 uppercase tracking-widest text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-sans">
                    🕰️ {t.article.openArchive}
                  </a>
                </div>
             </div>

           </div>

           <div className="mt-10 text-center pb-12">
              <a href="https://www.nasza-gazetka.pl" target="_blank" rel="noopener noreferrer" className="inline-block font-serif text-base font-bold text-black/60 hover:text-black hover:bg-[#e8d154]/20 transition-all underline decoration-1 underline-offset-8 mt-4 px-4 py-2 tracking-[0.2em]">
                WWW.NASZA-GAZETKA.PL
              </a>
           </div>
        </footer>
      </article>
    </GalleryProvider>
  );
};
