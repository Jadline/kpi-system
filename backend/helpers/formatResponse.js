export const successResponse = (
  res,
  data,
  message = "Success",
  status = 200
) => {
  return res.status(status).json({ success: true, message, data });
};

export const errorResponse = (
  res,
  message = "Something went wrong",
  status = 500
) => {
  return res.status(status).json({ success: false, message });
};

// Usage in Controller;

import { successResponse, errorResponse } from "../helpers/formatResponse.js";

export const fetchAllKPIs = async (req, res) => {
  try {
    const kpis = await getKPIs();
    successResponse(res, kpis, "KPIs retrieved successfully");
  } catch (error) {
    errorResponse(res, "Failed to fetch KPIs");
  }
};

// OrderId formatter
export function formatOrderId(id) {
  return `ORD${id.toString().padStart(5, "0")}`;
}
console.log(formatOrderId(23)); // ORD00023

// delivery id formatter
export const formatDeliveryID = (id) => `DELO${id.toString().padStart(4, "0")}`;

console.log(formatDeliveryID(1)); // DELO0001
