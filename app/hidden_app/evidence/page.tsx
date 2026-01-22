"use client";

import { useState } from "react";
import { VerdictModal } from "@/components/verdict/VerdictModal";
import { VerdictTrigger } from "@/components/verdict/VerdictTrigger";

const verdictData = {
  title: "Sąd Rejonowy w Koziej Wólce",
  signature: "Sygn. akt II K 123/23",
  pdfUrl: "/evidence/wyrok-badi.pdf",
  images: [
    "/evidence/wyrok-badi-1.jpg",
    "/evidence/wyrok-badi-2.jpg",
    "/evidence/wyrok-badi-3.jpg",
  ],
};

export default function EvidencePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-black text-white min-h-screen p-8 prose prose-invert">
      <h1 className="text-3xl font-bold mb-4">Evidence Gallery</h1>
      <p className="text-stone-400 mb-8">
        In the course of our investigation, we uncovered a key document. This verdict,{" "}
        <VerdictTrigger onClick={openModal} signature={verdictData.signature} />, details the court&apos;s findings. The document states:
      </p>
      <blockquote className="border-l-4 border-yellow-500 pl-4 my-4 italic text-stone-300">
          <p>
            &bdquo;(...) budynek rodzinny w miejscowości Janov (...), który jest częściowo
            użytkowany do stałego zamieszkania, a częściowo jako komercyjny
            obiekt noclegowy&rdquo;
          </p>
          <br />
          <p>
            &quot;Świadek [Bartosz B.] potwierdził, że w Janowie jest właścicielem
            jednej dziesiątej nieruchomości&quot;
          </p>
        </blockquote>

      <VerdictModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={verdictData.title}
        signature={verdictData.signature}
        pdfUrl={verdictData.pdfUrl}
        images={verdictData.images}
      />
    </div>
  );
}
