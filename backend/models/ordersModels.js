import db from "../config/db.js";

export const getAllOrders = async () => {
  const result = await db.query("SELECT * FROM orders");
  return result.rows;
};

export const getOrderById = async (id) => {
  const result = await db.query("SELECT * FROM orders WHERE id = $1", [id]);
  return result.rows[0];
};

export const createOrder = async (data) => {
  const { customer_id, total_price } = data;
  const result = await db.query(
    "INSERT INTO orders (customer_id, total_price) VALUES ($1, $2) RETURNING *",
    [customer_id, total_price]
  );
  return result.rows[0];
};
