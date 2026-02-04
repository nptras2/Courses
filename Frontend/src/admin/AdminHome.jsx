import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "@/admin/AdminSideBar";

const AdminHome = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSideBar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      {isSidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close sidebar overlay"
        />
      )}

      <main className="min-h-screen p-4 md:p-6 md:ml-64">
        <div className="md:hidden mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            className="inline-flex items-center gap-2 px-3 py-2 border rounded text-sm bg-white"
            aria-label="Toggle sidebar"
          >
            ☰ Menu
          </button>
          <span className="text-sm text-gray-500">Admin Panel</span>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminHome;
