import { registerUser, loginUser } from "../services/user.service.js";

export const signup = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: "Account created successfully", user });
  } catch (error) {
    next(error); // Will be caught by error middleware
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await loginUser(email, password);
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    next(error);
  }
};
