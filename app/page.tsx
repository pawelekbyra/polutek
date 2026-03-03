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
        <h1 className="text-5xl md:text-[6.5rem] font-black tracking-tighter text-stone-900 uppercase font-serif leading-none whitespace-nowrap">
          NASZA GAZETKA
        </h1>
      </div>
      <div className="w-[98%] mx-auto border-y-[3px] border-stone-900 py-1.5 flex items-center justify-between px-4 text-[10px] md:text-sm font-bold uppercase tracking-[0.1em] text-stone-600">
        <div className="flex items-center gap-2">
          <span>📰</span>
          <span className="hidden sm:inline">Niezależne Media Śledcze</span>
        </div>
        <div className="text-center font-serif font-black">
          NIEDZIELA, 1 MARCA 2026
        </div>
        <div className="flex items-center gap-2">
          <span>📄</span>
          <span className="hidden md:inline border-l-2 border-stone-900 pl-2 ml-1">Wydanie Specjalne</span>
        </div>
      </div>
    </div>
  );
};

const CaseFile = ({ title, children, type = '📄' }: { title: string, children: React.ReactNode, type?: string }) => (
  <div className="my-8 border border-stone-200 bg-stone-50/60 shadow-sm rounded-sm overflow-hidden break-inside-avoid text-left">
    <div className="bg-stone-100 border-b border-stone-200 px-4 py-2 flex items-center gap-2 text-xs font-mono text-stone-500 uppercase tracking-wider">
      <span>{type === 'transcript' ? '🎙️' : type === 'email' ? '✉️' : '📄'}</span>
      <span>{title}</span>
    </div>
    <div className="p-6 font-mono text-sm md:text-base leading-relaxed text-stone-900 italic">
      {children}
    </div>
  </div>
);

const PullQuote = ({ quote, author, source }: { quote: string, author: string, source: string }) => (
  <div className="my-10 pl-6 border-l-[3px] border-blue-700/80 text-left">
    <p className="font-serif text-xl md:text-2xl italic text-stone-900 leading-relaxed mb-3">
      „{quote}"
    </p>
    <div className="font-sans text-[10px] uppercase tracking-widest text-stone-500">
      — <span className="font-bold text-stone-600">{author}</span>, {source}
    </div>
  </div>
);

const LocationStampUI = ({ name, plot, lv, code }: { name: string, plot: string, lv: string, code?: string }) => (
  <div className="relative border border-stone-200 bg-stone-50/80 p-1 pr-6 rounded-sm flex items-center gap-4 shadow-[2px_2px_0px_0px_rgba(231,229,228,0.5)] text-left group">
      <div className="absolute top-1 right-1 text-stone-400">
        🔍
      </div>
      <div className="bg-stone-100 h-full p-3 flex items-center justify-center border-r border-stone-200 border-dashed transition-colors">
         <span className="text-xl">🏠</span>
      </div>
      <div className="py-2">
         <div className="text-[9px] uppercase tracking-[0.2em] text-stone-500 font-bold mb-1 flex items-center gap-2">
           {name} {code && `[${code}]`}
         </div>
         <div className="font-mono text-base font-bold text-stone-900">LV {lv}</div>
         <div className="text-[10px] text-stone-500 font-mono mt-1">
           Działka: {plot}
         </div>
      </div>
  </div>
);

const TransactionStampUI = ({ label, value, subDetails }: { label: string, value: string, subDetails?: string }) => (
  <div className="relative border border-stone-200 bg-stone-50/80 p-1 pr-6 rounded-sm flex items-center gap-4 shadow-[2px_2px_0px_0px_rgba(231,229,228,0.5)] group text-left">
      <div className="absolute top-1 right-1 text-stone-400">
        🔍
      </div>
      <div className="bg-stone-100 h-full p-3 flex items-center justify-center border-r border-stone-200 border-dashed">
         <span className="text-xl">📜</span>
      </div>
      <div className="py-2">
         <div className="text-[9px] uppercase tracking-[0.2em] text-stone-500 font-bold mb-1">{label}</div>
         <div className="font-mono text-base font-bold text-stone-900">{value}</div>
         {subDetails && <div className="text-[10px] text-stone-500 font-mono mt-1">{subDetails}</div>}
      </div>
  </div>
);

