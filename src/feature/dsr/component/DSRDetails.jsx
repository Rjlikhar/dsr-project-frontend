import React from "react";
import { STATUS_CONFIG_DSRLIST } from "../constant/statusConfig";
import { fmt } from "../utils/formateDate";
import { ScoreBar } from "./ScoreBar";

export function getDSRStatus(tasks = []) {
  if (tasks.every((t) => t.status === "DONE")) return "DONE";
  if (tasks.some((t) => t.status === "BLOCKED")) return "BLOCKED";
  if (tasks.some((t) => t.status === "IN_PROGRESS")) return "IN_PROGRESS";
  return "PLANNED";
}

export function DSRDetails({ selected, onClose }) {
  return (
    <>
      {/* ── Detail Modal ── */}
      {selected &&
        (() => {
          const status = getDSRStatus(selected.tasks);
          const s =
            STATUS_CONFIG_DSRLIST[status] ?? STATUS_CONFIG_DSRLIST.PLANNED;
          const dist = selected.time.distribution;

          return (
            <div
              className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4"
              onClick={onClose}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border-t-4 ${s.top} shadow-xl`}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">
                        {fmt(selected.meta.date)}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Bootcamp Day {selected.meta.bootcamp.day}
                        &nbsp;·&nbsp; Mentor: {selected.meta.mentor}
                        &nbsp;·&nbsp; Reviewer: {selected.meta.codeReviewer}
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-500 flex items-center justify-center text-lg flex-shrink-0"
                    >
                      ×
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mb-5 mt-2">
                    <span
                      className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${s.badge}`}
                    >
                      {s.label}
                    </span>
                    <span className="text-xs text-slate-400">
                      {selected.time.totalHours}h total
                    </span>
                  </div>

                  {/* Scores */}
                  <div className="mb-5 p-3 bg-slate-50 rounded-xl flex flex-col gap-2">
                    <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400 mb-1">
                      Scores
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 w-32">
                        Productivity
                      </span>
                      <ScoreBar
                        value={selected.meta.scores.productivity}
                        color="bg-blue-400"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 w-32">
                        Impact
                      </span>
                      <ScoreBar
                        value={selected.meta.scores.impact}
                        color="bg-teal-400"
                      />
                    </div>
                  </div>

                  {/* Time Distribution */}
                  <div className="mb-5">
                    <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400 mb-2">
                      Time Distribution
                    </p>
                    <div className="flex gap-1 h-2 rounded-full overflow-hidden">
                      {[
                        { key: "development", color: "bg-blue-400" },
                        { key: "debugging", color: "bg-orange-400" },
                        { key: "planning", color: "bg-violet-400" },
                        { key: "learning", color: "bg-teal-400" },
                        { key: "meetings", color: "bg-slate-300" },
                      ].map(({ key, color }) =>
                        dist[key] > 0 ? (
                          <div
                            key={key}
                            className={`${color} rounded-full`}
                            style={{ flex: dist[key] }}
                            title={`${key}: ${dist[key]}h`}
                          />
                        ) : null,
                      )}
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                      {[
                        {
                          key: "development",
                          color: "bg-blue-400",
                          label: "Dev",
                        },
                        {
                          key: "debugging",
                          color: "bg-orange-400",
                          label: "Debug",
                        },
                        {
                          key: "planning",
                          color: "bg-violet-400",
                          label: "Planning",
                        },
                        {
                          key: "learning",
                          color: "bg-teal-400",
                          label: "Learning",
                        },
                        {
                          key: "meetings",
                          color: "bg-slate-300",
                          label: "Meetings",
                        },
                      ]
                        .filter(({ key }) => dist[key] > 0)
                        .map(({ key, color, label }) => (
                          <span
                            key={key}
                            className="flex items-center gap-1 text-xs text-slate-500"
                          >
                            <span className={`w-2 h-2 rounded-full ${color}`} />
                            {label} {dist[key]}h
                          </span>
                        ))}
                    </div>
                  </div>

                  {/* Tasks */}
                  <div className="mb-5">
                    <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400 mb-2">
                      Tasks
                    </p>
                    <div className="flex flex-col gap-2">
                      {selected.tasks.map((task, i) => {
                        const ts =
                          STATUS_CONFIG_DSRLIST[task.status] ??
                          STATUS_CONFIG_DSRLIST.PLANNED;
                        return (
                          <div
                            key={i}
                            className={`rounded-lg border-l-4 ${ts.left} bg-slate-50 px-3 py-2`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-sm font-medium text-slate-700">
                                {task.title}
                              </p>
                              <span
                                className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${ts.badge}`}
                              >
                                {ts.label}
                              </span>
                            </div>
                            {/* Progress bar */}
                            <div className="mt-1.5 h-1 bg-slate-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${ts.dot}`}
                                style={{ width: `${task.completion}%` }}
                              />
                            </div>
                            <p className="text-[10px] text-slate-400 mt-1">
                              {task.completion}% · {task.timeSpent}h
                            </p>
                            {task.subtasks?.length > 0 && (
                              <ul className="mt-1.5 flex flex-col gap-0.5">
                                {task.subtasks.map((sub, j) => (
                                  <li
                                    key={j}
                                    className="flex items-center gap-1.5 text-xs text-slate-500"
                                  >
                                    <span
                                      className={`w-3.5 h-3.5 rounded-full ${ts.tick} text-white flex items-center justify-center text-[8px] flex-shrink-0`}
                                    >
                                      ✓
                                    </span>
                                    {sub}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Challenges */}
                  {selected.challenges?.length > 0 && (
                    <div className="mb-5">
                      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400 mb-2">
                        Challenges
                      </p>
                      <div className="flex flex-col gap-2">
                        {selected.challenges.map((c, i) => (
                          <div
                            key={i}
                            className={`rounded-lg p-3 text-xs ${c.status === "RESOLVED" ? "bg-teal-50 border border-teal-100" : "bg-orange-50 border border-orange-100"}`}
                          >
                            <p
                              className={`font-medium ${c.status === "RESOLVED" ? "text-teal-700" : "text-orange-700"}`}
                            >
                              {c.challenge}
                            </p>
                            {c.resolution && (
                              <p className="text-slate-500 mt-0.5">
                                → {c.resolution}
                              </p>
                            )}
                            {!c.resolution && (
                              <p className="text-orange-400 mt-0.5 italic">
                                Not yet resolved
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Commits */}
                  {selected.commits?.length > 0 && (
                    <div className="mb-5">
                      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400 mb-2">
                        Commits
                      </p>
                      <div className="flex flex-col gap-1">
                        {selected.commits.map((c, i) => (
                          <p
                            key={i}
                            className="text-xs text-slate-600 font-mono bg-slate-50 rounded px-2 py-1"
                          >
                            {c}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* References */}
                  {selected.references?.length > 0 && (
                    <div className="mb-5">
                      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400 mb-2">
                        References
                      </p>
                      <div className="flex flex-col gap-1">
                        {selected.references.map((r, i) => (
                          <a
                            key={i}
                            href={r}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-blue-500 hover:underline truncate"
                          >
                            {r}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Next Plan */}
                  {selected.nextPlan && (
                    <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl">
                      <p className="text-[11px] font-medium uppercase tracking-wide text-blue-400 mb-1.5">
                        Tomorrow's Plan · {fmt(selected.nextPlan.date)}
                      </p>
                      <ul className="flex flex-col gap-1">
                        {selected.nextPlan.tasks.map((t, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-xs text-blue-700"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })()}
    </>
  );
}

export default DSRDetails;
