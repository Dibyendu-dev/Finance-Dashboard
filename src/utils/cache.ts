type CacheEntry<T> = {
  value: T;
  expiry: number;
};

const cache = new Map<string, CacheEntry<unknown>>();

export function setCache<T>(key: string, value: T, ttlMs: number): void {
  cache.set(key, {
    value,
    expiry: Date.now() + ttlMs,
  });
}

export function getCache<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;

  if (Date.now() > entry.expiry) {
    cache.delete(key);
    return null;
  }

  return entry.value as T;
}
