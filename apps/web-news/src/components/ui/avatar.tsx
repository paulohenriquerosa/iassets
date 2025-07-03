import * as React from "react"
import { cn } from "@/lib/utils"
import Image, { ImageProps, StaticImageData } from "next/image"

function Avatar({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
}

type AvatarImageProps = Omit<ImageProps, "src" | "alt" | "width" | "height"> & {
  src: string | StaticImageData;
  alt?: string;
};

function AvatarImage({ className, src, alt = "", ...props }: AvatarImageProps) {
  return (
    <Image
      alt={alt}
      src={src}
      className={cn("aspect-square h-full w-full", className)}
      fill
      sizes="40px"
      loading="lazy"
      decoding="async"
      {...props}
    />
  )
}

function AvatarFallback({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback } 