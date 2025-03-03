import { getOrders } from "../services/order.service.js";

export const handleGetOrders = async (req, res) => {
  try {
    const orders = await getOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
