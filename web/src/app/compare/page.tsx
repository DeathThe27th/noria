import Link from "next/link";
import { parseCompareIds } from "@/lib/compare";
import { getAgent, shortAddress, type AgentRecord } from "@/lib/8004scan";

export default async function ComparePage({ searchParams }: { searchParams: Promise<{ ids?: string }> }) {
  const { ids } = await searchParams;
  const tokenIds = parseCompareIds(ids);
  const results = await Promise.all(tokenIds.map((tokenId) => getAgent(56, tokenId).then((result) => result.data).catch(() => null)));
  const agents = results.filter((agent): agent is AgentRecord => Boolean(agent));
  const rows: Array<{ label: string; values: string[] }> = [
    { label: "Identity", values: agents.map((agent) => agent.is_verified ? "Verified" : "Indexed") },
    { label: "Activity", values: agents.map((agent) => agent.is_active === true ? "Reported active" : agent.is_active === false ? "Reported inactive" : "Unknown") },
    { label: "Feedback", values: agents.map((agent) => String(agent.total_feedbacks)) },
    { label: "Protocols", values: agents.map((agent) => agent.supported_protocols?.length ? agent.supported_protocols.join(", ") : "Not published") },
    { label: "Owner", values: agents.map((agent) => shortAddress(agent.owner_address)) },
    { label: "x402", values: agents.map((agent) => agent.x402_supported ? "Supported" : "Not reported") },
  ];

  return <main className="min-h-screen bg-[#f1eee7] px-5 py-8 text-[#182642] sm:px-8 lg:px-10"><div className="mx-auto max-w-7xl"><div className="flex items-center justify-between"><Link href="/discover" className="text-sm text-[#71676f] hover:text-[#182642]">← Back to discovery</Link><Link href="/" className="font-editorial text-2xl italic text-[#5d315f]">noria</Link></div><div className="mt-16 border-b border-[#bdb1b9] pb-8"><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6d6070]">Decision table</p><h1 className="mt-4 font-editorial text-6xl leading-[.9] tracking-[-0.04em] sm:text-8xl">Compare the evidence.</h1><p className="mt-5 max-w-2xl text-sm leading-7 text-[#71676f]">Noria compares what each indexed agent publishes. It does not turn incomplete evidence into a performance claim.</p></div>{agents.length < 2 ? <div className="mt-10 border border-[#d8d0c8] bg-[#faf8f3] p-8 text-sm text-[#71676f]">Select at least two indexed agents from discovery to compare them here.</div> : <div className="mt-10 overflow-x-auto border border-[#d8d0c8] bg-[#faf8f3]"><table className="w-full min-w-[720px] border-collapse text-left text-sm"><thead><tr className="border-b border-[#d8d0c8]"><th className="w-40 p-5" />{agents.map((agent) => <th key={agent.id} className="p-5 align-top font-normal"><p className="font-editorial text-3xl text-[#182642]">{agent.name}</p><p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#8c8089]">Lot {agent.token_id}</p><Link href={`/agents/${agent.chain_id}/${agent.token_id}`} className="mt-5 inline-block text-xs font-semibold text-[#5d315f] underline">Open Passport →</Link></th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.label} className="border-b border-[#e1dad2]"><th className="p-5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#8c8089]">{row.label}</th>{row.values.map((value, index) => <td key={`${row.label}-${agents[index].id}`} className="p-5 text-[#4f454d]">{value}</td>)}</tr>)}</tbody></table></div>}</div></main>;
}
