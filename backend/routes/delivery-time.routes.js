import express from "express";
import { handleGetAverageDeliveryTime } from "../controllers/delivery-time.controller.js";

const router = express.Router();

router.get("/", handleGetAverageDeliveryTime);

export default router;
