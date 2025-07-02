import { clsx, type ClassValue } from "clsx"
import { differenceInHours, format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatSmartDate = (dateString: string): string => {
  const date = new Date(dateString);
  const hoursDiff = differenceInHours(new Date(), date);

  if (hoursDiff < 24) {
    // se for dentro das últimas 24h, usa relativo
    return formatDistanceToNow(date, {
      addSuffix: true,
      locale: ptBR,
    })
      .replace("aproximadamente ", "")
      .replace("cerca de ", "")
      .replace("menos de ", "")
      .replace("há cerca de ", "há ");
  } else {
    // fora desse intervalo, usa absoluto
    return format(date, "dd/MM/yyyy 'às' HH'h'mm", {
      locale: ptBR,
    });
  }
};