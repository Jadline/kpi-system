import db from "../config/db.config.js";

export const fetchTransportationCost = async ({ year }) => {
  let query = `
    SELECT
      SUM(total_cost) AS total_transportation_cost,
      AVG(total_cost) AS average_transportation_cost
    FROM transportation_cost tc
    JOIN orders o ON tc.order_id = o.order_id
  `;

  let values = [];

  if (year) {
    query += ` WHERE EXTRACT(YEAR FROM o.order_date) = $1`;
    values.push(year);
  }

  try {
    const { rows: transportationCost } = await db.query(query, values);
    return transportationCost.length > 0
      ? transportationCost[0]
      : { total_transportation_cost: 0, average_transportation_cost: 0 };
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to fetch transportation cost data");
  }
};
