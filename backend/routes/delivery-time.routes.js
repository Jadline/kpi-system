import express from "express";
import { fetchAverageDeliveryTime } from "../controllers/averageDeliveryTime.js";

const router = express.Router();

router.get("/", fetchAverageDeliveryTime);

export default router;
