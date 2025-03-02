const express = require("express");
const router = express.Router();
const recipeController = require("../routes/recipeController"); // Fixed path
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload"); // Multer middleware for Cloudinary uploads

// ✅ Create a new recipe (Protected)
router.post("/create", protect, upload.single("image"), recipeController.createRecipe);

// ✅ Get all recipes (Public - For Home Page)
router.get("/", recipeController.getAllRecipes);

// ✅ Get user-specific recipes (Protected - For Dashboard)
router.get("/user/recipes", protect, recipeController.getUserRecipes);

// ✅ Get a single recipe by ID (Public)
router.get("/:id", recipeController.getRecipeById);

// ✅ Update a recipe by ID (Protected)
router.put("/:id", protect, upload.single("image"), recipeController.updateRecipe);

// ✅ Delete a recipe by ID (Protected)
router.delete("/:id", protect, recipeController.deleteRecipe);

module.exports = router;