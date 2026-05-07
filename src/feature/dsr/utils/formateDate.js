export const fmtDate = (d) => {
  try {
    return new Date(d).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return d;
  }
};


export const fmt = (d) =>
  new Date(d + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "short", month: "short", day: "numeric", year: "numeric",
  });


export function formatDate(dateStr) {
  if (!dateStr) return "";
  const dt = new Date(dateStr + "T00:00:00");
  return dt.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}  


export const totalTime = (tasks) => tasks.reduce((s, t) => s + (t.timeSpent || 0), 0);
