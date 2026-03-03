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

  const videoStefanekSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": VIDEO_STEFANEK_METADATA.name,
    "description": VIDEO_STEFANEK_METADATA.description,
    "thumbnailUrl": VIDEO_STEFANEK_METADATA.thumbnailUrl,
    "uploadDate": VIDEO_STEFANEK_METADATA.uploadDate,
    "contentUrl": VIDEO_STEFANEK_METADATA.contentUrl,
  };

  return (
    <ElixirModalsProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoArrestSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStefanekSchema) }}
      />

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
                <p className="text-xl md:text-2xl text-[#5a4a3a] leading-relaxed italic font-serif">
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

              <p>
                Kurtyna opadła, temat ucichł. Ale czy to na pewno koniec tej historii? W cieniu tego głośnego procesu toczył się drugi – cichy i błyskawiczny, zakończony dyskretnym wyrokiem, o którym nikt nawet w mediach się nie zająknął. Analiza sądowych dokumentów prowadzi do zdumiewających wniosków.
              </p>

              <p>
                W przygranicznym Janowie funkcjonował drugi, bliźniaczy ayahuaskowy ośrodek, którego współwłaścicielem okazał się miliarder – <strong>Michał Kiciński</strong>.
              </p>

              <h2 className="text-3xl mt-16 mb-8 tracking-tight text-[#3d2b1f] border-b border-[#722f37]/40 pb-2">Świadek B.</h2>

              <p>
                W obszernym i publicznie dostępnym uzasadnieniu <GalleryTrigger type="wyrok_kordys" className="font-bold text-[#722f37] underline decoration-double decoration-[#b8a880] hover:bg-[#e8e0cc] transition-colors">wyroku</GalleryTrigger> Jarosława Kordysa pojawia się postać świadka Bartosza B.
              </p>

              <p>
                Zgodnie z aktami:
              </p>

              <CaseFile title="Zeznania świadka B.">
                &quot;Świadek B. odnośnie osoby oskarżonego [Jarosława Kordysa] oświadczył, że zna się z nim ok. 8 lat, a poznali się w Holandii&quot;.
                <br/><br/>
                &quot;Świadek B. potwierdził, że i on sam w przeszłości prowadził warsztaty&quot;, a obecnie sam &quot;jest przedmiotem dochodzenia policji w Krnowie właśnie z powodu ceremonii&quot;.
              </CaseFile>

              <p>
                Akta ujawniają również skalę zarzutów wobec Bartosza B.:
              </p>

              <CaseFile title="Zarzuty wobec Bartosza B.">
                &quot;(...) wymieniony był sprawdzany w związku z występkiem niedozwolonej produkcji i innego obchodzenia się ze środkami odurzającymi (...) albowiem miał w roku 2014 zlecić przesłanie na swój adres przesyłki pocztowej przechwyconej na lotnisku w Lipsku RFN zawierającej 4,5 kg DMT, a 6.6.2018 miało dojść do zatrzymania przesyłki pocztowej we Frankfurcie nad Menem RFN zawierającej 2000 g meskaliny i 38,6 g substancji DMT.&quot;
              </CaseFile>

              <p>
                Intrygujący fragment dotyczy własności &quot;bazy&quot;. Dokumenty stwierdzają:
              </p>

              <CaseFile title="Własność nieruchomości">
                &quot;(...) budynek rodzinny w miejscowości Janov (...), który jest częściowo użytkowany do stałego zamieszkania, a częściowo jako komercyjny obiekt noclegowy&quot;
                <br/><br/>
                &quot;Świadek [Bartosz B.] potwierdził, że w Janowie jest właścicielem jednej dziesiątej nieruchomości&quot;.
              </CaseFile>

              <p>
                Do kogo należała reszta? Sąd wskazuje wprost:
              </p>

              <CaseFile title="Ustalenia Sądu">
                &quot;...w odniesieniu do nieruchomości będących współwłasnością <strong>Bartosza B.</strong> i <strong>Michała D. K.</strong>&quot;.
              </CaseFile>

              <p>
                W Czechach księgi wieczyste są jawne i dostępne online. Wystarczy wejść na stronę Katastru Nieruchomości, wyszukać <GalleryTrigger type="janov" className="font-bold text-[#722f37] underline decoration-double decoration-[#b8a880] hover:bg-[#e8e0cc] transition-colors">działkę w Janowie</GalleryTrigger> i za niewielką opłatą pobrać jej pełną historię.
              </p>

              <div className="my-8 flex justify-start">
                <GalleryTrigger type="janov">
                  <LocationStampUI
                    name="JANOV U KRNOVA"
                    code="656976"
                    plot="st. 281"
                    lv="127"
                  />
                </GalleryTrigger>
              </div>

              <p>
              Pobrany dokument nie pozostawia wątpliwości: w latach 2012–2023 współwłaścicielami nieruchomości byli:
                 <br/>
                 Bartosz Badowski (10%)
                 <br/>
                 <span className="bg-[#722f37] px-1 font-bold text-[#faf6ec] box-decoration-clone">Michał Dawid Kiciński (90%)</span>
              </p>

              <p>
                Drugie imię – Dawid – idealnie wypełnia lukę w zanonimizowanym skrócie &quot;Michal D. K.&quot;. <span className="bg-[#722f37] px-1 font-bold text-[#faf6ec] shadow-sm box-decoration-clone">Wspólnikiem szamana był twórca &quot;Wiedźmina&quot; – jeden z najbogatszych Polaków.</span>
              </p>

              <h2 className="text-3xl mt-16 mb-8 tracking-tight text-[#3d2b1f] border-b border-[#722f37]/40 pb-2">Na podsłuchu</h2>

              <p>
                Przełom w sprawie organizatorów ayahuaskowych ceremonii w 2020 roku nastąpił dzięki policyjnej technice operacyjnej. Telefon Kordysa był na stałym podsłuchu, a funkcjonariusze słuchali na żywo, gdy w dniu 24.08.2020 r. doszło do nerwowej wymiany zdań pomiędzy Badowskim i Kordysem.
              </p>

              <p>
                Kordys zadzwonił do Badowskiego wyraźnie zaniepokojony wieściami, które do niego dotarły. Bał się, że tragedia, o której huczało w kuluarach, może zniszczyć ich imperium. Sąd w uzasadnieniu wyroku precyzyjnie rekonstruuje ten moment:
              </p>

              <CaseFile title="Rekonstrukcja rozmowy (Uzasadnienie Sądu)" type="transcript">
                &quot;oskarżony [Jarosława Kordysa] omawia z B., że dotarła do niego informacja, że w obiekcie w Janowie <span className="underline decoration-[#722f37] decoration-4 underline-offset-4">zmarła jakaś kobieta</span>&quot;.
              </CaseFile>

              <div className="my-12 pl-6 border-l-[3px] border-[#722f37]/80 text-left">
                <p className="font-serif text-xl md:text-2xl italic text-[#3d2b1f] leading-relaxed mb-3">
                  „Z ich rozmowy wynika, że nie zajmowali się w zasadzie samym faktem śmierci, lecz raczej obawą, aby to nie przyciągnęło uwagi policji."
                </p>
                <div className="font-sans text-[10px] uppercase tracking-widest text-[#8a7a62]">
                  — <span className="font-bold text-[#5a4a3a]">Uzasadnienie Wyroku</span>, Sąd Okręgowy
                </div>
              </div>

              <div className="my-12 flex gap-4 p-5 bg-[#faf6ec]/60 border-l-[3px] border-[#722f37]/80 rounded-sm shadow-sm">
                <Scale className="w-8 h-8 text-[#b8a880] shrink-0 mt-1" />
                <div>
                  <strong className="block font-serif text-[#3d2b1f] text-lg font-bold mb-1">Dohoda o vině a trestu</strong>
                  <div className="text-[#5a4a3a] text-lg leading-relaxed">
                    Ugoda o winie i karze. Czeska procedura karna pozwalająca oskarżonemu na dobrowolne poddanie się karze w zamian za łagodniejszy wyrok, bez przeprowadzania pełnego procesu dowodowego i wzywania świadków.
                  </div>
                </div>
              </div>

            </div>
          </article>
        </div>
      </main>
    </ElixirModalsProvider>
  );
}
