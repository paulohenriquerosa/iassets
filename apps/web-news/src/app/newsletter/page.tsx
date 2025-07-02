import { Metadata } from "next";
import { NewsletterWithTracking } from "@/components/newsletter-with-tracking";

export const metadata: Metadata = {
  title: "Newsletter | iAssets News",
  description: "Inscreva-se para receber as principais notícias financeiras.",
  alternates: { canonical: "https://news.iassets.com.br/newsletter" },
};

export default function NewsletterPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Assine nossa Newsletter</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Receba análises exclusivas, alertas de mercado e conteúdos educativos
        diretamente no seu e-mail.
      </p>
      <NewsletterWithTracking location="newsletter_page" />
    </main>
  );
} 