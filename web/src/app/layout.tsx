import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const manrope = localFont({
  src: "../../public/fonts/Manrope.ttf",
  variable: "--font-noria",
  display: "swap",
  weight: "200 800",
});

const dmSerif = localFont({
  src: [
    { path: "../../public/fonts/dmserif-regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/dmserif-italic.ttf", weight: "400", style: "italic" },
  ],
  variable: "--font-noria-editorial",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Noria — Discover autonomous agents",
  description: "Find, compare, and understand autonomous agents on BNB Smart Chain.",
};

/*
THESIS: Atmospheric financial intelligence for autonomous-agent discovery; refuse the generic crypto dashboard.
OWN-WORLD: Cobalt sky, pale cloud, editorial serif wordmark, floating capsule navigation, ivory utility panels, and precise Manrope metadata.
STORY: State the outcome, scan the horizon of indexed agents, inspect provenance, and choose the next move with evidence.
FIRST VIEWPORT: Full-bleed atmospheric field; capsule nav above centered noria wordmark, mandate search, and a real featured record below.
FORM: Operate direction, Anything × Airside fusion, seed e81ba8fb.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
*/
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${dmSerif.variable}`}>
      <body data-impeccable-direction="e81ba8fb">{children}</body>
    </html>
  );
}
