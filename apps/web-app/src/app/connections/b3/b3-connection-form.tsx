
'use client'

import Image from "next/image";

import Logo from "../../../assets/logo.svg"
import LogoB3 from "../../../assets/b3-logo.svg"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {useRouter } from "next/navigation";

export function B3ConnectionForm(){

  const router = useRouter()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    router.push("/auth/recover-password")
  }

  return (
    <div>
      <div className="text-center flex flex-col justify-center items-center space-x-2">
        <Image src={Logo} className="size-20 dark:invert" alt="" />
        <h1 className="text-5xl text-foreground font-medium">iAssets</h1>
        <p className="text-lg text-muted-foreground font-light">Gestão de carteira de investimentos</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 mt-12 border p-8 rounded">
        <Image src={LogoB3} className="size-16 mx-auto dark" alt="" />
        <div className="space-y-2 font-medium">
          <p className="text-sm text-foreground font-light">Para sincronizar sua carteira com o Portal B3:</p>
          <div>
            <div className="h-5 w-5 p-1 inline-block text-center text-xs/none bg-foreground rounded-full mr-2 text-primary-foreground">1</div>
            <p className="text-muted-foreground inline font-light text-xs">
              Informe o seu CPF/CNPJ e autorize a conexão.
            </p>
          </div>
          <div>
            <div className="h-5 w-5 p-1 inline-block text-center text-xs/none bg-foreground rounded-full mr-2 text-primary-foreground">2</div>
            <p className="text-muted-foreground inline font-light text-xs">
              Você será redirecionado para a página de autenticação da B3.
            </p>
          </div>
          <div>
            <div className="h-5 w-5 p-1 inline-block text-center text-xs/none bg-foreground rounded-full mr-2 text-primary-foreground">3</div>
            <p className="text-muted-foreground inline font-light text-xs">
              Faça o login e em até 5 minutos sua conta será sincronizada!
            </p>
          </div>

        </div>
        <div className="space-y-1">
          <Label htmlFor="identifier">CPF/CNPJ</Label>
          <Input name="identifier" type="text" id="identifier" />
        </div>
        <Button type="submit" className="w-full">Autorizar</Button>
      </form>
    </div>
  )
}
