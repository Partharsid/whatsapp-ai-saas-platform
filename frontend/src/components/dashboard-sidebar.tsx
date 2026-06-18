"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Home, Users, MessageSquare, Send, Bot, Smartphone, DollarSign, Settings, LogOut, Menu, X, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const navItems = [
  { id: "dashboard", name: "Overview", icon: Home, href: "/dashboard" },
  { id: "contacts", name: "Contacts", icon: Users, href: "/dashboard/contacts" },
  { id: "conversations", name: "Conversations", icon: MessageSquare, href: "/dashboard/conversations" },
  { id: "broadcast", name: "Broadcast", icon: Send, href: "/dashboard/broadcast" },
  { id: "ai-settings", name: "AI Settings", icon: Bot, href: "/dashboard/ai-settings" },
  { id: "connect", name: "Connect", icon: Smartphone, href: "/dashboard/connect" },
  { id: "pricing", name: "Pricing", icon: DollarSign, href: "/dashboard/pricing" },
  { id: "settings", name: "Settings", icon: Settings, href: "/dashboard/settings" },
]

export function Sidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  const activeId = navItems.find((item) => pathname === item.href)?.id || "dashboard"

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <div className={cn("flex items-center border-b h-14", collapsed ? "justify-center px-2" : "justify-between px-4")}>
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink">
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </div>
          {!collapsed && <span className="font-semibold text-sm">Steep</span>}
        </Link>
        <button onClick={() => setCollapsed(!collapsed)} className="hidden md:flex p-1.5 rounded-md hover:bg-fog text-ash">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={collapsed ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
          </svg>
        </button>
      </div>

      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeId === item.id
          return (
            <Link key={item.id} href={item.href} onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg text-sm transition-all",
                collapsed ? "justify-center p-2" : "px-3 py-2",
                isActive ? "bg-ink text-white" : "text-ash hover:bg-fog hover:text-ink"
              )}>
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      <div className="border-t p-2">
        <button onClick={() => router.push("/login")}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-all",
            collapsed ? "justify-center p-2" : "px-3 py-2"
          )}>
          <LogOut className="h-4 w-4" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  )

  return (
    <>
      <button onClick={() => setMobileOpen(true)}
        className="fixed top-3 left-3 z-50 flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-md border md:hidden">
        <Menu className="h-4 w-4" />
      </button>

      {mobileOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={cn(
        "fixed top-0 left-0 h-full bg-white border-r z-40 transition-all duration-200 flex flex-col",
        collapsed ? "w-16" : "w-56",
        mobileOpen ? "translate-x-0" : "-translate-x-full",
        "md:translate-x-0 md:static md:z-auto"
      )}>
        {sidebarContent}
        {mobileOpen && (
          <button onClick={() => setMobileOpen(false)}
            className="absolute top-3 right-3 p-1 hover:bg-fog rounded-md md:hidden">
            <X className="h-4 w-4" />
          </button>
        )}
      </aside>

      <div className={cn("transition-all duration-200 w-full", collapsed ? "md:ml-16" : "md:ml-56")}>
        {children}
      </div>
    </>
  )
}
