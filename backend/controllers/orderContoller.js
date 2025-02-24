import {
  getAllOrders,
  getOrderById,
  createOrder,
} from "../models/ordersModel.js";

export const fetchOrders = async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const fetchOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await getOrderById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export const addOrder = async (req, res, next) => {
  try {
    const order = await createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

export const fetchOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await getOrderById(id); // Calls the model function

    if (!order) {
      const error = new Error("Order not found");
      error.statusCode = 404;
      throw error; // Throws an error
    }

    res.status(200).json(order);
  } catch (error) {
    next(error); // Passes error to Express error handler
  }
};
