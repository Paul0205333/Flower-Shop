
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    default: 0
  },
  images: [{
    type: String
  }],
  flowerType: {
    type: String
  },
  occasion: [{
    type: String
  }],
  colors: [{
    type: String
  }],
  isAvailable: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

productSchema.index({ name: "text", description: "text", flowerType: "text" });

module.exports = mongoose.model("Product", productSchema);
