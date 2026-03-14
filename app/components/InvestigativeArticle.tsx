import React from 'react';
import { CaseFile, LegalNote, PullQuote, LocationStampUI, TransactionStampUI } from './InvestigativeUI';
import { ArticleVideoPlayer } from './InvestigativeMedia';
import { InteractiveSpan } from './InteractiveSpan';
import { GalleryProvider } from './GalleryContext';

const PINATA_GATEWAY = "https://yellow-elegant-porpoise-917.mypinata.cloud/ipfs";
const KORDYS_PDF_URL = "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/wyrokKordysa/wyrok-jaroslawa-kordysa-30-t-5-2021-28-01-2022.pdf";
const DOCUMENTATION_IPFS_URL = `${PINATA_GATEWAY}/bafybeicnxlo366f6fznm5p6j7j7j7j7j7j7j7j7j7j7j7j7j7j7j7j7j7j`;
const TRIBU_NYDEK_WAYBACK_URL = "https://web.archive.org/web/20180701000000*/www.tribunydek.com";

const ARREST_VIDEO_URL = "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/jaroslaw-karolina-kordys-aresztowanie-zatrzymanie-ayahuasca-hermanovice-2020.mp4";
const STEFANEK_VIDEO_URL = "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/historia-powstania-osady-natury-zew-w-gruncie-ruchu-stefan.mp4";
const KICINSKI_VIDEO_URL = "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/intencja-swiadomosc-sprawczosci-michal-kicinski-qa-festiwal-wibracje.mp4";

const KORDYS_COVER = "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/kordys-aresztowanie-cover-photo.png";

const ONET_INVESTIGATION_URL = "https://wiadomosci.onet.pl/tylko-w-onecie/ujawniamy-szamanskie-ceremonie-tajemnicza-smierc-i-miliarderzy-od-wiedzmina/hdxsqdq";
const NYDEK_CADASTRAL_URL = "https://nahlizenidokn.cuzk.gov.cz/ZobrazObjekt.aspx?encrypted=NAHL~HzwvTudnvFVyH2v2DgIY058_1nN6gGpNDAvsLklPjNR5Mp_Oq_Fi9nHrDZdkU9y9GjVXaqbSuuYVc435bFSDklMy2IdfOtCyqzfDiZ9Fs5xcBRXy_EQY_DtxlD4oaDXe99t6mMV0K2iQipgpnDL45rdj3m7so5wXsxXsna0peW21BZ8oDcn-oCC_GPUmYMZkKLi2HlgoMpiC0QcV8k6VPPzD2fF1zH8rkRCGVfo--cZbizU4Je5atQoaRJ0h4Btd";
const JANOV_BUYOUT_CADASTRAL_URL = "https://nahlizenidokn.cuzk.gov.cz/ZobrazObjekt.aspx?encrypted=NAHL~jk3kaNPeol_6EgW14KqJDSmcC9KeRpgml1z2x2yDMVICfISMq1_XgQDyvfDDC5CYc3zUjC_t0wwqbIK0G6HqHi7HjXtVuYkM2vgddOiUXuXyvvlbp6LTx2mQgEWLk0O9S5n2cNg_XqpGU0QWq-HgMC7RreBwWqFJ7LGguJsL9TrBkQv-ttgNk68XRNZBIrouFSlRz8qqFSvmvaxxW3VnbmOgphhjyjACItJvT6F_08e7WELPeJRhIBWMJdrLKbi7";

