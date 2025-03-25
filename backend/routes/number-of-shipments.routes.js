import express from "express";
import { handleGetShipments } from "../controllers/shipment.controller.js";
const router = express.Router();

router.get("/", handleGetShipments);

export default router;
