const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const cors = require("cors");
// global variables
PORT = process.env.PORT || 6000;
DB = process.env.MONGO_URI;

//  API calls
app.use(cors());

app.use(express.json());
app.use("/auth", require("./Routes/authRoutes"));
app.use("/admin", require("./Routes/adminRoutes"));
app.use("/api", require("./Routes/restaurantRoutes"));
app.use("/user", require("./Routes/userRoutes"));
app.use("/orders", require("./Routes/orderRoutes"));

// Database configuration

mongoose
  .connect(DB)
  .then(() => console.log(`DATABASE connected successfully 📊 `));

// Running the server

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT : ${PORT} 🚀🚀🚀`);
});
