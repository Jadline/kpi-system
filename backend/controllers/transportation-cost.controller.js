import { getTransportationCost } from "../services/transportation-cost.service.js";

export const handleGetTransportationCost = async (req, res, next) => {
  try {
    const { year } = req.query;
    const data = await getTransportationCost({
      year,
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
};
