import { formatDate } from "../utils/formateDate";
import { STATUS_CONFIG, TIME_LABELS } from "../constant/statusConfig";
import { ordinal } from "../constant/ordinal";

// ─── Sample Data ─────────────────────────────────────────────────────────────
export const initialData = {
  meta: {
    date: "2026-04-23",
    mentor: "Hrithik Veer",
    mentorEmail: "hrithik@autoappy.com",
    codeReviewer: "Hrithik Veer",
    bootcamp: { day: 2 },
    scores: { productivity: 7, impact: 7 },
  },
  time: {
    totalHours: 9,
    distribution: {
      development: 3,
      debugging: 2,
      planning: 1,
      learning: 1,
      meetings: 2,
    },
  },
  tasks: [
    {
      title: "Work on DSR Dashboard project",
      status: "DONE",
      subtasks: [
        "Discuss the project requirement in a meeting with Hrithik sir.",
        "Create a react project and start to build the frontend page for this project.",
        "Create the DSR form for user input.",
      ],
    },
  ],
  challenges: [{ challenge: "NA", status: "", resolution: "" }],
  references: [],
  commits: ["https://github.com/Bhushan2103/AutoAppy-DSR-Dashboard/pull/1"],
  nextPlan: {
    date: "2026-04-24",
    tasks: [
      "Continue to work on this project",
      "Add some new features like login page and user profile page.",
      "Also work on Database Schema and backend feature.",
    ],
  },
};

