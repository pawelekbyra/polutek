import "./globals.css";

export const metadata = {
  title: "Dwa światy Wiedźmina: Mroczna tajemnica ayahuaski i milionerów z CD Projekt",
  description: "W cieniu głośnego procesu „szamanów”, śledztwo ujawnia sieć powiązań prowadzącą do twórców gry „Wiedźmin”.",
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
