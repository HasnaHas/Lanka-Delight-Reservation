import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";

const AdminDashboard = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  return (
    <div className="flex min-h-screen bg-amber-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <header className="bg-amber-600 text-white p-6 shadow-md">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-white">Welcome, {user?.name}</span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
