import type { AgentRecord } from "@/lib/8004scan";

export function AgentLandscape({ agents }: { agents: AgentRecord[] }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[56%] overflow-hidden" aria-label="Indexed BSC agent landscape">
      <div className="absolute -bottom-[46%] left-1/2 h-[105%] w-[145%] -translate-x-1/2 rotate-[-8deg] rounded-[48%] border-t border-white/25 bg-[radial-gradient(ellipse_at_center_top,rgba(218,239,246,.92),rgba(136,187,216,.72)_34%,rgba(39,94,150,.1)_72%)] shadow-[0_-20px_100px_rgba(209,237,247,.28)] sm:-bottom-[58%]" />
      <div className="absolute bottom-[24%] left-1/2 h-[48%] w-[110%] -translate-x-1/2 rotate-[7deg] border-t border-white/30 opacity-70" />
      <div className="absolute bottom-[18%] left-1/2 h-[40%] w-[82%] -translate-x-1/2 rotate-[-14deg] border-t border-white/25 opacity-60" />
      {agents.slice(0, 12).map((agent, index) => {
        const left = 10 + ((index * 29 + agent.token_id.length * 7) % 80);
        const bottom = 16 + ((index * 17 + agent.name.length * 3) % 48);
        return <span key={agent.id} className="agent-pulse absolute h-2 w-2 rounded-full bg-white shadow-[0_0_20px_6px_rgba(239,251,255,.7)]" style={{ left: `${left}%`, bottom: `${bottom}%`, animationDelay: `${index * 160}ms` }} />;
      })}
      <div className="absolute bottom-[11%] left-[8%] font-mono text-[9px] uppercase tracking-[0.2em] text-white/65 sm:left-[14%]">BSC / indexed field</div>
      <div className="absolute bottom-[17%] right-[8%] font-mono text-[9px] uppercase tracking-[0.2em] text-white/65 sm:right-[14%]">identity · evidence · intent</div>
    </div>
  );
}
