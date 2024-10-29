const { Case, Category } = require("../models");
const handleValidationErrors = require("../utils/validationHandler");
const { validationResult } = require("express-validator");

// Helper to find a case by ID
const findCaseById = async (id, res) => {
  try {
    const caseInstance = await Case.findByPk(id);
    if (!caseInstance) {
      res.status(404).json({ message: "Case not found" });
      return null;
    }
    return caseInstance;
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
    return null;
  }
};

// Custom validator for category and subcategory validation
exports.validateCategoryAndSubcategory = async (categoryId, { req }) => {
  const subcategoryId = req.body.subcategory_id;
  const category = await Category.findByPk(categoryId);

  if (!category) {
    throw new Error("Category not found");
  }

  const subcategory = await Category.findByPk(subcategoryId);
  if (!subcategory) {
    throw new Error("Subcategory not found");
  } else if (
    subcategory.type !== "sub-category" ||
    !subcategory.parent_category_id
  ) {
    throw new Error("Provided category is not a subcategory");
  } else if (subcategory.parent_category_id !== categoryId) {
    throw new Error("Subcategory does not belong to the category");
  }

  return true;
};

// Controller to register a new case
exports.registerCase = async (req, res) => {
  try {
    const newCase = await Case.create(req.body);
    res
      .status(201)
      .json({ message: "Case registered successfully", case: newCase });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to get all cases
exports.getAllCases = async (req, res) => {
  try {
    const cases = await Case.findAll();
    res.status(200).json(cases);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to get a case by ID
exports.getCaseById = async (req, res) => {
  const caseInstance = await findCaseById(req.params.id, res);
  if (caseInstance) {
    res.status(200).json(caseInstance);
  }
};

// Controller to update a case by ID
exports.updateCaseById = async (req, res) => {
  try {
    const caseInstance = await findCaseById(req.params.id, res);
    if (!caseInstance) return;

    let isModified = Object.keys(req.body).some(
      (key) => req.body[key] !== caseInstance[key]
    );

    if (!isModified) {
      return res.status(200).json({
        message: "No changes detected. Case data remains the same.",
      });
    }

    await caseInstance.update(req.body);
    res
      .status(200)
      .json({ message: "Case updated successfully", case: caseInstance });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to delete a case by ID
exports.deleteCaseById = async (req, res) => {
  const caseInstance = await findCaseById(req.params.id, res);
  if (!caseInstance) return;

  try {
    await caseInstance.destroy();
    res.status(200).json({ message: "Case deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
