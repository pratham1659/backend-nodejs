const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // Corrected to 1000 milliseconds (1 second)
    httpOnly: true, // Prevent XSS attacks
    sameSite: "strict", // CSRF attacks
    secure: process.env.NODE_ENV !== "development",
  });
};

module.exports = generateTokenAndSetCookie;
