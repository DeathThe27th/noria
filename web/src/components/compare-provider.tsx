"use client";

import Link from "next/link";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { AgentRecord } from "@/lib/8004scan";

type CompareContextValue = {
  agents: AgentRecord[];
  toggle: (agent: AgentRecord) => void;
  clear: () => void;
};

const CompareContext = createContext<CompareContextValue | null>(null);
const storageKey = "noria.compare.v1";

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [agents, setAgents] = useState<AgentRecord[]>([]);
  const hydrated = useRef(false);
  useEffect(() => {
    const hydrate = window.setTimeout(() => {
      try {
        const saved = JSON.parse(localStorage.getItem(storageKey) ?? "[]") as AgentRecord[];
        if (Array.isArray(saved)) setAgents(saved.slice(0, 3));
      } catch { /* unavailable storage stays empty */ }
      hydrated.current = true;
    }, 0);
    return () => window.clearTimeout(hydrate);
  }, []);
  useEffect(() => {
    if (!hydrated.current) return;
    try { localStorage.setItem(storageKey, JSON.stringify(agents)); } catch { /* private browsing */ }
  }, [agents]);
  const value = useMemo(() => ({
    agents,
    toggle: (agent: AgentRecord) => setAgents((current) => current.some((item) => item.id === agent.id) ? current.filter((item) => item.id !== agent.id) : current.length < 3 ? [...current, agent] : current),
    clear: () => setAgents([]),
  }), [agents]);
  return <CompareContext.Provider value={value}>{children}<CompareTray /></CompareContext.Provider>;
}

export function CompareButton({ agent }: { agent: AgentRecord }) {
  const context = useContext(CompareContext);
  if (!context) return null;
  const selected = context.agents.some((item) => item.id === agent.id);
  return <button type="button" onClick={() => context.toggle(agent)} className={selected ? "rounded-full bg-[#eef2ff] px-4 py-2.5 text-xs font-semibold text-[#7048ed]" : "rounded-full bg-[#f3f5f8] px-4 py-2.5 text-xs text-black/50 transition hover:bg-[#e7ecf4] hover:text-[#111]"}>{selected ? "Added" : "Compare"}</button>;
}

function CompareTray() {
  const context = useContext(CompareContext);
  if (!context || !context.agents.length) return null;
  const ids = context.agents.map((agent) => agent.token_id).join(",");
  return <div className="fixed bottom-20 left-1/2 z-40 flex w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 items-center justify-between gap-4 rounded-full border border-black/8 bg-white/95 px-5 py-3 text-sm text-[#111] shadow-[0_20px_60px_rgba(10,20,45,.18)] backdrop-blur-md"><span><strong>{context.agents.length}</strong> selected</span><div className="flex items-center gap-3"><button type="button" onClick={context.clear} className="text-xs text-black/45">Clear</button><Link href={`/compare?ids=${ids}`} className="rounded-full bg-[#7048ed] px-4 py-2 text-xs font-semibold text-white">Compare →</Link></div></div>;
}
