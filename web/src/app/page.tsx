import Link from "next/link";
import { AgentCard } from "@/components/agent-card";
import { getAgents } from "@/lib/8004scan";

const categories = [
  { label: "Rebalancing", query: "rebalancing", note: "Keep positions in range" },
  { label: "Grid trading", query: "grid trading", note: "Automate disciplined orders" },
  { label: "Yield optimisation", query: "yield", note: "Route capital with evidence" },
  { label: "Health factor", query: "health factor", note: "Watch lending risk" },
];

export default async function Home() {
  const latest = await getAgents({ limit: 12 }).catch(() => ({ success: false, data: [], meta: undefined }));
  const categoryResults = await Promise.all(categories.map((category) => getAgents({ query: category.query, limit: 4 }).catch(() => ({ success: false, data: [], meta: undefined }))));
  const hasData = latest.data.length > 0;

  return (
    <main className="min-h-screen overflow-hidden">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7 lg:px-10">
        <Link href="/" className="flex items-center gap-3 text-sm font-semibold tracking-[0.22em] text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-violet-200/25 bg-violet-200/10 text-xs text-violet-100">N</span>
          NORIA
        </Link>
        <div className="flex items-center gap-5 text-sm text-slate-400">
          <Link href="#categories" className="hidden transition hover:text-white sm:block">Explore</Link>
          <Link href="/discover" className="rounded-full border border-white/15 px-4 py-2 text-slate-200 transition hover:border-violet-200/45 hover:bg-white/5">Find an agent</Link>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-16 lg:px-10 lg:pt-24">
        <div className="max-w-4xl">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.34em] text-violet-200/80">The agent layer for BNB Smart Chain</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.065em] text-white sm:text-7xl lg:text-[6.7rem]">
            Tell Noria what you want to do.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300/75 sm:text-xl">
            Discover live agents, compare what they can actually do, and choose with evidence—not hype.
          </p>
          <form action="/discover" className="mt-10 flex max-w-3xl flex-col gap-3 rounded-[1.4rem] border border-white/15 bg-white/[0.06] p-3 shadow-2xl shadow-violet-950/20 backdrop-blur sm:flex-row">
            <input name="q" placeholder="e.g. Find a low-risk agent to monitor my lending position" className="min-h-14 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-slate-500" />
            <button className="min-h-14 rounded-xl bg-white px-6 text-sm font-semibold text-[#160d20] transition hover:bg-violet-100">Find agents <span className="ml-2">→</span></button>
          </form>
          <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-500">
            <span>Try</span><Link href="/discover?q=yield" className="rounded-full border border-white/10 px-3 py-1.5 transition hover:border-violet-200/35 hover:text-white">yield</Link><Link href="/discover?q=grid" className="rounded-full border border-white/10 px-3 py-1.5 transition hover:border-violet-200/35 hover:text-white">grid trading</Link><Link href="/discover?q=health" className="rounded-full border border-white/10 px-3 py-1.5 transition hover:border-violet-200/35 hover:text-white">health factor</Link>
          </div>
        </div>
      </section>

      <section id="categories" className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <div className="mb-7 flex items-end justify-between gap-6">
          <div><p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Explore the network</p><h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-white">Start with an outcome.</h2></div>
          <Link href="/discover" className="hidden text-sm text-slate-400 transition hover:text-white sm:block">Browse all agents →</Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => {
            const data = categoryResults[index].data;
            return <Link key={category.label} href={`/discover?q=${encodeURIComponent(category.query)}`} className="group rounded-3xl border border-white/10 bg-white/[0.035] p-5 transition hover:-translate-y-1 hover:border-violet-200/35 hover:bg-white/[0.065]"><div className="flex items-center justify-between"><span className="text-3xl text-violet-200/80">0{index + 1}</span><span className="text-xs text-slate-500">{data.length ? `${data.length} found` : "Data loading"}</span></div><h3 className="mt-12 text-lg font-semibold text-white">{category.label}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{category.note}</p></Link>;
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-10">
        <div className="mb-7 flex items-end justify-between gap-6"><div><p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Live from 8004scan</p><h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-white">Recently indexed on BSC.</h2></div><span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-xs text-emerald-200">Source connected</span></div>
        {!hasData ? <div className="rounded-3xl border border-amber-200/20 bg-amber-200/5 p-8 text-sm text-amber-100">The live agent source is temporarily unavailable. Noria is not showing placeholder records.</div> : <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{latest.data.map((agent) => <AgentCard key={agent.id} agent={agent} />)}</div>}
      </section>
      <footer className="border-t border-white/10 px-6 py-8 text-center text-xs text-slate-600">Noria reads live agent identity and activity data. Missing evidence stays missing.</footer>
    </main>
  );
}
