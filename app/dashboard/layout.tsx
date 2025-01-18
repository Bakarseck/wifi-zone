"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Home, Wifi, Tag, Ticket } from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const navigation = [
    { name: "Accueil", href: "/dashboard", icon: Home },
    { name: "Wifi Zones", href: "/dashboard/wifi-zones", icon: Wifi },
    { name: "Tarifs", href: "/dashboard/tarifs", icon: Tag },
    { name: "Tickets", href: "/dashboard/tickets", icon: Ticket },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader className="border-b p-4">
            <h2 className="text-lg font-semibold">WifiZone</h2>
          </SidebarHeader>
          <SidebarContent>
            <nav className="space-y-1 p-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Button
                    key={item.name}
                    variant={isActive ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href={item.href}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </Link>
                  </Button>
                )
              })}
            </nav>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1">
          <header className="border-b">
            <div className="flex h-16 items-center gap-4 px-4">
              <SidebarTrigger />
              <h1 className="text-lg font-semibold">Tableau de bord</h1>
              <div className="ml-auto">
                <Button variant="ghost" asChild>
                  <Link href="/">Déconnexion</Link>
                </Button>
              </div>
            </div>
          </header>
          <main className="p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

