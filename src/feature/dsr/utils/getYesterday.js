export const getYesterday = () => {
    const d = new Date();
    d.setDate(d.getDate());
    return d.toISOString().split("T")[0];
  };