const ArticleVideoPlayer: React.FC<{ src: string; poster: string }> = ({ src, poster }) => {
  return (
    <div className="my-12 w-full bg-black rounded-sm shadow-xl overflow-hidden">
      <video controls poster={poster} className="w-full h-auto block opacity-95">
        <source src={src} type="application/x-mpegURL" />
        Twoja przeglądarka nie obsługuje odtwarzacza wideo. <a href={src} className="text-white underline">Pobierz plik</a>.
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

      <main className="min-h-screen bg-white text-stone-900 selection:bg-blue-100/50 font-serif flex flex-col items-center">
        <div className="w-full max-w-5xl border-x border-stone-200 bg-white min-h-screen flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.02)]">
          
          <BrandHeader />

          <header className="pt-8 pb-8 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="mb-8 text-stone-900">
                <span className="block text-5xl md:text-7xl font-bold leading-none tracking-tight">
                  Eliksir Wiedźmina
                </span>
                <span className="block text-2xl md:text-4xl text-stone-600 italic font-medium mt-6 max-w-3xl mx-auto">
                  Mroczna tajemnica twórców CD Projekt
                </span>
              </h1>

              <div className="max-w-2xl mx-auto border-y border-stone-200 py-8 px-4">
                <p className="text-xl md:text-2xl text-stone-800 leading-relaxed italic">
                  Ayahuasca, policyjne naloty i tragedia, o której nie miał się nikt dowiedzieć. Publicznie dostępne akta i rejestry ujawniają, jak twórcy gry &quot;Wiedźmin&quot; finansowali szamańskie podziemie.
                </p>
              </div>
            </div>
          </header>

          <article className="max-w-2xl mx-auto px-4 pt-8 pb-0 flex-grow">
            <div className="prose prose-stone prose-lg max-w-none prose-headings:font-sans prose-headings:font-bold prose-blockquote:not-italic
              prose-a:text-stone-900 prose-a:font-bold prose-a:no-underline prose-a:underline prose-a:decoration-double prose-a:decoration-blue-200 hover:prose-a:bg-stone-100 transition-colors">

              <p className="first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-stone-900 leading-relaxed">
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

              <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Świadek B.</h2>

              <p>
                W obszernym i publicznie dostępnym uzasadnieniu <GalleryTrigger type="wyrok_kordys" className="font-bold text-stone-900 underline decoration-double decoration-blue-200 hover:bg-stone-100 transition-colors">wyroku</GalleryTrigger> Jarosława Kordysa pojawia się postać świadka Bartosza B.
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
                &quot;(...) budynek rodzinny in miejscowości Janov (...), który jest częściowo użytkowany do stałego zamieszkania, a częściowo jako komercyjny obiekt noclegowy&quot;
                <br/><br/>
                &quot;Świadek [Bartosz B.] potwierdził, że in Janowie jest właścicielem jednej dziesiątej nieruchomości&quot;.
              </CaseFile>

              <p>
                Do kogo należała reszta? Sąd wskazuje wprost:
              </p>

              <CaseFile title="Ustalenia Sądu">
                &quot;...w odniesieniu do nieruchomości będących współwłasnością Bartosza B. i Michała D. K.&quot;.
              </CaseFile>

              <p>
                W Czechach księgi wieczyste są jawne i dostępne online. Wyszukać <GalleryTrigger type="janov" className="font-bold text-stone-900 underline decoration-double decoration-blue-200 hover:bg-stone-100 transition-colors">działkę in Janowie</GalleryTrigger> i za niewielką opłatą pobrać jej pełną historię.
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
              Pobrany dokument nie pozostawia wątpliwości: in latach 2012–2023 współwłaścicielami nieruchomości byli:
                 <br/>
                 Bartosz Badowski (10%)
                 <br/>
                 <span className="bg-stone-200/80 px-1 font-bold text-stone-900 box-decoration-clone">Michał Dawid Kiciński (90%)</span>
              </p>

              <p>
                Drugie imię – Dawid – idealnie wypełnia lukę in zanonimizowanym skrócie &quot;Michal D. K.&quot;. <span className="bg-stone-100 px-1 font-bold text-stone-900 shadow-sm box-decoration-clone">Wspólnikiem szamana był twórca &quot;Wiedźmina&quot; – jeden z najbogatszych Polaków.</span>
              </p>

              <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Na podsłuchu</h2>

              <p>
                Przełom in sprawie organizatorów ayahuaskowych ceremonii in 2020 roku nastąpił dzięki policyjnej technice operacyjnej. Telefon Kordysa był na stałym podsłuchu, a funkcjonariusze słuchali na żywo, gdy in dniu 24.08.2020 r. doszło do nerwowej wymiany zdań pomiędzy Badowskim i Kordysem.
              </p>

              <p>
                Kordys zadzwonił do Badowskiego wyraźnie zaniepokojony wieściami, które do niego dotarły. Bał się, że tragedia, o której huczało in kuluarach, może zniszczyć ich imperium. Sąd in uzasadnieniu wyroku precyzyjnie rekonstruuje ten moment:
              </p>

              <CaseFile title="Rekonstrukcja rozmowy (Uzasadnienie Sądu)" type="transcript">
                &quot;oskarżony [Jarosława Kordysa] omawia z B., że dotarła do niego informacja, że in obiekcie in Janowie <span className="underline decoration-red-700 decoration-4 underline-offset-4">zmarła jakaś kobieta</span>&quot;.
              </CaseFile>

              <p>
                W rozmowie pojawia się też wątek zagrożenia ze strony osoby trzeciej – mężczyźni omawiają szantażystę, który chce iść na policję. Kordys inprost pyta wspólnika:
              </p>

              <CaseFile title="Pytanie Kordysa" type="transcript">
                &quot;W jakim zagrożeniu jest nasza praca?&quot;
              </CaseFile>

              <p>
                Odpowiedź na to pytanie znajduje się in aktach sprawy i nie pozostawia złudzeń co do intencji rozmówców. W uzasadnieniu wyroku Kordysa czytamy:
              </p>

              <div className="my-12 pl-6 border-l-4 border-stone-900 font-serif italic text-xl text-stone-800">
                &quot;Z ich rozmowy wynika, że nie zajmowali się in zasadzie samym faktem śmierci, lecz raczej obawą, aby to nie przyciągnęło uwagi policji.&quot;
              </div>

              <p>
                Dla sądu był to koronny dowód na to, że oskarżeni prowadzili nielegalny biznes, a nie działalność duchową – śmierć człowieka była dla nich jedynie &quot;psuciem interesów&quot;.
              </p>

              <p>
                Cynizm tej konwersacji sięga zenitu chwilę później. Gdy tylko ustalili strategię uciszenia plotek, natychmiast przeszli do logistyki dostaw narkotyku. Sąd odnotowuje, że zaraz po dywagacjach o śmierci i szantażu, rozmówcy wracają do interesów:
              </p>

              <CaseFile title="Kontynuacja rozmowy" type="transcript">
                &quot;Następnie in rozmowie omawiają zamówienia «herbaty» z dżungli i to, czy im tego «nie zepsują», ekscytując się nagraniem od dostawcy, który «siedzi in dżungli i gotuje».&quot;
              </CaseFile>

              <p>
                Dla policjantów, którzy słyszeli to in czasie rzeczywistym, przekaz był jasny: in obiekcie mogło dojść do tragedii, a sprawcy martwili się jedynie o ciągłość dostaw.
              </p>

              <p>
                Zaledwie dwa dni po tym telefonie, 26.08.2020 czescy policjanci weszli do posiadłości in Janowie. Efekty rewizji opisano in wyroku Kordysa:
              </p>

              <CaseFile title="Protokół rewizji">
                &quot;w nieruchomości zabezpieczono rzeczy... oprócz marihuany zabezpieczono również substancje zawierające DMT o objętości ok. 2 kg&quot;.
              </CaseFile>

              <p>
                Podczas policyjnej interwencji zidentyfikowano tam 15 obywateli Polski, którzy mieli brać udział in ceremonii. Wśród nich, stali bywalcy i bliscy znajomi Badowskiego – Krzysztof Stefanek i Lena Drzewińska, których obecność in momencie wkroczenia służb ma znaczenie in kontekście późniejszej ich roli in tej historii.
              </p>

              <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Cena wolności</h2>

              <p>
                Kiedy 26 sierpnia 2020 roku czeska policja weszła do posiadłości in Janowie, należącej do Bartosza Badowskiego i miliardera Michała Kicińskiego, Jarosław Kordys in Hermanovicach inciąż czuł się bezpiecznie. Nie wiedział jeszcze, że zegar zaczął odliczać czas do jego własnej katastrofy. Zaledwie 7 tygodni po cichym nalocie na Badowskiego policja zapukała do Kordysów.
              </p>

              <p>
                15 października 2020 roku sielankę in ich ośrodku przerwał huk granatów ogłuszających. Czeska jednostka antyterrorystyczna nie bawiła się in półśrodki: zamaskowani funkcjonariusze z długą bronią wdarli się do budynku, rzucając na ziemię przyszłych bohaterów głośnego skandalu.
              </p>

              <div className="my-12 w-full rounded-sm overflow-hidden shadow-md">
                 <ArticleVideoPlayer
                   src={`${PINATA_GATEWAY}/${ARREST_VIDEO_CID}/videoplayback.m3u8`}
                   poster=""
                 />
              </div>
               <div className="mt-1 text-sm text-stone-600 font-sans border-l-2 border-stone-200 pl-3 mb-12">
                   <span className="font-bold text-stone-900 uppercase text-xs mr-2">Materiał Operacyjny:</span>
                   Nagranie z policyjnego nalotu na ośrodek in Hermanovicach (15.10.2020)
                </div>

              <p>
                Co wydarzyło się in ciągu tych niespełna dwóch miesięcy? Odpowiedź kryje się in jednym czeskim terminie prawnym:
              </p>

              <div className="my-12 flex gap-4 p-5 bg-stone-50 border-l-4 border-stone-400 rounded-r-lg shadow-sm">
                <Scale className="w-8 h-8 text-stone-400 shrink-0 mt-1" />
                <div>
                  <strong className="block font-serif text-stone-900 text-lg font-bold mb-1">Dohoda o vině a trestu</strong>
                  <div className="text-stone-800 text-lg leading-relaxed">
                    Ugoda o winie i karze. Czeska procedura karna pozwalająca oskarżonemu na dobrowolne poddanie się karze in zamian za łagodniejszy wyrok, bez przeprowadzania pełnego procesu dowodowego i wzywania świadków.
                  </div>
                </div>
              </div>

              <p>
                Bartosz &quot;Badi&quot; Badowski, wspólnik jednego z najbogatszych Polaków, błyskawicznie zrozumiał swoje położenie. W obliczu zabezpieczonych dowodów – in tym 2 kilogramów substancji z DMT i marihuany – wybrał strategię, która miała uchronić go przed wieloletnim więzieniem. Postanowił &quot;kupić&quot; sobie wolność.
              </p>

              <p>
                Ugoda pozwoliła na zamknięcie jego teczki bez wywoływania świadków, co in praktyce oznaczało, że mechanizamy działania janowskiego ośrodka nigdy nie wybrzmiały echem in publicznej debacie, chroniąc Badowskiego przed krzyżowym ogniem pytań i zeznaniami, które mogłyby pogrążyć także jego cichego wspólnika.
              </p>

              <p>
                Cena wolności Badowskiego okazała się być wysoka dla jego kolegi z branży. Zeznania &quot;Badiego&quot; były dla prokuratury bezcennym materiałem dowodowym, który pozwolił domknąć łańcuch poszlak in sprawie Kordysów.
              </p>

              <p>
                 Na mocy <GalleryTrigger type="wyrok_badi" className="font-bold text-stone-900 underline decoration-double decoration-blue-200 hover:bg-stone-100 transition-colors">wyroku</GalleryTrigger> z dnia 2 listopada 2021 roku Bartosz Badowski został uznany winnym popełnienia &quot;zbrodni niedozwolonej produkcji i innego obchodzenia się ze środkami odurzającymi&quot;.
              </p>

              <p>
                Sąd ustalił, że:
              </p>

              <CaseFile title="Ustalenia wyroku skazującego Bartosza B.">
                &quot;co najmniej od bliżej nieustalanej daty in 2015 roku do 26.08.2020 [...] oferował, organizował i co najmniej in 441 przypadkach zrealizował in nieregularnych odstępach czterodniowe i dziesięciodniowe pobyty [...] ukierunkowane na tzw. duchowe ćwiczenia spirytualne&quot;
                <br/><br/>
                &quot;udostępnił uczestnikom do użycia bliżej nieustaloną ilość substancji psychotropowych, a mianowicie tzw. ayahuascę zawierającą dimetylotryptaminę (DMT) oraz tzw. marihuanę zawierającą tetrahydrokannabinol (THC)&quot;
                <br/><br/>
                &quot;przechowywał łącznie 1902,79 grama materiału roślinnego (...), który zawierał łącznie 37,24 grama substancji czynnej dimetylotryptaminy (DMT) oraz 92,29 grama tzw. narkotyku marihuany&quot;.
              </CaseFile>

              <p>
                Podczas, gdy Jarosław Kordys został skazany na 8,5 roku pozbawienia wolności Bartosz Badowski, którego sprawa dotyczyła tego samego procederu, tych samych substancji, regionu i czasu trwania działalności, dzięki ugodzie i współpracy z wymiarem sprawiedliwości, zakończył sprawę wyrokiem in zawieszeniu.
              </p>

              <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Cisza po burzy</h2>

              <p>
                Choć Badowski zaprzestał prowadzenia działalności szamańskiej, posiadłość in Janowie nie opustoszała – zamieszkali z nim wspomniani wcześniej Krzysztof Stefanek i Magdalena Drzewińska. Ich obecność u boku &quot;Badiego&quot; in tamtym czasie rzuca cień na ich późniejszą rolę; nie byli to wszakże niewinni obserwatorzy, lecz ludzie, którzy mimo tego, że sami byli obecni podczas policyjnej interwencji, pozostali lojalni wobec byłego szamana.
              </p>

              <p>
                Będąc tak blisko Badowskiego, doskonale znali mroczną tajemnicę śmierci Ilony. Ich decyzja o zamieszkaniu z człowiekiem, który in obliczu tragedii martwił się o &quot;ciągłość dostaw&quot;, dowodzi, że in pełni akceptowali reguły zmowy milczenia.
              </p>

              <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Kiciński</h2>

              <p>
                W cieniu tych wyroków pozostaje inciąż niewyjaśniona rola cichego wspólnika. Michał Kiciński to nie jest postać, która o ayahuasce jedynie &quot;słyszała&quot; – on stał się jej nieoficjalnym ambasadorem in polskich mediach głównego nurtu. W licznych wywiadach (m.in. dla &quot;Focusa&quot;, &quot;Newsweeka&quot;) z niezwykłą precyzją opisuje on mechanizamy działania psychodelików. Kiciński publicznie opowiada o lekcjach pokory, jakie dała mu &quot;medycyna&quot;, o spotkaniach z szamanami i o tym, jak napar z dżungli otwiera &quot;nową rzeczywistość&quot;.
              </p>

              <PullQuote
                quote="Po ayahuasce jest szansa na to, żeby sobie nie ściemniać."
                author="Michał Kiciński"
                source="Newsweek, 30 maja 2016 r."
              />

              <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">&quot;Błąd z Badim&quot;</h2>

              <p>
                 Michał Kiciński wiedział o Ilonie. Jego konfrontacja z organami ścigania nabrała formalnego kształtu dopiero jesienią 2023 roku. 21 września 2023 roku miliarder osobiście odebrał wezwanie do stawiennictwa in charakterze świadka in sprawie o sygnaturze WD-I-3186/23. Miało się ono odbyć 18.10.2023. Na wezwaniu czytelnie było napisane, że przesłuchanie będzie dotyczyć &quot;pobytu in Janowie&quot;.
              </p>

              <div className="my-12 flex flex-col items-center">
                <GalleryTrigger type="wezwanie_kicinski">
                  <img
                    src={`${KORDYS_IMAGES_URL}/wezwanie/wezwanie_kicinski.png`}
                    alt="Wezwanie na policję"
                    className="w-48 rounded shadow-md border border-stone-200 cursor-pointer hover:opacity-90 transition-opacity"
                  />
                </GalleryTrigger>
                <p className="text-xs text-stone-500 mt-2 font-mono uppercase tracking-wider w-48 text-center">
                  Skan wezwania (Kliknij)
                </p>
              </div>

              <p>
                Reakcja miliardera na zainteresowanie organów ścigania była błyskawiczna. Zwrócił się bezpośrednio do autora zawiadomienia – wysyłając mu wiadomość mailową z propozycją swoistej pokuty. Zamiast wyjaśnień prokuratorskich zaoferował przelew na cel charytatywny, nazywając lata nielegalnego procederu młodzieńczą naiwnością.
              </p>

              <CaseFile title="Wiadomość prywatna od M. Kicińskiego" type="email">
                &quot;(...) Tak mogę zapłacić za swój błąd z Badim. Podaj mi Fundacje lub Stowarzyszenie (najlepiej powiązaną z hospicjum lub domami dziecka, bo tu widzę morze potrzeb i dużo cierpienia) i wpłacę tam dobrowolnie kwotę darowizny, in ramach Przeprosin wszechświatowi, za moją młodzieńczą naiwność i brak przenikliwości. Fundacja / Stowarzyszenie musi być uznana i z tradycjami, a nie jakaś organizacja krzak. Wyślę Ci potwierdzenie przelewu. (...)&quot;
              </CaseFile>

              <p>
                Do przesłuchania doszło tydzień przed terminem wskazanym na wezwaniu – 11 października 2023 roku o godzinie 15:00 in Komendzie Rejonowej Policji Warszawa II. W protokole Kiciński przyjmuje linię opartą na braku świadomości co do charakteru działalności prowadzonej in jego posiadłości.
              </p>

              <CaseFile title="Zeznanie do protokołu">
                &quot;Nie mam żadnej wiedzy co się działo na mojej farmie, in której jestem 90% udziałowcem (...) wynajmowałem tę nieruchomość.&quot;
              </CaseFile>

              <p>
                Gdy in toku czynności padło kluczowe pytanie o jego własny udział in ceremoniach ayahuaski in Janowie, odpowiedź była lakoniczna:
              </p>

              <CaseFile title="Odpowiedź na pytanie o udział">
                &quot;nie brałem udziału in takich ceremoniach in latach 2016-2023, a o wcześniejszym okresie <span className="underline decoration-stone-900 decoration-4 underline-offset-4 font-bold">odmawiam odpowiedzi</span>&quot;
              </CaseFile>

              <p>
                W kontekście złożonych zeznań warto zauważyć, że miliarder jest właścicielem luksusowego ośrodka Munay Sonqo in Peru, o którym wielokrotnie wspomniał in wywiadach.
              </p>

              <p>
                W przeciwieństwie do Europy, peruwiańskie prawo zezwala na komercyjne prowadzenie ceremonii z ayahuascą. Ośrodek Kicińskiego oferuje tam in pełni jawną i profesjonalną sprzedaż usług o profilu bliźniaczym do tych, które in Czechach są zakazane, co inciąż jest eksponowane na stronie internetowej.
              </p>

              <p>
                Fakt, że Kiciński in momencie przesłuchania zarządzał legalnym biznesem ayahuaskowym in Ameryce Południowej, stawia pod znakiem zapytania jego deklarowaną nieświadomość co do profilu działalności in Janowie.
              </p>

              <p>
                Co na to Bartosz Badowski?
              </p>

              <CaseFile title="Fragment korespondencji B. Badowskiego" type="email">
                &quot;Przelewy wysyłałem z mojego konta ING, które mam do tej pory [...]. Tytuł „wynajem”. (...) Dopóki zarabiałem - dzieliłem się z nim zyskiem.(...) Michał wiedział dokładnie co się dzieje na farmie i czerpał z tego zyski przez wiele wiele lat. (...) Rozważam też wizytę na Policji in Czechach - ja poniosłem prawne konsekwencje za prowadzenie ceremonii, ale Kiciński - żadnych. Mimo, że to on czerpał z tego największe zyski, to on był nade mną i był większościowym właścicielem farmy.&quot;
              </CaseFile>

              <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Anonimowy filantrop</h2>

              <p>
                W listopadzie 2025 roku na kanale YouTube &quot;Osada Natury Zew&quot; pojawia się nagrany rok wcześniej film, in którym obecny gospodarz, Krzysztof Stefanek, snuje opowieść o powstaniu &quot;Osady&quot;. W sielskiej scenerii, z uśmiechem na ustach, buduje narrację o cudownym zbiegu okoliczności i tajemniczym dobroczyńcy.
              </p>

              <p>
                Stefanek wspomina, jak wspólnie z grupą przyjaciół pomagał uporządkować sprawy własnościowe, by obiekt &quot;znalazł się in jednych rękach&quot;. Kluczowy moment tej opowieści Stefanek datuje z niezwykłą precyzją:
              </p>

              <CaseFile title="Wypowiedź K. Stefanka">
                &quot;Ostatecznie <span className="bg-stone-200/80 px-1 font-bold box-decoration-clone">23 października 2023 roku</span> ten człowiek do nas zadzwonił powiedział, że wspólnie z żoną zdecydowali, że oni by chcieli to miejsce przekazać in darowiźnie&quot;
              </CaseFile>

              <p>
                Stefanek przedstawia to jako efekt &quot;researchu&quot; darczyńcy, który rzekomo urzekła wizja działalności non-profit.
              </p>

              <div className="my-12 w-full rounded-sm overflow-hidden shadow-md">
                    <ArticleVideoPlayer
                 src={`${PINATA_GATEWAY}/${VIDEO_CID}/YTDowncom_YouTube_Media_4Xujw-krjxs_001_1080p-1.m3u8`}
                 poster=""
               />
              </div>
               <div className="mt-1 text-sm text-stone-600 font-sans border-l-2 border-stone-200 pl-3 mb-12">
                  <span className="font-bold text-stone-900 uppercase text-xs mr-2">Materiał Wideo:</span>
                  Krzysztof Stefanek opowiada o &quot;cudownym&quot; otrzymaniu darowizny (Materiał z 2025 r.)
                </div>

              <p>
                Jednak kalendarz wydarzeń prawnych burzy ten romantyczny mit, ujawniając nerwowy pośpiech in pozbywaniu się &quot;gorącego kartofla&quot;:
              </p>

              <ul className="list-none space-y-12 my-12 font-mono text-sm border-l-2 border-stone-200 pl-4">
                <li className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-stone-500 shrink-0" />
                  <div>
                    <span className="font-bold">21 września 2023 r.</span> – Michał Kiciński odbiera wezwanie na przesłuchanie in sprawie Janowa.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-stone-500 shrink-0" />
                  <div>
                    <span className="font-bold">3 października 2023 r.</span> – Na tydzień przed wizytą na komendzie odkupuje od Bartosza Badowskiego jego 10% udziałów in nieruchomości. Aby pozbyć się całego ośrodka jednym podpisem, musi najpierw stać się jego jedynym właścicielem.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-stone-500 shrink-0" />
                  <div>
                    <span className="font-bold">11 października 2023 r.</span> – Miliarder staje przed policją. Do protokołu odmawia zeznań na temat swojej przeszłości in tym miejscu.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-blue-700 shrink-0 mt-3" />
                  <div className="bg-blue-50 border border-blue-100 p-4 rounded-sm shadow-sm w-full relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-700"></div>
                    <span className="font-bold text-stone-900">23 października 2023 r.</span> – Zaledwie 12 dni po kłopotliwym przesłuchaniu, gdy formalności własnościowe z Badim są już dopięte, następuje telefon do Stefanka z propozycją oddania majątku wartego miliony za darmo.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-stone-500 shrink-0" />
                  <div>
                    <span className="font-bold">21 grudnia 2023 r.</span> – Finał operacji. Kiciński formalnie przekazuje Janov in formie darowizny. Nieruchomość trafia do stowarzyszenia &quot;non-profit&quot; – fasadowej organizacji &quot;krzak&quot;, zarządzanej przez ludzi, którzy przez lata byli częścią tego procederu. Miliarder pozbywa się dowodów, a nowi właściciele zyskują bazę do dalszej działalności pod nowym szyldem.
                  </div>
                </li>
              </ul>

              <p>
                Cynizm tej sytuacji pogłębia fakt, że obdarowani nie byli przypadkowymi entuzjastami ekologii. Krzysztof Stefanek, który in filmie mówi o &quot;odwróconej logice&quot; i pięknie wolontariatu, i jego konkubina Magdalena Drzewińska in rzeczywistości doskonale znali mroczną historię Janowa i tajemnicę śmierci Ilony. Przyjmując darowiznę, przejmowali nie tylko ziemię, ale i milczenie.
              </p>

              <div className="my-8 flex justify-start">
                 <TransactionStampUI
                  label="Nr Transakcji (Katastr)"
                  value="V-5821/2023-127"
                  subDetails="Obręb: Janov u Krnova [656976]"
                />
              </div>

              <p>
                Ostatecznie strategia okazała się skuteczna. Śledztwo umorzono zanim się zaczęło, a majątek, który mógł podlegać przepadkowi jako narzędzie przestępstwa, został bezpiecznie zaparkowany in &quot;stowarzyszeniu&quot;. Kiciński pozostał anonimowym &quot;filantropem&quot;, a Stefanek – opiekunem nowej, &quot;czystej&quot; osady.
              </p>

              <p>
                Na tragedii świadomie wzbogacili się ludzie, dla których tuszowanie prawdy stało się fundamentem ich nowej, intratnej rzeczywistości. Pod szyldem organizacji non-profit Stowarzyszenie Natury Zew żyją teraz z organizacji turnusów wypoczynkowych z cennikiem darowizn zamiast paragonów, okłamując swoich gości i publicznie każdego, kto natrafi na ich sielankowe filmiki. A przecież &quot;zadośćuczynienie wszechświatowi&quot; miało trafić na hospicjum, a nie na &quot;organizację krzak&quot;.
              </p>

              <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Nýdek</h2>

              <p>
                Gdyby sprawa dotyczyła tylko jednego miliardera, można by mówić o przypadku lub pechowym doborze najemców. Jednak nieco dalej od Janowa, in miejscowości Nýdek, funkcjonował kolejny, bliźniaczy ośrodek.
              </p>

              <p>
                Relacje świadków wskazują, że in <GalleryTrigger type="nydek" className="font-bold text-stone-900 underline decoration-double decoration-blue-200 hover:bg-stone-100 transition-colors">posiadłości in Nýdku</GalleryTrigger> odbywały się regularne ceremonie o charakterze zbliżonym do tych u Kordysów i Badowskiego, prowadzone przez Piotra &quot;Bonawenturę&quot; Tracza. Chociaż witryna ośrodka już nie istnieje, archiwum internetu &quot;Wayback Machine&quot; zachowało zrzuty strony tribunydek.com. Opisy warsztatów jednoznacznie wskazują, że nieruchomość była wykorzystywana do pracy z psychodelikami.
              </p>

              <p>
                Skoro wiemy już, czym ten dom był, kluczowym pytaniem staje się: do kogo należał?
              </p>

              <p>
                Analiza czeskich ksiąg wieczystych przynosi sensacyjne odkrycie. Właścicielem tej kolejnej szamańskiej świątyni – dokładnie in czasie, gdy strona internetowa zapraszała na ceremonie – był drugi z duetu miliarderów stojących za gamingowym gigantem, <span className="bg-stone-200/80 px-1 font-bold text-stone-900 box-decoration-clone">Marcin Iwiński</span>. Dokumenty urzędowe bezlitośnie łączą jego nazwisko z infrastrukturą, in której odbywał się nielegalny proceder.
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
                <span className="bg-stone-100 px-1 font-bold text-stone-900 shadow-sm">Oznacza to, że nie jeden lecz obaj legendarni założyciele CD Projekt, na czeskim pograniczu posiadali nieruchomości, in których odpłatnie oferowano te same nielegalne substancje.</span>
              </p>

              <p>
                Jeszcze bardziej zastanawiające jest to, co stało się z tą nieruchomością in momencie zagrożenia. Gdy 15.10.2020 roku aresztowano Kordysa, nad środowiskiem zawisło widmo policyjnych nalotów. Dokumenty urzędowe odsłaniają niepokojącą zbieżność dat:
              </p>

              <ul className="list-none space-y-12 my-12 font-mono text-sm border-l-2 border-stone-200 pl-4">
                 <li className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-stone-500 shrink-0" />
                  <div>
                    <span className="font-bold">15 października 2020 r.</span> – Policyjny szturm na ośrodek Kordysów. W środowisku wybucha panika.
                  </div>
                 </li>

                <li className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-stone-500 shrink-0" />
                  <div>
                    <span className="font-bold">15 czerwca 2021 r.</span> – Marcin Iwiński sprzedaje nieruchomości in Nýdku.
                  </div>
                </li>
              </ul>

              <p>
                Nabywcą luksusowej posiadłości nie został inny inwestor, lecz sam Piotr Tracz – ten sam człowiek, który wcześniej pełnił tam rolę szamana.
              </p>

              <div className="my-8 flex justify-start">
                <TransactionStampUI
                  label="Nr Transakcji (Katastr)"
                  value="V-2937/2021-832"
                  subDetails="Obręb: Nýdek [708186]"
                />
              </div>

              <p>
                Transakcja ta rodzi wątpliwości: in jaki sposób niszowy szaman sfinansował zakup luksusowej willi od jednego z najbogatszych Polaków? Nowy właściciel niemal natychmiast zmienił formalny profil działalności na legalne warsztaty pracy z ciałem. Zbieżność tej sekwencji zdarzeń z &quot;darowizną&quot; Kicińskiego in Janowie pozwala dostrzec powtarzalny schemat wycofywania się właścicieli z infrastruktury powiązanej z nielegalnym procederem.
              </p>

              <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Wiktor B.</h2>

              <p>
                3 marca 2026 Onet ujawnia opinii publicznej wstrząsające kulisy działalności ośrodka in czeskim Janowie, gdzie podczas szamańskich ceremonii z użyciem ayahuaski miało dojść do tragicznych zdarzeń. Dziennikarskie śledztwo koncentruje się na śmierci 54-letniej uczestniczki, Ilony L.-H.
              </p>

              <p>
                Według ustaleń Onetu, in czerwcu 2018 roku na farmie in Janowie doszło do tragedii. Podczas nocnej ceremonii z użyciem ayahuaski, kobieta poczuła się fatalnie, zmagając się z silnym bólem i intensywnymi wymiotami. Mimo jej krytycznego stanu, nikt nie wezwał pomocy medycznej. Co więcej, uczestnikom odebrano wcześniej telefony, co uniemożliwiło im samodzielne zaalarmowanie służb ratunkowych.
              </p>

              <p>
                Prowadzący obrzęd Wiktor B., brat głównego organizatora ceremonii znanego jako Badi, był tej nocy pod wpływem marihuany. Z relacji świadków wynika, że po śmierci kobiety podjął on natychmiastowe działania mające na celu zatuszowanie incydentu. Nakazał uczestnikom bezzwłoczne opuszczenie ośrodka. Czeskiej policji przedstawił fałszywą wersję zdarzeń, twierdząc, że Ilona L.-H. była jedynie gościem i została znaleziona martwa in łazience nad ranem. Służby początkowo nie nabrały podejrzeń, przyjmując tę relację za wiarygodną.
              </p>

              <p>
                Przez kolejne lata tę kłamliwą narrację udawało się skutecznie utrzymywać. O nieszczęśliwym wypadku i śmierci z przyczyn naturalnych przez długi czas przekonana była nawet najbliższa rodzina Ilony.
              </p>

              <p>
                Sytuacja uległa diametralnej zmianie 6 maja 2024 roku, gdy Prokuratura Okręgowa in Częstochowie wszczęła oficjalne śledztwo in sprawie działalności ośrodka oraz okoliczności śmierci Ilony L.-H. Kilka miesięcy po rozpoczęciu intensywnych działań przez polskich śledczych, in tajemniczych okolicznościach umiera Wiktor B.
              </p>

              <p>
                Ciało mężczyzny odnaleziono in magazynie firmy, in której pracował przy montażu szaf serwerowych. Na jego ciele nie stwierdzono widocznych obrażeń wskazujących na użycie siły fizycznej. Mimo że od śmierci Wiktora B. minęło już ponad półtora roku, śledczy inciąż czekają na wyniki badań toksykologicznych, które mają kluczowe znaczenie dla wyjaśnienia, czy in organizmie mężczyzny znajdowały się substancje mogące przyczynić się do jego nagłego odejścia. Z tego względu obecnie śledztwo in sprawie jego tajemniczego zgonu pozostaje zawieszone.
              </p>

              <div className="mt-8 mb-4 flex justify-end">
                 <div className="text-right">
                    <span className="block font-bold text-stone-900">Detektyw Polutek</span>
                    <span className="block text-xs text-stone-600 font-sans mt-1 italic">detektyw.polutek@protonmail.com</span>
                 </div>
              </div>

              <div className="my-12 border-y-2 border-stone-900 py-8">
                 <h3 className="font-sans font-bold text-lg uppercase tracking-widest text-stone-900 mb-8 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5" />
                    Status Prawny (2025/2026)
                 </h3>

                 <div className="grid gap-px bg-stone-200 border border-stone-200">
                    <div className="bg-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                       <div>
                          <span className="block font-serif text-stone-900 font-medium">Śledztwo in sprawie organizacji ceremonii</span>
                          <span className="block text-xs text-stone-600 mt-1">Prokuratura Rejonowa in Częstochowie</span>
                       </div>
                       <span className="font-mono text-xs font-bold bg-stone-50 px-3 py-1.5 border border-stone-200 text-stone-800 rounded-sm shadow-sm whitespace-nowrap">
                          3013-1.Ds.15.2024
                       </span>
                    </div>

                    <div className="bg-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                       <div>
                          <span className="block font-serif text-stone-900 font-medium">Śledztwo in sprawie śmierci Ilony Lewandowskiej</span>
                          <span className="block text-xs text-stone-600 mt-1">Prokuratura Rejonowa in Częstochowie</span>
                       </div>
                       <span className="font-mono text-xs font-bold bg-red-50 px-3 py-1.5 border border-stone-200 text-red-700 rounded-sm shadow-sm whitespace-nowrap">
                          3013-1.Ds.4.2026
                       </span>
                    </div>

                    <div className="bg-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                       <div>
                          <span className="block font-serif text-stone-900 font-medium">Śledztwo in sprawie śmierci Wiktora B.</span>
                          <span className="block text-xs text-stone-600 mt-1">Prokuratura Rejonowa in Pułtusku</span>
                       </div>
                       <div className="flex flex-col items-end gap-1">
                          <span className="font-mono text-xs font-bold bg-stone-50 px-3 py-1.5 border border-stone-200 text-stone-800 rounded-sm shadow-sm whitespace-nowrap">
                            4027-0. Ds. 1254.2024
                          </span>
                          <span className="text-[10px] font-sans font-bold text-blue-700 uppercase tracking-tighter">Śledztwo zawieszone</span>
                       </div>
                    </div>
                 </div>

                 <div className="mt-8 text-sm text-stone-800 font-sans text-center md:text-left">
                  Postępowania toczą się in wymienionych jednostkach Prokuratury. Nadzór nad sprawami in Częstochowie objął Zastępca Prokuratora Okręgowego, a kluczowe czynności nadzoruje prokurator Jolanta Świdnicka.
                 </div>
              </div>

            </div>

            <footer className="mt-4 pt-8 border-none font-sans">

               <div className="mb-8">
                 <h3 className="text-xl font-bold text-stone-900 uppercase tracking-widest flex items-center gap-2 mb-4">
                   <Search className="w-5 h-5" /> Dokumenty Źródłowe
                 </h3>
                 <div className="border-b border-stone-200 w-full mb-6"></div>
                 <p className="text-base text-stone-800 italic text-left">
                   Artykuł powstał na podstawie jawnej dokumentacji urzędowej i sądowej. Pełną listę sygnatur oraz odnośniki do baz państwowych (Katastr, InfoSoud), umożliwiające samodzielną niezależną weryfikację danych.
                 </p>
               </div>

               <div className="grid gap-4 text-sm text-stone-800">

                 <div className="p-3 bg-white border border-stone-200 hover:border-blue-400 transition-colors shadow-sm">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-2">
                      <div>
                        <h4 className="font-bold text-stone-900 text-sm leading-tight">Wyrok Jarosława Kordysa</h4>
                        <p className="font-mono text-[10px] text-stone-500 mt-1">Sygn. 30 T 5/2020</p>
                      </div>
                      <a
                        href={KORDYS_PDF_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 w-40 justify-center bg-stone-50 text-blue-700 px-3 py-1 text-xs font-bold rounded border border-stone-200 hover:bg-stone-100 transition-colors flex items-center gap-2 underline decoration-double decoration-stone-200"
                      >
                        <FileText className="w-3 h-3" /> Pobierz PDF
                      </a>
                    </div>
                    <div className="border-t border-stone-100 pt-2">
                      <a
                        href="https://msp.gov.cz/web/krajsky-soud-v-ostrave/zakladni-informace/-/clanek/informace-rok-2022"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-stone-500 hover:text-blue-700 flex items-center gap-1 uppercase tracking-wider underline decoration-double decoration-stone-200"
                      >
                        <Globe className="w-3 h-3" />
                        Weryfikuj na msp.gov.cz
                      </a>
                    </div>
                 </div>

                 <div className="p-3 bg-white border border-stone-200 hover:border-blue-400 transition-colors shadow-sm">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-2">
                      <div>
                        <h4 className="font-bold text-stone-900 text-sm leading-tight">Wyrok Bartosza Badowskiego</h4>
                        <p className="font-mono text-[10px] text-stone-500 mt-1">Sygn. 66 T 146/2021</p>
                      </div>
                      <a
                        href={BADI_PDF_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 w-40 justify-center bg-stone-50 text-blue-700 px-3 py-1 text-xs font-bold rounded border border-stone-200 hover:bg-stone-100 transition-colors flex items-center gap-2 underline decoration-double decoration-stone-200"
                      >
                        <FileText className="w-3 h-3" /> Pobierz PDF
                      </a>
                    </div>
                    <div className="border-t border-stone-100 pt-2">
                      <a
                        href="https://msp.gov.cz/documents/22409/2997339/29Si+25-2022+p%C5%99%C3%ADloha+%C4%8D.+1.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-stone-500 hover:text-blue-700 flex items-center gap-1 uppercase tracking-wider underline decoration-double decoration-stone-200"
                      >
                        <Globe className="w-3 h-3" />
                        Weryfikuj oryginał (29 Si 25/2022)
                      </a>
                    </div>
                 </div>

                 <div className="p-3 bg-white border border-stone-200 hover:border-blue-400 transition-colors shadow-sm">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-2">
                      <div>
                        <h4 className="font-bold text-stone-900 text-sm leading-tight">Historia własności: Janov</h4>
                        <p className="font-mono text-[10px] text-stone-500 mt-1">
                          LV 127 | Obręb 656976 <span className="block sm:inline sm:ml-2 text-stone-400">| Koszt: 100 CZK (~17 PLN)</span>
                        </p>
                      </div>
                      <a
                        href="#"
                        className="shrink-0 w-40 justify-center bg-stone-50 text-blue-700 px-3 py-1 text-xs font-bold rounded border border-stone-200 hover:bg-stone-100 transition-colors flex items-center gap-2 underline decoration-double decoration-stone-200"
                      >
                        <Download className="w-3 h-3" /> Pobierz PDF
                      </a>
                    </div>
                    <div className="border-t border-stone-100 pt-2">
                      <a
                        href="https://nahlizenidokn.cuzk.cz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-stone-500 hover:text-blue-700 flex items-center gap-1 uppercase tracking-wider underline decoration-double decoration-stone-200"
                      >
                        <Globe className="w-3 h-3" />
                        Weryfikuj na nahlizenidokn.cuzk.cz
                      </a>
                    </div>
                 </div>

                 <div className="p-3 bg-white border border-stone-200 hover:border-blue-400 transition-colors shadow-sm">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-2">
                      <div>
                        <h4 className="font-bold text-stone-900 text-sm leading-tight">Historia własności: Nýdek</h4>
                        <p className="font-mono text-[10px] text-stone-500 mt-1">
                          LV 832 | Obręb 708186 <span className="block sm:inline sm:ml-2 text-stone-400">| Koszt: 100 CZK (~17 PLN)</span>
                        </p>
                      </div>
                      <a
                        href="#"
                        className="shrink-0 w-40 justify-center bg-stone-50 text-blue-700 px-3 py-1 text-xs font-bold rounded border border-stone-200 hover:bg-stone-100 transition-colors flex items-center gap-2 underline decoration-double decoration-stone-200"
                      >
                        <Download className="w-3 h-3" /> Pobierz PDF
                      </a>
                    </div>
                    <div className="border-t border-stone-100 pt-2">
                      <a
                        href="https://nahlizenidokn.cuzk.cz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-stone-500 hover:text-blue-700 flex items-center gap-1 uppercase tracking-wider underline decoration-double decoration-stone-200"
                      >
                        <Globe className="w-3 h-3" />
                        Weryfikuj na nahlizenidokn.cuzk.cz
                      </a>
                    </div>
                 </div>

                 <div className="p-3 bg-white border border-stone-200 hover:border-blue-400 transition-colors shadow-sm">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-2">
                      <div>
                        <h4 className="font-bold text-stone-900 text-sm leading-tight">Transakcja: Darowizna (Janov)</h4>
                        <p className="font-mono text-[10px] text-stone-500 mt-1">
                          Sygnatura: V-5821/2023 <span className="block sm:inline sm:ml-2 text-stone-400">| Koszt: 300 CZK (~52 PLN)</span>
                        </p>
                      </div>
                      <a
                        href="#"
                        className="shrink-0 w-40 justify-center bg-stone-50 text-blue-700 px-3 py-1 text-xs font-bold rounded border border-stone-200 hover:bg-stone-100 transition-colors flex items-center gap-2 underline decoration-double decoration-stone-200"
                      >
                        <Download className="w-3 h-3" /> Pobierz PDF
                      </a>
                    </div>
                    <div className="border-t border-stone-100 pt-2">
                      <a
                        href="https://nahlizenidokn.cuzk.cz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-stone-500 hover:text-blue-700 flex items-center gap-1 uppercase tracking-wider underline decoration-double decoration-stone-200"
                      >
                        <Globe className="w-3 h-3" />
                        Weryfikuj na nahlizenidokn.cuzk.cz
                      </a>
                    </div>
                 </div>

                 <div className="p-3 bg-white border border-stone-200 hover:border-blue-400 transition-colors shadow-sm">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-2">
                      <div>
                        <h4 className="font-bold text-stone-900 text-sm leading-tight">Transakcja: Sprzedaż (Nýdek)</h4>
                        <p className="font-mono text-[10px] text-stone-500 mt-1">
                          Sygnatura: V-2937/2021 <span className="block sm:inline sm:ml-2 text-stone-400">| Koszt: 300 CZK (~52 PLN)</span>
                        </p>
                      </div>
                      <a
                        href="#"
                        className="shrink-0 w-40 justify-center bg-stone-50 text-blue-700 px-3 py-1 text-xs font-bold rounded border border-stone-200 hover:bg-stone-100 transition-colors flex items-center gap-2 underline decoration-double decoration-stone-200"
                      >
                        <Download className="w-3 h-3" /> Pobierz PDF
                      </a>
                    </div>
                    <div className="border-t border-stone-100 pt-2">
                      <a
                        href="https://nahlizenidokn.cuzk.cz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-stone-500 hover:text-blue-700 flex items-center gap-1 uppercase tracking-wider underline decoration-double decoration-stone-200"
                      >
                        <Globe className="w-3 h-3" />
                        Weryfikuj na nahlizenidokn.cuzk.cz
                      </a>
                    </div>
                 </div>

                 <div className="p-3 bg-white border border-stone-200 hover:border-stone-400 transition-colors shadow-sm">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-2">
                      <div>
                        <h4 className="font-bold text-stone-900 text-sm leading-tight">Archiwalna Strona: Nýdek</h4>
                        <p className="font-mono text-[10px] text-stone-500 mt-1">Archiwum: tribunydek.com</p>
                      </div>
                      <a
                        href="https://web.archive.org/web/*/tribunydek.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 w-40 justify-center bg-stone-50 text-stone-800 px-3 py-1 text-xs font-bold rounded border border-stone-200 hover:bg-stone-100 transition-colors flex items-center gap-2 underline decoration-double decoration-stone-200"
                      >
                        <History className="w-3 h-3" /> Wayback Machine
                      </a>
                    </div>
                 </div>

                 <div className="p-3 bg-white border border-stone-200 hover:border-stone-400 transition-colors shadow-sm">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-2">
                      <div>
                        <h4 className="font-bold text-stone-900 text-sm leading-tight">Archiwalna Strona: Munay Sonqo</h4>
                        <p className="font-mono text-[10px] text-stone-500 mt-1">Archiwum: munaysonqo.com (Peru)</p>
                      </div>
                      <a
                        href={MUNAY_WAYBACK_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 w-40 justify-center bg-stone-50 text-stone-800 px-3 py-1 text-xs font-bold rounded border border-stone-200 hover:bg-stone-100 transition-colors flex items-center gap-2 underline decoration-double decoration-stone-200"
                      >
                        <History className="w-3 h-3" /> Wayback Machine
                      </a>
                    </div>
                 </div>

                 <div className="p-3 bg-white border border-stone-200 border-l-blue-700 border-l-4 hover:border-stone-200 transition-colors shadow-sm">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-2">
                      <div>
                        <h4 className="font-bold text-stone-900 text-sm leading-tight">
                          Artykuł: Szamańskie ceremonie, tajemnicza śmierć i miliarderzy od „Wiedźmina”, <span className="text-stone-600 font-medium">Onet.pl</span>
                        </h4>
                        <p className="font-mono text-[10px] text-stone-400 mt-1 uppercase tracking-wider">Opublikowano: 3 marca 2026</p>
                      </div>
                      <div className="shrink-0 w-40 justify-center bg-stone-50 text-stone-400 px-3 py-1 text-xs font-bold rounded border border-stone-100 flex items-center gap-2 cursor-default">
                        <ExternalLink className="w-3 h-3" /> Link nieaktywny
                      </div>
                    </div>
                    <div className="border-t border-stone-100 pt-2 text-[10px] text-stone-400 font-mono italic">
                      Źródło: onet.pl/wiadomosci/kraj/szamanskie-ceremonie-tajemnicza-smierc-i-miliarderzy-od-wiedzmina
                    </div>
                 </div>

               </div>

               <div className="mt-8 text-center pb-12">
                  <div className="w-24 h-px bg-stone-200 mx-auto mb-6"></div>

                  <div className="mb-10 bg-stone-50 p-6 border border-stone-200 rounded-sm text-center">
                    <h3 className="text-sm font-bold text-stone-900 uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-blue-700" /> Mirror – Kopia Zapasowa Dokumentacji
                    </h3>
                    <p className="text-xs text-stone-700 mb-4 leading-relaxed font-sans max-w-lg mx-auto">
                      W celu zapewnienia niezniszczalności dowodów, pełna dokumentacja śledztwa (akty oskarżenia, wyroki, zeznania) została zarchiwizowana in sieciach zdecentralizowanych. Materiał jest odporny na próby cenzury i usuwania.
                    </p>
                    <div className="grid gap-3 font-mono text-[10px] uppercase tracking-wider">
                      <a href="ipfs://bafybeicnxl_pelna_dokumentacja_wiedzmin_gate" className="text-blue-700 hover:text-blue-900 underline">IPFS: Baza Dowodowa (Full Archive)</a>
                      <a href="https://arweave.net/eliksir-wiedzmina-dokumentacja" className="text-blue-700 hover:text-blue-900 underline">Arweave: Trwała Archiwizacja</a>
                      <a href="https://github.com/detektyw-polutek/eliksir-mirror" className="text-blue-700 hover:text-blue-900 underline">GitHub: Source Mirror</a>
                    </div>
                  </div>

                  <p className="text-xs text-stone-500 font-mono uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
                    <Globe className="w-4 h-4" />
                    Oficjalna Witryna
                  </p>
                  <a
                    href="https://www.eliksir-wiedzmina.pl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm text-stone-400 hover:text-stone-900 transition-colors underline decoration-double decoration-stone-200"
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
