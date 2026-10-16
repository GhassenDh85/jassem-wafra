type Bucket = { count: number; reset: number };

const buckets = new Map<string, Bucket>();

let lastSweep = Date.now();

function sweep(now: number) {
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [key, bucket] of buckets) {
    if (bucket.reset < now) buckets.delete(key);
  }
}

export type RateLimitResult =
  | { ok: true }
  | { ok: false; retryAfter: number };

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60_000): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const bucket = buckets.get(key);
  if (!bucket || bucket.reset < now) {
    buckets.set(key, { count: 1, reset: now + windowMs });
    return { ok: true };
  }

  if (bucket.count >= limit) {
    return { ok: false, retryAfter: Math.max(1, Math.ceil((bucket.reset - now) / 1000)) };
  }

  bucket.count += 1;
  return { ok: true };
}
