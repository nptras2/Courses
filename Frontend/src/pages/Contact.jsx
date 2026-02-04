import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const methods = [
  {
    title: 'Sales & Partnerships',
    desc: 'Let us know about collaborations or enterprise plans.',
    action: 'sales@creatorplatform.com'
  },
  {
    title: 'Support',
    desc: 'Need help with your account or course setup?',
    action: 'support@creatorplatform.com'
  },
  {
    title: 'Press',
    desc: 'Media inquiries and interviews.',
    action: 'press@creatorplatform.com'
  }
];

export default function Contact() {
  return (
    <main className="min-h-screen bg-white">
      <Header theme="light" />

      <section className="pt-28 pb-14 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-sm font-bold uppercase tracking-widest text-[#135bec]">Contact</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mt-3">Let us know how we can help</h1>
          <p className="text-lg text-[#616f89] mt-4 max-w-2xl">
            Reach out for support, partnerships, or any questions about our platform.
          </p>
        </div>
      </section>

      <section className="w-full py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-3 gap-6">
          {methods.map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-100 p-6 bg-white shadow-sm">
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-[#616f89] mb-4">{item.desc}</p>
              <p className="text-sm font-semibold text-[#135bec]">{item.action}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full bg-slate-50 py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-[#135bec]">Send a message</p>
              <h2 className="text-3xl sm:text-4xl font-black mt-2">We will get back within 24 hours</h2>
              <p className="text-[#616f89] mt-4">Fill out the form and our team will reach out shortly.</p>
            </div>
            <form className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <div className="grid gap-4">
                <input className="w-full border border-slate-200 rounded-xl px-4 py-3" placeholder="Full name" />
                <input className="w-full border border-slate-200 rounded-xl px-4 py-3" placeholder="Email address" />
                <textarea className="w-full border border-slate-200 rounded-xl px-4 py-3 min-h-[140px]" placeholder="Tell us about your request"></textarea>
                <button type="button" className="bg-[#135bec] text-white font-bold px-6 py-3 rounded-xl">Send message</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
