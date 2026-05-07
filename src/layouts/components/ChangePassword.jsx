import { useState } from "react";
import useAuth from "../../feature/auth/hooks/useAuth";

export default function ChangePasswordModal({
  isOpen,
  onClose,
}) {
  const { changePassword, loading } = useAuth();

  const inputCls =
    "w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400/60 focus:border-transparent transition";

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetForm = () => {
    setForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      if (
        !form.currentPassword ||
        !form.newPassword ||
        !form.confirmPassword
      ) {
        throw new Error("All fields are required");
      }

      if (
        form.newPassword !== form.confirmPassword
      ) {
        throw new Error(
          "New password and confirm password do not match"
        );
      }

      await changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      alert("Password changed successfully!");

      resetForm();
      onClose();

    } catch (err) {
      setError(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 relative animate-in fade-in zoom-in-95 duration-200">

        {/* Close Button */}
        <button
          onClick={() => {
            resetForm();
            onClose();
          }}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-xl"
        >
          ×
        </button>

        {/* Header */}
        <div className="mb-6 text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-black">
            🔒
          </div>

          <h2 className="text-xl font-black mt-3 text-slate-800">
            Change Password
          </h2>

          <p className="text-sm text-slate-400">
            Update your account password securely
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
            {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <input
            type="password"
            placeholder="Current Password"
            className={inputCls}
            value={form.currentPassword}
            onChange={(e) =>
              handleChange(
                "currentPassword",
                e.target.value
              )
            }
          />

          <input
            type="password"
            placeholder="New Password"
            className={inputCls}
            value={form.newPassword}
            onChange={(e) =>
              handleChange(
                "newPassword",
                e.target.value
              )
            }
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            className={inputCls}
            value={form.confirmPassword}
            onChange={(e) =>
              handleChange(
                "confirmPassword",
                e.target.value
              )
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold py-3 rounded-2xl shadow-md hover:shadow-lg transition active:scale-[0.98] disabled:opacity-50"
          >
            {loading
              ? "Updating..."
              : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}