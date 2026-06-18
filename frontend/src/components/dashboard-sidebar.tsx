"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  Home, Users, MessageSquare, Send, Bot, Smartphone, Settings, LogOut,
  Menu, X, ChevronLeft, ChevronRight, Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  href: string
}

const navItems: NavItem[] = [
  { id: "dashboard", name: "Overview", icon: Home, href: "/dashboard" },
  { id: "contacts", name: "Contacts", icon: Users, href: "/dashboard/contacts" },
  { id: "conversations", name: "Conversations", icon: MessageSquare, href: "/dashboard/conversations" },
  { id: "broadcast", name: "Broadcast", icon: Send, href: "/dashboard/broadcast" },
  { id: "ai-settings", name: "AI Settings", icon: Bot, href: "/dashboard/ai-settings" },
  { id: "connect", name: "WhatsApp Connect", icon: Smartphone, href: "/dashboard/connect" },
  { id: "pricing", name: "Pricing", icon: Settings, href: "/dashboard/pricing" },
  { id: "settings", name: "Settings", icon: Settings, href: "/dashboard/settings" },
]

export function Sidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    if (window.innerWidth >= 768) setIsOpen(true)
    const handleResize = () => setIsOpen(window.innerWidth >= 768)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const activeItem = navItems.find((item) => pathname === item.href)?.id || "dashboard"

  const handleNav = (href: string) => {
    router.push(href)
    if (window.innerWidth < 768) setIsOpen(false)
  }

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-md border md:hidden">
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden" onClick={() => setIsOpen(false)} />
      )}

      <div className={cn(
        "fixed top-0 left-0 h-full bg-white border-r z-40 transition-all duration-300 flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full",
        isCollapsed ? "w-20" : "w-64",
        "md:translate-x-0 md:static md:z-auto"
      )}>
        <div className={cn("flex items-center border-b px-4 h-16", isCollapsed ? "justify-center" : "justify-between")}>
          <button onClick={() => router.push("/dashboard")} className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            {!isCollapsed && <span className="font-semibold">Steep</span>}
          </button>
          <button onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex p-1.5 rounded-md hover:bg-muted">
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.id
            return (
              <button key={item.id} onClick={() => handleNav(item.href)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all",
                  isCollapsed && "justify-center px-2",
                  isActive ? "bg-ink text-white" : "text-muted-foreground hover:bg-muted hover:text-ink"
                )}>
                <Icon className={cn("h-4.5 w-4.5 shrink-0", isActive ? "text-white" : "")} />
                {!isCollapsed && <span>{item.name}</span>}
              </button>
            )
          })}
        </nav>

        <div className="border-t p-3">
          <button onClick={() => handleNav("/login")}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-all",
              isCollapsed && "justify-center"
            )}>
            <LogOut className="h-4.5 w-4.5" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>

      <div className={cn("transition-all duration-300 w-full", isCollapsed ? "md:ml-20" : "md:ml-64")}>
        {children}
      </div>
    </>
  )
}
