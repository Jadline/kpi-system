import { fetchShipments } from "../models/shipment.model.js";
import { formatMonth } from "../helpers/formatResponse.js";
import { formatCountry } from "../helpers/formatCountry.helper.js";
import CustomError from "../helpers/CustomError.js";
export const getShipments = async ({ month, year, country }) => {
  if (!year || isNaN(year)) {
    return res.status(400).json({ error: "Valid year year is required" });
  }
  const formattedMonth = formatMonth(month);
  if (!formattedMonth) {
    throw new CustomError("Valid month (1-12 or month name) is required", 400);
  }

  const formattedCountry = formatCountry(country);
  if (country && !formattedCountry) {
    throw new CustomError("Invalid country provided, 400");
  }

  // Call model function to fetch data
  const data = await fetchShipments({ month, year, country });
  console.log(data);
  if (!data) {
    throw new Error("No data found for the given month, year and country ");
  }

  return {
    total_shipments: Number(data.totalData.total_shipments) || 0,
    shipments_by_air: Number(data.totalData.shipments_by_air) || 0,
    shipments_by_sea: Number(data.totalData.shipments_by_sea) || 0,
    countries: data.countries,
  };
};
