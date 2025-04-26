import db from "../config/db.config.js";
import CustomError from "../helpers/CustomError.js";

export const createUser = async ({
  fullName,
  username,
  role,
  email,
  password,
}) => {
  try {
    const query = `
      INSERT INTO users (full_name, username, role, email, password)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [fullName, username, role, email, password];
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Database Insert Error:", error);
    throw new CustomError("Failed to create user. Please check your data.", 500);
  }
};

export const findUserByEmail = async (email) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  } catch (error) {
    throw new CustomError("User not found", 404);
  }
};
