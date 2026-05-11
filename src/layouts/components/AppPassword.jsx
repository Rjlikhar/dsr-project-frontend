import { useState } from "react";
import axios from "axios";
import { appPasswordService } from "../../feature/auth/services/authServices";
import { Toast } from "../../component/common/Toast";

export default function AppPassword({ isOpen, onClose }) {
  const [appPassword, setAppPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "",code:"" });

  if (!isOpen) return null;

  const handleSave = async () => {
    const password = appPassword.replace(/\s/g, "");

    if (!password || password.length < 8) {
      setAppPassword("");
      return setToast({
        show: true,
        msg: "Password must be at least 8 characters",
        code: 400,
      });
    }

    try {
      setLoading(true);

      const data = await appPasswordService.saveAppPassword(password);

      setToast({
        show: true,
        msg: "App password successfully added!.",
        code: 200,
      });

      setAppPassword("");

    } catch (err) {
      setToast({
        show: true,
        msg:
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message,
        code: 400,
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] bg-black/40 flex items-center justify-center p-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-6 text-center relative">
          <button
            onClick={()=>onClose(false)}
            className="absolute top-3 right-4 text-white/80 hover:text-white text-xl"
          >
            ×
          </button>

          <h2 className="text-xl font-black text-white">
            🔐 App Password
          </h2>

          <p className="text-sm text-blue-100 mt-1">
            Required for sending DSR emails
          </p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">

          {/* Input */}
          <div>
            <label className="text-sm font-semibold text-slate-600">
              Enter App Password
            </label>

            <input
              type="password"
              value={appPassword}
              onChange={(e) => setAppPassword(e.target.value.replace(/\s/g, ""))}
              placeholder="Enter your email app password"
              className="mt-2 w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-400 outline-none transition"
            />
          </div>

          {/* Warning */}
          <div className="bg-yellow-50 border border-yellow-100 text-yellow-700 text-xs p-3 rounded-xl">
            ⚠️ This is your email <b>App Password</b>, not your normal email password.
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white font-bold py-2.5 rounded-xl shadow-md transition active:scale-[0.98]"
          >
            {loading ? "Saving..." : "Save Password"}
          </button>

          {/* Cancel */}
          <button
            onClick={()=>onClose(false)}
            className="w-full text-sm text-slate-500 hover:text-slate-700 transition"
          >
            Cancel
          </button>
        </div>
        <Toast msg={toast.msg} show={toast.show} code={toast.code} />
      </div>
    </div>
  );
}