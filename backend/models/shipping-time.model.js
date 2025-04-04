import db from "../config/db.config.js";

export const fetchShippingTime = async ({ month, year }) => {
  try {
    let values = [];
    let totalQuery = `
      SELECT
        month,
        year,
        CEIL(AVG(CASE WHEN shipment_type = 'Air' THEN average_shipping_time ELSE NULL END)) AS average_shipping_time_air,
        CEIL(AVG(CASE WHEN shipment_type = 'Sea' THEN average_shipping_time ELSE NULL END)) AS average_shipping_time_sea,
        CEIL(SUM(CASE WHEN shipment_type = 'Air' THEN on_time_shipments ELSE 0 END)) AS on_time_shipments_air,
        CEIL(SUM(CASE WHEN shipment_type = 'Sea' THEN on_time_shipments ELSE 0 END)) AS on_time_shipments_sea
      FROM shipping_time
      WHERE 1=1
    `;

    if (month) {
      values.push(month);
      totalQuery += ` AND month = $${values.length}`;
    }
    if (year) {
      values.push(Number(year)); // Ensure year is a number
      totalQuery += ` AND year = $${values.length}`;
    }

    totalQuery += ` GROUP BY month, year;`;

    // Query for monthly shipping time
    let monthlyValues = [];
    let monthlyShippingTimeQuery = `
      SELECT
        month,
        CEIL(AVG(CASE WHEN shipment_type = 'Air' THEN average_shipping_time ELSE NULL END)) AS average_shipping_time_air,
        CEIL(AVG(CASE WHEN shipment_type = 'Sea' THEN average_shipping_time ELSE NULL END)) AS average_shipping_time_sea
      FROM shipping_time
    `;

    if (year) {
      monthlyValues.push(Number(year));
      monthlyShippingTimeQuery += ` WHERE year = $1`;
    }

    monthlyShippingTimeQuery += `
      GROUP BY month
      ORDER BY
        CASE month
          WHEN 'January' THEN 1
          WHEN 'February' THEN 2
          WHEN 'March' THEN 3
          WHEN 'April' THEN 4
          WHEN 'May' THEN 5
          WHEN 'June' THEN 6
          WHEN 'July' THEN 7
          WHEN 'August' THEN 8
          WHEN 'September' THEN 9
          WHEN 'October' THEN 10
          WHEN 'November' THEN 11
          WHEN 'December' THEN 12
        END;
    `;

    // Query for country-wise shipping time
    let countryValues = [];
    let countryShippingTimeQuery = `
      SELECT
        country,
        CEIL(AVG(CASE WHEN shipment_type = 'Air' THEN average_shipping_time ELSE NULL END)) AS average_shipping_time_air,
        CEIL(AVG(CASE WHEN shipment_type = 'Sea' THEN average_shipping_time ELSE NULL END)) AS average_shipping_time_sea,
        MAX(CASE WHEN shipment_type = 'Air' THEN goal ELSE NULL END) AS goal_air,
        MAX(CASE WHEN shipment_type = 'Sea' THEN goal ELSE NULL END) AS goal_sea
      FROM shipping_time
    `;

    if (year) {
      countryValues.push(Number(year));
      countryShippingTimeQuery += ` WHERE year = $${countryValues.length}`;
    }

    countryShippingTimeQuery += ` GROUP BY country ORDER BY country;`;

    // Execute Queries
    const { rows: totalResults } = await db.query(totalQuery, values);
    const { rows: monthlyResults } = await db.query(
      monthlyShippingTimeQuery,
      monthlyValues
    );
    const { rows: countryResults } = await db.query(
      countryShippingTimeQuery,
      countryValues
    );

    // Format Results
    const formattedMonthlyResults = monthlyResults.map((row) => ({
      month: row.month,
      average_shipping_time_air: row.average_shipping_time_air
        ? Number(row.average_shipping_time_air)
        : 0,
      average_shipping_time_sea: row.average_shipping_time_sea
        ? Number(row.average_shipping_time_sea)
        : 0,
    }));

    const formattedCountryResults = countryResults.map((row) => ({
      country: row.country,
      average_shipping_time_air: row.average_shipping_time_air
        ? Number(row.average_shipping_time_air)
        : 0,
      average_shipping_time_sea: row.average_shipping_time_sea
        ? Number(row.average_shipping_time_sea)
        : 0,
      goal_air: row.goal_air ? Number(row.goal_air) : 0,
      goal_sea: row.goal_air ? Number(row.goal_sea) : 0,
    }));

    return {
      totalData: totalResults[0] || {
        average_shipping_time_air: 0,
        average_shipping_time_sea: 0,
        on_time_shipments_air: 0,
        on_time_shipments_sea: 0,
      },
      monthly_shipping_time: formattedMonthlyResults,
      country_shipping_time: formattedCountryResults,
    };
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to fetch data from the database");
  }
};
