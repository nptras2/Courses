import React, { useEffect, useState } from "react";
import api from "@/services/api";

const AdminRevenue = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalPayments, setTotalPayments] = useState(0);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchRevenue = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/api/orders/revenue");
        if (isMounted) {
          setTotalRevenue(response?.data?.totalRevenue || 0);
          setTotalPayments(response?.data?.totalPayments || 0);
          setHistory(response?.data?.history || []);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err?.response?.data?.message ||
              "Unable to load revenue. Please try again."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchRevenue();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Revenue</h2>
      <p className="text-sm text-gray-500 mb-6">
        Monitor earnings, payouts, and monthly growth.
      </p>
      <div className="bg-white p-4 md:p-5 rounded-lg border space-y-4">
        {isLoading && (
          <p className="text-sm text-gray-600">Loading revenue...</p>
        )}

        {!isLoading && error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        {!isLoading && !error && (
          <>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="border rounded-md p-4">
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-2xl font-semibold mt-2">
                  ₹{Number(totalRevenue).toLocaleString()}
                </p>
              </div>
              <div className="border rounded-md p-4">
                <p className="text-sm text-gray-500">Total Payments</p>
                <p className="text-2xl font-semibold mt-2">
                  {totalPayments}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Revenue History</h3>

              {history.length === 0 && (
                <p className="text-sm text-gray-600">
                  No paid orders yet.
                </p>
              )}

              {history.length > 0 && (
                <>
                  <div className="grid gap-3 md:hidden">
                    {history.map((order) => (
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
                          <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">
                            Paid
                          </span>
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
                    <table className="w-full text-sm min-w-[600px]">
                      <thead className="text-left text-gray-500 border-b">
                        <tr>
                          <th className="py-2 pr-4">Course</th>
                          <th className="py-2 pr-4">Amount</th>
                          <th className="py-2 pr-4">Date</th>
                          <th className="py-2 pr-4">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {history.map((order) => (
                          <tr key={order._id} className="border-b last:border-0">
                            <td className="py-3 pr-4 font-medium">
                              {order.course?.title || "Course deleted"}
                            </td>
                            <td className="py-3 pr-4">
                              {order.currency || "INR"} {order.amount}
                            </td>
                            <td className="py-3 pr-4">
                              {order.createdAt
                                ? new Date(order.createdAt).toLocaleDateString()
                                : "-"}
                            </td>
                            <td className="py-3 pr-4">
                              <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">
                                Paid
                              </span>
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

export default AdminRevenue;
