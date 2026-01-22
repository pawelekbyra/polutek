"use client";

import { useState } from "react";
import { GalleryModal } from "@/components/gallery/GalleryModal";
import { SignatureTrigger } from "@/components/gallery/SignatureTrigger";
import { verdictData } from "@/lib/evidence-data";

export default function EvidencePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-black text-white min-h-screen p-8 prose prose-invert">
      <h1 className="text-3xl font-bold mb-4">Evidence Gallery</h1>
      <p className="text-stone-400 mb-8">
        In the course of our investigation, we uncovered a key document. This verdict,{" "}
        <SignatureTrigger onClick={openModal} signature={verdictData.signature as string} />, details the court&apos;s findings. The document states:
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

      <GalleryModal
        isOpen={isModalOpen}
        onClose={closeModal}
        data={verdictData}
      />
    </div>
  );
}
