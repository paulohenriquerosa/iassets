import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre nós | iAssets News",
  description: "Saiba mais sobre o iAssets News – missão, visão e valores.",
  alternates: { canonical: "https://news.iassets.com.br/sobre" },
};

export default function SobrePage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Sobre o iAssets News</h1>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
        O iAssets News nasceu com a missão de democratizar informações de 
        qualidade sobre o mercado financeiro brasileiro e global. Nossa equipe 
        de especialistas trabalha 24 horas para trazer notícias, análises e 
        educação financeira de forma acessível e transparente.
      </p>
    </main>
  );
} 