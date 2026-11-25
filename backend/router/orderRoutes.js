const router = require("express").Router();
const controller = require("../controllers/orderController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.use(protect);
router.post("/", controller.createOrder);
router.get("/my", controller.getMyOrders);
router.get("/", adminOnly, controller.getAllOrders);
router.get("/:id", controller.getOrderById);
router.patch("/:id/status", adminOnly, controller.updateOrderStatus);

module.exports = router;
