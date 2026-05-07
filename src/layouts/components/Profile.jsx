import { useState } from "react";
import ChangePasswordModal from "./ChangePassword";

export default function ProfileModal({ isOpen, onClose, user }) {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  if (!isOpen) return null;

  const initials =
    user.name
      ?.split(" ")
      ?.map((word) => word[0])
      ?.join("")
      ?.slice(0, 2)
      ?.toUpperCase() || "U";

  /* =========================
     CHANGE PASSWORD HANDLER
     (future API ready)
  ========================= */

  return (
    <div className="fixed inset-0 z-[999] bg-black/40 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-8 text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white text-xl"
          >
            ×
          </button>

          <div className="w-20 h-20 mx-auto rounded-3xl bg-white/20 backdrop-blur flex items-center justify-center text-white text-2xl font-black shadow-lg">
            {initials}
          </div>

          <h2 className="text-xl font-black text-white mt-4">{user.name}</h2>

          <p className="text-sm text-blue-100 mt-1">Account information</p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Name */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Full Name
            </p>
            <p className="text-sm font-semibold text-slate-800 break-words">
              {user.name || "Not available"}
            </p>
          </div>

          {/* Email */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Email Address
            </p>
            <p className="text-sm font-semibold text-slate-800 break-words">
              {user.email || "Not available"}
            </p>
          </div>

          {/* Change Password Button */}
          <button
            onClick={() => setShowPasswordModal(true)}
            className="w-full border border-blue-200 text-blue-600 font-semibold py-2.5 rounded-2xl hover:bg-blue-50 transition"
          >
            Change Password
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold py-3 rounded-2xl shadow-md hover:shadow-lg transition active:scale-[0.98]"
          >
            Close Profile
          </button>
        </div>
        <ChangePasswordModal
          isOpen={showPasswordModal}
          onClose={() => setShowPasswordModal(false)}
        />
      </div>
    </div>
  );
}
