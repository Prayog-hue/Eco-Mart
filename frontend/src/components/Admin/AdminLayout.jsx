import React, { useState } from 'react';
import { FaBars, FaBoxOpen, FaClipboardList, FaSignOutAlt, FaStore, FaUser } from 'react-icons/fa';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <header className="bg-gray-900 text-white h-16 py-3 px-4 flex items-center justify-between sticky top-0 z-30 shadow-lg">
        <Link
          to="/admin"
          className="text-2xl font-bold tracking-tight hover:text-gray-200 transition-colors"
        >
          EcoMart
        </Link>
        <h1 className="text-xl font-semibold hidden md:block">Admin Dashboard</h1>
        {/* Mobile toggle button */}
        <button
          onClick={toggleSidebar}
          className="md:hidden text-2xl hover:text-gray-200 transition-colors"
          aria-label="Toggle sidebar"
          aria-expanded={isSidebarOpen}
        >
          <FaBars />
        </button>
      </header>

      <div className="flex flex-1 md:flex-row">
        {/* Sidebar */}
        <div
          className={`bg-gray-800 text-white w-64 h-full  p-4 sm:p-6 fixed top-16 left-0 transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:static md:h-auto md:translate-x-0 transition-transform duration-300 ease-in-out z-20 shadow-xl`}
        >
          <h2 className="text-xl font-bold mb-6 text-gray-100">Menu</h2>
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors ${
                    isActive ? 'bg-gray-700 text-white' : 'text-gray-300'
                  }`
                }
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaUser className="text-lg" />
                <span>Users</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/products"
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors ${
                    isActive ? 'bg-gray-700 text-white' : 'text-gray-300'
                  }`
                }
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaBoxOpen className="text-lg" />
                <span>Products</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/orders"
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors ${
                    isActive ? 'bg-gray-700 text-white' : 'text-gray-300'
                  }`
                }
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaClipboardList className="text-lg" />
                <span>Orders</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors ${
                    isActive ? 'bg-gray-700 text-white' : 'text-gray-300'
                  }`
                }
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaStore className="text-lg" />
                <span>Shop</span>
              </NavLink>
            </li>
          </ul>
          <div className="mt-6">
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center justify-center space-x-2"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Overlay for mobile when sidebar is open */}
        {isSidebarOpen && (
          <div
            className="fixed top-16 left-0 w-full h-[calc(100vh-64px)] bg-black bg-opacity-50 z-10 md:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Main content */}
        <div className="flex-1 p-2 sm:p-4 bg-gray-50 max-w-full overflow-x-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;