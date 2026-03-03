import React from 'react';
import type { Metadata } from 'next';
import { Scale, Search, ShieldCheck, Globe, FileText, Download, Calendar, History, ExternalLink } from 'lucide-react';

const PINATA_GATEWAY = "https://yellow-elegant-porpoise-917.mypinata.cloud/ipfs";
const KORDYS_IMAGES_URL = "/gallery/wyrok_kordysa";
const BADI_IMAGES_URL = "/gallery/wyrok_badi";
const NYDEK_IMAGES_URL = "/gallery/nydek";
const JANOV_IMAGES_URL = "/gallery/janov";
const VIDEO_CID = "bafybeifkquvqp6cewygbgoqsm3vm6kni3d4wy6medzc7nbsczziswmmv7u";
const ARREST_VIDEO_CID = "bafybeickwaxlebikfa2aax7mwk7xnp56n6vqmnw7mafponnztlzinf73iy";

const KORDYS_PDF_URL = `${PINATA_GATEWAY}/bafybeibzxfsg5s4jkiuf2kzmbdtmfutfjk75ej5zrpt2igan4aldvqc3oq`;
const BADI_PDF_URL = `${PINATA_GATEWAY}/bafkreietkosain6ftde7f3li5ic34qhkwuglz2tu2kfcpbvrwhslskhwza`;
const MUNAY_WAYBACK_URL = "https://web.archive.org/web/20230607033503/https://munaysonqo.com/retreats/";

const VIDEO_ARREST_METADATA = {
  name: "Nalot policji na ośrodek ayahuaski w Hermanovicach",
  description: "Pełna dokumentacja policyjnej interwencji i aresztowania grupy organizującej nielegalne ceremonie ayahuaski. Materiał dowodowy w sprawie Jarosława Kordysa.",
  thumbnailUrl: `${JANOV_IMAGES_URL}/janov1.jpg`,
  contentUrl: `${PINATA_GATEWAY}/${ARREST_VIDEO_CID}/videoplayback.m3u8`,
  uploadDate: "2020-10-15T09:00:00+01:00",
};

const VIDEO_STEFANEK_METADATA = {
  name: "Wyznania Krzysztofa Stefanka o przejęciu Janówa",
  description: "Relacja z pierwszej ręki dotycząca darowizny nieruchomości w Janowie od Michała Kicińskiego dla Stowarzyszenia Natury Zew.",
  thumbnailUrl: `${JANOV_IMAGES_URL}/janov2.jpg`,
  contentUrl: `${PINATA_GATEWAY}/${VIDEO_CID}/YTDowncom_YouTube_Media_4Xujw-krjxs_001_1080p-1.m3u8`,
  uploadDate: "2024-11-01T12:00:00+01:00",
};

const BrandHeader = () => {
  return (
    <div className="w-full pb-2 mb-2 flex flex-col items-center">
      <div className="flex items-center justify-center w-[98%] mx-auto pb-2">
        <h1 className="text-5xl md:text-[6.5rem] font-black tracking-tighter text-stone-950 uppercase font-serif leading-none whitespace-nowrap">
          NASZA GAZETKA
        </h1>
      </div>
      <div className="w-[98%] mx-auto border-y-2 border-stone-950 py-1 flex items-center justify-between px-2 text-[10px] md:text-sm font-bold uppercase tracking-[0.1em] text-stone-700">
        <div className="flex items-center gap-2">
          <span className="grayscale">📰</span>
          <span className="hidden sm:inline">Niezależne Media Śledcze</span>
        </div>
        <div className="text-center font-serif font-black">
          NIEDZIELA, 1 MARCA 2026
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline">Serwis Śledczy</span>
          <span className="grayscale">📄</span>
          <span className="hidden md:inline border-l border-stone-950 pl-2 ml-1">Wydanie Specjalne</span>
        </div>
      </div>
    </div>
  );
};

const CaseFile = ({ title, children, type = '📄' }: { title: string, children: React.ReactNode, type?: string }) => (
  <div className="my-8 border border-stone-300 bg-stone-100/30 shadow-sm rounded-sm overflow-hidden break-inside-avoid text-left">
    <div className="bg-stone-200/80 border-b border-stone-300 px-4 py-2 flex items-center gap-2 text-xs font-mono text-stone-600 uppercase tracking-wider">
      <span>{type === 'transcript' ? '🎙️' : type === 'email' ? '✉️' : '📄'}</span>
      <span>{title}</span>
    </div>
    <div className="p-6 font-mono text-sm md:text-base leading-relaxed text-stone-950 italic">
      {children}
    </div>
  </div>
);

