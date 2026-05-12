import { useState } from "react";
import {
  FiAlertCircle,
  FiCalendar,
  FiSend,
  FiX,
} from "react-icons/fi";
import { adminService } from "../service/adminService";

const defaultDsrRequest = {
  allowedDate: "",
  reason: "",
};

export default function DrsRequestModel({openModal, setOpenModal}) {
  

  const [dsrRequest, setDsrRequest] =useState(defaultDsrRequest);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const setDsr = (key, value) => {
    setDsrRequest((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDsrApprovalRequest = async () => {
    // Validation
    if (!dsrRequest.allowedDate || !dsrRequest.reason.trim()) {
      setError("All fields are required.");
      return; // stop API call
    }

    try {
      setError("");

      const payload = {
        request_date: dsrRequest.allowedDate,
        reason: dsrRequest.reason,
      };

      await adminService.sendDsrApprovalRequest(payload);

      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        setOpenModal(false);
      }, 2000);

      setDsrRequest(defaultDsrRequest);

    } catch (err) {
      console.log(err);

      setSuccess(false);

      const backendMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to send request.";

      setError(backendMessage);
    }
  };

  return (
    <>
      {openModal && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-white rounded-[24px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center">
                  <FiCalendar className="w-5 h-5 text-amber-500" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-800">
                    Previous Day DSR Request
                  </h3>

                  <p className="text-sm text-slate-400 mt-0.5">
                    Send approval request to admin
                  </p>
                </div>
              </div>

              <button
                onClick={() => setOpenModal(false)}
                className="w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center transition"
              >
                <FiX className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
            {error && (
              <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 text-sm font-semibold px-5 py-3 rounded-2xl mb-5">
                <FiAlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
              {success && (
                <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold px-5 py-3 rounded-2xl mb-5">
                  Request sent successfully!
                </div>
              )}

              <div className="space-y-4">
                <Field label="Missed DSR Date">
                  <input
                    type="date"
                    className={inp}
                    value={dsrRequest.allowedDate}
                    onChange={(e) =>
                      setDsr(
                        "allowedDate",
                        e.target.value
                      )
                    }
                  />
                </Field>

                <Field label="Reason">
                  <textarea
                    rows={5}
                    className={`${inp} h-auto py-3 resize-none`}
                    placeholder="Explain why you missed the DSR submission"
                    value={dsrRequest.reason}
                    onChange={(e) =>
                      setDsr("reason", e.target.value)
                    }
                  />
                </Field>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 px-6 py-5 border-t border-slate-100 bg-slate-50">
              <button
                onClick={() => {
                  setOpenModal(false);
                  setDsrRequest(defaultDsrRequest);
                }}
                className="h-11 px-5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleDsrApprovalRequest}
                className="h-11 px-5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold flex items-center gap-2 transition"
              >
                <FiSend className="w-4 h-4" />
                Send Request
              </button>
            </div>
          </div>
        </div>}
    </>
  );
}

const inp =
  "w-full h-[44px] px-3.5 border-[1.5px] border-slate-200 rounded-xl text-sm text-slate-700 bg-white outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10 transition placeholder:text-slate-300";

function Field({
  label,
  children,
  className = "",
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
        {label}
      </p>

      {children}
    </div>
  );
}