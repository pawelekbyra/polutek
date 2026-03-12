import React from 'react';
import { CaseFile, LegalNote, PullQuote, LocationStampUI, TransactionStampUI } from './InvestigativeUI';
import { ArticleVideoPlayer } from './InvestigativeMedia';
import { InteractiveSpan } from './InteractiveSpan';
import { GalleryProvider } from './GalleryContext';

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

export const InvestigativeArticle = () => {
  return (
    <GalleryProvider>
      <article className="max-w-3xl mx-auto px-6 pt-4 pb-0 flex-grow w-full z-10 relative">
        <div
          className="prose prose-stone prose-lg max-w-none article-prose font-serif text-lg leading-relaxed"
          style={{ color: '#000000', opacity: 1, WebkitFontSmoothing: 'none' }}
        >
          <p className="drop-cap mt-0">
            W 2020 roku media obiegły doniesienia o rozbiciu grupy polskich szamanów w czeskich <strong className="font-black">Hermanovicach</strong>. Policyjny nalot, aresztowanie <strong className="font-black">Jarosława i Karoliny Kordysów</strong>, a następnie surowe wyroki – 8,5 oraz 5,5 roku więzienia za prowadzenie nielegalnego biznesu polegającego na organizacji tzw. ceremonii, podczas których klientom podawano egzotyczny psychodelik – ayahuaskę.
          </p>

          <p className="mt-4">
            Ayahuasca (czyt. ajałaska) to tradycyjny wywar z amazońskich roślin o silnym działaniu halucynogennym. Ze względu na wysoką zawartość DMT – substancji psychodelicznej wywołującej intensywne wizje i zmiany stanu świadomości – jej posiadanie i podawanie jest w Polsce i Czechach zabronione. Finałem medialnego spektaklu Kordysów było ułaskawienie ich przez czeskiego prezydenta po dwóch latach odsiadki. <a href="https://krytykapolityczna.pl/narkopolityka/polacy-ayahuasca-czechy/" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:bg-[#e8d154]/50 transition-colors rounded px-1" title="Kliknij, aby zobaczyć archiwalny dowód">🌐</a>
          </p>

          <p className="mt-4">
            Kurtyna opadła, temat ucichł. Ale czy to na pewno koniec tej historii? W cieniu tego głośnego procesu toczył się drugi – cichy i błyskawiczny, zakończony dyskretnym wyrokiem, o którym nikt nawet w mediach się nie zająknął. Analiza sądowych dokumentów prowadzi do zdumiewających wniosków.
          </p>

          <p className="mt-4">
            W przygranicznym Janovie funkcjonował drugi, bliźniaczy ayahuaskowy ośrodek, którego współwłaścicielem okazał się miliarder – <strong className="font-black">Michał Kiciński</strong>.
          </p>

          <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">Świadek B.</h2>

          <p className="mt-4">
            W obszernym i publicznie dostępnym uzasadnieniu wyroku Jarosława Kordysa <InteractiveSpan type="kordys" title="Kliknij, aby zobaczyć wyrok">📄</InteractiveSpan> pojawia się postać świadka Bartosza B. Zgodnie z aktami:
          </p>

          <CaseFile title="Zeznania świadka B." type="transcript" source="Uzasadnienie wyroku Kordysa, sygn. 30 T 5/2020">
            Świadek B. odnośnie osoby oskarżonego [Jarosława Kordysa] oświadczył, że zna się z nim ok. 8 lat, a poznali się w Holandii. Świadek B. potwierdził, że i on sam w przeszłości prowadził warsztaty, a obecnie sam jest przedmiotem dochodzenia policji w Krnowie właśnie z powodu ceremonii.
          </CaseFile>

          <p className="mt-4">
            Akta ujawniają również skalę zarzutów wobec Bartosza B.:
          </p>

          <CaseFile title="Zarzuty wobec Bartosza B." source="Uzasadnienie wyroku Kordysa, sygn. 30 T 5/2020">
            (...) wymieniony był sprawdzany w związku z występkiem niedozwolonej produkcji i innego obchodzenia się ze środkami odurzającymi (...) albowiem miał w roku 2014 zlecić przesłanie na swój adres przesyłki pocztowej przechwyconej na lotnisku w Lipsku RFN zawierającej 4,5 kg DMT, a 6.6.2018 miało dojść do zatrzymania przesyłki pocztowej we Frankfurcie nad Menem RFN zawierającej 2000 g meskaliny i 38,6 g substancji DMT.
          </CaseFile>

          <p className="mt-4">
            Intrygujący fragment dotyczy własności bazy. Dokumenty stwierdzają:
          </p>

          <CaseFile title="Własność nieruchomości" source="Uzasadnienie wyroku Kordysa, sygn. 30 T 5/2020">
            (...) budynek rodzinny w miejscowości Janov (...), który jest częściowo użytkowany do stałego zamieszkania, a częściowo jako komercyjny obiekt noclegowy.
            <br/><br/>
            Świadek [Bartosz B.] potwierdził, że w Janovie jest właścicielem jednej dziesiątej nieruchomości.
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
            W Czechach księgi wieczyste są jawne i za niewielką opłatą można pobrać jej historyczny wypis. Pobrany dokument nie pozostawia wątpliwości<InteractiveSpan type="wlasnosc-kicinski" title="Kliknij, aby zobaczyć dokument">👁️</InteractiveSpan>: w latach 2012–2023 współwłaścicielami ayahuaskowej nieruchomości <InteractiveSpan type="janov-photos" title="Kliknij, aby zobaczyć galerię zdjęć Janova">📸</InteractiveSpan> byli:
            <br/><br/>
            Bartosz Badowski (10%) i <span className="bg-[#e8d154]/80 px-1 font-black text-black box-decoration-clone">Michał Dawid Kiciński (90%)</span><br/>
          </p>

          <p className="mt-4 leading-tight">
            Drugie imię – Dawid – idealnie wypełnia lukę w zanonimizowanym skrócie Michał D. K.
            <br />
            <span className="bg-red-600 px-1 font-black text-white shadow-sm box-decoration-clone inline-block">
              Wspólnikiem szamana był twórca Wiedźmina – jeden z najbogatszych Polaków.
            </span>
          </p>

          <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">Na podsłuchu</h2>

          <p className="mt-4">
            Przełom w sprawie organizatorów ayahuaskowych ceremonii w 2020 roku nastąpił dzięki policyjnej technice operacyjnej. Telefon Kordysa był na stałym podsłuchu, a funkcjonariusze słuchali na żywo, gdy w dniu 24.08.2020 r. doszło do nerwowej wymiany zdań pomiędzy Badowskim i Kordysem.
          </p>

          <p className="mt-4">
            Kordys zadzwonił do Badowskiego wyraźnie zaniepokojony wieściami, które do niego dotarły. Bał się, że tragedia, o której huczało w kuluarach, może zniszczyć ich imperium. Sąd w uzasadnieniu wyroku precyzyjnie rekonstruuje ten moment:
          </p>

          <CaseFile title="Rekonstrukcja rozmowy (Uzasadnienie Sądu)" type="transcript" source="Uzasadnienie wyroku Kordysa, sygn. 30 T 5/2020">
            oskarżony [Jarosława Kordysa] omawia z B., że dotarła do niego informacja, że w obiekcie w Janovie <span className="underline decoration-red-700 decoration-4 underline-offset-4 font-bold">zmarła jakaś kobieta</span>.
          </CaseFile>

          <p className="mt-4">
            W rozmowie pojawia się też wątek zagrożenia ze strony osoby trzeciej – mężczyźni omawiają szantażystę, który chce iść na policję. Kordys wprost pyta wspólnika:
          </p>

          <CaseFile title="Pytanie Kordysa" type="transcript" source="Uzasadnienie wyroku Kordysa, sygn. 30 T 5/2020">
            W jakim zagrożeniu jest nasza praca?
          </CaseFile>

          <div className="not-prose my-12 pl-6 border-l-[6px] border-black font-serif italic text-2xl text-[#000000] leading-relaxed relative z-10">
            „Z ich rozmowy wynika, że nie zajmowali się w zasadzie samym faktem śmierci, lecz raczej obawą, aby to nie przyciągnęła uwagi policji.”
            <div className="text-left text-[10px] uppercase tracking-widest text-black/50 mt-4 font-mono not-italic">
              Źródło: Uzasadnienie wyroku Kordysa, sygn. 30 T 5/2020
            </div>
          </div>

          <p className="mt-4">
            Dla sądu był to koronny dowód na to, że oskarżeni prowadzili nielegalny biznes, a nie działalność duchową – śmierć człowieka była dla nich jedynie psuciem interesów.
          </p>

          <p className="mt-4">
            Cynizm tej konwersacji sięga zenitu chwilę później. Gdy tylko ustalili strategię uciszenia plotek, natychmiast przeszli do logistyki dostaw narkotyku. Sąd odnotowuje, że zaraz po dywagacjach o śmierci i szantażu, rozmówcy wracają do interesów:
          </p>

          <CaseFile title="Kontynuacja rozmowy" type="transcript" source="Uzasadnienie wyroku Kordysa, sygn. 30 T 5/2020">
            Następnie w rozmowie omawiają zamówienia «herbaty» z dżungli i to, czy im tego «nie zepsują», ekscytując się nagraniem od dostawcy, który «siedzi w dżungli i gotuje».
          </CaseFile>

          <p className="mt-4">
            Dla policjantów, którzy słyszeli to w czasie rzeczywistym, przekaz był jasny: w obiekcie mogło dojść do tragedii, a sprawcy martwili się jedynie o ciągłość dostaw.
          </p>

          <p className="mt-4">
            Zaledwie dwa dni po tym telefonie, 26.08.2020 czescy policjanci weszli do posiadłości w Janovie. Efekty rewizji opisano w wyroku Kordysa:
          </p>

          <CaseFile title="Protokół rewizji" source="Uzasadnienie wyroku Kordysa, sygn. 30 T 5/2020">
            w nieruchomości zabezpieczono rzeczy... oprócz marihuany zabezpieczono również substancje zawierające DMT o objętości ok. 2 kg.
          </CaseFile>

          <p className="mt-4">
            Podczas policyjnej interwencji zidentyfikowano tam 15 obywateli Polski, którzy mieli brać udział w ceremonii. Wśród nich, stali bywalcy i bliscy znajomi Badowskiego – <strong className="font-black">Krzysztof Stefanek</strong> i <strong className="font-black">Magdalena Drzewińska</strong>, których obecność w momencie wkroczenia służb ma znaczenie w kontekście późniejszej ich roli w tej historii.
          </p>

          <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">Cena wolności</h2>

          <p className="mt-4">
            Kiedy 26 sierpnia 2020 roku czeska policja weszła do posiadłości w Janovie, należącej do Bartosza Badowskiego i miliardera Michała Kicińskiego, Jarosław Kordys w Hermanovicach wciąż czuł się bezpiecznie. Nie wiedział jeszcze, że zegar zaczął odliczać czas do jego własnej katastrofy. Zaledwie 7 tygodni po cichym nalocie na Badowskiego policja zapukała do Kordysów.
          </p>

          <p className="mt-4">
            15 października 2020 roku sielankę w ich ośrodku przerwał huk granatów ogłuszających. Czeska jednostka antyterrorystyczna nie bawiła się w półśrodki: zamaskowani funkcjonariusze z długą bronią wdarli się do budynku, rzucając na ziemię przyszłych bohaterów głośnego skandalu.
          </p>

          <div className="not-prose my-8">
            <ArticleVideoPlayer src={ARREST_VIDEO_URL} poster={KORDYS_COVER} />
            <div className="mt-4 text-sm text-black font-mono border-l-[4px] border-black pl-4 bg-[#e8d154]/20 py-2 relative z-10">
              <span className="font-black uppercase text-xs mr-2">Materiał Operacyjny:</span>
              Nagranie z policyjnego nalotu na ośrodek w Hermanovicach (15.10.2020)
            </div>
          </div>

          <p className="mt-4">
            Co wydarzyło się w ciągu tych niespełna dwóch miesięcy? Odpowiedź kryje się w jednym czeskim terminie prawnym:
          </p>

          <LegalNote term="Dohoda o vině">
            Czeska procedura karna pozwalająca oskarżonemu na dobrowolne poddanie się karze w zamian za łagodniejszy wyrok, bez przeprowadzania pełnego procesu dowodowego i wzywania świadków.
          </LegalNote>

          <p className="mt-4">
            Bartosz „Badi” Badowski, wspólnik jednego z najbogatszych Polaków, błyskawicznie zrozumiał swoje położenie. W obliczu zabezpieczonych dowodów – w tym 2 kilogramów substancje z DMT i marihuany – wybrał strategię, która miała uchronić go przed wieloletnim więzieniem. Postanowił kupić sobie wolność.
          </p>

          <p className="mt-4">
            Ugoda pozwoliła na zamknięcie jego teczki bez wywoływania świadków, co w praktyce oznaczało, że mechanizmy działania janovskiego ośrodka nigdy nie wybrzmiały echem w publicznej debacie, chroniąc Badowskiego przed krzyżowym ogniem pytań i zeznaniami, które mogłyby pogrążyć także jego cichego wspólnika.
          </p>

          <p className="mt-4">
            Cena wolności Badowskiego okazała się być wysoka dla jego kolegi z branży. Zeznania Badiego były dla prokuratury bezcennym materiałem dowodowym, który pozwolił domknąć łańcuch poszlak w sprawie Kordysów.
          </p>

          <p className="mt-4">
            Na mocy wyroku z dnia 2 listopada 2021 roku <InteractiveSpan type="badowski" title="Kliknij, aby zobaczyć wyrok">📄</InteractiveSpan> Bartosz Badowski został uznany winnym popełnienia zbrodni niedozwolonej produkcji i innego obchodzenia się ze środkami odurzającymi.
          </p>

          <CaseFile title="Ustalenia wyroku skazującego Bartosza B." source="Uzasadnienie wyroku Kordysa, sygn. 30 T 5/2020">
            co najmniej od bliżej nieustalonej daty w 2015 roku do 26.08.2020 [...] oferował, organizował i co najmniej w 441 przypadkach zrealizował w nieregularnych odstępach czterodniowe i dziesięciodniowe pobyty [...] ukierunkowane na tzw. duchowe ćwiczenia spirytualne
            <br/><br/>
            udostępnił uczestnikom do użycia bliżej nieustaloną ilość substancji psychotropowych, a mianowicie tzw. ayahuascę zawierającą dimetylotryptaminę (DMT) oraz tzw. marihuanę zawierającą tetrahydrokannabinol (THC)
            <br/><br/>
            przechowywał łącznie 1902,79 grama materiału roślinnego (...), który zawierał łącznie 37,24 grama substancji czynnej dimetylotryptaminy (DMT) oraz 92,29 grama tzw. narkotyku marihuany.
          </CaseFile>

          <p className="mt-4">
            Podczas gdy Jarosław Kordys został skazany na 8,5 roku pozbawienia wolności, Bartosz Badowski, którego sprawa dotyczyła tego samego procederu, tych samych substancji, regionu i czasu trwania działalności, dzięki ugodzie i współpracy z wymiarem sprawiedliwości, zakończył sprawę wyrokiem w zawieszeniu.
          </p>

          <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">Cisza po burzy</h2>

          <p className="mt-4">
            Choć Badowski zaprzestał prowadzenia działalności szamańskiej, posiadłość w Janovie nie opustoszała – zamieszkali z nim wspomniani wcześniej <strong className="font-black">Krzysztof Stefanek</strong> i <strong className="font-black">Magdalena Drzewińska</strong>. Ich obecność u boku Badiego w tamtym czasie rzuca cień na ich późniejszą rolę; nie byli to wszakże niewinni obserwatorzy, lecz ludzie, którzy mimo tego, że sami byli obecni podczas policyjnej interwencji, pozostali lojalni wobec byłego szamana.
          </p>

          <p className="mt-4">
            Będąc tak blisko Badowskiego, doskonale znali mroczną tajemnicę śmierci Ilony. Ich decyzja o zamieszkaniu z człowiekiem, który w obliczu tragedii martwił się o ciągłość dostaw, dowodzi, że w pełni akceptowali reguły zmowy milczenia.
          </p>

          <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">Kiciński</h2>

          <p className="mt-4">
            W cieniu tych wyroków pozostaje wciąż niewyjaśniona rola cichego wspólnika. Michał Kiciński to nie jest postać, która o ayahuasce jedynie słyszała – on stał się jej nieoficjalnym ambasadorem w polskich mediach głównego nurtu. W licznych wywiadach (m.in. dla Focusa, Newsweeka) z niezwykłą precyzją opisuje on mechanizmy działania psychodelików. Kiciński publicznie opowiada o lekcjach pokory, jakie dała mu medycyna, o spotkaniach z szamanami i o tym, jak napar z dżungli otwiera nową rzeczywistość.
          </p>

          <PullQuote
            quote="Po ayahuasce jest szansa na to, żeby sobie nie ściemniać."
            author="Michał Kiciński"
            source="Newsweek, 30 maja 2016 r."
          />

          <div className="not-prose my-8">
            <ArticleVideoPlayer src={KICINSKI_VIDEO_URL} />
            <div className="mt-4 text-sm text-black font-mono border-l-[4px] border-black pl-4 bg-[#e8d154]/20 py-2 relative z-10">
              <span className="font-black uppercase text-xs mr-2">Materiał Wideo:</span>
              Michał Kiciński o Ayahuasce (Festiwal Wibracje)
            </div>
          </div>

          <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">Błąd z Badim</h2>

          <p className="mt-4"> Konfrontacja Michała Kicińskiego z organami ścigania nabrała formalnego kształtu jesienią 2023 roku. 21 września 2023 roku miliarder osobiście odebrał wezwanie do stawiennictwa na przesłuchanie w charakterze świadka. Miało się ono odbyć 18.10.2023. Na wezwaniu czytelnie było napisane, że przesłuchanie będzie dotyczyć Janova.
          </p>

          <p className="mt-4">
            Reakcja miliardera na zainteresowanie organami ścigania była błyskawiczna. Zwrócił się bezpośrednio do autora zawiadomienia – wysyłając mu wiadomość mailową z propozycją swoistej pokuty. Zamiast wyjaśnień prokuratorskich zaoferował przelew na cel charytatywny, nazywając lata nielegalnego procederu młodzieńczą naiwnością.
          </p>

          <CaseFile title="Wiadomość prywatna od M. Kicińskiego" type="email" source="ONET.PL">
            (...) Tak mogę zapłacić za swój błąd z Badim. Podaj mi Fundacje lub Stowarzyszenie (najlepiej powiązaną z hospicjum lub domami dziecka, bo tu widzę morze potrzeb i dużo cierpienia) i wpłacę tam dobrowolnie kwotę darowizny, w ramach Przeprosin wszechświatowi, za moją młodzieńczą naiwność i brak przenikliwości. Fundacja / Stowarzyszenie musi być uznana i z tradycjami, a nie jakaś organizacja krzak. Wyślę Ci potwierdzenie przelewu.
          </CaseFile>

          <p className="mt-4">
            Do przesłuchania doszło tydzień przed terminem wskazanym na wezwaniu – 11 października 2023 roku o godzinie 15:00 w Komendzie Rejonowej Policji Warszawa II. W protokole Kiciński przyjmuje linię opartą na braku świadomości co do charakteru działalności prowadzonej w jego posiadłości.
          </p>

          <CaseFile title="Zeznanie do protokołu" source="ONET.PL">
            Nie mam żadnej wiedzy co się działo na mojej farmie, w której jestem 90% udziałowcem (...) wynajmowałem tę nieruchomość.
          </CaseFile>

          <p className="mt-4">
            Gdy w toku czynności padło kluczowe pytanie o jego własny udział w ceremoniach ayahuaski w Janovie, odpowiedź była lakoniczna:
          </p>

          <CaseFile title="Odpowiedź na pytanie o udział" source="ONET.PL">
            nie brałem udziału w takich ceremoniach w latach 2016-2023, a o wcześniejszym okresie <span className="underline decoration-black decoration-4 underline-offset-4 font-black">odmawiam odpowiedzi</span>
          </CaseFile>

          <p className="mt-4">
            W kontekście złożonych zeznań warto zauważyć, że miliarder jest właścicielem luksusowego ośrodka Munay Sonqo w Peru, o którym wielokrotnie wspominał w wywiadach.
          </p>

          <p className="mt-4">
            W przeciwieństwie do Europy, peruwiańskie prawo zezwala na komercyjne prowadzenie ceremonii z ayahuascą. Ośrodek Kicińskiego do tej pory oferuje tam w pełni jawną i profesjonalną sprzedaż usług o profilu bliźniaczym do tych, które w Czechach są zakazane, co wciąż jest eksponowane na stronie internetowej. <a href="https://munaysonqo.com/all-retreats/#calendar-7a66adc3-3ebd-432c-b572-0faf936c281f-event-e90d5161-a00e-4742-b4b7-039de153a23d" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:bg-[#e8d154]/50 transition-colors rounded px-1" title="Kliknij, aby otworzyć stronę ośrodka Munay Sonqo">🌐</a>
          </p>

          <p className="mt-4">
            Fakt, że Kiciński w momencie przesłuchania zarządzał legalnym biznesem ayahuaskowym w Ameryce Południowej, stawia pod znakiem zapytania jego deklarowaną nieświadomość co do profilu działalności w Janovie.
          </p>

          <p>
            Oto jak współpracę opisuje sam Bartosz Badowski:
          </p>

          <CaseFile title="Fragment korespondencji B. Badowskiego" type="email" source="Bartosz Badowski">
            Przelewy wysyłałem z mojego konta ING, które mam do tej pory [...]. Tytuł „wynajem”. (...) Dopóki zarabiałem - dzieliłem się z zyskiem. (...) Michał wiedział dokładnie co się dzieje na farmie i czerpał z tego zyski przez wiele wiele lat. (...) Rozważam też wizytę na Policji w Czechach - ja poniosłem prawne konsekwencje za prowadzenie ceremonii, ale Kiciński - żadnych. Mimo że to on czerpał z tego największe zyski, to on był nade mną i był większościowym właścicielem farmy.
          </CaseFile>

          <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">Anonimowy filantrop</h2>

          <p className="mt-4">
            W listopadzie 2025 roku na kanale YouTube <strong className="font-black">Osada Natury Zew</strong> pojawia się nagrany rok wcześniej film, w którym obecny gospodarz, <strong className="font-black">Krzysztof Stefanek</strong>, snuje opowieść o powstaniu Osady. W sielskiej scenerii, z uśmiechem na ustach, buduje narrację o cudownym zbiegu okoliczności i tajemniczym dobroczyńcy.
          </p>

          <p className="mt-4">
            Stefanek wspomina, jak wspólnie z grupą przyjaciół pomagał uporządkować sprawy własnościowe, by obiekt znalazł się w jednych rękach. Kluczowy moment tej opowieści Stefanek datuje z niezwykłą precyzją:
          </p>

          <CaseFile title="Wypowiedź K. Stefanka" source="YouTube kanał Osada Natury Zew">
            Ostatecznie <span className="bg-[#e8d154]/80 px-1 font-black text-black box-decoration-clone">23 października 2023 roku</span> ten człowiek do nas zadzwonił powiedział, że wspólnie z żoną zdecydowali, że oni by chcieli to miejsce przekazać w darowiźnie
          </CaseFile>

          <p className="mt-4">
            Stefanek przedstawia to jako efekt researchu darczyńcy, który rzekomo urzekła wizja działalności non-profit.
          </p>

          <div className="not-prose my-8">
            <ArticleVideoPlayer src={STEFANEK_VIDEO_URL} />
            <div className="mt-4 text-sm text-black font-mono border-l-[4px] border-black pl-4 bg-[#e8d154]/20 py-2 relative z-10">
              <span className="font-black uppercase text-xs mr-2">Materiał Wideo:</span>
              Krzysztof Stefanek opowiada o cudownym otrzymaniu darowizny (Materiał z 2025 r.)
            </div>
          </div>

          <p className="mt-4 mb-8">
            Jednak kalendarz wydarzeń prawnych burzy ten romantyczny mit, ujawniając nerwowy pośpiech w pozbywaniu się gorącego kartofla:
          </p>

          <ul className="not-prose list-none space-y-10 my-12 font-mono text-sm border-l-4 border-black pl-6 relative z-10">
            <li className="flex items-start gap-4">
              <span className="text-xl">📅</span>
              <div>
                <strong className="font-black text-base">21 września 2023 r.</strong><br/>
                Michał Kiciński odbiera wezwanie na przesłuchanie w sprawie Janova.
              </div>
            </li>

            <li className="flex items-start gap-4">
              <span className="text-xl">📅</span>
              <div>
                <strong className="font-black text-base">3 października 2023 r.</strong><br/>
                Na tydzień przed wizytą na komendzie odkupuje od Bartosza Badowskiego jego 10% udziałów w nieruchomości za 160 tys. złotych<InteractiveSpan type="cena" title="Kliknij, aby zobaczyć dokument">👁️</InteractiveSpan>. Aby pozbyć się całego ośrodka jednym podpisem, musi najpierw stać się jego jedynym właścicielem.
              </div>
            </li>

            <li className="flex items-start gap-4">
              <span className="text-xl">📅</span>
              <div>
                <strong className="font-black text-base">11 października 2023 r.</strong><br/>
                Miliarder staje przed policją. Do protokołu odmawia zeznań na temat swojej przeszłości w tym miejscu.
              </div>
            </li>

            <li className="flex items-start gap-4 mt-6">
              <span className="text-xl mt-4">⚠️</span>
              <div className="bg-[#e8d154]/30 border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full">
                <strong className="font-black text-base font-sans">23 października 2023 r.</strong><br/>
                Zaledwie 12 dni po kłopotliwym przesłuchaniu, gdy formalności własnościowe z Badim są już dopięte, następuje telefon do Stefanka z propozycją oddania majątku wartego miliony za darmo.
              </div>
            </li>

            <li className="flex items-start gap-4 mt-6">
              <span className="text-xl">📅</span>
              <div>
                <strong className="font-black text-base">21 grudnia 2023 r.</strong><br/>
                Finał operacji. Kiciński formalnie przekazuje Janov w formie darowizny. Nieruchomość trafia do stowarzyszenia non-profit – fasadowej organizacji krzak, zarządzanej przez ludzi, którzy przez lata byli częścią tego procederu. Miliarder pozbywa się dowodów, a nowi właściciele zyskują bazę do dalszej działalności pod nowym szyldem.
              </div>
            </li>
          </ul>

          <p className="mt-4">
            Cynizm tej sytuacji pogłębia fakt, że obdarowani nie byli przypadkowymi entuzjastami ekologii. <strong className="font-black">Krzysztof Stefanek</strong>, który w filmie mówi o odwróconej logice i pięknie wolontariatu, i jego konkubina <strong className="font-black">Magdalena Drzewińska</strong> w rzeczywistości doskonale znali mroczną historię Janova i tajemnicę śmierci Ilony. Przyjmując darowiznę, przejmowali nie tylko ziemię, ale i milczenie.
          </p>

          <div className="not-prose my-8 flex justify-start">
             <TransactionStampUI
              label="Nr Transakcji (Katastr)"
              value="V-5821/2023-127"
              subDetails="Obręb: Janov u Krnova [656976]"
            />
          </div>

          <p className="mt-4">
            Ostatecznie strategia okazała się skuteczna. Śledztwo umorzono, zanim się zaczęło, a majątek, który mógł podlegać przepadkowi jako narzędzie przestępstwa, został bezpiecznie zaparkowany w stowarzyszeniu. Kiciński pozostał anonimowym filantropem, a Stefanek – opiekunem nowej, czystej osady.
          </p>

          <p className="mt-4">
            Na tragedii świadomie wzbogacili się ludzie, dla których tuszowanie prawdy stało się fundamentem ich nowej, intratnej rzeczywistości. Pod szyldem organizacji non-profit <strong className="font-black">Stowarzyszenie Natury Zew</strong> Michał Baciński, Stefanek i Drzewińska żyli później z organizacji turnusów wypoczynkowych z cennikiem darowizn zamiast paragonów, okłamując swoich gości i publicznie każdego, kto natrafi na ich sielankowe filmiki. A przecież zadośćuczynienie wszechświatowi miało trafić na hospicjum, a nie na organizację krzak.
          </p>

          <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">Nýdek</h2>

          <p className="mt-4">
            Gdyby sprawa dotyczyła tylko jednego miliardera, można by mówić o przypadku lub pechowym doborze najemców. Jednak nieco dalej od Janova, w miejscowości <strong className="font-black">Nýdek</strong>, funkcjonował kolejny, bliźniaczy ośrodek. <a href={NYDEK_PDF_URL} target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:bg-[#e8d154]/50 transition-colors rounded px-1" title="Kliknij, aby zobaczyć dokumentację">📸</a>
          </p>

          <p className="mt-4">
            Relacje świadków wskazują, że w posiadłości w Nýdku odbywały się regularne ceremonie o charakterze zbliżonym do tych u Kordysów i Badowskiego, prowadzone przez <strong className="font-black">Piotra Bonawenturę Tracza</strong>. Chociaż witryna ośrodka już nie istnieje, archiwum internetu Wayback Machine zachowało zrzuty strony tribunydek.com. <a href={TRIBU_NYDEK_WAYBACK_URL} target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:bg-[#e8d154]/50 transition-colors rounded px-1" title="Kliknij, aby zobaczyć archiwalny dowód">🔍</a> Opisy warsztatów jednoznacznie wskazują, że nieruchomość była wykorzystywana do pracy z psychodelikami.
          </p>

          <p className="not-prose mt-4 font-bold text-center my-8 uppercase font-sans text-black">
            Skoro wiemy już, czym ten dom był, kluczowym pytaniem staje się: do kogo należał?
          </p>

          <p className="mt-4">
            Analiza czeskich ksiąg wieczystych przynosi sensacyjne odkrycie. Właścicielem tej kolejnej szamańskiej świątyni – dokładnie w czasie, gdy strona internetowa zapraszała na ceremonie – był drugi z duetu miliarderów stojących za gamingowym gigantem, <span className="bg-[#e8d154]/80 px-1 font-black text-black box-decoration-clone">Marcin Iwiński</span>. Dokumenty urzędowe bezlitośnie łączą jego nazwisko z infrastrukturą, w której odbywał się nielegalny proceder.
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
            <span className="bg-red-600 px-1 font-black text-white shadow-sm box-decoration-clone">Oznacza to, że nie jeden lecz obaj legendarni założyciele CD Projekt, na czeskim pograniczu posiadali nieruchomości, w których odpłatnie oferowano te same nielegalne substancje.</span>
          </p>

          <p className="mt-4">
            Jeszcze bardziej zastanawiające jest to, co stało się z tą nieruchomością w momencie zagrożenia. Gdy 15.10.2020 roku aresztowano Kordysa, nad środowiskiem zawisło widmo policyjnych nalotów. Dokumenty urzędowe odsłaniają niepokojącą zbieżność dat:
          </p>

          <ul className="not-prose list-none space-y-10 my-12 font-mono text-sm border-l-4 border-black pl-6 relative z-10 text-black">
             <li className="flex items-start gap-4">
              <span className="text-xl">📅</span>
            <div>
              <strong className="font-black text-base block">25 stycznia 2016 r.</strong>
              <span className="block leading-tight">
                Marcin Iwiński zakupuje nieruchomość w Nydku za kwotę 5 000 000,00 CZK<InteractiveSpan type="cena-nydek" title="Kliknij, aby zobaczyć dokument">👁️</InteractiveSpan>.
              </span>
              <span className="block leading-tight">
                Nieruchomość ta służy do organizacji nielegalnych ceremonii z użyciem psychodelików podawanych uczestnikom przez Piotra Tracza.
              </span>
            </div>
             </li>

             <li className="flex items-start gap-4">
              <span className="text-xl">📅</span>
              <div>
                <strong className="font-black text-base">15 października 2020 r.</strong><br/>
                Policyjny szturm na ośrodek Kordysów. W środowisku wybucha panika.
              </div>
             </li>

            <li className="flex items-start gap-4">
              <span className="text-xl">📅</span>
              <div>
                <strong className="font-black text-base">15 czerwca 2021 r.</strong><br/>
                Marcin Iwiński „sprzedaje” nieruchomości w Nýdku.
              </div>
            </li>
          </ul>

          <p className="mt-4">
            Nabywcą luksusowej posiadłości nie został inny inwestor, lecz sam Piotr Tracz – ten sam człowiek, który wcześniej pełnił tam rolę szamana.
          </p>

          <div className="not-prose my-8 flex justify-start">
            <TransactionStampUI
              label="Nr Transakcji (Katastr)"
              value="V-2937/2021-832"
              subDetails="Obręb: Nýdek [708186]"
            />
          </div>

          <p className="mt-4">
            Transakcja ta rodzi wątpliwości: w jaki sposób niszowy szaman sfinansował zakup luksusowej willi od jednego z najbogatszych Polaków? Nowy właściciel niemal natychmiast zmienił formalny profil działalności na legalne warsztaty pracy z ciałem. Zbieżność tej sekwencji wydarzeń z darowizną Kicińskiego w Janovie pozwala dostrzec powtarzalny schemat wycofywania się właścicieli z infrastruktury powiązanej z nielegalnym procederem.
          </p>

          <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">WIKTOR B.</h2>

          <p className="mt-4">
            9. marca 2026 Onet ujawnia opinii publicznej wstrząsające kulisy działalności ośrodka w czeskim Janovie. Dziennikarskie śledztwo koncentruje się na śmierci 54-letniej uczestniczki, <strong className="font-black">Ilony L.-H.</strong> <a href={ONET_INVESTIGATION_URL} target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:bg-[#e8d154]/50 transition-colors rounded px-1" title="Otwórz artykuł na Onet.pl">🌐</a>
          </p>

          <p className="mt-4">
            Według ustaleń Onetu, w czerwcu 2018 roku na farmie w Janovie doszło do tragedii. Podczas nocnej ceremonii z użyciem ayahuaski, kobieta poczuła się fatalnie, zmagając się z silnym bólem i intensywnymi wymiotami. Mimo jej krytycznego stanu, organizator nie wezwał pomocy medycznej. Uczestnikom odebrano wcześniej telefony, co uniemożliwiło im samodzielne zaalarmowanie służb ratunkowych.
          </p>

          <p className="mt-4">
                 Prowadzący obrzęd <strong className="font-black">Wiktor B.</strong>, brat Bartosza Badowskiego, był tej nocy pod wpływem marihuany. Z relacji świadków wynika, że po śmierci kobiety podjął on natychmiastowe działania mające na celu zatuszowanie incydentu. Nakazał uczestnikom bezzwłocznie opuszczenie ośrodka. Czeskiej policji przedstawił fałszywą wersję wydarzeń, twierdząc, że Ilona L.-H. była jedynie gościem i została znaleziona martwa w łazience nad ranem. Służby początkowo nie nabrały podejrzeń, przyjmując tę relację za wiarygodną.
          </p>

          <p className="mt-4">
            Jakiś czas po tragicznej nocy Wiktor B. zwołał spotkanie dla straumatyzowanych uczestników fatalnej ceremonii, w którego prowadzeniu pomagała mu jego koleżanka- <strong className="font-black">Joanna N.</strong>. Przekonano ich wówczas, by dla wspólnego dobra wydarzenia tamtej nocy pozostały tajemnicą.
          </p>

          <p className="mt-4">
            Przez kolejne lata kłamliwą narrację udawało się skutecznie utrzymywać. O śmierci z przyczyn naturalnych przez długi czas przekonana była nawet najbliższa rodzina Ilony.
          </p>

          <p className="mt-4">
            Sytuacja uległa zmianie dopiero 6 maja 2024 roku, gdy Prokuratura Okręgowa w Częstochowie wszczęła oficjalne śledztwo w sprawie działalności ośrodka oraz okoliczności śmierci Ilony L.-H. Zaledwie 2 miesiące później, w tajemniczych okolicznościach umiera Wiktor B.
          </p>

          <p className="mt-4">
            Ciało mężczyzny odnaleziono w magazynie firmy, w której pracował przy montażu szaf serwerowych. Na jego ciele nie stwierdzono widocznych obrażeń wskazujących na użycie siły fizycznej. Mimo że od śmierci Wiktora B. minęło już ponad półtora roku, śledczy wciąż czekają na wyniki badań toksykologicznych, które mają kluczowe znaczenie dla wyjaśnienia, czy w organizmie mężczyzny znajdowały się substancje mogące przyczynić się do jego nagłego odejścia. Z tego względu obecnie śledztwo w sprawie jego tajemniczego zgonu pozostaje zawieszone.<InteractiveSpan type="wiktor" title="Kliknij, aby zobaczyć szczegóły">🔍</InteractiveSpan>
          </p>

          <div className="not-prose mt-12 mb-4 flex justify-end relative z-10">
              <div className="text-right border-r-4 border-black pr-4">
                <span className="block font-black text-black uppercase text-xl font-display tracking-widest leading-none">Wojciech Kurka</span>
                <span className="block text-[10px] text-black/60 font-mono mt-1 uppercase tracking-tighter leading-tight">dziennikarz śledczy, niezależne media</span>
                <span className="block text-[10px] text-black/40 font-mono mt-0.5 italic lowercase tracking-tight">wojciech.kurka@protonmail.com</span>
              </div>
          </div>

          <div className="not-prose mt-16 mb-0 border-y-4 border-black py-8 bg-[#e8d154]/10 relative z-10">
              <h3 className="font-display font-black text-2xl uppercase tracking-widest text-black mb-8 flex items-center gap-2 px-4">
                <span>🛡️</span> Status Prawny (2025/2026)
              </h3>

              <div className="grid gap-4 px-4">
                <div className="border-2 border-black bg-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div>
                      <span className="block font-display text-black font-bold uppercase">Śledztwo w sprawie organizacji ceremonii</span>
                      <span className="block text-xs text-black/60 mt-1 font-mono">Prokuratura Okręgowa w Częstochowie</span>
                    </div>
                    <span className="font-mono text-sm font-black bg-black text-white px-4 py-2 border border-black tracking-widest">
                      3013-1.Ds.15.2024
                    </span>
                </div>

                <div className="border-2 border-black bg-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div>
                      <span className="block font-display text-black font-bold uppercase">Śledztwo w sprawie śmierci Ilony L.</span>
                      <span className="block text-xs text-black/60 mt-1 font-mono">Prokuratura Okręgowa w Częstochowie</span>
                    </div>
                    <span className="font-mono text-sm font-black bg-[#e8d154] text-black border-2 border-black px-4 py-2 tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      3013-1.Ds.4.2026
                    </span>
                </div>

                <div className="border-2 border-black bg-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div>
                      <span className="block font-display text-black font-bold uppercase">Śledztwo w sprawie śmierci Wiktora B.</span>
                      <span className="block text-xs text-black/60 mt-1 font-mono">Prokuratura Rejonowa w Pułtusku</span>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="font-mono text-sm font-black bg-black/5 text-black px-4 py-2 border-2 border-black tracking-widest">
                         4027-0. Ds. 1254.2024
                      </span>
                      <div className="flex items-center gap-2">
                         <span className="text-[10px] font-black text-red-800 uppercase tracking-widest bg-red-100 px-2 py-1 border border-red-800 font-sans">Zawieszone</span>
                      </div>
                    </div>
                </div>
              </div>

              <div className="mt-8 px-4 text-xs text-black/70 font-mono text-center italic">
                Nadzór nad sprawami w Częstochowie objął Zastępca Prokuratora Okręgowego
              </div>
          </div>

        </div>

        <footer className="mt-8 pt-0 font-mono relative z-10 mb-0">

           <div className="mb-10 text-center">
             <h3 className="text-3xl font-black text-black uppercase tracking-tighter font-display mb-4">
               Dokumenty Źródłowe
             </h3>
             <p className="text-sm text-black/80 italic max-w-xl mx-auto font-serif">
               Artykuł powstał na podstawie jawnej dokumentacji urzędowej i sądowej. Poniżej pełna lista sygnatur oraz odnośniki umożliwiające samodzielną weryfikację.
             </p>
           </div>

           <div className="grid gap-6 text-sm text-black">

             <div className="p-4 bg-white/40 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#e8d154]/10 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3 font-sans">
                  <div>
                    <h4 className="font-bold text-black text-base uppercase font-display tracking-widest">Szamańskie ceremonie, tajemnicza śmierć i miliarderzy od "Wiedźmina"</h4>
                    <p className="font-mono text-xs text-black/60 mt-1 font-black">Śledztwo dziennikarskie Onetu</p>
                  </div>
                  <a href={ONET_INVESTIGATION_URL} target="_blank" rel="noopener noreferrer" className="shrink-0 w-full sm:w-48 justify-center bg-[#e8d154] text-black px-4 py-2 text-xs font-black border-2 border-black hover:bg-white transition-colors flex items-center gap-2 uppercase tracking-widest text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    🌐 Czytaj na Onet.pl
                  </a>
                </div>
             </div>

             <div className="p-4 bg-white/40 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#e8d154]/10 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3 font-sans">
                  <div>
                    <h4 className="font-bold text-black text-base uppercase font-display tracking-widest">Wyrok Jarosława Kordysa</h4>
                    <p className="font-mono text-xs text-black/60 mt-1 font-black">Sygn. 30 T 5/2020</p>
                  </div>
                  <a href={KORDYS_PDF_URL} target="_blank" rel="noopener noreferrer" className="shrink-0 w-full sm:w-48 justify-center bg-black text-white px-4 py-2 text-xs font-bold border-2 border-black hover:bg-white hover:text-black transition-colors flex items-center gap-2 uppercase tracking-widest text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    📄 Pobierz PDF
                  </a>
                </div>
                <div className="border-t-2 border-black/20 pt-3">
                  <a href="https://msp.gov.cz/web/krajsky-soud-v-ostrave/zakladni-informace/-/clanek/informace-rok-2022" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-black/70 hover:text-black flex items-center gap-2 uppercase tracking-widest underline decoration-2 underline-offset-4 font-sans">
                    🌐 Weryfikuj na msp.gov.cz
                  </a>
                </div>
             </div>

             <div className="p-4 bg-white/40 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#e8d154]/10 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3 font-sans">
                  <div>
                    <h4 className="font-bold text-black text-base uppercase font-display tracking-widest">Wyrok Bartosza Badowskiego</h4>
                    <p className="font-mono text-xs text-black/60 mt-1 font-black">Sygn. 66 T 146/2021</p>
                  </div>
                  <a href={`${PINATA_GATEWAY}/bafkreietkosain6ftde7f3li5ic34qhkwuglz2tu2kfcpbvrwhslskhwza`} target="_blank" rel="noopener noreferrer" className="shrink-0 w-full sm:w-48 justify-center bg-black text-white px-4 py-2 text-xs font-bold border-2 border-black hover:bg-white hover:text-black transition-colors flex items-center gap-2 uppercase tracking-widest text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    📄 Pobierz PDF
                  </a>
                </div>
                <div className="border-t-2 border-black/20 pt-3">
                  <a href="https://msp.gov.cz/documents/22409/2997339/29Si+25-2022+p%C5%99%C3%ADloha+%C4%8D.+1.pdf" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-black/70 hover:text-black flex items-center gap-2 uppercase tracking-widest underline decoration-2 underline-offset-4 font-sans">
                    🌐 Weryfikuj oryginał (29 Si 25/2022)
                  </a>
                </div>
             </div>

             <div className="p-4 bg-white/40 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#e8d154]/10 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3 font-sans">
                  <div>
                    <h4 className="font-bold text-black text-base uppercase font-display tracking-widest">Transakcja: Zakup (Nýdek) - 2016</h4>
                    <p className="font-mono text-xs text-black/60 mt-1 font-black">Sygnatura: V-320/2016-832</p>
                  </div>
                  <a href={NYDEK_CADASTRAL_URL} target="_blank" rel="noopener noreferrer" className="shrink-0 w-full sm:w-48 justify-center bg-black text-white px-4 py-2 text-xs font-bold border-2 border-black hover:bg-white hover:text-black transition-colors flex items-center gap-2 uppercase tracking-widest text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    🌐 Weryfikuj w Katastrze
                  </a>
                </div>
                <div className="border-t-2 border-black/20 pt-2">
                  <p className="text-[9px] leading-tight text-black/70 font-mono uppercase">
                    Uwaga: Ujawnienie danych osobowych stron transakcji wymaga zalogowania poprzez opcję „Identita občana”, wybierając logowanie przez eIDAS.
                  </p>
                </div>
             </div>

             <div className="p-4 bg-white/40 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#e8d154]/10 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3 font-sans">
                  <div>
                    <h4 className="font-bold text-black text-base uppercase font-display tracking-widest">Transakcja: Sprzedaż (Nýdek) - 2021</h4>
                    <p className="font-mono text-xs text-black/60 mt-1 font-black">Sygnatura: V-2937/2021</p>
                  </div>
                  <a href={NYDEK_PDF_URL} target="_blank" rel="noopener noreferrer" className="shrink-0 w-full sm:w-48 justify-center bg-black text-white px-4 py-2 text-xs font-bold border-2 border-black hover:bg-white hover:text-black transition-colors flex items-center gap-2 uppercase tracking-widest text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    📥 Pobierz PDF
                  </a>
                </div>
                <div className="border-t-2 border-black/20 pt-3 flex flex-col gap-2">
                  <a href={NYDEK_CADASTRAL_URL} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-black/70 hover:text-black flex items-center gap-2 uppercase tracking-widest underline decoration-2 underline-offset-4 font-sans">
                    🌐 Weryfikuj w Katastrze
                  </a>
                  <p className="text-[9px] leading-tight text-black/70 font-mono uppercase">
                    Uwaga: Ujawnienie danych osobowych stron transakcji wymaga zalogowania poprzez opcję „Identita občana”, wybierając logowanie przez eIDAS.
                  </p>
                </div>
             </div>

             <div className="p-4 bg-white/40 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#e8d154]/10 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3 font-sans">
                  <div>
                    <h4 className="font-bold text-black text-base uppercase font-display tracking-widest">Transakcja: Wykup udziałów (Janów)</h4>
                    <p className="font-mono text-xs text-black/60 mt-1 font-black">Sygnatura: V-2031/2023-831</p>
                  </div>
                  <a href={JANOV_BUYOUT_CADASTRAL_URL} target="_blank" rel="noopener noreferrer" className="shrink-0 w-full sm:w-48 justify-center bg-black text-white px-4 py-2 text-xs font-bold border-2 border-black hover:bg-white hover:text-black transition-colors flex items-center gap-2 uppercase tracking-widest text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    🌐 Weryfikuj w Katastrze
                  </a>
                </div>
                <div className="border-t-2 border-black/20 pt-3 flex flex-col gap-2">
                  <p className="text-[9px] leading-tight text-black/70 font-mono uppercase">
                    Uwaga: Ujawnienie danych osobowych stron transakcji wymaga zalogowania poprzez opcję „Identita občana”, wybierając logowanie przez eIDAS.
                  </p>
                </div>
             </div>

             <div className="p-4 bg-white/40 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#e8d154]/10 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3 font-sans">
                  <div>
                    <h4 className="font-bold text-black text-base uppercase font-display tracking-widest">Archiwum: WWW.TRIBUNYDEK.COM</h4>
                    <p className="font-mono text-xs text-black/60 mt-1 font-black">Wayback Machine</p>
                  </div>
                  <a href={TRIBU_NYDEK_WAYBACK_URL} target="_blank" rel="noopener noreferrer" className="shrink-0 w-full sm:w-48 justify-center bg-[#e8d154] text-black px-4 py-2 text-xs font-black border-2 border-black hover:bg-white transition-colors flex items-center gap-2 uppercase tracking-widest text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-sans">
                    🕰️ Otwórz Archiwum
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
