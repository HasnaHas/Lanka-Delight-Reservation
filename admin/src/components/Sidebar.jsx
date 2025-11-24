import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/reservations", label: "Reservation Check" },
    { path: "/completed-reservations", label: "Completed Reservations" },
    { path: "/declined-reservations", label: "Declined Reservations" },
    { path: "/add-menu", label: "Add Menu" },
    { path: "/manage-menu", label: "Manage Menu" },
  ];

  return (
    <div className="w-64 bg-amber-600 text-white min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              location.pathname === item.path
                ? "bg-amber-700"
                : "hover:bg-amber-700"
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
