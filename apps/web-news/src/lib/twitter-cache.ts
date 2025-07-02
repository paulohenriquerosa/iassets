import { Redis } from "@upstash/redis";
import { format } from "date-fns";

const redis = Redis.fromEnv();

const THREAD_SET_KEY = "twitter:threads:set";

/**
 * Adds a unique identifier of a thread to Redis set and returns whether it was newly added.
 * @param id A unique string to identify the thread (e.g., hash or first tweet text)
 */
export async function markThreadPosted(id: string, ttlDays = 60): Promise<boolean> {
  const added = await redis.sadd(THREAD_SET_KEY, id);
  if (added === 1) {
    await redis.expire(THREAD_SET_KEY, ttlDays * 24 * 60 * 60);
    return true;
  }
  return false;
}

/**
 * Checks if a given thread identifier was already posted.
 */
export async function wasThreadPosted(id: string): Promise<boolean> {
  const isMember = await redis.sismember(THREAD_SET_KEY, id);
  return isMember === 1;
}

function todayKey() {
  return `twitter:count:${format(new Date(), "yyyy-MM-dd")}`;
}

/**
 * Increment today's tweet counter by given delta (default 1). Returns new total.
 */
export async function incTweetCount(delta = 1): Promise<number> {
  const key = todayKey();
  const total = await redis.incrby(key, delta);
  // ensure key expires after 2 days
  await redis.expire(key, 60 * 60 * 48);
  return total;
}

/** Get how many tweets were sent today (approx). */
export async function getTweetCountToday(): Promise<number> {
  const key = todayKey();
  const value = (await redis.get(key)) as number | null;
  return Number(value) || 0;
} 