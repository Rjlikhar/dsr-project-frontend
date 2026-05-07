import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      
      {/* Navbar (fixed) */}
      <Navbar onToggle={() => setIsOpen(!isOpen)} />

      {/* Body */}
      <div className="flex flex-1 pt-[66px] overflow-hidden">
        
        
          <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
  
        {/* Content */}
        <main className={`flex-1 overflow-y-auto p-6 bg-slate-50 transition-all duration-300 
          ${isOpen ? "md:ml-64" : "ml-0"}`}>
          <Outlet />
        </main>

      </div>

    </div>
  );
}