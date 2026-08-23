export const BSC_CHAIN_ID = 56;
export const EIGHT4SCAN_BASE = "https://8004scan.io";

export type AgentRecord = {
  id: string;
  agent_id: string;
  token_id: string;
  chain_id: number;
  chain_type: string;
  contract_address: string;
  is_testnet: boolean;
  owner_address: string | null;
  owner_ens: string | null;
  owner_username: string | null;
  owner_certified_name: string | null;
  name: string;
  description: string | null;
  image_url: string | null;
  is_verified: boolean;
  star_count: number;
  watch_count?: number;
  supported_protocols: string[] | null;
  x402_supported: boolean;
  total_score: number | null;
  rank: number | null;
  network_rank: number | null;
  health_score: number | null;
  health_status?: string | null;
  total_feedbacks: number;
  total_validations?: number;
  successful_validations?: number;
  average_score: number;
  quality_score?: number;
  popularity_score?: number;
  activity_score?: number;
  wallet_score?: number;
  freshness_score?: number;
  metadata_completeness_score?: number;
  tags?: string[] | null;
  categories?: string[] | null;
  services?: Record<string, { endpoint?: string }> | null;
  agent_wallet?: string | null;
  created_at: string;
  updated_at: string;
  created_block_number?: number;
  created_tx_hash?: string | null;
  is_endpoint_verified?: boolean;
  endpoint_verified_domain?: string | null;
  is_active?: boolean;
  agent_url?: string | null;
  mcp_server?: string | null;
  a2a_endpoint?: string | null;
  parse_status?: { status?: string; warnings?: string[]; errors?: string[] } | null;
  raw_metadata?: unknown;
};

type ApiResponse<T> = {
  success: boolean;
  data: T;
  meta?: {
    pagination?: { page: number; limit: number; total: number; hasMore: boolean };
    requestId?: string;
  };
};

async function request<T>(path: string): Promise<ApiResponse<T>> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);
  try {
    const response = await fetch(`${EIGHT4SCAN_BASE}${path}`, {
      signal: controller.signal,
      headers: { "User-Agent": "noria/0.1" },
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`8004scan returned ${response.status}`);
    }
    const payload = (await response.json()) as ApiResponse<T>;
    if (!payload.success) throw new Error("8004scan marked the request unsuccessful");
    return payload;
  } finally {
    clearTimeout(timeout);
  }
}

export async function getAgents(options: { query?: string; page?: number; limit?: number } = {}) {
  const page = options.page ?? 1;
  const limit = Math.min(options.limit ?? 20, 100);
  const params = new URLSearchParams({ chainId: String(BSC_CHAIN_ID), page: String(page), limit: String(limit) });
  const path = options.query?.trim()
    ? `/api/v1/public/agents/search?${new URLSearchParams({ q: options.query.trim(), chainId: String(BSC_CHAIN_ID), limit: String(limit) })}`
    : `/api/v1/public/agents?${params}`;
  return request<AgentRecord[]>(path);
}

export async function getAgent(chainId: number, tokenId: string) {
  return request<AgentRecord>(`/api/v1/public/agents/${chainId}/${encodeURIComponent(tokenId)}`);
}

export function agentSourceUrl() {
  return `${EIGHT4SCAN_BASE}/agents?chain=${BSC_CHAIN_ID}`;
}

export function shortAddress(address: string | null | undefined) {
  if (!address) return "Not published";
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function formatDate(value: string | null | undefined) {
  if (!value) return "Unknown";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(date);
}
