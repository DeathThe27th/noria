import type { AgentRecord } from "@/lib/8004scan";

export type SearchIntent = {
  rawQuery?: string;
  goal?: string;
  category?: string;
  protocols?: string[];
  capabilities?: string[];
  riskPreference?: "low" | "medium" | "high" | "unknown";
};

export type RankedAgent = { agent: AgentRecord; relevance: number };

const STOP_WORDS = new Set([
  "agent", "agents", "and", "for", "from", "have", "help", "into", "need", "that", "the", "this", "want", "with", "would", "your",
]);

function normalizeToken(token: string) {
  return token.length > 4 && token.endsWith("s") && !token.endsWith("ss") && !token.endsWith("us") ? token.slice(0, -1) : token;
}

function publishedTokens(agent: AgentRecord) {
  return new Set(
    [
      agent.name,
      agent.description,
      ...(agent.categories ?? []),
      ...(agent.tags ?? []),
      ...(agent.supported_protocols ?? []),
      agent.agent_type,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((token) => token.length > 2)
      .map(normalizeToken),
  );
}

function tokens(value: string | undefined) {
  return (value ?? "")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token))
    .map(normalizeToken);
}

function requestedTokens(intent: SearchIntent) {
  return Array.from(new Set([
    ...tokens(intent.rawQuery),
    ...tokens(intent.goal),
    ...tokens(intent.category),
    ...(intent.protocols ?? []).flatMap(tokens),
    ...(intent.capabilities ?? []).flatMap(tokens),
  ]));
}

export function relevanceScore(agent: AgentRecord, intent: SearchIntent) {
  const queryTokens = requestedTokens(intent);
  if (!queryTokens.length) return 0;
  const published = publishedTokens(agent);
  const hits = queryTokens.filter((token) => published.has(token));
  return Math.round((hits.length / queryTokens.length) * 100);
}

export function rankAgents(agents: AgentRecord[], intent: SearchIntent): RankedAgent[] {
  return agents
    .map((agent) => ({ agent, relevance: relevanceScore(agent, intent) }))
    .sort((a, b) => b.relevance - a.relevance || new Date(b.agent.updated_at).getTime() - new Date(a.agent.updated_at).getTime());
}

export function explainMatch(agent: AgentRecord, intent: SearchIntent) {
  const published = publishedTokens(agent);
  const matches = requestedTokens(intent).filter((token) => published.has(token)).slice(0, 4);
  if (!matches.length) return "No direct evidence match was found; review the published details before choosing.";
  return `Matches published evidence for: ${matches.join(", ")}.`;
}
