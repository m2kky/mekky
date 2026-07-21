export type WaitlistRateLimitStore = Map<string, number[]>;

type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds: number;
};

export function consumeWaitlistAttempt(
  store: WaitlistRateLimitStore,
  key: string,
  now = Date.now(),
  limit = 5,
  windowMs = 10 * 60 * 1000
): RateLimitResult {
  const cutoff = now - windowMs;
  const recent = (store.get(key) || []).filter((timestamp) => timestamp > cutoff);

  if (recent.length >= limit) {
    store.set(key, recent);
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((recent[0] + windowMs - now) / 1000)),
    };
  }

  recent.push(now);
  store.set(key, recent);

  if (store.size > 1_000) {
    for (const [storedKey, attempts] of store) {
      const active = attempts.filter((timestamp) => timestamp > cutoff);
      if (active.length === 0) store.delete(storedKey);
      else store.set(storedKey, active);
    }
  }

  return { allowed: true, retryAfterSeconds: 0 };
}
