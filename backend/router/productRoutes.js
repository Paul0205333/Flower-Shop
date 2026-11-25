const router = require("express").Router();
const controller = require("../controllers/productController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/", controller.getProducts);
router.get("/:id", controller.getProductById);
router.post("/", protect, adminOnly, controller.createProduct);
router.patch("/:id", protect, adminOnly, controller.updateProduct);
router.delete("/:id", protect, adminOnly, controller.deleteProduct);

module.exports = router;
