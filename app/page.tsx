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
    <div className="w-full pb-2 mb-2 flex flex-col items-center bg-[#fcfbf9]">
      <div className="flex items-center justify-center w-[98%] mx-auto pb-2">
        <h1 className="text-5xl md:text-[6.5rem] font-black tracking-tighter text-stone-950 uppercase font-serif leading-none whitespace-nowrap">
          NASZA GAZETKA
        </h1>
      </div>
      <div className="w-[98%] mx-auto border-y-[3px] border-stone-950 py-1.5 flex items-center justify-between px-4 text-[10px] md:text-sm font-bold uppercase tracking-[0.1em] text-stone-800">
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
          <span className="hidden md:inline border-l-2 border-stone-950 pl-2 ml-1">Wydanie Specjalne</span>
        </div>
      </div>
    </div>
  );
};

const CaseFile = ({ title, children, type = '📄' }: { title: string, children: React.ReactNode, type?: string }) => (
  <div className="my-8 border border-stone-900 bg-stone-100/20 shadow-lg rounded-sm overflow-hidden break-inside-avoid text-left">
    <div className="bg-stone-950 px-4 py-2 flex items-center gap-2 text-xs font-mono text-white uppercase tracking-widest">
      <span>{type === 'transcript' ? '🎙️' : type === 'email' ? '✉️' : '📄'}</span>
      <span>{title}</span>
    </div>
    <div className="p-6 font-mono text-sm md:text-base leading-relaxed text-stone-900 italic">
      {children}
    </div>
  </div>
);

const PullQuote = ({ quote, author, source }: { quote: string, author: string, source: string }) => (
  <div className="my-10 pl-6 border-l-[6px] border-red-900 text-left">
    <p className="font-serif text-xl md:text-2xl italic text-stone-950 leading-relaxed mb-3">
      „{quote}"
    </p>
    <div className="font-sans text-[10px] uppercase tracking-widest text-stone-500">
      — <span className="font-bold text-stone-900 underline decoration-red-900/20">{author}</span>, {source}
    </div>
  </div>
);

const LocationStampUI = ({ name, plot, lv, code }: { name: string, plot: string, lv: string, code?: string }) => (
  <div className="relative border-2 border-stone-900 bg-stone-50 p-1 pr-6 rounded-sm flex items-center gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] text-left group">
      <div className="absolute top-1 right-1 text-blue-900">
        🔍
      </div>
      <div className="bg-stone-900 h-full p-3 flex items-center justify-center border-r border-stone-400 border-dashed">
         <span className="text-xl grayscale invert">🏠</span>
      </div>
      <div className="py-2">
         <div className="text-[9px] uppercase tracking-[0.2em] text-blue-900 font-bold mb-1 flex items-center gap-2">
           {name} {code && `[${code}]`}
         </div>
         <div className="font-mono text-base font-bold text-stone-950">LV {lv}</div>
         <div className="text-[10px] text-stone-600 font-mono mt-1">
           IDENTYFIKATOR: {plot}
         </div>
      </div>
  </div>
);

const TransactionStampUI = ({ label, value, subDetails }: { label: string, value: string, subDetails?: string }) => (
  <div className="relative border-2 border-stone-900 bg-stone-50 p-1 pr-6 rounded-sm flex items-center gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] group text-left">
      <div className="absolute top-1 right-1 text-stone-400">
        🔍
      </div>
      <div className="bg-stone-950 h-full p-3 flex items-center justify-center border-r border-stone-400 border-dashed">
         <span className="text-xl grayscale invert">📜</span>
      </div>
      <div className="py-2">
         <div className="text-[9px] uppercase tracking-[0.2em] text-stone-500 font-bold mb-1">{label}</div>
         <div className="font-mono text-base font-bold text-stone-950">{value}</div>
         {subDetails && <div className="text-[10px] text-stone-400 font-mono mt-1">{subDetails}</div>}
      </div>
  </div>
);

