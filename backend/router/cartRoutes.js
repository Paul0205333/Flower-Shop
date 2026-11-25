const router = require("express").Router();
const controller = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);
router.get("/", controller.getCart);
router.post("/items", controller.addItem);
router.patch("/items/:itemId", controller.updateItem);
router.delete("/items/:itemId", controller.removeItem);
router.delete("/", controller.clearCart);

module.exports = router;
