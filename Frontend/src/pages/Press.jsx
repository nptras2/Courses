import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const stories = [
  {
    title: 'CreatorPlatform raises Series B to expand global reach',
    date: 'Jan 12, 2026'
  },
  {
    title: 'New analytics suite helps creators improve retention',
    date: 'Dec 03, 2025'
  },
  {
    title: 'CreatorPlatform launches enterprise plan for teams',
    date: 'Oct 18, 2025'
  }
];

const media = [
  { label: 'Press kit', desc: 'Logos, screenshots, and brand guidelines.' },
  { label: 'Leadership bios', desc: 'Backgrounds of our founders and executives.' },
  { label: 'Product overview', desc: 'Highlights of features and platform metrics.' }
];

export default function Press() {
  return (
    <main className="min-h-screen bg-white">
      <Header theme="light" />

      <section className="pt-28 pb-14 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-sm font-bold uppercase tracking-widest text-[#135bec]">Press</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mt-3">News, updates, and media resources</h1>
          <p className="text-lg text-[#616f89] mt-4 max-w-2xl">
            Find the latest announcements and assets for journalists and partners.
          </p>
        </div>
      </section>

      <section className="w-full py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-[#135bec]">Latest news</p>
            <h2 className="text-3xl sm:text-4xl font-black mt-2">Recent announcements</h2>
            <div className="mt-6 space-y-4">
              {stories.map((item) => (
                <div key={item.title} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                  <p className="text-sm text-[#135bec] font-semibold">{item.date}</p>
                  <h3 className="text-xl font-bold mt-2">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-[#135bec]">Media resources</p>
            <h2 className="text-3xl sm:text-4xl font-black mt-2">Downloadable assets</h2>
            <div className="mt-6 space-y-4">
              {media.map((item) => (
                <div key={item.label} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold">{item.label}</h3>
                  <p className="text-[#616f89] mt-2">{item.desc}</p>
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
