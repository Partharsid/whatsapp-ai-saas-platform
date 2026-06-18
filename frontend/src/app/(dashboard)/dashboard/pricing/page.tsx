import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="font-signifier text-[44px] text-ink leading-[1.1] tracking-[-0.66px]">Simple, transparent pricing</h1>
        <p className="font-sohne text-[16px] text-ash leading-[1.38] mt-4">
          Choose the plan that fits your needs. All plans include 14-day free trial.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {[
          { 
            name: "Starter", 
            price: "₹499", 
            desc: "Perfect for small businesses just getting started with automation.",
            features: ["1,000 messages/mo", "1 Team Member", "Standard Support"],
            highlighted: false 
          },
          { 
            name: "Professional", 
            price: "₹1,499", 
            desc: "Ideal for growing teams needing more volume and advanced AI.",
            features: ["10,000 messages/mo", "5 Team Members", "Priority Support", "Custom AI Prompts"],
            highlighted: true 
          },
          { 
            name: "Enterprise", 
            price: "₹3,999", 
            desc: "For large scale operations requiring maximum performance.",
            features: ["Unlimited messages", "Unlimited Team Members", "24/7 Phone Support", "Dedicated Account Manager"],
            highlighted: false 
          }
        ].map((plan, i) => (
          <Card key={i} className={`relative flex flex-col ${plan.highlighted ? "border-2 border-ink shadow-[0_8px_30px_rgb(0,0,0,0.08)] scale-105 z-10" : "border border-dove/30 mt-4 md:mt-0"}`}>
            {plan.highlighted && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-ink text-pure-white font-sohne text-[12px] font-[500] px-3 py-1 rounded-full uppercase tracking-[0.5px]">
                Most Popular
              </div>
            )}
            <CardHeader className="pb-8">
              <CardTitle className="text-[22px]">{plan.name}</CardTitle>
              <CardDescription className="mt-2 text-[15px]">{plan.desc}</CardDescription>
              <div className="mt-6">
                <span className="font-signifier text-[44px] text-ink leading-none">{plan.price}</span>
                <span className="font-sohne text-[16px] text-ash">/mo</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-4">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 font-sohne text-[15px] text-graphite">
                    <svg className="w-5 h-5 text-ink shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="pt-8">
              <Button className="w-full" variant={plan.highlighted ? "default" : "outline"}>
                Get Started
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
