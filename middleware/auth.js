import { User } from "../models/users.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/customError.js";
export const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    // console.log(token);
    if (!token) return next(new ErrorHandler("Login First", 404));

    const { _id } = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = await User.findById(_id);
    next();
  } catch (error) {
    next(error);
  }
};
