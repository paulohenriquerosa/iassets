"use client";
import { ChartContainer } from "@/components/ui/chart";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ChartContainer config={{}}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </ChartContainer>
    </>
  );
}
