'use client'

import Image from "next/image";

import Logo from "../../../assets/logo.svg"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {useRouter } from "next/navigation";

export function ForgotPasswordForm(){

  const router = useRouter()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    router.push("/auth/recover-password")
  }

  return (
    <div>
      <div className="text-center flex flex-col justify-center items-center space-x-2">
        <Image src={Logo} className="mr-2 size-20 dark:invert" alt="" />
        <h1 className="text-5xl text-foreground font-medium">iAssets</h1>
        <p className="text-lg text-muted-foreground font-light">Gestão de carteira de investimentos</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 mt-12 border p-8 rounded">
        <div className="text-center space-y-1 font-medium">
          <h2 className="text-base text-foreground">Recuperar senha</h2>
          <p className="text-xs text-muted-foreground font-light">Um e-mail será enviado com instruções para recuperar senha.</p>
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input name="email" type="email" id="email" />
        </div>
        <Button type="submit" className="w-full">Enviar </Button>
        <div className="text-center">
          <Link href="/auth/sign-in" className="text-xs hover:underline font-normal text-muted-foreground">
            Acessar minha conta
          </Link>
          </div>
      </form>
    </div>
  )
}
