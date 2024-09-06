import { Header } from "@/components/header"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col max-w-7xl mx-auto">
      <Header/>
      <main className="w-full">
        {children}
      </main>
    </div>
  )
}
