"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { api } from "@/lib/api"
import { toast } from "sonner"
import { Sparkles, Eye, EyeOff } from "lucide-react"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await api.post("/auth/register", { name, email, password })
      login(res.token, res.user)
      toast.success("Account created successfully!")
    } catch (err: any) {
      toast.error(err.message || "Failed to create account")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-fog">
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-ink to-ink/90 items-center justify-center p-12">
        <div className="max-w-md text-center text-white">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
            <Sparkles className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-semibold mb-4">Start Automating Today</h2>
          <p className="text-white/70 leading-relaxed">
            Join thousands of businesses using Steep to transform their WhatsApp communication.
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-12">
        <div className="mx-auto w-full max-w-sm">
          <Link href="/" className="flex items-center gap-2 mb-10">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-semibold">Steep</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight">Create your account</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-ink underline underline-offset-4 hover:text-ink/80">
                Sign in
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1.5">Full Name</label>
              <input id="name" type="text" autoComplete="name" required
                value={name} onChange={(e) => setName(e.target.value)}
                className="block w-full h-11 rounded-lg border border-input bg-white px-4 text-sm outline-none focus:border-ink transition-colors"
                placeholder="Jane Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1.5">Email address</label>
              <input id="email" type="email" autoComplete="email" required
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="block w-full h-11 rounded-lg border border-input bg-white px-4 text-sm outline-none focus:border-ink transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <input id="password" type={showPassword ? "text" : "password"} autoComplete="new-password" required
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  className="block w-full h-11 rounded-lg border border-input bg-white px-4 pr-10 text-sm outline-none focus:border-ink transition-colors"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-ink">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full h-11 rounded-lg bg-ink text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-70">
              {loading ? "Signing up..." : "Sign up"}
            </button>

            <p className="text-xs text-muted-foreground text-center">
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
