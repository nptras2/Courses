import React, { useEffect, useState } from "react";
import api from "@/services/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/api/orders");
        if (isMounted) {
          setOrders(response?.data?.orders || []);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err?.response?.data?.message ||
              "Unable to load orders. Please try again."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchOrders();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Orders</h2>
      <p className="text-sm text-gray-500 mb-6">
        Track purchases, refunds, and payment status.
      </p>
      <div className="bg-white p-4 md:p-5 rounded-lg border">
        {isLoading && (
          <p className="text-sm text-gray-600">Loading orders...</p>
        )}

        {!isLoading && error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        {!isLoading && !error && orders.length === 0 && (
          <p className="text-sm text-gray-600">No orders found.</p>
        )}

        {!isLoading && !error && orders.length > 0 && (
          <>
            <div className="grid gap-3 md:hidden">
              {orders.map((order) => (
                <div key={order._id} className="border rounded-md p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm text-gray-500">Course</p>
                      <p className="font-medium">
                        {order.course?.title || "Course deleted"}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        order.paymentStatus === "paid"
                          ? "bg-green-100 text-green-700"
                          : order.paymentStatus === "failed"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">User</p>
                    <p className="text-sm">{order.user?.name || "Unknown"}</p>
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
              <table className="w-full text-sm min-w-[800px]">
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
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b last:border-0">
                      <td className="py-3 pr-4 font-medium">
                        {order.course?.title || "Course deleted"}
                      </td>
                      <td className="py-3 pr-4">{order.user?.name || "-"}</td>
                      <td className="py-3 pr-4">{order.user?.email || "-"}</td>
                      <td className="py-3 pr-4">
                        {order.currency || "INR"} {order.amount}
                      </td>
                      <td className="py-3 pr-4 capitalize">
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            order.paymentStatus === "paid"
                              ? "bg-green-100 text-green-700"
                              : order.paymentStatus === "failed"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
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
    </div>
  );
};

export default AdminOrders;
