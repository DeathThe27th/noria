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
  const featured = latest.data[0];

  return (
    <main className="min-h-screen overflow-hidden bg-[#f1eee7] text-[#182642]">
      <section className="relative min-h-[760px] overflow-hidden bg-[#123e82] bg-cover bg-center text-white" style={{ backgroundImage: "url('/noria-atmosphere.svg')" }}>
        <div className="absolute inset-0 bg-[#123e82]/10" />
        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-10">
          <Link href="/" className="font-editorial text-2xl italic tracking-[-0.04em] text-white">noria</Link>
          <div className="flex items-center gap-1 rounded-full border border-white/30 bg-white/15 p-1 text-xs text-white backdrop-blur-sm">
            <Link href="#explore" className="rounded-full px-3 py-2 transition hover:bg-white/15">Explore</Link>
            <Link href="/discover" className="rounded-full bg-white px-4 py-2 font-semibold text-[#172d55] transition hover:bg-[#f3eaf4]">Browse agents</Link>
          </div>
        </nav>

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-5 pb-44 pt-28 text-center sm:px-8 sm:pt-32">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/70">The agent layer for BNB Smart Chain</p>
          <h1 className="mt-6 max-w-4xl font-editorial text-6xl leading-[0.92] tracking-[-0.035em] sm:text-8xl lg:text-[8.5rem]">Find the intelligence behind your next move.</h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-white/78 sm:text-lg">Describe the outcome. Noria will help you find the agents, evidence, and permission scope behind it.</p>
          <div className="mt-10 w-full max-w-3xl"><Concierge /></div>
        </div>

        <div className="absolute bottom-7 left-1/2 z-10 w-[calc(100%-2.5rem)] max-w-6xl -translate-x-1/2 sm:w-[calc(100%-4rem)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-wrap gap-2 text-xs text-white/80">
              {outcomes.map((outcome) => <Link key={outcome.label} href={`/discover?q=${encodeURIComponent(outcome.query)}`} className="rounded-full border border-white/25 bg-white/10 px-3 py-2 backdrop-blur-sm transition hover:bg-white/20">{outcome.label}</Link>)}
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">Indexed source · chain 56</span>
          </div>
        </div>
      </section>

      <section id="explore" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
          <div>
            <h2 className="font-editorial text-5xl leading-[.95] tracking-[-0.025em] text-[#182642] sm:text-6xl">A better way to choose an agent.</h2>
            <p className="mt-6 max-w-sm text-sm leading-7 text-[#716b76]">Noria makes the agent economy legible: who it is, what it publishes, what it can connect to, and what remains unknown.</p>
            {totalRecords && <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.16em] text-[#5d315f]">{new Intl.NumberFormat("en", { notation: "compact" }).format(totalRecords)} indexed BSC records</p>}
          </div>
          {featured ? <div className="border border-[#c9d5e3] bg-[#163f80] p-6 text-white shadow-[0_26px_70px_rgba(24,48,92,.18)] sm:p-8"><div className="flex items-center justify-between border-b border-white/20 pb-5"><span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/65">Featured record · {featured.token_id}</span><span className="text-xs text-white/70">{featured.is_verified ? "Verified identity" : "Indexed identity"}</span></div><h3 className="mt-8 max-w-xl font-editorial text-5xl leading-[.95] tracking-[-0.025em] sm:text-6xl">{featured.name}</h3><p className="mt-5 max-w-xl text-sm leading-7 text-white/75">{featured.description || "No description published."}</p><div className="mt-8 flex flex-wrap items-center gap-3"><Link href={`/agents/${featured.chain_id}/${featured.token_id}`} className="bg-white px-4 py-2 text-sm font-semibold text-[#16345f] transition hover:bg-[#f3eaf4]">Inspect Passport →</Link><span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/60">Source evidence available</span></div></div> : <div className="border border-[#d7bd8c] bg-[#fff6df] p-8 text-sm text-[#765b24]">The live source is unavailable. Noria is not inventing a featured record.</div>}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:px-10">
        <div className="flex items-end justify-between gap-6 border-b border-[#bdb1b9] pb-5"><h2 className="font-editorial text-5xl tracking-[-0.025em] text-[#182642]">Explore by outcome</h2><Link href="/discover" className="text-sm text-[#71676f] transition hover:text-[#182642]">All records →</Link></div>
        <div className="divide-y divide-[#d8d0c8]">{outcomes.map((outcome, index) => { const result = outcomeResults[index]; const count = result.data.length; return <Link key={outcome.label} href={`/discover?q=${encodeURIComponent(outcome.query)}`} className="group grid gap-3 py-6 transition hover:pl-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_auto] sm:items-center"><h3 className="text-lg font-semibold text-[#182642]">{outcome.label}</h3><p className="text-sm leading-6 text-[#71676f]">{outcome.note}</p><span className="text-sm text-[#5d315f]">{!result.success ? "Source unavailable" : count ? "View source matches" : "No indexed match"} <span className="ml-2 transition group-hover:translate-x-1">→</span></span></Link>; })}</div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-28 sm:px-8 lg:px-10"><div className="mb-7 flex items-end justify-between gap-6"><div><h2 className="font-editorial text-5xl tracking-[-0.025em] text-[#182642]">Recently indexed</h2><p className="mt-3 text-sm leading-6 text-[#71676f]">The current records returned by 8004scan for BSC chain ID 56.</p></div><span className={latest.success ? "border border-[#b9cec4] bg-[#edf5f0] px-3 py-1.5 text-xs font-semibold text-[#335f4d]" : "border border-[#d7bd8c] bg-[#fff6df] px-3 py-1.5 text-xs font-semibold text-[#765b24]"}>{latest.success ? "Source connected" : "Source unavailable"}</span></div>{!latest.success ? <div className="border border-[#d7bd8c] bg-[#fff6df] p-8 text-sm text-[#765b24]">The live source is unavailable. Noria is not substituting placeholder records.</div> : !latest.data.length ? <div className="border border-[#d8d0c8] bg-[#faf8f3] p-8 text-sm text-[#71676f]">The source responded successfully but returned no BSC records.</div> : <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{latest.data.map((agent) => <AgentCard key={agent.id} agent={agent} />)}</div>}</section>

      <footer className="border-t border-[#d8d0c8] px-5 py-8 text-center text-xs text-[#817780]">Noria reads indexed agent identity and source evidence. Missing evidence stays missing.</footer>
    </main>
  );
}
