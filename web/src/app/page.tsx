import Link from "next/link";
import { AgentCard } from "@/components/agent-card";
import { AgentLandscape } from "@/components/agent-landscape";
import { Concierge } from "@/components/concierge";
import { FloatingNav } from "@/components/floating-nav";
import { getAgents } from "@/lib/8004scan";

const outcomes = [
  { label: "Rebalancing", query: "rebalancing" },
  { label: "Grid trading", query: "grid trading" },
  { label: "Yield", query: "yield" },
  { label: "Health factor", query: "health factor" },
];

export default async function Home() {
  const [latest, ...outcomeResults] = await Promise.all([
    getAgents({ limit: 6 }).catch(() => ({ success: false, data: [], meta: undefined })),
    ...outcomes.map((outcome) => getAgents({ query: outcome.query, limit: 4 }).catch(() => ({ success: false, data: [], meta: undefined }))),
  ]);
  const featured = latest.data[0];
  const totalRecords = latest.meta?.pagination?.total;

  return (
    <main className="overflow-hidden bg-[#f1eee7] text-[#182642]">
      <section className="relative min-h-[900px] overflow-hidden bg-[#123e82] bg-cover bg-center text-white" style={{ backgroundImage: "url('/noria-atmosphere.svg')" }}>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,26,62,.12),rgba(14,49,99,.02)_48%,rgba(8,32,73,.48))]" />
        <div className="relative z-10 mx-auto min-h-[900px] max-w-[1320px] px-5 pb-36 sm:px-8 lg:px-10">
          <header className="flex items-center justify-between py-8">
            <Link href="/" className="font-editorial text-3xl italic tracking-[-0.05em] text-white">noria</Link>
            <div className="hidden items-center gap-7 text-xs text-white/75 sm:flex"><Link href="#landscape" className="hover:text-white">The field</Link><Link href="#evidence" className="hover:text-white">Evidence</Link><Link href="/discover" className="hover:text-white">Agents</Link></div>
            <Link href="/discover" className="rounded-full border border-white/35 bg-white/10 px-4 py-2 text-xs text-white backdrop-blur-sm transition hover:bg-white hover:text-[#123e82]">Enter Noria</Link>
          </header>

          <div className="relative flex min-h-[700px] flex-col items-center pt-20 text-center sm:pt-24">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/65">Autonomous intelligence · BNB Smart Chain</p>
            <h1 className="mt-7 max-w-5xl font-editorial text-7xl leading-[.86] tracking-[-0.045em] sm:text-[8.5rem]">Find the agent for the move ahead.</h1>
            <p className="mt-8 max-w-lg text-base leading-7 text-white/75 sm:text-lg">Describe the outcome. Noria maps the indexed field, explains the evidence, and helps you choose.</p>
            <div className="mt-10 w-full max-w-2xl text-left"><Concierge /></div>
            <AgentLandscape agents={latest.data} />
          </div>
        </div>
        <FloatingNav />
      </section>

      <section id="evidence" className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 lg:px-10 lg:py-36">
        <div className="grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
          <div><p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#6d6070]">A legible agent economy</p><h2 className="mt-6 max-w-xl font-editorial text-6xl leading-[.9] tracking-[-0.04em] text-[#182642] sm:text-8xl">The right agent should not feel like a research project.</h2></div>
          <div className="grid gap-10 border-t border-[#c9c0c4] pt-6 sm:grid-cols-3 lg:pt-0 lg:pl-10 lg:border-l lg:border-t-0"><div><p className="font-editorial text-4xl text-[#5d315f]">01</p><h3 className="mt-6 text-lg font-semibold">Intent</h3><p className="mt-3 text-sm leading-6 text-[#71676f]">Say what you want to happen. Noria translates the mandate into a search.</p></div><div><p className="font-editorial text-4xl text-[#5d315f]">02</p><h3 className="mt-6 text-lg font-semibold">Evidence</h3><p className="mt-3 text-sm leading-6 text-[#71676f]">Inspect identity, interfaces, activity, and missing fields from the source.</p></div><div><p className="font-editorial text-4xl text-[#5d315f]">03</p><h3 className="mt-6 text-lg font-semibold">Choice</h3><p className="mt-3 text-sm leading-6 text-[#71676f]">Compare the tradeoffs before a wallet ever gets asked to approve.</p></div></div>{featured ? <Link href={`/agents/${featured.chain_id}/${featured.token_id}`} className="mt-10 block border-t border-[#c9c0c4] pt-5 text-sm text-[#5d315f] transition hover:text-[#182642]">Featured source record: <strong>{featured.name}</strong> →</Link> : <p className="mt-10 border-t border-[#c9c0c4] pt-5 text-sm text-[#765b24]">Featured source record unavailable.</p>}
        </div>
      </section>

      <section id="landscape" className="relative overflow-hidden bg-[#071a3b] px-5 py-24 text-white sm:px-8 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-[1320px]">
          <div className="flex flex-col justify-between gap-8 border-b border-white/20 pb-8 sm:flex-row sm:items-end"><div><p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/55">The indexed field</p><h2 className="mt-5 max-w-3xl font-editorial text-6xl leading-[.86] tracking-[-0.04em] sm:text-8xl">Move through the categories.</h2></div><p className="max-w-xs text-sm leading-6 text-white/60">Four required outcomes. One place to see what is declared, what is evidenced, and what is still unknown.</p></div>
          <div className="mt-16 grid divide-y divide-white/15 border-b border-white/15 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">{outcomes.map((outcome, index) => <Link key={outcome.label} href={`/discover?q=${encodeURIComponent(outcome.query)}`} className="group px-0 py-7 sm:px-6 lg:px-8 lg:first:pl-0"><span className="font-mono text-[10px] text-white/45">0{index + 1}</span><h3 className="mt-16 font-editorial text-4xl tracking-[-0.025em] text-white transition group-hover:text-[#cde7ef]">{outcome.label}</h3><span className="mt-5 block text-xs text-white/55 transition group-hover:text-white">{outcomeResults[index].data.length ? "Explore indexed records →" : "No indexed record →"}</span></Link>)}</div>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 lg:px-10 lg:py-32"><div className="flex items-end justify-between border-b border-[#bdb1b9] pb-6"><div><p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#6d6070]">Source records</p><h2 className="mt-4 font-editorial text-6xl leading-[.9] tracking-[-0.04em] text-[#182642] sm:text-8xl">Look closer.</h2></div>{totalRecords && <span className="hidden font-mono text-[10px] uppercase tracking-[0.15em] text-[#6d6070] sm:block">{new Intl.NumberFormat("en", { notation: "compact" }).format(totalRecords)} indexed on BSC</span>}</div>{!latest.success ? <div className="mt-8 border border-[#d7bd8c] bg-[#fff6df] p-8 text-sm text-[#765b24]">The live source is unavailable. Noria is not substituting placeholder records.</div> : <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{latest.data.map((agent) => <AgentCard key={agent.id} agent={agent} />)}</div>}</section>

      <footer className="border-t border-[#d8d0c8] px-5 py-10 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-[#817780]">Noria reads indexed agent identity and source evidence. Missing evidence stays missing.</footer>
    </main>
  );
}
