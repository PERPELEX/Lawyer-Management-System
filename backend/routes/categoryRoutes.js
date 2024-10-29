const express = require("express");
const { body } = require("express-validator");

const { Category } = require("../models");
const categoryController = require("../controllers/categoryController");
const handleValidationErrors = require("../utils/validationHandler");
const router = express.Router();

// Register a new category
router.post(
  "/register",
  [
    body("category_name")
      .notEmpty()
      .withMessage("Name is required")
      .custom(async (value) => {
        const category = await Category.findOne({
          where: { category_name: value },
        });
        if (category) return Promise.reject("Category already exists");
      }),
    body("parent_category_id")
      .optional()
      .notEmpty()
      .withMessage("Parent ID cannot be empty"),
    body("type")
      .notEmpty()
      .withMessage("Type is required")
      .isIn(["category", "sub-category"]),
  ],
  handleValidationErrors,
  categoryController.registerCategory
);

// Get all categories
router.get("/", categoryController.getAllCategories);

// Get category by ID
router.get("/:id", categoryController.getCategoryById);

// Update category by ID
router.put(
  "/:id",
  [
    body().custom((_, { req }) => {
      if (Object.keys(req.body).length === 0) {
        throw new Error("Request body is missing");
      }
      return true;
    }),
    body("category_name").optional().notEmpty().withMessage("Name is required"),
    body("parent_category_id")
      .optional()
      .notEmpty()
      .withMessage("Parent ID cannot be empty"),
    body("type").optional().notEmpty().withMessage("Type is required"),
  ],
  handleValidationErrors,
  categoryController.updateCategory
);

// Delete category by ID
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
