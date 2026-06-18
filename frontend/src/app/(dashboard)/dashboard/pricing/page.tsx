"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Starter",
    price: "₹499",
    description: "Perfect for small businesses just getting started with automation.",
    features: ["1,000 messages/mo", "1 Team Member", "Standard Support", "Basic Analytics"],
    highlighted: false,
  },
  {
    name: "Professional",
    price: "₹1,499",
    description: "Ideal for growing teams needing more volume and advanced AI.",
    features: ["10,000 messages/mo", "5 Team Members", "Priority Support", "Custom AI Prompts", "Advanced Analytics"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "₹3,999",
    description: "For large scale operations requiring maximum performance.",
    features: ["Unlimited messages", "Unlimited Team Members", "24/7 Phone Support", "Dedicated Account Manager", "Custom Integrations"],
    highlighted: false,
  },
]

export default function PricingPage() {
  return (
    <div className="space-y-8">
      <div className="mx-auto max-w-2xl text-center mb-16">
        <h1 className="text-3xl font-semibold sm:text-4xl tracking-tight">Simple, transparent pricing</h1>
        <p className="mt-4 text-muted-foreground">
          Choose the plan that fits your needs. All plans include a 14-day free trial.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <div key={i} className={cn(
            "relative flex flex-col rounded-2xl border bg-white p-8",
            plan.highlighted && "border-ink shadow-lg scale-105 z-10"
          )}>
            {plan.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-ink px-4 py-1 text-xs font-medium text-white">
                Most Popular
              </div>
            )}
            <div className="mb-6">
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
            </div>
            <ul className="mb-8 flex-1 space-y-3">
              {plan.features.map((feature, j) => (
                <li key={j} className="flex items-center gap-3 text-sm">
                  <Check className="h-4 w-4 shrink-0 text-ink" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button variant={plan.highlighted ? "default" : "outline"} className="w-full">
              Get Started
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
