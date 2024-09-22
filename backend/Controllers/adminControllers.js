const User = require("../Models/User");
const Restaurant = require("../Models/Restaurant");

const adminControllers = {
  getUsers: async (req, res) => {
    try {
      const allUsers = await User.find();
      return res.status(200).json({ msg: "All users", data: allUsers });
    } catch (error) {
      return res.status(500).json({ msg: error.msg });
    }
  },
  registerRestaurant: async (req, res) => {
    try {
      const {
        name,
        email,
        password,
        address,
        open_time,
        close_time,
        available,
      } = req.body;
      // cheking if restaurant exists
      const restaurant_exists = await Restaurant.findOne({ email: email });
      if (restaurant_exists) {
        return res.status(401).json({ msg: "Restaurant exists " });
      }
      const restaurant = await Restaurant.create({
        name,
        email,
        address,
        open_time,
        close_time,
        restaurant_img: req.file.path,
        password,
        available,
      });
      return res
        .status(200)
        .json({ msg: "Restaurant created ", data: restaurant });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  getRestaurants: async (req, res) => {
    try {
      const allRestaurants = await Restaurant.find();
      return res
        .status(200)
        .json({ msg: "All restaurants", data: allRestaurants });
    } catch (error) {
      return res.status(500).json({ msg: error.msg });
    }
  },
};

module.exports = adminControllers;