const PullQuote = ({ quote, author, source }: { quote: string, author: string, source: string }) => (
  <div className="my-10 pl-6 border-l-[4px] border-[#722f37] text-left">
    <p className="font-serif text-xl md:text-2xl italic text-stone-950 leading-relaxed mb-3">
      „{quote}"
    </p>
    <div className="font-sans text-[10px] uppercase tracking-widest text-stone-500">
      — <span className="font-bold text-stone-800">{author}</span>, {source}
    </div>
  </div>
);

const LocationStampUI = ({ name, plot, lv, code }: { name: string, plot: string, lv: string, code?: string }) => (
  <div className="relative border border-blue-900/20 bg-blue-50/20 p-1 pr-6 rounded-sm flex items-center gap-4 shadow-[2px_2px_0px_0px_rgba(30,58,138,0.1)] text-left group">
      <div className="absolute top-1 right-1 text-blue-900/30">
        🔍
      </div>
      <div className="bg-blue-900/10 h-full p-3 flex items-center justify-center border-r border-blue-900/20 border-dashed">
         <span className="text-xl grayscale">🏠</span>
      </div>
      <div className="py-2">
         <div className="text-[9px] uppercase tracking-[0.2em] text-blue-900 font-bold mb-1 flex items-center gap-2">
           {name} {code && `[${code}]`}
         </div>
         <div className="font-mono text-base font-bold text-stone-950">LV {lv}</div>
         <div className="text-[10px] text-stone-500 font-mono mt-1">
           Działka: {plot}
         </div>
      </div>
  </div>
);

const TransactionStampUI = ({ label, value, subDetails }: { label: string, value: string, subDetails?: string }) => (
  <div className="relative border border-stone-300 bg-stone-100/20 p-1 pr-6 rounded-sm flex items-center gap-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)] group text-left">
      <div className="absolute top-1 right-1 text-stone-300">
        🔍
      </div>
      <div className="bg-stone-200 h-full p-3 flex items-center justify-center border-r border-stone-300 border-dashed">
         <span className="text-xl grayscale">📜</span>
      </div>
      <div className="py-2">
         <div className="text-[9px] uppercase tracking-[0.2em] text-stone-600 font-bold mb-1">{label}</div>
         <div className="font-mono text-base font-bold text-stone-950">{value}</div>
         {subDetails && <div className="text-[10px] text-stone-500 font-mono mt-1">{subDetails}</div>}
      </div>
  </div>
);

const ArticleVideoPlayer: React.FC<{ src: string; poster: string }> = ({ src, poster }) => {
  return (
    <div className="my-12 w-full bg-black rounded-sm shadow-2xl overflow-hidden border border-stone-800">
      <video controls poster={poster} className="w-full h-auto block opacity-85">
        <source src={src} type="application/x-mpegURL" />
        Błąd odtwarzania materiału dowodowego.
      </video>
    </div>
  );
};

const ElixirModalsProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;

