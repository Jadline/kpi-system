import { getTransportationCost } from "../services/transportation-cost.service.js";

export const handleGetTransportationCost = async (req, res, next) => {
  try {
    const {} = req.query;
  } catch (error) {
    next(error);
  }
};
