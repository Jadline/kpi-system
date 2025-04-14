import pg from "pg";
import env from "dotenv";
import fs from "fs";

env.config();
const { Pool } = pg;

// Supabase Connection
const pool = new Pool({
  connectionString: process.env.SUPABASE_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
    // ca: fs.readFileSync("./certs/prod-ca-2021.crt").toString(),
  },
});

export default pool;
