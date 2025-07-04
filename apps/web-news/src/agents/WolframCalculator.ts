/* eslint-disable @typescript-eslint/no-explicit-any */
import { WolframAlphaTool } from "@langchain/community/tools/wolframalpha";

export class WolframCalculator {
  private readonly tool?: any;

  constructor() {
    const appId = process.env.WOLFRAM_APP_ID;
    if (appId) {
      this.tool = new WolframAlphaTool({ appid: appId });
    }
  }

  async ask(question: string): Promise<string> {
    if (!this.tool) return "";
    try {
      const res = await this.tool.call(question);
      return typeof res === "string" ? res : JSON.stringify(res);
    } catch (err) {
      console.error("[WolframCalculator] error", (err as any).message);
      return "";
    }
  }
} 