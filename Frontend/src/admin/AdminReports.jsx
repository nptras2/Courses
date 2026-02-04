import React, { useEffect, useState } from "react";
import api from "@/services/api";

const AdminReports = () => {
  const [summary, setSummary] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchSummary = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/api/reports/summary");
        if (isMounted) {
          setSummary(response?.data?.totals || null);
          setRecentOrders(response?.data?.recentOrders || []);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err?.response?.data?.message ||
              "Unable to load reports. Please try again."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchSummary();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Reports</h2>
      <p className="text-sm text-gray-500 mb-6">
        Generate detailed performance and sales reports.
      </p>
      <div className="bg-white p-4 md:p-5 rounded-lg border space-y-6">
        {isLoading && (
          <p className="text-sm text-gray-600">Loading reports...</p>
        )}

        {!isLoading && error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        {!isLoading && !error && summary && (
          <>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="border rounded-md p-4">
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-2xl font-semibold mt-2">
                  ₹{Number(summary.totalRevenue || 0).toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Paid orders: {summary.totalPayments || 0}
                </p>
              </div>
              <div className="border rounded-md p-4">
                <p className="text-sm text-gray-500">Users</p>
                <p className="text-2xl font-semibold mt-2">
                  {summary.totalUsers || 0}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Admins: {summary.totalAdmins || 0} · Clients:{" "}
                  {summary.totalClients || 0}
                </p>
              </div>
              <div className="border rounded-md p-4">
                <p className="text-sm text-gray-500">Courses</p>
                <p className="text-2xl font-semibold mt-2">
                  {summary.totalCourses || 0}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Published: {summary.publishedCourses || 0} · Drafts:{" "}
                  {summary.draftCourses || 0}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Recent Orders</h3>
              {recentOrders.length === 0 && (
                <p className="text-sm text-gray-600">
                  No orders found yet.
                </p>
              )}

              {recentOrders.length > 0 && (
                <>
                  <div className="grid gap-3 md:hidden">
                    {recentOrders.map((order) => (
                      <div
                        key={order._id}
                        className="border rounded-md p-4 space-y-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm text-gray-500">Course</p>
                            <p className="font-medium">
                              {order.course?.title || "Course deleted"}
                            </p>
                          </div>
                          <span className="text-xs px-2 py-1 rounded bg-gray-100 capitalize">
                            {order.paymentStatus}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">User</p>
                          <p className="text-sm">{order.user?.name || "-"}</p>
                          <p className="text-xs text-gray-500">
                            {order.user?.email}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>
                            {order.currency || "INR"} {order.amount}
                          </span>
                          <span>
                            {order.createdAt
                              ? new Date(order.createdAt).toLocaleDateString()
                              : "-"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-sm min-w-[720px]">
                      <thead className="text-left text-gray-500 border-b">
                        <tr>
                          <th className="py-2 pr-4">Course</th>
                          <th className="py-2 pr-4">User</th>
                          <th className="py-2 pr-4">Email</th>
                          <th className="py-2 pr-4">Amount</th>
                          <th className="py-2 pr-4">Status</th>
                          <th className="py-2 pr-4">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((order) => (
                          <tr key={order._id} className="border-b last:border-0">
                            <td className="py-3 pr-4 font-medium">
                              {order.course?.title || "Course deleted"}
                            </td>
                            <td className="py-3 pr-4">
                              {order.user?.name || "-"}
                            </td>
                            <td className="py-3 pr-4">
                              {order.user?.email || "-"}
                            </td>
                            <td className="py-3 pr-4">
                              {order.currency || "INR"} {order.amount}
                            </td>
                            <td className="py-3 pr-4 capitalize">
                              <span className="text-xs px-2 py-1 rounded bg-gray-100">
                                {order.paymentStatus}
                              </span>
                            </td>
                            <td className="py-3 pr-4">
                              {order.createdAt
                                ? new Date(order.createdAt).toLocaleDateString()
                                : "-"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminReports;
