"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.token, res.user);
      toast.success("Welcome back!");
    } catch (err: any) {
      toast.error(err.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-fog flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-apricot-wash selection:text-ink">
      <div className="sm:mx-auto sm:w-full sm:max-w-[440px]">
        <Link href="/" className="font-signifier text-[22px] font-medium tracking-tight text-ink flex justify-center mb-8">
          Steep
        </Link>
        <h2 className="text-center font-signifier text-[44px] text-ink leading-[1.1] tracking-[-0.66px]">
          Welcome back
        </h2>
        <p className="mt-4 text-center font-sohne text-[16px] text-ash tracking-[-0.14px]">
          Don't have an account?{" "}
          <Link href="/signup" className="font-[500] text-ink hover:text-graphite transition-colors underline decoration-dove underline-offset-4">
            Sign up
          </Link>
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[440px]">
        <div className="bg-pure-white py-10 px-8 shadow-subtle rounded-cards sm:px-12">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block font-sohne text-[14px] font-[500] text-ink mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full h-[44px] px-4 rounded-inputs border border-dove focus:outline-none focus:border-ink font-sohne text-[15px] text-ink placeholder-dove transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block font-sohne text-[14px] font-[500] text-ink mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full h-[44px] px-4 rounded-inputs border border-dove focus:outline-none focus:border-ink font-sohne text-[15px] text-ink placeholder-dove transition-colors"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-ink border-dove rounded-[4px] focus:ring-ink"
                />
                <label htmlFor="remember-me" className="ml-2 block font-sohne text-[14px] text-ash">
                  Remember me
                </label>
              </div>

              <div className="text-[14px]">
                <a href="#" className="font-sohne font-[500] text-ink hover:text-graphite">
                  Forgot password?
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-[44px] flex justify-center items-center rounded-buttons bg-ink text-pure-white font-sohne text-[15px] font-[450] tracking-[-0.009em] hover:opacity-90 transition-opacity disabled:opacity-70"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
