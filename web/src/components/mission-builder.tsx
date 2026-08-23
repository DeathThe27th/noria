"use client";

import Link from "next/link";
import { useState } from "react";
import type { AgentRecord } from "@/lib/8004scan";
import { WalletConnect } from "@/components/wallet-connect";

export function MissionBuilder({ agent }: { agent: AgentRecord }) {
  const [goal, setGoal] = useState("");
  const [expiry, setExpiry] = useState("24 hours");
  const [limit, setLimit] = useState("0");
  const [saved, setSaved] = useState(false);
  function saveDraft(event: React.FormEvent) {
    event.preventDefault();
    const mission = { id: crypto.randomUUID(), agentId: agent.id, agentName: agent.name, goal, expiry, limit, status: "draft", createdAt: new Date().toISOString() };
    try { const existing = JSON.parse(localStorage.getItem("noria.missions.v1") ?? "[]"); localStorage.setItem("noria.missions.v1", JSON.stringify([mission, ...(Array.isArray(existing) ? existing : [])])); } catch { /* local storage unavailable */ }
    setSaved(true);
  }
  return <section className="border border-[#d8d0c8] bg-[#faf8f3] p-7 shadow-[0_20px_60px_rgba(45,25,45,.08)]"><div className="flex items-start justify-between gap-4"><div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6d6070]">Mission draft</p><h2 className="mt-3 font-editorial text-4xl text-[#182642]">Ask {agent.name} to do one thing well.</h2></div><WalletConnect /></div><form onSubmit={saveDraft} className="mt-8 space-y-5"><label className="block text-sm font-semibold text-[#251926]">What outcome should this agent pursue?<textarea required value={goal} onChange={(event) => setGoal(event.target.value)} placeholder="Monitor my lending position and alert me before the health factor becomes critical." className="mt-2 min-h-28 w-full border border-[#cfc5bd] bg-white p-4 text-sm leading-6 text-[#251926] outline-none placeholder:text-[#9b9199] focus:border-[#5d315f]" /></label><div className="grid gap-5 sm:grid-cols-2"><label className="block text-sm font-semibold text-[#251926]">Permission expiry<select value={expiry} onChange={(event) => setExpiry(event.target.value)} className="mt-2 min-h-12 w-full border border-[#cfc5bd] bg-white px-3 text-sm font-normal text-[#251926] outline-none focus:border-[#5d315f]"><option>1 hour</option><option>24 hours</option><option>7 days</option></select></label><label className="block text-sm font-semibold text-[#251926]">Maximum spend (BNB)<input value={limit} onChange={(event) => setLimit(event.target.value)} inputMode="decimal" pattern="^\d*(\.\d{0,6})?$" className="mt-2 min-h-12 w-full border border-[#cfc5bd] bg-white px-3 text-sm font-normal text-[#251926] outline-none focus:border-[#5d315f]" /></label></div><div className="border border-[#d8d0c8] bg-white p-4 text-sm leading-6 text-[#71676f]">This saves a draft only. Noria will not execute anything until a documented BSC activation path, permission scope, and user approval are available.</div><div className="flex flex-wrap items-center justify-between gap-3"><button type="submit" className="bg-[#251926] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#5d315f]">Save mission draft</button>{saved ? <span className="text-sm font-semibold text-[#335f4d]">Draft saved locally. <Link href="/missions" className="underline">View missions →</Link></span> : <span className="text-xs text-[#8c8089]">Agent: {agent.name} · BSC chain 56</span>}</div></form></section>;
}
