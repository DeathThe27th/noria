import Link from "next/link";
import { notFound } from "next/navigation";
import { MissionBuilder } from "@/components/mission-builder";
import { getAgent } from "@/lib/8004scan";

export default async function NewMission({ searchParams }: { searchParams: Promise<{ agent?: string }> }) {
  const { agent: tokenId } = await searchParams;
  if (!tokenId || !/^\d+$/.test(tokenId)) notFound();
  const result = await getAgent(56, tokenId).catch(() => null);
  if (!result?.data) notFound();
  return <main className="min-h-screen bg-[#f1eee7] px-5 py-8 text-[#182642] sm:px-8 lg:px-10"><div className="mx-auto max-w-4xl"><div className="flex items-center justify-between"><Link href="/discover" className="text-sm text-[#71676f] hover:text-[#182642]">← Back to discovery</Link><Link href="/missions" className="text-sm text-[#71676f] hover:text-[#182642]">Mission workspace →</Link></div><div className="mt-16"><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6d6070]">Noria mission workspace</p><h1 className="mt-4 font-editorial text-6xl leading-[.9] tracking-[-0.04em] sm:text-8xl">Make the mandate explicit.</h1><p className="mt-5 max-w-2xl text-sm leading-7 text-[#71676f]">Draft the outcome, permission boundary, expiry, and spend limit before any wallet approval is considered.</p></div><div className="mt-12"><MissionBuilder agent={result.data} /></div></div></main>;
}
