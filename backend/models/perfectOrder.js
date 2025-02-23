import asyncHandler from "express-async-handler";
import db from "../config/db";

const getData = async (email) => {
  const result = await db.query("SELECT * FROM  users  WHERE email = $1", [
    email,
  ]);
};

export default getData;
