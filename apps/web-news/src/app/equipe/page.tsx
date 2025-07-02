import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nossa equipe | iAssets News",
  description: "Conheça os profissionais por trás do iAssets News.",
  alternates: { canonical: "https://news.iassets.com.br/equipe" },
};

export default function EquipePage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Equipe iAssets News</h1>
      <p className="text-gray-700 dark:text-gray-300">
        Em breve publicaremos informações detalhadas sobre nossos editores,
        jornalistas e analistas de mercado.
      </p>
    </main>
  );
} 