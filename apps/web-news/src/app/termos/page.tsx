import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso | iAssets News",
  description: "Leia os termos de uso do portal iAssets News.",
  alternates: { canonical: "https://news.iassets.com.br/termos" },
};

export default function TermosPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Termos de Uso</h1>
      <p className="text-gray-700 dark:text-gray-300">
        Esta página será atualizada em breve com nossos termos completos.
      </p>
    </main>
  );
} 