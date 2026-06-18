"use client"

import { useState } from "react"
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar"
import { HeroSection } from "@/components/ui/hero-section"
import { FeaturesSection } from "@/components/ui/features-section"
import { PricingSection } from "@/components/ui/pricing-section"
import { CTASection } from "@/components/ui/cta-section"
import FooterSection from "@/components/ui/footer-section"
import { Sparkles } from "lucide-react"

const navItems = [
  { name: "Features", link: "#features" },
  { name: "Pricing", link: "#pricing" },
  { name: "Contact", link: "#contact" },
]

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-pure-white text-ink selection:bg-apricot-wash selection:text-ink">
      <div className="relative w-full">
        <Navbar>
          <NavBody>
            <NavbarLogo />
            <NavItems items={navItems} />
            <div className="flex items-center gap-4">
              <NavbarButton variant="secondary" href="/login">Login</NavbarButton>
              <NavbarButton variant="primary" href="/signup">Get Started</NavbarButton>
            </div>
          </NavBody>
          <MobileNav>
            <MobileNavHeader>
              <NavbarLogo />
              <MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
            </MobileNavHeader>
            <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
              {navItems.map((item, idx) => (
                <a key={`mobile-link-${idx}`} href={item.link} onClick={() => setIsMobileMenuOpen(false)}
                  className="relative text-neutral-600 dark:text-neutral-300">
                  <span className="block">{item.name}</span>
                </a>
              ))}
              <div className="flex w-full flex-col gap-4">
                <NavbarButton onClick={() => setIsMobileMenuOpen(false)} href="/login">Login</NavbarButton>
                <NavbarButton onClick={() => setIsMobileMenuOpen(false)} href="/signup">Get Started</NavbarButton>
              </div>
            </MobileNavMenu>
          </MobileNav>
        </Navbar>
      </div>

      <HeroSection
        badge={{
          text: "Introducing Steep AI",
          action: { text: "Learn more", href: "#features" },
        }}
        title="AI-Powered WhatsApp Automation"
        description="Turn every conversation into a conversion with intelligent, isolated WhatsApp automation. Connect once, automate forever."
        actions={[
          { text: "Start Free Trial", href: "/signup", variant: "default" },
          { text: "Learn More", href: "#features", variant: "glow" },
        ]}
        image={{
          light: "/hero-light.png",
          dark: "/hero-dark.png",
          alt: "Steep Dashboard Preview",
        }}
      />

      <FeaturesSection />
      <PricingSection />
      <CTASection />
      <FooterSection />
    </div>
  )
}
