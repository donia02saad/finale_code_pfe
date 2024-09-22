const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Order schema
const orderSchema = new Schema({
  orderNumber: {
    type: Number,
    unique: true,
    required: true,
    default: () => Math.floor(Math.random() * 1000000) // or other logic
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  items: [
    {
        itemId: { type: String, required: true }, // Change this to String
        name: { type: String, required: true }, // Add name field
        quantity: { type: Number, required: true }
    }
],
totalPrice: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  paymentId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the Order model
module.exports = Order = mongoose.model("Order", orderSchema);
