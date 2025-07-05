import Link from "next/link";
import { Mail } from "lucide-react";

export function NewsletterCTA() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl py-10 px-6 sm:px-12 text-center text-white my-12 sm:my-16">
      <div className="max-w-3xl mx-auto">
        <Mail className="w-10 h-10 mx-auto mb-4" />
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Receba as principais notícias e análises no seu e-mail
        </h2>
        <p className="text-base sm:text-lg mb-6">
          Junte-se a mais de 500 mil investidores e fique por dentro do mercado financeiro.
        </p>
        <Link
          href="/newsletter"
          className="inline-block bg-white text-gray-900 font-semibold py-3 px-6 rounded-lg shadow hover:bg-gray-100 transition-colors text-sm sm:text-base"
        >
          Assinar Newsletter
        </Link>
      </div>
    </section>
  );
} 