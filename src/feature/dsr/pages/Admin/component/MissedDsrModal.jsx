// component/MissedDsrModal.jsx

import { useState } from "react";
import { dsrService } from "../../../services/dsrService";
export default function MissedDsrModal({
   
  request,
  onClose,
}) {
  const [loading, setLoading] = useState(false);

  if (!request) return null;

  const handleUpdateStatus = async (status) => {
  try {
    setLoading(true);

    
    await dsrService.updateMissedDsrStatus(request.id,{
      status: status,
    });

    onClose();
    window.location.reload();
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toISOString().split("T")[0];
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Missed DSR Request
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              {request.user?.name}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          <div>
            <p className="text-xs text-slate-400 mb-1">
              Employee
            </p>

            <p className="text-sm font-medium text-slate-700">
              {request.user?.name}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400 mb-1">
              Email
            </p>

            <p className="text-sm font-medium text-slate-700">
              {request.user?.email}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400 mb-1">
              Request Date
            </p>

            <p className="text-sm font-medium text-slate-700">
              {formatDate(request.request_date)}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400 mb-1">
              Reason
            </p>

            <div className="bg-slate-50 rounded-xl p-3 text-sm text-slate-700">
              {request.reason}
            </div>
          </div>

          <div>
            <p className="text-xs text-slate-400 mb-1">
              Status
            </p>

            <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
              {request.status}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-100 flex items-center gap-3">
          <button
            onClick={() => handleUpdateStatus("approved")}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold transition"
          >
            Approve
          </button>

          <button
            onClick={() => handleUpdateStatus("rejected")}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}