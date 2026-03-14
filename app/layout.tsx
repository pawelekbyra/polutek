import "./globals.css";
import "plyr/dist/plyr.css";
import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className="antialiased text-black">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
