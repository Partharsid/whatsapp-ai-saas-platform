"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-ink to-ink/90 px-8 py-16 text-center text-white md:px-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_60%)]" />
          <div className="relative z-10">
            <h2 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
              Ready to transform your WhatsApp?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/70">
              Join thousands of businesses using Steep to automate conversations and drive conversions.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="gap-2 bg-white text-ink hover:bg-white/90">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
