import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const articles = [
  {
    title: 'Launch week checklist',
    date: 'Jan 12, 2026',
    category: 'Launch'
  },
  {
    title: 'Email sequences that convert',
    date: 'Dec 22, 2025',
    category: 'Marketing'
  },
  {
    title: 'Retention tactics for cohorts',
    date: 'Nov 30, 2025',
    category: 'Engagement'
  }
];

export default function Blog() {
  return (
    <main className="min-h-screen bg-white">
      <Header theme="light" />

      <section className="pt-28 pb-14 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-sm font-bold uppercase tracking-widest text-[#135bec]">Blog</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mt-3">Insights for creator growth</h1>
          <p className="text-lg text-[#616f89] mt-4 max-w-2xl">
            Stories, strategies, and playbooks from our creator community.
          </p>
        </div>
      </section>

      <section className="w-full py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div key={article.title} className="rounded-2xl border border-slate-100 p-6 bg-white shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-[#135bec]">{article.category}</p>
              <h3 className="text-xl font-bold mt-3">{article.title}</h3>
              <p className="text-sm text-[#616f89] mt-2">{article.date}</p>
              <button className="mt-6 text-sm font-bold text-[#135bec] flex items-center gap-2">
                Read article
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
