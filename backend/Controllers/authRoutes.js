const mongoose = require("mongoose");
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registerValid, loginValid } = require("../utils/errorHandlers");

const authController = {
  register: async (req, res) => {
    try {
      const { fullName, email, phone, password, role } = req.body;
      //  checking if the user already exists
      const errorMessage = registerValid(fullName, email, password, phone);
      if (errorMessage) {
        return res.status(400).json({ msg: errorMessage });
      }
      const user = await User.findOne({ email });
      //   if user already exists he has to login
      if (user) {
        return res.status(401).json({ msg: "Client already exists !!" });
      } else {
        // we start to hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
          fullName,
          email,
          phone,
          role,
          password: hashedPassword,
        });

        return res
          .status(200)
          .json({ msg: "Welcome to Cool-Meal", data: newUser });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const errorMessage = loginValid(email, password);
      if (errorMessage) {
        return res.status(400).json({ msg: errorMessage });
      }
      //  checking for user
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(401)
          .json({ msg: "Acount not Found , Please Register " });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match)
        return res.status(400).json({ message: "Invalid email or password" });

      const token = await jwt.sign(
        { _id: user._id, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      user.password = undefined;
      res
        .status(200)
        .json({ message: "You have successfully logged in", user, token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = authController;
