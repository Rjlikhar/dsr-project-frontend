// src/layouts/components/Sidebar.jsx

import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import dashboardRoutes from "../../routes/dashboardRoutes";
import { mapRoutesToNav } from "../../utils/mapRoutesToNav";
import useAuth from "../../feature/auth/hooks/useAuth";

export default function Sidebar({ isOpen, onClose, user }) {
  const NAV = mapRoutesToNav(dashboardRoutes,user);
  const {logout}=useAuth();
  const navigate=useNavigate();

  useEffect(() => {
    if (isOpen && window.innerWidth < 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

    const handleLogout = () => {
      logout();
      navigate('/signin')
    };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed top-[66px] left-0 right-0 bottom-0 bg-black/30 backdrop-blur-sm z-40 md:hidden "
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-[66px] h-[calc(100vh-66px)]
          w-64 bg-white  flex flex-col
          border-r border-indigo-100
          shadow-[4px_0_24px_rgba(99,102,241,0.08)]
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Navigation */}
        <div className="flex-1 px-3 py-3 overflow-y-auto">
          <p className="text-xs uppercase text-slate-400 px-2 mb-2 mt-2">
            Menu
          </p>
          <div className="mt-7">
            {NAV.map(({ label, path, icon, badge }) => (
              <NavLink
                key={label}
                to={path}
                className={({ isActive }) =>
                  `
                flex items-center gap-3 px-3 py-2.5 rounded-lg mb-3
                text-sm font-medium transition
                ${
                  isActive
                    ? "bg-indigo-500 text-white shadow"
                    : "text-slate-600 hover:bg-indigo-50"
                }
                    `
                }
              >
                <span className="flex-shrink-0">{icon}</span>

                {label}

                {badge && (
                  <span className="ml-auto text-[10px] bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full">
                    {badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Logout */}
        <div className="px-3 py-3 border-t border-indigo-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg
              text-red-500 bg-red-50 hover:bg-red-100 transition"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7"
              />
            </svg>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
