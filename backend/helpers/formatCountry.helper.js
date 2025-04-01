export class InvalidCountryError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidCountryError";
  }
}

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
  if (!country)
    throw new InvalidCountryError("Country cannot be null or undefined");

  // Convert to sentence case (first letter uppercase for each word)
  const formattedCountry = country
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Validate the country
  if (!allowedCountries.includes(formattedCountry)) {
    throw new InvalidCountryError(`'${country}' is not a valid country.`);
  }

  return formattedCountry;
};
