
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    },
    name: String,
    price: Number,
    quantity: Number,
    image: String
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  deliveryAddress: {
    recipientName: String,
    phone: String,
    street: String,
    city: String,
    province: String,
    postalCode: String
  },
  deliveryDate: {
    type: Date
  },
  deliveryInstructions: {
    type: String
  },
  orderStatus: {
    type: String,
    enum: [
      "pending",
      "confirmed",
      "preparing",
      "out_for_delivery",
      "delivered",
      "cancelled"
    ],
    default: "pending"
  },
  paymentStatus: {
    type: String,
    enum: ["unpaid", "paid", "refunded"],
    default: "unpaid"
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
