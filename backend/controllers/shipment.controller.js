import { formatMonth } from "../helpers/formatResponse.js";
import { formatCountry } from "../helpers/formatCountry.helper.js";
import { getShipments } from "../services/shipment.service.js";
export const handleGetShipments = async (req, res) => {
  try {
    const { month, year, country } = req.query;
    if (!year || isNaN(year)) {
      return res.status(400).json({ error: "Valid year year is required" });
    }
    const formattedMonth = formatMonth(month);
    if (!formattedMonth) {
      return res
        .status(400)
        .json({ error: "Valid month (1-12 or month name) is required" });
    }

    const formattedCountry = formatCountry(country);
    if (country && !formattedCountry) {
      return res.status(400).json({ error: "Invalid country provided" });
    }

    const data = await getShipments({
      month: formattedMonth,
      year,
      country: formattedCountry,
    });
    console.log(data);

    res.json({
      total_shipments: Number(data.total_shipments) || 0,
      air_shipments: Number(data.shipments_by_air) || 0,
      sea_shipments: Number(data.shipments_by_sea) || 0,
    });
  } catch (error) {
    console.error("Error fetching shipments:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};
