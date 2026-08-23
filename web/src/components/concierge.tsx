"use client";

import Link from "next/link";
import { useState } from "react";

type Intent = {
  goal: string;
  category: string;
  protocols: string[];
  capabilities: string[];
  riskPreference: string;
  clarification: string;
};

export function Concierge() {
  const [query, setQuery] = useState("");
  const [intent, setIntent] = useState<Intent | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setIntent(null);
    try {
      const response = await fetch("/api/concierge", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "Concierge unavailable");
      setIntent(data.intent);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Concierge unavailable");
    } finally {
      setLoading(false);
    }
  }

  const search = intent
    ? encodeURIComponent([intent.goal, intent.category, ...intent.protocols, ...intent.capabilities].filter(Boolean).join(" "))
    : "";
  const chips = intent
    ? [intent.category, intent.riskPreference !== "unknown" ? `${intent.riskPreference} risk` : "", ...intent.protocols, ...intent.capabilities].filter(Boolean)
    : [];

  return (
    <section className="border-y border-[#cfc5bd] bg-[#faf8f3] px-5 py-6 shadow-[0_24px_70px_rgba(45,25,45,.08)] sm:px-7 sm:py-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.035em] text-[#251926]">Describe the mandate.</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#71676f]">Gemini structures the request. Noria ranks the live records with deterministic evidence matching.</p>
        </div>
        <span className="hidden border border-[#cdbdce] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5d315f] sm:block">AI-assisted</span>
      </div>

      <form onSubmit={submit} className="mt-6 grid gap-3">
        <label htmlFor="noria-intent" className="sr-only">What do you want an agent to do?</label>
        <input
          id="noria-intent"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="I want a low-risk agent to monitor my Venus lending position"
          className="min-h-14 flex-1 border border-[#cfc5bd] bg-white px-4 text-sm text-[#251926] outline-none placeholder:text-[#9b9199] focus:border-[#5d315f]"
        />
        <button disabled={loading || !query.trim()} className="min-h-14 bg-[#5d315f] px-6 text-sm font-semibold text-white transition hover:bg-[#472349] disabled:opacity-45">
          {loading ? "Structuring request…" : "Interpret mandate"}
        </button>
      </form>

      <div aria-live="polite">
        {error && <p className="mt-4 border border-[#d7bd8c] bg-[#fff6df] p-3 text-sm text-[#765b24]">{error} Try again or use direct search.</p>}
        {intent && (
          <div className="mt-6 border-t border-[#d8d0c8] pt-5">
            <p className="text-base font-semibold text-[#251926]">{intent.goal || query}</p>
            {!!chips.length && <div className="mt-4 flex flex-wrap gap-2">{chips.map((chip) => <span key={chip} className="border border-[#d8d0c8] bg-white px-3 py-1.5 text-xs text-[#5f555e]">{chip}</span>)}</div>}
            {intent.clarification ? (
              <div className="mt-4 border border-[#d7bd8c] bg-[#fff6df] p-3 text-sm leading-6 text-[#765b24]">
                <p>One detail would improve the search: {intent.clarification}</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span>Add the answer to the mandate above and submit again.</span>
                  <Link href={`/discover?q=${encodeURIComponent(query)}`} className="font-semibold underline decoration-[#b99d69]">Search broadly instead →</Link>
                </div>
              </div>
            ) : (
              <Link href={`/discover?q=${search}`} className="mt-5 inline-flex bg-[#251926] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#5d315f]">Search indexed agents →</Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
