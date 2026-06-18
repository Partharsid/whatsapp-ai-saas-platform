import { Sidebar } from "@/components/modern-side-bar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-black text-white min-h-screen selection:bg-primary/30">
      <Sidebar>
        <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </Sidebar>
    </div>
  );
}
