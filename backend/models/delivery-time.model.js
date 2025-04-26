import pool from "../config/pool.config.js";
import db from  "../config/db.config.js"

export const fetchAverageDeliveryTime = async ({ year }) => {
  let query = `
    SELECT
      year,
      CEIL(AVG(average_delivery_by_air)) AS average_delivery_air,
      CEIL(AVG(average_delivery_by_sea)) AS average_delivery_sea,
      CEIL(SUM(total_ontime_deliveries)) AS total_ontime_deliveries,
      CEIL(AVG(ontime_deliveries_pct)) AS ontime_deliveries_percentage,
      CEIL(AVG(avg_goal_by_air)) AS average_goal_by_air,
      CEIL(AVG(avg_goal_by_sea)) AS average_goal_by_sea
    FROM average_delivery_time
  `;

  let values = [];

  if (year) {
    query += ` WHERE year = $1`;
    values.push(year);
  }

  query += ` GROUP BY year ORDER BY year DESC;`;

  let countryQuery = `
    SELECT
      country,
      COALESCE(CEIL(AVG(CASE WHEN shipment_type = 'air' THEN average_delivery_time ELSE NULL END)), 0) AS average_delivery_air,
      COALESCE(CEIL(AVG(CASE WHEN shipment_type = 'sea' THEN average_delivery_time ELSE NULL END)), 0) AS average_delivery_sea,
      COALESCE(CEIL(AVG(CASE WHEN shipment_type = 'air' THEN average_delivery_time_goal ELSE NULL END)), 0) AS goal_air,
      COALESCE( CEIL(AVG(CASE WHEN shipment_type = 'sea' THEN average_delivery_time_goal ELSE NULL END)), 0) AS goal_sea,
      COALESCE( MAX(status), 0) AS status
    FROM average_delivery_time_countries
  `;

  let countryValues = [];

  if (year) {
    countryValues.push(year);
    countryQuery += ` WHERE EXTRACT(YEAR FROM dispatch_date) = $1`;
  }

  countryQuery += ` GROUP BY country ORDER BY country;`;

  let monthlyQuery = `
    SELECT
      month,
      CEIL(AVG(average_delivery_by_air)) AS average_delivery_air,
      CEIL(AVG(average_delivery_by_sea)) AS average_delivery_sea
    FROM average_delivery_time
  `;

  let monthlyValues = [];

  if (year) {
    monthlyQuery += ` WHERE year = $1`;
    monthlyValues.push(year);
  }

  monthlyQuery += ` GROUP BY month ORDER BY TO_DATE(month, 'Month')::DATE;`;

  try {
    const { rows: yearlyDeliveryTime } = await db.query(query, values);
    const { rows: countryDeliveryTime } = await db.query(
      countryQuery,
      countryValues
    );
    const { rows: monthlyDeliveryTime } = await db.query(
      monthlyQuery,
      monthlyValues
    );

    const formattedCountryData = countryDeliveryTime.map((row) => ({
      country: row.country,
      average_delivery_air: Number(row.average_delivery_air),
      average_delivery_sea: Number(row.average_delivery_sea),
      goal_air: Number(row.goal_air),
      goal_sea: Number(row.goal_sea),
      status: Number(row.status),
      // format data
    }));
    const formattedMonthlyData = monthlyDeliveryTime.map((row) => ({
      month: row.month,
      average_delivery_air: Number(row.average_delivery_air),
      average_delivery_sea: Number(row.average_delivery_sea),
    }));

    return {
      yearlyData:
        yearlyDeliveryTime.length > 0
          ? yearlyDeliveryTime[0]
          : {
              year: year || "All Years",
              average_delivery_air: 0,
              average_delivery_sea: 0,
              total_ontime_deliveries: 0,
              ontime_deliveries_percentage: 0,
              average_goal_by_air: 0,
              average_goal_by_sea: 0,
            },
      countryData: formattedCountryData,
      monthlyData: formattedMonthlyData,
    };
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to fetch average delivery data");
  }
};
