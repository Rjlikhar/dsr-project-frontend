import { useEffect, useState } from "react";
import { STATUS_CONFIG_DSRLIST } from "../constant/statusConfig";
import DSRDetails from "./DSRDetails";
import { fmt } from "../utils/formateDate";
import { dummyDSRList } from "../constant/dummyDSRList";

export function getDSRStatus(tasks = []) {
  if (tasks.every((t) => t.status === "DONE")) return "DONE";
  if (tasks.some((t) => t.status === "BLOCKED")) return "BLOCKED";
  if (tasks.some((t) => t.status === "IN_PROGRESS")) return "IN_PROGRESS";
  return "PLANNED";
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function DSRList({
  dsrList,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) {
  const [selected, setSelected] = useState(null);
  const filtered = dsrList.filter((dsr) => {
    if (startDate && dsr.data.meta.date < startDate) return false;
    if (endDate && dsr.data.meta.date > endDate) return false;
    return true;
  });

  return (
    <>
      {/* ── Date Filters ── */}
      <div className="flex items-center gap-2 flex-wrap mb-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        {(startDate || endDate) && (
          <button
            onClick={() => {
              setStartDate("");
              setEndDate("");
            }}
            className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-500"
          >
            Reset
          </button>
        )}
      </div>

      {/* ── DSR List ── */}
      <div className="flex flex-col gap-2">
        {filtered.length === 0 && (
          <p className="text-center text-slate-400 text-sm py-10">
            No DSRs found for this range.
          </p>
        )}

        {filtered.map((dsr, idx) => {
          const status = getDSRStatus(dsr.data.tasks);
          const s =
            STATUS_CONFIG_DSRLIST[status] ?? STATUS_CONFIG_DSRLIST.PLANNED;
          const doneCnt = dsr?.data?.tasks?.filter(
            (t) => t.status === "DONE",
          ).length;

          return (
            <div
              key={idx}
              onClick={() => setSelected(dsr.data)}
              className={`bg-white rounded-xl border border-slate-100 border-l-4 ${s.left}
                          p-4 cursor-pointer hover:shadow-md hover:border-slate-200 transition-all`}
            >
              <div className="flex items-start justify-between gap-3">
                {/* Left: dot + date + bootcamp day */}
                <div className="flex items-start gap-2.5">
                  <span
                    className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${s.dot}`}
                  />
                  <div>
                    <p className="font-medium text-slate-800 text-sm">
                      {fmt(dsr?.data?.meta?.date)}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Bootcamp Day {dsr?.data?.meta?.bootcamp.day} &nbsp;·&nbsp;{" "}
                      {dsr?.data?.time?.totalHours}h logged
                    </p>
                  </div>
                </div>

                {/* Right: status badge */}
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${s.badge}`}
                >
                  {s.label}
                </span>
              </div>

              {/* Task preview */}
              <p className="text-xs text-slate-500 mt-2 pl-5 truncate">
                {doneCnt}/{dsr?.data?.tasks?.length} tasks done &nbsp;·&nbsp;
                {dsr?.data?.tasks?.map((t) => t.title).join(", ")}
              </p>
            </div>
          );
        })}
      </div>

      <DSRDetails selected={selected} onClose={() => setSelected(null)} />
    </>
  );
}
