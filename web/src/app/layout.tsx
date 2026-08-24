import type { Metadata } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { CompareProvider } from "@/components/compare-provider";
import { FloatingNav } from "@/components/floating-nav";
import "./globals.css";

const instrument=localFont({src:[{path:"../../public/fonts/InstrumentSerif-Regular.ttf",style:"normal",weight:"400"},{path:"../../public/fonts/InstrumentSerif-Italic.ttf",style:"italic",weight:"400"}],variable:"--font-instrument",display:"swap"});
export const metadata:Metadata={title:"Noria — Find BSC agents",description:"Find BSC agents, compare evidence and create clearly bounded task drafts."};
const direction=`THESIS: Minimal editorial agent discovery, not a crypto dashboard. OWN-WORLD: white field, flipped blue-violet pixel video, Geist utility type, Instrument Serif italic emphasis, tactile dark controls. STORY: describe the job, inspect relevant agents, create a bounded task. FIRST VIEWPORT: 290px top spacing, centered 1200px composition, 80px heading, search capsule and source proof. FORM: user-pinned minimal video hero, seed a1b8bd4d. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.`;
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en" className={`${GeistSans.variable} ${instrument.variable}`}><body data-ui-reference="minimal-video-hero"><div hidden aria-hidden dangerouslySetInnerHTML={{__html:`<!-- ${direction} -->`}}/><CompareProvider>{children}<FloatingNav/></CompareProvider></body></html>}
