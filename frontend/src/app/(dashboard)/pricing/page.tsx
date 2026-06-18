'use client';
import { useState } from 'react';

const plans = [
  {
    name: 'Starter',
    price: '₹499',
    period: '/month',
    features: [
      '1 WhatsApp Number',
      '1,000 Messages/month',
      'AI Auto-Replies (Free Models)',
      '200 Contacts',
      '1 Google Sheet Logging',
      '7 Days Chat Memory'
    ],
    cta: 'Choose Starter',
    popular: false,
    planId: 'plan_starter_id'
  },
  {
    name: 'Professional',
    price: '₹1,499',
    period: '/month',
    features: [
      '3 WhatsApp Numbers',
      '10,000 Messages/month',
      'All AI Models Available',
      'Custom OpenRouter Key',
      '2,000 Contacts',
      '500 Broadcasts/day',
      '30 Days Chat Memory'
    ],
    cta: 'Get Professional',
    popular: true,
    planId: 'plan_pro_id'
  },
  {
    name: 'Enterprise',
    price: '₹3,999',
    period: '/month',
    features: [
      'Unlimited WhatsApp Numbers',
      'Unlimited Messages',
      'All AI Models Available',
      'Custom OpenRouter Key',
      'Unlimited Contacts',
      'Unlimited Broadcasts',
      '90 Days Chat Memory'
    ],
    cta: 'Contact Sales',
    popular: false,
    planId: 'plan_enterprise_id'
  }
];

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (planId: string) => {
    setLoading(planId);
    // Simulate Razorpay checkout
    setTimeout(() => {
      console.log(`Initiating Razorpay for ${planId}`);
      setLoading(null);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-extrabold text-white mb-4">Simple, transparent pricing</h1>
        <p className="text-xl text-slate-400">
          Unlock the full power of AI WhatsApp automation. Choose the plan that best fits your business needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div 
            key={plan.name} 
            className={`relative rounded-3xl p-8 bg-slate-900 border ${plan.popular ? 'border-indigo-500 shadow-2xl shadow-indigo-500/20 transform md:-translate-y-4' : 'border-slate-800'}`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                  Most Popular
                </span>
              </div>
            )}
            
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="flex items-baseline text-white">
                <span className="text-5xl font-extrabold tracking-tight">{plan.price}</span>
                <span className="text-slate-400 ml-1 text-xl font-medium">{plan.period}</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <svg className="h-6 w-6 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-slate-300">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe(plan.planId)}
              disabled={loading === plan.planId}
              className={`w-full py-4 rounded-xl font-bold transition-all ${
                plan.popular 
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/30' 
                  : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
              }`}
            >
              {loading === plan.planId ? 'Processing...' : plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
