import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

const KEY = "newsletter:emails";

export async function addSubscriber(email: string) {
  // deduplicate using a set
  await redis.sadd(KEY, email.toLowerCase());
  await redis.hset(`newsletter:meta:${email.toLowerCase()}`, {
    date: new Date().toISOString(),
  });
} 