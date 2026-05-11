import { useEffect, useState } from "react";
import { HammerIcon } from "../../component/ui/HammerIcon";
import { ChevronIcon } from "../../component/ui/ChevronIcon";
import ProfileModal from "./Profile";
import useAuth from "../../feature/auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import AppPassword from "./AppPassword";

export default function Navbar({ onToggle }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [user, setUser] = useState([]);
  const [isOpen, onClose]=useState(false);
  const {logout}=useAuth();
  const navigate=useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    setUser(savedUser);
     console.log(user)
  }, []);

  const getInitials = (name = "") => {
  return name
    .trim()
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  };

  const handleLogout = () => {
      logout();
      navigate('/signin')
    };
 

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 
  bg-white border-b border-blue-100 
  px-8 h-[66px] flex items-center justify-between
  shadow-sm"
      style={{ boxShadow: "0 2px 16px rgba(59,130,246,0.07)" }}
    >
      {/* ── Logo / Left ── */}
      <div className="flex items-center gap-3 cursor-pointer group">
        <button
          onClick={onToggle}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 transition"
        >
          <svg
            className="w-5 h-5 text-slate-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Hammer Icon Button */}
        <div
          className="w-11 h-11 rounded-[13px] flex items-center justify-center transition-all duration-200"
          style={{
            background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
            boxShadow: "0 4px 14px rgba(99,102,241,0.28)",
          }}
        >
          <HammerIcon />
        </div>

        {/* Brand Text */}
        <div className="flex flex-col leading-tight">
          <span
            className="text-[19px] font-bold tracking-tight"
            style={{
              background: "linear-gradient(135deg, #3b82f6, #6366f1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            DSR Dashboard
          </span>
          <span className="text-[10px] font-medium tracking-[1.4px] uppercase text-slate-300">
            Daily Status Report
          </span>
        </div>
      </div>

      {/* ── Profile / Right ── */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="flex items-center gap-2.5 sm:px-3.5 px-1.5 py-1.5 rounded-full border transition-all duration-200 cursor-pointer"
          style={{
            background: "#f0f7ff",
            borderColor: "rgba(59,130,246,0.15)",
            boxShadow: "0 2px 8px rgba(59,130,246,0.07)",
          }}
        >
          {/* Avatar */}
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold text-white tracking-wide flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #6366f1, #a78bfa)",
              boxShadow: "0 2px 8px rgba(99,102,241,0.3)",
            }}
          >{getInitials(user.name)}</div>
          
          {/* Name & Role */}
          <div className={`hidden lg:flex flex-col leading-tight text-left`}>
            <span className="text-[13px] font-semibold text-slate-800">{user.name}</span>
          </div>

          {/* Chevron */}
          <span
            className={`hidden lg:flex ml-1 transition-transform duration-200 ${
              dropdownOpen ? "rotate-180" : ""
            }`}
          >
            <ChevronIcon />
          </span>
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div
            className="absolute right-0 mt-2 w-48 bg-white rounded-2xl border border-blue-100 py-1.5 z-50"
            style={{ boxShadow: "0 8px 30px rgba(99,102,241,0.12)" }}
          >
            
              <button
                onClick={() => setShowProfileModal(true)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150 text-left"
              >
                <span className="text-base">👤</span>
                My Profile
              </button>
              <button
                onClick={() => onClose(true)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150 text-left"
              >
                <span className="text-base">🔐</span>
                App Password
              </button>
            
            <div className="my-1.5 border-t border-blue-50" />
            <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-rose-500 hover:bg-rose-50 transition-colors duration-150 text-left">
              <span className="text-base">🚪</span>
              Sign Out
            </button>
          </div>
        )}
        <ProfileModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          user={user}
        />
        <AppPassword
        isOpen={isOpen}
        onClose={onClose}
        />
      </div>
    </nav>
  );
}
