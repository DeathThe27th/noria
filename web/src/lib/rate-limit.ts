type RateEntry = { count: number; resetAt: number };
const buckets = new Map<string, RateEntry>();

export function consumeRateLimit(key: string, now = Date.now(), limit = 8, windowMs = 60_000) {
  const existing = buckets.get(key);
  if (!existing || now >= existing.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }
  if (existing.count >= limit) {
    return { allowed: false, retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)) };
  }
  existing.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

export function resetRateLimitsForTests() {
  buckets.clear();
}
