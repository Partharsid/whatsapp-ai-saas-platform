"use client"

import { useState } from "react"
import Link from "next/link"
import { Sparkles, MessageSquare, Users, Bot, Shield, Zap, BarChart3, Check, ArrowRight, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Features", link: "#features" },
  { name: "Pricing", link: "#pricing" },
  { name: "Contact", link: "#contact" },
]

const features = [
  { icon: Bot, title: "AI-Powered Replies", desc: "Smart, context-aware responses that learn from your brand voice and customer history." },
  { icon: Users, title: "Contact Management", desc: "Organize leads and customers with tags, groups, and seamless WhatsApp sync." },
  { icon: MessageSquare, title: "Conversation Inbox", desc: "Unified inbox to monitor, intervene, and take over AI conversations anytime." },
  { icon: Shield, title: "Isolated Context", desc: "Per-contact memory ensures every customer gets a personalized experience." },
  { icon: Zap, title: "Bulk Broadcasts", desc: "Send templated messages to thousands of contacts with a single click." },
  { icon: BarChart3, title: "Analytics Dashboard", desc: "Track message volume, response rates, and AI performance in real time." },
]

const plans = [
  {
    name: "Starter", price: "₹499", desc: "For small businesses just getting started.",
    features: ["1,000 messages/mo", "1 Team Member", "Standard Support", "Basic Analytics"],
  },
  {
    name: "Professional", price: "₹1,499", desc: "For growing teams needing more volume.",
    features: ["10,000 messages/mo", "5 Team Members", "Priority Support", "Custom AI Prompts", "Advanced Analytics"],
    popular: true,
  },
  {
    name: "Enterprise", price: "₹3,999", desc: "For large scale operations.",
    features: ["Unlimited messages", "Unlimited Team Members", "24/7 Support", "Dedicated Manager", "Custom Integrations"],
  },
]

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white text-ink">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-lg">Steep</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.name} href={item.link} className="px-4 py-2 text-sm text-ash hover:text-ink transition-colors rounded-full hover:bg-fog">
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="text-sm text-ash hover:text-ink font-medium px-4 py-2">Login</Link>
            <Link href="/signup" className="bg-ink text-white text-sm font-medium px-5 py-2 rounded-full hover:opacity-90 transition-opacity">Get Started</Link>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 hover:bg-fog rounded-lg">
            <svg className="w-5 h-5 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t bg-white px-6 py-4 space-y-3">
            {navItems.map((item) => (
              <Link key={item.name} href={item.link} onClick={() => setMenuOpen(false)}
                className="block py-2 text-sm text-ash hover:text-ink">{item.name}</Link>
            ))}
            <div className="pt-3 border-t space-y-2">
              <Link href="/login" onClick={() => setMenuOpen(false)}
                className="block w-full text-center py-2 text-sm text-ink border rounded-full">Login</Link>
              <Link href="/signup" onClick={() => setMenuOpen(false)}
                className="block w-full text-center py-2 text-sm text-white bg-ink rounded-full">Get Started</Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-fog to-white pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-32 md:pt-32 md:pb-40">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fog text-sm text-ash mb-8 border">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Introducing Steep AI</span>
              <ArrowRight className="h-3 w-3" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-ink mb-6 leading-tight">
              AI-Powered WhatsApp Automation
            </h1>
            <p className="text-lg md:text-xl text-ash max-w-xl mx-auto mb-10 leading-relaxed">
              Turn every conversation into a conversion with intelligent, isolated WhatsApp automation. Connect once, automate forever.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup" className="bg-ink text-white px-8 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity w-full sm:w-auto text-center">
                Start Free Trial
              </Link>
              <Link href="#features" className="border border-ash/30 text-ink px-8 py-3 rounded-full text-sm font-medium hover:bg-fog transition-colors w-full sm:w-auto text-center">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Everything you need to scale</h2>
            <p className="text-ash max-w-xl mx-auto">Powerful features designed for modern customer communication at scale.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <div key={i} className="group p-6 rounded-2xl border bg-white hover:shadow-md hover:border-ink/20 transition-all">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-fog mb-4 group-hover:bg-ink group-hover:text-white transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-sm text-ash leading-relaxed">{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 md:py-32 bg-fog">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Simple, transparent pricing</h2>
            <p className="text-ash max-w-xl mx-auto">Choose the plan that fits your needs. All plans include a 14-day free trial.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <div key={i} className={`relative flex flex-col rounded-2xl border bg-white p-8 ${plan.popular ? 'border-ink shadow-lg scale-105 z-10' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-ink px-4 py-1 text-xs font-medium text-white">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  <p className="mt-2 text-sm text-ash">{plan.desc}</p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-sm text-ash">/month</span>
                  </div>
                </div>
                <ul className="mb-8 flex-1 space-y-3">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm">
                      <Check className="h-4 w-4 shrink-0 text-ink" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className={`w-full text-center py-2.5 rounded-full text-sm font-medium transition-all ${plan.popular ? 'bg-ink text-white hover:opacity-90' : 'border border-ash/30 text-ink hover:bg-fog'}`}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-3xl bg-ink p-12 md:p-20 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to transform your WhatsApp?</h2>
            <p className="text-white/70 max-w-lg mx-auto mb-8">Join thousands of businesses using Steep to automate their customer conversations at scale.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup" className="bg-white text-ink px-8 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity w-full sm:w-auto text-center">
                Start Free Trial
              </Link>
              <Link href="mailto:hello@steep.ai" className="border border-white/30 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-white/10 transition-colors w-full sm:w-auto text-center flex items-center justify-center gap-2">
                <Mail className="h-4 w-4" />
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-ink">
                <Sparkles className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="font-semibold">Steep</span>
            </div>
            <nav className="flex items-center gap-6 text-sm text-ash">
              <Link href="#features" className="hover:text-ink transition-colors">Features</Link>
              <Link href="#pricing" className="hover:text-ink transition-colors">Pricing</Link>
              <Link href="#contact" className="hover:text-ink transition-colors">Contact</Link>
            </nav>
            <p className="text-sm text-ash">© 2026 Steep. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
