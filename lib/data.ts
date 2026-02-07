export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  passwordHash: string[];
}

export const ARTICLES: Article[] = [
  {
    id: 'eliksir',
    slug: 'eliksir-wiedzmina',
    title: "Eliksir Wiedźmina. Mroczna tajemnica twórców CD Projekt",
    excerpt: "Ayahuasca, policyjne naloty i tragedia, o której nikt się miał nie dowiedzieć. W cieniu głośnego procesu dziennikarskie śledztwo ujawnia, jak twórcy gry 'Wiedźmin' finansowali szamańskie podziemie.",
    image: "https://images.unsplash.com/photo-1550565118-3a14e8d0386f?auto=format&fit=crop&q=80&w=1200",
    category: "ŚLEDZTWO",
    passwordHash: [
      "9deaf4d5fd89493ca75f0127f91339bdc3ce163e56d2175c3b650e3772b6195f", // ichtroje
      "13084b77a3ac3ef96c4ac30ef27faecd489b93bf7e78f65e76e5f11d47ad1aa6"  // szaman
    ]
  },
  {
    id: 'stypulkowska',
    slug: 'prokurator-ponad-prawem',
    title: "PROKURATOR PONAD PRAWEM. Jak szefowa jednostki fabrykowała proces",
    excerpt: "Antydatowane pisma, ukrywane dowody niewinności i forsowanie więzienia dla człowieka, którego sądy uznały za niepoczytalnego. Ujawniamy kulisy sprawy, która właśnie runęła w Sądzie Okręgowym w Świdnicy.",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800",
    category: "WYMIAR SPRAWIEDLIWOŚCI",
    passwordHash: [
      "cac066159206bfbffe461c4752fd70ed85bfea7a208e54e982f23ea7eadf77ea" // stypulkowska
    ]
  },
  {
    id: 'chmurka',
    slug: 'ograbiony-ze-spadku',
    title: "OGRABIONY ZE SPADKU I SKAZANY ZA UPOMINANIE SIĘ O PRAWDĘ",
    excerpt: "Zginęły dokumenty i testament. Kiedy Paweł Perfect zgłosił kradzież, prokuratura umorzyła sprawę. Kiedy zaczął domagać się zwrotu, system zrobił z niego stalkera. Dziś składa wniosek o wznowienie śledztwa.",
    image: "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?auto=format&fit=crop&q=80&w=800",
    category: "INTERWENCJA",
    passwordHash: [
      "62b63f65872a19ac0f3d9d1b4b2319d658de8ca1e3c7a97ef908982d2b50c0fd" // chmurka
    ]
  }
];
