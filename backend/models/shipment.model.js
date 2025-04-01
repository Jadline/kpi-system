import db from "../config/db.config.js";

export const fetchShipments = async ({ month, year, country }) => {
  let totalQuery = `SELECT
                    SUM(total_shipments) AS total_shipments,
                    SUM(CASE WHEN shipment_type = 'Air' THEN total_shipments ELSE 0 END) AS shipments_by_air,
                    SUM(CASE WHEN shipment_type = 'Sea' THEN total_shipments ELSE 0 END) AS shipments_by_sea
                 FROM number_of_shipments WHERE 1=1`;

  let countryQuery = `SELECT
                        country,
                        SUM(CASE WHEN shipment_type = 'Air' THEN total_shipments ELSE 0 END) AS shipments_by_air,
                        SUM(CASE WHEN shipment_type = 'Sea' THEN total_shipments ELSE 0 END) AS shipments_by_sea
                      FROM number_of_shipments WHERE 1=1
`;
  let values = [];

  if (year) {
    totalQuery += ` AND year = $${values.length + 1}`;
    countryQuery += ` AND year = $${values.length + 1}`;
    values.push(year);
  }
  if (month) {
    totalQuery += ` AND month = $${values.length + 1}`;
    countryQuery += ` AND month = $${values.length + 1}`;

    values.push(month);
  }
  if (country) {
    totalQuery += ` AND country ILIKE  $${values.length + 1}`; // make it case-insensitive
    countryQuery += ` AND country ILIKE $${values.length + 1}`;

    values.push(country);
  }

  // Add GROUP BY to countryQuery AFTER filtering
  countryQuery += ` GROUP BY country ORDER BY SUM(total_shipments) DESC;`;

  try {
    const { rows: totalResults } = await db.query(totalQuery, values);
    const { rows: countryResults } = await db.query(countryQuery, values);

    return {
      totalData: totalResults[0] || {
        total_shipments: 0,
        shipments_by_air: 0,
        shipments_by_sea: 0,
      },
      countries: countryResults,
    };
  } catch (error) {
    console.error("Database query error: ", error.message);
    throw new Error("Failed to fetch data from the database.");
  }
};
