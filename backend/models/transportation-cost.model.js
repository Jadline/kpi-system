import db from "../config/db.config.js";

export const fetchTransportationCost = async ({ year }) => {
  let costQuery = `
    SELECT
      SUM(budget_used_million) AS total_transportation_cost,
      ROUND((SUM(budget_used_million)* 1000000) / NULLIF(SUM(total_shipments), 0), 2) AS average_transportation_cost
    FROM transportation_cost
  `;

  let aggregationQuery = `
    SELECT
      ROUND((SUM(total_budget_used_air_million) * 1000000) / NULLIF(SUM(total_shipments_air), 0), 2) AS average_cost_per_shipment_air,
      SUM(total_budget_used_air_million) AS total_cost_air,
      ROUND((SUM(total_budget_used_sea_million) * 1000000) / NULLIF(SUM(total_shipments_sea), 0), 2) AS average_cost_per_shipment_sea,
      SUM(total_budget_used_sea_million) AS total_cost_sea
    FROM transport_aggregation
  `;

  let costPerShipmentOverTimeQuery = `
    SELECT
      month,
      ROUND(AVG(CASE WHEN shipment_type = 'air' THEN avg_cost_per_shipment END), 2) AS cost_per_shipment_air,
      ROUND(AVG(CASE WHEN shipment_type = 'sea' THEN avg_cost_per_shipment END), 2) AS cost_per_shipment_sea
    FROM transportation_cost
  `;

  let countryBudgetQuery = `
    SELECT
      country,
      SUM(total_budget_million) AS total_budget,
      SUM(budget_used_million) AS total_budget_used
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

    const formattedCostPerShipmentOverTime = costPerShipmentOverTime.map(
      (row) => ({
        month: row.month,
        cost_per_shipment_air: Number(
          parseFloat(row.cost_per_shipment_air).toFixed(2)
        ),
        cost_per_shipment_sea: Number(
          parseFloat(row.cost_per_shipment_sea).toFixed(2)
        ),
      })
    );

    const formattedCountryBudget = countryBudget.map((row) => ({
      country: row.country,
      total_budget: Number(row.total_budget),
      total_budget_used: Number(row.total_budget_used),
    }));

    const formattedTotalCost = {
      total_transportation_cost: Number(
        transportationCost[0]?.total_transportation_cost
      ), // if needed
      average_transportation_cost_per_shipment: Number(
        transportationCost[0]?.average_transportation_cost
      ),
    };

    const formattedCostPerShipment = {
      average_cost_per_shipment_air: Number(
        transportAggregation[0]?.average_cost_per_shipment_air
      ),
      total_cost_air: Number(transportAggregation[0]?.total_cost_air),
      average_cost_per_shipment_sea: Number(
        transportAggregation[0]?.average_cost_per_shipment_sea
      ),
      total_cost_sea: Number(transportAggregation[0]?.total_cost_sea),
    };

    console.log(transportAggregation[0]);

    return {
      totalTransportationCost:
        transportationCost.length > 0
          ? formattedTotalCost
          : {
              total_transportation_cost: 0,
              average_transportation_cost_per_shipment: 0,
            },
      costPerShipment:
        transportAggregation.length > 0
          ? formattedCostPerShipment
          : {
              average_cost_per_shipment_air: 0,
              total_cost_air: 0,
              average_cost_per_shipment_sea: 0,
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
