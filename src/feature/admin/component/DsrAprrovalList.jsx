// component/MissedDsrApproval.jsx

import { useEffect, useState } from "react";
import MissedDsrModal from "./MissedDsrModal";
import { adminService } from "../service/adminService";
const STATUS_CONFIG = {
  pending: {
    dot: "bg-amber-400",
    badge: "bg-amber-100 text-amber-700",
    label: "Pending",
    left: "border-l-amber-400",
  },
  approved: {
    dot: "bg-green-400",
    badge: "bg-green-100 text-green-700",
    label: "Approved",
    left: "border-l-green-400",
  },
  rejected: {
    dot: "bg-red-400",
    badge: "bg-red-100 text-red-700",
    label: "Rejected",
    left: "border-l-red-400",
  },
};

export default function DsrApprovalList() {
  const [requests, setRequests] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await adminService.getAllMissedDsrRequests();

      setRequests(response.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toISOString().split("T")[0];
  };
  
  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 p-5 mt-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Missed DSR Requests
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              Manage missed DSR approvals
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {requests.length === 0 && (
            <p className="text-center text-slate-400 py-8">No requests found</p>
          )}

          {requests.map((request) => {
            const s = STATUS_CONFIG[request.status] || STATUS_CONFIG.pending;

            return (
              <div
                key={request.id}
                onClick={() => setSelected(request)}
                className={`bg-white border border-slate-100 border-l-4 ${s.left}
                rounded-xl p-4 cursor-pointer hover:shadow-md transition-all`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span
                      className={`w-2.5 h-2.5 rounded-full mt-1.5 ${s.dot}`}
                    />

                    <div>
                      <p className="font-semibold text-slate-800 text-sm">
                        {request.user?.name}
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        {request.user?.email}
                      </p>

                      <p className="text-xs text-slate-500 mt-2">
                        Request Date : {formatDate(request.request_date)}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${s.badge}`}
                  >
                    {s.label}
                  </span>
                </div>

                <p className="text-xs text-slate-500 mt-3 line-clamp-1">
                  {request.reason}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <MissedDsrModal key={selected?.id} request={selected} onClose={() => setSelected(null)} />
    </>
  );
}
