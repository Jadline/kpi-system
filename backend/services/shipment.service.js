import { fetchShipments } from "../models/shipment.model.js";

export const getShipments = async ({ month, year, country }) => {
  // Call model function to fetch data
  const shipments = await fetchShipments({ month, year, country });
  console.log(shipments);

  return shipments;
};
