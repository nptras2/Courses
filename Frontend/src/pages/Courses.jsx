import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const courses = [
  {
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuATdIJbvDoUjYYTX5gfyJqsLCHLecTUyU7AS42FUleQIpG3gLnBfVv7D2Oud4TQHGDcYhA6eDKUwU5EAjEcIzBijyFUMfS8_iXegdOMtC0QEaNRk0AM58YFwLhU-76ugOxLyzqEjL8_apeP2Zi8xBISM9NaUOnwyBQh4jR-rukbLBTMuq8yuzb-8jQrXiJLGXB1835Xsc9aVzcz-Nem2_qLHmAhk6EsCsf8gKapj-XW90s-xh2FQNQpsqpyHa4xAcA5ZqOQbrokKU4",
    title: 'Digital Marketing Masterclass 2024',
    price: '$199.00',
    badge: 'Bestseller',
    rating: '(4.9 - 2.4k students)'
  },
  {
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoswa7VEcaL63hda_jh8AMk_4REguKrg1jDq6LKKzZr_u6mWK_uE57qg3FcOsSu7My2kU6oP3ElB-3-2QG-2Z5jsBJgzBDHVfEDtVM66gn6xbJtj5GDv6xCTCJkC17uw00an-tFwh5pl1ejsfF9sKRNaVUZbKX2VslyoICHUNjGf0FzvukjmqhW4u-BLk2KEwqh2VfTXfMMzPBzES9y4-xOfNorugzJMSxDIlEAJ-wjvRQqSWHyTrq92qgHHYx2eNyzFRELV--hZQ",
    title: 'Advanced UI/UX Design Systems',
    price: '$149.00',
    rating: '(4.7 - 1.1k students)'
  },
  {
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGPjXls2xDmypdYV8s1oZ7wptUAoO_Lg1QsE1WtE2kBOJsPrfPL3d3uSPCARffy0xiNYWcEzZZAhGj7Dd0uCrX-lGF4b3BaqEZrRSryEU6vLIDhPKFUGEDZx0DmUqcM9Ub1_cciPX0Orzt8f95NTbUwbGxYIS250DN_L8Vs4PTJcgOAIDdFeTDdOieOOY3AyvDQMO6BaxuERdsn-SSHAB-HLGQGHYcvp3c7F77sLtNq853y4_41mXfyVunUya81eVXU5BFoE-ZdCk",
    title: 'SaaS Startup Fundraising Strategy',
    price: '$299.00',
    rating: '(5.0 - 850 students)'
  },
  {
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    title: 'Creator Brand & Audience Growth',
    price: '$129.00',
    rating: '(4.8 - 1.8k students)'
  },
  {
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    title: 'No-Code MVP Launch',
    price: '$179.00',
    rating: '(4.6 - 940 students)'
  },
  {
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    title: 'Community Building Playbook',
    price: '$139.00',
    rating: '(4.9 - 2.1k students)'
  }
];

export default function Courses() {
  return (
    <main className="min-h-screen bg-white">
      <Header theme="light" />

      <section className="pt-28 pb-12 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-10">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-[#135bec]">Browse all courses</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mt-2">Courses built by top creators</h1>
            </div>
            <p className="text-[#616f89] max-w-xl">
              Explore high-impact programs designed to help you launch, grow, and scale your knowledge business.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course.title} className="group cursor-pointer">
                <div className="relative aspect-video rounded-xl overflow-hidden mb-4 shadow-md bg-slate-200">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={course.title} src={course.img} />
                  {course.badge && (
                    <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded text-xs font-bold shadow-sm text-black">
                      {course.badge}
                    </div>
                  )}
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

      <Footer />
    </main>
  );
}
