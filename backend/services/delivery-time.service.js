import { formatYear } from "../helpers/formatResponse.js";
import { fetchAverageDeliveryTime } from "../models/delivery-time.model.js";
export const getAverageDeliveyTime = async (year) => {
  const formattedYear = formatYear(year);

  const data = await fetchAverageDeliveryTime({
    year: formattedYear,
  });

  if (!data) {
    throw new Error("No data found for the given month, year and country ");
  }

  return {
    average_delivery_time_by_air: Number(data.yearlyData.average_delivery_air),
    average_delivery_time_by_sea: Number(data.yearlyData.average_delivery_sea),
    total_ontime_deliveries: Number(data.yearlyData.total_ontime_deliveries),
    ontime_deliveries_percentage: Number(
      data.yearlyData.ontime_deliveries_percentage
    ),
    average_goal_by_air: Number(data.yearlyData.average_goal_by_air),
    average_goal_by_sea: Number(data.yearlyData.average_goal_by_sea),
    countryData: data.countryData,
    monthlyData: data.monthlyData,
  };
};
