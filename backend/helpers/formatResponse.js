export class InvalidYearError extends Error {
  constructor(message) {
    super(message);
    this.message = "InvalidYearError";
  }
}
export class InvalidMonthError extends Error {
  constructor(message) {
    super(message);
    this.message = "InvalidMonthError";
  }
}

// Month Formatter
export const formatMonth = (month) => {
  const monthMap = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  if (!month) throw new InvalidMonthError("Month cannot be null or undefined");

  // Check if month is a number (e.g., "1" or "01")
  if (!isNaN(month)) {
    month = Number(month);
    if (month >= 1 && month <= 12) return monthMap[month];
    throw new InvalidMonthError("Month must be between 1 and 12");
  }

  // Convert to lowercase then capitalize first letter
  month = month.toLowerCase();
  return month.charAt(0).toUpperCase() + month.slice(1);
};

// Year Formatter
export const formatYear = (year) => {
  const currentYear = new Date().getFullYear();

  if (!year) throw new InvalidYearError("Year cannot be null or undefined");

  year = Number(year); // Convert first

  if (isNaN(year)) {
    throw new InvalidYearError("Year must be a valid number");
  }

  if (year < 2021 || year > currentYear) {
    throw new InvalidYearError(`Year must be between 2021 and ${currentYear}`);
  }

  return year;
};
