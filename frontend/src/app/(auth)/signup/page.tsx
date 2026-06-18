"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { toast } from "sonner";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/register", { name, email, password });
      login(res.token, res.user);
      toast.success("Account created successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to create account");
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
          Create your account
        </h2>
        <p className="mt-4 text-center font-sohne text-[16px] text-ash tracking-[-0.14px]">
          Already have an account?{" "}
          <Link href="/login" className="font-[500] text-ink hover:text-graphite transition-colors underline decoration-dove underline-offset-4">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[440px]">
        <div className="bg-pure-white py-10 px-8 shadow-subtle rounded-cards sm:px-12">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block font-sohne text-[14px] font-[500] text-ink mb-2">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full h-[44px] px-4 rounded-inputs border border-dove focus:outline-none focus:border-ink font-sohne text-[15px] text-ink placeholder-dove transition-colors"
                placeholder="Jane Doe"
              />
            </div>

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
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full h-[44px] px-4 rounded-inputs border border-dove focus:outline-none focus:border-ink font-sohne text-[15px] text-ink placeholder-dove transition-colors"
                placeholder="••••••••"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-[44px] flex justify-center items-center rounded-buttons bg-ink text-pure-white font-sohne text-[15px] font-[450] tracking-[-0.009em] hover:opacity-90 transition-opacity disabled:opacity-70"
              >
                {loading ? "Signing up..." : "Sign up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
