import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade | iAssets News",
  description: "Entenda como tratamos seus dados pessoais.",
  alternates: { canonical: "https://news.iassets.com.br/privacidade" },
};

export default function PrivacidadePage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Política de Privacidade</h1>
      <p className="text-gray-700 dark:text-gray-300">
        Em construção.
      </p>
    </main>
  );
} 