export const InvestigativeArticle = ({ dict }: { dict: any }) => {
  const t = dict.article;
  const ui = dict.ui;

  return (
    <GalleryProvider dict={ui}>
      <article className="max-w-3xl mx-auto px-6 pt-4 pb-0 flex-grow w-full z-10 relative">
        <div
          className="prose prose-stone prose-lg max-w-none article-prose font-serif text-lg leading-relaxed"
          style={{ color: '#000000', opacity: 1, WebkitFontSmoothing: 'none' }}
        >
          <p className="drop-cap mt-0">
            {t.drop_cap}
          </p>

          <p className="mt-4">
            {t.p2} <a href="https://krytykapolityczna.pl/narkopolityka/polacy-ayahuasca-czechy/" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:bg-[#e8d154]/50 transition-colors rounded px-1" title={ui.click_to_see_evidence}>🌐</a>
          </p>

          <p className="mt-4">
            {t.p3}
          </p>

          <p className="mt-4">
            {t.p4}
          </p>

          <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">{t.sec_witness}</h2>

          <p className="mt-4">
            {t.witness_intro} <InteractiveSpan type="kordys" title={ui.click_to_see_judgment}>📄</InteractiveSpan>
          </p>

          <CaseFile title={t.witness_transcript_title} type="transcript" source={ui.case_ref + " 30 T 5/2020"} dict={ui}>
            {t.witness_transcript_content}
          </CaseFile>

          <p className="mt-4">
            {t.charges_intro}
          </p>

          <CaseFile title={t.charges_title} source={ui.case_ref + " 30 T 5/2020"} dict={ui}>
            {t.charges_content}
          </CaseFile>

          <p className="mt-4">
            {t.ownership_intro}
          </p>

          <CaseFile title={t.ownership_title} source={ui.case_ref + " 30 T 5/2020"} dict={ui}>
            <div dangerouslySetInnerHTML={{ __html: t.ownership_content }} />
          </CaseFile>


          <div className="not-prose my-8 flex justify-start">
              <LocationStampUI
                name="JANOV 252"
                code="793 84 Czechy"
                plot="252793"
                lv="84"
                href="https://nahlizenidokn.cuzk.gov.cz/ZobrazObjekt.aspx?encrypted=NAHL~Ph1DBACX9hLEB6fts7JCaqzjwc-8Bm-FsLqDU8eePrzOZO_6ESWYq0fvwpyG2abQ9P1fCqZ_nqCtiHrQZWDcmetevryGohKCWXt1aFERNJbL_Omfu5XpBU30m_2IBOi9q4EcsPuNRyji8T8H8_hlY1SVJWGkDU6qn-jdDoP4DabZL2GxttqvHoRZb3ZS3pL_Ymbhzg1IoE7bNihOQVHxO1mqvj7tsbDFZocoY_C-KM8vAuKtZUO_akQJsw4LUoB1"
              />
          </div>

          <p className="mt-4">
            <span dangerouslySetInnerHTML={{ __html: t.ownership_conclusion }} />
            <InteractiveSpan type="wlasnosc-kicinski" title={ui.click_to_see_document}>👁️</InteractiveSpan>
            <InteractiveSpan type="janov-photos" title={ui.click_to_see_gallery}>📸</InteractiveSpan>
          </p>

          <p className="mt-4 leading-tight">
            {t.ownership_remark}
            <br />
            <span className="bg-red-600 px-1 font-black text-white shadow-sm box-decoration-clone inline-block">
              {t.ownership_highlight}
            </span>
          </p>

          <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">{t.sec_wiretap}</h2>

          <p className="mt-4">
            {t.wiretap_intro}
          </p>

          <p className="mt-4">
            {t.wiretap_p2}
          </p>

          <CaseFile title={t.reconstruction_title} type="transcript" source={ui.case_ref + " 30 T 5/2020"} dict={ui}>
            <span dangerouslySetInnerHTML={{ __html: t.reconstruction_content }} />
          </CaseFile>

          <p className="mt-4">
            {t.wiretap_p3}
          </p>

          <CaseFile title={t.kordys_question_title} type="transcript" source={ui.case_ref + " 30 T 5/2020"} dict={ui}>
            {t.kordys_question_content}
          </CaseFile>

          <div className="not-prose my-12 pl-6 border-l-[6px] border-black font-serif italic text-2xl text-[#000000] leading-relaxed relative z-10">
            {t.wiretap_quote}
            <div className="text-left text-[10px] uppercase tracking-widest text-black/50 mt-4 font-mono not-italic">
              {ui.source_label}: {ui.case_ref} 30 T 5/2020
            </div>
          </div>

          <p className="mt-4">
            {t.wiretap_p4}
          </p>

          <p className="mt-4">
            {t.wiretap_p5}
          </p>

          <CaseFile title={t.continuation_title} type="transcript" source={ui.case_ref} dict={ui}>
            {t.continuation_content}
          </CaseFile>

          <p className="mt-4">
            {t.wiretap_p6}
          </p>

          <p className="mt-4">
            {t.wiretap_p7}
          </p>

          <CaseFile title={t.search_report_title} source={ui.case_ref + " 30 T 5/2020"} dict={ui}>
            {t.search_report_content}
          </CaseFile>

          <p className="mt-4">
            {t.search_p2}
          </p>

          <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">{t.sec_freedom}</h2>

          <p className="mt-4">
            {t.freedom_p1}
          </p>

          <p className="mt-4">
            {t.freedom_p2}
          </p>

          <div className="not-prose my-8">
            <ArticleVideoPlayer src={ARREST_VIDEO_URL} poster={KORDYS_COVER} />
            <div className="mt-4 text-sm text-black font-mono border-l-[4px] border-black pl-4 bg-[#e8d154]/20 py-2 relative z-10">
              <span className="font-black uppercase text-xs mr-2">{ui.operational_material}:</span>
              {t.arrest_video_label}
            </div>
          </div>

          <p className="mt-4">
            {t.freedom_p3}
          </p>

          <LegalNote term="Dohoda o vině">
            {t.freedom_p4}
          </LegalNote>

          <p className="mt-4">
            {t.freedom_p4}
          </p>

          <p className="mt-4">
            {t.freedom_p5}
          </p>

          <p className="mt-4">
            {t.freedom_p6}
          </p>

          <p className="mt-4">
            {t.freedom_p7} <InteractiveSpan type="badowski" title={ui.click_to_see_judgment}>📄</InteractiveSpan>
          </p>

          <CaseFile title={t.badowski_sentence_title} source={ui.case_ref + " 30 T 5/2020"} dict={ui}>
             <div dangerouslySetInnerHTML={{ __html: t.badowski_sentence_content }} />
          </CaseFile>

          <p className="mt-4">
            {t.freedom_p8}
          </p>

          <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">{t.sec_silence}</h2>

          <p className="mt-4">
            {t.silence_p1}
          </p>

          <p className="mt-4">
            {t.silence_p2}
          </p>

          <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">{t.sec_kicinski}</h2>

          <p className="mt-4">
            {t.kicinski_p1}
          </p>

          <PullQuote
            quote="Po ayahuasce jest szansa na to, żeby sobie nie ściemniać."
            author="Michał Kiciński"
            source="Newsweek, 30 maja 2016 r."
          />

          <div className="not-prose my-8">
            <ArticleVideoPlayer src={KICINSKI_VIDEO_URL} />
            <div className="mt-4 text-sm text-black font-mono border-l-[4px] border-black pl-4 bg-[#e8d154]/20 py-2 relative z-10">
              <span className="font-black uppercase text-xs mr-2">{ui.video_material}:</span>
              {t.kicinski_video_label}
            </div>
          </div>

          <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">{t.sec_mistake}</h2>

          <p className="mt-4"> {t.mistake_p1}
          </p>

          <p className="mt-4">
            {t.mistake_p2}
          </p>

          <CaseFile title={t.kicinski_email_title} type="email" source="ONET.PL" dict={ui}>
            {t.kicinski_email_content}
          </CaseFile>

          <p className="mt-4">
            {t.mistake_p3}
          </p>

          <CaseFile title={t.kicinski_testimony_title} source="ONET.PL" dict={ui}>
            {t.kicinski_testimony_content}
          </CaseFile>

          <p className="mt-4">
            {t.mistake_p4}
          </p>

          <CaseFile title={t.kicinski_participation_title} source="ONET.PL" dict={ui}>
            <span dangerouslySetInnerHTML={{ __html: t.kicinski_participation_content }} />
          </CaseFile>

          <p className="mt-4">
            {t.mistake_p5}
          </p>

          <p className="mt-4">
            {t.mistake_p6} <a href="https://munaysonqo.com/all-retreats/#calendar-7a66adc3-3ebd-432c-b572-0faf936c281f-event-e90d5161-a00e-4742-b4b7-039de153a23d" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:bg-[#e8d154]/50 transition-colors rounded px-1" title={ui.click_to_open_munay}>🌐</a>
          </p>

          <p className="mt-4">
            {t.mistake_p7}
          </p>

          <p>
            {t.badowski_quote_intro}
          </p>

          <CaseFile title={t.badowski_quote_title} type="email" source="Bartosz Badowski" dict={ui}>
            {t.badowski_quote_content}
          </CaseFile>

          <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">{t.sec_philanthropist}</h2>

          <p className="mt-4">
            {t.philanthropist_p1}
          </p>

          <p className="mt-4">
            {t.philanthropist_p2}
          </p>

          <CaseFile title={t.stefanek_quote_title} source="YouTube kanał Osada Natury Zew" dict={ui}>
            <span dangerouslySetInnerHTML={{ __html: t.stefanek_quote_content }} />
          </CaseFile>

          <p className="mt-4">
            {t.philanthropist_p3}
          </p>

          <div className="not-prose my-8">
            <ArticleVideoPlayer src={STEFANEK_VIDEO_URL} />
            <div className="mt-4 text-sm text-black font-mono border-l-[4px] border-black pl-4 bg-[#e8d154]/20 py-2 relative z-10">
              <span className="font-black uppercase text-xs mr-2">{ui.video_material}:</span>
              {t.stefanek_video_label}
            </div>
          </div>

          <p className="mt-4 mb-8">
            {t.philanthropist_p4}
          </p>

          <ul className="not-prose list-none space-y-10 my-12 font-mono text-sm border-l-4 border-black pl-6 relative z-10">
            <li className="flex items-start gap-4">
              <span className="text-xl">📅</span>
              <div>
                <strong className="font-black text-base">21 września 2023 r.</strong><br/>
                {t.timeline_1}
              </div>
            </li>

            <li className="flex items-start gap-4">
              <span className="text-xl">📅</span>
              <div>
                <strong className="font-black text-base">3 października 2023 r.</strong><br/>
                {t.timeline_2}<InteractiveSpan type="cena" title={ui.click_to_see_document}>👁️</InteractiveSpan>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <span className="text-xl">📅</span>
              <div>
                <strong className="font-black text-base">11 października 2023 r.</strong><br/>
                {t.timeline_3}
              </div>
            </li>

            <li className="flex items-start gap-4 mt-6">
              <span className="text-xl mt-4">⚠️</span>
              <div className="bg-[#e8d154]/30 border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full">
                <strong className="font-black text-base font-sans">23 października 2023 r.</strong><br/>
                {t.timeline_4}
              </div>
            </li>

            <li className="flex items-start gap-4 mt-6">
              <span className="text-xl">📅</span>
              <div>
                <strong className="font-black text-base">21 grudnia 2023 r.</strong><br/>
                {t.timeline_5}
              </div>
            </li>
          </ul>

          <p className="mt-4">
            {t.philanthropist_p5}
          </p>

          <div className="not-prose my-8 flex justify-start">
             <TransactionStampUI
              label={ui.transaction_id}
              value="V-5821/2023-127"
              subDetails={ui.district + ": Janov u Krnova [656976]"}
            />
          </div>

          <p className="mt-4">
            {t.philanthropist_p6}
          </p>

          <p className="mt-4">
            {t.philanthropist_p7}
          </p>

          <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">{t.sec_nydek}</h2>

          <p className="mt-4">
            {t.nydek_p1} <a href={DOCUMENTATION_IPFS_URL} target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:bg-[#e8d154]/50 transition-colors rounded px-1" title={ui.click_to_open_documentation}>📸</a>
          </p>

          <p className="mt-4">
            {t.nydek_p2} <a href={TRIBU_NYDEK_WAYBACK_URL} target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:bg-[#e8d154]/50 transition-colors rounded px-1" title={ui.click_to_see_evidence}>🔍</a>
          </p>

          <p className="not-prose mt-4 font-bold text-center my-8 uppercase font-sans text-black">
            {t.nydek_q}
          </p>

          <p className="mt-4">
            {t.nydek_p3}
          </p>

          <div className="not-prose my-8 flex justify-start">
              <LocationStampUI
                name="NYDEK 120"
                code="739 95 Czechy"
                plot="120739"
                lv="95"
                href="https://nahlizenidokn.cuzk.gov.cz/ZobrazObjekt.aspx?encrypted=NAHL~uQr6_qGGFNbscI31qkCFl1vpVRu3o8TWYak_iMPnq4Xni8IKqU6i2gAeUccVcXY0cblWyhwAnpIfk_96Mg7yOtHNymugDk5IKqRCxXKsDVSaFSQDLQ1U0IhqdBk9LlCR_I0UG5TUns3dt8PYkjaBZnRbrrTdSTBlGm3NYz5s3Fs57qfwSIALL3wiNHX8YWmHNt4frIIWhALPhA00bxPjexuiQ2JTZo1a4_lgJyZNUq8_lkKhHRCtuhwUvhv7ZIDD"
              />
          </div>

          <p className="mt-4">
            <span className="bg-red-600 px-1 font-black text-white shadow-sm box-decoration-clone">
              {t.nydek_highlight}
            </span>
          </p>

          <p className="mt-4">
            {t.nydek_p4}
          </p>

          <ul className="not-prose list-none space-y-10 my-12 font-mono text-sm border-l-4 border-black pl-6 relative z-10 text-black">
             <li className="flex items-start gap-4">
              <span className="text-xl">📅</span>
            <div>
              <strong className="font-black text-base block">25 stycznia 2016 r.</strong>
              <span className="block leading-tight">
                {t.nydek_timeline_1}<InteractiveSpan type="cena-nydek" title={ui.click_to_see_document}>👁️</InteractiveSpan>
              </span>
            </div>
             </li>

             <li className="flex items-start gap-4">
              <span className="text-xl">📅</span>
              <div>
                <strong className="font-black text-base">15 października 2020 r.</strong><br/>
                {t.nydek_timeline_2}
              </div>
             </li>

            <li className="flex items-start gap-4">
              <span className="text-xl">📅</span>
              <div>
                <strong className="font-black text-base">15 czerwca 2021 r.</strong><br/>
                {t.nydek_timeline_3}
              </div>
            </li>
          </ul>

          <p className="mt-4">
            {t.nydek_p5}
          </p>

          <div className="not-prose my-8 flex justify-start">
            <TransactionStampUI
              label={ui.transaction_id}
              value="V-2937/2021-832"
              subDetails={ui.district + ": Nýdek [708186]"}
            />
          </div>

          <p className="mt-4">
            {t.nydek_p6}
          </p>

          <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">{t.sec_wiktor}</h2>

          <p className="mt-4">
            {t.wiktor_p1} <a href={ONET_INVESTIGATION_URL} target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:bg-[#e8d154]/50 transition-colors rounded px-1" title={ui.click_to_open_onet}>🌐</a>
          </p>

          <p className="mt-4">
            {t.wiktor_p2}
          </p>

          <p className="mt-4">
             {t.wiktor_p3}
          </p>

          <p className="mt-4">
            {t.wiktor_p4}
          </p>

          <p className="mt-4">
            {t.wiktor_p5}
          </p>

          <p className="mt-4">
            {t.wiktor_p6}
          </p>

          <p className="mt-4">
            {t.wiktor_p7}<InteractiveSpan type="wiktor" title={ui.click_to_see_details}>🔍</InteractiveSpan>
          </p>

          <div className="not-prose mt-12 mb-4 flex justify-end relative z-10">
              <div className="text-right border-r-4 border-black pr-4">
                <span className="block font-black text-black uppercase text-xl font-display tracking-widest leading-none">{dict.common.journalist_name}</span>
                <span className="block text-[10px] text-black/60 font-mono mt-1 uppercase tracking-tighter leading-tight">{dict.common.journalist_title}</span>
                <span className="block text-[10px] text-black/40 font-mono mt-0.5 italic lowercase tracking-tight">{dict.common.journalist_email}</span>
              </div>
          </div>

          <div className="not-prose mt-16 mb-0 border-y-4 border-black py-8 bg-[#e8d154]/10 relative z-10">
              <h3 className="font-display font-black text-2xl uppercase tracking-widest text-black mb-8 flex items-center gap-2 px-4">
                <span>🛡️</span> {t.sec_legal_status}
              </h3>

              <div className="grid gap-4 px-4">
                <div className="border-2 border-black bg-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div>
                      <span className="block font-display text-black font-bold uppercase">{t.legal_ceremonies_title}</span>
                      <span className="block text-xs text-black/60 mt-1 font-mono">{t.legal_czestochowa}</span>
                    </div>
                    <span className="font-mono text-sm font-black bg-black text-white px-4 py-2 border border-black tracking-widest">
                      3013-1.Ds.15.2024
                    </span>
                </div>

                <div className="border-2 border-black bg-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div>
                      <span className="block font-display text-black font-bold uppercase">{t.legal_death_ilona_title}</span>
                      <span className="block text-xs text-black/60 mt-1 font-mono">{t.legal_czestochowa}</span>
                    </div>
                    <span className="font-mono text-sm font-black bg-[#e8d154] text-black border-2 border-black px-4 py-2 tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      3013-1.Ds.4.2026
                    </span>
                </div>

                <div className="border-2 border-black bg-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div>
                      <span className="block font-display text-black font-bold uppercase">{t.legal_death_wiktor_title}</span>
                      <span className="block text-xs text-black/60 mt-1 font-mono">{t.legal_pultusk}</span>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="font-mono text-sm font-black bg-black/5 text-black px-4 py-2 border-2 border-black tracking-widest">
                         4027-0. Ds. 1254.2024
                      </span>
                      <div className="flex items-center gap-2">
                         <span className="text-[10px] font-black text-red-800 uppercase tracking-widest bg-red-100 px-2 py-1 border border-red-800 font-sans">{t.legal_suspended}</span>
                      </div>
                    </div>
                </div>
              </div>

              <div className="mt-8 px-4 text-xs text-black/70 font-mono text-center italic">
                {t.legal_supervision}
              </div>
          </div>

        </div>

        <footer className="mt-8 pt-0 font-mono relative z-10 mb-0">

           <div className="mb-10 text-center">
             <h3 className="text-3xl font-black text-black uppercase tracking-tighter font-display mb-4">
               {t.sec_sources}
             </h3>
             <p className="text-sm text-black/80 italic max-w-xl mx-auto font-serif">
               {t.sources_lead}
             </p>
           </div>

           <div className="grid gap-6 text-sm text-black">

             <div className="p-4 bg-white/40 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#e8d154]/10 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3 font-sans">
                  <div>
                    <h4 className="font-bold text-black text-base uppercase font-display tracking-widest">{t.source_onet_title}</h4>
                    <p className="font-mono text-xs text-black/60 mt-1 font-black">{t.source_onet_desc}</p>
                  </div>
                  <a href={ONET_INVESTIGATION_URL} target="_blank" rel="noopener noreferrer" className="shrink-0 w-full sm:w-48 justify-center bg-[#e8d154] text-black px-4 py-2 text-xs font-black border-2 border-black hover:bg-white transition-colors flex items-center gap-2 uppercase tracking-widest text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    🌐 {t.source_onet_link}
                  </a>
                </div>
             </div>

             <div className="p-4 bg-white/40 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#e8d154]/10 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3 font-sans">
                  <div>
                    <h4 className="font-bold text-black text-base uppercase font-display tracking-widest">{t.source_kordys_title}</h4>
                    <p className="font-mono text-xs text-black/60 mt-1 font-black">{ui.case_ref} 30 T 5/2020</p>
                  </div>
                  <a href={KORDYS_PDF_URL} target="_blank" rel="noopener noreferrer" className="shrink-0 w-full sm:w-48 justify-center bg-black text-white px-4 py-2 text-xs font-bold border-2 border-black hover:bg-white hover:text-black transition-colors flex items-center gap-2 uppercase tracking-widest text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    📄 {t.source_kordys_link}
                  </a>
                </div>
                <div className="border-t-2 border-black/20 pt-3">
                  <a href="https://msp.gov.cz/web/krajsky-soud-v-ostrave/zakladni-informace/-/clanek/informace-rok-2022" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-black/70 hover:text-black flex items-center gap-2 uppercase tracking-widest underline decoration-2 underline-offset-4 font-sans">
                    🌐 {t.source_kordys_verify}
                  </a>
                </div>
             </div>

             <div className="p-4 bg-white/40 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#e8d154]/10 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3 font-sans">
                  <div>
                    <h4 className="font-bold text-black text-base uppercase font-display tracking-widest">{t.source_badowski_title}</h4>
                    <p className="font-mono text-xs text-black/60 mt-1 font-black">{ui.case_ref} 66 T 146/2021</p>
                  </div>
                  <a href={`${PINATA_GATEWAY}/bafkreietkosain6ftde7f3li5ic34qhkwuglz2tu2kfcpbvrwhslskhwza`} target="_blank" rel="noopener noreferrer" className="shrink-0 w-full sm:w-48 justify-center bg-black text-white px-4 py-2 text-xs font-bold border-2 border-black hover:bg-white hover:text-black transition-colors flex items-center gap-2 uppercase tracking-widest text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    📄 {t.source_kordys_link}
                  </a>
                </div>
                <div className="border-t-2 border-black/20 pt-3">
                  <a href="https://msp.gov.cz/documents/22409/2997339/29Si+25-2022+p%C5%99%C3%ADloha+%C4%8D.+1.pdf" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-black/70 hover:text-black flex items-center gap-2 uppercase tracking-widest underline decoration-2 underline-offset-4 font-sans">
                    🌐 {t.source_badowski_verify}
                  </a>
                </div>
             </div>

             <div className="p-4 bg-white/40 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#e8d154]/10 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3 font-sans">
                  <div>
                    <h4 className="font-bold text-black text-base uppercase font-display tracking-widest">{t.source_nydek_2016_title}</h4>
                    <p className="font-mono text-xs text-black/60 mt-1 font-black">Sygnatura: V-320/2016-832</p>
                  </div>
                  <a href={NYDEK_CADASTRAL_URL} target="_blank" rel="noopener noreferrer" className="shrink-0 w-full sm:w-48 justify-center bg-black text-white px-4 py-2 text-xs font-bold border-2 border-black hover:bg-white hover:text-black transition-colors flex items-center gap-2 uppercase tracking-widest text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    🌐 {t.source_nydek_verify}
                  </a>
                </div>
                <div className="border-t-2 border-black/20 pt-2">
                  <p className="text-[9px] leading-tight text-black/70 font-mono uppercase">
                    {t.source_kataster_note}
                  </p>
                </div>
             </div>

             <div className="p-4 bg-white/40 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#e8d154]/10 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3 font-sans">
                  <div>
                    <h4 className="font-bold text-black text-base uppercase font-display tracking-widest">{t.source_nydek_2021_title}</h4>
                    <p className="font-mono text-xs text-black/60 mt-1 font-black">Sygnatura: V-2937/2021</p>
                  </div>
                  <a href={KORDYS_PDF_URL} target="_blank" rel="noopener noreferrer" className="shrink-0 w-full sm:w-48 justify-center bg-black text-white px-4 py-2 text-xs font-bold border-2 border-black hover:bg-white hover:text-black transition-colors flex items-center gap-2 uppercase tracking-widest text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    📥 {ui.download_pdf}
                  </a>
                </div>
                <div className="border-t-2 border-black/20 pt-3 flex flex-col gap-2">
                  <a href={NYDEK_CADASTRAL_URL} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-black/70 hover:text-black flex items-center gap-2 uppercase tracking-widest underline decoration-2 underline-offset-4 font-sans">
                    🌐 {t.source_nydek_verify}
                  </a>
                  <p className="text-[9px] leading-tight text-black/70 font-mono uppercase">
                    {t.source_kataster_note}
                  </p>
                </div>
             </div>

             <div className="p-4 bg-white/40 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#e8d154]/10 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3 font-sans">
                  <div>
                    <h4 className="font-bold text-black text-base uppercase font-display tracking-widest">{t.source_janov_buyout_title}</h4>
                    <p className="font-mono text-xs text-black/60 mt-1 font-black">Sygnatura: V-2031/2023-831</p>
                  </div>
                  <a href={JANOV_BUYOUT_CADASTRAL_URL} target="_blank" rel="noopener noreferrer" className="shrink-0 w-full sm:w-48 justify-center bg-black text-white px-4 py-2 text-xs font-bold border-2 border-black hover:bg-white hover:text-black transition-colors flex items-center gap-2 uppercase tracking-widest text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    🌐 {t.source_nydek_verify}
                  </a>
                </div>
                <div className="border-t-2 border-black/20 pt-3 flex flex-col gap-2">
                  <p className="text-[9px] leading-tight text-black/70 font-mono uppercase">
                    {t.source_kataster_note}
                  </p>
                </div>
             </div>

             <div className="p-4 bg-white/40 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#e8d154]/10 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3 font-sans">
                  <div>
                    <h4 className="font-bold text-black text-base uppercase font-display tracking-widest">{t.source_wayback_title}</h4>
                    <p className="font-mono text-xs text-black/60 mt-1 font-black">Wayback Machine</p>
                  </div>
                  <a href={TRIBU_NYDEK_WAYBACK_URL} target="_blank" rel="noopener noreferrer" className="shrink-0 w-full sm:w-48 justify-center bg-[#e8d154] text-black px-4 py-2 text-xs font-black border-2 border-black hover:bg-white transition-colors flex items-center gap-2 uppercase tracking-widest text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-sans">
                    🕰️ {t.source_wayback_link}
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
