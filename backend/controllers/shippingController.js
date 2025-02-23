import {
  getAllShipments,
  getShipmentById,
  createShipment,
} from "../models/shippingModel.js";

export const fetchShipments = async (req, res) => {
  try {
    const shipments = await getAllShipments();
    res.status(200).json(shipments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchShipment = async (req, res) => {
  try {
    const { id } = req.params;
    const shipment = await getShipmentById(id);
    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }
    res.status(200).json(shipment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addShipment = async (req, res) => {
  try {
    const shipment = await createShipment(req.body);
    res.status(201).json(shipment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
