import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black text-white">
      {/* Glassmorphism Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="absolute top-8 left-8 z-20">
        <Link href="/" className="flex items-center space-x-2 text-xl font-bold hover:opacity-80 transition-opacity">
          <Sparkles className="w-6 h-6 text-primary" />
          <span>AuraChat</span>
        </Link>
      </div>

      <div className="w-full max-w-md p-4 z-10">
        {children}
      </div>
    </div>
  );
}
