import express from "express";
import { handleGetOrders } from "../controllers/order.controller.js";

const router = express.Router();

router.get("/", handleGetOrders);

export default router;