const ArticleVideoPlayer: React.FC<{ src: string; poster: string }> = ({ src, poster }) => {
  return (
    <div className="my-12 w-full bg-stone-950 rounded-sm shadow-2xl overflow-hidden border-2 border-stone-900">
      <video controls poster={poster} className="w-full h-auto block opacity-80 mix-blend-screen grayscale contrast-125">
        <source src={src} type="application/x-mpegURL" />
        Dostęp do zapisu operacyjnego zablokowany.
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
};

export default function Page() {
  const newsArticleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": "Eliksir Wiedźmina – Śledztwo",
    "datePublished": "2024-03-03",
    "author": [{ "@type": "Person", "name": "Detektyw Polutek" }]
  };

  return (
    <ElixirModalsProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }} />

      <main className="min-h-screen bg-[#fcfbf9] text-stone-950 selection:bg-amber-100 font-serif flex flex-col items-center">
        <div className="w-full max-w-4xl border-x-[3px] border-stone-950 bg-[#fcfbf9] min-h-screen flex flex-col shadow-2xl relative">
          
          <BrandHeader />

          <header className="pt-12 pb-8 px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="mb-10 text-stone-950">
                <span className="block text-6xl md:text-8xl font-black leading-none tracking-tighter">
                  Eliksir Wiedźmina
                </span>
                <span className="block text-2xl md:text-4xl text-stone-700 italic font-medium mt-6">
                  Mroczna tajemnica twórców CD Projekt
                </span>
              </h1>

              <div className="max-w-2xl mx-auto border-y-2 border-stone-200 py-10 px-4">
                <p className="text-xl md:text-2xl text-stone-800 leading-relaxed italic">
                  Ayahuasca, policyjne naloty i tragedia, o której nie miał się nikt dowiedzieć. Publicznie dostępne akta i rejestry ujawniają, jak twórcy gry &quot;Wiedźmin&quot; finansowali szamańskie podziemie.
                </p>
              </div>
            </div>
          </header>

          <article className="max-w-2xl mx-auto px-8 pt-8 pb-0 flex-grow">
            <div className="prose prose-stone prose-lg max-w-none prose-headings:text-stone-950 prose-a:text-stone-950 prose-a:font-bold prose-a:no-underline prose-a:underline prose-a:decoration-red-900/30 hover:prose-a:bg-amber-50 transition-colors">

              <p className="first-letter:text-8xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-stone-950 first-letter:leading-none leading-relaxed">
                W 2020 roku media obiegły doniesienia o rozbiciu grupy polskich szamanów w czeskich Hermanovicach. Policyjny nalot, aresztowanie Jarosława i Karoliny Kordysów, a następnie surowe wyroki – 8,5 oraz 5,5 roku więzienia za prowadzenie nielegalnego biznesu polegającego na organizacji tzw. &quot;ceremonii&quot;, podczas których klientom podawano egzotyczny psychodelik – ayahuaskę.
              </p>

              <p>
                Ayahuaska to tradycyjny wywar z amazońskich roślin o silnym działaniu halucynogennym. Ze względu na wysoką zawartość DMT – substancji psychodelicznej wywołującej intensywne wizje i zmiany stanu świadomości, jej posiadanie i podawanie jest w Polsce i Czechach zabronione. Finałem medialnego spektaklu Kordysów było ułaskawienie przez czeskiego prezydenta po dwóch latach odsiadki.
              </p>

              <p>
                Kurtyna opadła, temat ucichł. Ale czy to na pewno koniec tej historii? W cieniu tego głośnego procesu toczył się drugi – cichy i błyskawiczny, zakończony dyskretnym wyrokiem, o którym nikt nawet w mediach się nie zająknął. Analiza sądowych dokumentów prowadzi do zdumiewających wniosków.
              </p>

              <p>
                W przygranicznym Janowie funkcjonował drugi, bliźniaczy ayahuaskowy ośrodek, którego współwłaścicielem okazał się miliarder – <span className="bg-amber-200/40 px-1 font-bold box-decoration-clone">Michał Kiciński</span>.
              </p>

              <h2 className="text-4xl mt-20 mb-10 tracking-tighter text-stone-950 border-b-4 border-stone-900 pb-2 uppercase font-black">Świadek B.</h2>

              <p>
                W obszernym i publicznie dostępnym uzasadnieniu <GalleryTrigger type="wyrok_kordys" className="font-bold underline decoration-blue-900/30 hover:bg-blue-50">wyroku</GalleryTrigger> Jarosława Kordysa pojawia się postać świadka Bartosza B.
              </p>

              <p>Zgodnie z aktami:</p>

              <CaseFile title="Zeznania świadka B.">
                &quot;Świadek B. odnośnie osoby oskarżonego [Jarosława Kordysa] oświadczył, że zna się z nim ok. 8 lat, a poznali się w Holandii&quot;.
                <br/><br/>
                &quot;Świadek B. potwierdził, że i on sam w przeszłości prowadził warsztaty&quot;, a obecnie sam &quot;jest przedmiotem dochodzenia policji w Krnowie właśnie z powodu ceremonii&quot;.
              </CaseFile>

              <p>Akta ujawniają również skalę zarzutów wobec Bartosza B.:</p>

              <CaseFile title="Zarzuty wobec Bartosza B.">
                &quot;(...) wymieniony był sprawdzany w związku z występkiem niedozwolonej produkcji i innego obchodzenia się ze środkami odurzającymi (...) albowiem miał w roku 2014 zlecić przesłanie na swój adres przesyłki pocztowej przechwyconej na lotnisku w Lipsku RFN zawierającej 4,5 kg DMT, a 6.6.2018 miało dojść do zatrzymania przesyłki pocztowej we Frankfurcie nad Menem RFN zawierającej 2000 g meskaliny i 38,6 g substancji DMT.&quot;
              </CaseFile>

              <p>Intrygujący fragment dotyczy własności &quot;bazy&quot;:</p>

              <CaseFile title="Własność nieruchomości">
                &quot;(...) budynek rodzinny w miejscowości Janov (...), który jest częściowo użytkowany do stałego zamieszkania, a częściowo jako komercyjny obiekt noclegowy&quot;
                <br/><br/>
                &quot;Świadek [Bartosz B.] potwierdził, że w Janowie jest właścicielem jednej dziesiątej nieruchomości&quot;.
              </CaseFile>

              <p>Do kogo należała reszta? Sąd wskazuje wprost:</p>

              <CaseFile title="Ustalenia Sądu">
                &quot;...w odniesieniu do nieruchomości będących współwłasnością Bartosza B. i <span className="bg-stone-950 text-white px-1">Michała D. K.</span>&quot;.
              </CaseFile>

              <p>
                W Czechach księgi wieczyste są jawne. Wystarczy wyszukać <GalleryTrigger type="janov" className="font-bold underline decoration-stone-300">działkę w Janowie</GalleryTrigger> i za niewielką opłatą pobrać jej pełną historię.
              </p>

              <div className="my-10 flex justify-start">
                <GalleryTrigger type="janov">
                  <LocationStampUI name="JANOV U KRNOVA" code="656976" plot="st. 281" lv="127" />
                </GalleryTrigger>
              </div>

              <p>
              Dokument nie pozostawia wątpliwości. W latach 2012–2023 współwłaścicielami nieruchomości byli:
                 <br/>
                 Bartosz Badowski (10%)
                 <br/>
                 <span className="bg-amber-200/50 px-1 font-bold text-stone-950 box-decoration-clone">Michał Dawid Kiciński (90%)</span>
              </p>

              <p>
                Drugie imię – Dawid – idealnie wypełnia lukę w zanonimizowanym skrócie &quot;Michal D. K.&quot;. <span className="bg-stone-900 text-white px-1 font-bold shadow-md">Wspólnikiem szamana był twórca &quot;Wiedźmina&quot; – jeden z najbogatszych Polaków.</span>
              </p>

              <h2 className="text-4xl mt-20 mb-10 tracking-tighter text-red-900 border-b-4 border-red-900 pb-2 uppercase font-black">Na podsłuchu</h2>

              <p>
                Przełom nastąpił dzięki policyjnej technice operacyjnej. Telefon Kordysa był na stałym podsłuchu. Funkcjonariusze słuchali na żywo, gdy 24.08.2020 r. doszło do nerwowej wymiany zdań.
              </p>

              <CaseFile title="Zapis podsłuchu (Operacja Janov)" type="transcript">
                &quot;oskarżony omawia z B., że dotarła do niego informacja, że w obiekcie w Janowie <span className="underline decoration-red-900 decoration-[6px] underline-offset-4 font-black">zmarła jakaś kobieta</span>&quot;.
              </CaseFile>

              <p>Kordys wprost pyta wspólnika:</p>

              <CaseFile title="Pytanie Kordysa" type="transcript">
                &quot;W jakim zagrożeniu jest nasza praca?&quot;
              </CaseFile>

              <div className="my-12 pl-8 border-l-8 border-stone-950 font-serif italic text-2xl text-stone-900 bg-stone-100/40 p-6">
                &quot;Z ich rozmowy wynika, że nie zajmowali się w zasadzie samym faktem śmierci, lecz raczej obawą, aby to nie przyciągnęło uwagi policji.&quot;
              </div>

              <p>
                Cynizm konwersacji sięga zenitu chwilę później. Gdy tylko ustalili strategię uciszenia plotek, natychmiast przeszli do logistyki dostaw:
              </p>

              <CaseFile title="Kontynuacja rozmowy" type="transcript">
                &quot;Następnie w rozmowie omawiają zamówienia «herbaty» z dżungli i to, czy im tego «nie zepsują», ekscytując się nagraniem od dostawcy, który «siedzi w dżungli i gotuje».&quot;
              </CaseFile>

              <p>
                Dla policjantów przekaz był jasny: w obiekcie mogło dojść do tragedii, a sprawcy martwili się jedynie o ciągłość dostaw. Zaledwie dwa dni po tym telefonie, 26.08.2020 czescy policjanci weszli do posiadłości w Janowie.
              </p>

              <CaseFile title="Protokół rewizji (Janov)">
                &quot;w nieruchomości zabezpieczono rzeczy... oprócz marihuany zabezpieczono również substancje zawierające DMT o objętości ok. 2 kg&quot;.
              </CaseFile>

              <p>
                Podczas nalotu zidentyfikowano tam 15 obywateli Polski. Wśród nich stali bywalcy: <span className="font-bold">Krzysztof Stefanek</span> i <span className="font-bold">Lena Drzewińska</span>.
              </p>

              <h2 className="text-4xl mt-20 mb-10 tracking-tighter text-stone-950 border-b-4 border-stone-900 pb-2 uppercase font-black">Cena wolności</h2>

              <p>
                15 października 2020 roku sielankę przerwał huk granatów ogłuszających. Czeska jednostka antyterrorystyczna wdarła się do budynku w Hermanovicach.
              </p>

              <ArticleVideoPlayer src={`${PINATA_GATEWAY}/${ARREST_VIDEO_CID}/videoplayback.m3u8`} poster="" />
              <div className="mt-1 text-sm text-stone-500 font-sans border-l-2 border-stone-950 pl-3 mb-12 italic uppercase tracking-widest">
                Materiał Operacyjny: Nalot na Hermanovice (15.10.2020)
              </div>

              <div className="my-12 flex gap-4 p-6 bg-blue-900 text-white rounded-sm shadow-xl">
                <Scale className="w-10 h-10 text-blue-300 shrink-0 mt-1" />
                <div>
                  <strong className="block font-serif text-xl font-black mb-2 uppercase tracking-widest">Dohoda o vině a trestu</strong>
                  <div className="text-blue-100 text-lg leading-relaxed">
                    Ugoda o winie i karze. Czeska procedura pozwalająca oskarżonemu na dobrowolne poddanie się karze w zamian za łagodniejszy wyrok, bez publicznego procesu dowodowego i wzywania świadków.
                  </div>
                </div>
              </div>

              <p>
                Bartosz &quot;Badi&quot; Badowski wybrał strategię, która miała uchronić go przed wieloletnim więzieniem. Ugoda pozwoliła na zamknięcie jego teczki bez wywoływania świadków – mechanizmy działania janowskiego ośrodka nigdy nie wybrzmiały echem w publicznej debacie.
              </p>

              <p>
                 Na mocy <GalleryTrigger type="wyrok_badi" className="font-bold underline decoration-blue-900/40">wyroku</GalleryTrigger> z dnia 2 listopada 2021 r. Bartosz Badowski został uznany winnym. Sąd ustalił, że zrealizował co najmniej <span className="font-bold">441 przypadków</span> udostępnienia DMT i marihuany.
              </p>

              <CaseFile title="Ustalenia wyroku (Badowski)">
                &quot;przechowywał łącznie 1902,79 grama materiału roślinnego (...), który zawierał łącznie 37,24 grama substancji czynnej DMT oraz 92,29 grama tzw. narkotyku marihuany&quot;.
              </CaseFile>

              <p>
                Podczas gdy Jarosław Kordys został skazany na 8,5 roku, Bartosz Badowski dzięki ugodzie zakończył sprawę wyrokiem w zawieszeniu.
              </p>

              <h2 className="text-4xl mt-20 mb-10 tracking-tighter text-stone-950 border-b-4 border-stone-900 pb-2 uppercase font-black">Cisza po burzy</h2>

              <p>
                Choć Badowski zaprzestał działalności, posiadłość w Janowie nie opustoszała. Zamieszkali z nim Krzysztof Stefanek i Magdalena Drzewińska. Ich decyzja o zamieszkaniu z człowiekiem, który w obliczu tragedii martwił się o &quot;koszty interesu&quot;, dowodzi pełnej akceptacji reguł zmowy milczenia.
              </p>

              <h2 className="text-4xl mt-20 mb-10 tracking-tighter text-stone-950 border-b-4 border-stone-900 pb-2 uppercase font-black">Kiciński</h2>

              <p>
                Michał Kiciński stał się nieoficjalnym ambasadorem ayahuaski w polskich mediach. W licznych wywiadach opisuje on lekcje pokory, jakie dała mu &quot;medycyna&quot;.
              </p>

              <PullQuote
                quote="Po ayahuasce jest szansa na to, żeby sobie nie ściemniać."
                author="Michał Kiciński"
                source="Newsweek, 30 maja 2016 r."
              />

              <h2 className="text-4xl mt-20 mb-10 tracking-tighter text-red-900 border-b-4 border-red-900 pb-2 uppercase font-black">&quot;Błąd z Badim&quot;</h2>

              <p>
                 Miliarder wiedział o Ilonie. 21 września 2023 r. osobiście odebrał wezwanie na przesłuchanie w sprawie &quot;pobytu w Janowie&quot;.
              </p>

              <div className="my-12 flex flex-col items-center">
                <GalleryTrigger type="wezwanie_kicinski">
                  <img
                    src={`${KORDYS_IMAGES_URL}/wezwanie/wezwanie_kicinski.png`}
                    alt="Dowód: Wezwanie"
                    className="w-56 grayscale hover:grayscale-0 rounded shadow-2xl border-2 border-stone-900 cursor-pointer transition-all"
                  />
                </GalleryTrigger>
                <p className="text-xs text-stone-500 mt-4 font-mono uppercase tracking-widest text-center">
                  Skan wezwania WD-I-3186/23
                </p>
              </div>

              <p>
                Reakcja była błyskawiczna. Zwrócił się do autora zawiadomienia z propozycją &quot;pokuty&quot; – przelewu na fundację zamiast wyjaśnień prokuratorskich.
              </p>

              <CaseFile title="Wiadomość prywatna od M. Kicińskiego" type="email">
                &quot;(...) Tak mogę zapłacić za swój błąd z Badim. Podaj mi Fundacje... i wpłacę tam dobrowolnie kwotę darowizny, w ramach Przeprosin wszechświatowi, za moją młodzieńczą naiwność...&quot;
              </CaseFile>

              <p>
                Podczas przesłuchania 11 października 2023 r. Kiciński przyjął linię braku wiedzy. Jednak gdy padło kluczowe pytanie o jego własny udział:
              </p>

              <CaseFile title="Zeznanie do protokołu">
                &quot;o wcześniejszym okresie <span className="bg-stone-950 text-white px-1 font-bold">odmawiam odpowiedzi</span>&quot;
              </CaseFile>

              <p>
                Warto dodać, że Kiciński zarządza ośrodkiem Munay Sonqo w Peru, gdzie ceremonie są legalne. Wiedział dokładnie, jak wygląda ten &quot;biznes&quot;. Bartosz Badowski w korespondencji potwierdza: <span className="italic">&quot;Michał wiedział dokładnie co się dzieje na farmie i czerpał z tego zyski&quot;.</span>
              </p>

              <h2 className="text-4xl mt-20 mb-10 tracking-tighter text-stone-950 border-b-4 border-stone-900 pb-2 uppercase font-black">Anonimowy filantrop</h2>

              <p>
                Krzysztof Stefanek snuje opowieść o &quot;cudownej darowiznie&quot;. Kalendarz wydarzeń burzy ten mit:
              </p>

              <ul className="list-none space-y-12 my-12 font-mono text-sm border-l-4 border-stone-950 pl-6">
                <li className="flex items-start gap-3 opacity-40">
                  <Calendar className="w-5 h-5 text-stone-900 shrink-0" />
                  <div><span className="font-bold">21.09.2023</span> – Kiciński odbiera wezwanie.</div>
                </li>
                <li className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-stone-900 shrink-0" />
                  <div><span className="font-bold">03.10.2023</span> – Odkupuje 10% od Badowskiego (musi mieć całość, by się jej pozbyć).</div>
                </li>
                <li className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-stone-900 shrink-0" />
                  <div><span className="font-bold">11.10.2023</span> – Przesłuchanie na policji.</div>
                </li>
                <li className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-red-900 shrink-0 mt-3" />
                  <div className="bg-red-50 border-2 border-red-900 p-6 rounded-sm shadow-xl w-full">
                    <span className="font-black text-red-900 block text-lg mb-1">23 PAŹDZIERNIKA 2023</span>
                    Zaledwie 12 dni po kłopotliwym przesłuchaniu, miliarder dzwoni do Stefanka z ofertą oddania majątku za darmo.
                  </div>
                </li>
              </ul>

              <p>
                Miliarder pozbył się dowodów, a nowi właściciele zyskali bazę do działalności pod szyldem organizacji &quot;non-profit&quot; – Stowarzyszenia Natury Zew.
              </p>

              <div className="my-10 flex justify-start">
                 <TransactionStampUI label="Nr Transakcji (Katastr)" value="V-5821/2023-127" subDetails="Janov u Krnova [656976]" />
              </div>

              <h2 className="text-4xl mt-20 mb-10 tracking-tighter text-stone-950 border-b-4 border-stone-900 pb-2 uppercase font-black">Nýdek</h2>

              <p>
                W miejscowości Nýdek funkcjonował bliźniaczy ośrodek. Właścicielem – w czasie ceremonii – był drugi z założycieli CD Projekt, <span className="bg-amber-200/40 px-1 font-bold">Marcin Iwiński</span>.
              </p>

              <div className="my-10 flex justify-start">
                <GalleryTrigger type="nydek">
                  <LocationStampUI name="NÝDEK" code="708186" plot="st. 506/1" lv="832" />
                </GalleryTrigger>
              </div>

              <p className="bg-stone-950 text-white p-6 font-bold text-center uppercase tracking-widest text-xl shadow-2xl">
                Obaj założyciele CD Projekt posiadali nieruchomości, w których odpłatnie oferowano nielegalne substancje.
              </p>

              <p>
                Iwiński sprzedał posiadłość w czerwcu 2021 r. szamanowi Piotrowi Traczowi, gdy nad środowiskiem zawisło widmo nalotów.
              </p>

              <div className="my-10 flex justify-start">
                <TransactionStampUI label="Nr Transakcji (Katastr)" value="V-2937/2021-832" subDetails="Nýdek [708186]" />
              </div>

              <h2 className="text-4xl mt-20 mb-10 tracking-tighter text-red-900 border-b-4 border-red-900 pb-2 uppercase font-black">Wiktor B.</h2>

              <p>
                3 marca 2026 Onet ujawnia kulisy śmierci 54-letniej Ilony L.-H. Podczas nocnej ceremonii w czerwcu 2018 r. nikt nie wezwał pomocy medycznej. Prowadzący Wiktor B. zatuszował incydent, twierdząc, że Ilona została znaleziona martwa rano w łazience.
              </p>

              <p>
                Sytuacja zmieniła się w 2024 r. po wszczęciu oficjalnego śledztwa. Kilka miesięcy później Wiktor B. umiera w tajemniczych okolicznościach w magazynie. Śledztwo pozostaje zawieszone w oczekiwaniu na toksykologię.
              </p>

              <div className="mt-16 mb-8 flex justify-end">
                 <div className="text-right border-r-8 border-stone-950 pr-6">
                    <span className="block font-black text-3xl text-stone-950 uppercase tracking-tighter leading-none">Detektyw Polutek</span>
                    <span className="block text-xs text-stone-500 font-sans mt-2 italic">detektyw.polutek@protonmail.com</span>
                 </div>
              </div>

              <div className="my-12 border-y-[4px] border-stone-950 py-10">
                 <h3 className="font-sans font-black text-2xl uppercase tracking-tighter text-stone-950 mb-10 flex items-center gap-3">
                    <ShieldCheck className="w-8 h-8 text-red-900" />
                    Status Prawny (2025/2026)
                 </h3>

                 <div className="grid gap-1 bg-stone-900 border-2 border-stone-900 shadow-2xl">
                    <div className="bg-[#fcfbf9] p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                       <div>
                          <span className="block font-serif text-stone-950 text-xl font-bold">Śledztwo: Organizacja ceremonii</span>
                          <span className="block text-sm text-stone-500">Częstochowa | 3013-1.Ds.15.2024</span>
                       </div>
                       <span className="font-mono text-sm font-bold bg-stone-900 text-white px-4 py-2 uppercase">W TOKU</span>
                    </div>

                    <div className="bg-[#fcfbf9] p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-t border-stone-200">
                       <div>
                          <span className="block font-serif text-red-900 text-xl font-black">Śledztwo: Śmierć Ilony L.-H.</span>
                          <span className="block text-sm text-stone-500">Częstochowa | 3013-1.Ds.4.2026</span>
                       </div>
                       <span className="font-mono text-sm font-bold bg-red-900 text-white px-4 py-2 uppercase">PRIORYTET</span>
                    </div>

                    <div className="bg-[#fcfbf9] p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-t border-stone-200">
                       <div>
                          <span className="block font-serif text-stone-950 text-xl font-bold">Śledztwo: Śmierć Wiktora B.</span>
                          <span className="block text-sm text-stone-500">Pułtusk | 4027-0.Ds.1254.2024</span>
                       </div>
                       <span className="font-mono text-sm font-bold bg-blue-900 text-white px-4 py-2 uppercase">ZAWIESZONE</span>
                    </div>
                 </div>
              </div>

            </div>

            <footer className="mt-12 pt-12 border-none font-sans">
               <div className="mb-10">
                 <h3 className="text-2xl font-black text-stone-950 uppercase tracking-tighter flex items-center gap-3 mb-6">
                   <Search className="w-6 h-6" /> Akta Dowodowe
                 </h3>
                 <div className="border-b-4 border-stone-950 w-full mb-8"></div>
                 <div className="grid gap-6">
                   <div className="p-4 bg-white border-2 border-stone-900 hover:border-red-900 transition-all shadow-md group">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div>
                          <h4 className="font-black text-stone-950 text-lg leading-tight uppercase">Wyrok: Jarosław Kordys</h4>
                          <p className="font-mono text-xs text-stone-500 mt-1">SYGNATURA: 30 T 5/2020</p>
                        </div>
                        <a href={KORDYS_PDF_URL} className="shrink-0 w-full sm:w-44 justify-center bg-stone-950 text-white px-4 py-3 text-xs font-black uppercase tracking-widest hover:bg-red-900 transition-colors flex items-center gap-2">
                          <FileText className="w-4 h-4" /> Pobierz PDF
                        </a>
                      </div>
                   </div>

                   <div className="p-4 bg-white border-2 border-stone-900 hover:border-red-900 transition-all shadow-md">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div>
                          <h4 className="font-black text-stone-950 text-lg leading-tight uppercase">Wyrok: Bartosz Badowski</h4>
                          <p className="font-mono text-xs text-stone-500 mt-1">SYGNATURA: 66 T 146/2021</p>
                        </div>
                        <a href={BADI_PDF_URL} className="shrink-0 w-full sm:w-44 justify-center bg-stone-950 text-white px-4 py-3 text-xs font-black uppercase tracking-widest hover:bg-red-900 transition-colors flex items-center gap-2">
                          <FileText className="w-4 h-4" /> Pobierz PDF
                        </a>
                      </div>
                   </div>
                 </div>
               </div>

               <div className="mt-20 text-center pb-20">
                  <div className="w-48 h-1 bg-stone-950 mx-auto mb-10"></div>
                  <div className="mb-12 bg-stone-950 text-white p-10 rounded-sm shadow-2xl">
                    <h3 className="text-lg font-black uppercase tracking-widest mb-6 flex items-center justify-center gap-3">
                      <ShieldCheck className="w-6 h-6 text-red-500" /> Decentralized Mirror
                    </h3>
                    <p className="text-sm text-stone-400 mb-8 leading-relaxed max-w-xl mx-auto font-mono">
                      W CELU ZAPEWNIENIA NIEZNISZCZALNOŚCI DOWODÓW, DOKUMENTACJA ZOSTAŁA ZARCHIWIZOWANA W SIECIACH IPFS ORAZ ARWEAVE.
                    </p>
                    <div className="flex flex-col gap-4 font-mono text-xs uppercase tracking-widest">
                      <a href="#" className="text-red-400 hover:text-white underline decoration-2">IPFS: DOWODY (FULL ARCHIVE)</a>
                      <a href="#" className="text-red-400 hover:text-white underline decoration-2">GITHUB: SOURCE MIRROR</a>
                    </div>
                  </div>

                  <p className="text-xs text-stone-500 font-mono uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
                    <Globe className="w-4 h-4" /> Official Endpoint
                  </p>
                  <a href="https://www.eliksir-wiedzmina.pl" className="font-black text-xl text-stone-950 hover:text-red-900 transition-colors underline decoration-4 decoration-stone-200">
                    WWW.ELIKSIR-WIEDZMINA.PL
                  </a>
               </div>
            </footer>
          </article>
        </div>
      </main>
    </ElixirModalsProvider>
  );
}
