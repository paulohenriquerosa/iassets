import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DollarSign, 
  Mail, 
  Twitter, 
  Linkedin, 
  Instagram,
  Youtube,
  ArrowUp
} from "lucide-react";

const footerLinks = {
  mercados: {
    title: "Mercados",
    links: [
      { label: "Ações Brasileiras", href: "/mercados/acoes-brasileiras" },
      { label: "Ações Americanas", href: "/mercados/acoes-americanas" },
      { label: "Fundos Imobiliários", href: "/mercados/fiis" },
      { label: "Renda Fixa", href: "/mercados/renda-fixa" },
      { label: "Commodities", href: "/mercados/commodities" }
    ]
  },
  crypto: {
    title: "Criptomoedas",
    links: [
      { label: "Bitcoin", href: "/crypto/bitcoin" },
      { label: "Ethereum", href: "/crypto/ethereum" },
      { label: "Altcoins", href: "/crypto/altcoins" },
      { label: "DeFi", href: "/crypto/defi" },
      { label: "NFTs", href: "/crypto/nft" }
    ]
  },
  recursos: {
    title: "Recursos",
    links: [
      { label: "Calculadoras", href: "/ferramentas/calculadoras" },
      { label: "Análise Técnica", href: "/ferramentas/analise-tecnica" },
      { label: "Carteiras", href: "/ferramentas/carteiras" },
      { label: "Simuladores", href: "/ferramentas/simuladores" },
      { label: "Educação", href: "/educacao" }
    ]
  },
  empresa: {
    title: "Empresa",
    links: [
      { label: "Sobre Nós", href: "/sobre" },
      { label: "Equipe", href: "/equipe" },
      { label: "Carreiras", href: "/carreiras" },
      { label: "Contato", href: "/contato" },
      { label: "Imprensa", href: "/imprensa" }
    ]
  }
};

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/iassets", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/iassets", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com/iassets", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com/@iassets", label: "YouTube" }
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-muted/30 border-t border-border">
      {/* Newsletter Section */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-2">
              Fique por dentro do mercado financeiro
            </h3>
            <p className="text-muted-foreground mb-6">
              Receba as principais notícias, análises e oportunidades de investimento diretamente no seu email.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Digite seu email" 
                className="flex-1"
              />
              <Button>
                <Mail className="w-4 h-4 mr-2" />
                Inscrever-se
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Ao se inscrever, você concorda com nossa política de privacidade.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-primary-foreground font-bold" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-foreground">iAssets</span>
                <span className="text-xs text-muted-foreground -mt-1">Investimentos</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              Sua fonte confiável para notícias, análises e insights sobre investimentos no Brasil e no mundo.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center hover:bg-accent transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h4 className="font-semibold text-foreground mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground">
              <p>© 2024 iAssets. Todos os direitos reservados.</p>
              <div className="flex items-center gap-4">
                <Link href="/privacidade" className="hover:text-foreground transition-colors">
                  Privacidade
                </Link>
                <Link href="/termos" className="hover:text-foreground transition-colors">
                  Termos
                </Link>
                <Link href="/cookies" className="hover:text-foreground transition-colors">
                  Cookies
                </Link>
              </div>
            </div>
            
            {/* Back to Top */}
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowUp className="w-4 h-4 mr-2" />
              Voltar ao topo
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
} 