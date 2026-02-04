import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const faqs = [
  {
    q: 'How do I publish a course?',
    a: 'Upload lessons, set pricing, and launch your checkout in minutes.'
  },
  {
    q: 'Can I migrate existing students?',
    a: 'Yes, you can import students via CSV or integrations.'
  },
  {
    q: 'Do you support subscriptions?',
    a: 'Yes. Offer memberships, bundles, and recurring plans.'
  }
];

export default function HelpCenter() {
  return (
    <main className="min-h-screen bg-white">
      <Header theme="light" />

      <section className="pt-28 pb-14 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-sm font-bold uppercase tracking-widest text-[#135bec]">Help center</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mt-3">Support for every step</h1>
          <p className="text-lg text-[#616f89] mt-4 max-w-2xl">
            Find answers, tutorials, and resources to keep your business moving.
          </p>
          <div className="mt-8">
            <input
              className="w-full max-w-xl border border-slate-200 rounded-xl px-4 py-3"
              placeholder="Search help articles"
            />
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-3 gap-6">
          {faqs.map((item) => (
            <div key={item.q} className="rounded-2xl border border-slate-100 p-6 bg-white shadow-sm">
              <h3 className="text-xl font-bold mb-2">{item.q}</h3>
              <p className="text-[#616f89]">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
