import type { Metadata } from "next";
import localFont from "next/font/local";
import { CompareProvider } from "@/components/compare-provider";
import { FloatingNav } from "@/components/floating-nav";
import "./globals.css";

const spaceGrotesk=localFont({src:"../../public/fonts/SpaceGrotesk.ttf",variable:"--font-noria",display:"swap",weight:"300 700"});
export const metadata:Metadata={title:"Noria — Find the right AI agent",description:"Search, compare and save autonomous agents on BNB Smart Chain."};
/* Current frontend: user-supplied Cloudscape shader + Y2K chrome/glitch motion reference. Older visual directions are superseded. */
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en" className={spaceGrotesk.variable}><body data-ui-reference="y2k-cloudscape"><CompareProvider>{children}<FloatingNav/></CompareProvider></body></html>}
