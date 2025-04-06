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
      Number(data.totalTransportationCost.total_transportation_cost) || 0,
    average_transportation_cost_per_shipment:
      Number(
        data.totalTransportationCost.average_transportation_cost_per_shipment
      ) || 0,
    cost_per_shipment_air:
      Number(data.costPerShipment.average_cost_per_shipment_air) || 0,
    cost_per_shipment_sea:
      Number(data.costPerShipment.average_cost_per_shipment_sea) || 0,
    total_cost_air: Math.ceil(Number(data.costPerShipment.total_cost_air)) || 0,
    total_cost_sea: Math.ceil(Number(data.costPerShipment.total_cost_sea)) || 0,
    costPerShipmentOverTime: data.costPerShipmentOverTime || [],
    budgetPerfomance: data.countryBudget,
  };
};
