
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  address: {
    street: String,
    city: String,
    province: String,
    postalCode: String
  },
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer"
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
