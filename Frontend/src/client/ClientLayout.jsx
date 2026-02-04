import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import {
  BookOpen,
  GraduationCap,
  Award,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const navItems = [
  { id: 'overview', label: 'Overview', icon: BookOpen, path: '/student/overview' },
  { id: 'courses', label: 'Buy Courses', icon: GraduationCap, path: '/student/courses' },
  { id: 'enrolled', label: 'Enrolled Courses', icon: GraduationCap, path: '/student/enrolled' },
  { id: 'certificates', label: 'Certificates', icon: Award, path: '/student/certificates' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/student/settings' }
];

export default function ClientLayout() {
  const { user, loading, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

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

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardLayout
        title={<span className="lg:hidden">Student Dashboard</span>}
        subtitle={<span className="lg:hidden">Manage your profile and certificates</span>}
        fullWidth
        hideHeaderOnDesktop
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
        <div className="grid lg:grid-cols-[240px_1fr] gap-6 -mx-4 sm:-mx-6 lg:-mx-8">
          {menuOpen && (
            <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setMenuOpen(false)}></div>
          )}
          <aside
            className={`bg-white border border-gray-200 p-5 h-fit z-50 lg:z-auto lg:static transition-all duration-300 shadow-sm ${
              menuOpen
                ? 'fixed left-4 right-4 top-16 opacity-100 translate-y-0'
                : 'hidden lg:block lg:opacity-100 lg:translate-y-0 opacity-0 -translate-y-2'
            } lg:rounded-none lg:border-l-0 lg:border-t-0 lg:border-b-0 lg:h-screen lg:sticky lg:top-0 lg:overflow-y-auto lg:mt-0`}
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
              <div className="w-10 h-10 rounded-full bg-[#135bec] text-white flex items-center justify-center font-bold overflow-hidden">
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={user?.name || 'Student'}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  initials
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{user?.name || 'Student'}</p>
                <p className="text-xs text-gray-500">{user?.email || 'student@email.com'}</p>
              </div>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path || (item.path === '/student/overview' && location.pathname === '/student');
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-[#135bec]/10 text-[#135bec]'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
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

          <section className="space-y-6 px-4 sm:px-6 lg:px-8">
            <Outlet />
          </section>
        </div>
      </DashboardLayout>
    </div>
  );
}
