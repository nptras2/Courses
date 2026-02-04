import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const resources = [
  {
    title: 'Getting started',
    desc: 'Launch your first course in a weekend.'
  },
  {
    title: 'Marketing toolkit',
    desc: 'Promote your course with emails, ads, and partnerships.'
  },
  {
    title: 'Community playbook',
    desc: 'Keep students engaged and subscribed.'
  }
];

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header theme="light" />

      <section className="pt-28 pb-14 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-sm font-bold uppercase tracking-widest text-[#135bec]">Resources</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mt-3">Resources to help you grow</h1>
          <p className="text-lg text-[#616f89] mt-4 max-w-2xl">
            Curated guides, templates, and playbooks built for creators.
          </p>
        </div>
      </section>

      <section className="w-full py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-3 gap-6">
          {resources.map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-100 p-6 bg-white shadow-sm">
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-[#616f89]">{item.desc}</p>
              <button className="mt-6 text-sm font-bold text-[#135bec] flex items-center gap-2">
                Explore
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
