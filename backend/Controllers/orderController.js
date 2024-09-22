const Order = require("../Models/Order");
const Restaurant = require("../Models/Restaurant");
const Dish = require("../Models/Dish");

// Create a new order
// Create a new order
exports.createOrder = async (req, res) => {
    const { restaurant, items, totalPrice, paymentId } = req.body;

    try {
        // Validate the restaurant
        const foundRestaurant = await Restaurant.findById(restaurant);
        if (!foundRestaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        // Create a new order without validating dish IDs
        const newOrder = new Order({
            restaurant,
            items,
            totalPrice,
            paymentId,
        });

        await newOrder.save();
        return res.status(201).json(newOrder);
    } catch (error) {
        return res.status(500).json({ message: "Error creating order", error });
    }
};


  
// Get all orders for a specific restaurant
exports.getAllOrders = async (req, res) => {
  const { restaurantId } = req.params;

  try {
    const orders = await Order.find({ restaurant: restaurantId })
      .populate("restaurant")
      .populate("items.itemId");
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching orders", error });
  }
};

// Get a single order by ID
exports.getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id).populate("restaurant").populate("items.itemId");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching order", error });
  }
};
// Get all orders for a specific restaurant
exports.getOrdersByRestaurantId = async (req, res) => {
  const { restaurantId } = req.params;

  try {
    const orders = await Order.find({ restaurant: restaurantId })
      .populate("restaurant")
      .populate("items.itemId");

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this restaurant" });
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error.message || error); // Log the error message
    return res.status(500).json({ message: "Error fetching orders", error: error.message || error });
  }
};

// Update an order
exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json(updatedOrder);
  } catch (error) {
    return res.status(500).json({ message: "Error updating order", error });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Error deleting order", error });
  }
};
