"use client"

import { motion } from "framer-motion"
import { MessageSquare, Users, Bot, Shield, Zap, BarChart3 } from "lucide-react"

const features = [
  {
    icon: Bot,
    title: "AI-Powered Replies",
    description: "Automate responses with intelligent AI that understands context and maintains your brand voice.",
  },
  {
    icon: MessageSquare,
    title: "Smart Conversations",
    description: "Manage all WhatsApp conversations from a single inbox with AI-assisted responses.",
  },
  {
    icon: Users,
    title: "Contact Management",
    description: "Segment, tag, and manage your contacts with powerful filtering and search capabilities.",
  },
  {
    icon: Shield,
    title: "Isolated Context",
    description: "Each conversation maintains its own memory, ensuring personalized and relevant interactions.",
  },
  {
    icon: Zap,
    title: "Bulk Broadcasts",
    description: "Send personalized messages to thousands of contacts with template variables.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track message volume, response rates, and engagement metrics in real-time.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
            Everything you need to scale
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Powerful features designed to help you automate and grow your WhatsApp communication.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group rounded-xl border bg-white p-6 transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-fog group-hover:bg-ink transition-colors">
                  <Icon className="h-5 w-5 text-ink group-hover:text-white transition-colors" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
