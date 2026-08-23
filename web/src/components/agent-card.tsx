import Link from "next/link";
import type { AgentRecord } from "@/lib/8004scan";
import { CompareButton } from "@/components/compare-provider";
import { agentApiUrl, formatDate, shortAddress } from "@/lib/8004scan";

function evidenceLabel(agent: AgentRecord) {
  if (agent.is_verified) return "Verified identity";
  if (agent.total_feedbacks > 0) return `${agent.total_feedbacks} feedback records`;
  if (agent.created_tx_hash) return "Onchain registration";
  return "Identity indexed";
}

export function AgentCard({ agent, relevance, matchReason }: { agent: AgentRecord; relevance?: number; matchReason?: string }) {
  const categories = agent.categories?.filter(Boolean) ?? [];
  const protocols = agent.supported_protocols?.filter(Boolean) ?? [];
  const labels = (categories.length ? categories : protocols.length ? protocols : ["Metadata indexed"]).slice(0, 3);

  return (
    <article className="group flex min-h-[330px] flex-col justify-between border border-[#d8d0c8] bg-[#faf8f3] p-5 shadow-[0_18px_55px_rgba(45,25,45,.07)] transition duration-300 hover:-translate-y-1 hover:border-[#a88baa] hover:shadow-[0_24px_65px_rgba(45,25,45,.11)]">
      <div>
        <div className="flex items-start justify-between gap-4 border-b border-[#ded7cf] pb-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#8c8089]">Lot {agent.token_id}</p>
            <p className="mt-1 font-mono text-[10px] text-[#9a9098]">BSC · ERC-8004</p>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            {typeof relevance === "number" && <span className="border border-[#cdbdce] bg-[#f3eaf4] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#5d315f]">{relevance}% relevance</span>}
            <span className="border border-[#b9cec4] bg-[#edf5f0] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#335f4d]">BSC indexed</span>
          </div>
        </div>

        <h3 className="mt-5 line-clamp-1 text-xl font-semibold tracking-[-0.03em] text-[#251926]">{agent.name}</h3>
        <p className="mt-2 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-[#71676f]">{agent.description || "This agent has not published a description yet."}</p>
        {matchReason && <p className="mt-4 text-xs leading-5 text-[#5d315f]">{matchReason}</p>}

        <div className="mt-5 flex flex-wrap gap-2">
          {labels.map((item) => <span key={item} className="border border-[#d8d0c8] bg-white px-2.5 py-1 text-xs text-[#655b63]">{item}</span>)}
          {agent.x402_supported && <span className="border border-[#d6c49f] bg-[#fff6df] px-2.5 py-1 text-xs text-[#765b24]">x402</span>}
        </div>
      </div>

      <div className="mt-7 border-t border-[#d8d0c8] pt-4">
        <div className="flex items-center justify-between gap-4 text-xs text-[#827780]">
          <span>{evidenceLabel(agent)}</span>
          <time dateTime={agent.updated_at}>{formatDate(agent.updated_at)}</time>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="font-mono text-[11px] tabular-nums text-[#8c8089]">{shortAddress(agent.owner_address)}</span>
          <div className="flex items-center gap-3">
            <a href={agentApiUrl(agent.chain_id, agent.token_id)} target="_blank" rel="noreferrer" className="text-xs text-[#71676f] underline decoration-[#c7bcc5] transition hover:text-[#251926]">Source</a>
            <CompareButton agent={agent} />
            <Link href={`/agents/${agent.chain_id}/${agent.token_id}`} className="bg-[#251926] px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-[#5d315f]">Passport →</Link>
          </div>
        </div>
      </div>
    </article>
  );
}
