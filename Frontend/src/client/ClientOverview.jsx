import React, { useEffect, useMemo, useState } from 'react';
import {
  Mail,
  Shield,
  CalendarDays,
  GraduationCap,
  Award
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import api from '@/services/api';

export default function ClientOverview() {
  const { user } = useAuth();
  const certificates = Array.isArray(user?.certificates) ? user.certificates : [];
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const initials =
    user?.name
      ? user.name
          .split(' ')
          .map((part) => part[0])
          .slice(0, 2)
          .join('')
          .toUpperCase()
      : 'ST';

  const joinedDate = useMemo(() => {
    if (!user?.createdAt) return null;
    return new Date(user.createdAt).toLocaleDateString();
  }, [user?.createdAt]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [enrolledRes, coursesRes] = await Promise.all([
          api.get('/api/users/my-courses'),
          api.get('/api/courses/get/courses')
        ]);
        if (isMounted) {
          const enrolled = enrolledRes?.data?.courses || [];
          const allCourses = coursesRes?.data?.courses || [];
          const recommended = allCourses
            .filter((course) => !enrolled.some((e) => e._id === course._id))
            .slice(0, 3);
          setEnrolledCourses(enrolled);
          setRecommendedCourses(recommended);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err?.response?.data?.message ||
              'Unable to load overview data.'
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 pt-4">
      <div className="bg-gradient-to-r from-[#135bec] via-[#0f4ec9] to-[#0b3b9e] rounded-2xl p-6 text-white shadow-lg">
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
              {joinedDate && (
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-white/80" />
                  <span>Joined: {joinedDate}</span>
                </div>
              )}
            </div>
          </div>
          <div className="bg-white/10 border border-white/20 rounded-2xl px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white text-[#135bec] flex items-center justify-center font-bold overflow-hidden">
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
              <p className="text-sm font-semibold text-white">{user?.email || 'student@email.com'}</p>
              <p className="text-xs text-white/70 capitalize">student</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Enrolled', value: enrolledCourses.length, icon: GraduationCap },
          { label: 'Certificates', value: certificates.length, icon: Award }
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-widest text-gray-400">{item.label}</p>
                <Icon className="w-4 h-4 text-[#135bec]" />
              </div>
              <p className="text-2xl font-black text-gray-900 mt-3">{item.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Enrolled Courses</h2>
            <a href="/student/enrolled" className="text-sm font-semibold text-[#135bec]">
              View all
            </a>
          </div>
          {isLoading && (
            <p className="text-sm text-gray-500">Loading enrolled courses...</p>
          )}
          {!isLoading && error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
          {!isLoading && !error && enrolledCourses.length === 0 && (
            <div className="border border-dashed border-gray-200 rounded-xl p-6 text-center">
              <p className="text-sm font-semibold text-gray-700">No courses enrolled yet</p>
              <p className="text-xs text-gray-500 mt-2">Browse courses to start learning.</p>
            </div>
          )}
          {!isLoading && !error && enrolledCourses.length > 0 && (
            <div className="space-y-3">
              {enrolledCourses.slice(0, 2).map((course) => (
                <div key={course._id} className="flex items-center gap-4 border border-gray-100 rounded-xl p-4">
                  <div className="h-14 w-20 rounded-lg overflow-hidden bg-gray-100">
                    {course.thumbnail ? (
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-xs text-gray-400">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{course.title}</p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                      {course.shortDescription || 'Course description'}
                    </p>
                  </div>
                  <a
                    href={`/student/enrolled/${course._id}`}
                    className="text-xs font-semibold text-[#135bec]"
                  >
                    Start Learning ->
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Recommended Courses</h2>
            <a href="/student/courses" className="text-sm font-semibold text-[#135bec]">See more</a>
          </div>
          {isLoading && (
            <p className="text-sm text-gray-500">Loading recommendations...</p>
          )}
          {!isLoading && !error && recommendedCourses.length === 0 && (
            <p className="text-sm text-gray-500">No recommendations right now.</p>
          )}
          {!isLoading && !error && recommendedCourses.length > 0 && (
            <div className="space-y-3">
              {recommendedCourses.map((course) => (
                <div key={course._id} className="border border-gray-100 rounded-xl p-4">
                  <p className="text-sm font-semibold text-gray-900">{course.title}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {course.shortDescription || 'Popular with students'}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <a href="/student/courses" className="bg-[#135bec] text-white font-semibold px-5 py-3 rounded-xl">
          Start Learning
        </a>
      </div>
    </div>
  );
}
