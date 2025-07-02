import { Redis } from "@upstash/redis";

// Simple JSON cache utilities leveraging Upstash Redis
// All values are stored as JSON strings for portability.
// TTL defaults to 1 day (86400 seconds) unless explicitly provided.
const redis = Redis.fromEnv();

// Generic function to get and parse JSON from Redis.
export async function getJson<T = unknown>(key: string): Promise<T | null> {
  const res = (await redis.get(key)) as string | null | undefined;
  if (res === null || res === undefined) return null;
  try {
    return JSON.parse(res) as T;
  } catch {
    // value is not JSON, return as-is
     
    return res as unknown as T;
  }
}

// Generic function to stringify and set JSON into Redis with optional TTL.
export async function setJson<T>(
  key: string,
  value: T,
  ttlSeconds = 60 * 60 * 24 // 24h default
): Promise<void> {
  await redis.set(key, JSON.stringify(value), { ex: ttlSeconds });
}

// Helper to mark processing of a unique identifier (e.g., URL) to deduplicate work.
// Returns true if the identifier was newly marked, false if it already existed.
export async function markProcessed(id: string, ttlDays = 30): Promise<boolean> {
  // Use a Redis SET to deduplicate and handle concurrency.
  const wasAdded = await redis.sadd("processed:set", id);
  if (wasAdded === 1) {
    // set TTL only when the key is first created
    await redis.expire("processed:set", ttlDays * 24 * 60 * 60);
    return true;
  }
  return false;
} 