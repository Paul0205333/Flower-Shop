const Cart = require("../models/cart");
const Product = require("../models/product");

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product", "name price images stock isAvailable");
    res.json({ cart: cart || { user: req.user._id, items: [] } });
  } catch (error) {
    res.status(500).json({ message: "Unable to retrieve cart.", error: error.message });
  }
};

exports.addItem = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const qty = Number(quantity);
    if (!productId || !Number.isInteger(qty) || qty < 1) return res.status(400).json({ message: "A product ID and positive whole-number quantity are required." });

    const product = await Product.findOne({ _id: productId, isAvailable: true });
    if (!product) return res.status(404).json({ message: "Flower product not found." });
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = new Cart({ user: req.user._id, items: [] });

    const item = cart.items.find((entry) => entry.product.toString() === productId);
    const nextQuantity = (item?.quantity || 0) + qty;
    if (nextQuantity > product.stock) return res.status(409).json({ message: `Only ${product.stock} item(s) are currently in stock.` });

    if (item) item.quantity = nextQuantity;
    else cart.items.push({ product: product._id, quantity: qty });
    await cart.save();
    await cart.populate("items.product", "name price images stock isAvailable");
    res.status(200).json({ message: "Cart updated.", cart });
  } catch (error) {
    res.status(400).json({ message: "Unable to add item to cart.", error: error.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const quantity = Number(req.body.quantity);
    if (!Number.isInteger(quantity) || quantity < 1) return res.status(400).json({ message: "Quantity must be a positive whole number." });
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found." });
    const item = cart.items.id(req.params.itemId);
    if (!item) return res.status(404).json({ message: "Cart item not found." });

    const product = await Product.findOne({ _id: item.product, isAvailable: true });
    if (!product) return res.status(404).json({ message: "Product is no longer available." });
    if (quantity > product.stock) return res.status(409).json({ message: `Only ${product.stock} item(s) are in stock.` });
    item.quantity = quantity;
    await cart.save();
    await cart.populate("items.product", "name price images stock isAvailable");
    res.json({ message: "Cart quantity updated.", cart });
  } catch (error) {
    res.status(400).json({ message: "Unable to update cart item.", error: error.message });
  }
};

exports.removeItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found." });
    const item = cart.items.id(req.params.itemId);
    if (!item) return res.status(404).json({ message: "Cart item not found." });
    item.deleteOne();
    await cart.save();
    res.json({ message: "Item removed from cart.", cart });
  } catch (error) {
    res.status(400).json({ message: "Unable to remove cart item.", error: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    await Cart.findOneAndUpdate({ user: req.user._id }, { $set: { items: [] } });
    res.json({ message: "Cart cleared." });
  } catch (error) {
    res.status(500).json({ message: "Unable to clear cart.", error: error.message });
  }
};
