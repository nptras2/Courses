import React from 'react';
import Header from '@/components/layout/Header';
import Syllabus from '@/components/sections/syllabus/syllabus';

// --- Hero Section ---
const Hero = () => (
  <section className="w-full py-10 md:py-20">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <span className="text-[#135bec] font-bold text-sm uppercase tracking-widest flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">bolt</span>
              Platform for experts
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] tracking-tight">
              Turn your expertise into a thriving <span className="text-[#135bec]">digital business.</span>
            </h1>
            <p className="text-lg text-[#616f89] dark:text-slate-400 max-w-lg leading-relaxed">
              The all-in-one platform for creators to build, market, and sell premium online courses, memberships, and digital products.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <button className="bg-[#135bec] text-white font-bold px-8 py-4 rounded-xl hover:scale-[1.02] transition-transform shadow-xl shadow-[#135bec]/25 flex items-center gap-2 w-full sm:w-auto justify-center">
              <span className="material-symbols-outlined">rocket_launch</span>
              Get Started for Free
            </button>
            <button className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold px-8 py-4 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
              <span className="material-symbols-outlined">school</span>
              Explore Courses
            </button>
          </div>
          <div className="flex items-center gap-4 text-sm text-[#616f89]">
            <div className="flex -space-x-3">
              <img className="size-10 rounded-full border-2 border-white dark:border-slate-800" alt="User 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDncatvS7rzr1iU6DtpJmmRthHs52eJymEAYYaddcACTAeORycdhRSWMCompH3OQr3fsnuKwFyyLe5nkqhK-4Rznv_5Ok1b7Ld-jGH30cM9ltIMhGJE4y2fbq_8Yo-sho7aMrxq9gxPsj2x-nSxu4B-un9zIoLFkmSB-kbR9cIYPB87vS1oV_7DjWW9e5sEpzwhVDRMgurZ4tjylg5VFhZFj0FairaRRRudjn9JpWbrANtdtsBZiK3HGHq4ci3jl6775Bp5thkRkjI" />
              <img className="size-10 rounded-full border-2 border-white dark:border-slate-800" alt="User 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBb4sk2CXS4xj0mfaln-5xoKIuwA7McZr7XfTM6JTGMPlAiFMNYwMlCzqDbVpGnQJuS6Y8_EJJ5ckwqF3icK124HVHp9Uizqu4dE5MDwkv9lEeR2-WGm-LZRtEL6hkIsZ89q2v7lnL0skyaM75cGBUrWfw9etLV3ZBpjtMbJzxeIznoJzF4JU0T2RyVA6hZOTWwwZV9VzC90HBKuwBY9cW5NMlAmJ8T3cfsZj157m3_zCFNoyNxEnvpACaJMAzkL5xDfXIVFu3pUPs" />
              <img className="size-10 rounded-full border-2 border-white dark:border-slate-800" alt="User 3" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCi7oxDGg8V8T__XLHwmQ9-Gjicms9nypmcAElJxvNqnkbult5HEFL3ECut2Kmof4vd_JHJy-HM2tZDBxT6_JPsOXb45BF8v3mjTxQdUXmrkE-TVr5bPWx5opUcNUpL5e7aEwmpoPPO9K-Ow-j5ge5ev4NMdIXKH-rym2vPr1XuaieM3M958TAf6mcuJ-_3-ehiuV9d1jZqN5V3UvRuZ--rQ2w977h7UEgPo-JaxjW-_ohvEp8RvBf1QfmPM4Vj8EwY5X0gaxKF0Jk" />
            </div>
            <p>Join 10k+ creators who trust us</p>
          </div>
        </div>
        <div className="relative">
        <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-slate-200">
            <img className="w-full h-full object-cover" alt="Dashboard" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7q9q5XLJaayEBcKaSfTsctmPP1fSNkEcgDwyioPr2PDwXePckYu-flLP35nPgjgiipWXYYrbsRZy0y9ICtkdR3RarxWBuljNHpFTopZCMV2FUT-9GUm59EqGIHTjYT98E2NtNxCxn2SH4NndrHu7axdeOBIKW0gFBEGcU9NHFgbOvIRL_-xNEFmq_GsUkPLa1Q33Gc7u76qqTj_XX-HMt_70yeS9Jx04p6Dc3rfsfZs-EpE0ZJdctn0ubwr7I4nyza8IvwsXbjK4" />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 hidden lg:block animate-bounce-subtle">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                <span className="material-symbols-outlined">trending_up</span>
              </div>
              <div>
                <p className="text-xs text-[#616f89] font-semibold">Total Revenue</p>
                <p className="text-xl font-bold">$124,500.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- Logo Cloud ---
