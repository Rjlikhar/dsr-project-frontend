import { useState } from "react";
import { STATUS_CYCLE, STATUS_META } from "../constant/status";

export function TaskCard({ task, onUpdate, onDelete }) {
  const [expanded, setExpanded] = useState(true);
  const meta = STATUS_META[task.status];

  const cycleStatus = () => {
    const next = STATUS_CYCLE[(STATUS_CYCLE.indexOf(task.status) + 1) % 3];
    onUpdate({
      ...task,
      status: next,
      completion: next === "DONE" ? 100 : next === "TODO" ? 0 : task.completion,
    });
  };

  const updateSub = (i, val) => {
    const subs = [...task.subtasks];
    subs[i] = val;
    onUpdate({ ...task, subtasks: subs });
  };

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white hover:border-slate-300 hover:shadow-sm transition-all group">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-slate-50 to-white group">
        <button
          onClick={() => setExpanded(!expanded)}
          className={`text-slate-300 hover:text-slate-500 text-xs transition-transform duration-200 shrink-0 ${expanded ? "rotate-90" : ""}`}
        >
          ▶
        </button>

        <input
          className="flex-1 min-w-0 text-sm font-semibold text-slate-700 bg-transparent border-none outline-none placeholder-slate-300"
          value={task.title}
          onChange={(e) => onUpdate({ ...task, title: e.target.value })}
          placeholder="Task title..."
        />

        {/* ⏱ Time Input (hours) */}
        <input
          type="number"
          min="0"
          step="1"
          value={task.timeSpent || ""}
          onChange={(e) => {
            const minutes= Number(e.target.value)||0;
            onUpdate({ ...task, timeSpent:minutes})
          }}
          placeholder="min"
          className="w-14 text-xs text-center font-semibold text-slate-600 bg-slate-100 rounded-md px-1 py-1 outline-none"
        />

        <button
          onClick={cycleStatus}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all shrink-0 ${meta.badge}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
          {meta.label}
        </button>

        <button
          onClick={onDelete}
          className="text-red-500 hover:text-rose-400 text-lg leading-none transition-colors shrink-0"
        >
          ×
        </button>
      </div>

      {/* Body */}
      {expanded && (
        <div className="px-4 pb-3 pt-1 border-t border-slate-50">
          {task.status === "IN_PROGRESS" && (
            <div className="flex items-center gap-3 mt-2 mb-2">
              <span className="text-[11px] text-slate-400 w-14 shrink-0">
                Progress
              </span>
              <div className="relative flex-1 h-2 bg-amber-100 rounded-full">
                <div
                  className="absolute left-0 top-0 h-2 rounded-full bg-amber-500 transition-all"
                  style={{ width: `${task.completion}%` }}
                />
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={task.completion}
                  onChange={(e) =>
                    onUpdate({ ...task, completion: +e.target.value })
                  }
                  className="absolute inset-0 w-full opacity-0 cursor-pointer"
                />
              </div>
              <span className="text-xs font-bold text-amber-600 w-9 text-right tabular-nums shrink-0">
                {task.completion}%
              </span>
            </div>
          )}
          {task.subtasks.length > 0 && (
            <div className="ml-6 pl-3 border-l-2 border-slate-100 flex flex-col gap-1.5 mt-2">
              {task.subtasks.map((s, j) => (
                <div key={j} className="flex items-center gap-2 group/sub">
                  <span className="text-slate-200 text-xs">›</span>
                  <input
                    className="flex-1 text-xs text-slate-500 bg-transparent border-none border-b border-slate-100 outline-none py-0.5 placeholder-slate-200 focus:border-blue-300 transition"
                    value={s}
                    onChange={(e) => updateSub(j, e.target.value)}
                    placeholder="Subtask..."
                  />
                  <button
                    onClick={() =>
                      onUpdate({
                        ...task,
                        subtasks: task.subtasks.filter((_, k) => k !== j),
                      })
                    }
                    className="text-slate-100 hover:text-rose-300 text-sm leading-none transition opacity-0 group-hover/sub:opacity-100"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          <button
            onClick={() =>
              onUpdate({ ...task, subtasks: [...task.subtasks, ""] })
            }
            className="mt-2 ml-6 text-[11px] text-slate-300 hover:text-blue-400 transition-colors"
          >
            + add subtask
          </button>
        </div>
      )}
    </div>
  );
}
