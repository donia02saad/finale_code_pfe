const {
  restaurantControllers,
} = require("../Controllers/restaurantControllers");
const authMiddleware = require("../Middlewares/authMiddleware");
const authRestaurant = require("../Middlewares/authRestaurant");
const upload = require("../Middlewares/upload");

const router = require("express").Router();

router.post("/register", restaurantControllers.register);
router.post("/login", restaurantControllers.login);
router.put(
  "/restaurant/:id",
  authRestaurant,
  upload.single("restaurant_img"),
  restaurantControllers.updateRestaurant
);
router.get("/restaurant", authRestaurant, restaurantControllers.getRestaurantById);
router.get("/restaurants", authRestaurant, restaurantControllers.getAllRestaurants);

router.post(
  "/dish",
  authRestaurant,
  upload.single("dish_img"),
  restaurantControllers.create_dish
);
router.put(
  "/dish/:id",
  authRestaurant,
  upload.single("dish_img"),
  restaurantControllers.updateDish
);
router.post("/change-password", authRestaurant, restaurantControllers.changePassword);

router.delete("/dish/:id", authRestaurant, restaurantControllers.delete_dish);

module.exports = router;
