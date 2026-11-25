const Product = require("../models/product");

exports.getProducts = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 12, 1), 100);
    const filter = { isAvailable: true };
    if (req.query.category) filter.category = req.query.category;
    if (req.query.flowerType) filter.flowerType = req.query.flowerType;
    if (req.query.occasion) filter.occasion = req.query.occasion;
    if (req.query.color) filter.colors = req.query.color;
    if (req.query.search) filter.$text = { $search: req.query.search };

    const [products, total] = await Promise.all([
      Product.find(filter).populate("category", "name").sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      Product.countDocuments(filter)
    ]);
    res.json({ products, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (error) {
    res.status(500).json({ message: "Unable to retrieve products.", error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, isAvailable: true }).populate("category", "name description");
    if (!product) return res.status(404).json({ message: "Flower product not found." });
    res.json({ product });
  } catch (error) {
    res.status(400).json({ message: "Invalid product ID.", error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ message: "Product created.", product });
  } catch (error) {
    res.status(400).json({ message: "Unable to create product.", error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ message: "Product not found." });
    res.json({ message: "Product updated.", product });
  } catch (error) {
    res.status(400).json({ message: "Unable to update product.", error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { isAvailable: false }, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found." });
    res.json({ message: "Product archived and hidden from the storefront." });
  } catch (error) {
    res.status(400).json({ message: "Unable to archive product.", error: error.message });
  }
};
