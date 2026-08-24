"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NoriaMark } from "@/components/noria-mark";

const links=[{href:"/discover",label:"Agents"},{href:"/compare",label:"Compare"},{href:"/missions",label:"Tasks"}];
export function FloatingNav(){const pathname=usePathname();return <nav aria-label="Primary" className="fixed left-1/2 top-5 z-50 flex w-[calc(100%-2rem)] max-w-[560px] -translate-x-1/2 items-center rounded-full border border-white/25 bg-black/70 p-2 text-xs text-white shadow-[inset_0_1px_0_rgba(255,255,255,.24),inset_0_-1px_0_rgba(255,255,255,.06),0_18px_55px_rgba(0,0,0,.2)] backdrop-blur-2xl"><Link href="/" aria-label="Noria home" aria-current={pathname==="/"?"page":undefined} className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 transition hover:bg-white hover:text-black"><NoriaMark className="size-4"/></Link><div className="ml-auto flex items-center gap-1">{links.map(link=>{const active=pathname===link.href||pathname.startsWith(`${link.href}/`);return <Link key={link.href} href={link.href} aria-current={active?"page":undefined} className={`rounded-full px-4 py-3 transition ${active?"bg-white text-black":"text-white/65 hover:bg-white/10 hover:text-white"}`}>{link.label}</Link>})}</div></nav>}
