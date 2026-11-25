
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: [
      "gcash",
      "maya",
      "credit_card",
      "debit_card",
      "cash_on_delivery"
    ],
    required: true
  },
  transactionId: {
    type: String
  },
  paymentStatus: {
    type: String,
    enum: [
      "pending",
      "completed",
      "failed",
      "refunded"
    ],
    default: "pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);
