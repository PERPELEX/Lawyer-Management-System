const { Category } = require("../models");

// Helper function to find a category by ID
const findCategoryById = async (id, res) => {
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return null;
    }
    return category;
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
    return null;
  }
};

// Controller to register a new category
exports.registerCategory = async (req, res) => {
  const { parent_category_id, type } = req.body;

  if (type === "sub-category") {
    if (parent_category_id) {
      const parentCategory = await findCategoryById(parent_category_id, res);
      if (!parentCategory)
        return res.status(404).json({ message: "Parent category not found" });
    } else {
      return res
        .status(400)
        .json({ message: "Parent category ID not provided" });
    }
  } else {
    req.body.parent_category_id = null;
  }

  try {
    const category = await Category.create(req.body);
    res
      .status(201)
      .json({ message: "Category created successfully", category });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to get a category by ID
exports.getCategoryById = async (req, res) => {
  const category = await findCategoryById(req.params.id, res);
  if (category) {
    res.status(200).json(category);
  }
};

// Controller to update a category by ID
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const category = await findCategoryById(id, res);
    if (!category) return;

    // Check if fields have changed
    let isModified = Object.keys(updates).some(
      (key) => updates[key] != category[key]
    );

    if (!isModified) {
      return res.status(200).json({
        message: "No changes detected. Category data remains the same.",
      });
    }

    if (
      (updates.type && updates.type == "sub-category") ||
      category.type == "sub-category"
    ) {
      if (updates.parent_category_id) {
        const parentCategory = await Category.findByPk(
          updates.parent_category_id
        );
        if (!parentCategory)
          return res.status(404).json({ message: "Parent category not found" });
      }
    } else {
      updates.parent_category_id = null;
    }

    await category.update(updates);
    res
      .status(200)
      .json({ message: "Category updated successfully", category });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to delete a category by ID
exports.deleteCategory = async (req, res) => {
  const category = await findCategoryById(req.params.id, res);
  if (!category) return;

  try {
    await category.destroy();
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
