import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { ChevronDown, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getInitials } from "@/utils/get-initials";
import { Separator } from "./ui/separator";


export function ProfileButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3">
      <div className="flex flex-col items-end">
        <span className="text-sm text-foreground font-medium">Paulo Henrique Rosa</span>
        <span className="text-xs text-muted-foreground font-medium">paulo@mail.com</span>
      </div>
      <Avatar className="size-8">
        <AvatarImage src="https://github.com/paulohenriquerosa.png" />
          <AvatarFallback>{getInitials("Paulo Henrique")}</AvatarFallback>
      </Avatar>
        <ChevronDown className="size-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        alignOffset={-16}
        className="w-[200px]"
        sideOffset={12}
      >
        <DropdownMenuItem asChild>
          <a href="/api/auth/sign-out">
            Meu perfil
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="text-foreground text-sm">
          <a href="/api/auth/sign-out">
            Conexão
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="text-foreground text-sm">
          <a href="/api/auth/sign-out">
            Notificações
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="text-foreground text-sm">
          <a href="/api/auth/sign-out">
            Minha conta
          </a>
        </DropdownMenuItem>
        <Separator className="my-1" />
        <DropdownMenuItem asChild className="text-foreground text-sm">
          <a href="/api/auth/sign-out">
            <LogOut className="mr-2 size-4" />
            Sair
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
