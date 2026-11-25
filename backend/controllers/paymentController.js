const Payment = require("../models/payment");
const Order = require("../models/order");

exports.createPayment = async (req, res) => {
  try {
    const { orderId, paymentMethod } = req.body;
    const methods = ["gcash", "maya", "credit_card", "debit_card", "cash_on_delivery"];
    if (!orderId || !methods.includes(paymentMethod)) return res.status(400).json({ message: "A valid order ID and payment method are required." });

    const order = await Order.findOne({ _id: orderId, user: req.user._id });
    if (!order) return res.status(404).json({ message: "Order not found." });
    if (order.orderStatus === "cancelled") return res.status(409).json({ message: "Cannot pay for a cancelled order." });
    if (order.paymentStatus === "paid") return res.status(409).json({ message: "This order is already paid." });

    const existing = await Payment.findOne({ order: order._id, paymentStatus: "pending" });
    if (existing) return res.status(409).json({ message: "A pending payment already exists for this order.", payment: existing });

    const payment = await Payment.create({
      order: order._id, user: req.user._id, amount: order.totalAmount, paymentMethod, paymentStatus: "pending"
    });
    // This creates a payment record only. A verified provider webhook/admin action must confirm payment.
    res.status(201).json({ message: "Payment record created. Payment confirmation is pending.", payment });
  } catch (error) {
    res.status(400).json({ message: "Unable to create payment.", error: error.message });
  }
};

exports.getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id }).populate("order", "totalAmount orderStatus").sort({ createdAt: -1 });
    res.json({ payments });
  } catch (error) {
    res.status(500).json({ message: "Unable to retrieve payments.", error: error.message });
  }
};

exports.updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus, transactionId } = req.body;
    if (!["completed", "failed", "refunded"].includes(paymentStatus)) {
      return res.status(400).json({ message: "Payment status must be completed, failed, or refunded." });
    }
    const payment = await Payment.findById(req.params.paymentId);
    if (!payment) return res.status(404).json({ message: "Payment not found." });
    if (payment.paymentStatus === "refunded" || payment.paymentStatus === "completed") {
      return res.status(409).json({ message: "This payment has already reached a final state." });
    }

    payment.paymentStatus = paymentStatus;
    if (transactionId) payment.transactionId = transactionId;
    await payment.save();

    const order = await Order.findById(payment.order);
    if (order && paymentStatus === "completed") order.paymentStatus = "paid";
    if (order && paymentStatus === "refunded") order.paymentStatus = "refunded";
    if (order) await order.save();

    res.json({ message: "Payment status updated.", payment, order });
  } catch (error) {
    res.status(400).json({ message: "Unable to update payment.", error: error.message });
  }
};
