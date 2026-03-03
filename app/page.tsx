import React from 'react';
import type { Metadata } from 'next';
import { Scale, Search, ShieldCheck, Globe, FileText, Download, Calendar, History, ExternalLink } from 'lucide-react';
import BrandHeader from '@/components/BrandHeader';
import {
  CaseFile, PullQuote, LocationStampUI, TransactionStampUI
} from '@/app/eliksir/ElixirServerComponents';
import {
  ElixirModalsProvider,
  GalleryTrigger,
  ArticleVideoPlayer
} from '@/app/eliksir/ElixirClientComponents';
import {
  KORDYS_IMAGES_URL,
  KORDYS_PDF_URL,
  BADI_PDF_URL,
  MUNAY_WAYBACK_URL,
  VIDEO_ARREST_METADATA,
  VIDEO_STEFANEK_METADATA,
  PINATA_GATEWAY,
  ARREST_VIDEO_CID,
  VIDEO_CID
} from '@/lib/eliksir-data';

export const metadata: Metadata = {
  title: "Michał Kiciński, Ayahuasca i Tajemnicza Śmierć w Janovie",
  description: "Pełna dokumentacja śledztwa dziennikarskiego w sprawie ceremonii ayahuaski. Dowody, nagrania i treści wyroków.",
  keywords: "Michał Kiciński, Jarosław Kordys, prokurator Jolanta Świdnicka, Janov, Ayahuasca, Eliksir Wiedźmina, śledztwo dziennikarskie",
};

