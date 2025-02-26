import { averageDeliveyTime } from "../models/deliveryModel.js";

export const fetchAverageDeliveryTime = async (req, res) => {
  try {
    const deliveryTime = await averageDeliveyTime();
    res.status(200).json(deliveryTime);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
