import express from "express";
import bodyParser from "body-parser";
import db from "./config/db";
import cors from "cors";

const app = express();
const port = 3000;

const corsOptions = {
  origin: ["http://localhost:5174", "http://localhost:5173"],
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

db.connect();
