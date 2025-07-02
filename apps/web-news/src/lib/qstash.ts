/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from "@upstash/qstash";
import { sendQuotaExceededAlert } from "@/lib/email";

const qstashInternal = new Client({
  token: process.env.QSTASH_TOKEN!,
  baseUrl: process.env.QSTASH_URL || "https://qstash.upstash.io",
});

const IS_LOCAL = process.env.NODE_ENV !== "production" || process.env.QSTASH_DISABLE === "1";

export async function qstashPublishJSON(opts: any) {
  try {
    if (IS_LOCAL) {
      console.log("[QStash] SKIPPED publish (local dev)", opts.url ?? opts.destination);
      return { bodyUrl: "local", messageId: "local-dev" } as any;
    }
    return await qstashInternal.publishJSON(opts);
  } catch (err: any) {
    console.error("[QStash] publish error", err);
    if (err?.message?.includes("quota")) {
      await sendQuotaExceededAlert("QStash quota exceeded: " + err.message);
    }
    throw err;
  }
}