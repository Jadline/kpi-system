import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import errorHandler from "./middlewares/errorMiddleware.js";
import orderRoutes from "./routes/orders.routes.js";
import shipmentRoutes from "./routes/number-of-shipments.routes.js";

import env from "dotenv";

env.config();

const app = express();
const PORT = 4000;

const corsOptions = {
  origin: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// app.use("/", (req, res) => {
//   res.json(
//     "Hello There! Oooops! Looks like you landed on the wrong page, nothing to be shown here....Proceed to the correct route!"
//   );
// });

app.use("/api/orders", orderRoutes);
app.use("/api/shipments", shipmentRoutes);

// Error handling middleware (must be after all routes)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
