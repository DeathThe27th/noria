import { describe, expect, it } from "vitest";
import type { AgentRecord } from "./8004scan";
import { explainMatch, rankAgents, relevanceScore } from "./ranking";

function agent(overrides: Partial<AgentRecord> = {}): AgentRecord {
  return {
    id: "record-1",
    agent_id: "56:0xabc:1",
    token_id: "1",
    chain_id: 56,
    chain_type: "evm",
    contract_address: "0xabc",
    is_testnet: false,
    owner_address: "0xowner",
    owner_ens: null,
    owner_username: null,
    owner_certified_name: null,
    name: "Venus Health Guardian",
    description: "Monitors Venus lending positions and health factor risk.",
    image_url: null,
    is_verified: false,
    star_count: 0,
    supported_protocols: ["Venus"],
    x402_supported: false,
    total_score: 0,
    rank: null,
    network_rank: null,
    health_score: null,
    total_feedbacks: 0,
    average_score: 0,
    created_at: "2026-08-20T00:00:00Z",
    updated_at: "2026-08-22T00:00:00Z",
    ...overrides,
  };
}

describe("relevanceScore", () => {
  it("scores only words found in published agent fields", () => {
    expect(relevanceScore(agent(), { rawQuery: "Venus health monitor" })).toBe(100);
    expect(relevanceScore(agent(), { rawQuery: "PancakeSwap liquidity" })).toBe(0);
  });

  it("does not count substrings inside unrelated published words", () => {
    const record = agent({ name: "Analyst", description: "Produces yielding analytical output." });
    expect(relevanceScore(record, { rawQuery: "yield" })).toBe(0);
  });

  it("does not mistake short filler words for evidence", () => {
    expect(relevanceScore(agent(), { rawQuery: "I want an agent for Venus" })).toBe(100);
  });
});

describe("rankAgents", () => {
  it("orders stronger evidence matches before newer unrelated records", () => {
    const unrelated = agent({ id: "newer", name: "Grid Bot", description: "Grid trading", updated_at: "2026-08-23T00:00:00Z" });
    const ranked = rankAgents([unrelated, agent()], { rawQuery: "Venus health" });
    expect(ranked[0].agent.name).toBe("Venus Health Guardian");
    expect(ranked[0].relevance).toBe(100);
  });
});

describe("explainMatch", () => {
  it("names matching evidence tokens and admits when none exist", () => {
    expect(explainMatch(agent(), { rawQuery: "Venus health" })).toContain("venus, health");
    expect(explainMatch(agent(), { rawQuery: "PancakeSwap liquidity" })).toContain("No direct evidence match");
  });
});
