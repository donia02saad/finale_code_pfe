const jwt = require("jsonwebtoken");
const Restaurant = require("../Models/Restaurant");
require("dotenv").config();

const authRestaurant = async (req, res, next) => {
  // Check if the authorization header exists
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(400).json({ message: "Please login to continue" });
  }

  // Split the token from the header
  const token = authHeader.split("Bearer ")[1];
  if (!token) {
    return res.status(400).json({ message: "Invalid token format" });
  }

  try {
    const restaurant = jwt.verify(token, process.env.JWT_SECRET);
    req.restaurantId = restaurant.id; // Store restaurant ID in request for later use
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid Authentication." });
  }
};

module.exports = authRestaurant;
