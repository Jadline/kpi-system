import express from "express";
import { handleGetPerfectOrderRates } from "../controllers/perfect-order-rate.controller.js";
const router = express.Router();

router.get("/", handleGetPerfectOrderRates);

export default router;
