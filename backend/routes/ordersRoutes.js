import express from "express";
import {
  fetchOrders,
  fetchOrder,
  addOrder,
} from "../controllers/ordersController.js";

const router = express.Router();

router.get("/", fetchOrders);
router.get("/:id", fetchOrder);
router.post("/", addOrder);

export default router;
