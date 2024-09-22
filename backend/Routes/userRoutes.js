const router = require("express").Router();
const userControllers = require("../Controllers/userControllers");
const authMiddleware = require("../Middlewares/authMiddleware");
const { getUserProfile, updateUserProfile } = require("../Controllers/userControllers");

router.get("/allrestaurants", userControllers.getRestaurants);
router.get("/restaurant/:id", userControllers.getRestaurant);
router.get("/dishes", userControllers.getDishes);
router.get("/dishe/:id", userControllers.getDish);
router.get("/profile", authMiddleware, getUserProfile);

// Update profile (Protected route)
router.put("/profile", authMiddleware, updateUserProfile);

module.exports = router;
