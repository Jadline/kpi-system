export const formatMonth = (month) => {
  if (!month) return null;

  // Check if month is a number (e.g., "1" or "01")
  if (!isNaN(month)) {
    month = Number(month);
    return month >= 1 && month <= 12 ? month : null; // Ensure it's between 1 and 12
  }

  // Convert to lowercase then capitalize first letter
  month = month.toLowerCase();
  return month.charAt(0).toUpperCase() + month.slice(1);
};
