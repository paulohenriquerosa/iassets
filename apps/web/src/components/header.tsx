import Image from "next/image";

import Logo from "@/assets/logo.svg"
import { Bot, DollarSign, Home,  Wallet } from "lucide-react";
import { Separator } from "./ui/separator";
import { NavLink } from "./nav-link";
import { ProfileButton } from "./profile-button";
import { ThemeSwitcher } from "./theme-switcher";

export function Header(){
  return (
    <div
      className="mx-auto w-full flex max-w-7xl items-center justify-between py-2 border-b">
      <div className="flex items-center justify-between gap-6">

        <Image src={Logo} className="size-6 dark:invert" alt="" />

        <Separator orientation="vertical" className="h-6"  />

        <nav className="space-x-6">
          <NavLink href="/">
            <Home className="size-4 inline"/>
            <span className="align-middle text-sm"> Home </span>
          </NavLink>
          <NavLink href="/wallet">
            <Wallet className="size-4 inline"/>
            <span className="align-middle text-sm"> Carteira </span>
          </NavLink>

          <NavLink href="/dividends">
            <DollarSign className="size-4 inline"/>
            <span className="align-middle text-sm"> Proventos </span>
          </NavLink>
          <NavLink href="/assistant">
            <Bot className="size-4 inline"/>
            <span className="align-middle text-sm"> IA </span>
          </NavLink>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <Separator orientation="vertical" className="h-6"  />
        <ProfileButton />
      </div>
    </div>
  )
}
