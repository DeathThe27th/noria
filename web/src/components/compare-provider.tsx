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
  return <button type="button" onClick={() => context.toggle(agent)} className={selected ? "border border-[#5d315f] bg-[#f3eaf4] px-3 py-2 text-xs font-semibold text-[#5d315f]" : "border border-[#d8d0c8] bg-white px-3 py-2 text-xs text-[#71676f] transition hover:border-[#8d698f] hover:text-[#251926]"}>{selected ? "Compared" : "Compare"}</button>;
}

function CompareTray() {
  const context = useContext(CompareContext);
  if (!context || !context.agents.length) return null;
  const ids = context.agents.map((agent) => agent.token_id).join(",");
  return <div className="fixed bottom-5 left-1/2 z-40 flex w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 items-center justify-between gap-4 border border-[#cdbdce] bg-[#faf8f3]/95 px-4 py-3 text-sm text-[#251926] shadow-[0_20px_60px_rgba(45,25,45,.18)] backdrop-blur-md"><span><strong>{context.agents.length}</strong> agent{context.agents.length === 1 ? "" : "s"} selected</span><div className="flex items-center gap-3"><button type="button" onClick={context.clear} className="text-xs text-[#71676f] underline">Clear</button><Link href={`/compare?ids=${ids}`} className="bg-[#251926] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#5d315f]">Open comparison →</Link></div></div>;
}
