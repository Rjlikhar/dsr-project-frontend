import { useState, useEffect } from "react";
import { getUser, saveUser } from "../utils/storage";
import { STATUS_CYCLE, STATUS_META } from "../constant/status";
import { fmtDate } from "../utils/formateDate";
import Section from "../../../component/common/Section";
import { ScoreSlider } from "../component/ScoreSlider";
import { TIME_BG_CLS, TIME_KEYS, TIME_META } from "../constant/time";
import { TimeBar } from "../component/TimeBar";
import { TaskCard } from "../component/TaskCard";
import { Field } from "../../../component/common/Field";
import { Toast } from "../../../component/common/Toast";
import { calculateTotalHours } from "../utils/calculateTotalHours";
import { useDsr } from "../hooks/useDsr";
import { getYesterday } from "../utils/getYesterday";
import { buildEmailHTML, DSRPreviewModal } from "../component/DSRPreviewModal";
import { dsrService } from "../services/dsrService";
import { initialData } from "../constant/initialData";
import FullScreenLoader from "../../../component/common/Loader";

export default function CreateDSR() {
  const {
    data,
    setData,
    setPath,
    setToast,
    toast,
    updateTask,
    isEdit,
    setIsEdit,
    addChallenge,
    deleteChallenge,
    updateChallenge,
    addReference,
    deleteReference,
    updateReference,
    addCommit,
    deleteCommit,
    updateCommit,
    addNextTask,
    deleteNextTask,
    updateNextTask,
    handleSave,
    handleSend,
    loader,
    setLoader
  } = useDsr();

  const inputCls =
    "w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400/60 focus:border-transparent transition";
  const textareaCls = `${inputCls} resize-y min-h-[50px]`;
  const yesterday = getYesterday();
  const challenges = data.challenges;
  const [showPreview, setShowPreview] = useState(false);
  const emailHTML = buildEmailHTML(data);
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchLastDsr = async () => {
      try {
        setLoader(true)
        const allDsrs = await dsrService.getAllDsrs();
        const userDsrs = allDsrs.data.filter((dsr) => dsr.user_id === user?.id);
        if (userDsrs.length > 0) {
          const lastDsr = userDsrs.sort(
            (a, b) => new Date(b.work_date) - new Date(a.work_date),
          )[0];
          //   // Set only DSR data structure
          setData((prev) => ({
            ...initialData,
            ...prev,
            ...lastDsr.data,
            meta: {
              ...initialData.meta,
              ...prev.meta,
              ...lastDsr.data?.meta,
            },
            time: {
              ...initialData.time,
              ...lastDsr.data?.time,
              distribution: {
                ...initialData.time.distribution,
                ...lastDsr.data?.time?.distribution,
              },
            },
            nextPlan: {
              ...initialData.nextPlan,
              ...lastDsr.data?.nextPlan,
            },
          }));
        } else {
          setData(initialData);
        }
      } catch (error) {
        console.error("Failed to fetch last DSR:", error);
        setData(initialData);
      }finally{
        setLoader(false)
      }
    };

    fetchLastDsr();
  }, []);

  // Load
  useEffect(() => {
    const user = getUser();
    if (user) {
      setData((prev) => ({
        ...prev,
        meta: {
          ...prev.meta,
          ...user,
        },
      }));
    }
  }, []);

  useEffect(() => {
    saveUser({
      userId: data.meta?.userId,
      mentor: data.meta?.mentor,
      codeReviewer: data.meta?.codeReviewer,
    });
  }, [data.meta?.mentor, data.meta?.codeReviewer, data.meta?.userId]);

  const totalHours = Object.values(data.time?.distribution || {}).reduce(
    (sum, val) => sum + (parseFloat(val) || 0),
    0,
  );

  const taskSummary = STATUS_CYCLE.map((s) => ({
    s,
    count: data.tasks?.filter((t) => t.status === s).length,
  })).filter((x) => x.count > 0);

  return (
    <>
    <FullScreenLoader loading={loader}/>
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50/40 to-slate-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* ── Hero Header ── */}
        <div
          style={{
            background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
            boxShadow: "0 4px 14px rgba(99,102,241,0.28)",
          }}
          className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl overflow-hidden shadow-2xl mb-5"
        >
          <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-blue-500/10 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-violet-600/10 blur-2xl" />
          <div className="absolute top-4 right-4 w-32 h-32 rounded-full border border-white/5" />
          <div className="absolute top-8 right-8 w-20 h-20 rounded-full border border-white/5" />

          {/* Top bar */}
          <div className="relative flex flex-col sm:flex-row sm:items-center gap-4 px-7 pt-7 pb-5">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-900/50 shrink-0">
                <span className="text-white font-black text-[11px] tracking-tight">
                  DSR
                </span>
              </div>
              <div>
                <h1 className="text-white text-xl font-black tracking-tight leading-tight">
                  Daily Status Report
                </h1>
                <p className="text-slate-300 text-sm mt-0.5">
                  {fmtDate(data.meta?.date)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="date"
                value={data.meta?.date}
                min={yesterday}
                max={yesterday}
                onChange={(e) => setPath(["meta", "date"], e.target.value)}
                className="bg-white/10 border border-white/5 text-slate-200 text-sm rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/40 [color-scheme:dark] transition"
              />
              <button
                onClick={() => setIsEdit(!isEdit)}
                className="bg-white/10 border border-white/10 text-slate-200 text-sm rounded-xl px-1 py-1 outline-none"
              >
                {/* Pencil Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.232 5.232l3.536 3.536M9 11l6.536-6.536a2.5 2.5 0 113.536 3.536L12.536 14.536a4 4 0 01-1.414.943L9 16l.521-2.122A4 4 0 0110.464 12.464L17 6"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Stats strip */}
          <div className="relative grid grid-cols-3 border-t border-white/50 divide-x divide-white/50">
            {[
              {
                label: "Mentor",
                key: "mentor",
                val: data.meta?.mentor,
                icon: "👤",
              },
              {
                label: "codeReviewer",
                key: "codeReviewer",
                val: data.meta?.codeReviewer,
                icon: "👤",
              },
              {
                label: "Day",
                val: `Day ${data.meta?.bootcamp.day}`,
                icon: "🎓",
              },
            ].map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center justify-center py-4 gap-0.5"
              >
                <span className="text-base mb-0.5">{s.icon}</span>

                {/* ✅ Only Mentor & codeReviewer editable */}
                {isEdit &&
                (s.label === "Mentor" || s.label === "codeReviewer") ? (
                  <input
                    type="text"
                    value={s.val}
                    onChange={(e) => setPath(["meta", s.key], e.target.value)}
                    className="bg-white/10 border border-white/10 text-white text-sm rounded-lg px-2 py-1 text-center outline-none focus:ring-2 focus:ring-blue-500/40"
                    placeholder={`Enter ${s.label}`}
                  />
                ) : (
                  <span className="text-white font-black text-sm">{s.val}</span>
                )}

                <span className="text-slate-300 text-[10px] uppercase tracking-widest">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Cards ── */}
        <div className="flex flex-col gap-4">
          {/* Scores */}
          <Section icon="📊" title="Scores">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ScoreSlider
                label="Productivity Score"
                value={data.meta?.scores.productivity}
                onChange={(v) => setPath(["meta", "scores", "productivity"], v)}
                accent="bg-blue-500"
                trackAccent="bg-blue-200"
              />
              <ScoreSlider
                label="Project Impact Score"
                value={data.meta?.scores.impact}
                onChange={(v) => setPath(["meta", "scores", "impact"], v)}
                accent="bg-violet-500"
                trackAccent="bg-violet-200"
              />
            </div>
          </Section>

          {/* Time */}
          <Section icon="⏱" title="Time Allocation">
            <div className="flex flex-col gap-4 mb-5">
              {TIME_KEYS.map((k) => (
                <TimeBar
                  key={k}
                  keyName={k}
                  value={data.time?.distribution[k]}
                  onChange={(v) => {
                    const updatedDistribution = {
                      ...data.time?.distribution,
                      [k]: v,
                    };

                    setData((prev) => ({
                      ...prev,
                      time: {
                        ...prev.time,
                        distribution: updatedDistribution,
                        totalHours: calculateTotalHours(updatedDistribution), // 👈 update here
                      },
                    }));
                  }}
                />
              ))}
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Total hours
              </span>
              <span className="text-3xl font-black text-slate-800 tabular-nums">
                {totalHours}
                <span className="text-sm font-normal text-slate-300 ml-1">
                  hrs
                </span>
              </span>
            </div>
            {/* Bar chart */}
            {totalHours > 0 && (
              <div className="mt-4">
                <div className="flex gap-1 h-10 items-end">
                  {TIME_KEYS.filter((k) => data.time.distribution[k] > 0).map(
                    (k) => {
                      const pct =
                        (data.time.distribution[k] / totalHours) * 100;
                      return (
                        <div
                          key={k}
                          title={`${TIME_META[k].label}: ${data.time.distribution[k]}h`}
                          className={`${TIME_BG_CLS[k]} rounded-t-md transition-all duration-300 flex-1 min-w-[8px]`}
                          style={{ height: `${pct}%` }}
                        />
                      );
                    },
                  )}
                </div>
                <div className="flex gap-3 mt-2 flex-wrap">
                  {TIME_KEYS.filter((k) => data.time.distribution[k] > 0).map(
                    (k) => (
                      <div
                        key={k}
                        className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium"
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${TIME_BG_CLS[k]}`}
                        />
                        {TIME_META[k].label}
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}
          </Section>

          {/* Tasks */}
          <Section icon="✅" title="Tasks">
            {taskSummary.length > 0 && (
              <div className="flex gap-2 mb-4 flex-wrap">
                {taskSummary.map(({ s, count }) => (
                  <span
                    key={s}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${STATUS_META[s].badge}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${STATUS_META[s].dot}`}
                    />
                    {count} {STATUS_META[s].label}
                  </span>
                ))}
              </div>
            )}
            <div className="flex flex-col gap-2.5">
              {data.tasks?.map((task, i) => (
                <TaskCard
                  key={i}
                  task={task}
                  onUpdate={(t) => updateTask(i, t)}
                  onDelete={() =>
                    setData((p) => ({
                      ...p,
                      tasks: p.tasks.filter((_, j) => j !== i),
                    }))
                  }
                />
              ))}
            </div>
            <button
              onClick={() =>
                setData((p) => ({
                  ...p,
                  tasks: [
                    ...p.tasks,
                    { title: "", status: "TODO", completion: 0, subtasks: [] },
                  ],
                }))
              }
              className="mt-3 w-full border-2 border-dashed border-slate-200 hover:border-blue-300 hover:text-blue-400 rounded-xl py-2.5 text-sm text-slate-400 transition-all"
            >
              + Add task
            </button>
          </Section>

          {/* Challenges */}
          <Section icon="⚠️" title="Challenges & Resolutions">
            <div className="flex flex-col gap-3">
              {challenges?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg group"
                >
                  {/* Challenge */}
                  <input
                    type="text"
                    value={item.challenge}
                    onChange={(e) =>
                      updateChallenge(index, "challenge", e.target.value)
                    }
                    placeholder="Enter challenge..."
                    className="flex-1 text-sm px-2 py-1 bg-white rounded outline-none"
                  />

                  {/* Status */}
                  <select
                    value={item.status}
                    onChange={(e) =>
                      updateChallenge(index, "status", e.target.value)
                    }
                    className="text-xs px-2 py-1 bg-white rounded outline-none"
                  >
                    <option value="pending">Pending</option>
                    <option value="solved">ReSolved</option>
                  </select>

                  {/* ✅ Resolution (only if solved) */}
                  {item.status === "solved" && (
                    <input
                      type="text"
                      value={item.resolution}
                      onChange={(e) =>
                        updateChallenge(index, "resolution", e.target.value)
                      }
                      placeholder="Enter resolution..."
                      className="flex-1 text-sm px-2 py-1 bg-green-100 rounded outline-none"
                    />
                  )}

                  {/* ❌ Delete */}
                  <button
                    onClick={() => deleteChallenge(index)}
                    className="text-slate-300 hover:text-red-500 text-lg opacity-0 group-hover:opacity-100"
                  >
                    ×
                  </button>
                </div>
              ))}

              {/* ➕ Add Button */}
              <button
                onClick={addChallenge}
                className="self-start text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
              >
                + Add Challenge
              </button>
            </div>
          </Section>

          {/* References */}
          <Section icon="🔗" title="References & Commits">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Reference Links">
                <div className="flex flex-col gap-2">
                  {data.references?.map((ref, i) => (
                    <div key={i} className="flex items-center gap-2 group">
                      <textarea
                        className={textareaCls}
                        value={ref}
                        onChange={(e) => updateReference(i, e.target.value)}
                        placeholder="Docs, PRs, Jira links..."
                      />

                      <button
                        onClick={() => deleteReference(i)}
                        className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100"
                      >
                        ×
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={addReference}
                    className="text-xs text-blue-600 font-semibold"
                  >
                    + Add Reference
                  </button>
                </div>
              </Field>
              <Field label="Code Commit Links">
                <div className="flex flex-col gap-2">
                  {data.commits?.map((commit, i) => (
                    <div key={i} className="flex items-center gap-2 group">
                      <textarea
                        className={textareaCls}
                        value={commit}
                        onChange={(e) => updateCommit(i, e.target.value)}
                        placeholder="GitHub / GitLab commit URLs..."
                      />

                      <button
                        onClick={() => deleteCommit(i)}
                        className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100"
                      >
                        ×
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={addCommit}
                    className="text-xs text-blue-600 font-semibold"
                  >
                    + Add Commit
                  </button>
                </div>
              </Field>
            </div>
          </Section>

          {/* Next Day Plan */}
          <Section icon="📅" title="Next Day's Plan">
            <div className="bg-gradient-to-br from-blue-50 to-violet-50 border border-blue-100 rounded-xl p-5">
              <div className="mb-4">
                <Field label="Plan Date">
                  <input
                    type="date"
                    className={inputCls}
                    style={{ maxWidth: 220 }}
                    value={data.nextPlan?.date}
                    onChange={(e) =>
                      setPath(["nextPlan", "date"], e.target.value)
                    }
                  />
                </Field>
              </div>
              <Field label="Next Plan Tasks">
                <div className="flex flex-col gap-2">
                  {data.nextPlan?.tasks?.map((task, i) => (
                    <div key={i} className="flex items-center gap-2 group">
                      <input
                        type="text"
                        value={task}
                        onChange={(e) => updateNextTask(i, e.target.value)}
                        placeholder="Enter next task..."
                        className="flex-1 text-sm px-2 py-1 bg-slate-100 rounded outline-none border-white"
                      />

                      {/* ❌ Delete */}
                      <button
                        onClick={() => deleteNextTask(i)}
                        className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100"
                      >
                        ×
                      </button>
                    </div>
                  ))}

                  {/* ➕ Add Button */}
                  <button
                    onClick={addNextTask}
                    className="text-xs text-blue-600 font-semibold mt-1"
                  >
                    + Add Task
                  </button>
                </div>
              </Field>
            </div>
          </Section>

          {/* Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pb-10">
            {/* Save */}
            <button
              onClick={handleSave}
              className="flex items-center justify-center gap-2.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-sm rounded-2xl py-3.5 transition-all hover:shadow-md active:scale-[0.98]"
            >
              <span className="text-base">💾</span> Save
            </button>

            {/* Preview */}
            <button
              onClick={() => setShowPreview(true)}
              className="flex items-center justify-center gap-2.5 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 font-semibold text-sm rounded-2xl py-3.5 transition-all active:scale-[0.98]"
            >
              <span className="text-base">👁</span> Preview
            </button>

            {/* Send */}
            <button
              onClick={() => handleSend({ user, data, emailHTML, setToast })}
              className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-bold text-sm rounded-2xl py-3.5 shadow-lg transition-all active:scale-[0.98]"
            >
              <span className="text-base">🚀</span> Send
            </button>
          </div>
          {showPreview && (
            <DSRPreviewModal
              html={emailHTML}
              onClose={() => setShowPreview(false)}
            />
          )}
        </div>
      </div>

      <Toast msg={toast.msg} show={toast.show} code={toast.code} />
    </div>
  </>
  );
}
