import React from 'react';

const syllabusItems = [
  {
    title: 'Foundations',
    lessons: '8 lessons',
    time: '2h 10m',
    topics: ['Market research', 'Positioning', 'Course outline']
  },
  {
    title: 'Content Production',
    lessons: '12 lessons',
    time: '4h 05m',
    topics: ['Recording setup', 'Editing workflow', 'Resource packs']
  },
  {
    title: 'Launch & Growth',
    lessons: '10 lessons',
    time: '3h 20m',
    topics: ['Pricing strategy', 'Email funnels', 'Affiliate program']
  }
];

export default function Syllabus() {
  return (
    <section className="w-full py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-[#135bec]">Course syllabus</p>
            <h2 className="text-3xl sm:text-4xl font-black mt-2">A clear path from idea to income</h2>
          </div>
          <div className="text-sm text-[#616f89] max-w-xl">
            Break your course into structured modules with milestones, downloadable resources, and student feedback loops.
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {syllabusItems.map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <span className="text-xs font-semibold text-[#135bec] bg-[#135bec]/10 px-3 py-1 rounded-full">{item.time}</span>
              </div>
              <p className="text-sm font-semibold text-[#616f89] mb-4">{item.lessons}</p>
              <ul className="space-y-2 text-sm text-[#616f89]">
                {item.topics.map((topic) => (
                  <li key={topic} className="flex items-start gap-2">
                    <span className="mt-1 size-2 rounded-full bg-[#135bec]"></span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
