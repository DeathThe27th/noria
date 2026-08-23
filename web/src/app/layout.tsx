import type { Metadata } from "next";
import localFont from "next/font/local";
import { CompareProvider } from "@/components/compare-provider";
import { FloatingNav } from "@/components/floating-nav";
import "./globals.css";

const spaceGrotesk=localFont({src:"../../public/fonts/SpaceGrotesk.ttf",variable:"--font-noria",display:"swap",weight:"300 700"});
export const metadata:Metadata={title:"Noria — Find the right AI agent",description:"Search, compare and save autonomous agents on BNB Smart Chain."};
/* Latest reference: https://nad-pay.vercel.app. Its structure, palette, typography and responsive behavior supersede every older frontend direction. */
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en" className={spaceGrotesk.variable}><body data-ui-reference="nad-pay"><CompareProvider>{children}<FloatingNav/></CompareProvider></body></html>}
