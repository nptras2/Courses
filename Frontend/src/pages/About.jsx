import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const highlights = [
  {
    title: 'Creator-first platform',
    desc: 'We obsess over making course creation simple, fast, and profitable.'
  },
  {
    title: 'Built for growth',
    desc: 'From your first sale to scaling teams, every tool is designed to help you expand.'
  },
  {
    title: 'Trusted worldwide',
    desc: 'Thousands of educators and experts rely on CreatorPlatform every day.'
  }
];

const values = [
  { title: 'Clarity', desc: 'We simplify complex workflows into clear, repeatable steps.' },
  { title: 'Momentum', desc: 'We build tools that help creators move faster and ship confidently.' },
  { title: 'Care', desc: 'We care about outcomes, not just features.' }
];

export default function About() {
  return (
    <main className="min-h-screen bg-white">
      <Header theme="light" />

      <section className="pt-28 pb-14 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-[#135bec]">About us</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mt-3">We help experts become educators</h1>
            <p className="text-lg text-[#616f89] mt-4">
              CreatorPlatform is the all-in-one home for launching, selling, and scaling online courses.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-3 gap-6">
          {highlights.map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-100 p-6 bg-white shadow-sm">
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-[#616f89]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full bg-slate-50 py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-[#135bec]">Our values</p>
            <h2 className="text-3xl sm:text-4xl font-black mt-2">What we stand for</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {values.map((value) => (
              <div key={value.title} className="rounded-2xl border border-slate-100 bg-white p-6">
                <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                <p className="text-[#616f89]">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
