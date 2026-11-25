const Review = require("../models/review");
const Product = require("../models/product");

exports.getProductReviews = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 50);
    const filter = { product: req.params.productId };
    const [reviews, total, aggregate] = await Promise.all([
      Review.find(filter).populate("user", "firstName lastName").sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      Review.countDocuments(filter),
      Review.aggregate([{ $match: { product: new (require("mongoose").Types.ObjectId)(req.params.productId) } }, { $group: { _id: null, averageRating: { $avg: "$rating" } } }])
    ]);
    res.json({ reviews, averageRating: aggregate[0]?.averageRating || 0, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (error) {
    res.status(400).json({ message: "Unable to retrieve reviews.", error: error.message });
  }
};

exports.createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    if (!Number.isInteger(Number(rating)) || Number(rating) < 1 || Number(rating) > 5) {
      return res.status(400).json({ message: "Rating must be a whole number from 1 to 5." });
    }
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ message: "Product not found." });
    const review = await Review.create({ user: req.user._id, product: product._id, rating: Number(rating), comment });
    await review.populate("user", "firstName lastName");
    res.status(201).json({ message: "Review submitted.", review });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: "You have already reviewed this flower." });
    res.status(400).json({ message: "Unable to submit review.", error: error.message });
  }
};

exports.updateMyReview = async (req, res) => {
  try {
    const updates = {};
    if (req.body.rating !== undefined) {
      const rating = Number(req.body.rating);
      if (!Number.isInteger(rating) || rating < 1 || rating > 5) return res.status(400).json({ message: "Rating must be from 1 to 5." });
      updates.rating = rating;
    }
    if (req.body.comment !== undefined) updates.comment = req.body.comment;
    const review = await Review.findOneAndUpdate(
      { _id: req.params.reviewId, user: req.user._id }, { $set: updates }, { new: true, runValidators: true }
    ).populate("user", "firstName lastName");
    if (!review) return res.status(404).json({ message: "Your review was not found." });
    res.json({ message: "Review updated.", review });
  } catch (error) {
    res.status(400).json({ message: "Unable to update review.", error: error.message });
  }
};

exports.deleteMyReview = async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({ _id: req.params.reviewId, user: req.user._id });
    if (!review) return res.status(404).json({ message: "Your review was not found." });
    res.json({ message: "Review deleted." });
  } catch (error) {
    res.status(400).json({ message: "Unable to delete review.", error: error.message });
  }
};
