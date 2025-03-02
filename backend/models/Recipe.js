const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cookingTime: {
      type: String,
      required: true,
    },
    image: {
      type: String, // Cloudinary image URL
      required: false, // Optional
    },
    youtubeUrl: {
      type: String,
      required: false, // Optional
    },
    category: {
      type: String,
      enum: ["Breakfast", "Lunch", "Dinner"],
      required: true,
    },
    type: {
      type: String,
      enum: ["Veg", "Non-Veg"],
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    steps: {
      type: [String],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);
