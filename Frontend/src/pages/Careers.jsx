import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const roles = [
  {
    title: 'Product Designer',
    location: 'Remote · Full-time',
    desc: 'Design intuitive experiences for creators across web and mobile.'
  },
  {
    title: 'Frontend Engineer',
    location: 'Remote · Full-time',
    desc: 'Build fast, accessible interfaces in React and Tailwind.'
  },
  {
    title: 'Growth Marketer',
    location: 'Remote · Full-time',
    desc: 'Own acquisition channels and lifecycle campaigns.'
  }
];

const perks = [
  'Remote-first team with flexible hours',
  'Personal learning budget',
  'Annual company retreat',
  'Inclusive, creator-led culture'
];

export default function Careers() {
  return (
    <main className="min-h-screen bg-white">
      <Header theme="light" />

      <section className="pt-28 pb-14 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-sm font-bold uppercase tracking-widest text-[#135bec]">Careers</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mt-3">Build the future of creator education</h1>
          <p className="text-lg text-[#616f89] mt-4 max-w-2xl">
            Join a team that empowers experts to share knowledge and grow revenue.
          </p>
        </div>
      </section>

      <section className="w-full py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-3 gap-6">
          {roles.map((role) => (
            <div key={role.title} className="rounded-2xl border border-slate-100 p-6 bg-white shadow-sm">
              <h3 className="text-xl font-bold mb-2">{role.title}</h3>
              <p className="text-sm text-[#135bec] font-semibold mb-3">{role.location}</p>
              <p className="text-[#616f89]">{role.desc}</p>
              <button className="mt-6 text-sm font-bold text-[#135bec] flex items-center gap-2">
                View role
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full bg-slate-50 py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-sm font-bold uppercase tracking-widest text-[#135bec]">Perks</p>
          <h2 className="text-3xl sm:text-4xl font-black mt-2">Why you will love working here</h2>
          <ul className="mt-6 grid md:grid-cols-2 gap-4 text-[#616f89]">
            {perks.map((perk) => (
              <li key={perk} className="bg-white border border-slate-100 rounded-xl p-4">{perk}</li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
}
