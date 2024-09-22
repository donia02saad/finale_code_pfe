const jwt = require("jsonwebtoken");
const User = require("../Models/User");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token missing or invalid" });
  }

  const token = authHeader.split(" ")[1];
  const user = jwt.verify(token, process.env.JWT_SECRET);
  if (!user) {
    return res.status(400).json({ message: "Invalid Authentication." });
  }

  // Instead of checking for admin only, attach user info to req
  req.user = user; // This should have user ID and other details

  next();
};

module.exports = authMiddleware;
