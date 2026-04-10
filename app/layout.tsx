import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Remi’s notes for Sara, Garritt & Uncle P P",
  description:
    "Remi’s cheat sheet: food, pills, water, and bark-related disclaimers while Tyler & fam meet August.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#faf6f0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${fredoka.variable} min-h-dvh antialiased`}
    >
      <body
        className="min-h-dvh text-[17px] leading-7 text-foreground sm:text-base sm:leading-relaxed"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
