import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import ordersRoutes from "./routes/ordersRoutes";
import shippingRoutes from "./routes/shippingRoutes";

const app = express();
const PORT = 4000;

const corsOptions = {
  origin: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/orders", ordersRoutes);
app.use("/api/shipments", shippingRoutes);

app.listen(PORT, () => {
  console.log(`{Server running on http://localhost:${PORT}}`);
});
