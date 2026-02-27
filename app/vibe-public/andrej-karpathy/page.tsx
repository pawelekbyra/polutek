import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Andrej Karpathy: Wizjoner Vibe Codingu | Polutek.pl",
  description: "Dlaczego jeden z twórców OpenAI twierdzi, że nie będziemy już pisać kodu? Poznaj wizję przyszłości programowania według Andreja Karpathy'ego.",
  keywords: "andrej karpathy, openai, tesla ai, vibe coding karpathy, przyszłość programowania",
};

export default function KarpathyPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
        <div className="w-48 h-48 bg-slate-200 rounded-full overflow-hidden shrink-0 border-4 border-blue-600/20 relative">
          <Image
            src="https://i.pravatar.cc/300?u=karpathy"
            alt="Andrej Karpathy"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">Andrej Karpathy i Wizja Vibe Codingu</h1>
          <p className="text-xl text-slate-600">
            Współzałożyciel OpenAI, były dyrektor AI w Tesli. Człowiek, który zdefiniował nową epokę programowania.
          </p>
        </div>
      </div>

      <div className="prose prose-slate prose-lg max-w-none">
        <h2 className="text-3xl font-bold mb-6">Manifest Vibe Codingu</h2>
        <p>
          Andrej Karpathy w lutym 2025 roku opublikował serię wpisów, które wstrząsnęły światem IT. Opisał w nich swoją przygodę z budowaniem projektów, w których praktycznie nie dotykał kodu.
        </p>

        <blockquote className="border-l-4 border-blue-600 pl-6 italic my-10 text-2xl text-slate-700">
          &quot;Najpopularniejszym językiem programowania jest teraz angielski.&quot;
        </blockquote>

        <p>
          Karpathy zauważył, że on sam przestał pisać kod. Jego workflow zmienił się z &quot;myślenia o pętlach&quot; na &quot;myślenia o efektach&quot;. Twierdzi on, że programiści przyszłości będą bardziej przypominać dyrygentów orkiestry niż rzemieślników dłubiących w drewnie.
        </p>

        <h2 className="text-3xl font-bold mt-16 mb-6">Dlaczego to ma znaczenie dla Twojej kariery?</h2>
        <p>
          Zmiana paradygmatu na Vibe Coding obniża barierę wejścia do tworzenia technologii niemal do zera. Kreatywność staje się ważniejsza niż umiejętność zapamiętania składni języka C++ czy Java. Karpathy promuje podejście, w którym inżynier skupia się na:
        </p>

        <ul className="list-disc pl-6 space-y-4 my-8">
          <li><strong>Projektowaniu systemów:</strong> Jak komponenty rozmawiają ze sobą.</li>
          <li><strong>Weryfikacji wyników:</strong> Czy to co wygenerowało AI jest bezpieczne i poprawne.</li>
          <li><strong>Iteracji:</strong> Jak prowadzić dialog z modelem, by dopracować detale.</li>
        </ul>

        <div className="bg-blue-600 text-white p-8 rounded-2xl my-10 shadow-lg">
          <h3 className="text-white font-bold mb-2 text-2xl">Złota rada od Karpathy&apos;ego</h3>
          <p className="text-blue-50 opacity-90">
            Nie walcz z falą AI. Naucz się na niej surfować. Programista, który potrafi używać agentów AI, to super-człowiek w dzisiejszym świecie biznesu.
          </p>
        </div>
      </div>
    </section>
  );
}
