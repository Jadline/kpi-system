import { getShipments } from "../services/shipment.service.js";
export const handleGetShipments = async (req, res, next) => {
  try {
    const { month, year, country } = req.query;

    const data = await getShipments({
      month,
      year,
      country,
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
};
