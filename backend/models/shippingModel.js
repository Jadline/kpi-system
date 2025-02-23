import db from "../config/db.js";

export const getAllShipments = async () => {
  const result = await db.query("SELECT * FROM shipments");
  return result.rows;
};

export const getShipmentById = async (id) => {
  const result = await db.query("SELECT * FROM shipments WHERE id = $1", [id]);
  return result.rows[0];
};

export const createShipment = async (data) => {
  const { name, status } = data;
  const result = await db.query(
    "INSERT INTO shipments (name, status) VALUES ($1, $2) RETURNING *",
    [name, status]
  );
  return result.rows[0];
};
