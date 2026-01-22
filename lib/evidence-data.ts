export interface GalleryData {
  title: string;
  images: string[];
  signature?: string;
  pdfUrl?: string;
}

export const verdictData: GalleryData = {
  title: "Sąd Rejonowy w Koziej Wólce",
  signature: "Sygn. akt II K 123/23",
  pdfUrl: "/wyrok.pdf",
  images: [
    "/wyrok_page-0001.jpg",
    "/wyrok_page-0002.jpg",
    "/wyrok_page-0003.jpg",
  ],
};

export const nydekGalleryData: GalleryData = {
  title: "Posiadłość w Nydku",
  images: [
    "/Nydek1.jpg",
    "/Nydek2.jpg",
  ],
};
