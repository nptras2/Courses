import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const features = [
  {
    icon: 'payments',
    title: 'Global Payments',
    desc: 'Accept cards, wallets, and local methods with automated tax handling.'
  },
  {
    icon: 'analytics',
    title: 'Growth Analytics',
    desc: 'See revenue, cohorts, and course completion rates in real time.'
  },
  {
    icon: 'auto_fix_high',
    title: 'Brand Customization',
    desc: 'Create a storefront that feels premium and uniquely yours.'
  },
  {
    icon: 'support_agent',
    title: 'Student Support',
    desc: 'Built-in helpdesk tools to keep learners engaged and happy.'
  },
  {
    icon: 'bolt',
    title: 'Automation Flows',
    desc: 'Trigger emails, upsells, and certificates without extra tools.'
  },
  {
    icon: 'lock',
    title: 'Secure Delivery',
    desc: 'Protect your content with gated lessons and secure hosting.'
  }
];

const steps = [
  {
    title: 'Build your course',
    desc: 'Upload lessons, worksheets, and quizzes in minutes.'
  },
  {
    title: 'Launch your page',
    desc: 'Use high-converting templates and custom domains.'
  },
  {
    title: 'Scale your revenue',
    desc: 'Bundle offers, run cohorts, and track retention.'
  }
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header theme="light" />

      <section className="pt-28 pb-14 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="flex flex-col gap-6">
              <span className="text-[#135bec] font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
                Features built for creators
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] tracking-tight">
                Everything you need to <span className="text-[#135bec]">launch and grow</span>.
              </h1>
              <p className="text-lg text-[#616f89] max-w-lg leading-relaxed">
                Replace scattered tools with a single platform that helps you build, market, and sell.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-[#135bec] text-white font-bold px-8 py-4 rounded-xl hover:scale-[1.02] transition-transform shadow-xl shadow-[#135bec]/25 flex items-center gap-2 w-full sm:w-auto justify-center">
                  <span className="material-symbols-outlined">auto_awesome</span>
                  Start Free Trial
                </button>
                <button className="bg-white border border-slate-200 font-bold px-8 py-4 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
                  <span className="material-symbols-outlined">school</span>
                  View Courses
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-slate-200">
                <img
                  className="w-full h-full object-cover"
                  alt="Feature dashboard"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7q9q5XLJaayEBcKaSfTsctmPP1fSNkEcgDwyioPr2PDwXePckYu-flLP35nPgjgiipWXYYrbsRZy0y9ICtkdR3RarxWBuljNHpFTopZCMV2FUT-9GUm59EqGIHTjYT98E2NtNxCxn2SH4NndrHu7axdeOBIKW0gFBEGcU9NHFgbOvIRL_-xNEFmq_GsUkPLa1Q33Gc7u76qqTj_XX-HMt_70yeS9Jx04p6Dc3rfsfZs-EpE0ZJdctn0ubwr7I4nyza8IvwsXbjK4"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-slate-100 hidden lg:block">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <span className="material-symbols-outlined">trending_up</span>
                  </div>
                  <div>
                    <p className="text-xs text-[#616f89] font-semibold">Monthly Growth</p>
                    <p className="text-xl font-bold">+38%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Powerful features, simple workflow</h2>
            <p className="text-[#616f89]">All the tools you need to create, sell, and grow in one place.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="p-8 rounded-2xl bg-white border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="size-12 rounded-lg bg-[#135bec]/10 text-[#135bec] flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-[#616f89] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-slate-50 py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-[#135bec]">How it works</p>
              <h2 className="text-3xl sm:text-4xl font-black mt-2 mb-4">Launch your course in three steps</h2>
              <p className="text-[#616f89]">Streamline production, payments, and marketing without juggling multiple tools.</p>
            </div>
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={step.title} className="flex items-start gap-4 p-5 bg-white rounded-xl border border-slate-100 shadow-sm">
                  <div className="size-10 rounded-full bg-[#135bec]/10 text-[#135bec] flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                    <p className="text-[#616f89]">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-16 text-center">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="bg-[#135bec] rounded-3xl p-10 md:p-16 text-white">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">Ready to start building?</h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of creators who trust our platform to power their education business.
            </p>
            <button className="bg-white text-[#135bec] font-bold px-10 py-4 rounded-xl hover:shadow-2xl transition-shadow">
              Get Started Today
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
