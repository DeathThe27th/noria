import Link from "next/link";
import type { AgentRecord } from "@/lib/8004scan";
import { agentSourceUrl, formatDate, initials, shortAddress } from "@/lib/8004scan";

function evidenceLabel(agent: AgentRecord) {
  if (agent.is_verified) return "Verified identity";
  if (agent.total_feedbacks > 0) return `${agent.total_feedbacks} feedback records`;
  if (agent.created_tx_hash) return "Onchain registration";
  return "Identity indexed";
}

export function AgentCard({ agent }: { agent: AgentRecord }) {
  const categories = agent.categories?.filter(Boolean) ?? [];
  const protocols = agent.supported_protocols?.filter(Boolean) ?? [];
  return (
    <article className="group flex min-h-[300px] flex-col justify-between rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-300/40 hover:bg-white/[0.075]">
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-300 to-fuchsia-500 text-sm font-bold text-[#120b1c] shadow-[0_0_28px_rgba(196,140,255,.18)]">
            {initials(agent.name)}
          </div>
          <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-200">
            BSC live
          </span>
        </div>
        <div className="mt-6">
          <h3 className="line-clamp-1 text-xl font-semibold tracking-[-0.03em] text-white">{agent.name}</h3>
          <p className="mt-2 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-slate-300/75">
            {agent.description || "This agent has not published a description yet."}
          </p>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {(categories.length ? categories : protocols.length ? protocols : ["Metadata indexed"]).slice(0, 3).map((item) => (
            <span key={item} className="rounded-full bg-white/[0.07] px-2.5 py-1 text-xs text-slate-300">{item}</span>
          ))}
          {agent.x402_supported && <span className="rounded-full bg-amber-300/10 px-2.5 py-1 text-xs text-amber-200">x402</span>}
        </div>
      </div>
      <div className="mt-7 border-t border-white/10 pt-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>{evidenceLabel(agent)}</span>
          <span>{formatDate(agent.updated_at)}</span>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="font-mono text-[11px] text-slate-500">{shortAddress(agent.owner_address)}</span>
          <div className="flex items-center gap-3">
            <a href={agentSourceUrl()} target="_blank" rel="noreferrer" className="text-xs text-slate-400 transition hover:text-white">Source ↗</a>
            <Link href={`/agents/${agent.chain_id}/${agent.token_id}`} className="rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-[#160d20] transition hover:bg-violet-100">
              Open passport
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
