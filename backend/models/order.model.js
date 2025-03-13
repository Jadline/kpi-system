import db from "../config/db.config.js"; // Database connection

export const fetchAllOrders = async () => {
  const result = await db.query("SELECT * FROM orders ORDER BY order_id ASC");

  return result.rows;
};
