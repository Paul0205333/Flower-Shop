const router = require("express").Router();
const controller = require("../controllers/reviewController");
const { protect } = require("../middleware/authMiddleware");

router.get("/product/:productId", controller.getProductReviews);
router.post("/product/:productId", protect, controller.createReview);
router.patch("/:reviewId", protect, controller.updateMyReview);
router.delete("/:reviewId", protect, controller.deleteMyReview);

module.exports = router;
