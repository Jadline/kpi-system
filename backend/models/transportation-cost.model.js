import db from "../config/db.config.js";

export const fetchTransportationCost = async ({ year }) => {
  let costQuery = `
    SELECT
      SUM(avg_cost_per_shipment) AS total_transportation_cost,
      AVG(avg_cost_per_shipment) AS average_cost_per_shipment
    FROM transportation_cost
  `;

  let aggregationQuery = `
    SELECT
      AVG(avg_cost_per_shipment_air) AS average_cost_per_shipment_air,
      SUM(avg_cost_per_shipment_air) AS total_cost_air,
      AVG(avg_cost_per_shipment_sea) AS average_cost_per_shipment_sea,
      SUM(avg_cost_per_shipment_sea) AS total_cost_sea
    FROM transport_aggregation
  `;

  let costPerShipmentOverTimeQuery = `
    SELECT
      month,
      AVG(avg_cost_per_shipment) AS cost_per_shipment
    FROM transportation_cost
  `;

  let countryBudgetQuery = `
    SELECT
      country,
      100 AS total_budget_percentage,
      ROUND((SUM(budget_used_million) / SUM(total_budget_million)) * 100, 2) AS budget_used_percentage
    FROM transportation_cost
    WHERE year = $1
    GROUP BY country
    ORDER BY country;
`;

  let values = [];

  if (year) {
    values.push(year);
    costQuery += ` WHERE year = $1`;
    aggregationQuery += ` WHERE year = $1`;

    costPerShipmentOverTimeQuery += ` WHERE year = $1 GROUP BY month  `;
  }

  costPerShipmentOverTimeQuery += ` ORDER BY
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
    END;`;

  try {
    const { rows: transportationCost } = await db.query(costQuery, values);
    const { rows: transportAggregation } = await db.query(
      aggregationQuery,
      values
    );
    const { rows: costPerShipmentOverTime } = await db.query(
      costPerShipmentOverTimeQuery,
      values
    );
    const { rows: countryBudget } = await db.query(countryBudgetQuery, values);

    // console.log(costPerShipmentOverTime);
    // console.log(countryBudget);

    const formattedCostPerShipmentOverTime = costPerShipmentOverTime.map(
      (row) => ({
        month: row.month,
        cost_per_shipment: Math.ceil(Number(row.cost_per_shipment)), // Ensure it's a number
      })
    );
    console.log(formattedCostPerShipmentOverTime);

    const formattedCountryBudget = countryBudget.map((row) => ({
      country: row.country,
      total_budget_percentage: Number(row.total_budget_percentage),
      budget_used_percentage: Number(row.budget_used_percentage), // Ensure it's a number
    }));

    return {
      totalTransportationCost:
        transportationCost.length > 0
          ? transportationCost[0]
          : { total_transportation_cost: 0, average_cost_per_shipment: 0 },
      costPerShipment:
        transportAggregation.length > 0
          ? transportAggregation[0]
          : {
              average_cost_per_shipment_air: 0,
              average_cost_per_shipment_sea: 0,
              total_cost_air: 0,
              total_cost_sea: 0,
            },
      costPerShipmentOverTime: formattedCostPerShipmentOverTime,
      countryBudget: formattedCountryBudget,
    };
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to fetch transportation cost data");
  }
};
