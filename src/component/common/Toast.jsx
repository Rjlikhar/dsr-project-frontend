import { useEffect } from "react";
import { FaCheck } from "react-icons/fa";

export function Toast({ msg, show, code }) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-slate-900 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-2xl transition-all duration-200 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`}
    >
      {code==200?<span className="text-emerald-400 text-base">✓</span>:<span className="text-red-500 text-base">X</span>}{msg}
    </div>
  );
}


// component/Toast.jsx



export default function Notification({
  message,
  show,
  onClose,
}) {
  
  if (!show) return null;

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[999] animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="min-w-[320px] max-w-md bg-white border border-slate-200 shadow-2xl rounded-2xl px-4 py-3 flex items-start gap-3">
        
        <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
          <FaCheck  className="text-green-500 w-5 h-5" />
        </div>

        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-800">
            Notification
          </p>

          <p className="text-sm text-slate-500 mt-0.5">
            {message}
          </p>
        </div>

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 transition"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
