import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  BookOpen,
  Users,
  ShoppingCart,
  IndianRupee,
  Activity,
  Clock,
} from "lucide-react";
import adminMenu from "@/admin/adminMenu";
import api from "@/services/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalRevenue: 0,
    pendingOrders: 0
  });
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const statCards = [
    { title: "Total Students", value: stats.totalUsers, icon: Users },
    { title: "Total Courses", value: stats.totalCourses, icon: BookOpen },
    {
      title: "Total Revenue",
      value: `INR ${Number(stats.totalRevenue || 0).toLocaleString()}`,
      icon: IndianRupee
    },
    { title: "Pending Orders", value: stats.pendingOrders, icon: ShoppingCart }
  ];

  useEffect(() => {
    let isMounted = true;

    const fetchDashboard = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/api/protected/admin-dashboard");
        if (isMounted) {
          setStats(response?.data?.stats || {});
          setActivities(response?.data?.activities || []);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err?.response?.data?.message ||
              "Unable to load dashboard data."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  const getActivityIcon = (type) => {
    switch (type) {
      case "purchase":
        return <ShoppingCart className="h-4 w-4 text-green-600" />;
      case "course":
        return <BookOpen className="h-4 w-4 text-blue-600" />;
      case "student":
        return <Users className="h-4 w-4 text-purple-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <p className="text-sm text-gray-500">
          Manage courses, students & revenue
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-lg shadow-sm border"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <stat.icon className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {adminMenu[1].items.map((action, i) => (
            <NavLink
              key={i}
              to={action.path}
              className="bg-white p-4 rounded-lg border hover:shadow transition"
            >
              <action.icon className="h-6 w-6 text-blue-600 mb-2" />
              <p className="font-medium text-sm">{action.label}</p>
            </NavLink>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white p-5 rounded-lg border">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Activities
          </h3>

          {isLoading && (
            <p className="text-sm text-gray-500">Loading activities...</p>
          )}
          {!isLoading && error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
          {!isLoading && !error && activities.length === 0 && (
            <p className="text-sm text-gray-500">No recent activity yet.</p>
          )}
          {!isLoading &&
            !error &&
            activities.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 pb-3 mb-3 border-b last:border-0"
              >
                {getActivityIcon("purchase")}
                <div>
                  <p className="text-sm">
                    <b>{item.user}</b> {item.action}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.time ? new Date(item.time).toLocaleString() : ""}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