const GalleryTrigger = ({ children, className }: { children: React.ReactNode, className?: string, type?: string }) => (
  <span className={className || "cursor-pointer"}>{children}</span>
);

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
    "image": [`${KORDYS_IMAGES_URL}/wezwanie/wezwanie_kicinski.png`],
    "datePublished": "2024-03-03",
    "author": [{
      "@type": "Person",
      "name": "Detektyw Polutek",
      "url": "mailto:detektyw.polutek@protonmail.com"
    }]
  };

  return (
    <ElixirModalsProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }}
      />

      <main className="min-h-screen bg-[#fcfbf9] text-stone-950 selection:bg-amber-100 font-serif flex flex-col items-center">
        {/* Kolumna artykułu z czarnymi paskami (border-x) */}
        <div className="w-full max-w-4xl border-x-2 border-black bg-[#fcfbf9] min-h-screen flex flex-col shadow-2xl">
          
          <BrandHeader />

          <header className="pt-8 pb-8 px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="mb-8">
                <span className="block text-5xl md:text-7xl font-bold leading-none tracking-tight text-stone-950">
                  Eliksir Wiedźmina
                </span>
                <span className="block text-2xl md:text-4xl text-stone-600 italic font-medium mt-6">
                  Mroczna tajemnica twórców CD Projekt
                </span>
              </h1>

              <div className="max-w-2xl mx-auto border-y border-stone-300 py-8 px-4">
                <p className="text-xl md:text-2xl text-stone-800 leading-relaxed italic">
                  Ayahuasca, policyjne naloty i tragedia, o której nie miał się nikt dowiedzieć. Publicznie dostępne akta ujawniają, jak twórcy gry &quot;Wiedźmin&quot; finansowali szamańskie podziemie.
                </p>
              </div>
            </div>
          </header>

          <article className="max-w-2xl mx-auto px-4 pt-8 pb-0 flex-grow">
            <div className="prose prose-stone prose-lg max-w-none prose-headings:text-stone-950 prose-a:text-stone-950 prose-a:font-bold prose-a:no-underline prose-a:underline prose-a:decoration-blue-900/30 hover:prose-a:bg-blue-50 transition-colors">

              <p className="first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-stone-950 leading-relaxed">
                W 2020 roku media obiegły doniesienia o rozbiciu grupy polskich szamanów w czeskich Hermanovicach. Policyjny nalot, aresztowanie Jarosława i Karoliny Kordysów, a następnie surowe wyroki – 8,5 oraz 5,5 roku więzienia za prowadzenie nielegalnego biznesu polegającego na organizacji tzw. &quot;ceremonii&quot;, podczas których klientom podawano egzotyczny psychodelik – ayahuaskę.
              </p>

              <p>
                Ayahuaska to tradycyjny wywar z amazońskich roślin o silnym działaniu halucynogennym. Ze względu na wysoką zawartość DMT – substancji psychodelicznej wywołującej intensywne wizje i zmiany stanu świadomości, jej posiadanie i podawanie jest w Polsce i Czechach zabronione. Finałem medialnego spektaklu Kordysów było ułaskawienie przez czeskiego prezydenta po dwóch latach odsiadki.
              </p>

              <p>
                Kurtyna opadła, temat ucichł. Ale czy to na pewno koniec tej historii? W cieniu tego głośnego procesu toczył się drugi – cichy i błyskawiczny, zakończony dyskretnym wyrokiem, o którym nikt nawet w mediach się nie zająknął. Analiza sądowych dokumentów prowadzi do zdumiewających wniosków.
              </p>

              <p>
                W przygranicznym Janowie funkcjonował drugi, bliźniaczy ayahuaskowy ośrodek, którego współwłaścicielem okazał się miliarder – Michał Kiciński.
              </p>

              <h2 className="text-3xl mt-16 mb-8 tracking-tight border-b border-stone-300 pb-2">Świadek B.</h2>

              <p>
                W obszernym i publicznie dostępnym uzasadnieniu <GalleryTrigger type="wyrok_kordys" className="font-bold underline decoration-blue-900/30 hover:bg-blue-50 transition-colors">wyroku</GalleryTrigger> Jarosława Kordysa pojawia się postać świadka Bartosza B.
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
                &quot;...w odniesieniu do nieruchomości będących współwłasnością Bartosza B. i Michała D. K.&quot;.
              </CaseFile>

              <p>
                W Czechach księgi wieczyste są jawne. Wystarczy wyszukać <GalleryTrigger type="janov" className="font-bold underline decoration-blue-900/30">działkę w Janowie</GalleryTrigger> i za niewielką opłatą pobrać jej pełną historię.
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
                 <span className="bg-amber-100/80 px-1 font-bold text-stone-950 box-decoration-clone">Michał Dawid Kiciński (90%)</span>
              </p>

              <p>
                Drugie imię – Dawid – idealnie wypełnia lukę w zanonimizowanym skrócie &quot;Michal D. K.&quot;. <span className="bg-stone-200/50 px-1 font-bold text-stone-950 shadow-sm box-decoration-clone">Wspólnikiem szamana był twórca &quot;Wiedźmina&quot; – jeden z najbogatszych Polaków.</span>
              </p>

              <h2 className="text-3xl mt-16 mb-8 tracking-tight border-b border-stone-300 pb-2 text-red-900">Na podsłuchu</h2>

              <p>
                Przełom w sprawie organizatorów ayahuaskowych ceremonii w 2020 roku nastąpił dzięki podsłuchom. Telefon Kordysa był monitorowany, a funkcjonariusze słuchali na żywo, gdy 24.08.2020 r. doszło do nerwowej wymiany zdań pomiędzy Badowskim i Kordysem.
              </p>

              <CaseFile title="Rekonstrukcja rozmowy (Uzasadnienie Sądu)" type="transcript">
                &quot;oskarżony [Jarosław Kordys] omawia z B., że dotarła do niego informacja, że w obiekcie w Janowie <span className="underline decoration-red-800 decoration-4 underline-offset-4 font-bold">zmarła jakaś kobieta</span>&quot;.
              </CaseFile>

              <p>
                W rozmowie pojawia się też wątek szantażysty. Kordys pyta wspólnika:
              </p>

              <CaseFile title="Pytanie Kordysa" type="transcript">
                &quot;W jakim zagrożeniu jest nasza praca?&quot;
              </CaseFile>

              <div className="my-12 pl-6 border-l-4 border-stone-950 font-serif italic text-xl text-stone-800">
                &quot;Z ich rozmowy wynika, że nie zajmowali się w zasadzie samym faktem śmierci, lecz raczej obawą, aby to nie przyciągnęło uwagi policji.&quot;
              </div>

              <p>
                Zaledwie dwa dni po tym telefonie, 26.08.2020 czescy policjanci weszli do posiadłości w Janowie. 
              </p>

              <CaseFile title="Protokół rewizji">
                &quot;w nieruchomości zabezpieczono rzeczy... oprócz marihuany zabezpieczono również substancje zawierające DMT o objętości ok. 2 kg&quot;.
              </CaseFile>

              <h2 className="text-3xl mt-16 mb-8 tracking-tight border-b border-stone-300 pb-2 text-stone-950">Cena wolności</h2>

              <p>
                15 października 2020 roku sielankę w Hermanovicach przerwał huk granatów ogłuszających. Czeska jednostka antyterrorystyczna wdarła się do budynku.
              </p>

              <div className="my-12 w-full rounded-sm overflow-hidden shadow-2xl">
                 <ArticleVideoPlayer
                   src={`${PINATA_GATEWAY}/${ARREST_VIDEO_CID}/videoplayback.m3u8`}
                   poster=""
                 />
              </div>

              <div className="my-12 flex gap-4 p-5 bg-blue-50/50 border-l-4 border-blue-900 rounded-r-lg shadow-sm">
                <Scale className="w-8 h-8 text-blue-900 shrink-0 mt-1" />
                <div>
                  <strong className="block font-serif text-blue-950 text-lg font-bold mb-1">Dohoda o vině a trestu</strong>
                  <div className="text-blue-900/80 text-lg leading-relaxed">
                    Ugoda o winie i karze. Czeska procedura pozwalająca oskarżonemu na dobrowolne poddanie się karze w zamian za łagodniejszy wyrok i brak publicznego przesłuchania świadków.
                  </div>
                </div>
              </div>

              <p>
                 Na mocy <GalleryTrigger type="wyrok_badi" className="font-bold underline decoration-blue-900/30">wyroku</GalleryTrigger> z dnia 2 listopada 2021 roku Bartosz Badowski został uznany winnym &quot;zbrodni niedozwolonej produkcji i innego obchodzenia się ze środkami odurzającymi&quot;.
              </p>

              <p>
                Podczas, gdy Jarosław Kordys został skazany na 8,5 roku, Bartosz Badowski zakończył sprawę wyrokiem w zawieszeniu.
              </p>

              <h2 className="text-3xl mt-16 mb-8 tracking-tight border-b border-stone-300 pb-2 text-stone-950">Cisza po burzy</h2>

              <p>
                Choć Badowski zaprzestał działalności, posiadłość w Janowie nie opustoszała – zamieszkali z nim Krzysztof Stefanek i Magdalena Drzewińska. Ich obecność u boku &quot;Badiego&quot; rzuca cień na ich lojalność – znali wszakże tajemnicę śmierci Ilony i byli obecni przy policyjnym nalocie.
              </p>

              <h2 className="text-3xl mt-16 mb-8 tracking-tight border-b border-stone-300 pb-2 text-stone-950">Kiciński</h2>

              <p>
                Michał Kiciński stał się nieoficjalnym ambasadorem ayahuaski w mediach głównego nurtu. W wywiadach dla &quot;Focusa&quot; czy &quot;Newsweeka&quot; opisuje mechanizmy działania psychodelików.
              </p>

              <PullQuote
                quote="Po ayahuasce jest szansa na to, żeby sobie nie ściemniać."
                author="Michał Kiciński"
                source="Newsweek, 30 maja 2016 r."
              />

              <h2 className="text-3xl mt-16 mb-8 tracking-tight border-b border-stone-300 pb-2 text-red-900">&quot;Błąd z Badim&quot;</h2>

              <p>
                 Michał Kiciński wiedział o Ilonie. 21 września 2023 roku miliarder osobiście odebrał wezwanie na przesłuchanie w sprawie Janowa (sygn. WD-I-3186/23).
              </p>

              <div className="my-12 flex flex-col items-center">
                <GalleryTrigger type="wezwanie_kicinski">
                  <img
                    src={`${KORDYS_IMAGES_URL}/wezwanie/wezwanie_kicinski.png`}
                    alt="Dowód: Wezwanie"
                    className="w-48 grayscale hover:grayscale-0 rounded shadow-2xl border border-stone-300 cursor-pointer transition-all"
                  />
                </GalleryTrigger>
                <p className="text-xs text-stone-500 mt-2 font-mono uppercase tracking-widest text-center">
                   Skan wezwania WD-I-3186/23
                </p>
              </div>

              <p>
                Zamiast wyjaśnień prokuratorskich, miliarder wysłał maila z propozycją darowizny na cel charytatywny, nazywając lata nielegalnego procederu &quot;młodzieńczą naiwnością&quot;.
              </p>

              <CaseFile title="Poufna wiadomość: M. Kiciński" type="email">
                &quot;(...) Tak mogę zapłacić za swój błąd z Badim. Podaj mi Fundacje... i wpłacę tam kwotę darowizny, w ramach Przeprosin wszechświatowi, za moją młodzieńczą naiwność...&quot;
              </CaseFile>

              <p>
                W protokole przesłuchania z dnia 11 października 2023 r. Kiciński twierdził, że nie ma wiedzy o tym, co działo się w jego ośrodku. Na pytanie o udział w ceremoniach odpowiedział krótko:
              </p>

              <CaseFile title="Fragment zeznań">
                &quot;o wcześniejszym okresie <span className="underline decoration-stone-900 decoration-4 underline-offset-4 font-bold">odmawiam odpowiedzi</span>&quot;
              </CaseFile>

              <p>
                Co na to Bartosz Badowski?
              </p>

              <CaseFile title="Fragment korespondencji B. Badowskiego" type="email">
                &quot;Michał wiedział dokładnie co się dzieje na farmie i czerpał z tego zyski przez wiele wiele lat. (...) ja poniosłem konsekwencje, Kiciński – żadnych.&quot;
              </CaseFile>

              <h2 className="text-3xl mt-16 mb-8 tracking-tight border-b border-stone-300 pb-2 text-stone-950">Anonimowy filantrop</h2>

              <p>
                Krzysztof Stefanek w filmach &quot;Osady Natury Zew&quot; przedstawia darowiznę Janowa jako &quot;cudowny zbieg okoliczności&quot;. Kalendarium wydarzeń sugeruje jednak nerwową ucieczkę od odpowiedzialności:
              </p>

              <ul className="list-none space-y-12 my-12 font-mono text-sm border-l-2 border-stone-300 pl-4">
                <li className="flex items-start gap-3 opacity-60">
                  <Calendar className="w-5 h-5 text-stone-500 shrink-0" />
                  <div>
                    <span className="font-bold">21 września 2023 r.</span> – Michał Kiciński odbiera wezwanie na policję.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-stone-500 shrink-0" />
                  <div>
                    <span className="font-bold">3 października 2023 r.</span> – Miliarder odkupuje udziały od Badowskiego, stając się jedynym właścicielem obiektu.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-stone-500 shrink-0" />
                  <div>
                    <span className="font-bold">11 października 2023 r.</span> – Przesłuchanie na komendzie.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-blue-900 shrink-0 mt-3" />
                  <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-sm shadow-sm w-full relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-900"></div>
                    <span className="font-bold text-blue-950">23 października 2023 r.</span> – Zaledwie 12 dni po wizycie na policji, Kiciński dzwoni do Stefanka z ofertą oddania majątku wartego miliony za darmo.
                  </div>
                </li>
              </ul>

              <p>
                Śledztwo umorzono, a majątek trafił do &quot;stowarzyszenia&quot; zarządzanego przez ludzi, którzy znali tajemnicę Janowa.
              </p>

              <div className="my-8 flex justify-start">
                 <TransactionStampUI
                  label="Nr Transakcji (Katastr)"
                  value="V-5821/2023-127"
                  subDetails="Obręb: Janov u Krnova [656976]"
                />
              </div>

              <h2 className="text-3xl mt-16 mb-8 tracking-tight border-b border-stone-300 pb-2 text-stone-950">Nýdek</h2>

              <p>
                Nieco dalej, w Nýdku, funkcjonował bliźniaczy ośrodek. Właścicielem nieruchomości – w czasie, gdy prowadzono tam ceremonie – był drugi z założycieli CD Projekt, <span className="bg-amber-100/80 px-1 font-bold text-stone-950 box-decoration-clone">Marcin Iwiński</span>.
              </p>

              <div className="my-8 flex justify-start">
                <GalleryTrigger type="nydek">
                  <LocationStampUI
                    name="NÝDEK"
                    code="708186"
                    plot="st. 506/1"
                    lv="832"
                  />
                </GalleryTrigger>
              </div>

              <p>
                Iwiński sprzedał posiadłość w czerwcu 2021 r. szamanowi Piotrowi Traczowi, krótko po tym, jak w środowisku wybuchła panika po aresztowaniu Kordysów.
              </p>

              <h2 className="text-3xl mt-16 mb-8 tracking-tight border-b border-stone-300 pb-2 text-red-900">Wiktor B.</h2>

              <p>
                Śledztwo dziennikarskie koncentruje się na śmierci Ilony L.-H. Podczas nocnej ceremonii w czerwcu 2018 r. nikt nie wezwał pomocy, a uczestnikom odebrano telefony. Prowadzący obrzęd Wiktor B. przedstawiał policji kłamliwą wersję o &quot;śmierci w łazience&quot;.
              </p>

              <p>
                Kilka miesięcy po wszczęciu oficjalnego śledztwa przez prokuraturę w 2024 r., Wiktor B. umiera w tajemniczych okolicznościach. Ciało odnaleziono w magazynie. Śledztwo w sprawie jego zgonu pozostaje zawieszone.
              </p>

              <div className="mt-8 mb-4 flex justify-end">
                 <div className="text-right border-r-4 border-stone-900 pr-4">
                    <span className="block font-bold text-stone-950 uppercase tracking-tighter">Detektyw Polutek</span>
                    <span className="block text-xs text-stone-500 font-sans mt-1 italic">detektyw.polutek@protonmail.com</span>
                 </div>
              </div>

              <div className="my-12 border-y-2 border-stone-950 py-8">
                 <h3 className="font-sans font-bold text-lg uppercase tracking-widest text-stone-950 mb-8 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-red-900" />
                    Status Prawny (2025/2026)
                 </h3>

                 <div className="grid gap-px bg-stone-300 border border-stone-300">
                    <div className="bg-[#fcfbf9] p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                       <div>
                          <span className="block font-serif text-stone-900">Śledztwo w sprawie organizacji ceremonii</span>
                          <span className="block text-xs text-stone-500">Prokuratura Rejonowa w Częstochowie</span>
                       </div>
                       <span className="font-mono text-xs font-bold bg-stone-200 px-3 py-1.5 shadow-sm whitespace-nowrap">3013-1.Ds.15.2024</span>
                    </div>

                    <div className="bg-[#fcfbf9] p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-t border-stone-200">
                       <div>
                          <span className="block font-serif text-red-900 font-bold">Śledztwo w sprawie śmierci Ilony L.-H.</span>
                          <span className="block text-xs text-stone-500">Prokuratura Rejonowa w Częstochowie</span>
                       </div>
                       <span className="font-mono text-xs font-bold bg-red-100 text-red-900 px-3 py-1.5 shadow-sm whitespace-nowrap">3013-1.Ds.4.2026</span>
                    </div>

                    <div className="bg-[#fcfbf9] p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-t border-stone-200">
                       <div>
                          <span className="block font-serif text-stone-900">Śledztwo w sprawie śmierci Wiktora B.</span>
                          <span className="block text-xs text-stone-500">Prokuratura Rejonowa w Pułtusku</span>
                       </div>
                       <div className="flex flex-col items-end gap-1">
                          <span className="font-mono text-xs font-bold bg-stone-200 px-3 py-1.5 shadow-sm whitespace-nowrap">4027-0. Ds. 1254.2024</span>
                          <span className="text-[10px] font-sans font-bold text-blue-900 uppercase tracking-tighter">Śledztwo zawieszone</span>
                       </div>
                    </div>
                 </div>
              </div>

            </div>

            <footer className="mt-4 pt-8 border-none font-sans">
               <div className="mb-8">
                 <h3 className="text-xl font-bold text-stone-950 uppercase tracking-widest flex items-center gap-2 mb-4">
                   <Search className="w-5 h-5" /> Dokumenty Źródłowe
                 </h3>
                 <div className="border-b border-stone-950 w-full mb-6"></div>
                 <div className="grid gap-4 text-sm text-stone-800">
                   <div className="p-3 bg-white border border-stone-300 hover:border-blue-900 transition-colors shadow-sm">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div>
                          <h4 className="font-bold text-stone-900 text-sm leading-tight">Wyrok Jarosława Kordysa</h4>
                          <p className="font-mono text-[10px] text-stone-500 mt-1">Sygn. 30 T 5/2020</p>
                        </div>
                        <a
                          href={KORDYS_PDF_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 w-40 justify-center bg-stone-950 text-white px-3 py-1 text-xs font-bold rounded-sm hover:bg-stone-800 transition-colors flex items-center gap-2"
                        >
                          <FileText className="w-3 h-3" /> POBIERZ AKT
                        </a>
                      </div>
                   </div>

                   <div className="p-3 bg-white border border-stone-300 hover:border-blue-900 transition-colors shadow-sm">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div>
                          <h4 className="font-bold text-stone-900 text-sm leading-tight">Wyrok Bartosza Badowskiego</h4>
                          <p className="font-mono text-[10px] text-stone-500 mt-1">Sygn. 66 T 146/2021</p>
                        </div>
                        <a
                          href={BADI_PDF_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 w-40 justify-center bg-stone-950 text-white px-3 py-1 text-xs font-bold rounded-sm hover:bg-stone-800 transition-colors flex items-center gap-2"
                        >
                          <FileText className="w-3 h-3" /> POBIERZ AKT
                        </a>
                      </div>
                   </div>
                 </div>
               </div>

               <div className="mt-16 text-center pb-12">
                  <div className="w-24 h-px bg-stone-300 mx-auto mb-6"></div>
                  <div className="mb-10 bg-stone-950 text-white p-8 rounded-sm shadow-2xl">
                    <h3 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-blue-400" /> Mirror – Archiwum Śledztwa
                    </h3>
                    <p className="text-xs text-stone-400 mb-6 leading-relaxed max-w-lg mx-auto font-mono">
                      W CELU ZAPEWNIENIA TRWAŁOŚCI DOWODÓW, DOKUMENTACJA ZOSTAŁA ZARCHIWIZOWANA W SIECI IPFS. MATERIAŁ JEST ODPORNY NA PRÓBY CENZURY.
                    </p>
                    <div className="flex flex-col gap-3 font-mono text-[10px] uppercase tracking-widest">
                      <a href="#" className="text-blue-400 hover:text-white underline">IPFS: Baza Dowodowa (Full Archive)</a>
                      <a href="#" className="text-blue-400 hover:text-white underline">Arweave: Trwała Archiwizacja</a>
                      <a href="#" className="text-blue-400 hover:text-white underline">GitHub: Source Mirror</a>
                    </div>
                  </div>

                  <p className="text-xs text-stone-500 font-mono uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
                    <Globe className="w-4 h-4 text-stone-500" /> Oficjalna Witryna
                  </p>
                  <a
                    href="https://www.eliksir-wiedzmina.pl"
                    className="font-mono text-sm text-stone-950 font-bold hover:text-blue-900 transition-colors underline decoration-stone-300"
                  >
                    www.eliksir-wiedzmina.pl
                  </a>
               </div>
            </footer>
          </article>
        </div>
      </main>
    </ElixirModalsProvider>
  );
}
