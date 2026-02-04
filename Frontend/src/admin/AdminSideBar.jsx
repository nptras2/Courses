import React from "react";
import { NavLink } from "react-router-dom";
import adminMenu from "@/admin/adminMenu";

const AdminSidebar = ({ isOpen, onClose }) => {
  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen w-64 bg-white border-r px-4 py-6 overflow-y-auto transform transition-transform duration-200
      ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold text-blue-600">Course Admin</h1>
        <button
          type="button"
          onClick={onClose}
          className="md:hidden text-gray-500 hover:text-gray-800"
          aria-label="Close sidebar"
        >
          ✕
        </button>
      </div>

      {/* Menu */}
      <nav className="space-y-6">
        {adminMenu.map((group, index) => (
          <div key={index}>
            <p className="text-xs font-semibold text-gray-400 mb-2">
              {group.section}
            </p>

            <div className="space-y-1">
              {group.items.map((item, idx) => (
                <NavLink
                  key={idx}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition
                    ${
                      isActive
                        ? "bg-blue-100 text-blue-600 font-medium"
                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }`
                  }
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
