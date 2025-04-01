import express from "express";
import { handleGetShippingTime } from "../controllers/shipping-time-controller.js";

const router = express.Router();

router.get("/", handleGetShippingTime);

export default router;
