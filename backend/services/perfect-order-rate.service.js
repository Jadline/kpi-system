import CustomError from "../helpers/CustomError.js";
import { fetchPerfectOrderRates } from "../models/perfect-order-rate.model.js";

export const getPerfectOrderRates = async (year, mode) => {
  if (!year || isNaN(year)) {
    throw new CustomError("Valid  year is required", 400);
  }

  if (!mode || !["air", "sea"].includes(mode.toLowerCase())) {
    throw new CustomError("Valid Mode ('air' or 'sea') is required", 400);
  }
  const data = await fetchPerfectOrderRates({
    year: Number(year),
    mode: mode.toLowerCase(),
  });
  console.log(data);

  if (!data.totalData) {
    throw new CustomError("No data found for the given year and mode", 404);
  }

  //   total orders based on  mode of transport
  const perferctOrderRate = data.totalData.total_orders
    ? Number(
        (
          (Number(data.totalData.total_perfect_orders || 0) /
            Number(data.totalData.total_orders || 0)) *
          100
        ).toFixed(1)
      )
    : 0.0;

  return {
    total_orders: Number(data.totalData.total_orders) || 0,
    timely_deliveries: Number(data.totalData.timely_deliveries) || 0,
    complete_orders: Number(data.totalData.complete_orders) || 0,
    untimely_deliveries: Number(data.totalData.untimely_deliveries) || 0,
    perfect_order_rate: perferctOrderRate,
    pefect_order_rate_by_year: data.monthlyData,
    perfect_order_rate_by_route: data.countryData,
  };
};
