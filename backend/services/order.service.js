import { fetchAllOrders } from "../models/order.model.js";

export const getOrders = async () => {
  const orders = await fetchAllOrders();

  // Example of adding business logic: sorting, filtering, etc.
  if (orders.length === 0) {
    throw new Error("No orders found.");
  }

  return orders;
};
