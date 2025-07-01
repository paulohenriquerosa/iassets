export function agentLog(agent: string, stage: string, data: unknown) {
  try {
    const preview = typeof data === "string" ? data : JSON.stringify(data, null, 2);
    console.log(`[${agent}] ${stage}:`, preview.length > 300 ? preview.slice(0, 300) + "..." : preview);
  } catch (err) {
    console.log(`[${agent}] ${stage}: [unserializable]`, err);
  }
} 