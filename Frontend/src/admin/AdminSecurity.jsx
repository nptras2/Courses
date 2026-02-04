import React, { useEffect, useState } from "react";
import api from "@/services/api";

const AdminSecurity = () => {
  const [summary, setSummary] = useState(null);
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
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err?.response?.data?.message ||
              "Unable to load security data. Please try again."
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
      <h2 className="text-2xl font-bold mb-2">Security</h2>
      <p className="text-sm text-gray-500 mb-6">
        Manage access controls, roles, and audit logs.
      </p>
      <div className="bg-white p-4 md:p-5 rounded-lg border space-y-6">
        {isLoading && (
          <p className="text-sm text-gray-600">Loading security data...</p>
        )}

        {!isLoading && error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        {!isLoading && !error && summary && (
          <>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="border rounded-md p-4">
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-2xl font-semibold mt-2">
                  {summary.totalUsers || 0}
                </p>
              </div>
              <div className="border rounded-md p-4">
                <p className="text-sm text-gray-500">Admins</p>
                <p className="text-2xl font-semibold mt-2">
                  {summary.totalAdmins || 0}
                </p>
              </div>
              <div className="border rounded-md p-4">
                <p className="text-sm text-gray-500">Clients</p>
                <p className="text-2xl font-semibold mt-2">
                  {summary.totalClients || 0}
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="border rounded-md p-4 space-y-2">
                <h3 className="text-base font-semibold">Access Controls</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Admins can manage courses, users, and orders.</li>
                  <li>Clients can purchase and access enrolled courses.</li>
                  <li>Protected routes require valid auth tokens.</li>
                </ul>
              </div>
              <div className="border rounded-md p-4 space-y-2">
                <h3 className="text-base font-semibold">Security Checklist</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Enable strong password policy for local accounts.</li>
                  <li>Review admin access regularly.</li>
                  <li>Monitor paid orders and unusual activity.</li>
                </ul>
              </div>
            </div>

            <div className="border rounded-md p-4">
              <h3 className="text-base font-semibold mb-2">Audit Logs</h3>
              <p className="text-sm text-gray-600">
                Audit log tracking is coming soon. We can add login history,
                admin actions, and course updates here.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminSecurity;
