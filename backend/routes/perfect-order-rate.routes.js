import express from "express";
import {
  fetchShipments,
  fetchShipment,
  addShipment,
} from "../controllers/shipping-time.controller.js";

const router = express.Router();

router.get("/", fetchShipments);
router.get("/:id", fetchShipment);
router.post("/", addShipment);

export default router;
