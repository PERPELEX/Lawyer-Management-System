const express = require("express");
const { body } = require("express-validator");

const { Client, User, Tenant, Court, Judge } = require("../models");
const caseController = require("../controllers/caseController");
const handleValidationErrors = require("../utils/validationHandler");
const router = express.Router();

// Custom validator to check if an entity exists and is active
const entityExistsAndIsActive = (model, modelName) => {
  return async (id) => {
    const instance = await model.findByPk(id);
    if (!instance) {
      return Promise.reject(`${modelName} not found`);
    } else if (instance.status !== "active") {
      return Promise.reject(`${modelName} is not active`);
    }
    return true;
  };
};

// Route to register a new case
router.post(
  "/register",
  [
    body("client_id")
      .notEmpty()
      .withMessage("Client ID is required")
      .bail()
      .custom(entityExistsAndIsActive(Client, "Client")),
    body("lawyer_id")
      .notEmpty()
      .withMessage("Lawyer ID is required")
      .bail()
      .custom(entityExistsAndIsActive(User, "Lawyer")),
    body("tenant_id")
      .notEmpty()
      .withMessage("Tenant ID is required")
      .bail()
      .custom(entityExistsAndIsActive(Tenant, "Tenant")),
    body("category_id")
      .notEmpty()
      .withMessage("Category is required")
      .bail()
      .custom(caseController.validateCategoryAndSubcategory),
    body("subcategory_id").notEmpty().withMessage("Subcategory is required"),
    body("fir_number").notEmpty().withMessage("FIR number is required"),
    body("offence").notEmpty().withMessage("Offence is required"),
    body("court_id")
      .notEmpty()
      .withMessage("Court ID is required")
      .bail()
      .custom(entityExistsAndIsActive(Court, "Court")),
    body("judge_id")
      .notEmpty()
      .withMessage("Judge ID is required")
      .bail()
      .custom(entityExistsAndIsActive(Judge, "Judge")),
    body("date_of_institution")
      .notEmpty()
      .withMessage("Date of Institution is required")
      .isDate()
      .withMessage("Invalid date"),
    body("case_status").notEmpty().withMessage("Case Status is required"),
    body("police_station").notEmpty().withMessage("Police Station is required"),
    body("created_by")
      .notEmpty()
      .withMessage("Created By is required")
      .bail()
      .custom(entityExistsAndIsActive(User, "User")),
    handleValidationErrors,
  ],
  handleValidationErrors,
  caseController.registerCase
);

// Route to get all cases
router.get("/", caseController.getAllCases);

// Route to get a case by ID
router.get("/:id", caseController.getCaseById);

// Route to update a case by ID
router.put(
  "/:id",
  [
    body("client_id")
      .optional()
      .custom(entityExistsAndIsActive(Client, "Client")),
    body("lawyer_id")
      .optional()
      .custom(entityExistsAndIsActive(User, "Lawyer")),
    body("tenant_id")
      .optional()
      .custom(entityExistsAndIsActive(Tenant, "Tenant")),
    body("category_id")
      .optional()
      .custom(caseController.validateCategoryAndSubcategory),
    body("fir_number")
      .optional()
      .notEmpty()
      .withMessage("FIR number cannot be empty"),
    body("offence")
      .optional()
      .notEmpty()
      .withMessage("Offence cannot be empty"),
    body("court_id").optional().custom(entityExistsAndIsActive(Court, "Court")),
    body("judge_id").optional().custom(entityExistsAndIsActive(Judge, "Judge")),
    body("date_of_institution").optional().isDate().withMessage("Invalid date"),
    body("case_status")
      .optional()
      .notEmpty()
      .withMessage("Case Status cannot be empty"),
    body("police_station")
      .optional()
      .notEmpty()
      .withMessage("Police Station cannot be empty"),
    body("updated_by")
      .optional()
      .custom(entityExistsAndIsActive(User, "Updated By(User)")),
    handleValidationErrors,
  ],
  handleValidationErrors,
  caseController.updateCaseById
);

// Route to delete a case by ID
router.delete("/:id", caseController.deleteCaseById);

module.exports = router;