const LogoCloud = () => (
  <section className="w-full bg-white dark:bg-slate-900/50 py-8 border-y border-slate-100 dark:border-slate-800">
    <div className="max-w-[1200px] mx-auto px-6 text-center">
      <p className="text-sm font-bold text-[#616f89] uppercase tracking-widest mb-6">Trusted by industry leaders</p>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale contrast-125">
        <span className="text-xl md:text-2xl font-black">COURSELY</span>
        <span className="text-xl md:text-2xl font-black">TECHEDU</span>
        <span className="text-xl md:text-2xl font-black">CREATOR.LY</span>
        <span className="text-xl md:text-2xl font-black">LEARNIFY</span>
        <span className="text-xl md:text-2xl font-black">SKILLPRO</span>
      </div>
    </div>
  </section>
);

// --- Features Section ---
const Features = () => (
  <section className="w-full py-12 md:py-16">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="text-center max-w-2xl mx-auto mb-12">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything you need to scale</h2>
        <p className="text-[#616f89] dark:text-slate-400">Ditch the duct-taped tools. We provide a seamless experience from landing page to course delivery.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: 'payments', title: 'Seamless Payments', desc: 'Accept payments from anywhere in the world with local currencies and tax automation.' },
          { icon: 'analytics', title: 'Deep Analytics', desc: 'Track student progress, churn rates, and revenue growth with detailed dashboard insights.' },
          { icon: 'auto_fix_high', title: 'Custom Branding', desc: 'Your brand, your site. Fully customizable themes that match your unique creator identity.' }
        ].map((feature, idx) => (
          <div key={idx} className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="size-12 rounded-lg bg-[#135bec]/10 text-[#135bec] flex items-center justify-center mb-6">
              <span className="material-symbols-outlined">{feature.icon}</span>
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-[#616f89] dark:text-slate-400 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- Courses Section ---
const Courses = () => (
  <section className="w-full bg-slate-50 dark:bg-slate-900/30 py-12 md:py-16">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-10">
        <div>
          <h2 className="text-3xl font-bold mb-2">Featured Courses</h2>
          <p className="text-[#616f89]">Top performing courses from our creator community</p>
        </div>
        <a className="text-[#135bec] font-bold flex items-center gap-2 hover:underline" href="/courses">
          View All Courses <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </a>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { 
          img: "https://lh3.googleusercontent.com/aida-public/AB6AXuATdIJbvDoUjYYTX5gfyJqsLCHLecTUyU7AS42FUleQIpG3gLnBfVv7D2Oud4TQHGDcYhA6eDKUwU5EAjEcIzBijyFUMfS8_iXegdOMtC0QEaNRk0AM58YFwLhU-76ugOxLyzqEjL8_apeP2Zi8xBISM9NaUOnwyBQh4jR-rukbLBTMuq8yuzb-8jQrXiJLGXB1835Xsc9aVzcz-Nem2_qLHmAhk6EsCsf8gKapj-XW90s-xh2FQNQpsqpyHa4xAcA5ZqOQbrokKU4",
            title: "Digital Marketing Masterclass 2024",
            price: "$199.00",
            badge: "Bestseller",
            rating: "(4.9 - 2.4k students)"
          },
          { 
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoswa7VEcaL63hda_jh8AMk_4REguKrg1jDq6LKKzZr_u6mWK_uE57qg3FcOsSu7My2kU6oP3ElB-3-2QG-2Z5jsBJgzBDHVfEDtVM66gn6xbJtj5GDv6xCTCJkC17uw00an-tFwh5pl1ejsfF9sKRNaVUZbKX2VslyoICHUNjGf0FzvukjmqhW4u-BLk2KEwqh2VfTXfMMzPBzES9y4-xOfNorugzJMSxDIlEAJ-wjvRQqSWHyTrq92qgHHYx2eNyzFRELV--hZQ",
            title: "Advanced UI/UX Design Systems",
            price: "$149.00",
            rating: "(4.7 - 1.1k students)"
          },
          { 
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGPjXls2xDmypdYV8s1oZ7wptUAoO_Lg1QsE1WtE2kBOJsPrfPL3d3uSPCARffy0xiNYWcEzZZAhGj7Dd0uCrX-lGF4b3BaqEZrRSryEU6vLIDhPKFUGEDZx0DmUqcM9Ub1_cciPX0Orzt8f95NTbUwbGxYIS250DN_L8Vs4PTJcgOAIDdFeTDdOieOOY3AyvDQMO6BaxuERdsn-SSHAB-HLGQGHYcvp3c7F77sLtNq853y4_41mXfyVunUya81eVXU5BFoE-ZdCk",
            title: "SaaS Startup Fundraising Strategy",
            price: "$299.00",
            rating: "(5.0 - 850 students)"
          }
        ].map((course, idx) => (
          <div key={idx} className="group cursor-pointer">
            <div className="relative aspect-video rounded-xl overflow-hidden mb-4 shadow-md bg-slate-200">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={course.title} src={course.img} />
              {course.badge && <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded text-xs font-bold shadow-sm text-black">Bestseller</div>}
            </div>
            <h3 className="font-bold text-lg mb-2 group-hover:text-[#135bec] transition-colors">{course.title}</h3>
            <div className="flex items-center gap-2 mb-3 text-yellow-400">
              <span className="material-symbols-outlined text-xs fill-1">star</span>
              <span className="material-symbols-outlined text-xs fill-1">star</span>
              <span className="material-symbols-outlined text-xs fill-1">star</span>
              <span className="material-symbols-outlined text-xs fill-1">star</span>
              <span className="material-symbols-outlined text-xs fill-1">star</span>
              <span className="text-xs text-[#616f89] font-medium">{course.rating}</span>
            </div>
            <p className="text-xl font-black text-[#135bec]">{course.price}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
// --- Testimonial Section ---
const Testimonial = () => (
  <section className="w-full py-12 md:py-16">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="bg-[#135bec] rounded-3xl p-8 md:p-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <span className="material-symbols-outlined text-5xl">format_quote</span>
          </div>
          <h2 className="text-xl md:text-3xl font-bold leading-tight mb-8">
            "CreatorPlatform changed the game for me. I moved from five different apps to one seamless workflow. My revenue increased by 40% in just three months."
          </h2>
          <div className="flex flex-col items-center gap-4">
            <img className="size-16 rounded-full border-4 border-white/30 object-cover bg-white" alt="Testimonial" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCebJsrO1eFqZoWq68lorzBqY7pdrUeWojSB7qjWYHb0ik4v2_bLTUcZJP0B7-kpwm8VlcCEewBBpg1WPeU-EHms-_uXmoJWRqC3P-RW7_7TyIoVQhOVYcwn5i_rQTvG8bbFiECAusyIZGvNuOou49kx6iwuet9s-9oSb3eWxRpibiMes4DpjpCatkVWjLM1cKIDtKrHiduZMyi4fVS47_iDQANikSo6APyanJ-VANuHJlcFA3VKCRs1tNWReSzFuf3CaiduYSfYjY" />
            <div>
              <p className="font-bold text-lg">Elena Rodriguez</p>
              <p className="text-white/70 text-sm">Creative Director & Online Educator</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- CTA Section ---
const CTA = () => (
  <section className="w-full py-12 md:py-16 text-center">
    <div className="max-w-[1200px] mx-auto px-6">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6">Ready to launch your empire?</h2>
      <p className="text-[#616f89] dark:text-slate-400 text-lg mb-8 max-w-xl mx-auto">Join the new era of education. Start your 14-day free trial today. No credit card required.</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button className="bg-[#135bec] text-white font-bold px-10 py-5 rounded-xl text-lg hover:shadow-2xl hover:shadow-[#135bec]/30 transition-all flex items-center gap-2 w-full sm:w-auto justify-center">
          <span className="material-symbols-outlined">auto_awesome</span>
          Start My Free Trial
        </button>
        <p className="text-sm font-medium text-[#616f89]">Cancel anytime</p>
        </div>
    </div>
  </section>
);

export default function Home() {
  return (
    <main className="overflow-hidden flex flex-col w-full">
      <Header theme="light" />
      <Hero />
      <LogoCloud />
      <Features />
      <Syllabus />
      <Courses />
      <Testimonial />
      <CTA />
    </main>
  );
}
