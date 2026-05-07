export const calculateTotalHours = (distribution) => {
  return Object.values(distribution || {}).reduce(
    (sum, val) => sum + (parseFloat(val) || 0),
    0
  );
};