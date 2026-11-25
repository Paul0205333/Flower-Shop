const router = require("express").Router();
const controller = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/me", protect, controller.getProfile);
router.patch("/me", protect, controller.updateProfile);

module.exports = router;
