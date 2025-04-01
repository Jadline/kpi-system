import { getPerfectOrderRates } from "../services/perfect-order-rate.service.js";

export const handleGetPerfectOrderRates = async (req, res, next) => {
  try {
    const { year, mode } = req.query;
    const data = await getPerfectOrderRates(year, mode);
    res.json(data);
  } catch (error) {
    // Pass error to global error handler
    next(error);
  }
};
