// controllers/categoryController.js
const Category = require("../models/Category"); // Import Category model

// CREATE Category
exports.createCategory = async (req, res) => {
  try {
    const { code, name, minScore, maxScore, requiresMin, items } = req.body;

    const newCategory = new Category({
      code,
      name,
      minScore,
      maxScore,
      requiresMin,
      items,
    });

    await newCategory.save();
    res.status(201).json({
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET All Categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ categories });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET Single Category by Code
exports.getCategoryByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const category = await Category.findOne({ code });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({ category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE Category
exports.updateCategory = async (req, res) => {
  try {
    const { code } = req.params;
    const updateData = req.body;

    const category = await Category.findOneAndUpdate({ code }, updateData, {
      new: true,
    });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res
      .status(200)
      .json({ message: "Category updated successfully", category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE Category
exports.deleteCategory = async (req, res) => {
  try {
    const { code } = req.params;

    const category = await Category.findOneAndDelete({ code });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
