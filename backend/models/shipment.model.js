import db from "../config/db.config.js";

export const fetchShipments = async ({ month, year, country }) => {
  let query = `SELECT
                    SUM(total_shipments) AS total_shipments,
                    SUM(CASE WHEN shipment_type = 'Air' THEN total_shipments ELSE 0 END) AS shipments_by_air,
                    SUM(CASE WHEN shipment_type = 'Sea' THEN total_shipments ELSE 0 END) AS shipments_by_sea
                 FROM number_of_shipments WHERE 1=1`;

  let values = [];

  if (year) {
    query += ` AND year = $${values.length + 1}`;
    values.push(year);
  }
  if (month) {
    query += ` AND month = $${values.length + 1}`;
    values.push(month);
  }
  if (country) {
    query += ` AND country ILIKE  $${values.length + 1}`; // make it case-insensitive
    values.push(country);
  }

  const { rows } = await db.query(query, values);
  return (
    rows[0] || { total_shipments: 0, shipments_by_air: 0, shipments_by_sea: 0 }
  ); // Return single aggregated result
};
