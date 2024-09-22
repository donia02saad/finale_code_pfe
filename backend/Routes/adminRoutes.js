const router = require("express").Router();
const adminControllers = require("../Controllers/adminControllers");
const authMiddleware = require("../Middlewares/authMiddleware");
const upload = require("../Middlewares/upload");

router.get("/allusers", authMiddleware, adminControllers.getUsers);
router.post(
  "/restaurant",
  authMiddleware,
  upload.single("restaurant_img"),
  adminControllers.registerRestaurant
);
router.get("/allrestaurants", authMiddleware, adminControllers.getRestaurants);

module.exports = router;