const EvidenceGrid = () => {
  return (
    <div className="my-16" id="galeria">
      <h3 className="text-2xl font-bold text-[#3d2b1f] uppercase tracking-widest mb-8 border-b-2 border-[#722f37] pb-2 flex items-center gap-3">
        ⚖️ Galeria Dowodów
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="group relative overflow-hidden bg-[#faf6ec] border border-[#c4b99a] shadow-md flex flex-col text-left">
          <div className="aspect-[3/4] overflow-hidden bg-[#e8e0cc]">
            <img
              src={`${KORDYS_IMAGES_URL}/wezwanie/wezwanie_kicinski.png`}
              alt="Wezwanie Kiciński"
              className="w-full h-full object-cover grayscale transition-all duration-500"
            />
          </div>
          <div className="p-4 bg-[#faf6ec]/90">
            <h4 className="font-bold text-[#3d2b1f] text-sm mb-1 uppercase tracking-tight">Wezwanie dla M. Kicińskiego</h4>
            <p className="text-[10px] text-[#8a7a62] font-mono">Sygn. WD-I-3186/23</p>
            <GalleryTrigger type="wezwanie" className="text-[10px] font-bold text-[#722f37] underline mt-2 inline-block hover:text-[#8b3a3a] transition-colors">POKAŻ DOWÓD</GalleryTrigger>
          </div>
        </div>

        <div className="group relative overflow-hidden bg-[#faf6ec] border border-[#c4b99a] shadow-md flex flex-col text-left">
          <div className="aspect-[3/4] overflow-hidden bg-[#e8e0cc]">
            <img
              src={`${KORDYS_IMAGES_URL}/30T_5_2021-1_page-0001.jpg`}
              alt="Wyrok Kordys"
              className="w-full h-full object-cover grayscale transition-all duration-500"
            />
          </div>
          <div className="p-4 bg-[#faf6ec]/90">
            <h4 className="font-bold text-[#3d2b1f] text-sm mb-1 uppercase tracking-tight">Uzasadnienie Wyroku: J. Kordys</h4>
            <p className="text-[10px] text-[#8a7a62] font-mono">Sygn. 30 T 5/2021</p>
            <GalleryTrigger type="wyrok_kordys" className="text-[10px] font-bold text-[#722f37] underline mt-2 inline-block hover:text-[#8b3a3a] transition-colors">POKAŻ STRONY (25)</GalleryTrigger>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  const newsArticleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": "Eliksir Wiedźmina – Śledztwo: Michał Kiciński i tajemnica Janova",
    "description": "Pełna dokumentacja śledztwa: Michał Kiciński, Jarosław Kordys i prokurator Jolanta Świdnicka. Ayahuasca, Janov i tragiczna śmierć uczestniczki.",
    "image": [
      `${KORDYS_IMAGES_URL}/wezwanie/wezwanie_kicinski.png`
    ],
    "datePublished": "2024-03-03",
    "author": [{
      "@type": "Person",
      "name": "Detektyw Polutek",
      "url": "mailto:detektyw.polutek@protonmail.com"
    }]
  };

  const videoArrestSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": VIDEO_ARREST_METADATA.name,
    "description": VIDEO_ARREST_METADATA.description,
    "thumbnailUrl": VIDEO_ARREST_METADATA.thumbnailUrl,
    "uploadDate": VIDEO_ARREST_METADATA.uploadDate,
    "contentUrl": VIDEO_ARREST_METADATA.contentUrl,
  };

  return (
    <ElixirModalsProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoArrestSchema) }} />

      <main className="min-h-screen bg-[#e4dbbe] text-[#1c1917] selection:bg-[#722f37]/20 font-serif flex flex-col items-center">
        <div className="w-full max-w-5xl bg-[#e4dbbe] min-h-screen shadow-2xl border-x-[2px] border-[#3d2b1f] flex flex-col relative overflow-hidden">
          
          <div className="w-full pt-0 px-6 flex flex-col items-center z-10 relative">
            <BrandHeader />
          </div>

          <header className="pt-8 pb-8 px-4 w-full z-10 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="mb-8 text-[#3d2b1f]">
                <span className="block text-5xl md:text-7xl font-bold leading-none tracking-tight uppercase">
                  Eliksir Wiedźmina
                </span>
                <span className="block text-2xl md:text-4xl text-[#5a4a3a] italic font-medium mt-6 max-w-3xl mx-auto uppercase tracking-widest">
                  Mroczna tajemnica twórców CD Projekt
                </span>
              </h1>

              <div className="max-w-2xl mx-auto border-y-2 border-[#3d2b1f] py-8 px-4">
                <p className="text-xl md:text-2xl text-[#5a4a3a] leading-relaxed italic">
                  Ayahuasca, policyjne naloty i tragedia, o której nie miał się nikt dowiedzieć. Publicznie dostępne akta i rejestry ujawniają, jak twórcy gry &quot;Wiedźmin&quot; finansowali szamańskie podziemie.
                </p>
              </div>
            </div>
          </header>

          <article className="max-w-2xl mx-auto px-4 pt-8 pb-0 flex-grow z-10 relative">
            <div className="prose prose-stone prose-lg max-w-none prose-headings:font-sans prose-headings:font-bold prose-blockquote:not-italic
              prose-a:text-[#722f37] prose-a:font-bold prose-a:no-underline prose-a:underline prose-a:decoration-double prose-a:decoration-[#b8a880] hover:prose-a:bg-[#e8e0cc] transition-colors">

              <p className="first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-[#722f37] leading-relaxed">
                W 2020 roku media obiegły doniesienia o rozbiciu grupy polskich szamanów w czeskich <strong>Hermanovicach</strong>. Policyjny nalot, aresztowanie <strong>Jarosława i Karoliny Kordysów</strong>, a następnie surowe wyroki – 8,5 oraz 5,5 roku więzienia za prowadzenie nielegalnego biznesu polegającego na organizacji tzw. &quot;ceremonii&quot;, podczas których klientom podawano egzotyczny psychodelik – ayahuaskę.
              </p>

              <p>
                Ayahuaska to tradycyjny wywar z amazońskich roślin o silnym działaniu halucynogennym. Ze względu na wysoką zawartość DMT – substancji psychodelicznej wywołującej intensywne wizje i zmiany stanu świadomości, jej posiadanie i podawanie jest w Polsce i Czechach zabronione. Finałem medialnego spektaklu Kordysów było ułaskawienie przez czeskiego prezydenta po dwóch latach odsiadki.
              </p>

              <h2 className="text-3xl mt-16 mb-8 tracking-tight text-[#3d2b1f] border-b border-[#722f37]/40 pb-2">Świadek B.</h2>

              <p>
                W obszernym i publicznie dostępnym uzasadnieniu <GalleryTrigger type="wyrok_kordys" className="font-bold text-[#722f37] underline decoration-double decoration-[#b8a880] hover:bg-[#e8e0cc] transition-colors">wyroku</GalleryTrigger> Jarosława Kordysa pojawia się postać świadka Bartosza B.
              </p>

              <CaseFile title="Zeznania świadka B.">
                &quot;Świadek B. odnośnie osoby oskarżonego [Jarosława Kordysa] oświadczył, że zna się z nim ok. 8 lat, a poznali się w Holandii&quot;.
                <br/><br/>
                &quot;Świadek B. potwierdził, że i on sam w przeszłości prowadził warsztaty&quot;, a obecnie sam &quot;jest przedmiotem dochodzenia policji w Krnowie właśnie z powodu ceremonii&quot;.
              </CaseFile>

              <CaseFile title="Ustalenia Sądu">
                &quot;...w odniesieniu do nieruchomości będących współwłasnością <strong>Bartosza B.</strong> i <strong>Michała D. K.</strong>&quot;.
              </CaseFile>

              <div className="my-8 flex justify-start">
                <GalleryTrigger type="janov">
                  <LocationStampUI name="JANOV U KRNOVA" code="656976" plot="st. 281" lv="127" />
                </GalleryTrigger>
              </div>

              <p>
                Pobrany dokument nie pozostawia wątpliwości: w latach 2012–2023 współwłaścicielami nieruchomości byli:
                <br/> Bartosz Badowski (10%)
                <br/> <span className="bg-[#722f37] px-1 font-bold text-[#faf6ec] box-decoration-clone">Michał Dawid Kiciński (90%)</span>
              </p>

              <h2 className="text-3xl mt-16 mb-8 tracking-tight text-[#3d2b1f] border-b border-[#722f37]/40 pb-2">Na podsłuchu</h2>

              <CaseFile title="Rekonstrukcja rozmowy" type="transcript">
                &quot;oskarżony [Jarosława Kordysa] omawia z B., że dotarła do niego informacja, że w obiekcie w Janowie <span className="underline decoration-[#722f37] decoration-4 underline-offset-4 text-[#3d2b1f]">zmarła jakaś kobieta</span>&quot;.
              </CaseFile>

              <div className="my-12 p-5 bg-[#faf6ec]/60 border-l-[4px] border-[#722f37] rounded-r-lg shadow-sm">
                <Scale className="w-8 h-8 text-[#722f37]/80 shrink-0 mt-1" />
                <div>
                  <strong className="block font-serif text-[#3d2b1f] text-lg font-bold mb-1">Dohoda o vině a trestu</strong>
                  <div className="text-[#1c1917] text-lg leading-relaxed">
                    Ugoda o winie i karze. Czeska procedura karna pozwalająca oskarżonemu na dobrowolne poddanie się karze w zamian za łagodniejszy wyrok.
                  </div>
                </div>
              </div>

              <h2 className="text-3xl mt-16 mb-8 tracking-tight text-[#3d2b1f] border-b border-[#722f37]/40 pb-2">Kiciński</h2>

              <CaseFile title="Zeznanie do protokołu">
                &quot;Nie mam żadnej wiedzy co się działo na mojej farmie, w której jestem 90% udziałowcem (...) wynajmowałem tę nieruchomość.&quot;
              </CaseFile>

              <div className="my-8 flex justify-start">
                <TransactionStampUI label="Nr Transakcji (Katastr)" value="V-5821/2023-127" subDetails="Obręb: Janov u Krnova [656976]" />
              </div>

              <ul className="list-none space-y-12 my-12 font-mono text-sm border-l-2 border-[#b8a880] pl-4 text-[#5a4a3a]">
                <li className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-[#722f37] shrink-0" />
                  <div>
                    <strong>21 grudnia 2023 r.</strong> – Finał operacji. Kiciński formalnie przekazuje Janov w formie darowizny.
                  </div>
                </li>
              </ul>

              <h2 className="text-3xl mt-16 mb-8 tracking-tight text-[#3d2b1f] border-b border-[#722f37]/40 pb-2">Wiktor B.</h2>

              <p>
                Sytuacja uległa diametralnej zmianie 6 maja 2024 roku, gdy Prokuratura Okręgowa w Częstochowie wszczęła oficjalne śledztwo. Kilka miesięcy później w tajemniczych okolicznościach umiera Wiktor B.
              </p>

              <div className="p-4 bg-[#faf6ec] border border-[#3d2b1f]/10 mb-16 shadow-inner">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <span className="block font-serif text-[#3d2b1f] font-medium text-lg">Śledztwo w sprawie śmierci Wiktora B.</span>
                    <span className="block text-xs text-[#5a4a3a] mt-1 uppercase tracking-widest font-sans">Prokuratura Rejonowa w Pułtusku</span>
                  </div>
                  <span className="font-mono text-xs font-bold bg-[#722f37] px-3 py-1.5 text-[#faf6ec] rounded-sm shadow-sm">4027-0. Ds. 1254.2024</span>
                </div>
              </div>

              <EvidenceGrid />
            </div>
          </article>

          <footer className="mt-4 pt-8 border-none font-sans relative z-10 bg-[#e4dbbe] px-8 pb-16">
            <h3 className="text-xl font-bold text-[#3d2b1f] uppercase tracking-widest flex items-center gap-2 mb-4">
              <span>🔍</span> Dokumenty Źródłowe
            </h3>
            <div className="w-full mb-6 h-[3px] bg-gradient-to-r from-[#722f37] via-[#b8a880] to-[#722f37]"></div>
            <div className="grid gap-4 font-mono text-xs uppercase tracking-wider mb-12">
              <a href="ipfs://..." className="text-[#722f37] font-bold hover:bg-[#e8e0cc] underline decoration-[#b8a880] decoration-double p-2 border border-[#3d2b1f]/10">IPFS: Baza Dowodowa</a>
              <a href="https://github.com/..." className="text-[#722f37] font-bold hover:bg-[#e8e0cc] underline decoration-[#b8a880] decoration-double p-2 border border-[#3d2b1f]/10">GitHub: Source Mirror</a>
            </div>
            <div className="text-center">
              <p className="text-xs text-[#5a4a3a] uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
                <span>🌐</span> Oficjalna Witryna
              </p>
              <a href="https://www.eliksir-wiedzmina.pl" className="font-mono text-sm font-bold text-[#722f37] hover:bg-[#e8e0cc] transition-colors underline decoration-double decoration-[#b8a880]">www.eliksir-wiedzmina.pl</a>
            </div>
          </footer>
        </div>
      </main>
    </ElixirModalsProvider>
  );
}
