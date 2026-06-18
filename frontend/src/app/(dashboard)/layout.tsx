"use client"

import { usePathname, useRouter } from "next/navigation"
import { Toaster } from "@/components/ui/sonner"
import { useAuth } from "@/lib/auth-context"
import { Sidebar } from "@/components/dashboard-sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  if (!isLoading && !user) {
    router.push("/login")
    return null
  }

  return (
    <div className="min-h-screen bg-fog flex selection:bg-sky-wash selection:text-ink">
      <Toaster position="bottom-right" />
      <Sidebar>
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[1000px] mx-auto p-6 md:p-10">
            {children}
          </div>
        </main>
      </Sidebar>
    </div>
  )
}
