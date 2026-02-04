import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const items = [
  {
    title: 'Account security',
    desc: 'Enable two-factor authentication and monitor login activity.'
  },
  {
    title: 'Data handling',
    desc: 'We store and process data with encryption and audit logs.'
  },
  {
    title: 'Compliance',
    desc: 'We follow industry standards for privacy and security.'
  }
];

export default function Security() {
  return (
    <main className="min-h-screen bg-white">
      <Header theme="light" />

      <section className="pt-28 pb-10 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-sm font-bold uppercase tracking-widest text-[#135bec]">Security</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mt-3">Keeping your data safe</h1>
          <p className="text-lg text-[#616f89] mt-4 max-w-2xl">
            Security is built into every layer of CreatorPlatform.
          </p>
        </div>
      </section>

      <section className="w-full py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-3 gap-6">
          {items.map((item) => (
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
