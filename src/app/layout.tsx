import type { Metadata, Viewport } from "next";
import { Archivo, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  variable: "--font-archivo",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin", "latin-ext"],
  variable: "--font-source-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "fischeat — studijní materiály",
    template: "%s · fischeat",
  },
  description:
    "Studijní materiály z VŠE FIS pro předměty oboru Aplikovaná informatika. Výpisky, vzorce, grafy a procvičování na jednom místě.",
};

export const viewport: Viewport = {
  themeColor: "#fcfcfa",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="cs" className={`${archivo.variable} ${sourceSerif.variable}`}>
      <body>
        <a
          href="#obsah"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-4 focus:py-2 focus:text-sm focus:ring-2 focus:ring-accent"
        >
          Přeskočit na obsah
        </a>
        <SiteHeader />
        <main id="obsah">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
