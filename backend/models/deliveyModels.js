import db from "../config/db.js";

export const averageDeliveyTime = async () => {
  const result = await db.query("SELECT * FROM average_delivery_time");
  return result.rows;
};
