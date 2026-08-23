import Link from "next/link";
import { AgentCard } from "@/components/agent-card";
import { Concierge } from "@/components/concierge";
import { getAgents } from "@/lib/8004scan";

const outcomes = [
  { label: "Rebalancing", query: "rebalancing", note: "Keep liquidity positions inside their intended ranges." },
  { label: "Grid trading", query: "grid trading", note: "Discover agents that publish automated order strategies." },
  { label: "Yield optimisation", query: "yield", note: "Find agents that declare yield discovery or routing capabilities." },
  { label: "Health factor", query: "health factor", note: "Monitor lending risk and published protection capabilities." },
];

export default async function Home() {
  const [latest, ...outcomeResults] = await Promise.all([
    getAgents({ limit: 6 }).catch(() => ({ success: false, data: [], meta: undefined })),
    ...outcomes.map((outcome) => getAgents({ query: outcome.query, limit: 4 }).catch(() => ({ success: false, data: [], meta: undefined }))),
  ]);
  const totalRecords = latest.meta?.pagination?.total;

  return (
    <main className="min-h-screen overflow-hidden text-[#251926]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between border-b border-[#d8d0c8] px-6 py-6 lg:px-10">
        <Link href="/" className="flex items-center gap-3 text-sm font-bold tracking-[0.16em] text-[#251926]">
          <span className="flex h-8 w-8 items-center justify-center bg-[#5d315f] text-xs text-white">N</span>
          NORIA
        </Link>
        <div className="flex items-center gap-5 text-sm text-[#71676f]">
          <Link href="#outcomes" className="hidden transition hover:text-[#251926] sm:block">Explore</Link>
          <Link href="/discover" className="border border-[#a99da6] bg-[#faf8f3] px-4 py-2 font-semibold text-[#251926] transition hover:border-[#5d315f]">Browse agents</Link>
        </div>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(21rem,.85fr)] lg:px-10 lg:pt-20">
        <div>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-[#251926] sm:text-7xl lg:text-8xl">Find the agent that fits the mandate.</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#71676f] sm:text-xl">BNB Smart Chain agent records, presented with the provenance, interfaces, and missing evidence you need to make a decision.</p>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#d8d0c8] pt-5 text-xs text-[#71676f]">
            {totalRecords ? <span><strong className="text-[#251926]">{new Intl.NumberFormat("en", { notation: "compact" }).format(totalRecords)}</strong> BSC records indexed by source</span> : null}
            <span><strong className="text-[#251926]">4</strong> required outcome categories</span>
            <span><strong className="text-[#251926]">0</strong> invented profiles</span>
          </div>
        </div>
        <div className="self-end"><Concierge /></div>
      </section>

      <section id="outcomes" className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <div className="flex items-end justify-between gap-6 border-b border-[#bdb1b9] pb-5">
          <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[#251926]">Explore by outcome</h2>
          <Link href="/discover" className="hidden text-sm text-[#71676f] transition hover:text-[#251926] sm:block">All BSC agents →</Link>
        </div>
        <div className="divide-y divide-[#d8d0c8]">
          {outcomes.map((outcome, index) => {
            const result = outcomeResults[index];
            const count = result.data.length;
            return (
              <Link key={outcome.label} href={`/discover?q=${encodeURIComponent(outcome.query)}`} className="group grid gap-3 py-6 transition hover:pl-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_auto] sm:items-center">
                <h3 className="text-lg font-semibold text-[#251926]">{outcome.label}</h3>
                <p className="text-sm leading-6 text-[#71676f]">{outcome.note}</p>
                <span className="text-sm text-[#5d315f]">{result.success ? (count ? "View source matches" : "No indexed match") : "Source unavailable"} <span className="ml-2 transition group-hover:translate-x-1">→</span></span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-10">
        <div className="mb-7 flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[#251926]">Recently indexed on BSC</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#71676f]">The current BSC records returned by 8004scan for chain ID 56. Noria does not infer activity from index presence.</p>
          </div>
          <span className={latest.success ? "border border-[#b9cec4] bg-[#edf5f0] px-3 py-1.5 text-xs font-semibold text-[#335f4d]" : "border border-[#d7bd8c] bg-[#fff6df] px-3 py-1.5 text-xs font-semibold text-[#765b24]"}>{latest.success ? "Source connected" : "Source unavailable"}</span>
        </div>
        {!latest.success ? (
          <div className="border border-[#d7bd8c] bg-[#fff6df] p-8 text-sm text-[#765b24]">The live agent source is unavailable. Noria is not substituting placeholder records.</div>
        ) : !latest.data.length ? (
          <div className="border border-[#d8d0c8] bg-[#faf8f3] p-8 text-sm text-[#71676f]">The source responded successfully but returned no BSC records.</div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{latest.data.map((agent) => <AgentCard key={agent.id} agent={agent} />)}</div>
        )}
      </section>

      <footer className="border-t border-[#d8d0c8] px-6 py-8 text-center text-xs text-[#817780]">Noria reads indexed agent identity and source evidence. Missing evidence stays missing.</footer>
    </main>
  );
}
