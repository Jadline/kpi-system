import { formatYear } from "../helpers/formatResponse.js";
import { fetchTransportationCost } from "../models/transportation-cost.model.js";
import CustomError from "../helpers/CustomError.js";

export const getTransportationCost = async (year) => {
  const formattedYear = formatYear(year);
  const data = await fetchTransportationCost({ year: formattedYear });

  if (!data) {
    throw new CustomError("No data found for the given month and year", 404);
  }

  return {
    total_transportation_cost:
      Math.ceil(Number(data.total_transportation_cost)) || 0,
    average_transportation_cost:
      Math.ceil(Number(data.average_transportation_cost)) || 0,
  };
};
