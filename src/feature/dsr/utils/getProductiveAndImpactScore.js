export const getAverageScore = (
  dsrList,
  scoreType,
  startDate = "",
  endDate = "",
) => {
  const now = new Date();

  let filteredDSRs = [];

  // Custom date range
  if (startDate || endDate) {
    filteredDSRs = dsrList.filter((dsr) => {
      const dsrDate = dsr.data?.meta.date;

      if (!dsrDate) return false;
      if (startDate && dsrDate < startDate) return false;
      if (endDate && dsrDate > endDate) return false;

      return true;
    });
  }

  // Default current month
  else {
    filteredDSRs = dsrList.filter((dsr) => {
      const dsrDate = dsr?.data?.meta?.date;

      if (!dsrDate) return false;

      const d = new Date(dsrDate);

      return (
        d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      );
    });
  }

  if (!filteredDSRs.length) return 0;

  const total = filteredDSRs.reduce(
    (sum, dsr) => sum + Number(dsr.data?.meta.scores?.[scoreType] || 0),
    0,
  );

  return Number((total / filteredDSRs.length).toFixed(1));
};
