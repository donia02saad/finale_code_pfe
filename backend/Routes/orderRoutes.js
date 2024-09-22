const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/orderController");

// Create a new order
router.post("/", orderController.createOrder);

// Get all orders for a specific restaurant
router.get("/:restaurantId", orderController.getOrdersByRestaurantId);

// Get a single order by ID (optional, if you want to keep this functionality)
router.get("/:id", orderController.getOrderById);

// Update an order
router.put("/:id", orderController.updateOrder);

// Delete an order
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
