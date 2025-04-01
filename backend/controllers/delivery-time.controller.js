import { getAverageDeliveyTime } from "../services/delivery-time.service.js";

export const handleGetAverageDeliveryTime = async (req, res, next) => {
  try {
    const { year } = req.query;
    const data = await getAverageDeliveyTime(year);
    res.json(data);
  } catch (error) {
    next(error);
  }
};
