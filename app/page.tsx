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
    <div className="w-full pb-8 mb-12 flex flex-col items-center border-b border-[#c4b99a]">
      {/* Kontener w-fit sprawia, że paski ograniczają się do szerokości tekstu */}
      <div className="inline-flex flex-col items-center w-fit">
        <h1 className="text-5xl md:text-[6.5rem] font-black tracking-tighter text-[#1c1917] uppercase font-serif leading-none whitespace-nowrap">
          NASZA GAZETKA
        </h1>
        <div className="w-full border-y-[2px] border-[#1c1917] py-1.5 flex items-center justify-between px-2 text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] text-[#3d2b1f] mt-2 font-mono">
          <div className="flex items-center gap-2">
            <span>📰</span>
            <span className="hidden sm:inline">Niezależne Media</span>
          </div>
          <div className="text-center font-serif font-black px-4">
            NIEDZIELA, 1 MARCA 2026
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">Serwis Śledczy</span>
            <span>📄</span>
            <span className="hidden md:inline border-l border-[#3d2b1f] pl-2 ml-1">Nr 01</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const CaseFile = ({ title, children, type = '📄' }: { title: string, children: React.ReactNode, type?: string }) => (
  <div className="my-10 border-2 border-[#3d2b1f] bg-[#e8e0cc]/30 shadow-[4px_4px_0px_0px_#3d2b1f] rounded-sm overflow-hidden break-inside-avoid text-left">
    <div className="bg-[#3d2b1f] px-4 py-2 flex items-center gap-2 text-xs font-mono text-[#e4dbbe] uppercase tracking-widest font-bold">
      <span>{type === 'transcript' ? '🎙️' : type === 'email' ? '✉️' : '📄'}</span>
      <span>{title}</span>
    </div>
    <div className="p-8 font-mono text-sm md:text-base leading-relaxed text-[#1c1917] italic bg-[#faf6ec]/50">
      {children}
    </div>
  </div>
);

const PullQuote = ({ quote, author, source }: { quote: string, author: string, source: string }) => (
  <div className="my-14 pl-8 border-l-[6px] border-[#722f37] text-left">
    <p className="font-serif text-2xl md:text-3xl italic text-[#1c1917] leading-tight mb-4 tracking-tight">
      „{quote}"
    </p>
    <div className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#5a4a3a] font-bold">
      — <span className="text-[#722f37]">{author}</span>, {source}
    </div>
  </div>
);

const LocationStampUI = ({ name, plot, lv, code }: { name: string, plot: string, lv: string, code?: string }) => (
  <div className="relative border-2 border-[#3d2b1f] bg-[#e4dbbe] p-2 pr-10 rounded-sm flex items-center gap-5 shadow-[5px_5px_0px_0px_#c4b99a] text-left group transition-transform hover:-translate-y-1">
     <div className="absolute top-2 right-2 text-[#722f37] font-bold">
       🔍
     </div>
     <div className="bg-[#3d2b1f] h-full p-4 flex items-center justify-center border-r-2 border-[#3d2b1f] border-dashed">
        <span className="text-2xl">🏠</span>
     </div>
     <div className="py-2">
        <div className="text-[10px] uppercase tracking-[0.2em] text-[#722f37] font-black mb-1 flex items-center gap-2">
          {name} {code && `[${code}]`}
        </div>
        <div className="font-mono text-xl font-black text-[#1c1917] leading-none">LV {lv}</div>
        <div className="text-[11px] text-[#3d2b1f] font-mono mt-1 font-bold uppercase tracking-tighter">
          Działka: {plot}
        </div>
     </div>
  </div>
);

const TransactionStampUI = ({ label, value, subDetails }: { label: string, value: string, subDetails?: string }) => (
  <div className="relative border-2 border-[#3d2b1f] bg-[#e4dbbe] p-2 pr-10 rounded-sm flex items-center gap-5 shadow-[5px_5px_0px_0px_#c4b99a] group text-left">
     <div className="absolute top-2 right-2 text-[#722f37]">
       🔍
     </div>
     <div className="bg-[#3d2b1f] h-full p-4 flex items-center justify-center border-r-2 border-[#3d2b1f] border-dashed">
        <span className="text-2xl">📜</span>
     </div>
     <div className="py-2">
        <div className="text-[10px] uppercase tracking-[0.2em] text-[#722f37] font-black mb-1">{label}</div>
        <div className="font-mono text-xl font-black text-[#1c1917] leading-none">{value}</div>
        {subDetails && <div className="text-[11px] text-[#3d2b1f] font-mono mt-1 font-bold uppercase">{subDetails}</div>}
     </div>
  </div>
);

