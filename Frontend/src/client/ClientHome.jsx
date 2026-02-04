import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import Footer from '@/components/layout/Footer';
import {
  BookOpen,
  GraduationCap,
  Settings,
  LogOut,
  Mail,
  Shield,
  Award,
  BadgeCheck,
  Menu,
  X,
  CalendarDays
} from 'lucide-react';

const navItems = [
  { id: 'overview', label: 'Overview', icon: BookOpen },
  { id: 'courses', label: 'My Courses', icon: GraduationCap },
  { id: 'enrolled', label: 'Enrolled Courses', icon: GraduationCap },
  { id: 'certificates', label: 'Certificates', icon: Award },
  { id: 'settings', label: 'Settings', icon: Settings }
];

const suggestedCourses = [
  {
    title: 'Digital Marketing Masterclass',
    desc: 'Build campaigns that convert and scale.',
    level: 'Intermediate',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80'
  },
  {
    title: 'Advanced UI/UX Design Systems',
    desc: 'Create cohesive, scalable product experiences.',
    level: 'Advanced',
    image:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80'
  },
  {
    title: 'No-Code MVP Launch',
    desc: 'Ship your first product without writing code.',
    level: 'Beginner',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80'
  }
];

export default function ClientHome() {
  const { user, loading, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-sm font-semibold text-gray-500">Loading...</div>
      </div>
    );
  }

  const initials =
    user?.name
      ? user.name
          .split(' ')
          .map((part) => part[0])
          .slice(0, 2)
          .join('')
          .toUpperCase()
      : 'ST';

  const enrolledCourses = Array.isArray(user?.enrolledCourses) ? user.enrolledCourses : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardLayout
        title="Student Dashboard"
        subtitle="Manage your profile and certificates"
        action={
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 text-gray-700"
          >
            <Menu className="w-5 h-5" />
          </button>
        }
      >
        <div className="grid lg:grid-cols-[240px_1fr] gap-6 mt-6">
          {menuOpen && (
            <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setMenuOpen(false)}></div>
          )}
          <aside
            className={`bg-white rounded-2xl border border-gray-200 p-5 h-fit z-50 lg:z-auto lg:static transition-all duration-300 shadow-sm ${
              menuOpen
                ? 'fixed left-4 right-4 top-16 opacity-100 translate-y-0'
                : 'hidden lg:block lg:opacity-100 lg:translate-y-0 opacity-0 -translate-y-2'
            }`}
          >
            <div className="flex items-center justify-end mb-6 lg:hidden">
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-lg border border-gray-200 text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#135bec] text-white flex items-center justify-center font-bold">
                {initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{user?.name || 'Student'}</p>
                <p className="text-xs text-gray-500">{user?.email || 'student@email.com'}</p>
              </div>
            </div>

            <nav className="space-y-1">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = index === 0;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-[#135bec]/10 text-[#135bec]'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <button
              type="button"
              onClick={logout}
              className="mt-6 w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </aside>

          <section className="space-y-6">
            <div className="bg-gradient-to-r from-[#135bec] to-[#0f4ec9] rounded-2xl p-6 text-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/70 font-semibold">Overview</p>
                  <h2 className="text-2xl sm:text-3xl font-black mt-2">Welcome, {user?.name || 'Student'}</h2>
                  <p className="text-sm text-white/80 mt-2">Your learning space is ready.</p>
                  <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm text-white/90">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-white/80" />
                      <span>{user?.email || 'student@email.com'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-white/80" />
                      <span className="capitalize">Role: Student</span>
                    </div>
                    {user?.createdAt && (
                      <div className="flex items-center gap-2">
                        <CalendarDays className="w-4 h-4 text-white/80" />
                        <span>Joined: {new Date(user.createdAt).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="bg-white/10 border border-white/20 rounded-2xl px-4 py-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white text-[#135bec] flex items-center justify-center font-bold">
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{user?.email || 'student@email.com'}</p>
                    <p className="text-xs text-white/70 capitalize">student</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Enrolled Courses</h2>
                  <p className="text-sm text-gray-500">Your active learning</p>
                </div>
              </div>
              {enrolledCourses.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {enrolledCourses.map((course) => (
                    <div key={course.id || course.title} className="border border-gray-100 rounded-xl p-4">
                      <p className="text-sm font-semibold text-gray-900">{course.title || 'Course'}</p>
                      {course.progress !== undefined && (
                        <p className="text-xs text-gray-500 mt-1">Progress: {course.progress}%</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border border-dashed border-gray-200 rounded-xl p-6 text-center">
                  <p className="text-sm font-semibold text-gray-700">You are not enrolled yet</p>
                  <p className="text-xs text-gray-500 mt-2">Enroll in these popular courses to get started.</p>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Suggested Courses</h2>
                  <p className="text-sm text-gray-500">Popular picks to help you grow</p>
                </div>
                <a href="/courses" className="text-sm font-semibold text-[#135bec]">
                  See more
                </a>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {suggestedCourses.map((course) => (
                  <div key={course.title} className="border border-gray-100 rounded-xl overflow-hidden">
                    <div className="aspect-video bg-slate-100">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-xs uppercase tracking-widest text-[#135bec] font-semibold">{course.level}</p>
                      <h3 className="text-sm font-semibold text-gray-900 mt-2">{course.title}</h3>
                      <p className="text-xs text-gray-500 mt-2">{course.desc}</p>
                      <button className="mt-4 text-xs font-semibold text-[#135bec]">Buy now</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#135bec]/10 text-[#135bec] flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Certificates</h2>
                  <p className="text-sm text-gray-500">Unlock after completion</p>
                </div>
              </div>
              {Array.isArray(user?.certificates) && user.certificates.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {user.certificates.map((cert) => (
                    <div key={cert.id || cert.title} className="border border-gray-100 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <BadgeCheck className="w-4 h-4 text-[#135bec] mt-1" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{cert.title || 'Course Certificate'}</p>
                          {cert.issuedAt && (
                            <p className="text-xs text-gray-500 mt-1">
                              Issued: {new Date(cert.issuedAt).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border border-dashed border-gray-200 rounded-xl p-6 text-center">
                  <p className="text-sm font-semibold text-gray-700">No certificates yet</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Complete a course to receive your certificate here.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </DashboardLayout>
      <Footer />
    </div>
  );
}
