import { getTransportationCost } from "../services/transportation-cost.service.js";

export const handleGetTransportationCost = async (req, res, next) => {
  try {
    const { year } = req.query;
    console.log("Received year:", req.query.year);

    const data = await getTransportationCost(year);
    res.json(data);
  } catch (error) {
    next(error);
  }
};
