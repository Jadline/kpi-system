import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import errorHandler from "./middlewares/errorMiddleware";
import ordersRoutes from "./routes/ordersRoutes";
import shippingRoutes from "./routes/shippingRoutes";
import deliveryRoutes from "./routes/DeliveryRoutes.js";

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

// app.use("/api/orders", ordersRoutes);
// app.use("/api/shipments", shippingRoutes);
app.use("/api/delivery", deliveryRoutes);

// Error handling middleware (must be after all routes)
// app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`{Server running on http://localhost:${PORT}}`);
});
