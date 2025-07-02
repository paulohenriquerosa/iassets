import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato | iAssets News",
  description: "Entre em contato com a equipe do iAssets News.",
  alternates: { canonical: "https://news.iassets.com.br/contato" },
};

export default function ContatoPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Fale Conosco</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Envie dúvidas, sugestões ou feedback para
        <a href="mailto:contato@iassets.com.br" className="text-blue-600 ml-1">contato@iassets.com.br</a>.
      </p>
    </main>
  );
} 