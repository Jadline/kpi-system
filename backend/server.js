import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.js";
import shipmentRoutes from "./routes/number-of-shipments.routes.js";
import perfectOrderRoutes from "./routes/perfect-order-rate.routes.js";
import shippingTimeRoutes from "./routes/shipping-time.routes.js";
import deliveryTimeRoutes from "./routes/delivery-time.routes.js";
import transportationCostRoutes from "./routes/transportation-cost.routes.js";
import env from "dotenv";

env.config();

const app = express();
const PORT = 4000;

const corsOptions = {
  origin: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/shipments", shipmentRoutes);
app.use("/api/perfect-order", perfectOrderRoutes);
app.use("/api/shipping-time", shippingTimeRoutes);
app.use("/api/delivery-time", deliveryTimeRoutes);
app.use("/api/transportation-cost", transportationCostRoutes);

// Error handling middleware (must be after all routes)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`{Server running on http://localhost:${PORT}}`);
});
