import { Metadata } from 'next'
import KursUI from './KursUI'

export const metadata: Metadata = {
  title: "Kurs Architekt Cyfrowy | Vibe Coding & Budowa SaaS z AI",
  description: "Opanuj Metodę Zero Terminala. Zbuduj własną aplikację w weekend używając Cursor AI, Bolt i Supabase. Bez nauki składni.",
  keywords: ["vibe coding", "kurs cursor ai", "jak zrobić aplikację ai", "programowanie dla nietechnicznych", "bolt.new tutorial", "supabase dla początkujących"],
}

export default function KursPage() {
  return <KursUI />
}
