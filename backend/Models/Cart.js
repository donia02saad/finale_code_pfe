// Import necessary libraries and dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Cart schema
const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      itemId: {
        type: Schema.Types.ObjectId,
        ref: "Dish",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
});

// Create and export the Cart model
module.exports = Cart = mongoose.model("Cart", cartSchema);
