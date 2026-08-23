import { beforeEach, describe, expect, it } from "vitest";
import { consumeRateLimit, resetRateLimitsForTests } from "./rate-limit";

describe("consumeRateLimit", () => {
  beforeEach(() => resetRateLimitsForTests());

  it("allows the configured quota and rejects the next request", () => {
    for (let index = 0; index < 8; index += 1) {
      expect(consumeRateLimit("client-a", 1_000, 8, 60_000).allowed).toBe(true);
    }
    const rejected = consumeRateLimit("client-a", 1_000, 8, 60_000);
    expect(rejected.allowed).toBe(false);
    expect(rejected.retryAfterSeconds).toBe(60);
  });

  it("resets after the window and isolates clients", () => {
    expect(consumeRateLimit("client-a", 1_000, 1, 60_000).allowed).toBe(true);
    expect(consumeRateLimit("client-a", 1_001, 1, 60_000).allowed).toBe(false);
    expect(consumeRateLimit("client-b", 1_001, 1, 60_000).allowed).toBe(true);
    expect(consumeRateLimit("client-a", 61_001, 1, 60_000).allowed).toBe(true);
  });
});
