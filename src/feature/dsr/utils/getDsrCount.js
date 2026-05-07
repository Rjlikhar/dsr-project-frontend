/* =========================
   utils/getDsrCount.js
========================= */

export function getDsrCount(dsrList, startDate = "", endDate = "") {
  const now = new Date();

  return dsrList.filter((dsr) => {
    const dsrDate = dsr.work_date;

    // Skip invalid entries
    if (!dsrDate) return false;

    const d = new Date(dsrDate);

    /* =========================
       CUSTOM DATE RANGE
    ========================= */
    if (startDate || endDate) {
      if (startDate && dsrDate < startDate) return false;
      if (endDate && dsrDate > endDate) return false;

      return d.getDay() !== 0; // Exclude Sunday
    }

    /* =========================
       DEFAULT CURRENT MONTH
    ========================= */
    return (
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear() &&
      d.getDay() !== 0 // Exclude Sunday
    );
  }).length;
}
