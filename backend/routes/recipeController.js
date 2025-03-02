const Recipe = require("../models/Recipe");
const cloudinary = require("../config/cloudinary");
const express = require("express");
const router = express.Router();

// 📌 Create a new recipe
exports.createRecipe = async (req, res) => {
  try {
    const { name, description, cookingTime, category, type, ingredients, steps, youtubeUrl } = req.body;
    console.log(req.body); // Debugging
    

    const userId = req.user.id; // Get user ID from JWT token

    // Upload image to Cloudinary if provided
    let imageUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "recipes",
      });
      imageUrl = result.secure_url;
    }

    const newRecipe = new Recipe({
      name,
      description,
      cookingTime,
      category,
      type,
      ingredients: Array.isArray(ingredients) ? ingredients : JSON.parse(ingredients),
      steps: Array.isArray(steps) ? steps : JSON.parse(steps),
      youtubeUrl,
      image: imageUrl,
      user: userId,
    });
    

    await newRecipe.save();
    res.status(201).json({ message: "Recipe created successfully!", recipe: newRecipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 📌 Get all recipes for the Home Page (Universal)
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("user", "name email"); // ✅ Fetching all recipes (correct)
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipes" });
  }
};

/// 📌 Get only the logged-in user's recipes (For Dashboard)
exports.getUserRecipes = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from token
    const recipes = await Recipe.find({ user: userId }).populate("user", "name email");
    
    res.status(200).json(recipes);
  } catch (error) {
    console.error("Error fetching user recipes:", error.message);
    res.status(500).json({ message: "Error fetching user recipes" });
  }
};




// 📌 Get a single recipe by ID
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate("user", "name email");
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipe" });
  }
};

// 📌 Update a recipe by ID
exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    // Check if user owns the recipe
    if (recipe.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to update this recipe" });
    }

    const { name, description, cookingTime, category, type, ingredients, steps, youtubeUrl } = req.body;

    // Upload new image to Cloudinary if provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, { folder: "recipes" });
      recipe.image = result.secure_url;
    }

    recipe.title = title || recipe.title;
    recipe.description = description || recipe.description;
    recipe.ingredients = ingredients ? JSON.parse(ingredients) : recipe.ingredients;

    await recipe.save();
    res.status(200).json({ message: "Recipe updated successfully!", recipe });
  } catch (error) {
    res.status(500).json({ message: "Error updating recipe" });
  }
};

// 📌 Delete a recipe by ID
exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    // Check if user owns the recipe
    if (recipe.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete this recipe" });
    }

    await recipe.deleteOne();
    res.status(200).json({ message: "Recipe deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting recipe" });
  }
};
module.exports = exports;
