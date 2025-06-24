import Image from "next/image";

import Logo from "../../../assets/logo.svg"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function SignUpForm(){

  return (
    <div>
      <div className="text-center flex flex-col justify-center items-center space-x-2">
        <Image src={Logo} className="mr-2 size-20 dark:invert" alt="" />
        <h1 className="text-5xl text-foreground font-medium">iAssets</h1>
        <p className="text-lg text-muted-foreground font-light">Gestão de carteira de investimentos</p>
      </div>
      <form className="space-y-4 mt-12 border p-8 rounded">
        <div className="text-center space-y-1 font-medium">
          <h2 className="text-base text-foreground">Criar conta</h2>
          <p className="text-xs text-muted-foreground font-light">Crie uma nova conta e acompanhe os seus ativos.</p>
        </div>
        <div className="space-y-1">
          <Label htmlFor="name" className="font-medium">Nome</Label>
          <Input name="name" id="name" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input name="email" type="email" id="email" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="passwor">Senha</Label>
          <Input name="password" type="password" id="password" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="confirm_password">Confirmar senha</Label>
          <Input name="confirm_password" type="password" id="confirm_password" />
        </div>
        <Button type="submit" className="w-full">Criar conta </Button>
        <div className="text-center">
          <Link href="/auth/sign-in" className="text-xs text-center group font-normal text-muted-foreground">
            Já tem uma conta?  {" "}
            <span className=" group-hover:underline"> Acessar conta</span>
          </Link>
          </div>
      </form>
    </div>
  )
}
