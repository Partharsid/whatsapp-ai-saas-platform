"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/sonner";
import { Menu, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();

  // Protect route
  if (!isLoading && !user) {
    router.push("/login");
    return null;
  }

  const navigation = [
    { name: "Overview", href: "/dashboard", icon: "📊" },
    { name: "WhatsApp Connect", href: "/dashboard/connect", icon: "📱" },
    { name: "Conversations", href: "/dashboard/conversations", icon: "💬" },
    { name: "Contacts", href: "/dashboard/contacts", icon: "👥" },
    { name: "Broadcast", href: "/dashboard/broadcast", icon: "📢" },
    { name: "AI Settings", href: "/dashboard/ai-settings", icon: "🤖" },
    { name: "Billing", href: "/dashboard/pricing", icon: "💳" },
    { name: "Settings", href: "/dashboard/settings", icon: "⚙️" },
  ];

  const SidebarContent = () => (
    <>
      <div className="h-[72px] flex items-center px-6 border-b border-dove/30 shrink-0">
        <Link href="/" className="font-signifier text-[22px] font-medium tracking-tight text-ink">
          Steep
        </Link>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        <div className="px-2 mb-3">
          <h3 className="font-sohne text-[13px] font-[500] uppercase tracking-[0.5px] text-graphite">Menu</h3>
        </div>
        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-[15px] font-sohne font-[450] transition-colors ${
                isActive 
                  ? "bg-pure-white text-ink shadow-[0_1px_2px_rgba(0,0,0,0.04)] border border-dove/20" 
                  : "text-ink hover:bg-dove/10"
              }`}
            >
              <span className="text-[16px] opacity-70 grayscale">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-dove/30 shrink-0">
        <div className="flex items-center justify-between px-2 py-2">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-avatars bg-apricot-wash shrink-0 flex items-center justify-center text-ink text-[13px] font-[500] uppercase">
              {user?.name?.slice(0, 2) || "UN"}
            </div>
            <div className="overflow-hidden">
              <p className="font-sohne text-[14px] font-[500] text-ink truncate">{user?.name || "User"}</p>
              <p className="font-sohne text-[13px] text-graphite truncate">{user?.email}</p>
            </div>
          </div>
          <button onClick={logout} className="p-2 text-ash hover:text-ink hover:bg-dove/10 rounded-buttons transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-fog flex selection:bg-sky-wash selection:text-ink">
      <Toaster position="bottom-right" />
      
      {/* Desktop Sidebar */}
      <aside className="w-[240px] flex-shrink-0 border-r border-dove/30 bg-fog hidden md:flex flex-col">
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="h-[72px] flex items-center justify-between px-6 border-b border-dove/30 bg-pure-white md:hidden">
          <span className="font-signifier text-[22px] font-medium tracking-tight text-ink">Steep</span>
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 -mr-2 text-ink hover:bg-fog rounded-buttons transition-colors">
                <Menu className="w-6 h-6" />
                <span className="sr-only">Toggle Menu</span>
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0 flex flex-col bg-fog">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <SidebarContent />
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[1000px] mx-auto p-6 md:p-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
