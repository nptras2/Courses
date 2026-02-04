import React, { useEffect, useState } from "react";
import api from "@/services/api";

const AdminStudents = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/api/users");
        if (isMounted) {
          setUsers(response?.data?.users || []);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err?.response?.data?.message ||
              "Unable to load users. Please try again."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDelete = async (userId) => {
    if (!userId) return;
    const confirmed = window.confirm("Do you want to delete this user?");
    if (!confirmed) return;
    setDeleteId(userId);

    try {
      await api.delete(`/api/users/${userId}`);
      setUsers((prev) => prev.filter((user) => user._id !== userId));
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to delete user. Please try again."
      );
    } finally {
      setDeleteId(null);
    }
  };

  const handleCancelEnrollment = async (userId, courseId) => {
    const confirmed = window.confirm("Cancel this user's enrollment?");
    if (!confirmed) return;

    try {
      await api.delete(`/api/users/${userId}/enrollments/${courseId}`);
      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId
            ? {
                ...user,
                enrolledCourses: (user.enrolledCourses || []).filter(
                  (course) => course._id !== courseId
                )
              }
            : user
        )
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to cancel enrollment. Please try again."
      );
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold">Users</h2>
          <p className="text-sm text-gray-500">
            All registered users (including admins).
          </p>
        </div>
        <div className="text-sm text-gray-600">
          Total Users: <span className="font-semibold">{users.length}</span>
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-6">
        Manage users and remove accounts when needed.
      </p>
      <div className="bg-white p-4 md:p-5 rounded-lg border">
        {isLoading && (
          <p className="text-sm text-gray-600">Loading users...</p>
        )}

        {!isLoading && error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        {!isLoading && !error && users.length === 0 && (
          <p className="text-sm text-gray-600">No users found.</p>
        )}

        {!isLoading && !error && users.length > 0 && (
          <>
            <div className="grid gap-3 md:hidden">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="border rounded-md p-4 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{user.name}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded bg-gray-100 capitalize">
                      {user.role}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-sm break-all">{user.email}</p>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="capitalize">{user.authProvider}</span>
                    <span>
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "-"}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Enrolled</p>
                    {(user.enrolledCourses || []).length === 0 ? (
                      <p className="text-sm text-gray-600">No courses</p>
                    ) : (
                      <div className="space-y-2">
                        {user.enrolledCourses.map((course) => (
                          <div
                            key={course._id}
                            className="flex items-center justify-between gap-2 text-sm"
                          >
                            <span className="text-gray-700">{course.title}</span>
                            <button
                              type="button"
                              onClick={() =>
                                handleCancelEnrollment(user._id, course._id)
                              }
                              className="text-xs text-red-600"
                            >
                              Cancel
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(user._id)}
                    className="w-full mt-2 text-red-600 border border-red-200 rounded py-2 text-sm"
                    disabled={deleteId === user._id}
                  >
                    {deleteId === user._id ? "Deleting..." : "Delete User"}
                  </button>
                </div>
              ))}
            </div>

            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm min-w-[720px]">
                <thead className="text-left text-gray-500 border-b">
                  <tr>
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Email</th>
                    <th className="py-2 pr-4">Role</th>
                    <th className="py-2 pr-4">Provider</th>
                    <th className="py-2 pr-4">Enrolled</th>
                    <th className="py-2 pr-4">Joined</th>
                    <th className="py-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b last:border-0">
                      <td className="py-3 pr-4 font-medium">{user.name}</td>
                      <td className="py-3 pr-4">{user.email}</td>
                      <td className="py-3 pr-4 capitalize">{user.role}</td>
                      <td className="py-3 pr-4 capitalize">
                        {user.authProvider}
                      </td>
                      <td className="py-3 pr-4">
                        {(user.enrolledCourses || []).length === 0 ? (
                          <span className="text-gray-400">No courses</span>
                        ) : (
                          <div className="space-y-1">
                            {user.enrolledCourses.map((course) => (
                              <div
                                key={course._id}
                                className="flex items-center justify-between gap-2"
                              >
                                <span>{course.title}</span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleCancelEnrollment(user._id, course._id)
                                  }
                                  className="text-xs text-red-600"
                                >
                                  Cancel
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </td>
                      <td className="py-3 pr-4">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="py-3 text-right">
                        <button
                          type="button"
                          onClick={() => handleDelete(user._id)}
                          className="text-red-600 hover:text-red-800"
                          disabled={deleteId === user._id}
                        >
                          {deleteId === user._id ? "Deleting..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminStudents;
