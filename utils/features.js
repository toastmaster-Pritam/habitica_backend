import jwt from "jsonwebtoken";
export const sendCookie = (newUser, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: newUser._id }, process.env.JWT_TOKEN);

  console.log(process.env.NODE_ENV);
  console.log(process.env.NODE_ENV==="development")

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 1000 * 60 * 24),
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      message,
    });
};
