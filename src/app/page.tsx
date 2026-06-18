"use client";

import { Hero } from "@/components/hero";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { BentoGrid } from "@/components/ui/bento-grid";
import { Pricing } from "@/components/pricing-table";
import Footer from "@/components/animated-footer";
import { MessageSquare, Zap, Shield, Sparkles, Activity, Layers } from "lucide-react";

export default function Home() {
  const navItems = [
    { name: "Features", url: "#features", icon: Sparkles },
    { name: "Pricing", url: "#pricing", icon: Zap },
    { name: "Login", url: "/login", icon: Shield },
  ];

  const bentoItems = [
    {
      title: "AI Auto-Replies",
      description: "Instantly respond to customer inquiries with intelligent AI models.",
      icon: <MessageSquare className="w-4 h-4 text-primary" />,
      tags: ["AI", "Automation"],
      colSpan: 2,
    },
    {
      title: "Real-time Dashboard",
      description: "Monitor live conversations and take over when needed.",
      icon: <Activity className="w-4 h-4 text-emerald-500" />,
      tags: ["Analytics", "Live"],
    },
    {
      title: "Seamless Integration",
      description: "Connect WhatsApp in seconds by scanning a simple QR code.",
      icon: <Layers className="w-4 h-4 text-purple-500" />,
      tags: ["Setup", "WhatsApp"],
      colSpan: 3,
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: 0,
      billingPeriod: "per month",
      features: [
        { text: "1 WhatsApp Connection" },
        { text: "100 AI Auto-replies/month" },
        { text: "Standard AI Prompt" },
        { text: "Basic Support" }
      ],
      description: "Perfect for testing the waters",
      buttonText: "Start for Free",
    },
    {
      name: "Pro",
      price: 29,
      billingPeriod: "per month",
      features: [
        { text: "3 WhatsApp Connections" },
        { text: "5,000 AI Auto-replies/month" },
        { text: "Custom AI Personality Tuning" },
        { text: "Advanced Analytics" },
        { text: "Priority Support" }
      ],
      description: "For growing businesses",
      buttonText: "Upgrade to Pro",
      isPrimary: true,
    },
    {
      name: "Enterprise",
      price: 99,
      billingPeriod: "per month",
      features: [
        { text: "Unlimited Connections" },
        { text: "Unlimited Replies" },
        { text: "Dedicated Account Manager" },
        { text: "Full API Access" },
        { text: "White-glove Onboarding" }
      ],
      description: "For large scale operations",
      buttonText: "Contact Sales",
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black text-white selection:bg-primary/30">
      <NavBar items={navItems} />
      
      <main className="flex-1">
        <Hero 
          content={{
            title: "Automate your WhatsApp presence with",
            titleHighlight: "elegant AI.",
            description: "AuraChat connects directly to your WhatsApp to deliver instant, intelligent, and context-aware responses to your customers.",
            primaryAction: {
              href: "/signup",
              text: "Get Started Free"
            },
            secondaryAction: {
              href: "#features",
              text: "Explore Features"
            }
          }}
          pill={{
            text: "AuraChat 2.0 is live!",
            variant: "outline"
          }}
        />

        <section id="features" className="py-24 px-4 bg-black/50">
          <div className="max-w-7xl mx-auto mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground text-lg">Everything you need to scale your customer support effortlessly.</p>
          </div>
          <BentoGrid items={bentoItems} />
        </section>

        <section id="pricing" className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <Pricing 
              tiers={pricingPlans} 
              title="Simple, transparent pricing" 
              subtitle="Choose the perfect plan for your business."
            />
          </div>
        </section>
      </main>
      <Footer 
        leftLinks={[{ href: "/about", label: "About" }, { href: "/privacy", label: "Privacy" }]}
        rightLinks={[{ href: "/twitter", label: "Twitter" }, { href: "/github", label: "GitHub" }]}
        copyrightText="© 2026 AuraChat. All rights reserved."
      />
    </div>
  );
}
