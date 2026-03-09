import React from 'react';
import { LocationTrigger, ImageTrigger, AudioTrigger, PDFTrigger } from './GalleryTriggers';

const InvestigativeArticle = () => {
  return (
    <article className="max-w-none prose prose-lg prose-slate prose-headings:font-serif prose-p:leading-relaxed">
      <h1 className="font-serif text-4xl md:text-5xl mb-8 text-[#1a1a1a]">
        Dom na granicy światów
      </h1>

      <div className="mb-12 not-prose">
        <ImageTrigger 
          src="/gallery/janov/janov1.jpg" 
          caption="Widok na posiadłość w Janovie, marzec 2024"
          className="rounded shadow-lg"
        />
      </div>

      <p>
        Wszystko zaczyna się tutaj, w miejscu, gdzie nawigacja GPS często gubi sygnał, a granica między Polską a Czechami staje się jedynie umowną linią na mapie. Janov u Krnova to miejscowość, która na pierwszy rzut oka nie wyróżnia się niczym szczególnym. Jednak to właśnie tutaj, pod adresem 
        <LocationTrigger 
          location="Janov" 
          details="Janov 252793 84 Janov, Czechy"
        />, 
        rozpoczyna się historia, która wstrząsnęła lokalną społecznością.
      </p>

      <div className="my-10 p-6 bg-white/50 border-l-4 border-[#1a1a1a] italic">
        "To nie był zwykły dom. To była twierdza, do której nikt nie miał wstępu bez wyraźnego zaproszenia."
      </div>

      <p>
        Dokumenty, do których udało nam się dotrzeć, rzucają nowe światło na sposób nabycia tej nieruchomości. Choć oficjalne zapisy w czeskim katastrze wskazują na standardową transakcję, zeznania świadków sugerują coś zgoła innego.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8 not-prose">
        <PDFTrigger 
          title="Wyrok Badi" 
          thumbnail="/gallery/wyrok_badi/wyrok_page-0001.jpg"
          folder="wyrok_badi"
          pageCount={3}
        />
        <PDFTrigger 
          title="Wyrok Kordysa" 
          thumbnail="/gallery/wyrok_kordysa/30T_5_2021-1_page-0001.jpg"
          folder="wyrok_kordysa"
          pageCount={25}
        />
      </div>

      <p>
        Kolejnym punktem na mapie naszych poszukiwań był Nýdek. Miejscowość położona głęboko w Beskidach, znana głównie z tras turystycznych i spokoju, stała się tłem dla kolejnych niejasnych powiązań. Pod adresem 
        <LocationTrigger 
          location="Nýdek" 
          details="Nýdek 120739 95 Nýdek, Czechy"
        /> 
        odnaleźliśmy ślady działalności, która nigdy nie została oficjalnie zarejestrowana.
      </p>

      <div className="my-12 flex flex-col items-center not-prose">
        <AudioTrigger 
          src="/evidence/stefan-nagranie.mp3"
          title="Nagranie ze Stefanem"
          duration="2:45"
        />
      </div>

      <p>
        Analiza zgromadzonych materiałów pozwala wysnuć wniosek, że oba te miejsca — choć oddalone od siebie o kilkadziesiąt kilometrów — stanowiły elementy tej samej, misternie skonstruowanej układanki. Pytanie, które wciąż pozostaje bez odpowiedzi, brzmi: kto tak naprawdę pociągał za sznurki?
      </p>

      <div className="mt-16 pt-8 border-t border-slate-200">
        <h3 className="text-sm uppercase tracking-widest text-slate-500 mb-4 font-sans">Dokumentacja fotograficzna</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 not-prose">
          {[2, 3, 4, 5, 6, 8, 9, 11].map((num) => (
            <ImageTrigger 
              key={num}
              src={`/gallery/janov/janov${num}.jpg`}
              className="aspect-square object-cover hover:opacity-90 transition-opacity"
            />
          ))}
        </div>
      </div>
    </article>
  );
};

export default InvestigativeArticle;
