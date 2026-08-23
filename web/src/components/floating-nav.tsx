import Link from "next/link";

export function FloatingNav() {
  return (
    <nav className="fixed bottom-5 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-[720px] -translate-x-1/2 items-center justify-between gap-2 rounded-full border border-white/15 bg-[#07111f]/90 p-2 text-[11px] text-white shadow-[0_20px_60px_rgba(0,0,0,.28)] backdrop-blur-md sm:w-auto sm:gap-1">
      <Link href="/" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white font-editorial text-lg italic text-[#123e82] transition hover:bg-[#f2e8f4]">n</Link>
      <div className="flex min-w-0 flex-1 items-center justify-around gap-1 sm:flex-none sm:gap-4">
        <Link href="#landscape" className="rounded-full px-2.5 py-2 text-white/75 transition hover:bg-white/10 hover:text-white">Explore</Link>
        <Link href="#evidence" className="hidden rounded-full px-2.5 py-2 text-white/75 transition hover:bg-white/10 hover:text-white sm:block">Evidence</Link>
        <Link href="/discover" className="rounded-full px-2.5 py-2 text-white/75 transition hover:bg-white/10 hover:text-white">Agents</Link>
        <Link href="#about" className="hidden rounded-full px-2.5 py-2 text-white/75 transition hover:bg-white/10 hover:text-white sm:block">How it works</Link>
      </div>
      <Link href="/discover" className="hidden rounded-full bg-white px-4 py-2 font-semibold text-[#102e61] transition hover:bg-[#f2e8f4] sm:block">Enter Noria</Link>
    </nav>
  );
}
