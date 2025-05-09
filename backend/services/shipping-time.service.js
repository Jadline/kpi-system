import { fetchShippingTime } from "../models/shipping-time.model.js";
import CustomError from "../helpers/CustomError.js";
import {
  formatMode,
  formatMonth,
  formatYear,
} from "../helpers/formatResponse.js";

export const getShippingTime = async ({ month, year, mode }) => {
  const formattedMonth = formatMonth(month);
  const formattedYear = formatYear(year);
  const formattedMode = formatMode(mode);

  // Fetch output from model
  const data = await fetchShippingTime({
    month: formattedMonth,
    year: formattedYear,
    mode: formattedMode,
  });

  // If no output, throw custom error and error code
  if (!data) {
    throw new CustomError("No data found for the given month and year", 404);
  }

  // Return formatted output
  return {
    average_shipping_time_by_air:
      Math.ceil(Number(data.totalData.average_shipping_time_air)) || 0,
    average_shipping_time_by_sea:
      Math.ceil(Number(data.totalData.average_shipping_time_sea)) || 0,
    on_time_shipments_by_air: Number(data.totalData.on_time_shipments_air) || 0,
    on_time_shipments_by_sea: Number(data.totalData.on_time_shipments_sea) || 0,
    monthly_shipping_time: data.monthly_shipping_time || [],
    country_progress: data.country_progress || [],
    country_shipping_time: data.country_shipping_time || [],
  };
};
