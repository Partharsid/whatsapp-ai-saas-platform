"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import FloatingCard from "./FloatingCard";

export default function HeroSection() {
  return (
    <section className="relative w-full max-w-[1200px] mx-auto pt-32 pb-40 px-6 overflow-hidden md:overflow-visible">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-apricot-wash/30 rounded-full blur-[100px] -z-10" />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-[800px] mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-signifier text-[44px] md:text-[64px] lg:text-[90px] leading-[1.1] tracking-[-1.6px] lg:tracking-[-2.25px] text-ink mb-6"
        >
          Turn every conversation into a conversion.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="font-sohne text-[18px] text-ash max-w-[500px] mb-10 leading-[1.35] tracking-[-0.16px]"
        >
          Automate your WhatsApp with intelligent, isolated AI that feels exactly like your best human agent.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="flex items-center gap-4"
        >
          <Link 
            href="/signup" 
            className="h-[44px] px-6 bg-ink text-pure-white text-[15px] font-sohne font-[450] rounded-buttons flex items-center justify-center tracking-[-0.009em] hover:opacity-90 transition-opacity"
          >
            Start automating
          </Link>
          <Link 
            href="#demo" 
            className="h-[44px] px-4 text-ink text-[15px] font-sohne font-[450] flex items-center justify-center tracking-[-0.009em] hover:text-graphite transition-colors"
          >
            See how it works
          </Link>
        </motion.div>
      </div>

      {/* Floating Product Cards */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none z-20">
        {/* Top Left: Chat bubble preview */}
        <FloatingCard 
          className="top-[10%] left-[5%] w-[280px]" 
          delay={0.2} 
          duration={5}
          badgeInitials="AI"
          badgeColor="bg-[#d3e3fc]" // Sky Wash
        >
          <div className="space-y-3">
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-avatars bg-fog flex-shrink-0" />
              <div className="bg-fog p-3 rounded-2xl-2 rounded-tl-sm text-[14px] text-ash">
                Do you have the Enterprise plan available?
              </div>
            </div>
            <div className="flex gap-2 flex-row-reverse">
              <div className="bg-sky-wash p-3 rounded-2xl-2 rounded-tr-sm text-[14px] text-ink">
                Yes! Our Enterprise plan includes custom models and unlimited contacts.
              </div>
            </div>
          </div>
        </FloatingCard>

        {/* Top Right: Stat Block */}
        <FloatingCard 
          className="top-[15%] right-[5%] w-[200px]" 
          delay={0.8} 
          duration={4.5}
        >
          <div className="text-[13px] text-graphite mb-1 font-sohne font-[480]">Active Conversations</div>
          <div className="flex items-baseline gap-2">
            <div className="font-signifier text-[44px] text-ink">1,482</div>
            <div className="text-[12px] text-[#10b981] flex items-center">
              <svg className="w-3 h-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
              12%
            </div>
          </div>
        </FloatingCard>

        {/* Bottom Left: Mini line chart */}
        <FloatingCard 
          className="bottom-[15%] left-[10%] w-[220px]" 
          delay={1.5} 
          duration={6}
        >
          <div className="text-[13px] text-graphite mb-3 font-sohne font-[480]">Response Time</div>
          <div className="h-[60px] flex items-end gap-1.5">
            {[30, 40, 25, 50, 45, 60, 20].map((h, i) => (
              <div key={i} className="flex-1 bg-sky-wash rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </FloatingCard>

        {/* Bottom Right: Donut Chart Warm */}
        <FloatingCard 
          className="bottom-[10%] right-[10%] w-[240px] bg-apricot-wash" 
          delay={0.5} 
          duration={5.5}
        >
          <div className="flex items-center gap-4">
            <div className="w-[60px] h-[60px] rounded-full border-[6px] border-pure-white border-t-rust border-l-rust transform -rotate-45" />
            <div>
              <div className="font-sohne font-[500] text-[22px] text-ink">84%</div>
              <div className="text-[14px] text-ash">Automated</div>
            </div>
          </div>
        </FloatingCard>
      </div>
    </section>
  );
}