// ─── HTML Email Builder ───────────────────────────────────────────────────────
export function buildEmailHTML(data) {
  const dt = new Date(data.meta.date + "T00:00:00");
  const dayOrd = ordinal(dt.getDate());
  const monthYear = dt.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const dateLabel = formatDate(data.meta.date);
  const nextDateLabel = formatDate(data.nextPlan?.date);

  const borderStyle = "1px solid #000000";
  const headerBg = "#cccccc";
  const cellPad = "padding: 6px 10px;";
  const baseFont = "font-family: Arial, sans-serif; font-size: 11pt;";
  const tableStyle = `width: 100%; border-collapse: collapse; margin-bottom: 2px; ${baseFont}`;

  function thCell(text, extra = "") {
    return `<td style="border: ${borderStyle}; background: ${headerBg}; ${cellPad} font-weight: bold; color: #222222; ${extra}">${text}</td>`;
  }

  function tdCell(text, extra = "") {
    return `<td style="border: ${borderStyle}; ${cellPad} color: #111111; vertical-align: top; ${extra}">${text || "&nbsp;"}</td>`;
  }

  // Task rows
  const taskRows = data.tasks
    .map((task) => {
      const st = STATUS_CONFIG[task.status] || {
        label: task.status || "—",
        color: "#111",
      };
      const subtaskHTML = (task.subtasks || [])
        .map(
          (s) =>
            `<div style="padding-left: 12px; font-size: 10.5pt; color: #333333;">- ${s}</div>`,
        )
        .join("");
      return `<tr>
        <td style="border: ${borderStyle}; ${cellPad} vertical-align: top;">
          <div style="font-weight: bold; margin-bottom: 4px; font-family: Arial, sans-serif; font-size: 11pt;">${task.title}</div>
          ${subtaskHTML}
        </td>
        <td style="border: ${borderStyle}; ${cellPad} text-align: center; font-weight: 600; color: ${st.color}; vertical-align: top; font-family: Arial, sans-serif; font-size: 11pt;">${st.label}</td>
      </tr>`;
    })
    .join("");

  // Time rows
  const timeRows = Object.entries(data.time.distribution)
    .map(
      ([k, v]) => `<tr>
      ${tdCell(TIME_LABELS[k] || k, "width: 75%;")}
      ${tdCell(String(v), "text-align: center; width: 25%;")}
    </tr>`,
    )
    .join("");

  // Challenge rows
  const chalRows =
    data.challenges?.length > 0 &&
    data.challenges[0].challenge &&
    data.challenges[0].challenge !== "NA"
      ? data.challenges
          .map((c) => {
            const st = STATUS_CONFIG[c.status] || {
              label: c.status || "—",
              color: "#111",
            };
            return `<tr>
            ${tdCell(c.challenge, "width: 75%;")}
            <td style="border: ${borderStyle}; ${cellPad} text-align: center; font-weight: 600; color: ${st.color}; font-family: Arial, sans-serif; font-size: 11pt;">${st.label}</td>
          </tr>`;
          })
          .join("")
      : `<tr><td colspan="2" style="border: ${borderStyle}; ${cellPad} font-family: Arial, sans-serif; font-size: 11pt;">• NA</td></tr>`;

  const resText =
    data.challenges?.filter((c) => c.resolution).length > 0
      ? data.challenges
          .filter((c) => c.resolution)
          .map((c) => `• ${c.resolution}`)
          .join("<br/>")
      : "• NA";

  const refText =
    data.references?.length > 0
      ? data.references.map((r) => `• ${r}`).join("<br/>")
      : "• NA";

  const commitText =
    data.commits?.length > 0
      ? data.commits
          .map((u) => `• <a href="${u}" style="color: #1155cc;">${u}</a>`)
          .join("<br/>")
      : "• NA";

  const planText = (data.nextPlan?.tasks || [])
    .map(
      (t) =>
        `<div style="font-weight: bold; margin-bottom: 3px; font-family: Arial, sans-serif; font-size: 11pt;">• ${t}</div>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/></head>
<body style="margin: 0; padding: 0; background: #ffffff; font-family: calibri, sans-serif;">
<div style="max-width: 720px; margin: 0 auto; padding: 24px 32px;">

  <p style="font-family: Arial, sans-serif; font-size: 11pt; font-weight: bold; color: #1f1f1f; margin: 0 0 4px 0;">Hello All,</p>
  <p style="font-family: Arial, sans-serif; font-size: 11pt; color: #1f1f1f; margin: 0 0 20px 0;">Please find my daily status report for the ${dayOrd} of ${monthYear}.</p>

  <!-- Meta Table -->
  <table style="${tableStyle}">
    <tr>
      ${thCell("Mentor", "width: 45%;")}
      <td colspan="2" style="border: ${borderStyle}; ${cellPad} font-family: Arial, sans-serif; font-size: 11pt;">
        <span>${data.meta.mentor}</span>
      </td>
    </tr>
    <tr>
      ${thCell("Code Reviewer")}
      <td colspan="2" style="border: ${borderStyle}; ${cellPad} font-family: Arial, sans-serif; font-size: 11pt;">
        <span>${data.meta.codeReviewer}</span>
      </td>
    </tr>
    <tr>
      ${thCell("Bootcamp Progress Status")}
      <td style="border: ${borderStyle}; ${cellPad} font-weight: bold; width: 20%; font-family: Arial, sans-serif; font-size: 11pt;">Day ${data.meta.bootcamp?.day}</td>
      <td style="border: ${borderStyle}; ${cellPad} font-weight: bold; color: #38761d; width: 35%; font-family: Arial, sans-serif; font-size: 11pt;">GREEN</td>
    </tr>
    <tr>
      ${thCell("Time Allocation")}
      <td colspan="2" style="border: ${borderStyle}; ${cellPad} font-weight: bold; font-family: Arial, sans-serif; font-size: 11pt;">${data.time.totalHours} Hours</td>
    </tr>
    <tr>
      ${thCell("Productivity Score")}
      <td colspan="2" style="border: ${borderStyle}; ${cellPad} font-family: Arial, sans-serif; font-size: 11pt;">${data.meta.scores?.productivity}/10</td>
    </tr>
    <tr>
      ${thCell("Project Impact Score")}
      <td colspan="2" style="border: ${borderStyle}; ${cellPad} font-family: Arial, sans-serif; font-size: 11pt;">${data.meta.scores?.impact}/10</td>
    </tr>
  </table>

  <div style="height: 16px;"></div>

  <!-- Status Report -->
  <table style="${tableStyle}">
    <tr>
      ${thCell(`Status Report: [${dateLabel}]`, "width: 75%;")}
      ${thCell("Status", "width: 25%; text-align: center;")}
    </tr>
    ${taskRows}
  </table>

  <!-- Time Allocation -->
  <table style="${tableStyle}">
    <tr>
      ${thCell("Time Allocation", "width: 75%;")}
      ${thCell("Time", "width: 25%; text-align: center;")}
    </tr>
    ${timeRows}
  </table>

  <!-- Challenges -->
  <table style="${tableStyle}">
    <tr>
      ${thCell("Challenges Faced", "width: 75%;")}
      ${thCell("Status", "width: 25%; text-align: center;")}
    </tr>
    ${chalRows}
  </table>

  <!-- Resolution -->
  <table style="${tableStyle}">
    <tr>${thCell("Resolution for Challenges")}</tr>
    <tr><td style="border: ${borderStyle}; ${cellPad} font-family: Arial, sans-serif; font-size: 11pt;">${resText}</td></tr>
  </table>

  <!-- References -->
  <table style="${tableStyle}">
    <tr>${thCell("References")}</tr>
    <tr><td style="border: ${borderStyle}; ${cellPad} font-family: Arial, sans-serif; font-size: 11pt;">${refText}</td></tr>
  </table>

  <!-- Code Commit Link -->
  <table style="${tableStyle}">
    <tr>${thCell("Code Commit Link")}</tr>
    <tr><td style="border: ${borderStyle}; ${cellPad} font-family: Arial, sans-serif; font-size: 11pt;">${commitText}</td></tr>
  </table>

  <div style="height: 16px;"></div>

  <!-- Next Day Plan -->
  <table style="${tableStyle}">
    <tr>${thCell(`Next Day's Plan: [${nextDateLabel}]`)}</tr>
    <tr><td style="border: ${borderStyle}; ${cellPad} font-family: Arial, sans-serif; font-size: 11pt;">${planText || "• NA"}</td></tr>
  </table>

</div>
</body>
</html>`;
}

// ─── Preview Modal ────────────────────────────────────────────────────────────
export function DSRPreviewModal({ html, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white w-full max-w-3xl rounded-sm shadow-2xl flex flex-col my-6">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 bg-[#1a1a2e] rounded-t-sm flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-400" />
            <div className="w-2 h-2 rounded-full bg-yellow-400" />
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span className="ml-2 text-white/70 text-xs font-semibold tracking-widest uppercase">
              Email Preview
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-xl leading-none px-1 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* iframe preview */}
        <div className="flex-1 overflow-hidden" style={{ minHeight: "480px" }}>
          <iframe
            srcDoc={html}
            title="DSR Email Preview"
            className="w-full h-full border-0"
            style={{ minHeight: "480px" }}
            sandbox="allow-same-origin"
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-5 py-3 border-t border-gray-200 bg-gray-50 rounded-b-sm flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
