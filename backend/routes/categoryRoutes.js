// routes/categoryRoutes.js
const express = require("express");
const { isAdmin } = require("../middleware/auth");
const categoryController = require("../controllers/categoryController");
const router = express.Router();

// Fetch all categories with their items (including basePoints and weights)
router.get("/", categoryController.getAllCategories);

// Create a new category
router.post("/", isAdmin, categoryController.createCategory);

// Fetch a category by its code
router.get("/:code", categoryController.getCategoryByCode);

// Update a category
router.put("/:code", isAdmin, categoryController.updateCategory);

// Delete a category
router.delete("/:code", isAdmin, categoryController.deleteCategory);

module.exports = router;
