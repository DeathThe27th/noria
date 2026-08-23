import type { Metadata } from "next";
import localFont from "next/font/local";
import { CompareProvider } from "@/components/compare-provider";
import { FloatingNav } from "@/components/floating-nav";
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
THESIS: A clear, useful index for BSC agents, presented as a cinematic digital product rather than a crypto dashboard.
OWN-WORLD: White canvas, cobalt WebGL field, black floating pill navigation, four-point star mark, rounded surfaces, bright color chapters and editorial display type.
STORY: Search the directory, open an agent, compare what it has published and save a job for later.
FIRST VIEWPORT: A contained cobalt panel inside a sky environment, with a large statement, simple directory action and WebGL dot field. AI search opens from a button.
FORM: Latest user-supplied 45-second video is the sole visual reference. Older Noria and MonSkills directions are superseded.
FINISH: one bounded local gate, desktop/mobile capture and real route verification before shipping.
*/
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${dmSerif.variable}`}>
      <body data-impeccable-direction="video-reference-2026"><CompareProvider>{children}<FloatingNav /></CompareProvider></body>
    </html>
  );
}
