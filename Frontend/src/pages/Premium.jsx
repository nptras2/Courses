import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const plans = [
  {
    name: 'Starter',
    price: '$29',
    period: '/month',
    desc: 'Everything you need to publish your first course.',
    features: ['Unlimited students', '1 course product', 'Basic analytics', 'Email support']
  },
  {
    name: 'Growth',
    price: '$79',
    period: '/month',
    desc: 'Best for growing creators and small teams.',
    features: ['Unlimited courses', 'Advanced analytics', 'Custom domain', 'Automations'],
    highlight: true
  },
  {
    name: 'Scale',
    price: '$199',
    period: '/month',
    desc: 'For established businesses running cohorts and teams.',
    features: ['Team seats', 'Priority support', 'API access', 'Revenue dashboards']
  }
];

const faqs = [
  {
    q: 'Do I need a credit card to start?',
    a: 'No. You can start your 14-day free trial without a credit card.'
  },
  {
    q: 'Can I change plans anytime?',
    a: 'Yes, you can upgrade or downgrade your plan at any time.'
  },
  {
    q: 'What payment methods are supported?',
    a: 'We support major credit cards and regional payment methods.'
  }
];

export default function PricingPage() {
  const plansRef = useRef(null);
  const scrollPlans = (direction) => {
    if (!plansRef.current) return;
    const offset = direction === 'next' ? 360 : -360;
    plansRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-white">
      <Header theme="light" />

      <section className="pt-28 pb-14 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-[#135bec]">Pricing</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mt-3">Plans that scale with you</h1>
          <p className="text-lg text-[#616f89] max-w-2xl mx-auto mt-4">
            Start free and move up as your course business grows.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-[#135bec] text-white font-bold px-8 py-4 rounded-xl hover:shadow-xl shadow-[#135bec]/25">
              Start Free Trial
            </button>
            <button className="bg-white border border-slate-200 font-bold px-8 py-4 rounded-xl hover:bg-slate-50">
              Talk to Sales
            </button>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-[#135bec]">Plans</p>
              <h2 className="text-2xl sm:text-3xl font-black mt-2">Choose the plan that fits</h2>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollPlans('prev')}
                className="size-11 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollPlans('next')}
                className="size-11 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div ref={plansRef} className="flex gap-6 overflow-x-auto pb-4 scroll-smooth hide-scrollbar">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`min-w-[280px] sm:min-w-[320px] lg:min-w-0 lg:flex-1 rounded-2xl border p-8 bg-white shadow-sm ${
                  plan.highlight ? 'border-[#135bec] shadow-lg shadow-[#135bec]/15' : 'border-slate-100'
                }`}
              >
                {plan.highlight && (
                  <span className="text-xs font-bold uppercase tracking-widest text-[#135bec]">Most popular</span>
                )}
                <h3 className="text-2xl font-black mt-3">{plan.name}</h3>
                <p className="text-[#616f89] mt-2">{plan.desc}</p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-4xl font-black text-[#135bec]">{plan.price}</span>
                  <span className="text-[#616f89]">{plan.period}</span>
                </div>
                <button
                  className={`mt-6 w-full font-bold px-6 py-3 rounded-xl ${
                    plan.highlight
                      ? 'bg-[#135bec] text-white hover:bg-[#0f4ec9]'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Choose plan
                </button>
                <ul className="mt-6 space-y-3 text-sm text-[#616f89]">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#135bec] mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-slate-50 py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-[#135bec]">FAQs</p>
              <h2 className="text-3xl sm:text-4xl font-black mt-2">Common questions</h2>
              <p className="text-[#616f89] mt-4">Still unsure? Reach out and we will help you pick the right plan.</p>
            </div>
            <div className="space-y-4">
              {faqs.map((item) => (
                <div key={item.q} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                  <h3 className="font-bold text-lg mb-2">{item.q}</h3>
                  <p className="text-[#616f89]">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
