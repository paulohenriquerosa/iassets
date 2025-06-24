"use client";

import Image from "next/image";
import { useState } from "react";
import Logo from "@/assets/logo.svg";
import {
  Bot,
  DollarSign,
  Home,
  Menu,
  Settings,
  Wallet,
  Coins,
} from "lucide-react";
import { Separator } from "./ui/separator";
import { NavLink } from "./nav-link";
import { ProfileButton } from "./profile-button";
import { ThemeSwitcher } from "./theme-switcher";
import { Button } from "./ui/button";

import { Notifications } from "./notifications";
import { Sheet, SheetContent } from "./ui/sheet";
import { SheetTrigger } from "./ui/sheet";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mx-auto w-full flex max-w-7xl items-center justify-between py-2 border-b px-4">
      <div className="flex items-center justify-between gap-6">
        <Image src={Logo} className="size-6 dark:invert" alt="IAssets Logo" />

        <Separator orientation="vertical" className="h-6 hidden md:block" />

        {/* Desktop Navigation */}
        <nav className="space-x-6 hidden md:block">
          <NavLink href="/dashboard">
            <Home className="size-4 inline" />
            <span className="align-middle text-sm"> Home </span>
          </NavLink>
          <NavLink href="/wallet">
            <Wallet className="size-4 inline" />
            <span className="align-middle text-sm"> Carteira </span>
          </NavLink>
          <NavLink href="/dividends">
            <DollarSign className="size-4 inline" />
            <span className="align-middle text-sm"> Proventos </span>
          </NavLink>
          <NavLink href="/crypto">
            <Coins className="size-4 inline" />
            <span className="align-middle text-sm"> Cripto </span>
          </NavLink>
          <NavLink href="/assistant">
            <Bot className="size-4 inline" />
            <span className="align-middle text-sm"> IA </span>
          </NavLink>
          <NavLink href="/settings">
            <Settings className="size-4 inline" />
            <span className="align-middle text-sm"> Configurações </span>
          </NavLink>
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[300px]">
            <div className="flex flex-col gap-6 py-4">
              <div className="flex items-center gap-2">
                <Image
                  src={Logo}
                  className="size-6 dark:invert"
                  alt="IAssets Logo"
                />
                <span className="font-bold">IAssets</span>
              </div>
              <nav className="flex flex-col space-y-4">
                <NavLink href="/" onClick={() => setIsOpen(false)}>
                  <Home className="size-4 inline mr-2" />
                  <span className="align-middle"> Home </span>
                </NavLink>
                <NavLink href="/wallet" onClick={() => setIsOpen(false)}>
                  <Wallet className="size-4 inline mr-2" />
                  <span className="align-middle"> Carteira </span>
                </NavLink>
                <NavLink href="/dividends" onClick={() => setIsOpen(false)}>
                  <DollarSign className="size-4 inline mr-2" />
                  <span className="align-middle"> Proventos </span>
                </NavLink>
                <NavLink href="/crypto" onClick={() => setIsOpen(false)}>
                  <Coins className="size-4 inline mr-2" />
                  <span className="align-middle"> Cripto </span>
                </NavLink>
                <NavLink href="/assistant" onClick={() => setIsOpen(false)}>
                  <Bot className="size-4 inline mr-2" />
                  <span className="align-middle"> IA </span>
                </NavLink>
                <NavLink href="/settings" onClick={() => setIsOpen(false)}>
                  <Settings className="size-4 inline mr-2" />
                  <span className="align-middle"> Configurações </span>
                </NavLink>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex items-center gap-4">
        <Notifications />
        <ThemeSwitcher />
        <Separator orientation="vertical" className="h-6 hidden md:block" />
        <ProfileButton />
      </div>
    </div>
  );
}
