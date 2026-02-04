import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const categories = [
  {
    title: 'Course launch',
    desc: 'Ready-to-use checklists, scripts, and outreach templates.'
  },
  {
    title: 'Sales pages',
    desc: 'Layouts that convert visitors into paying students.'
  },
  {
    title: 'Email sequences',
    desc: 'Welcome, onboarding, and upsell flows to boost revenue.'
  }
];

export default function Templates() {
  return (
    <main className="min-h-screen bg-white">
      <Header theme="light" />

      <section className="pt-28 pb-14 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-sm font-bold uppercase tracking-widest text-[#135bec]">Templates</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mt-3">Pre-built assets to move fast</h1>
          <p className="text-lg text-[#616f89] mt-4 max-w-2xl">
            Launch with confidence using curated templates made for creators.
          </p>
        </div>
      </section>

      <section className="w-full py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-3 gap-6">
          {categories.map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-100 p-6 bg-white shadow-sm">
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-[#616f89]">{item.desc}</p>
              <button className="mt-6 text-sm font-bold text-[#135bec] flex items-center gap-2">
                Browse templates
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