const ArticleVideoPlayer: React.FC<{ src: string; poster: string }> = ({ src, poster }) => {
  return (
    <div className="my-16 w-full bg-[#1c1917] rounded-sm shadow-[10px_10px_0px_0px_#3d2b1f] overflow-hidden border-4 border-[#3d2b1f]">
      <video controls poster={poster} className="w-full h-auto block grayscale contrast-125 brightness-90 mix-blend-multiply opacity-95">
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
  title: "Michał Kiciński, Ayahuasca i Tajemnicza Śmierć w Janovie | NASZA GAZETKA",
  description: "Pełna dokumentacja śledztwa dziennikarskiego w sprawie ceremonii ayahuaski. Dowody, nagrania i treści wyroków.",
};

export default function Page() {
  const newsArticleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": "Eliksir Wiedźmina – Śledztwo: Michał Kiciński i tajemnica Janova",
    "image": [`${KORDYS_IMAGES_URL}/wezwanie/wezwanie_kicinski.png`],
    "datePublished": "2024-03-03",
    "author": [{ "@type": "Person", "name": "Detektyw Polutek" }]
  };

  return (
    <ElixirModalsProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }} />

      <main className="min-h-screen bg-[#e4dbbe] text-[#1c1917] selection:bg-[#722f37] selection:text-[#e4dbbe] font-serif flex flex-col items-center py-10">
        
        <BrandHeader />

        <div className="w-full max-w-3xl px-6">
          <header className="mb-16 text-center">
            <h1 className="mb-10 text-[#1c1917]">
              <span className="block text-5xl md:text-8xl font-black leading-none tracking-tighter uppercase mb-4">
                Eliksir Wiedźmina
              </span>
              <span className="block text-2xl md:text-4xl text-[#722f37] italic font-bold tracking-tight">
                Mroczna tajemnica twórców CD Projekt
              </span>
            </h1>

            <div className="max-w-2xl mx-auto border-y-4 border-double border-[#3d2b1f] py-10 px-4">
              <p className="text-2xl md:text-3xl text-[#1c1917] leading-tight italic font-medium">
                Ayahuasca, policyjne naloty i tragedia, o której nie miał się nikt dowiedzieć. Publicznie dostępne akta i rejestry ujawniają, jak twórcy gry &quot;Wiedźmin&quot; finansowali szamańskie podziemie.
              </p>
            </div>
          </header>

          <article className="prose prose-stone prose-xl max-w-none 
            prose-p:text-[#1c1917] prose-p:leading-relaxed prose-p:mb-8
            prose-headings:font-serif prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-headings:text-[#1c1917]
            prose-a:text-[#1c1917] prose-a:font-bold prose-a:no-underline prose-a:underline prose-a:decoration-double prose-a:decoration-[#722f37] hover:prose-a:bg-[#722f37] hover:prose-a:text-white transition-colors">

            <p className="first-letter:text-9xl first-letter:font-black first-letter:mr-4 first-letter:float-left first-letter:text-[#722f37] first-letter:leading-[0.7] pt-2">
              W 2020 roku media obiegły doniesienia o rozbiciu grupy polskich szamanów w czeskich Hermanovicach. Policyjny nalot, aresztowanie Jarosława i Karoliny Kordysów, a następnie surowe wyroki – 8,5 oraz 5,5 roku więzienia za prowadzenie nielegalnego biznesu polegającego na organizacji tzw. &quot;ceremonii&quot;, podczas których klientom podawano egzotyczny psychodelik – ayahuaskę.
            </p>

            <p>
              Ayahuaska to tradycyjny wywar z amazońskich roślin o silnym działaniu halucynogennym. Ze względu na wysoką zawartość DMT – substancji psychodelicznej wywołującej intensywne wizje i zmiany stanu świadomości, jej posiadanie i podawanie jest w Polsce i Czechach zabronione. Finałem medialnego spektaklu Kordysów było ułaskawienie przez czeskiego prezydenta po dwóch latach odsiadki.
            </p>

            <p>
              Kurtyna opadła, temat ucichł. Ale czy to na pewno koniec tej historii? W cieniu tego głośnego procesu toczył się drugi – cichy i błyskawiczny, zakończony dyskretnym wyrokiem, o którym nikt nawet w mediach się nie zająknął. Analiza sądowych dokumentów prowadzi do zdumiewających wniosków.
            </p>

            <p className="bg-[#722f37] text-[#e4dbbe] p-6 font-bold shadow-[6px_6px_0px_0px_#1c1917]">
              W przygranicznym Janowie funkcjonował drugi, bliźniaczy ayahuaskowy ośrodek, którego współwłaścicielem okazał się miliarder – Michał Kiciński.
            </p>

            <h2 className="text-4xl mt-20 mb-10 border-b-4 border-[#1c1917] pb-2">Świadek B.</h2>

            <p>
              W obszernym i publicznie dostępnym uzasadnieniu <GalleryTrigger type="wyrok_kordys" className="font-bold text-[#1c1917] underline decoration-double decoration-[#722f37] hover:bg-[#e8e0cc] transition-colors">wyroku</GalleryTrigger> Jarosława Kordysa pojawia się postać świadka Bartosza B.
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
              &quot;...w odniesieniu do nieruchomości będących współwłasnością Bartosza B. i Michała D. K.&quot;.
            </CaseFile>

            <p>
              W Czechach księgi wieczyste są jawne i dostępne online. Wystarczy wejść na stronę Katastru Nieruchomości, wyszukać <GalleryTrigger type="janov" className="font-bold underline decoration-double decoration-[#722f37]">działkę w Janowie</GalleryTrigger> i za niewielką opłatą pobrać jej pełną historię.
            </p>

            <div className="my-12 flex justify-center">
              <GalleryTrigger type="janov">
                <LocationStampUI
                  name="JANOV U KRNOVA"
                  code="656976"
                  plot="st. 281"
                  lv="127"
                />
              </GalleryTrigger>
            </div>

            <p className="font-bold text-center border-2 border-dashed border-[#3d2b1f] p-4 bg-[#faf6ec]/50">
            Pobrany dokument nie pozostawia wątpliwości: w latach 2012–2023 współwłaścicielami nieruchomości byli:
               <br/>
               Bartosz Badowski (10%)
               <br/>
               <span className="bg-[#722f37] text-white px-2 py-1 font-black">Michał Dawid Kiciński (90%)</span>
            </p>

            <p>
              Drugie imię – Dawid – idealnie wypełnia lukę w zanonimizowanym skrócie &quot;Michal D. K.&quot;. <span className="underline decoration-[#722f37] decoration-4 font-black">Wspólnikiem szamana był twórca &quot;Wiedźmina&quot; – jeden z najbogatszych Polaków.</span>
            </p>

            <h2 className="text-4xl mt-20 mb-10 border-b-4 border-[#1c1917] pb-2">Na podsłuchu</h2>

            <p>
              Przełom w sprawie organizatorów ayahuaskowych ceremonii w 2020 roku nastąpił dzięki policyjnej technice operacyjnej. Telefon Kordysa był na stałym podsłuchu, a funkcjonariusze słuchali na żywo, gdy w dniu 24.08.2020 r. doszło do nerwowej wymiany zdań pomiędzy Badowskim i Kordysym.
            </p>

            <p>
              Kordys zadzwonił do Badowskiego wyraźnie zaniepokojony wieściami, które do niego dotarły. Bał się, że tragedia, o której huczało w kuluarach, może zniszczyć ich imperium. Sąd w uzasadnieniu wyroku precyzyjnie rekonstruuje ten moment:
            </p>

            <CaseFile title="Rekonstrukcja rozmowy (Uzasadnienie Sądu)" type="transcript">
              &quot;oskarżony [Jarosław Kordys] omawia z B., że dotarła do niego informacja, że w obiekcie w Janowie <span className="text-[#722f37] font-black underline decoration-4 underline-offset-8 uppercase">zmarła jakaś kobieta</span>&quot;.
            </CaseFile>

            <p>
              W rozmowie pojawia się też wątek zagrożenia ze strony osoby trzeciej – mężczyźni omawiają szantażystę, który chce iść na policję. Kordys wprost pyta wspólnika:
            </p>

            <CaseFile title="Pytanie Kordysa" type="transcript">
              &quot;W jakim zagrożeniu jest nasza praca?&quot;
            </CaseFile>

            <div className="my-16 pl-10 border-l-[10px] border-[#1c1917] font-serif italic text-3xl text-[#1c1917] bg-[#faf6ec]/40 py-8 pr-6">
              &quot;Z ich rozmowy wynika, że nie zajmowali się w zasadzie samym faktem śmierci, lecz raczej obawą, aby to nie przyciągnęło uwagi policji.&quot;
            </div>

            <p>
              Dla sądu był to koronny dowód na to, że oskarżeni prowadzili nielegalny biznes, a nie działalność duchową – śmierć człowieka była dla nich jedynie &quot;psuciem interesów&quot;.
            </p>

            <p>
              Cynizm tej konwersacji sięga zenitu chwilę później. Gdy tylko ustalili strategię uciszenia plotek, natychmiast przeszli do logistyki dostaw narkotyku. Sąd odnotowuje, że zaraz po dywagacjach o śmierci i szantażu, rozmówcy wracają do interesów:
            </p>

            <CaseFile title="Kontynuacja rozmowy" type="transcript">
              &quot;Następnie w rozmowie omawiają zamówienia «herbaty» z dżungli i to, czy im tego «nie zepsują», ekscytując się nagraniem od dostawcy, który «siedzi w dżungli i gotuje».&quot;
            </CaseFile>

            <p>
              Dla policjantów, którzy słyszeli to w czasie rzeczywistym, przekaz był jasny: w obiekcie mogło dojść do tragedii, a sprawcy martwili się jedynie o ciągłość dostaw.
            </p>

            <p>
              Zaledwie dwa dni po tym telefonie, 26.08.2020 czescy policjanci weszli do posiadłości w Janowie. Efekty rewizji opisano w wyroku Kordysa:
            </p>

            <CaseFile title="Protokół rewizji">
              &quot;w nieruchomości zabezpieczono rzeczy... oprócz marihuany zabezpieczono również substancje zawierające DMT o objętości ok. 2 kg&quot;.
            </CaseFile>

            <p>
              Podczas policyjnej interwencji zidentyfikowano tam 15 obywateli Polski, którzy mieli brać udział w ceremonii. Wśród nich, stali bywalcy i bliscy znajomi Badowskiego – Krzysztof Stefanek i Lena Drzewińska, których obecność w momencie wkroczenia służb ma znaczenie w kontekście późniejszej ich roli w tej historii.
            </p>

            <h2 className="text-4xl mt-20 mb-10 border-b-4 border-[#1c1917] pb-2">Cena wolności</h2>

            <p>
              Kiedy 26 sierpnia 2020 roku czeska policja weszła do posiadłości w Janowie, należącej do Bartosza Badowskiego i miliardera Michała Kicińskiego, Jarosław Kordys w Hermanovicach wciąż czuł się bezpiecznie. Nie wiedział jeszcze, że zegar zaczął odliczać czas do jego własnej katastrofy. Zaledwie 7 tygodni po cichym nalocie na Badowskiego policja zapukała do Kordysów.
            </p>

            <p>
              15 października 2020 roku sielankę w ich ośrodku przerwał huk granatów ogłuszających. Czeska jednostka antyterrorystyczna nie bawiła się w półśrodki: zamaskowani funkcjonariusze z długą bronią wdarli się do budynku, rzucając na ziemię przyszłych bohaterów głośnego skandalu.
            </p>

            <ArticleVideoPlayer
              src={`${PINATA_GATEWAY}/${ARREST_VIDEO_CID}/videoplayback.m3u8`}
              poster=""
            />
             <div className="mt-[-2rem] mb-12 text-sm text-[#722f37] font-mono font-black uppercase text-center tracking-widest bg-[#3d2b1f] text-[#e4dbbe] py-1">
                 Materiały Operacyjne Policji Republiki Czeskiej
              </div>

            <p>
              Co wydarzyło się w ciągu tych niespełna dwóch miesięcy? Odpowiedź kryje się w jednym czeskim terminie prawnym:
            </p>

            <div className="my-14 flex gap-6 p-8 bg-[#3d2b1f] text-[#e4dbbe] shadow-[8px_8px_0px_0px_#722f37]">
              <Scale className="w-12 h-12 text-[#722f37] shrink-0" />
              <div>
                <strong className="block font-serif text-2xl font-black mb-2 uppercase tracking-tighter italic">Dohoda o vině a trestu</strong>
                <div className="text-lg leading-snug font-mono">
                  Ugoda o winie i karze. Czeska procedura karna pozwalająca oskarżonemu na dobrowolne poddanie się karze w zamian za łagodniejszy wyrok, bez przeprowadzania pełnego procesu dowodowego i wzywania świadków.
                </div>
              </div>
            </div>

            <p>
              Bartosz &quot;Badi&quot; Badowski, wspólnik jednego z najbogatszych Polaków, błyskawicznie zrozumiał swoje położenie. W obliczu zabezpieczonych dowodów – w tym 2 kilogramów substancji z DMT i marihuany – wybrał strategię, która miała uchronić go przed wieloletnim więzieniem. Postanowił &quot;kupić&quot; sobie wolność.
            </p>

            <p>
              Ugoda pozwoliła na zamknięcie jego teczki bez wywoływania świadków, co w praktyce oznaczało, że mechanizmy działania janowskiego ośrodka nigdy nie wybrzmiały echem w publicznej debacie, chroniąc Badowskiego przed krzyżowym ogniem pytań i zeznaniami, które mogłyby pogrążyć także jego cichego wspólnika.
            </p>

            <p>
              Cena wolności Badowskiego okazała się być wysoka dla jego kolegi z branży. Zeznania &quot;Badiego&quot; były dla prokuratury bezcennym materiałem dowodowym, który pozwolił domknąć łańcuch poszlak w sprawie Kordysów.
            </p>

            <p>
               Na mocy <GalleryTrigger type="wyrok_badi" className="font-bold underline decoration-double decoration-[#722f37]">wyroku</GalleryTrigger> z dnia 2 listopada 2021 roku Bartosz Badowski został uznany winnym popełnienia &quot;zbrodni niedozwolonej produkcji i innego obchodzenia się ze środkami odurzającymi&quot;.
            </p>

            <p>
              Sąd ustalił, że:
            </p>

            <CaseFile title="Ustalenia wyroku skazującego Bartosza B.">
              &quot;co najmniej od bliżej nieustalanej daty w 2015 roku do 26.08.2020 [...] oferował, organizował i co najmniej w 441 przypadkach zrealizował w nieregularnych odstępach czterodniowe i dziesięciodniowe pobyty [...] ukierunkowane na tzw. duchowe ćwiczenia spirytualne&quot;
              <br/><br/>
              &quot;udostępnił uczestnikom do użycia bliżej nieustaloną ilość substancji psychotropowych, a mianowicie tzw. ayahuascę zawierającą dimetylotryptaminę (DMT) oraz tzw. marihuanę zawierającą tetrahydrokannabinol (THC)&quot;
              <br/><br/>
              &quot;przechowywał łącznie 1902,79 grama materiału roślinnego (...), który zawierał łącznie 37,24 grama substancji czynnej dimetylotryptaminy (DMT) oraz 92,29 grama tzw. narkotyku marihuany&quot;.
            </CaseFile>

            <p>
              Podczas, gdy Jarosław Kordys został skazany na 8,5 roku pozbawienia wolności Bartosz Badowski, którego sprawa dotyczyła tego samego procederu, tych samych substancji, regionu i czasu trwania działalności, dzięki ugodzie i współpracy z wymiarem sprawiedliwości, zakończył sprawę wyrokiem w zawieszeniu.
            </p>

            <h2 className="text-4xl mt-20 mb-10 border-b-4 border-[#1c1917] pb-2">Cisza po burzy</h2>

            <p>
              Choć Badowski zaprzestał prowadzenia działalności szamańskiej, posiadłość w Janowie nie opustoszała – zamieszkali z nim wspomniani wcześniej Krzysztof Stefanek i Magdalena Drzewińska. Ich obecność u boku &quot;Badiego&quot; w tamtym czasie rzuca cień na ich późniejszą rolę; nie byli to wszakże niewinni obserwatorzy, lecz ludzie, którzy mimo tego, że sami byli obecni podczas policyjnej interwencji, pozostali lojalni wobec byłego szamana.
            </p>

            <p>
              Będąc tak blisko Badowskiego, doskonale znali mroczną tajemnicę śmierci Ilony. Ich decyzja o zamieszkaniu z człowiekiem, który w obliczu tragedii martwił się o &quot;ciągłość dostaw&quot;, dowodzi, że w pełni akceptowali reguły zmowy milczenia.
            </p>

            <h2 className="text-4xl mt-20 mb-10 border-b-4 border-[#1c1917] pb-2">Kiciński</h2>

            <p>
              W cieniu tych wyroków pozostaje wciąż niewyjaśniona rola cichego wspólnika. Michał Kiciński to nie jest postać, która o ayahuasce jedynie &quot;słyszała&quot; – on stał się jej nieoficjalnym ambasadorem w polskich mediach głównego nurtu. W licznych wywiadach z niezwykłą precyzją opisuje on mechanizamy działania psychodelików. Kiciński publicznie opowiada o lekcjach pokory, jakie dała mu &quot;medycyna&quot;, o spotkaniach z szamanami i o tym, jak napar z dżungli otwiera &quot;nową rzeczywistość&quot;.
            </p>

            <PullQuote
              quote="Po ayahuasce jest szansa na to, żeby sobie nie ściemniać."
              author="Michał Kiciński"
              source="Newsweek, 30 maja 2016 r."
            />

            <h2 className="text-4xl mt-20 mb-10 border-b-4 border-[#1c1917] pb-2">&quot;Błąd z Badim&quot;</h2>

            <p>
               Michał Kiciński wiedział o Ilonie. Jego konfrontacja z organami ścigania nabrała formalnego kształtu dopiero jesienią 2023 roku. 21 września 2023 roku miliarder osobiście odebrał wezwanie do stawiennictwa w charakterze świadka w sprawie o sygnaturze WD-I-3186/23. Miało się ono odbyć 18.10.2023. Na wezwaniu czytelnie było napisane, że przesłuchanie będzie dotyczyć &quot;pobytu w Janowie&quot;.
            </p>

            <div className="my-14 flex flex-col items-center">
              <GalleryTrigger type="wezwanie_kicinski">
                <img
                  src={`${KORDYS_IMAGES_URL}/wezwanie/wezwanie_kicinski.png`}
                  alt="Wezwanie na policję"
                  className="w-64 grayscale contrast-150 border-4 border-[#3d2b1f] shadow-[12px_12px_0px_0px_#722f37] cursor-pointer hover:rotate-1 transition-transform"
                />
              </GalleryTrigger>
              <p className="text-xs text-[#722f37] mt-6 font-mono font-black uppercase tracking-[0.4em] text-center">
                DOKUMENTACJA ŚLEDCZA: WEZWANIE ŚWIADKA M.K.
              </p>
            </div>

            <p>
              Reakcja miliardera na zainteresowanie organów ścigania była błyskawiczna. Zwrócił się bezpośrednio do autora zawiadomienia – wysyłając mu wiadomość mailową z propozycją swoistej pokuty. Zamiast wyjaśnień prokuratorskich zaoferował przelew na cel charytatywny, nazywając lata nielegalnego procederu młodzieńczą naiwnością.
            </p>

            <CaseFile title="Wiadomość prywatna od M. Kicińskiego" type="email">
              &quot;(...) Tak mogę zapłacić za swój błąd z Badim. Podaj mi Fundacje lub Stowarzyszenie (najlepiej powiązaną z hospicjum lub domami dziecka, bo tu widzę morze potrzeb i dużo cierpienia) i wpłacę tam dobrowolnie kwotę darowizny, w ramach Przeprosin wszechświatowi, za moją młodzieńczą naiwność i brak przenikliwości. Fundacja / Stowarzyszenie musi być uznana i z tradycjami, a nie jakaś organizacja krzak. Wyślę Ci potwierdzenie przelewu. (...)&quot;
            </CaseFile>

            <p>
              Do przesłuchania doszło tydzień przed terminem wskazanym na wezwaniu – 11 października 2023 roku o godzinie 15:00 w Komendzie Rejonowej Policji Warszawa II. W protokole Kiciński przyjmuje linię opartą na braku świadomości co do charakteru działalności prowadzonej w jego posiadłości.
            </p>

            <CaseFile title="Zeznanie do protokołu">
              &quot;Nie mam żadnej wiedzy co się działo na mojej farmie, w której jestem 90% udziałowcem (...) wynajmowałem tę nieruchomość.&quot;
            </CaseFile>

            <p>
              Gdy w toku czynności padło kluczowe pytanie o jego własny udział w ceremoniach ayahuaski w Janowie, odpowiedź była lakoniczna:
            </p>

            <CaseFile title="Odpowiedź na pytanie o udział">
              &quot;nie brałem udziału w takich ceremoniach w latach 2016-2023, a o wcześniejszym okresie <span className="underline decoration-[#722f37] decoration-4 font-black text-[#722f37]">odmawiam odpowiedzi</span>&quot;
            </CaseFile>

            <p>
              W kontekście złożonych zeznań warto zauważyć, że miliarder jest właścicielem luksusowego ośrodka Munay Sonqo w Peru, o którym wielokrotnie wspominał w wywiadach.
            </p>

            <p>
              W przeciwieństwie do Europy, peruwiańskie prawo zezwala na komercyjne prowadzenie ceremonii z ayahuascą. Ośrodek Kicińskiego oferuje tam w pełni jawną i profesjonalną sprzedaż usług o profilu bliźniaczym do tych, które w Czechach są zakazane, co wciąż jest eksponowane na stronie internetowej.
            </p>

            <p>
              Fakt, że Kiciński w momencie przesłuchania zarządzał legalnym biznesem ayahuaskowym w Ameryce Południowej, stawia pod znakiem zapytania jego deklarowaną nieświadomość co do profilu działalności w Janowie.
            </p>

            <p>
              Co na to Bartosz Badowski?
            </p>

            <CaseFile title="Fragment korespondencji B. Badowskiego" type="email">
              &quot;Przelewy wysyłałem z mojego konta ING, które mam do tej pory [...]. Tytuł „wynajem”. (...) Dopóki zarabiałem - dzieliłem się z nim zyskiem.(...) Michał wiedział dokładnie co się dzieje na farmie i czerpał z tego zyski przez wiele wiele lat. (...) Rozważam też wizytę na Policji w Czechach - ja poniosłem prawne konsekwencje za prowadzenie ceremonii, ale Kiciński - żadnych. Mimo, że to on czerpał z tego największe zyski, to on był nade mną i był większościowym właścicielem farmy.&quot;
            </CaseFile>

            <h2 className="text-4xl mt-20 mb-10 border-b-4 border-[#1c1917] pb-2">Anonimowy filantrop</h2>

            <p>
              W listopadzie 2025 roku na kanale YouTube &quot;Osada Natury Zew&quot; pojawia się nagrany rok wcześniej film, w którym obecny gospodarz, Krzysztof Stefanek, snuje opowieść o powstaniu &quot;Osady&quot;. W sielskiej scenerii, z uśmiechem na ustach, buduje narrację o cudownym zbiegu okoliczności i tajemniczym dobroczyńcy.
            </p>

            <p>
              Stefanek wspomina, jak wspólnie z grupą przyjaciół pomagał uporządkować sprawy własnościowe, by obiekt &quot;znalazł się w jednych rękach&quot;. Kluczow...
            </p>

          </article>
        </div>

        <footer className="mt-20 py-10 border-t-2 border-[#3d2b1f] w-full max-w-3xl text-center">
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#5a4a3a]">
                Archiwum Narodowe Spraw Niewyjaśnionych | Serwis NASZA GAZETKA © 2026
            </p>
        </footer>
      </main>
    </ElixirModalsProvider>
  );
}
