/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from "@upstash/qstash";
import { sendQuotaExceededAlert } from "@/lib/email";

const qstashInternal = new Client({
  token: process.env.QSTASH_TOKEN!,
  baseUrl: process.env.QSTASH_URL || "https://qstash.upstash.io",
});

export async function qstashPublishJSON(opts: Parameters<typeof qstashInternal.publishJSON>[0]) {
  try {
    return await qstashInternal.publishJSON(opts);
  } catch (err: any) {
    console.error("[QStash] publish error", err);
    if (err?.message?.includes("quota")) {
      await sendQuotaExceededAlert("QStash quota exceeded: " + err.message);
    }
    throw err;
  }
}