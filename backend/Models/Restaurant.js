const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    dishes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dish",
    }],
    restaurant_img: {
      type: String,
    },
    available: {
      type: Boolean,
      default: true,
    },
    open_time: {
      type: String,
    },
    close_time: {
      type: String,
    },
    coordinates: {
      type: [Number],
    },
  },
  { timestamps: true }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema); // Change here
module.exports = Restaurant;
