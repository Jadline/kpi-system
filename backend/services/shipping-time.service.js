import { fetchShippingTime } from "../models/shipping-time.model.js";
import CustomError from "../helpers/CustomError.js";
import { formatMonth, formatYear } from "../helpers/formatResponse.js";
export const getShippingTime = async ({ month, year }) => {
  const formattedMonth = formatMonth(month);
  const formattedYear = formatYear(year);

  //fetch output from model
  const data = await fetchShippingTime({
    month: formattedMonth,
    year: formattedYear,
  });
  console.log(data);

  //  if no ouput throw custom error and error code
  if (!data) {
    throw new CustomError("No data found for the given month and year", 404);
  }

  //   return formatted output
  return {
    average_shipping_time_by_air:
      Math.ceil(Number(data.totalData.average_shipping_time_air)) || 0,
    average_shipping_time_by_sea:
      Math.ceil(Number(data.totalData.average_shipping_time_sea)) || 0,
    on_time_shipments_by_air: Number(data.totalData.on_time_shipments_air) || 0,
    on_time_shipments_by_sea: Number(data.totalData.on_time_shipments_sea) || 0,
    monthly_shipping_time: data.monthly_shipping_time || 0,
    country_shipping_time: data.country_shipping_time || 0,
  };
};
