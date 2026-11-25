const router = require("express").Router();
const controller = require("../controllers/paymentController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.use(protect);
router.post("/", controller.createPayment);
router.get("/my", controller.getMyPayments);
// Admin-only manual confirmation for development. Replace with signature-verified provider webhooks in production.
router.patch("/:paymentId/status", adminOnly, controller.updatePaymentStatus);

module.exports = router;
