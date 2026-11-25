const mongoose = require("mongoose");
const Cart = require("../models/cart");
const Order = require("../models/order");
const Product = require("../models/product");

exports.createOrder = async (req, res) => {
  let createdOrder;
  const reserved = [];
  try {
    const { deliveryAddress, deliveryDate, deliveryInstructions } = req.body;
    if (!deliveryAddress?.recipientName || !deliveryAddress?.phone || !deliveryAddress?.street || !deliveryAddress?.city || !deliveryAddress?.province || !deliveryAddress?.postalCode) {
      return res.status(400).json({ message: "Complete delivery address details are required." });
    }

    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    if (!cart?.items.length) return res.status(400).json({ message: "Your cart is empty." });

    const orderItems = [];
    let totalAmount = 0;
    for (const item of cart.items) {
      const product = item.product;
      if (!product || !product.isAvailable) return res.status(409).json({ message: "A product in your cart is no longer available." });
      if (product.stock < item.quantity) return res.status(409).json({ message: `${product.name} has only ${product.stock} item(s) remaining.` });
      orderItems.push({
        product: product._id, name: product.name, price: product.price,
        quantity: item.quantity, image: product.images?.[0] || ""
      });
      totalAmount += product.price * item.quantity;
    }

    createdOrder = await Order.create({
      user: req.user._id, items: orderItems, totalAmount, deliveryAddress,
      deliveryDate, deliveryInstructions
    });

    // Conditional stock updates prevent overselling when two customers check out together.
    for (const item of orderItems) {
      const result = await Product.updateOne(
        { _id: item.product, stock: { $gte: item.quantity }, isAvailable: true },
        { $inc: { stock: -item.quantity } }
      );
      if (result.modifiedCount !== 1) throw new Error(`Insufficient stock for ${item.name}. Please review your cart.`);
      reserved.push(item);
    }

    await Cart.findOneAndUpdate({ user: req.user._id }, { $set: { items: [] } });
    res.status(201).json({ message: "Order placed. Complete payment using the payment endpoint.", order: createdOrder });
  } catch (error) {
    // Restore any stock already reserved if a later reservation fails.
    for (const item of reserved) await Product.updateOne({ _id: item.product }, { $inc: { stock: item.quantity } });
    if (createdOrder) await Order.findByIdAndDelete(createdOrder._id);
    res.status(400).json({ message: "Unable to place order.", error: error.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("items.product", "name images").sort({ createdAt: -1 });
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Unable to retrieve orders.", error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const filter = { _id: req.params.id };
    if (req.user.role !== "admin") filter.user = req.user._id;
    const order = await Order.findOne(filter).populate("user", "firstName lastName email").populate("items.product", "name images");
    if (!order) return res.status(404).json({ message: "Order not found." });
    res.json({ order });
  } catch (error) {
    res.status(400).json({ message: "Invalid order ID.", error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 20, 1), 100);
    const filter = {};
    if (req.query.status) filter.orderStatus = req.query.status;
    const [orders, total] = await Promise.all([
      Order.find(filter).populate("user", "firstName lastName email").sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      Order.countDocuments(filter)
    ]);
    res.json({ orders, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (error) {
    res.status(500).json({ message: "Unable to retrieve orders.", error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const allowed = ["pending", "confirmed", "preparing", "out_for_delivery", "delivered", "cancelled"];
    const { orderStatus } = req.body;
    if (!allowed.includes(orderStatus)) return res.status(400).json({ message: "Invalid order status." });
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found." });
    if (order.orderStatus === "delivered" || order.orderStatus === "cancelled") {
      return res.status(409).json({ message: "A delivered or cancelled order cannot be changed." });
    }
    if (orderStatus === "cancelled" && order.paymentStatus === "paid") {
      return res.status(409).json({ message: "Paid orders require a refund workflow before cancellation." });
    }
    if (orderStatus === "cancelled" && order.orderStatus !== "cancelled") {
      for (const item of order.items) {
        if (item.product) await Product.updateOne({ _id: item.product }, { $inc: { stock: item.quantity } });
      }
    }
    order.orderStatus = orderStatus;
    await order.save();
    res.json({ message: "Order status updated.", order });
  } catch (error) {
    res.status(400).json({ message: "Unable to update order.", error: error.message });
  }
};
