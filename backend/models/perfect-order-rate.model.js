import db from "../config/db.config.js";

export const fetchPerfectOrderRates = async ({ year, mode }) => {
  if (!year || !mode) {
    throw new Error("Year and Mode are Required.");
  }

  let columnPrefix;
  if (mode === "air") {
    columnPrefix = "air";
  } else if (mode === "sea") {
    columnPrefix = "sea";
  } else {
    throw new Error("Invalid mode. Use 'air' or 'sea'.");
  }

  let values = [];
  let whereClause = " WHERE 1=1";

  if (year) {
    whereClause += ` AND year = $${values.length + 1}`;
    values.push(year);
  }

  let totalQuery = `SELECT
                    SUM(total_orders_${columnPrefix}) AS total_orders,
                    SUM(timely_deliveries_${columnPrefix}) AS timely_deliveries,
                    SUM(complete_orders_${columnPrefix}) AS complete_orders,
                    SUM(untimely_deliveries_${columnPrefix}) AS untimely_deliveries,
                    SUM(perfect_orders_${columnPrefix}) AS total_perfect_orders
                  FROM perfect_order_rate ${whereClause}`;

  //  Fetch Perfect Order Rate by Month (New)
  let monthlyQuery = `
    SELECT month, perfect_order_rate_${columnPrefix} AS perfect_order_rate
    FROM perfect_order_rate
    ${whereClause}
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
    END;;
  `;

  // Country-Based Query (for Perfect Order Rate by Country)
  let countryQuery = `
    SELECT country, perfect_order_rate_by_${columnPrefix} AS perfect_order_rate
    FROM perfect_order_rate_by_country
    ${whereClause}
    ORDER BY country,
      CASE
        WHEN month = 'January' THEN 1
        WHEN month = 'February' THEN 2
        WHEN month = 'March' THEN 3
        WHEN month = 'April' THEN 4
        WHEN month = 'May' THEN 5
        WHEN month = 'June' THEN 6
        WHEN month = 'July' THEN 7
        WHEN month = 'August' THEN 8
        WHEN month = 'September' THEN 9
        WHEN month = 'October' THEN 10
        WHEN month = 'November' THEN 11
        WHEN month = 'December' THEN 12
      END;
  `;

  let monthlyData = [];
  let countryData = [];
  let totalData = [];

  try {
    const { rows: monthlyResults } = await db.query(monthlyQuery, values);
    const { rows: countryResults } = await db.query(countryQuery, values);
    const { rows: totalResults } = await db.query(totalQuery, values);

    monthlyData = monthlyResults;
    countryData = countryResults;
    totalData = totalResults;
  } catch (error) {
    console.error("Database query error: ", error.message);
    throw new Error("Failed to fetch data from the database.");
  }

  return {
    totalData:
      totalData.length > 0
        ? totalData[0]
        : {
            total_orders: 0,
            timely_deliveries: 0,
            complete_orders: 0,
            untimely_deliveries: 0,
            total_perfect_orders: 0,
          },
    monthlyData,
    countryData,
  };
};
