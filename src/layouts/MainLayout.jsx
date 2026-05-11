import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);

  return (
    <div className="h-screen flex flex-col overflow-hidden">

      {/* Navbar (fixed) */}
      <Navbar onToggle={() => setIsOpen(!isOpen)} />

      {/* Body */}
      <div className="flex flex-1 pt-[66px] overflow-hidden">

        {isOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}

        <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50 transition-all duration-300 sm:p-6 lg:ml-64">
          <Outlet />
        </main>

      </div>

    </div>
  );
}