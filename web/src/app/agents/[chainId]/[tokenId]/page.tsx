import Link from "next/link";
import { notFound } from "next/navigation";
import { NoriaMark } from "@/components/noria-mark";
import { AgentSourceError, agentApiUrl, bscTransactionUrl, formatDate, getAgent, shortAddress, type AgentRecord } from "@/lib/8004scan";
import { safeHttpsUrl } from "@/lib/external-url";

function normalizedDomain(value: string | null | undefined) {
  if (!value) return null;
  try { return new URL(value.includes("://") ? value : `https://${value}`).hostname.toLowerCase(); }
  catch { return null; }
}

export default async function AgentPassport({ params }: { params: Promise<{ chainId: string; tokenId: string }> }) {
  const { chainId: rawChainId, tokenId } = await params;
  const chainId = Number(rawChainId);
  if (chainId !== 56 || !/^\d+$/.test(tokenId)) notFound();

  let agent: AgentRecord;
  try {
    agent = (await getAgent(chainId, tokenId)).data;
  } catch (error) {
    if (error instanceof AgentSourceError && error.status === 404) notFound();
    return (
      <main className="min-h-screen px-6 py-8 text-[#251926] lg:px-10">
        <div className="mx-auto max-w-3xl">
          <Link href="/discover" className="text-sm text-black/50 transition hover:text-[#251926]">← Back to discovery</Link>
          <section className="mt-14 rounded-[28px] bg-[#fff3e8] p-8">
            <h1 className="text-3xl font-semibold tracking-[-0.035em]">Agent source unavailable</h1>
            <p className="mt-3 text-sm leading-6 text-[#765b24]">Noria could not verify this Passport because 8004scan did not respond successfully. The record has not been marked missing or inactive. Try again shortly.</p>
          </section>
        </div>
      </main>
    );
  }
  const verifiedDomain = normalizedDomain(agent.endpoint_verified_domain);
  const services = Object.entries(agent.services ?? {})
    .map(([name, value]) => {
      const endpoint = safeHttpsUrl(value?.endpoint);
      return endpoint ? { name, endpoint, verified: agent.is_endpoint_verified === true && verifiedDomain === endpoint.host.toLowerCase() } : null;
    })
    .filter((entry): entry is { name: string; endpoint: { url: string; host: string }; verified: boolean } => Boolean(entry));
  const sourceUrl = agentApiUrl(agent.chain_id, agent.token_id);
  const activityLabel = agent.is_active === true ? "Reported active" : agent.is_active === false ? "Reported inactive" : "Activity unknown";
  const activityClass = agent.is_active === true
    ? "border border-[#b9cec4] bg-[#edf5f0] px-4 py-2 text-sm font-semibold text-[#335f4d]"
    : "rounded-full border border-black/8 bg-white px-4 py-2 text-sm font-semibold text-black/50";

  return (
    <main className="min-h-screen bg-[#f5f2ff] px-5 pb-36 pt-6 text-[#111] sm:px-8">
      <div className="noria-scale mx-auto max-w-[1040px]">
        <div className="flex items-center justify-between rounded-full bg-[#f3f5f8] p-2 pl-4">
          <Link href="/" className="flex items-center gap-3 font-semibold"><span className="flex size-10 items-center justify-center rounded-full bg-[#7048ed] text-white"><NoriaMark className="size-5" /></span>Noria</Link>
          <div className="flex items-center gap-2"><Link href={`/missions/new?agent=${agent.token_id}`} className="rounded-full bg-[#111] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#7048ed]">Create job</Link><a href={sourceUrl} target="_blank" rel="noreferrer" className="hidden rounded-full bg-white px-5 py-3 text-sm font-semibold sm:block">Source ↗</a></div>
        </div>

        <section className="mt-14 rounded-[32px] border border-black/8 bg-[#f6f8fb] p-7 shadow-[0_25px_70px_rgba(45,25,45,.08)] sm:p-10">
          <div className="border-b border-black/8 pb-5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#8c8089]">Agent profile · # {agent.token_id} · BSC mainnet</div>
          <div className="mt-7 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="text-4xl font-semibold tracking-[-0.04em] text-[#251926] sm:text-6xl">{agent.name}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-black/50">{agent.description || "No description has been published by this agent."}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className={activityClass}>{activityLabel}</span>
              <span className="rounded-full border border-black/8 bg-white px-4 py-2 text-sm text-black/50">{agent.is_verified ? "Verified identity" : "Indexed identity"}</span>
            </div>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-[24px] border border-black/8 bg-[#d8d0c8] sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Identity", agent.is_verified ? "Verified" : "Indexed"],
              ["Feedback", String(agent.total_feedbacks)],
              ["Health", agent.health_status || "Not reported"],
              ["Updated", formatDate(agent.updated_at)],
            ].map(([label, value]) => (
              <div key={label} className="bg-white p-4"><p className="text-xs text-[#8c8089]">{label}</p><p className="mt-2 text-sm font-semibold text-[#251926]">{value}</p></div>
            ))}
          </div>
        </section>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
          <section className="rounded-[32px] border border-black/8 bg-[#f6f8fb] p-7">
            <h2 className="text-2xl font-semibold tracking-[-0.035em] text-[#251926]">Source details</h2>
            <p className="mt-2 text-sm leading-6 text-black/50">These values are read from the indexed ERC-8004 record.</p>
            <dl className="mt-7 space-y-5 text-sm">
              <div className="flex justify-between gap-6 border-b border-black/8 pb-4"><dt className="text-black/50">Agent ID</dt><dd className="max-w-[68%] break-all text-right font-mono text-xs text-[#4f454d]">{agent.agent_id}</dd></div>
              <div className="flex justify-between gap-6 border-b border-black/8 pb-4"><dt className="text-black/50">Owner</dt><dd className="text-right font-mono text-xs text-[#4f454d]">{shortAddress(agent.owner_address)}</dd></div>
              <div className="flex justify-between gap-6 border-b border-black/8 pb-4"><dt className="text-black/50">Registration</dt><dd className="max-w-[68%] text-right font-mono text-xs text-[#4f454d]">{agent.created_tx_hash ? <a href={bscTransactionUrl(agent.created_tx_hash)} target="_blank" rel="noreferrer" className="underline decoration-[#b7abb5] hover:text-[#7048ed]">View on BscScan ↗</a> : "Not published"}</dd></div>
              <div className="flex justify-between gap-6"><dt className="text-black/50">Created</dt><dd className="text-right text-[#4f454d]">{formatDate(agent.created_at)}</dd></div>
            </dl>
          </section>

          <section className="rounded-[32px] border border-black/8 bg-[#f6f8fb] p-7">
            <h2 className="text-2xl font-semibold tracking-[-0.035em] text-[#251926]">Connections</h2>
            <p className="mt-2 text-sm leading-6 text-black/50">We only show connections the agent has published.</p>
            <div className="mt-6 flex flex-wrap gap-2">{(agent.supported_protocols ?? []).length ? agent.supported_protocols?.map((item) => <span key={item} className="rounded-full bg-[#eef2ff] px-3 py-1.5 text-xs text-[#7048ed]">{item}</span>) : <span className="text-sm text-[#8c8089]">No protocols published</span>}</div>
            <div className="mt-7 space-y-3">{services.length ? services.map(({ name, endpoint, verified }) => verified ? <a key={name} href={endpoint.url} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-4 rounded-[18px] border border-[#b9cec4] bg-[#edf5f0] p-3 text-sm text-[#335f4d] transition hover:border-[#668d7b]"><span>{name}</span><span className="text-right text-xs">Verified · {endpoint.host} ↗</span></a> : <div key={name} className="flex items-center justify-between gap-4 rounded-full border border-black/8 bg-white p-3 text-sm text-black/50"><span>{name}</span><span className="text-right text-xs text-[#8c8089]">Unverified · {endpoint.host}</span></div>) : <p className="text-sm leading-6 text-[#8c8089]">No HTTPS service endpoint is published for this agent.</p>}</div>
          </section>
        </div>

        <p className="mt-8 text-center text-xs text-[#817780]">Noria shows the source as it is. If a detail is missing, we say so.</p>
      </div>
    </main>
  );
}
