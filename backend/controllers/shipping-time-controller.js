import { getShippingTime } from "../services/shipping-time.service.js";

export const handleGetShippingTime = async (req, res, next) => {
  // in a try-catch block
  try {
    const { month, year, mode } = req.query;
    const data = await getShippingTime({
      month,
      year,
      mode,
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
  // get hold of req, res, next
  // call the service passing in the request parameters as params
  // handle the error and pass it to the next global handling middleware
};
