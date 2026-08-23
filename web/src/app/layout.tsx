import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const manrope = localFont({
  src: "../../public/fonts/Manrope.ttf",
  variable: "--font-noria",
  display: "swap",
  weight: "200 800",
});

export const metadata: Metadata = {
  title: "Noria — Discover autonomous agents",
  description: "Find, compare, and understand autonomous agents on BNB Smart Chain.",
};

/*
THESIS: Agent discovery as an auction-house condition report; refuse the generic neon crypto dashboard.
OWN-WORLD: Warm catalog paper, plum ink, ruled evidence tables, provenance stamps, and sparse solid controls.
STORY: State the outcome, inspect live lots, compare published evidence, then activate with clear permission scope.
FIRST VIEWPORT: Left-aligned proposition and evidence promise above one dominant intent instrument; browse remains secondary.
FORM: Operate direction, assigned grounded candidate 4, seed e81ba8fb.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
*/
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body data-impeccable-direction="e81ba8fb">{children}</body>
    </html>
  );
}
