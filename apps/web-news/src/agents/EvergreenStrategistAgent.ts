import type { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { JsonOutputParser } from "@langchain/core/output_parsers";

import { getLLM } from "@/lib/llm";

 

export interface EvergreenTopic {
  keyword: string;
  evergreenScore: number; // 1–5
  angle: string; // abordagem evergreen
  format: string; // tipo de artigo (How-to, Explicativo, etc.)
  title: string; // título provisório
  outline: string[]; // seções principais
}

export class EvergreenStrategistAgent {
  private readonly llm: ChatOpenAI;
  private readonly prompt: PromptTemplate;
  private readonly parser = new JsonOutputParser<{ topics: EvergreenTopic[] }>();
  private readonly MIN_SCORE: number;

  constructor() {
    this.llm = getLLM("EVERGREEN_MODEL", "gpt-4o-mini", {
      temperature: 0.4,
    });

    this.prompt = PromptTemplate.fromTemplate(`
Você é um ESTRATEGISTA DE CONTEÚDO EVERGREEN especializado em finanças.
Seu trabalho é analisar uma lista de termos em alta (trending keywords) e decidir quais têm potencial para gerar conteúdo evergreen de longo prazo.

KEYWORDS EM ALTA:
{keywords}

Para cada termo, siga os passos:
1. Verifique potencial evergreen (1 = muito sazonal, 5 = altamente perene).
   • Leve em conta dados históricos de interesse (assuma acesso a gráfico de 12+ meses do Google Trends) e se o assunto corresponde a conceitos ou práticas duradouras.
2. Defina QUAL ÂNGULO evergreen torna o tema atemporal (ex.: tutorial, guia definicional, estudo de caso histórico, etc.).
3. Escolha o FORMATO de artigo mais adequado (How-to, Explicativo, Lista, FAQ, Estudo de Caso, Dicas).
4. Proponha um TÍTULO provisório chamativo porém atemporal.
5. Esboce um OUTLINE em 3-6 seções (NÃO inclui a introdução e conclusão).

RETORNE APENAS JSON válido no formato:
{{
  "topics": [
    {{
      "keyword": "...",
      "evergreenScore": 1,
      "angle": "...",
      "format": "...",
      "title": "...",
      "outline": ["H2 seção 1", "H2 seção 2", "..."]
    }}
  ]
}}
`);

    this.MIN_SCORE = Number(process.env.EVERGREEN_MIN_SCORE ?? 4);
  }

  /**
   * Recebe lista de palavras-chave trending e devolve até topK tópicos
   * que atingem o score mínimo de evergreen.
   */
  async select(keywords: string[], topK = 5): Promise<EvergreenTopic[]> {
    if (!keywords.length) return [];

    const itemsStr = keywords.map((k, idx) => `${idx + 1}. ${k}`).join("\n");

    const chain = RunnableSequence.from([
      this.prompt,
      this.llm,
      this.parser,
    ]);

    let topics: EvergreenTopic[] = [];
    try {
      const res = await chain.invoke({ keywords: itemsStr });
      topics = res.topics ?? [];
    } catch (err) {
      console.error("[EvergreenStrategist] LLM error", err);
      return [];
    }

    // Filtra por score e limita a topK
    const filtered = topics
      .filter((t) => typeof t.evergreenScore === "number" && t.evergreenScore >= this.MIN_SCORE)
      .sort((a, b) => b.evergreenScore - a.evergreenScore)
      .slice(0, topK);

    return filtered;
  }
} 