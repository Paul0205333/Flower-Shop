const Category = require("../models/category");
const Product = require("../models/product");

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json({ categories });
  } catch (error) {
    res.status(500).json({ message: "Unable to retrieve categories.", error: error.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, description, image } = req.body;
    if (!name?.trim()) return res.status(400).json({ message: "Category name is required." });
    const category = await Category.create({ name: name.trim(), description, image });
    res.status(201).json({ message: "Category created.", category });
  } catch (error) {
    res.status(400).json({ message: "Unable to create category. Check for duplicate names.", error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!category) return res.status(404).json({ message: "Category not found." });
    res.json({ message: "Category updated.", category });
  } catch (error) {
    res.status(400).json({ message: "Unable to update category.", error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const productCount = await Product.countDocuments({ category: req.params.id });
    if (productCount) return res.status(409).json({ message: "This category is still assigned to products. Reassign them before deleting." });
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found." });
    res.json({ message: "Category deleted." });
  } catch (error) {
    res.status(400).json({ message: "Unable to delete category.", error: error.message });
  }
};
