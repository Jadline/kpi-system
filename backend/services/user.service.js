import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../models/user.model.js";
import CustomError from "../helpers/CustomError.js";

export const registerUser = async (userData) => {
  const existing = await findUserByEmail(userData.email);
  if (existing) throw new CustomError("That email is already registered.", 400);

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const newUser = {
    fullName: userData.full_name,  // 🚀 map correctly here
    username: userData.username,
    role: userData.role,
    email: userData.email,
    password: hashedPassword
  };

  return await createUser( newUser );



};

export const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user)
    throw new CustomError(
      "No user with that email exists. Please check and try again.",
      404
    );

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    throw new CustomError("Incorrect password. Please try again.", 401);

  return user;
};
