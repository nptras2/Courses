import React, { useEffect, useState } from 'react';
import api from '@/services/api';

export default function ClientEnrolled() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchEnrolled = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/api/users/my-courses');
        if (isMounted) {
          setEnrolledCourses(response?.data?.courses || []);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err?.response?.data?.message ||
              'Unable to load enrolled courses.'
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchEnrolled();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-4">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Enrolled Courses</h2>
            <p className="text-sm text-gray-500">Your active learning</p>
          </div>
        </div>
        {isLoading && (
          <p className="text-sm text-gray-500">Loading enrolled courses...</p>
        )}
        {!isLoading && error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
        {!isLoading && !error && enrolledCourses.length === 0 && (
          <div className="border border-dashed border-gray-200 rounded-xl p-6 text-center">
            <p className="text-sm font-semibold text-gray-700">You are not enrolled yet</p>
            <p className="text-xs text-gray-500 mt-2">Enroll in a course to start learning.</p>
          </div>
        )}
        {!isLoading && !error && enrolledCourses.length > 0 && (
          <div className="space-y-3">
            {enrolledCourses.map((course) => (
              <a
                key={course._id}
                href={`/student/enrolled/${course._id}`}
                className="flex flex-col gap-3 border border-gray-100 rounded-xl p-4 hover:shadow-sm transition sm:flex-row sm:items-center"
              >
                <div className="flex items-start gap-3 sm:items-center sm:flex-1">
                  <div className="h-16 w-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
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
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                        Enrolled
                      </span>
                      <span className="text-xs text-gray-400 uppercase">
                        {course.category || "Course"}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {course.title || "Course"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {course.shortDescription || "Course description"}
                    </p>
                  </div>
                </div>
                <div className="text-xs text-[#135bec] font-semibold sm:ml-auto">
                  Start Learning →
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
