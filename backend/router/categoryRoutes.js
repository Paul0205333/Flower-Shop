const router = require("express").Router();
const controller = require("../controllers/categoryController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/", controller.getCategories);
router.post("/", protect, adminOnly, controller.createCategory);
router.patch("/:id", protect, adminOnly, controller.updateCategory);
router.delete("/:id", protect, adminOnly, controller.deleteCategory);

module.exports = router;
