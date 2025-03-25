const allowedCountries = [
  "Italy",
  "South Africa",
  "China",
  "Turkey",
  "United Kingdom",
  "Netherlands",
  "United Arab Emirates",
];

export const formatCountry = (country) => {
  if (!country) return null;

  // Convert to sentence case (first letter uppercase for each word)
  const formattedCountry = country
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Check if it's in the allowed list
  return allowedCountries.includes(formattedCountry) ? formattedCountry : null;
};
