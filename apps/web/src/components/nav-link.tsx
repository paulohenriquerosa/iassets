'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

interface NavLinkProps extends ComponentProps<typeof Link>{}

export function NavLink(props: NavLinkProps){
  const pathname = usePathname()

  const isActive = props.href.toString() === pathname

  return <Link data-active={isActive} {...props} className="text-muted-foreground data-[active=true]:text-foreground hover:text-foreground transition-colors" />
}
