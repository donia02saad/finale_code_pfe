const User = require("../Models/User");
const Dish = require("../Models/Dish");
const Restaurant = require("../Models/Restaurant");
const bcrypt = require("bcrypt");

const userControllers = {
  // public route
  getRestaurants: async (req, res) => {
    try {
      const restaurants = await Restaurant.find();
      return res
        .status(200)
        .json({ msg: "all restaurants", data: restaurants });
    } catch (error) {
      return res.status(500).json({ msg: error });
    }
  },
  //   public route
  getDishes: async (req, res) => {
    try {
      const dishes = await Dish.find();
      return res.status(200).json({ msg: "all dishes", data: dishes });
    } catch (error) {
      return res.status(500).json({ msg: error });
    }
  },
  //   public route
  getRestaurant: async (req, res) => {
    try {
      const { id } = req.params;
      const restaurant = await Restaurant.findById(id);
      return res.status(200).json({ data: restaurant });
    } catch (error) {
      return res.status(500).json({ msg: error });
    }
  },
  //   public route
  getDish: async (req, res) => {
    try {
      const { id } = req.params;
      const dish = await Dish.findById(id);
      return res.status(200).json({ data: dish });
    } catch (error) {
      return res.status(500).json({ msg: message.error });
    }
  },
  getUserProfile: async (req, res) => {
    try {
      const userId = req.user.id; // Retrieve the user ID from the token
      console.log("User ID from token:", userId);  // Log userId
      const user = await User.findById(userId)
      const allUsers = await User.find();
      console.log("All Users:", allUsers); // Log all users for checking
        if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      return res.status(200).json({ data: user });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
      
    // Update user profile (Protected route)
    updateUserProfile: async (req, res) => {
      try {
        const userId = req.user.id; // Assuming req.user contains the authenticated user's data
        const { fullName, email, phone, address, password, newPassword } = req.body;
  
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ msg: "User not found" });
        }
  
        // Update basic profile details
        if (fullName) user.fullName = fullName;
        if (email) user.email = email;
        if (phone) user.phone = phone;
        if (address) user.address = address;
  
        // If the user wants to change the password
        if (password && newPassword) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return res.status(400).json({ msg: "Incorrect current password" });
          }
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(newPassword, salt);
        }
  
        await user.save();
        return res.status(200).json({ msg: "Profile updated successfully" });
      } catch (error) {
        return res.status(500).json({ msg: error.message });
      }
    },
  
};

module.exports = userControllers;
