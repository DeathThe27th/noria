const base = "https://8004scan.io/api/v1/public/agents";
const queries = ["rebalancing", "grid trading", "yield", "health factor"];
const records = new Map();

async function fetchJson(url) {
  const response = await fetch(url, { headers: { "User-Agent": "noria-sync/0.1" } });
  if (!response.ok) throw new Error(`8004scan ${response.status}`);
  return response.json();
}

async function collect(url) {
  const payload = await fetchJson(url);
  for (const record of payload.data ?? []) records.set(record.id, record);
}

await collect(`${base}?chainId=56&limit=100&page=1`);
for (const query of queries) await collect(`${base}/search?q=${encodeURIComponent(query)}&chainId=56&limit=25`);

const rows = [...records.values()].map((record) => ({
  source_id: record.id,
  agent_id: record.agent_id,
  token_id: record.token_id,
  chain_id: record.chain_id,
  name: record.name,
  description: record.description,
  owner_address: record.owner_address,
  is_verified: Boolean(record.is_verified),
  is_testnet: Boolean(record.is_testnet),
  is_active: record.is_active ?? null,
  supported_protocols: record.supported_protocols ?? [],
  categories: record.categories ?? [],
  tags: record.tags ?? [],
  services: record.services ?? {},
  x402_supported: Boolean(record.x402_supported),
  total_feedbacks: record.total_feedbacks ?? 0,
  average_score: record.average_score ?? null,
  health_status: record.health_status ?? null,
  created_at: record.created_at ?? null,
  updated_at: record.updated_at ?? null,
  source_updated_at: record.updated_at ?? null,
  source_url: `https://8004scan.io/api/v1/public/agents/${record.chain_id}/${encodeURIComponent(record.token_id)}`,
  raw_record: record,
}));

const url = `${process.env.SUPABASE_URL}/rest/v1/agents`;
const response = await fetch(url, {
  method: "POST",
  headers: {
    apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
    "Content-Type": "application/json",
    Prefer: "resolution=merge-duplicates,return=minimal",
  },
  body: JSON.stringify(rows),
});
if (!response.ok) throw new Error(`Supabase upsert ${response.status}: ${await response.text()}`);
console.log(JSON.stringify({ synced: rows.length, source: "8004scan", chainId: 56 }));
