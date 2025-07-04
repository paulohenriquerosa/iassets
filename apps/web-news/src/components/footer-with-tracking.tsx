"use client";

import Link from "next/link";
import LogoWhite from "../assets/logo-white.png";
import Image from "next/image";
import {
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  Shield,
  Users,
  Globe,
} from "lucide-react";
import { siteConfig } from "@/lib/seo";
import { FinancialAnalytics } from "@/lib/analytics";
import { NewsletterWithTracking } from "@/components/newsletter-with-tracking";
import { useState, useEffect } from "react";

export function FooterWithTracking() {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((d) => setCategories(d.categories as string[]))
      .catch(() => {});
  }, []);

  // Função para rastrear cliques no footer
  const handleFooterClick = (section: string, item: string, href: string) => {
    FinancialAnalytics.trackEvent({
      action: "footer_link_click",
      category: "navigation",
      label: `${section}_${item}`,
      custom_parameters: {
        footer_section: section,
        footer_item: item,
        footer_href: href,
      },
    });
  };

  // Função para rastrear redes sociais
  const handleSocialClick = (platform: string, url: string) => {
    FinancialAnalytics.trackEvent({
      action: "social_click",
      category: "engagement",
      label: `footer_${platform}`,
      custom_parameters: {
        social_platform: platform,
        social_url: url,
        click_location: "footer",
      },
    });
  };

  return (
    <footer
      className="bg-gray-900 text-white border-t border-gray-800"
      role="contentinfo"
      itemScope
      itemType="https://schema.org/WPFooter"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info with structured data */}
            <div
              className="lg:col-span-1"
              itemScope
              itemType="https://schema.org/Organization"
            >
              <div className="flex items-center gap-3 mb-8">
                <Image
                  src={LogoWhite}
                  className="size-9 dark:invert"
                  alt="IAssets Logo"
                />
                <div className="flex gap-1 items-center">
                  <span className="text-2xl font-bold text-white tracking-tight">
                    iAssets
                  </span>
                  <span className="text-xs text-slate-400 -mt-1 font-medium">
                    News
                  </span>
                </div>
              </div>
              <p
                className="text-gray-300 mb-8 leading-relaxed text-sm"
                itemProp="description"
              >
                O portal mais confiável do Brasil em notícias financeiras.
                Análises profissionais e educação financeira para investidores.
              </p>

              {/* Trust Indicators */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">Dados 100% Seguros</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">+500k Investidores</span>
                </div>
              </div>
            </div>

            {/* Dynamic Categories Links */}
            <nav
              className="space-y-6"
              itemScope
              itemType="https://schema.org/SiteNavigationElement"
            >
              <h4 className="font-semibold text-lg mb-6 text-white">
                Categorias
              </h4>
              <ul className="space-y-3">
                {categories.slice(0, 8).map((cat) => {
                  const slug = cat
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/[^a-z0-9\s-]/g, "")
                    .replace(/\s+/g, "-")
                    .replace(/-+/g, "-")
                    .trim();
                  return (
                    <li key={cat}>
                      <Link
                        href={`/categorias/${slug}`}
                        className="text-gray-300 hover:text-white transition-colors text-sm"
                        itemProp="url"
                        onClick={() =>
                          handleFooterClick("categoria", cat, `/categorias/${slug}`)
                        }
                      >
                        {cat}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Company with tracking */}
            <div>
              <h4 className="font-semibold text-lg mb-6 text-white">Empresa</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/sobre"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                    onClick={() =>
                      handleFooterClick("empresa", "sobre_nos", "/sobre")
                    }
                  >
                    Sobre nós
                  </Link>
                </li>
                <li>
                  <Link
                    href="/equipe"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                    onClick={() =>
                      handleFooterClick("empresa", "nossa_equipe", "/equipe")
                    }
                  >
                    Nossa equipe
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contato"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                    onClick={() =>
                      handleFooterClick("empresa", "contato", "/contato")
                    }
                  >
                    Contato
                  </Link>
                </li>
                <li>
                  <Link
                    href="/newsletter"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                    onClick={() =>
                      handleFooterClick("empresa", "newsletter", "/newsletter")
                    }
                  >
                    Newsletter
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social Media with tracking */}
        <div className="border-t border-gray-800 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h4 className="font-semibold text-white mb-4">
                Siga nossas redes sociais
              </h4>
              <div
                className="flex items-center gap-4"
                itemScope
                itemType="https://schema.org/Organization"
              >
                <a
                  href={siteConfig.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Twitter iAssets"
                  itemProp="sameAs"
                  onClick={() =>
                    handleSocialClick("twitter", siteConfig.social.twitter)
                  }
                >
                  <Twitter className="w-5 h-5 text-gray-300" />
                </a>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="LinkedIn iAssets"
                  itemProp="sameAs"
                  onClick={() =>
                    handleSocialClick("linkedin", siteConfig.social.linkedin)
                  }
                >
                  <Linkedin className="w-5 h-5 text-gray-300" />
                </a>
                <a
                  href={siteConfig.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="YouTube iAssets"
                  itemProp="sameAs"
                  onClick={() =>
                    handleSocialClick("youtube", siteConfig.social.youtube)
                  }
                >
                  <Youtube className="w-5 h-5 text-gray-300" />
                </a>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Instagram iAssets"
                  itemProp="sameAs"
                  onClick={() =>
                    handleSocialClick("instagram", siteConfig.social.instagram)
                  }
                >
                  <Instagram className="w-5 h-5 text-gray-300" />
                </a>
              </div>
            </div>

            {/* Newsletter com tracking integrado */}
            <NewsletterWithTracking location="footer" variant="footer" />
          </div>
        </div>

        {/* Copyright & Legal with tracking */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} {siteConfig.name}. Todos os
                direitos reservados.
              </p>
            </div>

            <nav
              className="flex items-center gap-6 text-sm"
              aria-label="Links legais"
            >
              <Link
                href="/termos"
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() =>
                  handleFooterClick("legal", "termos_uso", "/termos")
                }
              >
                Termos de Uso
              </Link>
              <Link
                href="/privacidade"
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() =>
                  handleFooterClick("legal", "privacidade", "/privacidade")
                }
              >
                Privacidade
              </Link>
              <Link
                href="/cookies"
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() =>
                  handleFooterClick("legal", "cookies", "/cookies")
                }
              >
                Cookies
              </Link>
            </nav>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="border-t border-gray-800 pt-8 pb-6">
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-semibold text-white mb-3">Aviso Legal</h5>
                <p className="text-gray-300 text-sm leading-relaxed">
                  As informações contidas neste portal são apenas para fins
                  educacionais e informativos. Não constituem recomendação de
                  investimento. O investimento em ações e outros ativos envolve
                  riscos. Sempre consulte um profissional qualificado antes de
                  tomar decisões de investimento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

