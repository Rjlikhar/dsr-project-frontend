function DSRModal({ dsr, onClose }) {
  if (!dsr) return null;

  const done = dsr.tasks?.filter((t) => t.status === "DONE").length || 0;
  const total = dsr.tasks?.length || 0;
  const pending = total - done;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              DSR — {dsr.date}
            </h2>
            <p className="text-sm text-slate-400 mt-0.5">{total} tasks total</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Stats bar */}
        <div className="flex gap-4 px-5 py-3 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 inline-block" />
            <span className="text-sm text-slate-600">{done} Done</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
            <span className="text-sm text-slate-600">{pending} Pending</span>
          </div>
          {dsr.note && (
            <div className="ml-auto text-sm text-slate-400 italic truncate max-w-[180px]">
              "{dsr.note}"
            </div>
          )}
        </div>

        {/* Task list */}
        <div className="overflow-y-auto flex-1 p-5">
          {total === 0 ? (
            <p className="text-slate-400 text-center py-8">
              No tasks recorded.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {dsr.tasks.map((task, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <span
                    className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      task.status === "DONE"
                        ? "bg-green-100 text-green-600"
                        : "bg-amber-100 text-amber-600"
                    }`}
                  >
                    {task.status === "DONE" ? "✓" : "…"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium ${
                        task.status === "DONE"
                          ? "line-through text-slate-400"
                          : "text-slate-700"
                      }`}
                    >
                      {task.title || task.name || `Task ${i + 1}`}
                    </p>
                    {task.description && (
                      <p className="text-xs text-slate-400 mt-0.5 truncate">
                        {task.description}
                      </p>
                    )}
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${
                      task.status === "DONE"
                        ? "bg-green-100 text-green-600"
                        : "bg-amber-100 text-amber-600"
                    }`}
                  >
                    {task.status || "PENDING"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-100">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default DSRModal;