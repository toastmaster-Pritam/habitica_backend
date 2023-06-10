import { User } from "../models/users.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../utils/customError.js";

export const getAllUser = async (req, res, next) => {
  try {
    const userList = await User.find({});
    res.status(201).json({
      success: true,
      userList,
    });
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) return next(new ErrorHandler("User already exists!", 404));

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    sendCookie(newUser, res, "User created successfully!", 201);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) next(new ErrorHandler("Invalid email or password!", 404));

    //match password

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) return next(new ErrorHandler("Invalid password!", 404));

    sendCookie(user, res, `Welcome back ${user.name}!`, 201);
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = (req, res) => {
  res.status(201).json({
    message: "success",
    myProfile: req.user,
  });
};

export const getUserbyId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
      return res.status(201).json({
        success: true,
        user,
      });
    } else return next(new ErrorHandler("No user found!", 404));
  } catch (error) {
    next(error);
  }
};

export const logoutUser = (req, res) => {
  res
    .status(200)
    .cookie("token", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
      sameSite:process.env.NODE_ENV==="development"?"lax":"none",
      secure:process.env.NODE_ENV==="development"?false:true,
    })
    .json({
      success: true,
      // message:`${req.user.name} logged out successfully!`,
      user: req.user,
    });
};
