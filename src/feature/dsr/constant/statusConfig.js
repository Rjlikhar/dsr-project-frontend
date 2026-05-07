export const STATUS_CONFIG = {
  DONE: { label: "Done", color: "#207a20" },
  IN_PROGRESS: { label: "In Progress", color: "#b45309" },
  NOT_STARTED: { label: "Not Started", color: "#6b7280" },
  NOT_RESOLVED: { label: "Not Resolved", color: "#c0392b" },
  RESOLVED: { label: "Resolved", color: "#207a20" },
};


// ── Status config ────────────────────────────────────────────────────────────
export const STATUS_CONFIG_DSRLIST = {
  DONE:        { dot: "bg-teal-500",   left: "border-l-teal-400",   badge: "bg-teal-50 text-teal-800",    tick: "bg-teal-500",   top: "border-t-teal-500",   label: "Done"        },
  IN_PROGRESS: { dot: "bg-blue-500",   left: "border-l-blue-400",   badge: "bg-blue-50 text-blue-800",    tick: "bg-blue-500",   top: "border-t-blue-500",   label: "In Progress" },
  BLOCKED:     { dot: "bg-orange-500", left: "border-l-orange-400", badge: "bg-orange-50 text-orange-800",tick: "bg-orange-500", top: "border-t-orange-500", label: "Blocked"     },
  IN_REVIEW:   { dot: "bg-violet-500", left: "border-l-violet-400", badge: "bg-violet-50 text-violet-800",tick: "bg-violet-500", top: "border-t-violet-500", label: "In Review"   },
  PLANNED:     { dot: "bg-slate-400",  left: "border-l-slate-300",  badge: "bg-slate-100 text-slate-600", tick: "bg-slate-400",  top: "border-t-slate-400",  label: "Planned"     },
};


export const TIME_LABELS = {
  development: "Development / Practical",
  debugging: "Debugging / Fixing",
  planning: "Planning / Design",
  learning: "Learning / Training",
  meetings: "Communication / Meetings",
};
