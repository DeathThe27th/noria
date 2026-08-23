import Link from "next/link";
import { AgentCard } from "@/components/agent-card";
import { getAgents } from "@/lib/8004scan";
import { explainMatch, rankAgents } from "@/lib/ranking";

export default async function Discover({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const params = await searchParams;
  const query = (params.q?.trim() ?? "").slice(0, 200);
  const result = await getAgents({ query: query || undefined, limit: 40 }).catch(() => ({ success: false, data: [], meta: undefined }));
  const ranked = query ? rankAgents(result.data, { rawQuery: query }) : result.data.map((agent) => ({ agent, relevance: undefined }));

  return (
    <main className="min-h-screen px-6 py-8 text-[#251926] lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="text-sm text-[#71676f] transition hover:text-[#251926]">← Back to Noria</Link>

        <div className="mt-14 flex flex-col justify-between gap-8 border-b border-[#bdb1b9] pb-10 lg:flex-row lg:items-end">
          <div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-[#251926] sm:text-6xl">{query ? `Agents matching “${query}”` : "Indexed agent records on BSC"}</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#71676f]">Results come from the live 8004scan index. Relevance measures published text matches—not performance or financial quality.</p>
          </div>
          <form action="/discover" className="flex w-full max-w-xl border border-[#cfc5bd] bg-[#faf8f3] p-2 shadow-[0_15px_45px_rgba(45,25,45,.06)]">
            <label htmlFor="agent-search" className="sr-only">Search indexed agents</label>
            <input id="agent-search" defaultValue={query} name="q" placeholder="Search by goal or capability" className="min-h-11 flex-1 bg-transparent px-3 text-sm text-[#251926] outline-none placeholder:text-[#9b9199]" />
            <button className="bg-[#251926] px-4 text-sm font-semibold text-white transition hover:bg-[#5d315f]">Search</button>
          </form>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-sm text-[#71676f]">
          <span>{ranked.length} records returned</span>
          <span>BNB Smart Chain · chain ID 56</span>
        </div>

        {!result.success ? (
          <div className="mt-8 border border-[#d7bd8c] bg-[#fff6df] p-8 text-sm text-[#765b24]">The live agent source is unavailable. Try again shortly.</div>
        ) : ranked.length ? (
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {ranked.map(({ agent, relevance }) => (
              <AgentCard key={agent.id} agent={agent} relevance={relevance} matchReason={query ? explainMatch(agent, { rawQuery: query }) : undefined} />
            ))}
          </div>
        ) : (
          <div className="mt-8 border border-[#d7bd8c] bg-[#fff6df] p-8 text-sm text-[#765b24]">No live records matched this request. Try a broader capability or protocol name.</div>
        )}
      </div>
    </main>
  );
}
