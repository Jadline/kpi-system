import db from "../config/db.config.js";

export const fetchShippingTime = async ({ month, year, mode }) => {
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
    values.push(Number(year));
    totalQuery += ` AND year = $${values.length}`;
  }

  totalQuery += ` GROUP BY month, year;`;

  // Monthly shipping time query
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

  // Query for country progress (based on `mode`)
  let countryValues = [];
  let countryProgressQuery = `
      SELECT
        country,
        CEIL(AVG(CASE WHEN shipment_type = 'Air' THEN average_shipping_time ELSE NULL END)) AS average_shipping_time_air,
        CEIL(AVG(CASE WHEN shipment_type = 'Sea' THEN average_shipping_time ELSE NULL END)) AS average_shipping_time_sea,
  `;

  if (mode === "Air") {
    countryProgressQuery += `MAX(CASE WHEN shipment_type = 'Air' THEN goal ELSE NULL END) AS goal `;
  } else if (mode === "Sea") {
    countryProgressQuery += `MAX(CASE WHEN shipment_type = 'Sea' THEN goal ELSE NULL END) AS goal `;
  } else {
    countryProgressQuery += `NULL AS goal `;
  }

  countryProgressQuery += `FROM shipping_time`;

  if (year) {
    countryValues.push(Number(year));
    countryProgressQuery += ` WHERE year = $${countryValues.length}`;
  }

  countryProgressQuery += ` GROUP BY country ORDER BY country;`;

  // Query for new `country_shipping_time` (always include air and sea averages)
  let countryShippingValues = [];
  let countryShippingTimeQuery = `
      SELECT
        country,
        CEIL(AVG(CASE WHEN shipment_type = 'Air' THEN average_shipping_time ELSE NULL END)) AS average_shipping_time_air,
        CEIL(AVG(CASE WHEN shipment_type = 'Sea' THEN average_shipping_time ELSE NULL END)) AS average_shipping_time_sea
      FROM shipping_time
  `;

  if (year) {
    countryShippingValues.push(Number(year));
    countryShippingTimeQuery += ` WHERE year = $${countryShippingValues.length}`;
  }

  countryShippingTimeQuery += ` GROUP BY country ORDER BY country;`;

  try {
    // Execute queries
    const { rows: totalResults } = await db.query(totalQuery, values);
    const { rows: monthlyResults } = await db.query(
      monthlyShippingTimeQuery,
      monthlyValues
    );
    const { rows: countryProgressResults } = await db.query(
      countryProgressQuery,
      countryValues
    );
    const { rows: countryShippingTimeResults } = await db.query(
      countryShippingTimeQuery,
      countryShippingValues
    );

    // Format monthly results
    const formattedMonthlyResults = monthlyResults.map((row) => ({
      month: row.month,
      average_shipping_time_air: row.average_shipping_time_air
        ? Number(row.average_shipping_time_air)
        : 0,
      average_shipping_time_sea: row.average_shipping_time_sea
        ? Number(row.average_shipping_time_sea)
        : 0,
    }));

    // Format country progress (with mode + goal)
    const formattedCountryProgress = countryProgressResults.map((row) => {
      const base = {
        country: row.country,
      };

      if (mode === "Air") {
        base["average_shipping_time_Air"] =
          Number(row.average_shipping_time_air) || 0;
        base["goal_Air"] = row.goal !== null ? Number(row.goal) : null;
      } else if (mode === "Sea") {
        base["average_shipping_time_Sea"] =
          Number(row.average_shipping_time_sea) || 0;
        base["goal_Sea"] = row.goal !== null ? Number(row.goal) : null;
      } else {
        base["average_shipping_time_Air"] =
          Number(row.average_shipping_time_air) || 0;
        base["average_shipping_time_Sea"] =
          Number(row.average_shipping_time_sea) || 0;
      }

      return base;
    });

    // Format new country_shipping_time (always includes both modes, no goal)
    const formattedCountryShippingTime = countryShippingTimeResults.map(
      (row) => ({
        country: row.country,
        average_shipping_time_air: Number(row.average_shipping_time_air) || 0,
        average_shipping_time_sea: Number(row.average_shipping_time_sea) || 0,
      })
    );

    return {
      totalData: totalResults[0] || {
        average_shipping_time_air: 0,
        average_shipping_time_sea: 0,
        on_time_shipments_air: 0,
        on_time_shipments_sea: 0,
      },
      monthly_shipping_time: formattedMonthlyResults,
      country_progress: formattedCountryProgress,
      country_shipping_time: formattedCountryShippingTime,
    };
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to fetch data from the database");
  }
};
