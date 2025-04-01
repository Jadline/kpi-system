import express from "express";
import { handleGetTransportationCost } from "../controllers/transportation-cost.controller.js";

const router = express.Router();

router.get("/", handleGetTransportationCost);

export default router;
