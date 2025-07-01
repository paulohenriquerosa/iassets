import { ChatOpenAI } from "@langchain/openai";

/**
 * Factory helper to create a ChatOpenAI instance with sane defaults and
 * environment-variable override. This helps centralize model selection and
 * reduces boilerplate across agents.
 *
 * @param envVar name of the environment variable that, when defined, contains
 *               the model name to use (e.g. "WRITER_MODEL").
 * @param fallback default model used when the env var is not set. Choose a
 *                 cost-effective model such as "gpt-3.5-turbo-0125".
 * @param opts     optional overrides (temperature, maxTokens, etc.)
 */
export function getLLM(
  envVar: string,
  fallback: string,
  opts: Record<string, unknown> = {}
): ChatOpenAI {
  const modelName = (process.env[envVar] as string | undefined) || fallback;

  // Sensible, cheaper defaults. These can still be overridden via opts.
  const {
    temperature = 0,
    maxTokens = 1000,
    openAIApiKey = process.env.OPENAI_API_KEY!,
    ...rest
  } = opts as {
    temperature?: number;
    maxTokens?: number;
    openAIApiKey?: string;
    [key: string]: unknown;
  };

  return new ChatOpenAI({
    modelName,
    temperature,
    maxTokens,
    openAIApiKey,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(rest as Record<string, any>),
  });
}

/**
 * Convenience helper to log approximate token usage for a given agent.
 * Uses the LLM's internal tokenizer, so it should match OpenAI accounting.
 */
export async function logTokenUsage(
  agent: string,
  stage: string,
  llm: ChatOpenAI,
  input: string,
  output: string
) {
  try {
    const inTokens = await llm.getNumTokens(input);
    const outTokens = await llm.getNumTokens(output);
     
    console.log(
      `[${agent}] ${stage}: tokens_in=${inTokens} tokens_out=${outTokens} total=${
        inTokens + outTokens
      }`
    );
  } catch {
    // swallow – non-critical
  }
} 