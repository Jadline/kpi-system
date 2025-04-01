import { fetchTransportationCost } from "../models/transportation-cost.model.js";

export const getTransportationCost = async (params) => {
  const data = await fetchTransportationCost();
};
