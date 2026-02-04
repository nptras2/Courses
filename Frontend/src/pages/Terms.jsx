import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const terms = [
  {
    title: 'Using the service',
    desc: 'Follow all applicable laws and keep your account credentials secure.'
  },
  {
    title: 'Billing',
    desc: 'Plans renew automatically unless canceled prior to the renewal date.'
  },
  {
    title: 'Content ownership',
    desc: 'You own your content; we only host and deliver it to students.'
  }
];

export default function Terms() {
  return (
    <main className="min-h-screen bg-white">
      <Header theme="light" />

      <section className="pt-28 pb-10 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-sm font-bold uppercase tracking-widest text-[#135bec]">Terms</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mt-3">Terms of service</h1>
          <p className="text-lg text-[#616f89] mt-4 max-w-2xl">
            A simple overview of the rules for using CreatorPlatform.
          </p>
        </div>
      </section>

      <section className="w-full py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-3 gap-6">
          {terms.map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-100 p-6 bg-white shadow-sm">
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-[#616f89]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
