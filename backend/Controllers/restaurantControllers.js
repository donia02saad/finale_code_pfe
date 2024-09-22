const Restaurant = require("../Models/Restaurant");
const Dish = require("../Models/Dish");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const restaurantControllers = {
  register: async (req, res) => {
    try {
      const { name, email, password, address } = req.body;
      if (name == "" || email == "" || password == "") {
        return res.status(401).json({ msg: "All fields are required !!" });
      }
      const restaurant_exists = await Restaurant.findOne({ email: email });
      if (restaurant_exists) {
        return res
          .status(402)
          .json({ msg: "restaurant already exists , Please login ..." });
      }
      const hash = await bcrypt.genSalt(10);
      const hash_password = await bcrypt.hash(password, hash);
      const newRestaurant = await Restaurant.create({
        name,
        email,
        password: hash_password,
        address
      });
      return res
        .status(200)
        .json({ msg: "Welcome to Cool-Restaurant !!!", data: newRestaurant });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email == "" || password == "") {
        return res.status(401).json({ msg: "All fields are required !!" });
      }
      const restaurant = await Restaurant.findOne({ email: email });
      if (!restaurant) {
        return res
          .status(401)
          .json({ msg: "Restaurant not found , try to register" });
      }
      const compare = await bcrypt.compare(password, restaurant.password);
      if (!compare) {
        return res.status(401).json({ msg: "Wrong Credentials" });
      }
      const token = await jwt.sign(
        { id: restaurant._id },
        process.env.JWT_SECRET
      );
      return res.status(200).json({ msg: "Welcome back ", restaurant, token });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateRestaurant: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        password,
        open_time,
        close_time,
        available,
        address,
        restaurant_img,
      } = req.body;
      const updatedRestaurant = await Restaurant.findByIdAndUpdate(
        id,
        {
          password,
          open_time,
          close_time,
          available,
          restaurant_img: req.file.path,
          address,
        },
        { new: true }
      );
      return res
        .status(200)
        .json({ msg: "Restaurant updated successfully", updatedRestaurant });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getRestaurantById: async (req, res) => {
    try {
      const token = req.headers.authorization.split("Bearer ")[1];
      if (!token) {
        return res.status(400).json({ msg: "No token provided" });
      }

      // Decode the token to get the restaurant ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const restaurantId = decoded.id;

      // Fetch the restaurant by ID
      const restaurant = await Restaurant.findById(restaurantId);
      
      if (!restaurant) {
        return res.status(404).json({ msg: "Restaurant not found" });
      }

      return res.status(200).json({ msg: "Restaurant retrieved successfully", data: restaurant });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAllRestaurants: async (req, res) => {
    try {
      const restaurants = await Restaurant.find();
      return res.status(200).json({ data: restaurants });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  changePassword: async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
  
      // Check for missing fields
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ msg: "Current and new passwords are required." });
      }
  
      // Find the restaurant by ID
      const restaurant = await Restaurant.findById(req.restaurantId);
      if (!restaurant) {
        return res.status(404).json({ msg: "Restaurant not found." });
      }
  
      // Compare the current password with the hashed password in the database
      const isMatch = await bcrypt.compare(currentPassword, restaurant.password);
      if (!isMatch) {
        return res.status(401).json({ msg: "Current password is incorrect." });
      }
  
      // Hash the new password and update it in the database
      const salt = await bcrypt.genSalt(10);
      const hashNewPassword = await bcrypt.hash(newPassword, salt);
      restaurant.password = hashNewPassword;
      await restaurant.save();
  
      return res.status(200).json({ msg: "Password changed successfully." });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  

  //   *************************************************************************
  // *********************creating the dishes*********************************
  create_dish: async (req, res) => {
    try {
      const { name, description, category, price } = req.body;
      // to do
      // searching for existing dish
      const dish = await Dish.create({
        name,
        description,
        dish_img: req.file.path,
        category,
        price,
      });
      return res
        .status(200)
        .json({ msg: "Dish created successfully", data: dish });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateDish: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, category, price } = req.body;
      const updated_dish = await Dish.findByIdAndUpdate(
        id,
        {
          name,
          description,
          category,
          price,
          dish_img: req.file.path,
        },
        { new: true }
      );
      return res
        .status(200)
        .json({ msg: "Dish updated successfully.", updated_dish });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  delete_dish: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted_dish = await Dish.findByIdAndDelete(id);
      return res.status(200).json({ msg: "Dish deleted successfully." });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = {
  restaurantControllers,
};
