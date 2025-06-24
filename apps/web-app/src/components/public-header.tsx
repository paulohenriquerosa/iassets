import Logo from "@/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PublicHeader() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
        <Link href="/" className="flex items-center gap-3">
          <Image src={Logo} className="size-8 dark:invert" alt="IAssets Logo" />
          <span className="text-xl font-bold">iAssets</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground"
          >
            Home
          </Link>
          <Link
            href="/ativos"
            className="text-muted-foreground hover:text-foreground"
          >
            Ativos
          </Link>
          <Link
            href="/noticias"
            className="text-muted-foreground hover:text-foreground"
          >
            Notícias
          </Link>
          <Link
            href="/rankings"
            className="text-muted-foreground hover:text-foreground"
          >
            Rankings
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/auth/sign-in">
            <Button variant="ghost">Entrar</Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button>Conta Pro</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
