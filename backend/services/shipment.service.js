import { fetchShipments } from "../models/shipment.model.js";
import { formatMonth, formatYear } from "../helpers/formatResponse.js";
import { formatCountry } from "../helpers/formatCountry.helper.js";
import CustomError from "../helpers/CustomError.js";
export const getShipments = async ({ month, year, country }) => {
  const formattedYear = formatYear(year);
  const formattedMonth = formatMonth(month);
  const formattedCountry = country ? formatCountry(country) : null; // Handle optional country

  // Call model function to fetch data
  const data = await fetchShipments({
    month: formattedMonth,
    year: formattedYear,
    country: formattedCountry,
  });
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
